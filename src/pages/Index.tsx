import { Cloud, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      {/* Vertical Side Labels */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20">
        <p className="text-xs font-light tracking-[0.3em] text-white/60 [writing-mode:vertical-lr] rotate-180">
          LOGO MARK
        </p>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
        <p className="text-xs font-light tracking-[0.3em] text-white/60 [writing-mode:vertical-lr] rotate-180">
          TYPEFACE
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="py-8">
          <div className="container mx-auto flex items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">ZIMBABWE<sup className="text-xs">™</sup></h1>
            </div>
            <div>
              <p className="text-sm text-white/80">Client's Logo Project</p>
            </div>
          </div>
        </header>

        {/* Main Logo Section */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="flex flex-col items-center">
            {/* Large Cloud Logo with Gold Icon */}
            <div className="relative mb-16 flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
              
              {/* Cloud Shape with Gradient Border */}
              <div className="relative">
                {/* Cloud SVG */}
                <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
                  <defs>
                    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#A855F7', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Cloud outline */}
                  <path
                    d="M 280 140 C 280 120, 260 100, 240 100 C 235 85, 220 75, 200 75 C 175 75, 155 90, 150 110 C 130 110, 115 125, 115 145 C 115 165, 130 180, 150 180 L 270 180 C 285 180, 297 168, 297 153 C 297 145, 290 140, 280 140 Z"
                    fill="none"
                    stroke="url(#cloudGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-fade-in"
                  />
                  
                  {/* Inner gold/letter shape */}
                  <circle cx="200" cy="135" r="65" fill="#1a1a2e" />
                  <path
                    d="M 220 105 L 180 145 L 200 145 L 200 165 L 220 165 L 220 145 L 240 145 Z"
                    fill="#06B6D4"
                    className="drop-shadow-lg"
                  />
                </svg>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="flex gap-6">
              {/* Cloud Card */}
              <div className="group flex h-40 w-44 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md smooth-transition hover:scale-105 hover:border-white/40">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <Cloud className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm font-light text-white">Cloud</p>
              </div>

              {/* Letter Z Card */}
              <div className="group flex h-40 w-44 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md smooth-transition hover:scale-105 hover:border-white/40">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <span className="text-3xl font-bold text-white">Z</span>
                </div>
                <p className="text-sm font-light text-white">Letter Z</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer with Contact Info */}
        <footer className="py-6">
          <div className="container mx-auto flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20">
                <Mail className="h-4 w-4 text-cyan-400" />
              </div>
              <span className="text-sm text-white/70">info@zimbabwegold.com</span>
            </div>
            
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-white/70 smooth-transition hover:text-white"
            >
              Enter Dashboard →
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">+263 123 456 789</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                <Phone className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
