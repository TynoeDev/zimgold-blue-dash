import { useState } from "react";
import { 
  Menu, TrendingUp, Shield, Trophy, Sparkles, 
  Wallet, Users, Gauge, Target, Award, Crown,
  ChevronRight, Star, Zap, Lock, ChevronDown, ChevronUp,
  Home, MessageSquare, Briefcase, Gift
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
    <div className="h-screen w-full overflow-hidden bg-[#0A0A0A] flex flex-col">
      {/* Header - Fixed with Premium Glassmorphism */}
      <header className="border-b border-white/10 glass-card z-10 flex-shrink-0">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary h-8 w-8"
            >
              <Home className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base font-bold bg-gradient-gold bg-clip-text text-transparent">
                Gold Mafia™ Dashboard
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {walletConnected ? (
              <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5">
                <Wallet className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">{walletAddress}</span>
              </div>
            ) : (
              <Button
                onClick={handleConnectWallet}
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-xs h-8 glow-amber-soft transition-all duration-500 hover:scale-105"
              >
                <Wallet className="mr-1.5 h-3.5 w-3.5" />
                Connect Wallet
              </Button>
            )}
            <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5">
              <img 
                src={sandCharm} 
                alt="Gold Charm" 
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-primary">{userData.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Dashboard Grid Layout */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 max-w-[1800px] mx-auto">
          
          {/* Dashboard Grid - Mixed Layout */}
          <div className="grid grid-cols-12 gap-4">
            
            {/* Left Column - Stats & Profile (4 cols) */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              
              {/* Welcome Card - Always Visible */}
              <div className="glass-card-amber rounded-xl p-6 glow-amber-soft">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={sandCharm} 
                    alt="Profile" 
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-500/50 animate-float-gentle"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">Member since {userData.memberSince}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="px-2 py-0.5 rounded-full bg-gradient-gold text-black text-xs font-bold">
                        {userData.currentRank}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Respect Points Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Respect Points</span>
                    <span className="text-sm font-bold text-amber-400">
                      {userData.respectPoints.toLocaleString()} / {userData.nextRankPoints.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {userData.nextRankPoints - userData.respectPoints} points to next rank
                  </p>
                </div>
              </div>

              {/* Quick Stats Grid - Always Visible */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card rounded-xl p-4 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-500/20 p-3 animate-float-gentle">
                      <Target className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{userData.dealsCompleted}</p>
                      <p className="text-xs text-muted-foreground">Deals Closed</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-500/20 p-3 animate-float-gentle">
                      <Zap className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{userData.responseRate}%</p>
                      <p className="text-xs text-muted-foreground">Response Rate</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 hover:scale-105 transition-all duration-500 cursor-pointer col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-500/20 p-3 animate-float-gentle">
                      <Star className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{userData.endorsements}</p>
                      <p className="text-xs text-muted-foreground">Community Endorsements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements - Always Visible */}
              <div className="glass-card-amber rounded-xl p-5 glow-amber-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-amber-500 animate-float-gentle" />
                  <h3 className="text-sm font-bold text-foreground">Achievements</h3>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {achievements.filter(a => a.earned).length}/{achievements.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 hover:scale-105 cursor-pointer ${
                        achievement.earned
                          ? "glass-card-amber glow-amber-soft"
                          : "glass-card opacity-50 hover:opacity-70"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 animate-float-gentle ${
                        achievement.earned
                          ? "bg-gradient-to-br from-amber-500 to-amber-600 glow-amber-soft"
                          : "bg-slate-600"
                      }`}>
                        <achievement.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className={`text-xs font-semibold ${
                        achievement.earned ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Middle Column - Main Content (5 cols) */}
            <div className="col-span-12 lg:col-span-5 space-y-4">
              
              {/* Family Badge NFT - Large Card */}
              <div className="glass-card-purple rounded-xl p-6 glow-purple-soft">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg glow-purple-soft animate-float-gentle">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Family Badge NFT</h3>
                    <p className="text-sm text-muted-foreground">
                      {userData.badgesMinted ? "Minted on Solana" : "Mint your proof of loyalty"}
                    </p>
                  </div>
                </div>

                {!userData.badgesMinted ? (
                  <div className="space-y-4">
                    <div className="glass-card-purple p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-8 w-8 text-purple-400 animate-float-gentle" />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">Get Made — Mint Your Badge</h4>
                          <p className="text-xs text-muted-foreground">
                            Connect your Solana wallet and mint your Family Badge NFT
                          </p>
                        </div>
                      </div>
                      
                      {walletConnected ? (
                        <Button
                          onClick={handleMintBadge}
                          className="w-full bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-bold h-12 glow-purple-soft hover:scale-105 transition-all duration-500"
                        >
                          <Sparkles className="mr-2 h-5 w-5" />
                          Mint Family Badge NFT
                        </Button>
                      ) : (
                        <Button
                          onClick={handleConnectWallet}
                          className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold h-12 hover:scale-105 transition-all duration-500"
                        >
                          <Wallet className="mr-2 h-5 w-5" />
                          Connect Wallet to Mint
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="glass-card rounded-lg p-3 text-center hover:scale-105 transition-all duration-500 cursor-pointer">
                        <p className="text-xs text-muted-foreground mb-1">Network</p>
                        <p className="text-sm font-bold text-foreground">Solana</p>
                      </div>
                      <div className="glass-card rounded-lg p-3 text-center hover:scale-105 transition-all duration-500 cursor-pointer">
                        <p className="text-xs text-muted-foreground mb-1">Standard</p>
                        <p className="text-sm font-bold text-foreground">SPL Token</p>
                      </div>
                      <div className="glass-card rounded-lg p-3 text-center hover:scale-105 transition-all duration-500 cursor-pointer">
                        <p className="text-xs text-muted-foreground mb-1">Gas Fee</p>
                        <p className="text-sm font-bold text-green-400">FREE</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-4 border border-green-500/30 glow-amber-soft">
                    <p className="text-center text-foreground font-semibold">
                      ✅ Your Family Badge is minted and stored on Solana blockchain
                    </p>
                  </div>
                )}
              </div>

              {/* Membership Tiers - Horizontal Layout */}
              <div className="glass-card-purple rounded-xl p-5 glow-purple-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="h-5 w-5 text-purple-400 animate-float-gentle" />
                  <h3 className="text-sm font-bold text-foreground">Hierarchy of Loyalty</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {membershipTiers.map((tier) => (
                    <div
                      key={tier.rank}
                      className={`relative rounded-lg border p-4 transition-all duration-500 hover:scale-105 ${
                        tier.current
                          ? `${tier.ringColor} ring-2 glass-card-purple glow-purple-soft`
                          : tier.locked
                          ? "glass-card opacity-40 hover:opacity-60"
                          : "glass-card hover:border-primary/30"
                      }`}
                    >
                      {tier.current && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-gold text-black text-[0.6rem] font-bold uppercase tracking-wider">
                          Current
                        </div>
                      )}
                      {tier.locked && (
                        <div className="absolute top-2 right-2">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center shadow-lg animate-float-gentle ${
                          tier.current ? 'glow-purple-soft' : ''
                        }`}>
                          <tier.icon className="h-5 w-5 text-white" />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{tier.rank}</h4>
                          <p className="text-xs text-muted-foreground italic">{tier.title}</p>
                          <p className="text-sm font-bold text-amber-400 mt-1">{tier.fee}</p>
                        </div>

                        <ul className="space-y-1 text-left w-full">
                          {tier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-1 text-xs text-muted-foreground">
                              <ChevronRight className="h-3 w-3 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        {!tier.current && !tier.locked && (
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-xs h-7 glow-amber-soft hover:scale-105 transition-all duration-500"
                          >
                            Upgrade
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Navigation & Actions (3 cols) */}
            <div className="col-span-12 lg:col-span-3 space-y-4">
              
              {/* Quick Navigation - Stacked */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/lounge")}
                  className="group w-full relative overflow-hidden rounded-xl glass-card-amber p-5 text-left transition-all duration-500 hover:scale-105 glow-amber-soft shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg glow-amber-soft group-hover:scale-110 transition-all duration-500 animate-float-gentle">
                        <Users className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                      <ChevronRight className="h-5 w-5 text-amber-400 group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-amber-400 transition-colors duration-500">The Lounge</h3>
                    <p className="text-sm text-muted-foreground">Connect & Collaborate</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/command-room")}
                  className="group w-full relative overflow-hidden rounded-xl glass-card-cyan p-5 text-left transition-all duration-500 hover:scale-105 glow-cyan-soft shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg glow-cyan-soft group-hover:scale-110 transition-all duration-500 animate-float-gentle">
                        <Gauge className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                      <ChevronRight className="h-5 w-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-cyan-400 transition-colors duration-500">Command Room</h3>
                    <p className="text-sm text-muted-foreground">Strategize & Execute</p>
                  </div>
                </button>
              </div>

              {/* Activity Feed Placeholder */}
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-400 animate-float-gentle" />
                  <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="h-2 w-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-foreground font-semibold">Deal Closed</p>
                      <p className="text-xs text-muted-foreground">Real Estate Partnership</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-foreground font-semibold">New Endorsement</p>
                      <p className="text-xs text-muted-foreground">From Tony Accardo</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="h-2 w-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-foreground font-semibold">Respect Points</p>
                      <p className="text-xs text-muted-foreground">+150 points earned</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
