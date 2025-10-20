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

const CommandRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("top-deals");

  const deals = [
    {
      id: 1,
      title: "1851",
      subtitle: "GOLD NUGGET",
      description:
        "Premium gold mining opportunity with high returns and secure investment structure.",
      image: goldNugget,
    },
    {
      id: 2,
      title: "1792",
      subtitle: "GOLD COINS",
      description:
        "Historical gold coins collection with verified authenticity and excellent growth potential.",
      image: goldCoins,
    },
    {
      id: 3,
      title: "1652",
      subtitle: "GOLD MAP",
      description:
        "Ancient treasure map with verified authenticity and excellent discovery potential.",
      image: goldMap,
    },
  ];

  const tabMeta: Record<SidebarTab, { label: string; accentBullet: string; accentText: string }> = {
    "top-deals": { label: "Top Deals", accentBullet: "bg-cyan-300", accentText: "text-cyan-300/70" },
    "stock-market": { label: "Stock Market", accentBullet: "bg-amber-400", accentText: "text-amber-300/70" },
    emails: { label: "Emails", accentBullet: "bg-purple-400", accentText: "text-purple-300/70" },
    notifications: { label: "Notifications", accentBullet: "bg-blue-400", accentText: "text-blue-300/70" },
  };

  const marketHighlights = [
    {
      id: "frost",
      title: "Frostline Ventures",
      change: "+5.8%",
      note: "Streaming agreement locked for deep-core drilling rights.",
    },
    {
      id: "helios",
      title: "Helios Extraction",
      change: "+2.7%",
      note: "Operational efficiency boosted after command patch rollout.",
    },
    {
      id: "nordic",
      title: "Nordic Foundry",
      change: "-0.9%",
      note: "Minor retrace as hedging activity rebalances positions.",
    },
  ];

  const emailUpdates = [
    { id: "ops", name: "Operations Core", subject: "Command protocols synced across clusters", time: "Just now" },
    { id: "intel", name: "Intelligence", subject: "Recon feed flagged four new indicators", time: "48m ago" },
    { id: "finance", name: "Finance Bridge", subject: "Allocation matrix approved", time: "4h ago" },
  ];

  const notificationUpdates = [
    { id: "dispatch", title: "Dispatch", detail: "All drones calibrated to the cyan grid for night run", time: "7m" },
    { id: "systems", title: "Systems", detail: "Command lattice load balanced after firmware refresh", time: "52m" },
    { id: "intel-2", title: "Intel", detail: "Remote prospectors confirmed sample integrity", time: "2h" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "stock-market":
        return (
          <div className="grid gap-4 pt-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/20 via-cyan-500/5 to-transparent p-6 text-white shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200/85">Operations Pulse</p>
              <h3 className="mt-5 text-[34px] font-bold tracking-[0.12em] text-cyan-50">+22.1%</h3>
              <p className="mt-4 text-sm leading-relaxed text-cyan-50/75">
                Command metrics show elevated performance across the remote rigs. Throughput surged while risk
                exposure dropped beneath critical thresholds.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.24em] text-white/70">
                <div>
                  <span className="block text-white/85">Latency</span>
                  <span className="text-lg font-semibold text-white">34ms</span>
                </div>
                <div className="text-right">
                  <span className="block text-white/85">Signal Health</span>
                  <span className="text-lg font-semibold text-emerald-300">97%</span>
                </div>
                <div>
                  <span className="block text-white/85">Active Nodes</span>
                  <span className="text-lg font-semibold text-white">412</span>
                </div>
                <div className="text-right">
                  <span className="block text-white/85">Expansion</span>
                  <span className="text-lg font-semibold text-white">+8 grids</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/75">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Priority Streams</p>
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-200/80">
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-200/80">
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
                <DealCard {...deal} theme="cyan" />
              </div>
            ))}
          </div>
        );
    }
  };

  const activeMeta = tabMeta[activeTab];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#040708] lg:flex-row">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex flex-1 overflow-hidden bg-gradient-to-br from-[#090909] via-[#050505] to-[#020202]">
        <div className="flex flex-1 overflow-auto pl-5 pr-0 pt-0 pb-0 sm:pl-8 sm:pr-0 sm:pt-0 sm:pb-0">
          <div className="flex w-full gap-8">
            {/* Main Content */}
            <section className="flex min-w-0 flex-1 flex-col pt-10 pb-12 sm:pt-12">
              <div className="text-left text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-cyan-300/80">
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

            {/* Right Sidebar Panel */}
            <aside
              className="flex w-full max-w-[320px] flex-col self-stretch border-y border-l border-white/5 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent px-5 py-6 pr-8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              style={{ backgroundColor: "rgba(10,10,10,0.95)" }}
            >
              <RightSidebar theme="cyan" sandCharmImage={sandCharm} />
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

export default CommandRoom;
