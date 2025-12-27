import { Link } from "wouter";
import "./bridge.css";

export default function Buy() {
  const alcorUrl = "https://proton.alcor.exchange/swap?input=XPR-eosio.token&output=WON-w3won";

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
            <p className="bridge-eyebrow">Acquire WON</p>
            <h1 className="bridge-title">Buy WON on Proton</h1>
            <p className="bridge-subhead">
              Trade directly on Proton with the Alcor swap. Cross-chain flows are paused while WON
              operates solely on XPR.
            </p>
          </div>
          <div className="bridge-nav-links">
            <Link href="/" className="bridge-nav-link">
              Back home
            </Link>
            <Link href="/whitelist" className="bridge-nav-link">
              Whitelist
            </Link>
          </div>
        </div>

        <section className="bridge-card bridge-buy-card">
          <div className="bridge-buy-header">
            <div>
              <p className="bridge-eyebrow">Proton Exchange</p>
              <h2 className="bridge-title">Swap WON on Alcor</h2>
              <p className="bridge-subhead">
                Connect your Proton wallet and trade WON directly on the Alcor DEX.
              </p>
            </div>
            <a
              href={alcorUrl}
              className="bridge-nav-link"
              target="_blank"
              rel="noreferrer"
            >
              Open in Alcor
            </a>
          </div>
          <div className="bridge-embed">
            <iframe
              title="WON on Alcor Exchange"
              src={alcorUrl}
              loading="lazy"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
