import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type SiteLayoutProps = {
  children: React.ReactNode;
  showJoin?: boolean;
};

export default function SiteLayout({ children, showJoin = true }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader showJoin={showJoin} />
      <main className="pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
