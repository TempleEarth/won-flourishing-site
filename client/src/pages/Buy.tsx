import { LiFiWidget, type WidgetConfig } from "@lifi/widget";
import { useMemo } from "react";
import { Link } from "wouter";
import "./bridge.css";

type Network =
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

const addresses: Record<Network, string> = {
  ethereum: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  arbitrum: "0x35aa94781FAcf8cAB70CBc7Fac6FccB4ECF346b5",
  base: "0xec229Ce2A929c0418bAa91DC9b74e69490254c33",
  bsc: "0xb78C7A882CE6E9Ec941B693FE8CAc10BD572f45B",
  celo: "0x2a9Ea5A9209531d47d1269e95F66939795b35daC",
  gnosis: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  linea: "0x7aA13f5978566878B97fd3b8f7586DEce121B6A9",
  monad: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  optimism: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  scroll: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  avalanche: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2",
  sonic: "0x1F440fB7dab4D3b27617f8e5b4855B476FDd95a2"
};

const supportedChains = [
  { chainId: 1, key: "ethereum" },
  { chainId: 42161, key: "arbitrum" },
  { chainId: 8453, key: "base" },
  { chainId: 56, key: "bsc" },
  { chainId: 42220, key: "celo" },
  { chainId: 100, key: "gnosis" },
  { chainId: 59144, key: "linea" },
  { chainId: 143, key: "monad" },
  { chainId: 10, key: "optimism" },
  { chainId: 534352, key: "scroll" },
  { chainId: 43114, key: "avalanche" },
  { chainId: 146, key: "sonic" }
] as const;

export default function Buy() {
  const toTokens = useMemo(
    () =>
      supportedChains.map((c) => ({
        address: addresses[c.key],
        chainId: c.chainId
      })),
    []
  );

  const config: WidgetConfig = {
    integrator: "WON",
    variant: "wide",
    appearance: "light",
    toChain: 1,
    toToken: addresses.ethereum,
    chains: { allow: supportedChains.map((c) => c.chainId) },
    tokens: {
      include: toTokens.map((token) => ({
        address: token.address,
        chainId: token.chainId,
        decimals: 18,
        symbol: "WON",
        name: "WON",
        priceUSD: "0"
      }))
    }
  };

  return (
    <div className="bridge-shell">
      <div className="bridge-page">
        <div className="bridge-header">
          <div>
            <p className="bridge-eyebrow">Acquire WON</p>
            <h1 className="bridge-title">Buy WON across chains</h1>
            <p className="bridge-subhead">
              Use LiFi to bridge and swap into WON on Ethereum, L2s, and alt L1s with one flow.
            </p>
          </div>
          <div className="bridge-nav-links">
            <Link href="/" className="bridge-nav-link">
              ← Back home
            </Link>
            <Link href="/bridge" className="bridge-nav-link">
              Bridge
            </Link>
          </div>
        </div>

        <div className="bridge-card" style={{ padding: "0", overflow: "hidden" }}>
          <LiFiWidget {...config} />
        </div>
      </div>
    </div>
  );
}
