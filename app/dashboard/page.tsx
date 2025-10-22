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
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")

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
      <div className="relative z-10 max-w-6xl mx-auto px-2 py-2 sm:py-4">
        {/* Top Navigation with Logo - Smaller */}
        <div className="flex items-center justify-center mb-2 sm:mb-3">
          <img 
            src="/images/goldmafia-logo.png" 
            alt="Gold Mafia" 
            className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
          />
        </div>

        {/* Header - Smaller */}
        <div className="text-center mb-3 sm:mb-6">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 gold-text-drip animate-glow-pulse">
            YOUR EMPIRE
          </h1>
          <p className="text-amber-400 text-[8px] sm:text-[10px] uppercase tracking-widest">Dashboard</p>
        </div>

        {/* Tabs Navigation - Smaller */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-2 sm:mb-4 bg-amber-900/20 border border-amber-600/30 h-auto">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[8px] sm:text-[10px] py-1 sm:py-1.5"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="buy" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[8px] sm:text-[10px] py-1 sm:py-1.5"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger 
              value="members" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[8px] sm:text-[10px] py-1 sm:py-1.5"
            >
              Members
            </TabsTrigger>
            <TabsTrigger 
              value="nft" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[8px] sm:text-[10px] py-1 sm:py-1.5"
            >
              Mint NFT
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-black text-[8px] sm:text-[10px] py-1 sm:py-1.5"
            >
              Projects
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-2 sm:space-y-3">
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              {/* Wallet Info */}
              <Card className="glass-panel border-amber-600/30">
                <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                  <CardTitle className="text-amber-400 text-xs sm:text-sm">Wallet Connected</CardTitle>
                  <CardDescription className="text-amber-600/70 text-[8px] sm:text-[10px]">Your Solana Address</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 px-2.5 sm:px-3 pb-2 sm:pb-3">
                  <p className="font-mono text-white text-[10px] sm:text-xs">{getShortWallet(walletAddress)}</p>
                  <Button 
                    size="sm" 
                    className="mt-1 sm:mt-1.5 bg-amber-600 hover:bg-amber-700 text-black text-[8px] sm:text-[10px] h-5 sm:h-6 px-2"
                    onClick={() => window.open("https://phantom.app/", "_blank")}
                  >
                    Open in Phantom
                  </Button>
                </CardContent>
              </Card>

              {/* Email Management */}
              <Card className="glass-panel border-amber-600/30">
                <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                  <CardTitle className="text-amber-400 text-xs sm:text-sm">Mafia Email</CardTitle>
                  <CardDescription className="text-amber-600/70 text-[8px] sm:text-[10px]">Create Your Custom Email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 sm:space-y-1.5 pt-0 px-2.5 sm:px-3 pb-2 sm:pb-3">
                  <p className="text-[8px] sm:text-[10px] text-white break-all">Current: {generateEmail(walletAddress)}</p>
                  <div className="flex gap-1">
                    <Input
                      placeholder="yourname"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="bg-black/50 border-amber-600/50 text-white text-[8px] sm:text-[10px] h-5 sm:h-6 px-2"
                    />
                    <span className="flex items-center text-amber-400 text-[8px] sm:text-[10px] whitespace-nowrap">@goldmafia.org</span>
                  </div>
                  <Button 
                    onClick={handleCreateEmail}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold text-[8px] sm:text-[10px] h-5 sm:h-6"
                  >
                    Create Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Gold Bar Visualization */}
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                <CardTitle className="text-amber-400 text-xs sm:text-sm">Your Stack</CardTitle>
                <CardDescription className="text-amber-600/70 text-[8px] sm:text-[10px]">Empire Wealth Visualization</CardDescription>
              </CardHeader>
              <CardContent className="px-2.5 sm:px-3 pb-2 sm:pb-3">
                <div className="relative w-full h-18 sm:h-30">
                  <div className="absolute inset-0 flex items-end justify-center gap-0.5 sm:gap-1">
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
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500 bg-black flex items-center justify-center text-sm sm:text-xl animate-float">
                    👑
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buy Tab - Raydium Exchange */}
          <TabsContent value="buy" className="space-y-2">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                <CardTitle className="text-amber-400 text-xs sm:text-sm flex items-center gap-1">
                  <span>🌊</span> Raydium Exchange
                </CardTitle>
                <CardDescription className="text-amber-600/70 text-[8px] sm:text-[10px]">Buy & Sell $GOLDMAFIA Tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 px-2.5 sm:px-3 pb-2 sm:pb-3">
                {/* Current Price */}
                <div className="p-2 sm:p-3 bg-black/40 border border-amber-600/30 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] sm:text-[10px] text-amber-600/70">Current Price</span>
                    <span className="text-green-400 text-[8px] sm:text-[10px]">+24.5% 📈</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400">
                    $0.0042069
                  </div>
                  <div className="text-[8px] sm:text-[10px] text-amber-600/70 mt-0.5">
                    1 SOL = 237,529 $GOLDMAFIA
                  </div>
                </div>

                {/* Liquidity Info */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <div className="p-1.5 sm:p-2 bg-black/30 border border-amber-600/20 rounded-lg">
                    <div className="text-[8px] sm:text-[10px] text-amber-600/70">Liquidity</div>
                    <div className="text-xs sm:text-sm font-bold text-white">$1.2M</div>
                  </div>
                  <div className="p-1.5 sm:p-2 bg-black/30 border border-amber-600/20 rounded-lg">
                    <div className="text-[8px] sm:text-[10px] text-amber-600/70">24h Volume</div>
                    <div className="text-xs sm:text-sm font-bold text-white">$456K</div>
                  </div>
                </div>

                {/* Buy Section */}
                <div className="p-2 sm:p-3 bg-amber-900/20 border border-amber-600/30 rounded-lg space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-bold text-amber-400">💰 BUY $GOLDMAFIA</span>
                    <span className="text-[8px] sm:text-[10px] text-amber-600/70">Balance: 2.5 SOL</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="bg-black/50 border-amber-600/50 text-white text-[10px] sm:text-xs h-6 sm:h-8 px-2"
                      />
                      <span className="text-[10px] sm:text-xs text-amber-400 font-bold whitespace-nowrap">SOL</span>
                    </div>
                    
                    {buyAmount && (
                      <div className="text-[8px] sm:text-[10px] text-amber-600/70 text-center">
                        ≈ {(parseFloat(buyAmount) * 237529).toLocaleString()} $GOLDMAFIA
                      </div>
                    )}
                    
                    <div className="flex gap-1">
                      <Button 
                        size="sm"
                        onClick={() => setBuyAmount("0.1")}
                        className="flex-1 bg-black/50 hover:bg-amber-900/30 text-amber-400 border border-amber-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        0.1
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setBuyAmount("0.5")}
                        className="flex-1 bg-black/50 hover:bg-amber-900/30 text-amber-400 border border-amber-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        0.5
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setBuyAmount("1")}
                        className="flex-1 bg-black/50 hover:bg-amber-900/30 text-amber-400 border border-amber-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        1.0
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setBuyAmount("2.5")}
                        className="flex-1 bg-black/50 hover:bg-amber-900/30 text-amber-400 border border-amber-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-[10px] sm:text-xs h-6 sm:h-8"
                    onClick={() => alert(`Swapping ${buyAmount || 0} SOL for $GOLDMAFIA on Raydium...`)}
                  >
                    🔄 SWAP NOW
                  </Button>
                </div>

                {/* Sell Section */}
                <div className="p-2 sm:p-3 bg-red-900/20 border border-red-600/30 rounded-lg space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-bold text-red-400">💸 SELL $GOLDMAFIA</span>
                    <span className="text-[8px] sm:text-[10px] text-red-600/70">Balance: 500K $GM</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="bg-black/50 border-red-600/50 text-white text-[10px] sm:text-xs h-6 sm:h-8 px-2"
                      />
                      <span className="text-[10px] sm:text-xs text-red-400 font-bold whitespace-nowrap">$GM</span>
                    </div>
                    
                    {sellAmount && (
                      <div className="text-[8px] sm:text-[10px] text-red-600/70 text-center">
                        ≈ {(parseFloat(sellAmount) / 237529).toFixed(4)} SOL
                      </div>
                    )}
                    
                    <div className="flex gap-1">
                      <Button 
                        size="sm"
                        onClick={() => setSellAmount("10000")}
                        className="flex-1 bg-black/50 hover:bg-red-900/30 text-red-400 border border-red-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        10K
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setSellAmount("50000")}
                        className="flex-1 bg-black/50 hover:bg-red-900/30 text-red-400 border border-red-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        50K
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setSellAmount("100000")}
                        className="flex-1 bg-black/50 hover:bg-red-900/30 text-red-400 border border-red-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        100K
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setSellAmount("500000")}
                        className="flex-1 bg-black/50 hover:bg-red-900/30 text-red-400 border border-red-600/30 text-[8px] sm:text-[10px] h-5 sm:h-6"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-[10px] sm:text-xs h-6 sm:h-8"
                    onClick={() => alert(`Swapping ${sellAmount || 0} $GOLDMAFIA for SOL on Raydium...`)}
                  >
                    🔄 SWAP NOW
                  </Button>
                </div>

                {/* Raydium Link */}
                <div className="text-center pt-1">
                  <Button
                    variant="ghost"
                    className="text-[8px] sm:text-[10px] text-amber-600/70 hover:text-amber-400 h-5 sm:h-6"
                    onClick={() => window.open("https://raydium.io/", "_blank")}
                  >
                    🌊 Powered by Raydium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-2">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                <CardTitle className="text-amber-400 text-xs sm:text-sm">Mafia Members Directory</CardTitle>
                <CardDescription className="text-amber-600/70 text-[8px] sm:text-[10px]">Connect with other members</CardDescription>
              </CardHeader>
              <CardContent className="px-2.5 sm:px-3 pb-2 sm:pb-3">
                <div className="space-y-1 sm:space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
                  {members.map((member, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-1 sm:p-1.5 bg-black/30 border border-amber-600/20 rounded-lg hover:border-amber-600/50 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm sm:text-base shrink-0">
                          {member.rank === "Boss" ? "👑" : member.rank === "Advisor" ? "🎩" : member.rank === "Captain" ? "⭐" : "💎"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-[8px] sm:text-[10px] truncate">{member.name}</p>
                          <p className="text-[7px] sm:text-[9px] text-amber-400 truncate">{member.email}</p>
                          <p className="text-[7px] sm:text-[8px] text-amber-600/70 truncate">{member.wallet}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-1 sm:px-1.5 py-0.5 bg-amber-600/20 border border-amber-600/50 rounded-full text-[7px] sm:text-[8px] text-amber-400">
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
          <TabsContent value="nft" className="space-y-2">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                <CardTitle className="text-amber-400 text-xs sm:text-sm">Mint Membership NFT</CardTitle>
                <CardDescription className="text-amber-600/70 text-[8px] sm:text-[10px]">Become an official Gold Mafia member</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 sm:space-y-2 px-2.5 sm:px-3 pb-2 sm:pb-3">
                <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
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
                      className="w-full bg-linear-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black py-2 sm:py-3 text-xs sm:text-lg hover:scale-105 transition-transform animate-heartbeat h-8 sm:h-10"
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
          <TabsContent value="projects" className="space-y-2">
            <Card className="glass-panel border-amber-600/30">
              <CardHeader className="pb-1 sm:pb-2 pt-1.5 sm:pt-3 px-2.5 sm:px-3">
                <CardTitle className="text-amber-400 text-sm sm:text-base">Project Marketplace</CardTitle>
                <CardDescription className="text-amber-600/70 text-[10px] sm:text-xs">Collaborate on empire projects</CardDescription>
              </CardHeader>
              <CardContent className="px-2.5 sm:px-3 pb-2 sm:pb-3">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold mb-2 sm:mb-3 text-[10px] sm:text-xs h-5 sm:h-6">
                  + Create New Project
                </Button>
                
                <div className="space-y-1.5 sm:space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="p-1.5 sm:p-3 bg-black/30 border border-amber-600/20 rounded-lg hover:border-amber-600/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1 sm:mb-1.5 gap-2">
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
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-black text-[9px] sm:text-xs h-5 sm:h-6 px-2 sm:px-3">
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
