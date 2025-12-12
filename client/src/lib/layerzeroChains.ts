import type { Address, Chain } from "viem";
import { defineChain } from "viem";

export type ChainKey =
  | "ethereum"
  | "arbitrum"
  | "base"
  | "bsc"
  | "celo"
  | "gnosis"
  | "linea"
  | "monad"
  | "optimism"
  | "scroll"
  | "avalanche"
  | "sonic";

export type LayerZeroChain = {
  key: ChainKey;
  displayName: string;
  lzChain: string;
  chainId: number;
  oftAddress: Address;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  lzEid: number;
  rpcUrls: string[];
  blockExplorer?: string;
  viemChain: Chain;
};

type BaseChain = Omit<LayerZeroChain, "viemChain">;

const baseChains: BaseChain[] = [
  {
    key: "ethereum",
    displayName: "Ethereum",
    lzChain: "ethereum",
    chainId: 1,
    lzEid: 30101,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://ethereum-rpc.publicnode.com"],
    blockExplorer: "https://etherscan.io"
  },
  {
    key: "arbitrum",
    displayName: "Arbitrum One",
    lzChain: "arbitrum",
    chainId: 42161,
    lzEid: 30110,
    oftAddress: "0x35aa94781FAcf8cAB70CBc7Fac6FccB4ECF346b5",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorer: "https://arbiscan.io"
  },
  {
    key: "base",
    displayName: "Base",
    lzChain: "base",
    chainId: 8453,
    lzEid: 30184,
    oftAddress: "0xec229Ce2A929c0418bAa91DC9b74e69490254c33",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorer: "https://basescan.org"
  },
  {
    key: "bsc",
    displayName: "BNB Chain",
    lzChain: "bsc",
    chainId: 56,
    lzEid: 30102,
    oftAddress: "0xb78C7A882CE6E9Ec941B693FE8CAc10BD572f45B",
    nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorer: "https://bscscan.com"
  },
  {
    key: "celo",
    displayName: "Celo",
    lzChain: "celo",
    chainId: 42220,
    lzEid: 30125,
    oftAddress: "0x2a9Ea5A9209531d47d1269e95F66939795b35daC",
    nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorer: "https://celoscan.io"
  },
  {
    key: "gnosis",
    displayName: "Gnosis",
    lzChain: "gnosis",
    chainId: 100,
    lzEid: 30145,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "xDAI", symbol: "XDAI", decimals: 18 },
    rpcUrls: ["https://rpc.gnosischain.com"],
    blockExplorer: "https://gnosisscan.io"
  },
  {
    key: "linea",
    displayName: "Linea",
    lzChain: "linea",
    chainId: 59144,
    lzEid: 30183,
    oftAddress: "0x7aA13f5978566878B97fd3b8f7586DEce121B6A9",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://rpc.linea.build"],
    blockExplorer: "https://lineascan.build"
  },
  {
    key: "monad",
    displayName: "Monad",
    lzChain: "monad",
    chainId: 143,
    lzEid: 30390,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
    rpcUrls: ["https://rpc.monad.xyz"],
    blockExplorer: "https://explorer.monad.xyz"
  },
  {
    key: "optimism",
    displayName: "Optimism",
    lzChain: "optimism",
    chainId: 10,
    lzEid: 30111,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorer: "https://optimistic.etherscan.io"
  },
  {
    key: "scroll",
    displayName: "Scroll",
    lzChain: "scroll",
    chainId: 534352,
    lzEid: 30214,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://rpc.scroll.io"],
    blockExplorer: "https://scrollscan.com"
  },
  {
    key: "avalanche",
    displayName: "Avalanche",
    lzChain: "avalanche",
    chainId: 43114,
    lzEid: 30106,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorer: "https://snowtrace.io"
  },
  {
    key: "sonic",
    displayName: "Sonic",
    lzChain: "sonic",
    chainId: 146,
    lzEid: 30332,
    oftAddress: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
    nativeCurrency: { name: "Sonic", symbol: "S", decimals: 18 },
    rpcUrls: ["https://rpc.soniclabs.com"],
    blockExplorer: "https://sonicscan.org"
  }
];

export const supportedChains: LayerZeroChain[] = baseChains.map((chain) => {
  const viemChain = defineChain({
    id: chain.chainId,
    name: chain.displayName,
    network: chain.lzChain,
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: {
      default: { http: chain.rpcUrls },
      public: { http: chain.rpcUrls }
    },
    blockExplorers: chain.blockExplorer
      ? { default: { name: `${chain.displayName} Explorer`, url: chain.blockExplorer } }
      : undefined
  });

  return { ...chain, viemChain };
});

export const chainByKey: Record<ChainKey, LayerZeroChain> = Object.fromEntries(
  supportedChains.map((chain) => [chain.key, chain])
) as Record<ChainKey, LayerZeroChain>;
