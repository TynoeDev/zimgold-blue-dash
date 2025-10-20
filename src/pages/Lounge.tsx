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
  const [activeTab, setActiveTab] = useState<SidebarTab>("discussion-forums");

  // Template data for Discussion Forums
  const discussionForums = [
    {
      id: "general-insights",
      title: "General Business Insights",
      description: "Industry trends, market news, and strategic discussions",
      threads: 247,
      activeUsers: 89,
      lastActivity: "2m ago",
    },
    {
      id: "deal-rooms",
      title: "Deal Rooms",
      description: "Private and public spaces for partnership discussions and deal-making",
      threads: 156,
      activeUsers: 34,
      lastActivity: "15m ago",
    },
    {
      id: "topic-threads",
      title: "Topic Threads",
      description: "Niche discussions on market trends, investment strategies, and technology",
      threads: 89,
      activeUsers: 67,
      lastActivity: "5m ago",
    },
  ];

  // Template data for Networking Spaces
  const networkingSpaces = [
    {
      id: "introductions",
      title: "Member Introductions",
      description: "New members introduce themselves and connect with the community",
      participants: 45,
      nextEvent: "Live now",
      status: "active",
    },
    {
      id: "virtual-meetups",
      title: "Virtual Meetups",
      description: "Scheduled events, webinars, and roundtable discussions",
      participants: 128,
      nextEvent: "Tomorrow 3PM EST",
      status: "scheduled",
    },
    {
      id: "interest-groups",
      title: "Interest Groups",
      description: "Focused communities around specific industries and topics",
      participants: 76,
      nextEvent: "Friday 2PM EST",
      status: "scheduled",
    },
  ];

  // Template data for Sentiment Analysis
  const sentimentData = [
    {
      id: "market-mood",
      title: "Market Mood Index",
      sentiment: 0.72,
      trend: "bullish",
      change: "+5.2%",
      description: "Overall community sentiment on market conditions",
    },
    {
      id: "deal-activity",
      title: "Deal Activity Pulse",
      sentiment: 0.85,
      trend: "very_active",
      change: "+12.8%",
      description: "Current deal-making activity and partnership interest",
    },
    {
      id: "innovation-drive",
      title: "Innovation Drive",
      sentiment: 0.68,
      trend: "optimistic",
      change: "+3.1%",
      description: "Community enthusiasm for new technologies and approaches",
    },
  ];

  const tabMeta: Record<SidebarTab, { label: string; accentBullet: string; accentText: string }> = {
    "discussion-forums": { label: "Discussion Forums", accentBullet: "bg-amber-400", accentText: "text-amber-300/70" },
    "networking-spaces": { label: "Networking Spaces", accentBullet: "bg-cyan-300", accentText: "text-cyan-300/70" },
    "sentiment-analysis": { label: "Sentiment Analysis", accentBullet: "bg-purple-400", accentText: "text-purple-300/70" },
    "ai-assistant": { label: "AI Assistant", accentBullet: "bg-green-400", accentText: "text-green-300/70" },
    "analytics-dashboards": { label: "Analytics Dashboards", accentBullet: "bg-blue-400", accentText: "text-blue-300/70" },
    "portfolio-management": { label: "Portfolio Management", accentBullet: "bg-red-400", accentText: "text-red-300/70" },
  };

  const activeMeta = tabMeta[activeTab];

  const prospectingSignals = [
    {
      id: "aurora",
      title: "Aurora Vein",
      confidence: 0.92,
      note: "Thermal drones picked a rich quartz streak beneath the east ridge.",
    },
    {
      id: "blue-river",
      title: "Blue River Shelf",
      confidence: 0.74,
      note: "Geophones recorded consistent resonance from shallow pockets.",
    },
    {
      id: "kings-quarry",
      title: "King's Quarry",
      confidence: 0.58,
      note: "Signal dampened overnight but remains above expedition threshold.",
    },
  ];

  const emailUpdates = [
    { id: "auric", name: "Auric Partners", subject: "Due diligence packet ready for review", time: "2h ago" },
    { id: "prospect", name: "Prospect Guild", subject: "Scouting reel + onboarding invite", time: "6h ago" },
    { id: "relay", name: "Relay Finance", subject: "Funding window confirmed for lounge cohort", time: "Yesterday" },
  ];

  const notificationUpdates = [
    { id: "ops", title: "Operations", detail: "Night shift reported record throughput across all sites", time: "12m" },
    { id: "compliance", title: "Compliance", detail: "Environmental auditors cleared the Canyon basin expansion", time: "1h" },
    { id: "security", title: "Security", detail: "Satellite anomaly resolved with no risk indicators", time: "3h" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "discussion-forums":
        return (
          <div className="grid gap-6 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/18 via-transparent to-[#120b03] p-6 text-white shadow-[0_28px_52px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-200/80">Community Hub</p>
                <h3 className="text-[34px] font-bold tracking-[0.12em] text-white">Discussion Forums</h3>
                <p className="max-w-xl text-sm leading-relaxed text-amber-50/75">
                  Engage with fellow professionals in topic-based threads where ideas and deals are shared.
                  From industry trends to partnership opportunities, find your conversation here.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-1">
                {discussionForums.map((forum) => (
                  <div
                    key={forum.id}
                    className="rounded-2xl border border-amber-200/15 bg-black/35 px-4 py-5 text-center shadow-[0_16px_32px_rgba(0,0,0,0.38)]"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-100/60">
                      {forum.title}
                    </p>
                    <p className="mt-2 text-sm text-amber-200/80">{forum.description}</p>
                    <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-white/60">
                      <span>{forum.threads} threads</span>
                      <span>{forum.activeUsers} active</span>
                      <span>{forum.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/12 bg-white/[0.04] p-6 text-white/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Active Discussions</p>
              {[
                { title: "Q4 Market Predictions", author: "MarketSage", replies: 23, time: "1h ago" },
                { title: "AI Integration Strategies", author: "TechVision", replies: 45, time: "3h ago" },
                { title: "Sustainable Investment Opportunities", author: "GreenFinance", replies: 12, time: "5h ago" },
              ].map((thread) => (
                <div key={thread.title} className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-black/35 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{thread.title}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-amber-200/80">{thread.replies} replies</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-white/45">
                    <span>by {thread.author}</span>
                    <span>{thread.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "networking-spaces":
        return (
          <div className="grid gap-6 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-cyan-400/25 bg-[#06141d] p-6 text-white shadow-[0_24px_48px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">Connection Center</p>
                <h3 className="text-[34px] font-bold tracking-[0.12em] text-white">Networking Spaces</h3>
                <p className="max-w-xl text-sm leading-relaxed text-cyan-100/75">
                  Build valuable connections by joining virtual meetups and engaging in real-time discussions.
                  Connect with like-minded professionals and expand your network.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {networkingSpaces.map((space) => (
                  <div
                    key={space.id}
                    className="flex flex-col gap-3 rounded-2xl border border-cyan-200/15 bg-black/35 p-4 shadow-[0_16px_32px_rgba(0,0,0,0.32)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold tracking-[0.16em] text-white">{space.title}</p>
                      <span className={cn(
                        "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]",
                        space.status === "active" ? "border-emerald-300/30 text-emerald-100/70" : "border-cyan-300/30 text-cyan-100/70"
                      )}>
                        {space.status === "active" ? "Live" : "Scheduled"}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-200/80">{space.description}</p>
                    <div className="grid gap-3 text-[11px] uppercase tracking-[0.24em] text-white/55 sm:grid-cols-2">
                      <div>
                        <p className="text-white/70">Participants</p>
                        <p className="text-base font-semibold text-cyan-200">{space.participants}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Next Event</p>
                        <p className="text-base font-semibold text-white">{space.nextEvent}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 text-white/80 shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Upcoming Events</p>
              <div className="mt-5 space-y-4">
                {[
                  { title: "Weekly Business Roundtable", time: "Tomorrow 2PM EST", attendees: 28 },
                  { title: "Tech Innovation Showcase", time: "Friday 4PM EST", attendees: 67 },
                  { title: "Investment Strategy Session", time: "Next Monday 11AM EST", attendees: 45 },
                ].map((event) => (
                  <div key={event.title} className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-black/35 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{event.title}</p>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-200/80">{event.attendees} attending</span>
                    </div>
                    <p className="text-xs leading-relaxed text-white/60">{event.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "sentiment-analysis":
        return (
          <div className="grid gap-6 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-500/18 via-transparent to-[#0a0520] p-6 text-white shadow-[0_28px_52px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-purple-200/80">Intelligence Center</p>
                <h3 className="text-[34px] font-bold tracking-[0.12em] text-white">Sentiment Analysis</h3>
                <p className="max-w-xl text-sm leading-relaxed text-purple-50/75">
                  Stay ahead of the curve by understanding community mood and market sentiment.
                  Real-time insights into trends, feedback, and sector performance.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-1">
                {sentimentData.map((metric) => (
                  <div
                    key={metric.id}
                    className="rounded-2xl border border-purple-200/15 bg-black/35 px-4 py-5 shadow-[0_16px_32px_rgba(0,0,0,0.38)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{metric.title}</p>
                      <span className={cn(
                        "text-xs font-semibold uppercase tracking-[0.28em]",
                        metric.change.startsWith("+") ? "text-emerald-300" : "text-rose-300"
                      )}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-sm text-purple-200/80 mb-3">{metric.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            metric.sentiment > 0.7 ? "bg-emerald-400" : metric.sentiment > 0.5 ? "bg-amber-400" : "bg-rose-400"
                          )}
                          style={{ width: `${metric.sentiment * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white/70">{Math.round(metric.sentiment * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/12 bg-white/[0.04] p-6 text-white/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Trend Analysis</p>
              {[
                { sector: "Technology", sentiment: "Bullish", change: "+8.2%", drivers: "AI breakthroughs, funding rounds" },
                { sector: "Finance", sentiment: "Neutral", change: "+2.1%", drivers: "Stable markets, regulatory clarity" },
                { sector: "Healthcare", sentiment: "Optimistic", change: "+5.7%", drivers: "Innovation pipeline, partnerships" },
              ].map((trend) => (
                <div key={trend.sector} className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-black/35 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{trend.sector}</p>
                    <span className={cn(
                      "text-xs font-semibold uppercase tracking-[0.28em]",
                      trend.sentiment === "Bullish" ? "text-emerald-300" : trend.sentiment === "Optimistic" ? "text-cyan-300" : "text-amber-300"
                    )}>
                      {trend.sentiment}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/60 mb-1">{trend.drivers}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-purple-200/80">{trend.change}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center pt-20">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-200/80">Coming Soon</p>
              <h3 className="mt-2 text-[24px] font-bold tracking-[0.12em] text-white">Feature Under Development</h3>
              <p className="mt-4 text-sm text-white/60 max-w-md">
                This section is currently being developed to provide enhanced functionality for our community.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#050505] lg:flex-row">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="relative z-20 flex flex-1 overflow-hidden bg-gradient-to-br from-[#090909] via-[#050505] to-[#020202]">
        <div className="flex flex-1 overflow-auto pl-5 pr-0 pt-0 pb-0 sm:pl-8 sm:pr-0 sm:pt-0 sm:pb-0">
          <div className="flex w-full gap-8">
            <section className="flex min-w-0 flex-1 flex-col pt-10 pb-12 sm:pt-12">
              <div className="text-left text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-amber-300/80">
                  Gold Mining in the Future
                </p>
                <h1 className="mt-2 text-[36px] font-bold tracking-[0.14em] text-white sm:text-[40px]">
                  Mafia Lounge
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

      {/* Background mountain - pushed to the back */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] flex justify-center">
        <img
          src={goldMountain}
          alt="Gold mountain"
          className="w-[min(760px,90vw)] max-w-5xl opacity-95 drop-shadow-[0_32px_42px_rgba(0,0,0,0.55)]"
        />
      </div>

      {/* Lightweight volumetric fog - 3 layers for depth */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[10] flex justify-center overflow-hidden">
        {/* Fog layer 1 - furthest */}
        <div 
          className="absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-900/20 via-amber-800/10 to-transparent blur-3xl animate-fog-drift-1"
          style={{ transform: 'translateX(-50%) translateY(20px)' }}
        />
        
        {/* Fog layer 2 - middle */}
        <div 
          className="absolute bottom-0 left-1/2 h-40 w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-900/15 via-orange-800/8 to-transparent blur-2xl animate-fog-drift-2"
          style={{ transform: 'translateX(-30%) translateY(30px)' }}
        />
        
        {/* Fog layer 3 - closest */}
        <div 
          className="absolute bottom-0 left-1/2 h-36 w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-700/12 via-amber-600/6 to-transparent blur-xl animate-fog-drift-3"
          style={{ transform: 'translateX(-70%) translateY(40px)' }}
        />
      </div>
    </div>
  );
};

export default Lounge;
