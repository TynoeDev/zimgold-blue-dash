"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [crackScreen, setCrackScreen] = useState(false)

  // Pre-generate particle positions to avoid hydration mismatch
  const sparkPositions = useMemo(() => 
    Array.from({ length: 30 }, () => ({
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      delay: Math.random() * 3
    })),
    []
  )

  const handleMint = async () => {
    setIsConnecting(true)
    setCrackScreen(true)
    
    setTimeout(async () => {
      try {
        const mockWallet = "0x" + Math.random().toString(36).substring(2, 15)
        localStorage.setItem("goldmafia_minted", "true")
        localStorage.setItem("goldmafia_wallet", mockWallet)
        setShowConfetti(true)
        
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      } catch (error) {
        console.error("Mint failed:", error)
        setIsConnecting(false)
        setCrackScreen(false)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      {crackScreen && <div className="fixed inset-0 z-50 crack-overlay pointer-events-none" />}
      {showConfetti && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="confetti-piece" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`, 
                animationDelay: `${Math.random() * 0.5}s` 
              }} 
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full bg-linear-to-b from-black via-amber-950/30 to-black">
          {/* Animated Hero Images */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 w-full h-full animate-fadeSlide" style={{ animationDelay: '0s' }}>
              <img 
                src="/images/gold-mafia-hero-one.jpeg" 
                alt="Gold Mafia Hero" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="absolute inset-0 w-full h-full animate-fadeSlide" style={{ animationDelay: '8s' }}>
              <img 
                src="/images/goldmafia-hero-boss.jpg" 
                alt="Gold Mafia Boss" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>
          </div>
          
          {/* Video overlay (optional) */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          >
            <source src="/videos/hero-landing.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-amber-500/5 to-transparent god-rays" />
          <div className="absolute inset-0">
            {sparkPositions.map((pos, i) => (
              <div 
                key={i} 
                className="spark-gold absolute" 
                style={{ 
                  left: `${pos.left}%`, 
                  top: `${pos.top}%`, 
                  animationDelay: `${pos.delay}s` 
                }} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-6">
          <div className="mb-6 animate-float">
            <img 
              src="/images/goldmafia-logo.png" 
              alt="Gold Mafia Logo" 
              className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 mx-auto drop-shadow-[0_0_24px_rgba(255,215,0,0.6)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <h1 className="text-[8vw] font-black leading-none mb-3 gold-text-drip animate-glow-pulse">
            GOLD MAFIA
          </h1>
          <p className="text-2xl md:text-4xl text-amber-400 font-light tracking-[0.24em] uppercase animate-vapor-trail">
            Born Gods
          </p>
        </div>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
          <Button 
            size="lg" 
            disabled={isConnecting} 
            onClick={handleMint} 
            className="w-full bg-linear-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-black text-xl md:text-2xl px-6 py-6 rounded-full hover:scale-105 transition-all shadow-2xl shadow-amber-500/50 animate-heartbeat"
          >
            {isConnecting ? "OPENING VAULT..." : "MINT $GOLDMAFIA"}
          </Button>
          <p className="text-center text-amber-600 text-[10px] mt-2 uppercase tracking-widest">
            0.001 SOL • 1B Supply • Solana Network
          </p>
        </div>
      </div>
    </div>
  )
}
