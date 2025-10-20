import { 
  ArrowLeft, Server, Database, Brain, Shield, Zap, 
  Cloud, Lock, Cpu, GitBranch, Blocks, Wallet,
  LineChart, MessageSquare, Search, Bell, FileCheck,
  Network, Globe, Code2, Container
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Technology = () => {
  const navigate = useNavigate();

  const techStack = {
    frontend: [
      {
        name: "React 18",
        icon: Code2,
        description: "Modern UI library with hooks and concurrent features",
        color: "from-cyan-400 to-cyan-600",
      },
      {
        name: "TypeScript",
        icon: FileCheck,
        description: "Type-safe development for reliability and scalability",
        color: "from-blue-400 to-blue-600",
      },
      {
        name: "Vite",
        icon: Zap,
        description: "Lightning-fast build tool and dev server",
        color: "from-purple-400 to-purple-600",
      },
      {
        name: "Tailwind CSS",
        icon: Container,
        description: "Utility-first CSS with shadcn/ui components",
        color: "from-teal-400 to-teal-600",
      },
      {
        name: "TanStack Query",
        icon: Database,
        description: "Powerful data fetching and caching layer",
        color: "from-red-400 to-red-600",
      },
      {
        name: "React Router",
        icon: GitBranch,
        description: "Client-side routing for seamless navigation",
        color: "from-orange-400 to-orange-600",
      },
    ],
    backend: [
      {
        name: "Supabase",
        icon: Server,
        description: "PostgreSQL database, auth, and real-time subscriptions",
        color: "from-green-400 to-green-600",
      },
      {
        name: "PostgreSQL",
        icon: Database,
        description: "Robust relational database for structured data",
        color: "from-blue-400 to-blue-600",
      },
      {
        name: "IPFS",
        icon: Cloud,
        description: "Decentralized storage for documents and NFT metadata",
        color: "from-purple-400 to-purple-600",
      },
      {
        name: "REST APIs",
        icon: Network,
        description: "RESTful endpoints for data operations",
        color: "from-cyan-400 to-cyan-600",
      },
    ],
    blockchain: [
      {
        name: "Solana",
        icon: Wallet,
        description: "High-speed blockchain for NFT minting and transactions",
        color: "from-purple-400 to-purple-600",
      },
      {
        name: "SPL Token",
        icon: Blocks,
        description: "Standard for Family Badge NFTs with dynamic metadata",
        color: "from-green-400 to-green-600",
      },
      {
        name: "Phantom Wallet",
        icon: Shield,
        description: "Secure wallet integration for Solana",
        color: "from-amber-400 to-amber-600",
      },
      {
        name: "Web3.js",
        icon: Globe,
        description: "JavaScript library for blockchain interaction",
        color: "from-blue-400 to-blue-600",
      },
    ],
    ai: [
      {
        name: "GPT-4",
        icon: Brain,
        description: "Advanced language model for AI Consigliere insights",
        color: "from-green-400 to-green-600",
      },
      {
        name: "Vector Embeddings",
        icon: Search,
        description: "Semantic search and context understanding",
        color: "from-purple-400 to-purple-600",
      },
      {
        name: "NLP Analytics",
        icon: MessageSquare,
        description: "Sentiment analysis and market intelligence",
        color: "from-cyan-400 to-cyan-600",
      },
      {
        name: "Real-time Alerts",
        icon: Bell,
        description: "AI-powered notifications and recommendations",
        color: "from-amber-400 to-amber-600",
      },
    ],
  };

  const features = [
    {
      icon: Shield,
      title: "NFT-Verified Identities",
      description: "Family Badges minted on Solana with on-chain reputation tracking. Dynamic metadata updates as you climb ranks.",
      tech: ["Solana", "SPL Token", "IPFS"],
    },
    {
      icon: Brain,
      title: "AI Consigliere",
      description: "Personal market strategist powered by GPT-4. Delivers real-time insights, alerts, and personalized recommendations.",
      tech: ["GPT-4", "Vector DB", "NLP"],
    },
    {
      icon: LineChart,
      title: "Real-time Analytics",
      description: "Live dashboards tracking deals, respect points, market trends, and community sentiment across 20 industries.",
      tech: ["Supabase", "React Query", "Charts"],
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "KYC/AML compliance, encrypted document vault, role-based access control, and audited smart contracts.",
      tech: ["Supabase Auth", "Encryption", "Audits"],
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized with Vite, code splitting, lazy loading, and edge caching for instant page loads worldwide.",
      tech: ["Vite", "CDN", "Edge Computing"],
    },
    {
      icon: Network,
      title: "Multi-Mafia Network",
      description: "Unified identity layer across 20 specialized Families with cross-industry deal matching and synergy.",
      tech: ["PostgreSQL", "Graph DB", "APIs"],
    },
  ];

  const architecture = [
    {
      layer: "Presentation Layer",
      description: "React 18 + TypeScript with shadcn/ui components",
      color: "from-cyan-500 to-blue-500",
    },
    {
      layer: "Application Layer",
      description: "TanStack Query for state management and data fetching",
      color: "from-blue-500 to-purple-500",
    },
    {
      layer: "API Layer",
      description: "Supabase REST APIs + Real-time subscriptions",
      color: "from-purple-500 to-pink-500",
    },
    {
      layer: "Data Layer",
      description: "PostgreSQL database + IPFS decentralized storage",
      color: "from-pink-500 to-red-500",
    },
    {
      layer: "Blockchain Layer",
      description: "Solana network for NFT minting and verification",
      color: "from-red-500 to-orange-500",
    },
    {
      layer: "AI Layer",
      description: "GPT-4 + Vector embeddings + NLP analytics",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const integrations = [
    { name: "Salesforce CRM", category: "Sales" },
    { name: "HubSpot", category: "Marketing" },
    { name: "Google Calendar", category: "Scheduling" },
    { name: "Slack", category: "Communication" },
    { name: "Stripe", category: "Payments" },
    { name: "Plaid", category: "Financial" },
    { name: "Market APIs", category: "Data Feeds" },
    { name: "Email Services", category: "Notifications" },
  ];

  const securityFeatures = [
    "End-to-end encryption for sensitive data",
    "KYC/AML compliance framework",
    "Multi-factor authentication (MFA)",
    "Role-based access control (RBAC)",
    "Smart contract audits by certified firms",
    "Regular security penetration testing",
    "GDPR and data privacy compliance",
    "Automated backup and disaster recovery",
  ];

  return (
    <div className="min-h-screen w-full overflow-auto bg-gradient-radial from-slate-800 via-blue-900 to-slate-950" style={{
      background: 'radial-gradient(ellipse at top left, #1e40af 0%, #0f172a 40%, #1e1b4b 70%, #0f172a 100%)'
    }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-56 -right-56 h-[900px] w-[900px] animate-glow-soft blur-3xl mix-blend-screen"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(56,189,248,0.9) 0%, rgba(99,102,241,0.65) 38%, rgba(15,23,42,0) 68%)",
          }}
        />
        <div className="absolute bottom-0 -left-40 h-[900px] w-[900px] rounded-full bg-purple-900/50 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-[600px] w-[600px] rounded-full bg-cyan-800/40 blur-3xl" />
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
                Technology Stack
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        <div className="space-y-20">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-amber-500/20 border border-white/20 backdrop-blur-xl">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">The Technology</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Built on
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                Enterprise-Grade Infrastructure
              </span>
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Gold Mafia combines cutting-edge Web3 technology, AI intelligence, and modern cloud 
              architecture to deliver a secure, scalable, and lightning-fast platform.
            </p>
          </div>

          {/* Tech Stack Overview */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-3">Technology Stack</h3>
              <p className="text-white/70">
                Modern, scalable, and secure technologies powering the Gold Mafia platform
              </p>
            </div>

            {/* Frontend */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-6 w-6 text-cyan-400" />
                <h4 className="text-2xl font-bold text-white">Frontend</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {techStack.frontend.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 smooth-transition"
                  >
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3 group-hover:scale-110 smooth-transition`}>
                      <tech.icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-1">{tech.name}</h5>
                    <p className="text-sm text-white/60">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Server className="h-6 w-6 text-green-400" />
                <h4 className="text-2xl font-bold text-white">Backend & Database</h4>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {techStack.backend.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 smooth-transition"
                  >
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3 group-hover:scale-110 smooth-transition`}>
                      <tech.icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-1">{tech.name}</h5>
                    <p className="text-sm text-white/60">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Blocks className="h-6 w-6 text-purple-400" />
                <h4 className="text-2xl font-bold text-white">Blockchain & Web3</h4>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {techStack.blockchain.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 smooth-transition"
                  >
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3 group-hover:scale-110 smooth-transition`}>
                      <tech.icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-1">{tech.name}</h5>
                    <p className="text-sm text-white/60">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Layer */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-amber-400" />
                <h4 className="text-2xl font-bold text-white">AI & Machine Learning</h4>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {techStack.ai.map((tech, idx) => (
                  <div
                    key={idx}
                    className="group rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 hover:border-white/20 smooth-transition"
                  >
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center mb-3 group-hover:scale-110 smooth-transition`}>
                      <tech.icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-1">{tech.name}</h5>
                    <p className="text-sm text-white/60">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-3">Platform Features</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Advanced capabilities powered by our modern technology stack
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 hover:border-white/20 smooth-transition"
                >
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/70 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tech.map((tech, tidx) => (
                      <span
                        key={tidx}
                        className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/80 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Layers */}
          <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-3">System Architecture</h3>
                <p className="text-white/70">
                  Six-layer architecture for scalability, security, and performance
                </p>
              </div>

              <div className="space-y-3">
                {architecture.map((layer, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 p-5 group hover:border-white/20 smooth-transition"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{layer.layer}</h4>
                        <p className="text-sm text-white/60">{layer.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-3">Third-Party Integrations</h3>
              <p className="text-white/70">
                Seamless connections to your favorite business tools
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integrations.map((integration, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-4 text-center hover:border-white/20 smooth-transition"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                    <Network className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">{integration.name}</h5>
                  <p className="text-xs text-white/50">{integration.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-900/20 via-black/30 to-purple-900/20 backdrop-blur-xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 mb-4">
                  <Lock className="h-4 w-4 text-red-400" />
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Enterprise Security</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Security & Compliance
                </h3>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Bank-level security protocols and compliance frameworks to protect your data and reputation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {securityFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 smooth-transition"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-white" strokeWidth={2} />
                    </div>
                    <p className="text-white/90 font-medium text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 py-8">
            <h3 className="text-4xl font-bold text-white">
              Experience the Technology
            </h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join the Family and see how cutting-edge tech transforms business networking
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:scale-105 smooth-transition"
              >
                <Cpu className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              
              <Button
                onClick={() => navigate("/manifesto")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Read the Manifesto
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/50 text-sm">
            Gold Mafia™ — Enterprise-Grade Technology Stack
          </p>
          <p className="text-white/30 text-xs mt-2">
            React • TypeScript • Supabase • Solana • GPT-4
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Technology;
