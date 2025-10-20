interface DealCardProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  theme?: "amber" | "cyan";
}

export const DealCard = ({ title, subtitle, description, image, theme = "amber" }: DealCardProps) => {
  const themeColors = {
    amber: {
      dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.55)]",
      title: "text-amber-300",
      subtitle: "text-amber-200/70",
      glow: "bg-amber-400/15",
      border: "border-amber-500/20",
      shadow: "hover:shadow-[0_20px_50px_rgba(251,191,36,0.12)]",
    },
    cyan: {
      dot: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.55)]",
      title: "text-cyan-300",
      subtitle: "text-cyan-200/80",
      glow: "bg-cyan-400/15",
      border: "border-cyan-500/20",
      shadow: "hover:shadow-[0_20px_50px_rgba(34,211,238,0.12)]",
    }
  };

  const colors = themeColors[theme];

  return (
    <div
      className={`group relative flex h-full flex-col rounded-[28px] border ${colors.border} bg-gradient-to-b from-[#2a2621] to-[#1a1815] px-5 pb-7 pt-6 text-left transition-all duration-500 hover:-translate-y-1 ${colors.shadow}`}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-b-[40px] bg-gradient-to-b from-white/12 via-transparent to-transparent opacity-20" />
      <div className={`absolute right-6 top-6 h-1.5 w-1.5 rounded-full ${colors.dot}`} />

      {/* Protruding Image - extends beyond card boundaries */}
      <div className="relative mx-auto -mt-8 mb-4 flex h-32 w-32 items-center justify-center">
        <img
          src={image}
          alt={subtitle}
          className="relative z-20 h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)]"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className={`text-[28px] font-bold tracking-tight ${colors.title}`}>{title}</h3>
        <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] ${colors.subtitle}`}>
          {subtitle}
        </p>
        <div className="mt-3 h-[1px] w-10 rounded-full bg-white/10" />
        <p className="mt-3 text-[13px] leading-relaxed text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
};
