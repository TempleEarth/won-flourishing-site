import SiteLayout from "@/components/SiteLayout";
import "./bridge.css";

export default function BridgePage() {
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
              <p className="bridge-eyebrow">Bridge paused</p>
              <h1 className="bridge-title">WON is live on Proton (XPR)</h1>
              <p className="bridge-subhead">
                Cross-chain bridging is disabled while we focus on the native Proton deployment. Use
                the Proton Alcor swap to move into WON.
              </p>
            </div>
          </div>

          <div className="bridge-card">
            <div className="bridge-banner">
              Bridge status: Offline. Swaps available via{" "}
              <a
                href="https://proton.alcor.exchange/swap?input=XPR-eosio.token&output=WON-w3won"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Proton Alcor
              </a>
              .
            </div>
            <p className="bridge-muted">
              As soon as multi-chain support resumes, on-chain messages will publish here along with
              updated routes and fees. Until then, keep activity on Proton and track APY via the
              calculator page.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
