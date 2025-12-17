import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import "./bridge.css";

export default function StablecoinPage() {
  return (
    <div className="bridge-shell">
      <div className="bridge-page">
        <div className="bridge-header">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="https://gateway.pinata.cloud/ipfs/QmaiJCdbAgC6vPXpMKQNNY5gbUVr7AKALuvdTELUpJSDWi" alt="Impact stablecoin logo" className="w-9 h-9 rounded-full object-cover" />
              <span className="font-display font-bold text-xl">Impact Stablecoin Builder</span>
            </div>
            <p className="bridge-eyebrow">Mutiraon-inspired</p>
            <h1 className="bridge-title">Create your own impact-backed stable</h1>
            <p className="bridge-subhead">
              Use the Mutiraon blueprint to spin up a custom stablecoin backed by the impact assets you choose—eco-villages, clean energy, carbon, or your own categories.
            </p>
          </div>
          <div className="bridge-nav-links">
            <Link href="/" className="bridge-nav-link">
              Back home
            </Link>
            <Link href="/tokenization" className="bridge-nav-link">
              Tokenization
            </Link>
            <a
              href="https://github.com/TerexitariusStomp/Mutiraon"
              target="_blank"
              rel="noreferrer"
              className="bridge-nav-link"
            >
              View Mutiraon repo
            </a>
          </div>
        </div>

        <div className="bridge-card">
          <div className="bridge-grid">
            <div>
              <h3 className="bridge-title" style={{ fontSize: "24px" }}>What backs it</h3>
              <p className="bridge-muted" style={{ marginTop: 8 }}>
                Pick impact assets you can point to: carbon tons, solar and microgrid revenue, eco-village upgrades. Held across trusted chains with receipts you can read.
              </p>
            </div>
          </div>

          <div className="bridge-pill-grid" style={{ marginTop: 20 }}>
            <div>
              <p className="bridge-muted">Magic: Transfer Fee</p>
              <strong>
                Arbitrage bots pay the fee that funds regeneration. They race to close price gaps; we route the yield.
              </strong>
              <p className="bridge-muted" style={{ marginTop: 8 }}>
                Plain-speak: the faster traders move, the more impact assets get topped up.
              </p>
            </div>
            <div>
              <p className="bridge-muted">Impact Focus</p>
              <strong>
                Every transaction helps fund eco-villages and regenerative projects around the world. You define the mix; we keep the wording simple.
              </strong>
              <p className="bridge-muted" style={{ marginTop: 8 }}>
                You pick the bucket; we publish the proof and keep the wording simple.
              </p>
            </div>
          </div>

          <div className="bridge-input-row" style={{ marginTop: 22 }}>
            <div className="bridge-field">
              <label className="bridge-label">Stablecoin name</label>
              <input
                type="text"
                className="bridge-input"
                placeholder="e.g., Land-Base-Backed Reserve Dollar"
              />
              <p className="bridge-muted">Give your stable a human-readable name your community recognizes.</p>
            </div>
            <div className="bridge-field">
              <label className="bridge-label">Symbol</label>
              <input
                type="text"
                className="bridge-input"
                placeholder="e.g., CRD"
              />
              <p className="bridge-muted">3–5 letters that pair with your reserves (see Mutiraon repo for patterns).</p>
            </div>
          </div>

          <div className="bridge-input-row" style={{ marginTop: 12 }}>
            <div className="bridge-field">
              <label className="bridge-label">Impact backing (mix)</label>
              <select className="bridge-select">
                <option>Eco-village upgrades</option>
                <option>Carbon and biodiversity credits</option>
                <option>Community micro-grids</option>
                <option>Water and soil restoration</option>
                <option>Custom basket (add your own)</option>
              </select>
              <p className="bridge-muted">Set the mix that collateralizes your stablecoin.</p>
            </div>
            <div className="bridge-field">
              <label className="bridge-label">Transfer fee destination</label>
              <div className="bridge-input" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="bridge-muted">Route fee to regeneration pool</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <p className="bridge-muted">Bots race to balance price; their fee keeps the regeneration pool topped up.</p>
            </div>
          </div>

          <div className="bridge-input-row" style={{ marginTop: 12 }}>
            <div className="bridge-field">
              <label className="bridge-label">Reserve chains</label>
              <select className="bridge-select">
                <option>Ethereum + Base</option>
                <option>Base + Optimism</option>
                <option>Arbitrum + Ethereum</option>
                <option>Custom chain set</option>
              </select>
              <p className="bridge-muted">Pick which chains custody the reserves; see the Mutiraon repo for deployment scripts.</p>
            </div>
            <div className="bridge-field">
              <label className="bridge-label">Target supply (optional)</label>
              <input
                type="number"
                className="bridge-input"
                placeholder="e.g., 1,000,000"
                min="0"
              />
              <p className="bridge-muted">Rough cap or initial mint size for your launch cohort.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
