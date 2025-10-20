# Gold Mafia - System Architecture Diagram

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                         GOLD MAFIA PLATFORM                             ┃
┃                    Where Intelligence Meets Influence                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React + Vite)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │  Landing Page   │  │   Manifesto     │  │   Technology    │         │
│  │  (Index.tsx)    │  │ (Manifesto.tsx) │  │(Technology.tsx) │         │
│  │                 │  │                 │  │                 │         │
│  │ ✅ Public       │  │ ✅ Static       │  │ ✅ Static       │         │
│  │ ✅ Live APIs    │  │ 🔓 No Auth      │  │ 🔓 No Auth      │         │
│  │ 🔓 No Auth      │  │                 │  │                 │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   Dashboard     │  │   The Lounge    │  │  Command Room   │         │
│  │ (Dashboard.tsx) │  │  (Lounge.tsx)   │  │(CommandRoom.tsx)│         │
│  │                 │  │                 │  │                 │         │
│  │ 🔐 Auth Req'd   │  │ 🔐 Auth Req'd   │  │ 🔐 Auth Req'd   │         │
│  │ 📊 Supabase     │  │ 💬 Real-time    │  │ 📈 Analytics    │         │
│  │ 🖼️ IPFS Avatar  │  │ 🖼️ IPFS Upload  │  │ 📎 IPFS Docs    │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼

┌───────────────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│   SUPABASE BACKEND    │  │   IPFS STORAGE   │  │  SOLANA BLOCKCHAIN  │
├───────────────────────┤  ├──────────────────┤  ├─────────────────────┤
│                       │  │                  │  │                     │
│ 🔐 Authentication     │  │ 🖼️ NFT Images    │  │ 🪙 SPL Token        │
│   ├─ Email/Password   │  │ 📄 NFT Metadata  │  │ 🎨 NFT Minting      │
│   ├─ OAuth (Google)   │  │ 👤 User Avatars  │  │ 💰 Token Transfers  │
│   └─ Wallet Sign-in   │  │ 📎 Documents     │  │ 📊 On-chain Data    │
│                       │  │ 🎨 Graphics      │  │                     │
│ 📊 PostgreSQL DB      │  │                  │  │ Wallet Integration: │
│   ├─ users            │  │ Provider:        │  │ ├─ Phantom          │
│   ├─ deals            │  │ ├─ Pinata        │  │ ├─ Solflare         │
│   ├─ lounge_messages  │  │ └─ NFT.Storage   │  │ └─ Ledger           │
│   └─ analytics        │  │                  │  │                     │
│                       │  │ Gateway:         │  │ Network:            │
│ ⚡ Real-time Subs     │  │ gateway.pinata   │  │ Mainnet-beta        │
│   ├─ Chat messages    │  │ .cloud/ipfs/     │  │                     │
│   ├─ Deal updates     │  │                  │  │ RPC:                │
│   └─ User presence    │  │ CID Format:      │  │ api.mainnet-beta    │
│                       │  │ Qm...abc123      │  │ .solana.com         │
│ 🔒 Row Level Security │  │ (base58btc)      │  │                     │
│   ├─ User policies    │  │                  │  │ Official Wallet:    │
│   ├─ Deal policies    │  │ 💾 Redundancy:   │  │ 7xKXt...9mP9qZ      │
│   └─ Message policies │  │ Multi-node pins  │  │                     │
│                       │  │                  │  │                     │
└───────────────────────┘  └──────────────────┘  └─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL APIS                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Jupiter API              Solana RPC             CoinGecko (Future)      │
│  ├─ Token Prices          ├─ Network Stats      ├─ Market Cap           │
│  ├─ 24h Change            ├─ TPS Data           ├─ Trading Volume       │
│  └─ Market Data           └─ Block Time         └─ Price History        │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════

DATA FLOW EXAMPLES:

1. USER SIGNUP FLOW:
   User → Email/Password → Supabase Auth → Auto-create users record → 
   Dashboard displays default tier (Associate) + 0 respect points

2. AVATAR UPLOAD FLOW:
   User selects image → Upload to IPFS (Pinata) → Get CID → 
   Update users.avatar_ipfs_hash in Supabase → Display via IPFS gateway

3. LOUNGE MESSAGE FLOW:
   User types message → Submit to Supabase lounge_messages → 
   Real-time subscription broadcasts to all users → Messages appear instantly

4. DEAL CREATION WITH DOCUMENT:
   User fills form + attaches PDF → Upload PDF to IPFS → Get CID →
   Create deal record with documents_ipfs: [{filename, ipfs_hash}] →
   Other users download via IPFS gateway

5. NFT MINTING FLOW:
   User clicks "Mint NFT" → Upload image to IPFS → Upload metadata to IPFS →
   Call Solana program (Metaplex) → Get mint address → 
   Update users.family_badge_nft_minted = true + store mint address

═══════════════════════════════════════════════════════════════════════════

SECURITY LAYERS:

┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: Frontend Validation                                             │
│ ├─ TypeScript type checking                                              │
│ ├─ Form validation (Zod/Yup)                                             │
│ └─ File size/type restrictions                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 2: Supabase Authentication                                         │
│ ├─ JWT token validation                                                  │
│ ├─ Session management                                                    │
│ └─ Multi-factor auth (optional)                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 3: Row Level Security (RLS)                                        │
│ ├─ User can only edit own profile                                        │
│ ├─ User can only see deals they're involved in                           │
│ └─ Verified members only access                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 4: Database Constraints                                            │
│ ├─ Foreign key constraints                                               │
│ ├─ Check constraints (tier values, status enums)                         │
│ └─ Unique constraints (email, wallet address)                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ LAYER 5: IPFS Content Addressing                                         │
│ ├─ Immutable CIDs (content hash)                                         │
│ ├─ File integrity verification                                           │
│ └─ Decentralized storage (no single point of failure)                    │
└─────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════

SCALABILITY CONSIDERATIONS:

Performance Targets:
├─ Page Load: < 2 seconds
├─ API Response: < 500ms
├─ Real-time Message Latency: < 100ms
├─ IPFS Retrieval: < 3 seconds (first load, then cached)
└─ Database Queries: < 100ms (with indexes)

Caching Strategy:
├─ React Query: Client-side API response cache (5 min)
├─ IPFS Gateway: CDN caching (24 hours)
├─ Supabase: PostgreSQL query cache
└─ Browser: LocalStorage for user preferences

Future Scaling:
├─ Supabase: Can handle 500k+ users on Pro plan
├─ IPFS: Distributed, scales horizontally
├─ Frontend: Deploy to Vercel/Netlify (CDN + edge)
└─ Database: Add read replicas if needed

═══════════════════════════════════════════════════════════════════════════

COST ESTIMATES (Monthly):

FREE TIER (MVP):
├─ Supabase: $0 (500MB DB, 2GB bandwidth, 50k auth users)
├─ Pinata: $0 (1GB storage, unlimited gateway requests)
├─ Vercel: $0 (100GB bandwidth)
├─ Solana RPC: $0 (public endpoints)
└─ TOTAL: $0/month (perfect for launch!)

GROWTH TIER (1000+ users):
├─ Supabase Pro: $25/month (8GB DB, 250GB bandwidth)
├─ Pinata Picnic: $20/month (100GB storage)
├─ Vercel Pro: $20/month (1TB bandwidth)
├─ Private Solana RPC: $50/month (GenesysGo/Triton)
└─ TOTAL: ~$115/month

═══════════════════════════════════════════════════════════════════════════
