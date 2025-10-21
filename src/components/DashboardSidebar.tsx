import { Gem, TrendingUp, Mail, Bell, LogOut, Gauge, Users, Home, Menu, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export type SidebarTab = "discussion-forums" | "networking-spaces" | "sentiment-analysis" | "ai-assistant" | "analytics-dashboards" | "portfolio-management";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab?: SidebarTab;
  onTabChange?: (tab: SidebarTab) => void;
}

const DEFAULT_TAB: SidebarTab = "discussion-forums";

export const Sidebar = ({ isOpen, onToggle, activeTab, onTabChange }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCommandRoom = location.pathname.includes("command-room");

  const loungeLabels: Record<SidebarTab, string> = {
    "discussion-forums": "Forum",
    "networking-spaces": "Networking",
    "sentiment-analysis": "Sentiment",
    "ai-assistant": "AI Assistant",
    "analytics-dashboards": "Analytics",
    "portfolio-management": "Portfolio",
  };

  const commandLabels: Record<SidebarTab, string> = {
    "discussion-forums": "Forum",
    "networking-spaces": "Networking",
    "sentiment-analysis": "Sentiment",
    "ai-assistant": "AI Assistant",
    "analytics-dashboards": "Analytics",
    "portfolio-management": "Portfolio",
  };

  const loungeNavItems: Array<{ key: SidebarTab; icon: LucideIcon; label: string }> = [
    { key: "discussion-forums", icon: TrendingUp, label: loungeLabels["discussion-forums"] },
    { key: "networking-spaces", icon: Users, label: loungeLabels["networking-spaces"] },
    { key: "sentiment-analysis", icon: TrendingUp, label: loungeLabels["sentiment-analysis"] },
  ];

  const commandNavItems: Array<{ key: SidebarTab; icon: LucideIcon; label: string }> = [
    { key: "ai-assistant", icon: Gauge, label: commandLabels["ai-assistant"] },
    { key: "analytics-dashboards", icon: TrendingUp, label: commandLabels["analytics-dashboards"] },
    { key: "portfolio-management", icon: TrendingUp, label: commandLabels["portfolio-management"] },
  ];

  const navItems = isCommandRoom ? commandNavItems : loungeNavItems;

  const resolvedTab = activeTab ?? DEFAULT_TAB;

  const activeGradientClasses = isCommandRoom
    ? "bg-gradient-to-r from-cyan-500 via-cyan-500 to-cyan-600 text-black shadow-[0_12px_28px_rgba(0,0,0,0.45)] md:mr-[-16px] md:pr-7"
    : "bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-black shadow-[0_12px_28px_rgba(0,0,0,0.4)] md:mr-[-16px] md:pr-7";

  const switchRoute = isCommandRoom ? "/lounge" : "/command-room";
  const switchTitle = isCommandRoom ? "Switch to Lounge" : "Switch to Command Room";
  const switchIcon = isCommandRoom ? Users : Gauge;

  const expandedButtonBase =
    "h-11 min-w-[124px] rounded-2xl border backdrop-blur-md px-4 flex items-center justify-center gap-2 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]";
  const collapsedButtonBase =
    "h-11 w-11 rounded-xl border backdrop-blur-md flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.06]";
  const bottomButtonBase = isOpen ? expandedButtonBase : collapsedButtonBase;

  const bottomButtons = [
    {
      key: "switch",
      icon: switchIcon,
      title: switchTitle,
      className: cn(
        bottomButtonBase,
        isCommandRoom
          ? "border-cyan-400/25 bg-cyan-500/12 text-cyan-200 hover:border-cyan-300/40 hover:bg-cyan-500/16 hover:text-cyan-100"
          : "border-amber-400/25 bg-amber-500/12 text-amber-200 hover:border-amber-300/40 hover:bg-amber-500/16 hover:text-amber-100",
        "shadow-[0_16px_32px_rgba(0,0,0,0.35)]"
      ),
      onClick: () => navigate(switchRoute),
    },
    {
      key: "home",
      icon: Home,
      title: "Back to Home",
      className: cn(
        bottomButtonBase,
        "border-purple-400/25 bg-purple-500/12 text-purple-200 hover:border-purple-300/40 hover:bg-purple-500/16 hover:text-purple-100",
        "shadow-[0_16px_32px_rgba(0,0,0,0.35)]"
      ),
      onClick: () => navigate("/"),
    },
    {
      key: "toggle",
      icon: isOpen ? X : Menu,
      title: isOpen ? "Collapse Sidebar" : "Expand Sidebar",
      className: cn(
        bottomButtonBase,
        "border-slate-400/25 bg-slate-500/12 text-slate-200 hover:border-slate-300/40 hover:bg-slate-500/16 hover:text-white",
        "shadow-[0_16px_32px_rgba(0,0,0,0.35)]"
      ),
      onClick: onToggle,
    },
  ] as const;

  return (
    <aside
      className={cn(
  "smooth-transition relative z-30 flex shrink-0 flex-col border-b border-white/5 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent text-[11px] uppercase tracking-[0.14em] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl md:border-b-0 md:border-r",
  "md:h-full md:flex-col",
        "w-full md:w-auto",
        isOpen ? "md:w-[220px]" : "md:w-20"
      )}
      style={{
        background: 'linear-gradient(to right, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0) 100%)',
        backgroundColor: 'rgba(10,10,10,0.98)'
      }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-white/5 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
            <Gem className="h-4 w-4 text-black" strokeWidth={2.8} />
          </div>
          {isOpen && (
            <div className="leading-none">
              <h1 className="text-[11px] font-bold tracking-[0.28em] text-white">TREASURE</h1>
              <p className="text-[9px] font-semibold tracking-[0.32em] text-amber-400">HUNT</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 items-center gap-1.5 px-3 py-2.5 md:flex-col md:items-stretch md:gap-1.5 md:px-2.5 md:py-4">
        {navItems.map((item) => {
          const isActive = resolvedTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange?.(item.key)}
              aria-pressed={isActive}
              className={cn(
                "group relative flex h-11 items-center justify-center gap-2.5 rounded-full px-3.5 font-semibold tracking-[0.18em] transition-all duration-200 md:h-10 md:justify-start md:rounded-l-full md:rounded-r-[16px]",
                isActive
                  ? activeGradientClasses
                  : "text-slate-400/90 hover:bg-white/5 hover:text-slate-300 md:rounded-full",
                isOpen ? "md:px-3.5" : "md:px-2.5",
                !isOpen && "md:justify-center md:[&_span]:hidden"
              )}
            >
              <item.icon
                className="h-[15px] w-[15px] flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                strokeWidth={isActive ? 2.8 : 2.3}
              />
              <span className="text-[9px] font-bold tracking-[0.24em] md:text-[10px] md:tracking-[0.20em]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 px-2.5 pb-3 pt-3">
        <div className="pointer-events-none flex justify-center pb-3">
          <div className="pointer-events-auto flex flex-col gap-2">
            {bottomButtons.map((button) => (
              <Button
                key={button.key}
                type="button"
                variant="ghost"
                onClick={button.onClick}
                title={button.title}
                className={button.className}
              >
                <button.icon className="h-4 w-4" strokeWidth={2} />
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          className={cn(
            "h-auto w-full justify-center gap-2 rounded-full px-2.5 py-2.5 text-[9px] font-bold tracking-[0.22em] text-slate-400/90 transition-colors hover:bg-white/5 hover:text-slate-300",
            isOpen && "md:justify-start md:px-3.5"
          )}
        >
          <LogOut className="h-[15px] w-[15px] flex-shrink-0" strokeWidth={2.3} />
          <span className={cn(!isOpen && "md:hidden")}>Alex West</span>
        </Button>
      </div>
    </aside>
  );
};
