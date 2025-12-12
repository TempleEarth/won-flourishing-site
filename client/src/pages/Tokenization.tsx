import { Link } from "wouter";
import { Leaf, CheckCircle2 } from "lucide-react";
import "./bridge.css";

const flows = [
  {
    title: "Carbon Credit Vault (ERC-4626)",
    desc: "Users deposit credits; yield is reinvested to accumulate more."
  },
  {
    title: "Fair-trade Cacao Batch (ERC-6960)",
    desc: "Ownership stays in core layer, certifications in extension layer."
  },
  {
    title: "Automated Donations (ERC-995)",
    desc: "Social token routes fee on each transfer to verified beneficiaries."
  },
  {
    title: "Abundant Liquidity Pools",
    desc: "Abundant liquidity pools powered by an abundant stream of funding from WON holders."
  }
];

export default function TokenizationPage() {
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
            <p className="bridge-eyebrow">Tokenization flows</p>
            <h1 className="bridge-title">Automated impact assets</h1>
            <p className="bridge-subhead">
              Simple templates to launch regenerative assets with automated behaviors and clear ownership layers.
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

        <div className="bridge-card">
          <div className="bridge-grid">
            {flows.map((flow) => (
              <div key={flow.title} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="bridge-title" style={{ fontSize: "20px", marginBottom: "8px" }}>
                      {flow.title}
                    </h3>
                    <p className="bridge-muted">{flow.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
