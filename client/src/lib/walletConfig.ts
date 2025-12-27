import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import type { Chain } from "viem";
import { http } from "wagmi";
import { supportedChains } from "@/lib/layerzeroChains";

const walletConnectProjectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? "403f10c4cf2104d36c5bbb71b261d44a";

export const wagmiConfig = getDefaultConfig({
  appName: "WON Flourishing",
  projectId: walletConnectProjectId,
  chains: supportedChains.map((chain) => chain.viemChain) as [Chain, ...Chain[]],
  transports: Object.fromEntries(
    supportedChains.map((chain) => [chain.chainId, http(chain.rpcUrls[0])])
  ) as Record<number, ReturnType<typeof http>>,
  ssr: false
});

export const defaultChain = supportedChains[0]?.viemChain;
