import { useEffect, useMemo, useState } from 'react'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useQuery } from '@tanstack/react-query'
import {
  useAccount,
  useConfig,
  useSwitchChain,
  useWriteContract,
} from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import {
  Options,
  addressToBytes32,
} from '@layerzerolabs/lz-v2-utilities'
import {
  bytesToHex,
  createPublicClient,
  formatUnits,
  http,
  isAddress,
  parseUnits,
} from 'viem'
import { chainByKey, supportedChains, type ChainKey } from './config/chains'
import { erc20Abi, oftAbi } from './lib/abi'

type MessagingFee = { nativeFee: bigint; lzTokenFee: bigint }

const defaultGasLimit = 200_000

export default function App() {
  const { address, chainId, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain()
  const { writeContractAsync, isPending: isWriting } = useWriteContract()
  const wagmiConfig = useConfig()

  const [fromKey, setFromKey] = useState<ChainKey>('ethereum')
  const [toKey, setToKey] = useState<ChainKey>('arbitrum')
  const [amount, setAmount] = useState<string>('')
  const [slippage, setSlippage] = useState<number>(0.5)
  const [gasLimit, setGasLimit] = useState<number>(defaultGasLimit)
  const [destination, setDestination] = useState<string>('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastTx, setLastTx] = useState<string | null>(null)

  const sourceChain = chainByKey[fromKey]
  const destinationChain = chainByKey[toKey]

  useEffect(() => {
    if (fromKey === toKey) {
      const fallback = supportedChains.find((c) => c.key !== fromKey)
      if (fallback) setToKey(fallback.key)
    }
  }, [fromKey, toKey])

  useEffect(() => {
    if (address && !destination) setDestination(address)
  }, [address, destination])

  const decimalsQuery = useQuery({
    queryKey: ['decimals', sourceChain.key],
    queryFn: async () => {
      const client = createPublicClient({
        chain: sourceChain.viemChain,
        transport: http(sourceChain.rpcUrls[0]),
      })
      return client.readContract({
        address: sourceChain.oftAddress,
        abi: erc20Abi,
        functionName: 'decimals',
      }) as Promise<number>
    },
  })

  const balanceQuery = useQuery({
    queryKey: ['balance', sourceChain.key, address],
    enabled: Boolean(address),
    queryFn: async () => {
      if (!address) return 0n
      const client = createPublicClient({
        chain: sourceChain.viemChain,
        transport: http(sourceChain.rpcUrls[0]),
      })
      return client.readContract({
        address: sourceChain.oftAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      }) as Promise<bigint>
    },
  })

  const decimals = decimalsQuery.data ?? 18

  const parsedAmount = useMemo(() => {
    if (!amount) return null
    try {
      return parseUnits(amount, decimals)
    } catch {
      return null
    }
  }, [amount, decimals])

  const targetAddress = useMemo(() => {
    if (destination && isAddress(destination)) return destination
    if (address && isAddress(address)) return address
    return null
  }, [destination, address])

  const minAmountLD = useMemo(() => {
    if (!parsedAmount) return null
    const slippageBps = Math.min(Math.max(slippage, 0), 99.99)
    const bps = BigInt(Math.round(slippageBps * 100))
    return (parsedAmount * (10_000n - bps)) / 10_000n
  }, [parsedAmount, slippage])

  const extraOptions = useMemo(
    () =>
      Options.newOptions()
        .addExecutorLzReceiveOption(BigInt(gasLimit))
        .toHex() as `0x${string}`,
    [gasLimit],
  )

  const sendParam = useMemo(() => {
    if (!parsedAmount || !minAmountLD || !destinationChain || !targetAddress)
      return null

    return {
      dstEid: destinationChain.lzEid,
      to: bytesToHex(addressToBytes32(targetAddress)),
      amountLD: parsedAmount,
      minAmountLD,
      extraOptions,
      composeMsg: '0x' as `0x${string}`,
      oftCmd: '0x' as `0x${string}`,
    }
  }, [destinationChain, minAmountLD, parsedAmount, targetAddress, extraOptions])

  const quoteQuery = useQuery({
    queryKey: [
      'quote',
      fromKey,
      toKey,
      amount,
      slippage,
      gasLimit,
      destination,
    ],
    enabled: Boolean(sendParam),
    refetchInterval: 12_000,
    queryFn: async () => {
      if (!sendParam) throw new Error('Missing params')
      const client = createPublicClient({
        chain: sourceChain.viemChain,
        transport: http(sourceChain.rpcUrls[0]),
      })
      return client.readContract({
        address: sourceChain.oftAddress,
        abi: oftAbi,
        functionName: 'quoteSend',
        args: [sendParam, false],
      }) as Promise<MessagingFee>
    },
  })

  const canBridge =
    Boolean(sendParam) &&
    Boolean(parsedAmount && parsedAmount > 0n) &&
    Boolean(targetAddress) &&
    !quoteQuery.isFetching &&
    !decimalsQuery.isFetching

  const handleBridge = async () => {
    try {
      setError(null)
      setStatus(null)
      setLastTx(null)

      if (!isConnected) {
        openConnectModal?.()
        return
      }

      if (!sourceChain || !sendParam || !quoteQuery.data || !targetAddress) {
        throw new Error('Fill out the form to bridge.')
      }

      if (chainId !== sourceChain.chainId) {
        setStatus(`Switching to ${sourceChain.displayName}...`)
        await switchChainAsync({ chainId: sourceChain.chainId })
      }

      const publicClient = createPublicClient({
        chain: sourceChain.viemChain,
        transport: http(sourceChain.rpcUrls[0]),
      })

      setStatus('Checking allowance...')
      const allowance = await publicClient.readContract({
        address: sourceChain.oftAddress,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [address!, sourceChain.oftAddress],
      })

      if (allowance < sendParam.amountLD) {
        setStatus('Approving token spend...')
        const approveHash = await writeContractAsync({
          address: sourceChain.oftAddress,
          abi: erc20Abi,
          functionName: 'approve',
          args: [sourceChain.oftAddress, sendParam.amountLD],
          chainId: sourceChain.chainId,
        })

        await waitForTransactionReceipt(wagmiConfig, { hash: approveHash })
      }

      setStatus('Sending over LayerZero...')
      const txHash = await writeContractAsync({
        address: sourceChain.oftAddress,
        abi: oftAbi,
        functionName: 'send',
        args: [
          sendParam,
          {
            nativeFee: quoteQuery.data.nativeFee,
            lzTokenFee: quoteQuery.data.lzTokenFee,
          },
          address!,
        ],
        value: quoteQuery.data.nativeFee,
        chainId: sourceChain.chainId,
      })

      await waitForTransactionReceipt(wagmiConfig, { hash: txHash })
      setLastTx(txHash)
      setStatus('Bridge submitted!')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
      setStatus(null)
    }
  }

  return (
    <div className="page">
      <div className="header">
        <div>
          <p className="eyebrow">LayerZero OFT Bridge</p>
          <h1>Move liquidity anywhere.</h1>
          <p className="subhead">
            Bridge the OFT across Ethereum, L2s, and alt L1s with LayerZero v2.
          </p>
        </div>
        <ConnectButton />
      </div>

      <div className="bridge-card">
        <div className="bridge-grid">
          <div>
            <label>From chain</label>
            <select
              value={fromKey}
              onChange={(e) => setFromKey(e.target.value as ChainKey)}
            >
              {supportedChains.map((chain) => (
                <option key={chain.key} value={chain.key}>
                  {chain.displayName}
                </option>
              ))}
            </select>
            <p className="muted">
              Balance:{' '}
              {balanceQuery.data !== undefined
                ? formatUnits(balanceQuery.data, decimals)
                : '—'}{' '}
              {sourceChain.nativeCurrency.symbol}
            </p>
          </div>
          <div>
            <label>To chain</label>
            <select
              value={toKey}
              onChange={(e) => setToKey(e.target.value as ChainKey)}
            >
              {supportedChains
                .filter((c) => c.key !== fromKey)
                .map((chain) => (
                  <option key={chain.key} value={chain.key}>
                    {chain.displayName}
                  </option>
                ))}
            </select>
            <p className="muted">LayerZero EID: {destinationChain.lzEid}</p>
          </div>
        </div>

        <div className="input-row">
          <div className="field">
            <label>Amount</label>
            <div className="input-shell">
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  if (balanceQuery.data !== undefined) {
                    setAmount(formatUnits(balanceQuery.data, decimals))
                  }
                }}
              >
                Max
              </button>
            </div>
          </div>
          <div className="field">
            <label>Slippage (%)</label>
            <input
              type="number"
              min="0"
              max="99"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="field">
            <label>Destination address</label>
            <input
              type="text"
              value={destination}
              placeholder="0x..."
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Gas limit (dst)</label>
            <input
              type="number"
              min="100000"
              step="1000"
              value={gasLimit}
              onChange={(e) => setGasLimit(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="pill-grid">
          <div>
            <p className="muted">Expected receive</p>
            <strong>
              {minAmountLD
                ? `${formatUnits(minAmountLD, decimals)} tokens`
                : '—'}
            </strong>
          </div>
          <div>
            <p className="muted">Messaging fee</p>
            <strong>
              {quoteQuery.data
                ? `${formatUnits(
                    quoteQuery.data.nativeFee,
                    sourceChain.nativeCurrency.decimals,
                  )} ${sourceChain.nativeCurrency.symbol}`
                : quoteQuery.isFetching
                ? 'Quoting...'
                : '—'}
            </strong>
          </div>
          <div>
            <p className="muted">LayerZero EIDs</p>
            <strong>
              {sourceChain.lzEid} → {destinationChain.lzEid}
            </strong>
          </div>
        </div>

        {error && <div className="banner error">{error}</div>}
        {status && !error && <div className="banner">{status}</div>}
        {lastTx && (
          <div className="banner success">
            Sent! Tx:{' '}
            <a
              href={`${sourceChain.blockExplorer || 'https://etherscan.io'}/tx/${lastTx}`}
              target="_blank"
              rel="noreferrer"
            >
              {lastTx.slice(0, 10)}...
            </a>
          </div>
        )}

        <button
          className="primary"
          onClick={handleBridge}
          disabled={!canBridge || isSwitching || isWriting}
        >
          {!isConnected
            ? 'Connect wallet'
            : isSwitching || isWriting
            ? 'Preparing transaction...'
            : 'Bridge tokens'}
        </button>

        <div className="footnote">
          <p className="muted">
            Uses LayerZero v2 OFT `send` with executor gas {gasLimit} and
            slippage guard of {slippage}%.
          </p>
        </div>
      </div>
    </div>
  )
}
