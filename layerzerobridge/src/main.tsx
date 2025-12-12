import React from 'react'
import ReactDOM from 'react-dom/client'
import { RainbowKitProvider, getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import type { Chain } from 'viem'
import App from './App'
import './style.css'
import '@rainbow-me/rainbowkit/styles.css'
import { supportedChains } from './config/chains'

const queryClient = new QueryClient()

const walletConnectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? '403f10c4cf2104d36c5bbb71b261d44a'

const wagmiConfig = getDefaultConfig({
  appName: 'LayerZero OFT Bridge',
  projectId: walletConnectId,
  chains: supportedChains.map((c) => c.viemChain) as [Chain, ...Chain[]],
  transports: Object.fromEntries(
    supportedChains.map((c) => [c.chainId, http(c.rpcUrls[0])]),
  ) as Record<number, ReturnType<typeof http>>,
  ssr: false,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={supportedChains[0].viemChain}
          theme={lightTheme({
            accentColor: '#40e0d0',
            accentColorForeground: '#0b0b10',
            borderRadius: 'small',
            overlayBlur: 'small',
          })}
          modalSize="compact"
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
