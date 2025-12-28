import { useMemo, useState } from "react";
import { Link } from "wouter";
import "./bridge.css";

const MINIMUM_WON = 5000;

type WalletSnapshot = {
  account: string;
  won: number;
  source: "example" | "onchain";
};

const initialWallets: WalletSnapshot[] = [
  { account: "wonlaunchpad", won: 12850, source: "example" },
  { account: "regenhub.won", won: 9100, source: "example" },
  { account: "impactvault", won: 6400, source: "example" },
  { account: "templeearth", won: 5050, source: "example" }
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);

async function fetchWonBalance(account: string) {
  const response = await fetch("https://proton.greymass.com/v1/chain/get_currency_balance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: "w3won",
      account,
      symbol: "WON"
    })
  });

  const payload = await response.json();
  if (!Array.isArray(payload) || payload.length === 0) return 0;
  const raw = payload[0] as string;
  const numeric = Number(raw.split(" ")[0]);
  return Number.isFinite(numeric) ? numeric : 0;
}

export default function DashboardPage() {
  const [wallets, setWallets] = useState<WalletSnapshot[]>(initialWallets);
  const [accountName, setAccountName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const whitelistedCount = useMemo(
    () => wallets.filter((wallet) => wallet.won >= MINIMUM_WON).length,
    [wallets]
  );

  const eligibleWallets = useMemo(
    () => wallets.filter((wallet) => wallet.won >= MINIMUM_WON),
    [wallets]
  );

  const handleCheckWallet = async () => {
    const trimmed = accountName.trim();
    if (!trimmed) {
      setStatus("Enter a Proton account name to check.");
      return;
    }

    try {
      setChecking(true);
      setStatus("Checking on-chain balance...");
      const balance = await fetchWonBalance(trimmed);
      if (balance >= MINIMUM_WON) {
        setWallets((prev) => {
          const existing = prev.filter((wallet) => wallet.account !== trimmed);
          return [{ account: trimmed, won: balance, source: "onchain" }, ...existing];
        });
        setStatus(
          `On-chain balance detected (${formatNumber(balance)} WON). Added to whitelist view.`
        );
      } else {
        setStatus(
          `On-chain balance is ${formatNumber(balance)} WON. Needs ${formatNumber(
            MINIMUM_WON - balance
          )} more to be whitelisted.`
        );
      }
    } catch (error) {
      console.error(error);
      setStatus("Unable to check the chain right now. Please try again in a moment.");
    } finally {
      setChecking(false);
    }
  };

  return (
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
            <p className="bridge-eyebrow">Whitelist</p>
            <h1 className="bridge-title">WON whitelist status</h1>
            <p className="bridge-subhead">
              Only wallets that meet on-chain WON balance requirements show here. Use WebIO to
              connect a Proton wallet and refresh the whitelist record from chain.
            </p>
          </div>
          <div className="bridge-nav-links">
            <Link href="/" className="bridge-nav-link">
              Back home
            </Link>
            <Link href="/tokenization" className="bridge-nav-link">
              Tokenization
            </Link>
          </div>
        </div>

        <div className="bridge-card">
          <div className="bridge-banner">
            Auto-whitelist threshold: <strong>{formatNumber(MINIMUM_WON)} WON</strong>. On-chain
            balances on XPR drive access status.
          </div>

          <div className="bridge-pill-grid">
            <div>
              <span>Whitelisted wallets</span>
              <strong>{formatNumber(whitelistedCount)}</strong>
            </div>
            <div>
              <span>Minimum on-chain WON</span>
              <strong>{formatNumber(MINIMUM_WON)} WON</strong>
            </div>
            <div>
              <span>Record location</span>
              <strong>On-chain (XPR)</strong>
            </div>
          </div>

          <div className="bridge-input-row">
            <div className="bridge-field">
              <label className="bridge-label" htmlFor="wallet-address">
                Proton account (via WebIO)
              </label>
              <input
                id="wallet-address"
                className="bridge-input"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                placeholder="e.g., wonlaunchpad"
              />
              <p className="bridge-muted">
                Connect with WebIO, then paste your Proton account to refresh the on-chain
                balance.
              </p>
            </div>
            <div className="bridge-field" style={{ alignSelf: "flex-end" }}>
              <button
                className="bridge-primary"
                type="button"
                onClick={handleCheckWallet}
                disabled={checking}
              >
                {checking ? "Checking..." : "Refresh on-chain whitelist"}
              </button>
              <a
                className="bridge-nav-link mt-2 inline-flex"
                href="https://webio.dev/"
                target="_blank"
                rel="noreferrer"
              >
                Connect via WebIO
              </a>
            </div>
          </div>

          {status && <div className="bridge-banner success">{status}</div>}

          <div className="bridge-grid" style={{ marginTop: "16px" }}>
            {eligibleWallets.map((wallet) => {
              const whitelisted = wallet.won >= MINIMUM_WON;

              return (
                <div
                  key={`${wallet.account}-${wallet.won}`}
                  className="bg-white border border-border rounded-2xl p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-primary">
                    {wallet.account}
                  </p>
                  <p className="text-base font-semibold mt-2">
                    Balance: {formatNumber(wallet.won)} WON
                  </p>
                  <p className="bridge-muted">Source: {wallet.source === "onchain" ? "Chain lookup" : "Example"}</p>
                  <div
                    className={`bridge-banner ${whitelisted ? "success" : "error"}`}
                  >
                    {whitelisted
                      ? "Whitelisted for launchpad access."
                      : "Not yet eligible for auto-whitelist."}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
