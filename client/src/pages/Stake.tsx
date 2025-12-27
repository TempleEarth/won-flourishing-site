import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { erc20Abi, parseUnits, type Address } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from "wagmi";
import { Link, useLocation } from "wouter";
import SiteLayout from "@/components/SiteLayout";
import { supportedChains } from "@/lib/layerzeroChains";
import "./bridge.css";

type Region = {
  id: string;
  name: string;
  focus: string;
  staked: number;
  goal: number;
  projects: string[];
};

const regions: Region[] = [
  {
    id: "latam",
    name: "Latin America (LatAm)",
    focus: "The global leader in nature-based solutions (NbS) and a thriving hub for crypto-utility.",
    staked: 1240000,
    goal: 2000000,
    projects: ["Barichara Regeneration Fund", "Tota Sacred Lake", "Amazon soil hubs"]
  },
  {
    id: "africa",
    name: "Africa",
    focus: 'The frontier for "leapfrog" technologies in energy and climate finance.',
    staked: 860000,
    goal: 1500000,
    projects: ["Youth Pawa Mangroves", "Kilimanjaro reforestation", "Lake Victoria biochar"]
  },
  {
    id: "apac",
    name: "Asia-Pacific (APAC)",
    focus: "The global manufacturing engine for transition hardware and adaptation innovation.",
    staked: 540000,
    goal: 1200000,
    projects: ["AERF Myforest Program", "Western Ghats soil labs", "Himalayan food forests"]
  },
  {
    id: "mena",
    name: "Middle East & North Africa (MENA)",
    focus: 'Pivoting from "Oil States" to "Energy Exporters" via massive capital deployment.',
    staked: 430000,
    goal: 1100000,
    projects: ["Sahara solar hubs", "Red Sea mangrove belts"]
  },
  {
    id: "europe",
    name: "Europe",
    focus: 'The regulatory superpower and "Headquarters" for ReFi protocols.',
    staked: 370000,
    goal: 900000,
    projects: ["Regen Network pilots", "Forest commons", "Local energy co-ops"]
  },
  {
    id: "na",
    name: "North America",
    focus: "Tech-driven optimization and investment capital.",
    staked: 290000,
    goal: 850000,
    projects: ["Appalachian soil regen", "Climate tech labs"]
  }
];

const stats = [
  { label: "Total WON staked", value: "2.64M" },
  { label: "Regions in queue", value: "6" },
  { label: "Next allocation cycle", value: "1 project / month" }
];

const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

const STAKING_VAULT_ADDRESS = (import.meta.env.VITE_WON_STAKING_VAULT ?? "").trim();

