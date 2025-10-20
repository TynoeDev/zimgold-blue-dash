import { Gauge, Mail, Users, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSolanaTokenData, useSolanaNetworkData } from "@/hooks/useSolanaData";

const Index = () => {
  const navigate = useNavigate();
  
  // Fetch live Solana/Gold Mafia token data (public network information only)
  // TODO: After token launch, replace 'SOL' with Gold Mafia token mint address
  const tokenData = useSolanaTokenData('SOL');
  const networkData = useSolanaNetworkData();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-radial from-slate-800 via-blue-900 to-slate-950" style={{
      background: 'radial-gradient(ellipse at top left, #1e40af 0%, #0f172a 40%, #1e1b4b 70%, #0f172a 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* BRIGHT CYAN/TEAL GLOW - TOP LEFT for dramatic contrast */}
        <div
          className="pointer-events-none absolute -top-56 -left-56 h-[900px] w-[900px] animate-glow-soft blur-3xl mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(45,212,191,0.9) 0%, rgba(56,189,248,0.65) 38%, rgba(15,23,42,0) 68%)",
          }}
        />
        
        {/* Large dramatic DARK blobs for depth - made larger and more prominent */}
        <div className="absolute -top-60 -right-60 h-[1000px] w-[1000px] rounded-full bg-slate-900/60 blur-3xl" />
        <div className="absolute bottom-0 -left-40 h-[900px] w-[900px] rounded-full bg-slate-900/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[800px] w-[800px] rounded-full bg-purple-950/50 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[600px] w-[600px] rounded-full bg-slate-800/50 blur-3xl" />
        
        {/* Additional layered shapes for depth */}
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-950/40 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-slate-800/35 blur-3xl" />

        {/* Sweeping arc ribbon for extra motion */}
        <div
          className="pointer-events-none absolute -bottom-80 right-[-30%] h-[1200px] w-[1200px] rounded-[45%] blur-2xl opacity-70 mix-blend-screen animate-arc-sway"
          style={{
            background:
              "conic-gradient(from 210deg at 50% 50%, rgba(56,189,248,0) 0deg, rgba(56,189,248,0.28) 70deg, rgba(129,140,248,0.18) 140deg, rgba(56,189,248,0) 220deg)",
          }}
        />
        
        {/* Large Cloud Icon as background element - bottom left */}
        <div className="absolute -bottom-40 -left-40 opacity-20">
          <svg width="800" height="600" viewBox="0 0 500 300" className="scale-150">
            <defs>
              <linearGradient id="bgCloudGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.8 }} />
                <stop offset="50%" style={{ stopColor: '#334155', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.4 }} />
              </linearGradient>
            </defs>
            <path
              d="M 340 140 
                 C 340 115, 320 95, 295 95
                 C 290 75, 270 60, 245 60
                 C 215 60, 190 80, 185 105
                 C 160 105, 140 125, 140 150
                 C 140 175, 160 195, 185 195
                 L 325 195
                 C 345 195, 360 180, 360 160
                 C 360 148, 350 140, 340 140 Z"
              fill="url(#bgCloudGradient)"
              className="blur-sm"
            />
          </svg>
        </div>
      </div>

      {/* Vertical Side Labels */}
      {/* Vertical Side Navigation - Left: Manifesto Link */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 sm:left-6">
        <button
          onClick={() => navigate("/manifesto")}
          className="text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-white/60 transition-opacity hover:text-white/80 antialiased [writing-mode:vertical-lr] rotate-180 sm:text-xs"
          title="Explore the Gold Mafia manifesto"
        >
          MANIFESTO
        </button>
      </div>
      
      {/* Vertical Side Navigation - Right: Technology Link */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 sm:right-6">
        <button
          onClick={() => navigate("/technology")}
          className="text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-white/60 transition-opacity hover:text-white/80 antialiased [writing-mode:vertical-lr] rotate-180 sm:text-xs"
          title="Discover the technology stack"
        >
          TECHNOLOGY
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col px-5 pb-10 sm:px-8">
        {/* Header - Brand and Tagline */}
        <header className="py-4 sm:py-6">
          <div className="mx-auto flex w-full max-w-[460px] flex-col items-center justify-between gap-2 text-center sm:items-start sm:text-left sm:gap-4 md:max-w-full md:flex-row md:items-start md:px-4">
            <div className="space-y-0.5">
              {/* Main brand name */}
              <h1 className="text-lg font-bold tracking-tight text-white antialiased sm:text-xl">
                GOLD MAFIA<sup className="text-[0.45rem] align-super sm:text-[0.5rem]">™</sup>
              </h1>
              {/* Brand tagline */}
              <p className="text-[0.5rem] font-light uppercase tracking-[0.35em] text-white/70 antialiased sm:text-[0.55rem] sm:tracking-[0.38em]">
                Where Intelligence Meets Influence
              </p>
            </div>
            {/* Secondary tagline */}
            <div>
              <p className="text-[0.48rem] font-semibold uppercase tracking-[0.38em] text-white/70 antialiased sm:text-[0.5rem] sm:tracking-[0.4em]">
                Private Digital Society
              </p>
            </div>
          </div>
        </header>

        {/* Hero Section - Logo and Cards */}
        <main className="flex flex-1 items-center justify-center px-0">
          <div className="mx-auto flex w-full max-w-[380px] flex-col items-center gap-8 sm:gap-12 md:max-w-2xl">
            {/* Cloud Logo with Gradient Glow */}
            <div className="relative flex items-center justify-center">
              {/* Animated outer glow effect */}
              <div className="absolute inset-0 scale-[1.6] animate-glow-soft rounded-full bg-gradient-to-r from-purple-400/40 via-blue-400/40 to-cyan-400/45 blur-3xl mix-blend-screen" />
              
              {/* Main cloud SVG - responsive sizing */}
              <div className="relative drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                <svg viewBox="0 0 500 300" className="h-auto w-[200px] sm:w-[280px] md:w-[340px]">
                  <defs>
                    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 1 }} />
                      <stop offset="25%" style={{ stopColor: '#A855F7', stopOpacity: 1 }} />
                      <stop offset="60%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
                    </linearGradient>
                    <radialGradient id="innerCloudGlow" cx="50%" cy="50%" r="55%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
                      <stop offset="55%" stopColor="#1D4ED8" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="circleGlow" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
                      <stop offset="65%" stopColor="#0f172a" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                    </radialGradient>
                    
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Inner ambient glow within the cloud stroke */}
                  <path
                    d="M 340 140 
                       C 340 115, 320 95, 295 95
                       C 290 75, 270 60, 245 60
                       C 215 60, 190 80, 185 105
                       C 160 105, 140 125, 140 150
                       C 140 175, 160 195, 185 195
                       L 325 195
                       C 345 195, 360 180, 360 160
                       C 360 148, 350 140, 340 140 Z"
                    fill="url(#innerCloudGlow)"
                    opacity="0.85"
                  />
                  
                  {/* Cloud outline - thicker and bolder */}
                  <path
                    d="M 340 140 
                       C 340 115, 320 95, 295 95
                       C 290 75, 270 60, 245 60
                       C 215 60, 190 80, 185 105
                       C 160 105, 140 125, 140 150
                       C 140 175, 160 195, 185 195
                       L 325 195
                       C 345 195, 360 180, 360 160
                       C 360 148, 350 140, 340 140 Z"
                    fill="none"
                    stroke="url(#cloudGradient)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                  
                  {/* Dark circle background for the letter - more prominent */}
                  <circle cx="250" cy="140" r="58" fill="url(#circleGlow)" opacity="1" />
                  
                  {/* Upload arrow / Letter M shape */}
                  <path
                    d="M 235 165 L 235 125 L 220 140 M 235 125 L 250 140 M 250 165 L 250 125 L 265 140"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-lg"
                  />
                </svg>
              </div>
            </div>

            {/* Navigation Cards - The Lounge & Command Room */}
            <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-teal-700/30 bg-gradient-to-br from-teal-950/80 via-cyan-950/70 to-slate-900/80 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.5)] animate-float-slow md:flex-row md:items-stretch md:rounded-3xl">
              {/* Glass reflection overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.15)_42%,rgba(15,23,42,0)_100%)] opacity-80 mix-blend-screen" />
              
              {/* The Lounge Card - Social hub */}
              <button
                onClick={() => navigate("/lounge")}
                className="group relative flex h-24 w-full flex-col items-center justify-center px-4 py-4 text-center smooth-transition hover:-translate-y-2 hover:bg-white/5 sm:h-28 md:h-32 md:w-1/2 md:px-6"
                title="Enter The Lounge"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                
                {/* Icon badge - warm gold tone */}
                <div
                  className="relative z-10 mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-amber-200/45 via-amber-300/25 to-amber-500/30 backdrop-blur-md ring-1 ring-white/25 smooth-transition sm:mb-2.5 sm:h-12 sm:w-12 md:h-14 md:w-14"
                  style={{ boxShadow: "inset 0 -8px 14px rgba(255,255,255,0.18), 0 14px 28px rgba(217,119,6,0.35)" }}
                >
                  <Users className="h-5 w-5 text-white drop-shadow-lg antialiased sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                </div>
                
                {/* Card title */}
                <span className="relative z-10 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white drop-shadow-md antialiased sm:text-xs sm:tracking-[0.24em]">
                  THE LOUNGE
                </span>
                
                {/* Card description */}
                <span className="relative z-10 mt-0.5 text-[0.52rem] font-light text-white/70 antialiased sm:text-[0.55rem]">
                  Connect • Converse • Collaborate
                </span>
              </button>

              {/* Vertical divider between cards */}
              <div className="h-px w-full bg-white/5 md:h-auto md:w-px" />

              {/* Command Room Card - Control center */}
              <button
                onClick={() => navigate("/command-room")}
                className="group relative flex h-24 w-full flex-col items-center justify-center px-4 py-4 text-center smooth-transition hover:-translate-y-2 hover:bg-white/5 sm:h-28 md:h-32 md:w-1/2 md:px-6"
                title="Enter The Command Room"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                
                {/* Icon badge - cool blue tone */}
                <div
                  className="relative z-10 mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-sky-200/45 via-sky-300/25 to-cyan-500/30 backdrop-blur-md ring-1 ring-white/25 smooth-transition sm:mb-2.5 sm:h-12 sm:w-12 md:h-14 md:w-14"
                  style={{ boxShadow: "inset 0 -8px 14px rgba(255,255,255,0.18), 0 14px 28px rgba(59,130,246,0.3)" }}
                >
                  <Gauge className="h-5 w-5 text-white drop-shadow-lg antialiased sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.5} />
                </div>
                
                {/* Card title */}
                <span className="relative z-10 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white drop-shadow-md antialiased sm:text-xs sm:tracking-[0.24em]">
                  COMMAND ROOM
                </span>
                
                {/* Card description */}
                <span className="relative z-10 mt-0.5 text-[0.52rem] font-light text-white/70 antialiased sm:text-[0.55rem]">
                  Strategize • Analyse • Execute
                </span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer - Contact Information and Entry CTA */}
        <footer className="mt-8 py-6 sm:mt-12 sm:py-8">
          <div className="mx-auto flex w-full max-w-[460px] flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6 md:max-w-full md:px-4">
            {/* Email Contact Section - inline layout */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Email icon badge */}
              <a
                href="mailto:contact@goldmafia.com"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-cyan-300/60 via-cyan-400/40 to-blue-500/30 backdrop-blur-md ring-1 ring-white/30 hover:ring-white/50 sm:h-9 sm:w-9"
                style={{ boxShadow: "inset 0 -4px 8px rgba(255,255,255,0.18), 0 10px 20px rgba(56,189,248,0.35)" }}
                title="Connect with Gold Mafia HQ"
              >
                <Mail className="h-3.5 w-3.5 text-cyan-50 sm:h-4 sm:w-4" strokeWidth={2} />
              </a>
              {/* Email address link - no connector line */}
              <a
                href="mailto:contact@goldmafia.com"
                className="text-[0.6rem] font-light tracking-[0.18em] text-white/95 uppercase transition-colors hover:text-white antialiased sm:text-[0.65rem] sm:tracking-[0.2em]"
                title="Connect with Gold Mafia HQ"
              >
                CONTACT@GOLDMAFIA.COM
              </a>
            </div>
            
            {/* Main Entry CTA Button - smaller size */}
            <button
              onClick={() => navigate("/dashboard")}
              className="group relative overflow-hidden rounded-full border border-purple-300/30 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-xl px-4 py-1.5 text-center shadow-xl smooth-transition hover:scale-105 hover:border-purple-300/50 hover:from-purple-500/30 hover:via-violet-500/30 hover:to-purple-500/30 sm:px-5 sm:py-2"
              title="Step inside — where verified minds meet"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 smooth-transition" />
              {/* Button text - smaller */}
              <span className="relative z-10 text-[0.65rem] font-light text-white antialiased sm:text-xs">
                Enter Gold Mafia →
              </span>
            </button>

            {/* Solana Wallet Section - inline layout */}
            <div 
              className="relative flex items-center gap-2 sm:gap-2.5"
              onMouseEnter={(e) => {
                const popup = e.currentTarget.querySelector('#wallet-popup');
                if (popup instanceof HTMLElement) {
                  // Clear any existing timeout
                  const timeoutId = popup.getAttribute('data-timeout-id');
                  if (timeoutId) {
                    clearTimeout(parseInt(timeoutId));
                  }
                  popup.style.opacity = '1';
                  popup.style.pointerEvents = 'auto';
                }
              }}
              onMouseLeave={(e) => {
                const popup = e.currentTarget.querySelector('#wallet-popup');
                if (popup instanceof HTMLElement) {
                  // Set 3-second delay before hiding
                  const timeoutId = setTimeout(() => {
                    popup.style.opacity = '0';
                    popup.style.pointerEvents = 'none';
                  }, 3000);
                  popup.setAttribute('data-timeout-id', timeoutId.toString());
                }
              }}
            >
              {/* Solana address link - truncated */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText('7xKXtg2CW87d97TXJSDpbD5jBkheTqA7v3LB9mP9qZ');
                  // Show copied notification
                  const btn = document.getElementById('wallet-copy-status');
                  if (btn) {
                    btn.textContent = '✓ Copied!';
                    btn.style.color = '#10b981';
                    setTimeout(() => {
                      btn.textContent = 'Click to copy';
                      btn.style.color = '';
                    }, 2000);
                  }
                }}
                className="text-[0.6rem] font-light tracking-[0.18em] text-white/95 uppercase transition-colors hover:text-white antialiased sm:text-[0.65rem] sm:tracking-[0.2em]"
                title="Click to copy Solana address"
              >
                7xKXt...9mP9qZ
              </button>
              
              {/* Solana icon badge with hover info */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-purple-300/60 via-purple-400/45 to-violet-500/35 backdrop-blur-md ring-1 ring-white/30 hover:ring-white/50 sm:h-9 sm:w-9 relative cursor-help"
                style={{ boxShadow: "inset 0 -4px 8px rgba(255,255,255,0.18), 0 10px 20px rgba(147,51,234,0.35)" }}
                title="Hover to view wallet details"
              >
                <Wallet className="h-3.5 w-3.5 text-purple-50 sm:h-4 sm:w-4" strokeWidth={2} />
                
                {/* Desktop hover wallet info popup - No QR Code */}
                <div 
                  id="wallet-popup"
                  className="hidden md:block absolute bottom-full right-0 mb-3 opacity-0 pointer-events-none transition-opacity duration-300 z-50"
                  style={{ transitionDelay: '0s' }}
                  onMouseEnter={(e) => {
                    // Keep popup visible when hovering over it
                    const timeoutId = e.currentTarget.getAttribute('data-timeout-id');
                    if (timeoutId) {
                      clearTimeout(parseInt(timeoutId));
                      e.currentTarget.removeAttribute('data-timeout-id');
                    }
                  }}
                >
                  <div className="bg-white rounded-2xl p-5 shadow-2xl border border-purple-200 min-w-[320px]">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                          <Wallet className="h-4 w-4 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-800">Solana Wallet</p>
                          <p className="text-[0.6rem] text-slate-500">Official Gold Mafia Address</p>
                        </div>
                      </div>
                      
                      {/* Token Price - Live Market Data (Public Info) */}
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-100">
                        <div className="flex items-baseline justify-between mb-1">
                          <p className="text-[0.55rem] text-purple-600 uppercase tracking-wider font-semibold">
                            Solana (SOL)
                            {tokenData.loading && <span className="ml-1 text-slate-400">●</span>}
                          </p>
                          <span className={`text-[0.5rem] font-semibold ${tokenData.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {tokenData.change24h >= 0 ? '+' : ''}{tokenData.change24h.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-lg font-bold text-slate-800 mb-0.5">
                          ${tokenData.price.toFixed(2)} USD
                        </p>
                        <p className="text-[0.65rem] text-slate-600">
                          Market Cap: {tokenData.marketCap} • Rank #{tokenData.rank}
                        </p>
                      </div>

                      {/* Gold Mafia Ecosystem Info */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-100">
                        <p className="text-[0.55rem] text-amber-700 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1">
                          <span>⭐</span> Gold Mafia Network
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Blockchain</span>
                            <span className="text-purple-600 font-semibold">Solana</span>
                          </div>
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Token Standard</span>
                            <span className="text-slate-800 font-semibold">SPL Token</span>
                          </div>
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Status</span>
                            <span className="text-green-600 font-semibold flex items-center gap-1">
                              <span className="text-green-500">●</span> Live
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Network Performance - Real Solana Data (Public Info) */}
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-[0.55rem] text-slate-500 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1">
                          <span>🌐</span> Network Performance
                          {networkData.loading && <span className="ml-1 text-slate-400 text-[0.5rem]">●</span>}
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Average TPS</span>
                            <span className="text-cyan-600 font-semibold">
                              {networkData.avgTPS.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Peak Capacity</span>
                            <span className="text-purple-600 font-semibold">
                              {networkData.peakTPS.toLocaleString()} TPS
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Transaction Fee</span>
                            <span className="text-green-600 font-semibold">
                              ${networkData.transactionFee.toFixed(5)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[0.65rem]">
                            <span className="text-slate-700">Block Time</span>
                            <span className="text-blue-600 font-semibold">
                              {networkData.blockTime}s
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Full Address Display */}
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-[0.55rem] text-slate-500 uppercase tracking-wider mb-1">Wallet Address</p>
                        <p className="text-[0.7rem] font-mono text-slate-800 break-all leading-relaxed">
                          7xKXtg2CW87d97TXJSDpbD5jBkheTqA7v3LB9mP9qZ
                        </p>
                      </div>

                      {/* Copy Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText('7xKXtg2CW87d97TXJSDpbD5jBkheTqA7v3LB9mP9qZ');
                          const btnText = e.currentTarget.querySelector('span');
                          if (btnText) {
                            btnText.textContent = '✓ Copied to Clipboard!';
                            e.currentTarget.classList.add('bg-green-600');
                            e.currentTarget.classList.remove('bg-purple-600', 'hover:bg-purple-700');
                            setTimeout(() => {
                              btnText.textContent = 'Copy Address';
                              e.currentTarget.classList.remove('bg-green-600');
                              e.currentTarget.classList.add('bg-purple-600', 'hover:bg-purple-700');
                            }, 2000);
                          }
                        }}
                        className="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                      >
                        <span>Copy Address</span>
                      </button>

                      {/* Status Text */}
                      <p id="wallet-copy-status" className="text-center text-[0.6rem] text-slate-400">
                        Click to copy
                      </p>
                    </div>
                  </div>
                  {/* Arrow pointing down */}
                  <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" 
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>


    </div>
  );
};

export default Index;
