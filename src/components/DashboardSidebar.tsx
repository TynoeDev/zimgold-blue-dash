import { Gem, TrendingUp, Mail, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { icon: TrendingUp, label: "Top Deals", path: "/dashboard", active: true },
    { icon: TrendingUp, label: "Stock Market", path: "/dashboard" },
    { icon: Mail, label: "Emails", path: "/dashboard" },
    { icon: Bell, label: "Notifications", path: "/dashboard" },
  ];

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar smooth-transition",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold">
            <Gem className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-sm font-bold text-foreground">TREASURE</h1>
              <p className="text-xs text-primary">HUNT</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-3 smooth-transition",
              item.active
                ? "bg-primary text-sidebar-primary-foreground font-semibold"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span>Alex West</span>}
        </Button>
      </div>
    </aside>
  );
};
