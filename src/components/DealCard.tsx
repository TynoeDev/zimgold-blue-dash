import { Button } from "@/components/ui/button";

interface DealCardProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const DealCard = ({ title, subtitle, description }: DealCardProps) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-card/50 p-6 card-shadow smooth-transition hover:border-primary/50 hover:glow-gold">
      {/* Image Container */}
      <div className="relative mb-4 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gradient-gold/10">
        <img
          src="https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&h=200&fit=crop"
          alt={subtitle}
          className="h-32 w-32 object-contain smooth-transition group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-1 text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
          {subtitle}
        </p>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Action Button */}
        <Button className="w-full bg-gradient-gold font-semibold text-sidebar-primary-foreground hover:opacity-90 smooth-transition">
          Invest Now
        </Button>
      </div>

      {/* Decorative Corner */}
      <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary glow-gold" />
    </div>
  );
};
