import { useMemo, useState } from "react";
import { Link } from "wouter";
import "./bridge.css";

const MINIMUM_WON = 5000;

type WalletSnapshot = {
  address: string;
  staked: number;
  donated: number;
};

const initialWallets: WalletSnapshot[] = [
  { address: "0x9f12...8A1c", staked: 2800, donated: 900 },
  { address: "0x42e8...1d0B", staked: 5200, donated: 400 },
  { address: "0x88c1...A7f4", staked: 1500, donated: 2200 }
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);

export default function DashboardPage() {
  const [wallets, setWallets] = useState<WalletSnapshot[]>(initialWallets);
  const [address, setAddress] = useState("");
  const [staked, setStaked] = useState("");
  const [donated, setDonated] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const whitelistedCount = useMemo(
    () =>
      wallets.filter((wallet) => wallet.staked + wallet.donated >= MINIMUM_WON)
        .length,
    [wallets]
  );

  const handleAddWallet = () => {
    setStatus(null);
    const parsedStaked = Number(staked);
    const parsedDonated = Number(donated);

    if (!address.trim()) {
      setStatus("Add a wallet address to track.");
      return;
    }

    if (Number.isNaN(parsedStaked) || Number.isNaN(parsedDonated)) {
      setStatus("Stake and donation amounts must be valid numbers.");
      return;
    }

    const nextWallet: WalletSnapshot = {
      address: address.trim(),
      staked: Math.max(parsedStaked, 0),
      donated: Math.max(parsedDonated, 0)
    };

    setWallets((prev) => [nextWallet, ...prev]);
    setAddress("");
    setStaked("");
    setDonated("");
    setStatus("Wallet added. Whitelist status recalculated.");
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
            <p className="bridge-eyebrow">Launchpad Dashboard</p>
            <h1 className="bridge-title">Investor Whitelisting</h1>
            <p className="bridge-subhead">
              Track WON staking plus donation totals per wallet and auto-whitelist
              supporters who meet the launchpad threshold.
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
            Auto-whitelist threshold: <strong>{formatNumber(MINIMUM_WON)} WON</strong>
            . New token sales automatically include qualified wallets.
          </div>

          <div className="bridge-pill-grid">
            <div>
              <span>Total wallets tracked</span>
              <strong>{formatNumber(wallets.length)}</strong>
            </div>
            <div>
              <span>Wallets eligible for launchpad</span>
              <strong>{formatNumber(whitelistedCount)}</strong>
            </div>
            <div>
              <span>Minimum combined balance</span>
              <strong>{formatNumber(MINIMUM_WON)} WON</strong>
            </div>
          </div>

          <div className="bridge-input-row">
            <div className="bridge-field">
              <label className="bridge-label" htmlFor="wallet-address">
                Wallet address
              </label>
              <input
                id="wallet-address"
                className="bridge-input"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="bridge-field">
              <label className="bridge-label" htmlFor="wallet-staked">
                WON staked
              </label>
              <input
                id="wallet-staked"
                className="bridge-input"
                type="number"
                min="0"
                value={staked}
                onChange={(event) => setStaked(event.target.value)}
                placeholder="0"
              />
            </div>
            <div className="bridge-field">
              <label className="bridge-label" htmlFor="wallet-donated">
                WON donated
              </label>
              <input
                id="wallet-donated"
                className="bridge-input"
                type="number"
                min="0"
                value={donated}
                onChange={(event) => setDonated(event.target.value)}
                placeholder="0"
              />
            </div>
            <div className="bridge-field">
              <label className="bridge-label" aria-hidden="true">
                &nbsp;
              </label>
              <button className="bridge-primary" type="button" onClick={handleAddWallet}>
                Add wallet
              </button>
            </div>
          </div>

          {status && <div className="bridge-banner success">{status}</div>}

          <div className="bridge-grid" style={{ marginTop: "16px" }}>
            {wallets.map((wallet) => {
              const total = wallet.staked + wallet.donated;
              const whitelisted = total >= MINIMUM_WON;

              return (
                <div
                  key={`${wallet.address}-${wallet.staked}-${wallet.donated}`}
                  className="bg-white border border-border rounded-2xl p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-primary">
                    {wallet.address}
                  </p>
                  <p className="bridge-muted">Stake: {formatNumber(wallet.staked)} WON</p>
                  <p className="bridge-muted">
                    Donated: {formatNumber(wallet.donated)} WON
                  </p>
                  <p className="text-base font-semibold mt-2">
                    Total: {formatNumber(total)} WON
                  </p>
                  <div
                    className={`bridge-banner ${whitelisted ? "success" : "error"}`}
                  >
                    {whitelisted
                      ? "Whitelisted for the next launchpad sale."
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
