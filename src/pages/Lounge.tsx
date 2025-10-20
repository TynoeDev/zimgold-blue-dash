import { useState } from "react";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/DashboardSidebar";
import type { SidebarTab } from "@/components/DashboardSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { cn } from "@/lib/utils";
import goldNugget from "@/assets/gold-nugget.png";
import goldCoins from "@/assets/gold-coins.png";
import goldMap from "@/assets/gold-map.png";
import sandCharm from "@/assets/sand-charm.png";
import goldMountain from "@/assets/gold-mountain.png";

const Lounge = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("top-deals");

  const deals = [
    {
      id: 1,
      title: "1851",
      subtitle: "GOLD NUGGET",
      description: "Premium gold mining opportunity with high returns and secure investment structure.",
      image: goldNugget,
    },
    {
      id: 2,
      title: "1792",
      subtitle: "GOLD COINS",
      description: "Historical gold coins collection with verified authenticity and excellent growth potential.",
      image: goldCoins,
    },
    {
      id: 3,
      title: "1652",
      subtitle: "GOLD MAP",
      description: "Ancient treasure map with verified authenticity and excellent discovery potential.",
      image: goldMap,
    },
  ];

  const tabMeta: Record<SidebarTab, { label: string; accentBullet: string; accentText: string }> = {
    "top-deals": { label: "Top Deals", accentBullet: "bg-amber-400", accentText: "text-amber-300/70" },
    "stock-market": { label: "Stock Market", accentBullet: "bg-cyan-300", accentText: "text-cyan-300/70" },
    emails: { label: "Emails", accentBullet: "bg-purple-400", accentText: "text-purple-300/70" },
    notifications: { label: "Notifications", accentBullet: "bg-blue-400", accentText: "text-blue-300/70" },
  };

  const marketHighlights = [
    {
      id: "aurora",
      title: "Aurora Metals",
      change: "+6.4%",
      note: "Approval secured for the Cascade Ridge expansion phase.",
    },
    {
      id: "blue-river",
      title: "Blue River Holdings",
      change: "+3.1%",
      note: "Volume spike and bullish reversal in mid-session trading.",
    },
    {
      id: "kings-quarry",
      title: "King's Quarry",
      change: "-1.5%",
      note: "Healthy pullback after a strong three-week rally.",
    },
  ];

  const emailUpdates = [
    { id: "auric", name: "Auric Partners", subject: "Due diligence packet ready", time: "2h ago" },
    { id: "prospect", name: "Prospect Guild", subject: "Updated drill results attached", time: "6h ago" },
    { id: "relay", name: "Relay Finance", subject: "Funding schedule confirmed", time: "Yesterday" },
  ];

  const notificationUpdates = [
    { id: "ops", title: "Operations", detail: "Night shift reported record throughput across all sites", time: "12m" },
    { id: "compliance", title: "Compliance", detail: "Environmental auditors cleared the Canyon basin expansion", time: "1h" },
    { id: "security", title: "Security", detail: "Satellite anomaly resolved with no risk indicators", time: "3h" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "stock-market":
        return (
          <div className="grid gap-4 pt-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent p-6 text-white shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-200/85">Market Pulse</p>
              <h3 className="mt-5 text-[34px] font-bold tracking-[0.12em] text-amber-50">+18.4%</h3>
              <p className="mt-4 text-sm leading-relaxed text-amber-50/75">
                Premium mining equities rallied as bullion futures tested a three-year high. Liquidity remains
                abundant with rotation into high-yield exploration plays.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.24em] text-white/70">
                <div>
                  <span className="block text-white/85">Volume</span>
                  <span className="text-lg font-semibold text-white">1.8M</span>
                </div>
                <div className="text-right">
                  <span className="block text-white/85">Volatility</span>
                  <span className="text-lg font-semibold text-white">12.6%</span>
                </div>
                <div>
                  <span className="block text-white/85">Spot Gold</span>
                  <span className="text-lg font-semibold text-white">$2,123</span>
                </div>
                <div className="text-right">
                  <span className="block text-white/85">Outlook</span>
                  <span className="text-lg font-semibold text-emerald-300">Bullish</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/75">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Watchlist</p>
              {marketHighlights.map((highlight) => {
                const isNegative = highlight.change.startsWith("-");
                return (
                  <div
                    key={highlight.id}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                  >
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.24em] uppercase text-white/80">
                        {highlight.title}
                      </p>
                      <p className="mt-1 text-xs text-white/60">{highlight.note}</p>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-semibold tracking-[0.18em]",
                        isNegative ? "text-rose-300" : "text-emerald-300"
                      )}
                    >
                      {highlight.change}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "emails":
        return (
          <div className="flex flex-col gap-3 pt-10">
            {emailUpdates.map((email) => (
              <div
                key={email.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white/80 shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                    {email.name}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">{email.time}</span>
                </div>
                <p className="mt-2 text-sm tracking-wide text-white/70">{email.subject}</p>
              </div>
            ))}
          </div>
        );
      case "notifications":
        return (
          <div className="flex flex-col gap-3 pt-10">
            {notificationUpdates.map((note) => (
              <div
                key={note.id}
                className="rounded-3xl border border-white/8 bg-gradient-to-r from-white/[0.06] to-white/[0.01] px-5 py-4 text-white/80 shadow-[0_14px_28px_rgba(0,0,0,0.32)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                    {note.title}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">{note.time}</span>
                </div>
                <p className="mt-2 text-sm tracking-wide text-white/70">{note.detail}</p>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 gap-4 pt-10 md:grid-cols-3">
            {deals.map((deal) => (
              <div key={deal.id} className="relative z-10">
                <DealCard {...deal} theme="amber" />
              </div>
            ))}
          </div>
        );
    }
  };

  const activeMeta = tabMeta[activeTab];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#050505] lg:flex-row">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex flex-1 overflow-hidden bg-gradient-to-br from-[#090909] via-[#050505] to-[#020202]">
        <div className="flex flex-1 overflow-auto pl-5 pr-0 pt-0 pb-0 sm:pl-8 sm:pr-0 sm:pt-0 sm:pb-0">
          <div className="flex w-full gap-8">
            <section className="flex min-w-0 flex-1 flex-col pt-10 pb-12 sm:pt-12">
              <div className="text-left text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-amber-300/80">
                  Gold Mining in the Future
                </p>
                <h1 className="mt-2 text-[36px] font-bold tracking-[0.14em] text-white sm:text-[40px]">
                  Virtual Gold Mining
                </h1>
              </div>

              <div className="mt-6">
                <h2
                  className={cn(
                    "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
                    activeMeta.accentText
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", activeMeta.accentBullet)} />
                  {activeMeta.label}
                </h2>
                <div className="mt-3 h-px w-full bg-white/10" />

                <div className="relative mt-6 pb-48">{renderTabContent()}</div>
              </div>
            </section>

            <aside
              className="flex w-full max-w-[320px] flex-col self-stretch border-y border-l border-white/5 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent px-5 py-6 pr-8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              style={{ backgroundColor: "rgba(10,10,10,0.95)" }}
            >
              <RightSidebar theme="amber" sandCharmImage={sandCharm} />
            </aside>
          </div>
        </div>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 flex justify-center">
        <img
          src={goldMountain}
          alt="Gold mountain"
          className="w-[min(760px,90vw)] max-w-5xl opacity-95 drop-shadow-[0_32px_42px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  );
};

export default Lounge;
