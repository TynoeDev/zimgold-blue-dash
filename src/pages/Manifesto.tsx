import { 
  ArrowLeft, Shield, TrendingUp, Sparkles, Users, 
  Brain, Award, Zap, Lock, Crown, Target, Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Manifesto = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: Shield,
      title: "Verified Trust",
      description: "NFT-verified identities. No fake profiles, no time wasters. Your reputation is proven on-chain.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Your personal Consigliere AI delivers real-time market insights, alerts, and recommendations.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Award,
      title: "Earned Respect",
      description: "Climb from Associate to Don through verified deals, endorsements, and proven expertise.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Network,
      title: "Cross-Industry Synergy",
      description: "20 specialized Families. One identity layer. Exponential deal flow across industries.",
      color: "from-green-500 to-green-600",
    },
  ];

  const values = [
    {
      title: "Exclusivity Over Noise",
      description: "In a world of spam networks, we create a private Family where every member is verified, vetted, and valuable.",
    },
    {
      title: "Reputation as Currency",
      description: "Your on-chain reputation travels with you. Build it once, leverage it across every Mafia in the network.",
    },
    {
      title: "Intelligence Meets Influence",
      description: "Combine AI clarity with Web3 trust. Know what matters, act with confidence, dominate your market.",
    },
    {
      title: "The Family First",
      description: "Loyalty is rewarded. Deals are closed. Success is shared. You're either in the Family… or you're not.",
    },
  ];

  const callToAction = [
    { text: "Build your verified reputation on-chain" },
    { text: "Access AI-driven market intelligence" },
    { text: "Connect with verified dealmakers" },
    { text: "Close deals with confidence" },
    { text: "Earn Respect Points and climb ranks" },
    { text: "Join 20 specialized industry Families" },
  ];

  return (
    <div className="min-h-screen w-full overflow-auto bg-gradient-radial from-slate-800 via-blue-900 to-slate-950" style={{
      background: 'radial-gradient(ellipse at top left, #1e40af 0%, #0f172a 40%, #1e1b4b 70%, #0f172a 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-56 -left-56 h-[900px] w-[900px] animate-glow-soft blur-3xl mix-blend-screen"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(45,212,191,0.9) 0%, rgba(56,189,248,0.65) 38%, rgba(15,23,42,0) 68%)",
          }}
        />
        <div className="absolute -top-60 -right-60 h-[1000px] w-[1000px] rounded-full bg-slate-900/60 blur-3xl" />
        <div className="absolute bottom-0 -left-40 h-[900px] w-[900px] rounded-full bg-slate-900/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[800px] w-[800px] rounded-full bg-purple-950/50 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="text-right">
              <h1 className="text-lg font-bold tracking-tight text-white">
                GOLD MAFIA<sup className="text-[0.45rem] align-super">™</sup>
              </h1>
              <p className="text-[0.5rem] font-light uppercase tracking-[0.35em] text-white/70">
                Where Intelligence Meets Influence
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-16 max-w-6xl">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-cyan-500/20 border border-white/20 backdrop-blur-xl">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">The Manifesto</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              You're either in the Family…
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                or you're not.
              </span>
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Gold Mafia is an AI-powered business networking platform built on NFT-verified identities 
              and a culture of earned respect. We merge Web3 trust with AI clarity to create a private 
              Family of professionals whose reputations are proven on-chain.
            </p>
          </div>

          {/* The Problem Section */}
          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                <Zap className="h-4 w-4 text-red-400" />
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">The Problem</span>
              </div>
              
              <h3 className="text-3xl font-bold text-white">
                Too Much Noise, No Trust
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Unverified Players</p>
                      <p className="text-white/60 text-sm">Wasted time and money on fake profiles and unqualified connections.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Generic Information</p>
                      <p className="text-white/60 text-sm">No edge in decision-making with the same data everyone else has.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Reputation Resets</p>
                      <p className="text-white/60 text-sm">Start from zero every time you change platforms or industries.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">Scattered Communities</p>
                      <p className="text-white/60 text-sm">Missed opportunities because dealmakers are fragmented across platforms.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xl text-amber-400 font-bold">
                  Result: Smart people hustle alone in chaos.
                </p>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold text-white">Our Core Principles</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                The foundation of how we operate and what makes Gold Mafia different.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 hover:border-white/20 smooth-transition"
                >
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 smooth-transition`}>
                    <principle.icon className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{principle.title}</h4>
                  <p className="text-white/70 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/30 via-black/30 to-amber-900/30 backdrop-blur-xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Our Values</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  What We Stand For
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{value.title}</h4>
                    </div>
                    <p className="text-white/70 pl-10">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Vision */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">The Vision</span>
            </div>
            
            <h3 className="text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
              "The Family isn't a platform—
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
                it's a power structure."
              </span>
            </h3>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Gold Mafia builds digital trust where business meets culture. We replace spam networks 
              with verified respect. We turn reputation into currency. We fuse AI insight with blockchain 
              proof. We create a living ecosystem of trusted dealmakers across industries.
            </p>
          </div>

          {/* Call to Action List */}
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-3">
                  Join the Family
                </h3>
                <p className="text-white/70">
                  Here's what you get when you become a member:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {callToAction.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 smooth-transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                    <p className="text-white font-semibold">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center space-y-6 py-8">
            <h3 className="text-4xl font-bold text-white">
              Ready to Get Made?
            </h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join the Family. Earn your Badge. Run your Empire.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-6 text-lg shadow-2xl hover:scale-105 smooth-transition"
              >
                <Crown className="mr-2 h-5 w-5" />
                Enter Gold Mafia
              </Button>
              
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/50 text-sm">
            Gold Mafia™ — Where Intelligence Meets Influence
          </p>
          <p className="text-white/30 text-xs mt-2">
            Private Digital Society • Est. 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Manifesto;
