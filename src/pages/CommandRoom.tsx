import { useState } from "react";
import { Sidebar } from "@/components/DashboardSidebar";
import type { SidebarTab } from "@/components/DashboardSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { cn } from "@/lib/utils";
import sandCharm from "@/assets/sand-charm.png";
import goldMountain from "@/assets/gold-mountain.png";

const CommandRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("ai-assistant");

  const activeCampaigns = [
    {
      id: "cascade",
      name: "Cascade Ridge",
      phase: "Deployment",
      velocity: "68%",
      commander: "R. Sloan",
      eta: "11 days",
      risk: "Low",
    },
    {
      id: "oblivion",
      name: "Oblivion Drift",
      phase: "Recon",
      velocity: "42%",
      commander: "M. Kaito",
      eta: "5 days",
      risk: "Moderate",
    },
    {
      id: "cerulean",
      name: "Cerulean Span",
      phase: "Negotiation",
      velocity: "83%",
      commander: "L. Byrne",
      eta: "16 days",
      risk: "Low",
    },
  ];

  const tabMeta: Record<SidebarTab, { label: string; accentBullet: string; accentText: string }> = {
    "discussion-forums": { label: "Discussion Forums", accentBullet: "bg-cyan-400", accentText: "text-cyan-300/70" },
    "networking-spaces": { label: "Networking Spaces", accentBullet: "bg-cyan-400", accentText: "text-cyan-300/70" },
    "sentiment-analysis": { label: "Sentiment Analysis", accentBullet: "bg-cyan-400", accentText: "text-cyan-300/70" },
    "ai-assistant": { label: "AI Business Assistant", accentBullet: "bg-cyan-300", accentText: "text-cyan-300/70" },
    "analytics-dashboards": { label: "Analytics Dashboards", accentBullet: "bg-amber-400", accentText: "text-amber-300/70" },
    "portfolio-management": { label: "Portfolio Management", accentBullet: "bg-purple-400", accentText: "text-purple-300/70" },
  };

  // Template data for AI Business Assistant
  const aiAssistantTools = [
    {
      id: "market-analysis",
      title: "Market Analysis",
      description: "AI-generated reports on market trends and opportunities",
      status: "active",
      lastUpdate: "2m ago",
    },
    {
      id: "trade-planning",
      title: "Trade Planning",
      description: "Tools to simulate and plan trades with AI recommendations",
      status: "active",
      lastUpdate: "15m ago",
    },
    {
      id: "document-vault",
      title: "Document Vault",
      description: "Secure storage and authentication for business documents and NFTs",
      status: "active",
      lastUpdate: "1h ago",
    },
  ];

  // Template data for Analytics Dashboards
  const analyticsMetrics = [
    {
      id: "performance",
      title: "Performance Metrics",
      value: "+24.5%",
      change: "+5.2%",
      description: "Detailed analytics on your business growth and engagement",
    },
    {
      id: "market-insights",
      title: "Market Insights",
      value: "Bullish",
      change: "+8.1%",
      description: "Live data feeds on industry trends, competitor analysis, and forecasts",
    },
    {
      id: "ai-recommendations",
      title: "AI Recommendations",
      value: "12 Active",
      change: "+3",
      description: "Custom suggestions and alerts based on AI analysis",
    },
  ];

  // Template data for Portfolio Management
  const portfolioAssets = [
    {
      id: "asset-vault",
      title: "Asset Vault",
      description: "Secure storage for NFTs, documents, and business records",
      items: 47,
      value: "$2.3M",
    },
    {
      id: "auth-center",
      title: "Authentication Center",
      description: "Tools to verify and authenticate documents and assets",
      items: 23,
      value: "Verified",
    },
    {
      id: "overview",
      title: "Portfolio Overview",
      description: "A comprehensive dashboard displaying asset performance and growth",
      items: 156,
      value: "+12.8%",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "ai-assistant":
        return (
          <div className="grid gap-6 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-cyan-400/25 bg-[#06141d] p-6 text-white shadow-[0_24px_48px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/75">AI Command Center</p>
                <h3 className="text-[34px] font-bold tracking-[0.12em] text-white">AI Business Assistant</h3>
                <p className="max-w-xl text-sm leading-relaxed text-cyan-100/75">
                  Leverage AI to gain actionable insights and optimize your business strategies.
                  Advanced tools for market analysis, trade planning, and secure document management.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {aiAssistantTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex flex-col gap-3 rounded-2xl border border-cyan-200/15 bg-black/35 p-4 shadow-[0_16px_32px_rgba(0,0,0,0.32)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold tracking-[0.16em] text-white">{tool.title}</p>
                      <span className="rounded-full border border-emerald-300/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-100/70">
                        {tool.status}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-200/80">{tool.description}</p>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/55">
                      <span>Last Update</span>
                      <span className="text-cyan-200">{tool.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 text-white/80 shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">AI Insights</p>
              <div className="mt-5 space-y-4">
                {[
                  { title: "Market Opportunity Alert", detail: "AI detected 23% upside potential in renewable energy sector", priority: "High" },
                  { title: "Risk Assessment Update", detail: "Portfolio diversification recommendations updated", priority: "Medium" },
                  { title: "Competitor Analysis", detail: "New market entrant identified with 15% market share potential", priority: "High" },
                ].map((insight) => (
                  <div key={insight.title} className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-black/35 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{insight.title}</p>
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.26em]",
                        insight.priority === "High" ? "text-rose-300" : "text-amber-300"
                      )}>
                        {insight.priority}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-white/60">{insight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "analytics-dashboards":
        return (
          <div className="grid gap-6 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/18 via-transparent to-[#120b03] p-6 text-white shadow-[0_28px_52px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-200/80">Intelligence Hub</p>
                <h3 className="text-[34px] font-bold tracking-[0.12em] text-white">Analytics Dashboards</h3>
                <p className="max-w-xl text-sm leading-relaxed text-amber-50/75">
                  Monitor your performance and market conditions in real-time with personalized analytics.
                  Comprehensive dashboards for business intelligence and strategic decision-making.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-1">
                {analyticsMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="rounded-2xl border border-amber-200/15 bg-black/35 px-4 py-5 shadow-[0_16px_32px_rgba(0,0,0,0.38)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{metric.title}</p>
                      <span className={cn(
                        "text-xs font-semibold uppercase tracking-[0.28em]",
                        metric.change.startsWith("+") ? "text-emerald-300" : "text-amber-300"
                      )}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-sm text-amber-200/80 mb-3">{metric.description}</p>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/12 bg-white/[0.04] p-6 text-white/80">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Live Market Feed</p>
              {[
                { symbol: "GOLD/USD", price: "2,045.67", change: "+1.23%", status: "up" },
                { symbol: "SILVER/USD", price: "23.45", change: "-0.45%", status: "down" },
                { symbol: "PLATINUM/USD", price: "945.12", change: "+2.67%", status: "up" },
                { symbol: "COPPER/LB", price: "3.89", change: "+0.89%", status: "up" },
              ].map((item) => (
                <div key={item.symbol} className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-black/35 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{item.symbol}</p>
                    <span className={cn(
                      "text-xs font-semibold uppercase tracking-[0.28em]",
                      item.status === "up" ? "text-emerald-300" : "text-rose-300"
                    )}>
                      {item.change}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "portfolio-management":
        return (
          <div className="grid gap-6 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-purple-400/25 bg-gradient-to-br from-purple-500/18 via-transparent to-[#0a0520] p-6 text-white shadow-[0_28px_52px_rgba(0,0,0,0.38)]">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-purple-200/80">Asset Command</p>
                <h3 className="text-[34px] font-bold tracking-[0.12em] text-white">Portfolio Management</h3>
                <p className="max-w-xl text-sm leading-relaxed text-purple-50/75">
                  Securely manage and verify your digital assets and documents in one centralized location.
                  Complete control over your business portfolio with advanced authentication.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {portfolioAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex flex-col gap-3 rounded-2xl border border-purple-200/15 bg-black/35 p-4 shadow-[0_16px_32px_rgba(0,0,0,0.32)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold tracking-[0.16em] text-white">{asset.title}</p>
                      <span className="rounded-full border border-purple-300/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-purple-100/70">
                        {asset.value}
                      </span>
                    </div>
                    <p className="text-sm text-purple-200/80">{asset.description}</p>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/55">
                      <span>Items</span>
                      <span className="text-purple-200">{asset.items}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 text-white/80 shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Recent Activity</p>
              <div className="mt-5 space-y-4">
                {[
                  { action: "NFT Verified", asset: "Gold Claim #1851", time: "2h ago", status: "success" },
                  { action: "Document Stored", asset: "Partnership Agreement", time: "4h ago", status: "success" },
                  { action: "Authentication Pending", asset: "Mining License", time: "6h ago", status: "pending" },
                ].map((activity) => (
                  <div key={activity.asset} className="flex flex-col gap-2 rounded-2xl border border-white/6 bg-black/35 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85">{activity.action}</p>
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.26em]",
                        activity.status === "success" ? "text-emerald-300" : "text-amber-300"
                      )}>
                        {activity.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/70">{activity.asset}</p>
                      <span className="text-xs text-white/45">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center pt-20">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200/80">Coming Soon</p>
              <h3 className="mt-2 text-[24px] font-bold tracking-[0.12em] text-white">Feature Under Development</h3>
              <p className="mt-4 text-sm text-white/60 max-w-md">
                This section is currently being developed to provide enhanced functionality for our command center.
              </p>
            </div>
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

      <main className="relative z-20 flex flex-1 overflow-hidden bg-gradient-to-br from-[#090909] via-[#050505] to-[#020202]">
        <div className="flex flex-1 overflow-auto pl-5 pr-0 pt-0 pb-0 sm:pl-8 sm:pr-0 sm:pt-0 sm:pb-0">
          <div className="flex w-full gap-8">
            {/* Main Content */}
            <section className="flex min-w-0 flex-1 flex-col pt-10 pb-12 sm:pt-12">
              <div className="text-left text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-cyan-300/80">
                  Gold Mining in the Future
                </p>
                <h1 className="mt-2 text-[36px] font-bold tracking-[0.14em] text-white sm:text-[40px]">
                  Command Room
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

      {/* Background mountain - pushed to the back */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] flex justify-center">
        <img
          src={goldMountain}
          alt="Gold mountain"
          className="w-[min(760px,90vw)] max-w-5xl opacity-95 drop-shadow-[0_32px_42px_rgba(0,0,0,0.55)]"
        />
      </div>

      {/* Lightweight volumetric fog - 3 layers for depth with cyan theme */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[10] flex justify-center overflow-hidden">
        {/* Fog layer 1 - furthest */}
        <div 
          className="absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-900/20 via-cyan-800/10 to-transparent blur-3xl animate-fog-drift-1"
          style={{ transform: 'translateX(-50%) translateY(20px)' }}
        />
        
        {/* Fog layer 2 - middle */}
        <div 
          className="absolute bottom-0 left-1/2 h-40 w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-t from-blue-900/15 via-blue-800/8 to-transparent blur-2xl animate-fog-drift-2"
          style={{ transform: 'translateX(-30%) translateY(30px)' }}
        />
        
        {/* Fog layer 3 - closest */}
        <div 
          className="absolute bottom-0 left-1/2 h-36 w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-700/12 via-cyan-600/6 to-transparent blur-xl animate-fog-drift-3"
          style={{ transform: 'translateX(-70%) translateY(40px)' }}
        />
      </div>
    </div>
  );
};

export default CommandRoom;
