import SiteLayout from "@/components/SiteLayout";
import "./bridge.css";

export default function ProjectFormPage() {
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
              <p className="bridge-eyebrow">Project submission</p>
              <h1 className="bridge-title">Share your regenerative project</h1>
              <p className="bridge-subhead">
                Submissions are reviewed before appearing on the map. Use the embedded Airtable form
                below to submit details for stewardship and verification.
              </p>
            </div>
          </div>

          <div className="bridge-card">
            <div className="bridge-banner">
              Reviewed submissions only. Entries do not automatically populate the public map until
              they pass verification.
            </div>
            <div className="bridge-embed" style={{ minHeight: "560px" }}>
              <iframe
                className="airtable-embed"
                src="https://airtable.com/embed/app5BbZSrDbD3YuHj/pagGTy7bxosiD1ZHd/form"
                frameBorder="0"
                width="100%"
                height="533"
                style={{ background: "transparent", border: "1px solid #ccc" }}
                title="Project submission form"
              />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
