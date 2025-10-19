import { Button } from "@/components/ui/button";
import { ArrowRight, Gem, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Gem className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ZIMBABWE GOLD</h1>
                <p className="text-xs text-white/70">Mining Excellence</p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Sign In
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto flex flex-1 items-center px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-sm text-white">Next Generation Gold Mining</span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
                Gold Mining is the{" "}
                <span className="bg-gradient-gold bg-clip-text text-transparent">Future</span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-white/80">
                Join Zimbabwe's premier virtual gold mining platform. Secure investments, verified
                authenticity, and exceptional returns in the world of precious metals.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 smooth-transition"
                >
                  Start Mining
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-white">$125M+</p>
                  <p className="text-sm text-white/70">Assets Managed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">12K+</p>
                  <p className="text-sm text-white/70">Active Investors</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">45%</p>
                  <p className="text-sm text-white/70">Avg. ROI</p>
                </div>
              </div>
            </div>

            {/* Right Column - Logo Visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Main Cloud Logo */}
                <div className="relative flex h-96 w-96 items-center justify-center">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-3xl" />
                  
                  <div className="relative">
                    <div className="flex h-64 w-64 items-center justify-center rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm smooth-transition hover:scale-105">
                      <img
                        src="https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&h=200&fit=crop"
                        alt="Gold"
                        className="h-40 w-40 object-contain"
                      />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute left-0 top-12 animate-bounce rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="absolute right-0 top-12 animate-bounce rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm" style={{ animationDelay: '0.5s' }}>
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div className="absolute bottom-12 left-12 animate-bounce rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm" style={{ animationDelay: '1s' }}>
                    <Gem className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6">
          <div className="container mx-auto px-6 text-center text-sm text-white/60">
            © 2024 Zimbabwe Gold. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
