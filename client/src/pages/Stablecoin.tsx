import { Link } from "wouter";
import { Leaf, ArrowRight } from "lucide-react";
import "./bridge.css";

export default function StablecoinPage() {
  return (
    <div className="bridge-shell">
      <div className="bridge-page">
        <div className="bridge-header">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white">
                <Leaf className="w-4 h-4" />
              </span>
              <span className="font-display font-bold text-xl">We Won</span>
            </div>
            <p className="bridge-eyebrow">Stable Plus</p>
            <h1 className="bridge-title">Impact-backed stability</h1>
            <p className="bridge-subhead">
              Inspired by Mutiraon’s clarity: stable value with transparent reserves, priced for abundance.
            </p>
          </div>
          <div className="bridge-nav-links">
            <Link href="/" className="bridge-nav-link">
              ← Back home
            </Link>
            <Link href="/tokenization" className="bridge-nav-link">
              Tokenization
            </Link>
          </div>
        </div>

        <div className="bridge-card">
          <div className="bridge-grid">
            <div>
              <h3 className="bridge-title" style={{ fontSize: "24px" }}>How it holds</h3>
              <p className="bridge-muted" style={{ marginTop: 8 }}>
                Collateral mix across Ethereum, Arbitrum, Base, Optimism, and Avalanche, with USDC, DAI, and LSTs providing floor value.
              </p>
            </div>
            <div>
              <h3 className="bridge-title" style={{ fontSize: "24px" }}>Price guard</h3>
              <p className="bridge-muted" style={{ marginTop: 8 }}>
                Backed at $1.00; price can rise but will not drop below. Increasing difficulty to approach the floor over time.
              </p>
            </div>
          </div>

          <div className="bridge-pill-grid" style={{ marginTop: 20 }}>
            <div>
              <p className="bridge-muted">Magic: Transfer Fee</p>
              <strong>
                Arbitrage bots pay the fee that funds regeneration. They race to close price gaps; we route the yield.
              </strong>
            </div>
            <div>
              <p className="bridge-muted">The Vision</p>
              <strong>
                Your one-time gift of giving yourself an asset that appreciates also funds a world of abundance on a world tour tokenizing and connecting eco villages.
              </strong>
            </div>
          </div>

          <div className="bridge-input-row" style={{ marginTop: 22 }}>
            <div className="bridge-field">
              <label className="bridge-label">Reserves dashboard (example)</label>
              <div className="bridge-input" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="bridge-muted">Mutiraon-style breakdown</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <p className="bridge-muted">Collateral mix, flows, and proofs—mirroring the Mutiraon layout.</p>
            </div>
            <div className="bridge-field">
              <label className="bridge-label">Rebalance & prove</label>
              <div className="bridge-input" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="bridge-muted">Frequent updates</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <p className="bridge-muted">Transparent state for users and partners to verify backing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
