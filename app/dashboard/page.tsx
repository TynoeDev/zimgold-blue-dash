"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState("")
  const [customEmail, setCustomEmail] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for members
  const [members] = useState([
    { name: "Don Soprano", email: "don@goldmafia.org", wallet: "0x1234...5678", rank: "Boss" },
    { name: "Consigliere Ray", email: "ray@goldmafia.org", wallet: "0x2345...6789", rank: "Advisor" },
    { name: "Capo Tony", email: "tony@goldmafia.org", wallet: "0x3456...7890", rank: "Captain" },
    { name: "Soldier Mike", email: "mike@goldmafia.org", wallet: "0x4567...8901", rank: "Enforcer" },
  ])

  // Mock data for projects
  const [projects] = useState([
    { id: 1, title: "Gold NFT Collection", creator: "Don Soprano", funding: "50 SOL", status: "Active" },
    { id: 2, title: "Mafia Metaverse", creator: "Capo Tony", funding: "100 SOL", status: "Active" },
    { id: 3, title: "Token Swap Protocol", creator: "Consigliere Ray", funding: "75 SOL", status: "Funding" },
  ])

  useEffect(() => {
    const wallet = localStorage.getItem("goldmafia_wallet")
    const minted = localStorage.getItem("goldmafia_minted")
    
    if (!wallet || minted !== "true") {
      router.push("/")
      return
    }
    
    setWalletAddress(wallet)
  }, [router])

  const handleReset = () => {
    localStorage.removeItem("goldmafia_minted")
    localStorage.removeItem("goldmafia_wallet")
    router.push("/")
  }

  const getShortWallet = (wallet: string) => {
    return wallet.slice(0, 6) + "..." + wallet.slice(-4)
  }

  const generateEmail = (wallet: string) => {
    const short = wallet.slice(2, 8)
    return customEmail || `mafia.${short}@goldmafia.org`
  }

  const handleCreateEmail = () => {
    if (customEmail && !customEmail.includes("@")) {
      const fullEmail = `${customEmail}@goldmafia.org`
      setCustomEmail(customEmail)
      alert(`Email created: ${fullEmail}`)
    }
  }

  if (!walletAddress) {
    return null
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-y-auto">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-radial from-amber-900/20 via-black to-black pointer-events-none" />
      
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle-gold" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`, 
              animationDuration: `${3 + Math.random() * 4}s` 
            }} 
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 py-3 sm:py-6">
        {/* Top Navigation with Logo - 20% smaller */}
        <div className="flex items-center justify-center mb-3 sm:mb-5">
          <img 
            src="/images/goldmafia-logo.png" 
            alt="Gold Mafia" 
            className="w-8 h-8 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]"
          />
        </div>

        {/* Header - 20% smaller */}
        <div className="text-center mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 gold-text-drip animate-glow-pulse">
            YOUR EMPIRE
          </h1>
          <p className="text-amber-400 text-[10px] sm:text-xs uppercase tracking-widest">Dashboard</p>
        </div>

        {/* Tabs Navigation - 20% smaller */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-3 sm:mb-6 bg-amber-900/20 border border-amber-600/30 h-auto">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[10px] sm:text-xs py-1.5 sm:py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="members" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[10px] sm:text-xs py-1.5 sm:py-2"
            >
              Members
            </TabsTrigger>
            <TabsTrigger 
              value="nft" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[10px] sm:text-xs py-1.5 sm:py-2"
            >
              Mint NFT
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[10px] sm:text-xs py-1.5 sm:py-2"
            >
              Projects
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-3 sm:space-y-5">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
              {/* Wallet Info */}
              <Card className="glass-panel border-amber-600/30">
                <CardHeader className="pb-2 sm:pb-5">
                  <CardTitle className="text-amber-400 text-sm sm:text-base">Wallet Connected</CardTitle>
                  <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Your Solana Address</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-mono text-white text-xs sm:text-base">{getShortWallet(walletAddress)}</p>
                  <Button 
                    size="sm" 
                    className="mt-2 sm:mt-3 bg-amber-600 hover:bg-amber-700 text-black text-[10px] sm:text-xs h-7 sm:h-8"
                    onClick={() => window.open("https://phantom.app/", "_blank")}
                  >
                    Open in Phantom
                  </Button>
                </CardContent>
              </Card>

              {/* Email Management */}
              <Card className="glass-panel border-amber-600/30">
                <CardHeader className="pb-2 sm:pb-5">
                  <CardTitle className="text-amber-400 text-sm sm:text-base">Mafia Email</CardTitle>
                  <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Create Your Custom Email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 pt-0">
                  <p className="text-[10px] sm:text-xs text-white break-all">Current: {generateEmail(walletAddress)}</p>
                  <div className="flex gap-1.5">
                    <Input
                      placeholder="yourname"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="bg-black/50 border-amber-600/50 text-white text-[10px] sm:text-xs h-7 sm:h-8"
                    />
                    <span className="flex items-center text-amber-400 text-[10px] sm:text-xs whitespace-nowrap">@goldmafia.org</span>
                  </div>
                  <Button 
                    onClick={handleCreateEmail}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold text-[10px] sm:text-xs h-7 sm:h-8"
                  >
                    Create Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Gold Bar Visualization */}
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-2 sm:pb-5">
                <CardTitle className="text-amber-400 text-sm sm:text-base">Your Stack</CardTitle>
                <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Empire Wealth Visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-32 sm:h-52">
                  <div className="absolute inset-0 flex items-end justify-center gap-1 sm:gap-1.5">
                    {[60, 80, 100, 95, 75, 85, 70].map((height, i) => (
                      <div 
                        key={i} 
                        className="gold-bar animate-rise" 
                        style={{ 
                          height: `${height}%`, 
                          width: "12%", 
                          animationDelay: `${i * 0.1}s` 
                        }} 
                      />
                    ))}
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 rounded-full border-2 sm:border-3 border-amber-500 bg-black flex items-center justify-center text-base sm:text-2xl animate-float">
                    👑
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-3">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-2 sm:pb-5">
                <CardTitle className="text-amber-400 text-sm sm:text-base">Mafia Members Directory</CardTitle>
                <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Connect with other members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {members.map((member, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-2 sm:p-3 bg-black/30 border border-amber-600/20 rounded-lg hover:border-amber-600/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-amber-600 flex items-center justify-center text-base sm:text-xl shrink-0">
                          {member.rank === "Boss" ? "👑" : member.rank === "Advisor" ? "🎩" : member.rank === "Captain" ? "⭐" : "💎"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-[10px] sm:text-sm truncate">{member.name}</p>
                          <p className="text-[9px] sm:text-xs text-amber-400 truncate">{member.email}</p>
                          <p className="text-[8px] sm:text-[10px] text-amber-600/70 truncate">{member.wallet}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-1.5 sm:px-2 py-0.5 bg-amber-600/20 border border-amber-600/50 rounded-full text-[8px] sm:text-[10px] text-amber-400">
                          {member.rank}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Creation Tab */}
          <TabsContent value="nft" className="space-y-3">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-2 sm:pb-5">
                <CardTitle className="text-amber-400 text-sm sm:text-base">Mint Membership NFT</CardTitle>
                <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Become an official Gold Mafia member</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                  {/* NFT Preview */}
                  <div className="relative w-full aspect-square bg-gradient-radial from-amber-900/40 via-black to-black rounded-lg sm:rounded-xl border border-amber-600/50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-1.5 sm:space-y-3 p-3">
                        <div className="text-3xl sm:text-6xl animate-float">👑</div>
                        <h3 className="text-base sm:text-2xl font-black gold-text-drip">GOLD MAFIA</h3>
                        <p className="text-amber-400 text-[8px] sm:text-xs uppercase tracking-widest">Member #{Math.floor(Math.random() * 10000)}</p>
                      </div>
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/20 to-transparent animate-shine" />
                    {/* Particles */}
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="spark-gold absolute" 
                        style={{ 
                          left: `${Math.random() * 100}%`, 
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`
                        }} 
                      />
                    ))}
                  </div>

                  {/* Membership Info */}
                  <div className="space-y-2 sm:space-y-3">
                    {/* Membership Benefits */}
                    <div className="bg-black/30 border border-amber-600/30 rounded-lg p-2 sm:p-3">
                      <h4 className="text-amber-400 font-bold mb-1.5 sm:mb-2 text-[10px] sm:text-xs">Membership Benefits:</h4>
                      <div className="space-y-1 sm:space-y-1.5 text-white text-[9px] sm:text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-[9px]">✓</span>
                          <span>Community access</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-[9px]">✓</span>
                          <span>Custom email</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-[9px]">✓</span>
                          <span>Project collaboration</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-[9px]">✓</span>
                          <span>Voting rights</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-[9px]">✓</span>
                          <span>Early access</span>
                        </div>
                      </div>
                    </div>

                    {/* Mint Price */}
                    <div className="text-center space-y-1 sm:space-y-1.5 bg-black/30 border border-amber-600/30 rounded-lg p-2 sm:p-3">
                      <p className="text-amber-600 text-[8px] sm:text-[10px] uppercase tracking-widest">Membership Cost</p>
                      <p className="text-2xl sm:text-4xl font-black text-amber-400">0.1 SOL</p>
                      <p className="text-[8px] sm:text-[10px] text-amber-600/70">One-time • Lifetime</p>
                    </div>

                    {/* Mint Button */}
                    <Button 
                      className="w-full bg-linear-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black py-3 sm:py-5 text-xs sm:text-lg hover:scale-105 transition-transform animate-heartbeat"
                      onClick={() => alert("Connecting to Solana wallet to mint membership NFT for 0.1 SOL...")}
                    >
                      👑 Mint Membership NFT
                    </Button>
                  </div>
                </div>

                {/* Footer Note */}
                <p className="text-[8px] sm:text-[10px] text-amber-600/70 text-center">
                  * Your membership NFT will be minted to your connected wallet
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-3">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-2 sm:pb-5">
                <CardTitle className="text-amber-400 text-sm sm:text-base">Project Marketplace</CardTitle>
                <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Collaborate on empire projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold mb-3 sm:mb-5 text-[10px] sm:text-xs h-7 sm:h-8">
                  + Create New Project
                </Button>
                
                <div className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="p-2 sm:p-5 bg-black/30 border border-amber-600/20 rounded-lg hover:border-amber-600/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1.5 sm:mb-2 gap-2">
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-base font-bold text-white mb-0.5 truncate">{project.title}</h3>
                          <p className="text-[10px] sm:text-xs text-amber-400 truncate">by {project.creator}</p>
                        </div>
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold shrink-0 ${
                          project.status === "Active" ? "bg-green-600/20 text-green-400 border border-green-600/50" : 
                          "bg-amber-600/20 text-amber-400 border border-amber-600/50"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-amber-600 font-mono text-[10px] sm:text-sm">{project.funding}</span>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-black text-[9px] sm:text-xs h-6 sm:h-7 px-2 sm:px-3">
                          Join Project
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="mt-5 sm:mt-10 text-center space-y-1.5 sm:space-y-3 pb-3">
          <p className="text-amber-600 text-[10px] sm:text-xs uppercase tracking-widest">No forums. No shit.</p>
          <button 
            onClick={handleReset}
            className="text-amber-600/50 hover:text-amber-600 text-[8px] sm:text-[10px] uppercase tracking-widest transition-colors"
          >
            ← Back to Landing
          </button>
        </div>
      </div>
    </div>
  )
}
