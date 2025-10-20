import { useState } from "react";
import { Menu, X, TrendingUp, DollarSign, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/DashboardSidebar";
import type { SidebarTab } from "@/components/DashboardSidebar";
import goldNugget from "@/assets/gold-nugget.png";
import goldCoins from "@/assets/gold-coins.png";
import goldMap from "@/assets/gold-map.png";
import sandCharm from "@/assets/sand-charm.png";

const Dashboard = () => {
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

  const tabLabels: Record<SidebarTab, string> = {
    "top-deals": "Top Deals",
    "stock-market": "Stock Market",
    emails: "Emails",
    notifications: "Notifications",
  };

  const renderTabContent = () => {
    if (activeTab === "top-deals") {
      return (
        <div className="grid h-[calc(100%-3rem)] grid-cols-3 gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </div>
      );
    }

    return (
      <div className="flex h-[calc(100%-3rem)] items-center justify-center rounded-2xl border border-border bg-card/30 text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {tabLabels[activeTab]} dashboard coming soon
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-foreground hover:text-primary"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Gold Mining is the Future</p>
                <h1 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  Virtual Gold Mining
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2">
                <img 
                  src={sandCharm} 
                  alt="Gold Charm" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-primary">SAND CHARM</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="h-[calc(100vh-4rem)] overflow-hidden p-6">
          <div className="flex h-full flex-col gap-6">
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-xl border border-border bg-card p-4 smooth-transition hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Graph</p>
                    <p className="text-lg font-bold text-foreground">+24.5%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 smooth-transition hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-secondary/20 p-2">
                    <DollarSign className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                    <p className="text-lg font-bold text-foreground">$125.4K</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 smooth-transition hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time Limit</p>
                    <p className="text-lg font-bold text-foreground">30 Days</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 smooth-transition hover:border-primary/50">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-secondary/20 p-2">
                    <Target className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target ROI</p>
                    <p className="text-lg font-bold text-foreground">45%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deals Section */}
            <div className="flex-1 overflow-hidden">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  ● {tabLabels[activeTab]}
                </h2>
              </div>

              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
