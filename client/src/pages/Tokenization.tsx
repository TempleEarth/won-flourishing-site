import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import "./bridge.css";

type FlowField = {
  label: string;
  type?: "text" | "number" | "select";
  placeholder?: string;
  options?: string[];
  helper?: string;
};

type Flow = {
  title: string;
  desc: string;
  fields: FlowField[];
};

const flows: Flow[] = [
  {
    title: "Carbon Credit Vault (ERC-4626)",
    desc: "Deposit carbon credits, name your vault, and show how many tons you are compounding.",
    fields: [
      { label: "Your name", placeholder: "Amina" },
      { label: "Project name", placeholder: "Cahuita mangrove credits" },
      { label: "Amount of credits", type: "number", placeholder: "120" },
      { label: "Expected yield %", type: "number", placeholder: "4.5" },
      {
        label: "Reinvest cadence",
        type: "select",
        options: ["Auto-compound", "Monthly payout", "Quarterly payout"]
      }
    ]
  },
  {
    title: "Fair-trade Redeemable Land-Base-Backed Value Systems Batch (ERC-6960)",
    desc: "Tokenize a redeemable, interchangeable land-base-backed value systems batch with layered certifications and who stewarded it.",
    fields: [
      { label: "Batch name", placeholder: "Land-Base Value System - Valley Lot #12" },
      { label: "Farmer / co-op", placeholder: "Bribri Collective" },
      { label: "Amount (kg)", type: "number", placeholder: "500" },
      {
        label: "Certification type",
        type: "select",
        options: ["Organic", "Fair Trade", "Rainforest Alliance", "Direct trade"]
      },
      {
        label: "Destination chain",
        type: "select",
        options: ["Ethereum", "Base", "Optimism", "Polygon"]
      }
    ]
  },
  {
    title: "Automated Donations (ERC-995)",
    desc: "Attach a donation stream to every transfer in a social token.",
    fields: [
      { label: "Token name", placeholder: "Community Care Token" },
      { label: "Symbol", placeholder: "CARE" },
      { label: "Donation percentage", type: "number", placeholder: "2.5" },
      { label: "Beneficiary address", placeholder: "0x..." }
    ]
  },
  {
    title: "Abundant Liquidity Pools",
    desc: "Seed liquidity with clear intent and who is funded.",
    fields: [
      { label: "Pool name", placeholder: "Eco-village launch pool" },
      { label: "Initial liquidity amount", type: "number", placeholder: "10,000" },
      {
        label: "Project focus",
        type: "select",
        options: ["Energy", "Water", "Food", "Housing", "Education"]
      },
      { label: "Your wallet", placeholder: "0x..." }
    ]
  }
];

export default function TokenizationPage() {
  return (
    <div className="bridge-shell">
      <div className="bridge-page">
        <div className="bridge-header">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="https://gateway.pinata.cloud/ipfs/QmaiJCdbAgC6vPXpMKQNNY5gbUVr7AKALuvdTELUpJSDWi" alt="We Won Logo" className="w-9 h-9 rounded-full object-cover" />
              <span className="font-display font-bold text-xl">We Won</span>
            </div>
            <p className="bridge-eyebrow">Tokenization Protocols</p>
            <h1 className="bridge-title">Launch Your Impact Asset</h1>
            <p className="bridge-subhead">
              Example tokenization flows only. We removed live inputs so you can focus on the patterns
              before opening a production build.
            </p>
          </div>
          <div className="bridge-nav-links">
            <Link href="/" className="bridge-nav-link">
              Back home
            </Link>
            <Link href="/stablecoin" className="bridge-nav-link">
              Stablecoin
            </Link>
          </div>
        </div>

        <div className="bridge-card">
          <div className="bridge-grid">
            {flows.map((flow, index) => (
              <div key={flow.title} className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="bridge-title" style={{ fontSize: "20px", marginBottom: "8px" }}>
                      {flow.title}
                    </h3>
                    <p className="bridge-muted mb-4">{flow.desc}</p>
                    <div className="space-y-2">
                      {flow.fields.map((field) => (
                        <div key={field.label} className="text-sm">
                          <span className="font-semibold">{field.label}:</span>{" "}
                          <span className="text-muted-foreground">
                            {field.placeholder || "Example value"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="bridge-muted mt-3 text-xs">
                      Example only. Deployments reopen with production staking and licensing checks.
                    </p>
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
