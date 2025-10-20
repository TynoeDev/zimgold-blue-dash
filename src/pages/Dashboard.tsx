import { useState } from "react";
import { 
  Menu, X, TrendingUp, Shield, Trophy, Sparkles, 
  Wallet, Users, Gauge, Target, Award, Crown,
  ChevronRight, Star, Zap, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import sandCharm from "@/assets/sand-charm.png";

const Dashboard = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  // Mock user data - Replace with real data from Supabase/Solana
  const userData = {
    name: "Alex West",
    memberSince: "Jan 2025",
    currentRank: "Associate", // Associate | Caporegime | Don | Commission
    respectPoints: 3420,
    nextRankPoints: 5000,
    dealsCompleted: 7,
    badgesMinted: false,
    endorsements: 12,
    responseRate: 94,
  };

  const membershipTiers = [
    {
      rank: "Associate",
      icon: Shield,
      title: "Entry to the Family",
      fee: "FREE",
      color: "from-slate-400 to-slate-600",
      ringColor: "ring-slate-400/30",
      benefits: ["Basic intel digest", "Limited deals", "Observer status"],
      current: userData.currentRank === "Associate",
    },
    {
      rank: "Caporegime",
      icon: Award,
      title: "Trusted Operator",
      fee: "$50/mo",
      color: "from-amber-400 to-amber-600",
      ringColor: "ring-amber-400/30",
      benefits: ["Full intel access", "Priority Deal Matcher", "Host meetups"],
      current: userData.currentRank === "Caporegime",
      locked: userData.currentRank === "Associate",
    },
    {
      rank: "Don",
      icon: Crown,
      title: "Inner Circle Boss",
      fee: "$500/mo",
      color: "from-purple-400 to-purple-600",
      ringColor: "ring-purple-400/30",
      benefits: ["Private Consigliere", "White-label tools", "Analytics suite"],
      current: userData.currentRank === "Don",
      locked: userData.currentRank !== "Don",
    },
  ];

  const achievements = [
    { id: 1, name: "Deal Maker", icon: Trophy, earned: true },
    { id: 2, name: "Fast Responder", icon: Zap, earned: true },
    { id: 3, name: "Thought Leader", icon: Star, earned: false },
    { id: 4, name: "Founding Member", icon: Sparkles, earned: true },
  ];

  const handleConnectWallet = () => {
    // Mock wallet connection - Replace with actual Solana wallet integration
    setWalletConnected(true);
    setWalletAddress("7xKXt...9mPQz");
  };

  const handleMintBadge = () => {
    // This would trigger the actual NFT minting process
    alert("Badge minting coming soon! This will mint your Family Badge NFT on Solana.");
  };

  const progressPercentage = (userData.respectPoints / userData.nextRankPoints) * 100;

  return (
    <div className="min-h-screen w-full overflow-auto bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Where Intelligence Meets Influence</p>
              <h1 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                Gold Mafia™
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {walletConnected ? (
              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{walletAddress}</span>
              </div>
            ) : (
              <Button
                onClick={handleConnectWallet}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
            <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2">
              <img 
                src={sandCharm} 
                alt="Gold Charm" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-primary">{userData.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Welcome Hero Section */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-card/50 p-8 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10" />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">
                    Welcome to the Family, {userData.name}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    You're either in the Family… or you're not. Build your reputation on-chain, 
                    earn Respect Points, and climb the ranks from Associate to Don.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Rank</p>
                    <p className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                      {userData.currentRank}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">Member since {userData.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 smooth-transition hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Respect Points</p>
                  <p className="text-2xl font-bold text-foreground">{userData.respectPoints.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userData.nextRankPoints - userData.respectPoints} to next rank
                  </p>
                </div>
                <div className="rounded-lg bg-amber-500/20 p-3">
                  <Trophy className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3 h-2 w-full rounded-full bg-border overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 smooth-transition"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 smooth-transition hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Deals Closed</p>
                  <p className="text-2xl font-bold text-foreground">{userData.dealsCompleted}</p>
                  <p className="text-xs text-green-400 mt-1">+2 this month</p>
                </div>
                <div className="rounded-lg bg-green-500/20 p-3">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 smooth-transition hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Endorsements</p>
                  <p className="text-2xl font-bold text-foreground">{userData.endorsements}</p>
                  <p className="text-xs text-blue-400 mt-1">From verified members</p>
                </div>
                <div className="rounded-lg bg-blue-500/20 p-3">
                  <Star className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 smooth-transition hover:border-primary/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Response Rate</p>
                  <p className="text-2xl font-bold text-foreground">{userData.responseRate}%</p>
                  <p className="text-xs text-purple-400 mt-1">Above average</p>
                </div>
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Family Badge NFT Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Badge Minting Card */}
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Your Family Badge</h3>
                  <p className="text-sm text-muted-foreground">
                    Credential, not collectible. Proof of loyalty on-chain.
                  </p>
                </div>
                {userData.badgesMinted && (
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider">
                    Minted
                  </div>
                )}
              </div>

              {!userData.badgesMinted ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-500/20 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Get Made — Mint Your Badge</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect your Solana wallet and mint your Family Badge NFT (gas on us)
                        </p>
                      </div>
                    </div>
                    
                    {walletConnected ? (
                      <Button
                        onClick={handleMintBadge}
                        className="w-full bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-bold py-6 shadow-lg"
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Mint Family Badge NFT
                      </Button>
                    ) : (
                      <Button
                        onClick={handleConnectWallet}
                        className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-6"
                      >
                        <Wallet className="mr-2 h-5 w-5" />
                        Connect Wallet to Mint
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-card/50 border border-border p-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Network</p>
                      <p className="text-sm font-bold text-foreground">Solana</p>
                    </div>
                    <div className="rounded-lg bg-card/50 border border-border p-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Standard</p>
                      <p className="text-sm font-bold text-foreground">SPL Token</p>
                    </div>
                    <div className="rounded-lg bg-card/50 border border-border p-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gas Fee</p>
                      <p className="text-sm font-bold text-green-400">FREE</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6">
                  <p className="text-center text-foreground font-semibold">
                    ✅ Your Family Badge is minted and stored on Solana blockchain
                  </p>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.earned
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-card/50 border-border opacity-50"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      achievement.earned
                        ? "bg-gradient-to-br from-amber-500 to-amber-600"
                        : "bg-slate-600"
                    }`}>
                      <achievement.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{achievement.name}</p>
                    </div>
                    {achievement.earned && (
                      <div className="text-amber-400">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Hierarchy of Loyalty</h3>
              <p className="text-muted-foreground">
                Earn Respect Points, complete verified deals, climb the ranks. Only The Commission decides who gets "made."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {membershipTiers.map((tier) => (
                <div
                  key={tier.rank}
                  className={`relative rounded-2xl border p-6 smooth-transition hover:scale-[1.02] ${
                    tier.current
                      ? `${tier.ringColor} ring-2 bg-gradient-to-br from-card to-card/50`
                      : tier.locked
                      ? "border-border bg-card/30 opacity-60"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  {tier.current && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-gold text-black text-xs font-bold uppercase tracking-wider">
                      Current Rank
                    </div>
                  )}
                  {tier.locked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-lg`}>
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-1">{tier.rank}</h4>
                      <p className="text-sm text-muted-foreground italic">{tier.title}</p>
                      <p className="text-lg font-bold text-amber-400 mt-2">{tier.fee}</p>
                    </div>

                    <ul className="space-y-2 text-left w-full">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {!tier.current && !tier.locked && (
                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                      >
                        Upgrade to {tier.rank}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation to Main Dashboards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate("/lounge")}
              className="group relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/50 via-amber-900/30 to-card p-8 text-left smooth-transition hover:scale-[1.02] hover:border-amber-500/50 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
              <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                    <Users className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">The Lounge</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect • Converse • Collaborate
                    </p>
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <span>Enter The Lounge</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/command-room")}
              className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/50 via-cyan-900/30 to-card p-8 text-left smooth-transition hover:scale-[1.02] hover:border-cyan-500/50 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
              <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Gauge className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Command Room</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Strategize • Analyze • Execute
                    </p>
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                      <span>Enter Command Room</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