export default function StakePage() {
  const [location] = useLocation();
  const search = location.split("?")[1] ?? "";
  const regionParam = new URLSearchParams(search).get("region") ?? "";
  const resolvedRegion = regions.some((region) => region.id === regionParam)
    ? regionParam
    : regions[0].id;
  const [selectedRegion, setSelectedRegion] = useState(resolvedRegion);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeError, setStakeError] = useState<string | null>(null);
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const activeChain = useMemo(
    () => supportedChains.find((chain) => chain.chainId === chainId) ?? supportedChains[0],
    [chainId]
  );
  const tokenAddress = activeChain?.oftAddress;
  const stakingVaultAddress = useMemo(
    () => (STAKING_VAULT_ADDRESS || tokenAddress) as Address | undefined,
    [tokenAddress]
  );
  const { data: tokenDecimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
    chainId: activeChain?.chainId,
    query: { enabled: Boolean(tokenAddress) }
  });
  const { data: stakeHash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: stakeHash
  });

  useEffect(() => {
    setSelectedRegion(resolvedRegion);
  }, [resolvedRegion]);

  const handleStake = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    const parsedAmount = Number(stakeAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setStakeError("Enter a valid stake amount.");
      return;
    }
    if (!tokenAddress || !stakingVaultAddress) {
      setStakeError("Select a supported network to stake WON.");
      return;
    }
    setStakeError(null);
    try {
      writeContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [stakingVaultAddress, parseUnits(stakeAmount, tokenDecimals ?? 18)]
      });
    } catch (error) {
      console.error(error);
      setStakeError("Unable to submit the stake transaction. Please try again.");
    }
  };

  return (
    <SiteLayout>
      <div className="bridge-shell">
        <div className="bridge-page">
          <div className="bridge-header">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://gateway.pinata.cloud/ipfs/QmaiJCdbAgC6vPXpMKQNNY5gbUVr7AKALuvdTELUpJSDWi"
                  alt="We Won Logo"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="font-display font-bold text-xl">We Won</span>
              </div>
              <p className="bridge-eyebrow">Stake to Prioritize</p>
              <h1 className="bridge-title">Route WON toward the regions you want funded first.</h1>
              <p className="bridge-subhead">
                Stake WON to elevate regional priorities. Staking is non-custodial, so your WON
                stays yours, and rewards may be distributed to stewards who signal early.
              </p>
            </div>
          </div>

        <div className="bridge-card" id="stake-form">
          <div className="bridge-pill-grid">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="bridge-muted">{stat.label}</p>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>

          <div className="bridge-input-row" style={{ marginTop: 8 }}>
            <div className="bridge-field">
              <label className="bridge-label">Stake amount (WON)</label>
              <div className="bridge-input-shell">
                <input
                  type="number"
                  className="bridge-input"
                  placeholder="e.g., 12,500"
                  min="0"
                  value={stakeAmount}
                  onChange={(event) => setStakeAmount(event.target.value)}
                />
                <button type="button" className="bridge-ghost">
                  Max
                </button>
              </div>
              <p className="bridge-muted">
                Connect your wallet to stake WON. You keep custody of your WON and can unstake at any time.
              </p>
            </div>
            <div className="bridge-field">
              <label className="bridge-label">Select region</label>
              <select
                className="bridge-select"
                value={selectedRegion}
                onChange={(event) => setSelectedRegion(event.target.value)}
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <p className="bridge-muted">Priority updates every 24 hours as stakes move.</p>
            </div>
          </div>

          <div className="bridge-input-row" style={{ marginTop: 10 }}>
            <button
              className="bridge-primary"
              type="button"
              onClick={handleStake}
              disabled={isPending || isConfirming}
            >
              {isConnected ? "Stake WON" : "Connect & stake WON"}
            </button>
            <div className="bridge-banner" style={{ marginTop: 0 }}>
              {isConnected
                ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)} · ${activeChain.displayName}`
                : "Connect your wallet to stake WON on a supported network."}
            </div>
          </div>

          {stakeError && (
            <div className="bridge-banner error" style={{ marginTop: 12 }}>
              {stakeError}
            </div>
          )}
          {isPending && (
            <div className="bridge-banner" style={{ marginTop: 12 }}>
              Wallet signature requested. Confirm the stake transaction in your wallet.
            </div>
          )}
          {isConfirming && (
            <div className="bridge-banner" style={{ marginTop: 12 }}>
              Staking transaction submitted. Waiting for confirmations...
            </div>
          )}
          {isSuccess && (
            <div className="bridge-banner success" style={{ marginTop: 12 }}>
              Stake confirmed on-chain.
            </div>
          )}
          {stakingVaultAddress && (
            <p className="bridge-muted" style={{ marginTop: 8 }}>
              Staking vault: {stakingVaultAddress.slice(0, 6)}...
              {stakingVaultAddress.slice(-4)}
            </p>
          )}

          <div className="bridge-grid" style={{ marginTop: 20 }}>
            {regions.map((region) => {
              const progress = Math.min((region.staked / region.goal) * 100, 100);
              return (
                <div
                  key={region.id}
                  className="border border-border rounded-2xl p-5 shadow-sm bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{region.name}</h3>
                      <p className="bridge-muted" style={{ marginTop: 4 }}>
                        {region.focus}
                      </p>
                    </div>
                    <Link
                      href={`/stake/projects?region=${region.id}`}
                      className="bridge-nav-link"
                    >
                      View projects <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>{formatter.format(region.staked)} WON staked</span>
                      <span className="text-muted-foreground">
                        Goal {formatter.format(region.goal)}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-emerald-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-sm">
                    <p className="text-muted-foreground mb-2">Top impact projects</p>
                    <ul className="space-y-1">
                      {region.projects.map((project) => (
                        <li key={project} className="flex items-center gap-2">
                          <span className="text-emerald-600">•</span>
                          <span>{project}</span>
                          <a
                            className="ml-auto text-primary text-xs font-semibold"
                            href="#stake-form"
                          >
                            Stake WON
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </SiteLayout>
  );
}
