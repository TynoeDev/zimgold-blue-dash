import { DollarSign, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
  theme?: "amber" | "cyan";
  sandCharmImage: string;
  className?: string;
}

const themeTokens = {
  amber: {
    accent: "text-amber-300",
    halo: "bg-amber-500/15",
    iconBg: "bg-amber-400/10",
    iconBorder: "border-amber-400/25",
    gradientId: "gradient-amber",
  },
  cyan: {
    accent: "text-cyan-300",
    halo: "bg-cyan-500/15",
    iconBg: "bg-cyan-400/10",
    iconBorder: "border-cyan-400/25",
    gradientId: "gradient-cyan",
  },
} as const;

const tileBase = "rounded-md border border-white/8 bg-white/[0.02] px-5 py-6 backdrop-blur-sm";

export const RightSidebar = ({ theme = "amber", sandCharmImage, className }: RightSidebarProps) => {
  const tokens = themeTokens[theme];

  return (
    <aside className={cn("flex h-full w-full flex-col", className)}>
      <section className={cn(tileBase, "text-center text-white/90")}> 
        <div className="relative mx-auto mb-4 h-20 w-20">
          <div className={cn("absolute -inset-4 rounded-full blur-2xl opacity-40", tokens.halo)} aria-hidden="true" />
          <div className="absolute inset-0 rounded-full border border-white/10 bg-black/80" />
          <img src={sandCharmImage} alt="Sand Charm" className="relative z-10 h-full w-full object-contain" />
        </div>
        <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-white/40">Badge</p>
        <p className={cn("mt-1 text-sm font-semibold uppercase tracking-[0.32em]", tokens.accent)}>
          Sand Charm
        </p>
      </section>

      <section className={cn(tileBase, "mt-5 flex flex-1 flex-col overflow-hidden")}> 
        <p className="text-center text-[9px] font-medium uppercase tracking-[0.32em] text-white/40">Monthly Graph</p>
        <div className="mt-4 flex-1">
          <svg className="h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="none">
            <path
              d="M 0,85 Q 40,22 80,45 T 140,35 T 200,55"
              fill="none"
              stroke={`url(#${tokens.gradientId})`}
              strokeWidth={3}
              className="drop-shadow-[0_0_16px_rgba(255,255,255,0.15)]"
            />
            <defs>
              <linearGradient id="gradient-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6ee7f9" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <div className="mt-auto flex flex-col gap-4 pt-6 pb-[5px] text-white/80">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border bg-black/60",
            tokens.iconBg,
            tokens.iconBorder
          )}>
            <DollarSign className="h-[18px] w-[18px] text-white" strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">Payment Plan</p>
            <p className="text-sm font-semibold text-white">Available</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full border bg-black/60",
            tokens.iconBg,
            tokens.iconBorder
          )}>
            <Clock className="h-[18px] w-[18px] text-white" strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">Time Limit</p>
            <p className="text-sm font-semibold text-white">30 Days</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
