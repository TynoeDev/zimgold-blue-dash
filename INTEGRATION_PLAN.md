# Gold Mafia - Supabase & IPFS Integration Plan

## 🎯 Project Overview
This document outlines the complete integration strategy for:
1. **Supabase**: Authentication, PostgreSQL database, real-time subscriptions
2. **IPFS**: Decentralized storage for NFT metadata, user avatars, and documents

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GOLD MAFIA PLATFORM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend (React)                                                │
│  ├─ Landing Page (Index.tsx) ────────────► Public Data Only     │
│  ├─ Dashboard ────────────────────────► Supabase Auth Required  │
│  ├─ Lounge ───────────────────────────► Supabase + IPFS         │
│  ├─ Command Room ─────────────────────► Supabase + IPFS         │
│  ├─ Manifesto ─────────────────────────► Static (No Auth)       │
│  └─ Technology ────────────────────────► Static (No Auth)       │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Backend Services                                                │
│  ├─ Supabase                                                    │
│  │   ├─ Authentication (Email, OAuth, Wallet)                   │
│  │   ├─ PostgreSQL Database                                     │
│  │   ├─ Row Level Security (RLS)                               │
│  │   ├─ Real-time Subscriptions                                │
│  │   └─ Storage (temporary/small files)                        │
│  │                                                               │
│  ├─ IPFS (via Pinata or NFT.Storage)                           │
│  │   ├─ NFT Metadata (JSON)                                    │
│  │   ├─ User Avatars (Images)                                  │
│  │   ├─ Deal Documents (PDFs)                                  │
│  │   └─ Family Badge Images                                    │
│  │                                                               │
│  └─ Solana Blockchain                                           │
│      ├─ SPL Token Contract                                      │
│      ├─ NFT Minting (Metaplex)                                 │
│      └─ Wallet Connection (Phantom)                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Supabase Database Schema

### **1. `users` Table**
Stores user profiles and membership data.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Authentication (linked to Supabase Auth)
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT UNIQUE NOT NULL,
  
  -- Profile
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_ipfs_hash TEXT, -- IPFS CID for avatar image
  bio TEXT,
  
  -- Solana Integration
  solana_wallet_address TEXT UNIQUE,
  wallet_verified BOOLEAN DEFAULT FALSE,
  
  -- Membership & Gamification
  membership_tier TEXT DEFAULT 'Associate' CHECK (membership_tier IN ('Associate', 'Soldier', 'Caporegime', 'Underboss', 'Don')),
  respect_points INTEGER DEFAULT 0,
  total_deals_completed INTEGER DEFAULT 0,
  
  -- NFT Status
  family_badge_nft_minted BOOLEAN DEFAULT FALSE,
  family_badge_nft_mint_address TEXT,
  family_badge_metadata_ipfs TEXT, -- IPFS CID for NFT metadata
  
  -- Achievements
  achievements JSONB DEFAULT '[]', -- Array of achievement IDs
  
  -- Privacy & Status
  profile_visibility TEXT DEFAULT 'members_only' CHECK (profile_visibility IN ('public', 'members_only', 'private')),
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Indexes
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes for performance
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_wallet ON users(solana_wallet_address);
CREATE INDEX idx_users_tier ON users(membership_tier);
CREATE INDEX idx_users_respect ON users(respect_points DESC);
```

### **2. `deals` Table**
Tracks business deals and opportunities.

```sql
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Deal Information
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('Investment', 'Partnership', 'Consulting', 'Trading', 'Real Estate', 'Technology', 'Other')),
  
  -- Deal Value
  estimated_value NUMERIC(15, 2),
  currency TEXT DEFAULT 'USD',
  
  -- Deal Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Participants
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  assigned_to UUID[] DEFAULT '{}', -- Array of user IDs
  
  -- Documents (stored on IPFS)
  documents_ipfs JSONB DEFAULT '[]', -- Array of {filename, ipfs_hash, uploaded_at}
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  deadline TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Privacy
  visibility TEXT DEFAULT 'tier_restricted' CHECK (visibility IN ('public', 'tier_restricted', 'invite_only'))
);

CREATE INDEX idx_deals_creator ON deals(created_by);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_deals_category ON deals(category);
```

### **3. `lounge_messages` Table**
Chat/discussion messages in The Lounge.

```sql
CREATE TABLE lounge_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Message Content
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'poll', 'announcement')),
  
  -- Attachments (IPFS)
  attachments_ipfs JSONB DEFAULT '[]', -- Array of {filename, ipfs_hash, mime_type}
  
  -- Threading
  reply_to UUID REFERENCES lounge_messages(id) ON DELETE SET NULL,
  
  -- Reactions
  reactions JSONB DEFAULT '{}', -- {emoji: [user_ids]}
  
  -- Moderation
  is_pinned BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_lounge_messages_user ON lounge_messages(user_id);
CREATE INDEX idx_lounge_messages_created ON lounge_messages(created_at DESC);
```

### **4. `command_room_analytics` Table**
Stores analytics data for Command Room dashboards.

```sql
CREATE TABLE command_room_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User Context
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Analytics Type
  metric_type TEXT NOT NULL CHECK (metric_type IN ('deal_activity', 'network_growth', 'token_performance', 'user_engagement')),
  
  -- Data
  metric_data JSONB NOT NULL, -- Flexible JSON structure for different metrics
  
  -- Metadata
  source TEXT, -- e.g., 'manual', 'automated', 'blockchain'
  verified BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_analytics_user ON command_room_analytics(user_id);
CREATE INDEX idx_analytics_type ON command_room_analytics(metric_type);
CREATE INDEX idx_analytics_time ON command_room_analytics(recorded_at DESC);
```

### **5. `nft_metadata` Table**
NFT metadata backup (primary storage on IPFS).

```sql
CREATE TABLE nft_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- NFT Identity
  mint_address TEXT UNIQUE NOT NULL,
  owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Metadata
  name TEXT NOT NULL,
  description TEXT,
  image_ipfs_hash TEXT NOT NULL, -- IPFS CID for image
  metadata_ipfs_hash TEXT NOT NULL, -- IPFS CID for full metadata JSON
  
  -- NFT Type
  collection TEXT DEFAULT 'family_badge',
  tier TEXT, -- For tiered NFTs
  
  -- Attributes
  attributes JSONB DEFAULT '[]', -- Array of {trait_type, value}
  
  -- Blockchain
  blockchain TEXT DEFAULT 'solana',
  minted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  transaction_signature TEXT
);

CREATE INDEX idx_nft_owner ON nft_metadata(owner_user_id);
CREATE INDEX idx_nft_collection ON nft_metadata(collection);
```

---

## 🔐 Row Level Security (RLS) Policies

### **Users Table Policies**

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

-- Members can view other verified members
CREATE POLICY "Members can view other members"
  ON users FOR SELECT
  USING (
    is_active = TRUE 
    AND is_verified = TRUE 
    AND (profile_visibility = 'public' OR profile_visibility = 'members_only')
  );
```

### **Deals Table Policies**

```sql
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Users can view deals they created or are assigned to
CREATE POLICY "Users can view relevant deals"
  ON deals FOR SELECT
  USING (
    created_by = (SELECT id FROM users WHERE auth_id = auth.uid())
    OR (SELECT id FROM users WHERE auth_id = auth.uid()) = ANY(assigned_to)
  );

-- Users can create deals
CREATE POLICY "Users can create deals"
  ON deals FOR INSERT
  WITH CHECK (created_by = (SELECT id FROM users WHERE auth_id = auth.uid()));
```

---

## 📁 IPFS Storage Strategy

### **What Goes on IPFS?**

| Content Type | Storage | Reason |
|--------------|---------|--------|
| **NFT Metadata (JSON)** | IPFS | Required for Solana NFTs, immutable |
| **NFT Images** | IPFS | Required for Solana NFTs, immutable |
| **User Avatars** | IPFS | Decentralized, permanent, cost-effective |
| **Deal Documents** | IPFS | Privacy, immutability, proof of existence |
| **Family Badge Designs** | IPFS | NFT collection assets |
| **Manifesto PDF** | IPFS (optional) | Permanent record, censorship-resistant |

### **What Stays in Supabase?**

| Content Type | Storage | Reason |
|--------------|---------|--------|
| **User Credentials** | Supabase Auth | Security, OAuth integration |
| **Chat Messages (text)** | Supabase DB | Real-time, searchable, mutable |
| **Analytics Data** | Supabase DB | Queryable, aggregatable |
| **User Preferences** | Supabase DB | Frequently updated |
| **Session Data** | Supabase DB | Temporary, needs speed |

### **IPFS Integration Methods**

We'll use **Pinata** or **NFT.Storage** as IPFS pinning services:

```typescript
// Example IPFS upload function
const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`
    },
    body: formData
  });
  
  const { IpfsHash } = await response.json();
  return IpfsHash; // Returns CID
};
```

---

## 🔗 Page-by-Page Integration Map

### **1. Landing Page (Index.tsx)**
**Status**: ✅ Already Complete (No Auth Required)

| Feature | Backend | Notes |
|---------|---------|-------|
| Solana Token Price | Jupiter API | ✅ Live data, 60s refresh |
| Network Stats | Solana RPC | ✅ Live data, 120s refresh |
| Wallet Display | Static | Public Gold Mafia address |
| Navigation Links | React Router | No authentication needed |

**Required Changes**: None - This page remains public.

---

### **2. Dashboard (Dashboard.tsx)**
**Status**: 🔄 Needs Supabase Integration

| Feature | Backend | Implementation |
|---------|---------|----------------|
| **User Authentication** | Supabase Auth | Add login/logout flow |
| **Profile Data** | Supabase `users` table | Fetch current user profile |
| **Respect Points** | Supabase `users.respect_points` | Real-time display |
| **Membership Tier** | Supabase `users.membership_tier` | Display with progress bar |
| **NFT Status** | Supabase `users.family_badge_nft_minted` | Show mint button if false |
| **Avatar Image** | IPFS via `users.avatar_ipfs_hash` | Display user avatar |
| **Recent Deals** | Supabase `deals` table | Query user's recent deals |
| **Achievements** | Supabase `users.achievements` | Display badges/icons |

**New Components Needed**:
- `AuthProvider.tsx` - Supabase auth context
- `ProfileCard.tsx` - User profile display with IPFS avatar
- `NFTMintButton.tsx` - Mint Family Badge NFT
- `AchievementBadge.tsx` - Display unlocked achievements

**API Calls**:
```typescript
// Fetch user profile
const { data: user } = await supabase
  .from('users')
  .select('*')
  .eq('auth_id', session.user.id)
  .single();

// Update respect points (triggered by completing deal)
await supabase
  .from('users')
  .update({ respect_points: user.respect_points + 100 })
  .eq('id', user.id);
```

---

### **3. The Lounge (Lounge.tsx)**
**Status**: 🔄 Needs Supabase + IPFS Integration

| Feature | Backend | Implementation |
|---------|---------|----------------|
| **User Authentication** | Supabase Auth | Required to view/post |
| **Chat Messages** | Supabase `lounge_messages` | Real-time subscription |
| **User Avatars** | IPFS via `users.avatar_ipfs_hash` | Display in chat |
| **Image Uploads** | IPFS + Supabase | Upload to IPFS, store CID |
| **File Attachments** | IPFS + Supabase | PDF/docs on IPFS |
| **Reactions/Emojis** | Supabase `lounge_messages.reactions` | Update JSONB field |
| **Member List** | Supabase `users` | Show online members |
| **Poll/Voting** | Supabase custom table | Create `polls` table |

**Real-Time Subscription**:
```typescript
// Subscribe to new messages
const subscription = supabase
  .channel('lounge_chat')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'lounge_messages'
  }, (payload) => {
    setMessages(prev => [...prev, payload.new]);
  })
  .subscribe();
```

**Image Upload Flow**:
```typescript
// 1. User selects image
// 2. Upload to IPFS
const ipfsHash = await uploadToIPFS(imageFile);

// 3. Store message with IPFS reference
await supabase.from('lounge_messages').insert({
  user_id: currentUser.id,
  message: 'Shared an image',
  message_type: 'image',
  attachments_ipfs: [{ 
    filename: imageFile.name, 
    ipfs_hash: ipfsHash,
    mime_type: 'image/png'
  }]
});
```

---

### **4. Command Room (CommandRoom.tsx)**
**Status**: 🔄 Needs Supabase + IPFS Integration

| Feature | Backend | Implementation |
|---------|---------|----------------|
| **User Authentication** | Supabase Auth | Required |
| **Deal Cards** | Supabase `deals` table | Query active deals |
| **Deal Creation** | Supabase `deals` + IPFS | Upload docs to IPFS |
| **Deal Documents** | IPFS via `deals.documents_ipfs` | Download from IPFS gateway |
| **Analytics Dashboard** | Supabase `command_room_analytics` | Chart data |
| **Network Graph** | Supabase `users` + relationships | Show connections |
| **Market Intelligence** | External APIs + Supabase cache | Token prices, trends |
| **Team Assignments** | Supabase `deals.assigned_to` | Multi-user collaboration |

**Deal Creation Flow**:
```typescript
// 1. User fills form with attachments
// 2. Upload documents to IPFS
const documentCIDs = await Promise.all(
  documents.map(doc => uploadToIPFS(doc))
);

// 3. Create deal record
await supabase.from('deals').insert({
  title: 'New Investment Opportunity',
  description: 'Details...',
  category: 'Investment',
  created_by: currentUser.id,
  documents_ipfs: documentCIDs.map((cid, i) => ({
    filename: documents[i].name,
    ipfs_hash: cid,
    uploaded_at: new Date().toISOString()
  }))
});
```

**Analytics Query**:
```typescript
// Fetch user's deal performance
const { data: analytics } = await supabase
  .from('command_room_analytics')
  .select('*')
  .eq('user_id', currentUser.id)
  .eq('metric_type', 'deal_activity')
  .order('recorded_at', { ascending: false })
  .limit(30);
```

---

### **5. Manifesto (Manifesto.tsx)**
**Status**: ✅ Static Page (No Changes)

| Feature | Backend | Notes |
|---------|---------|-------|
| Content Display | Hardcoded in component | No backend needed |
| *Optional: IPFS Archive* | IPFS | Upload full manifesto for permanent record |

---

### **6. Technology (Technology.tsx)**
**Status**: ✅ Static Page (No Changes)

| Feature | Backend | Notes |
|---------|---------|-------|
| Content Display | Hardcoded in component | No backend needed |

---

## 🚀 Implementation Phases

### **Phase 1: Supabase Setup (Week 1)**
1. ✅ Create Supabase project
2. ✅ Set up database schema (run SQL migrations)
3. ✅ Configure authentication (email + OAuth)
4. ✅ Set up Row Level Security policies
5. ✅ Generate TypeScript types from schema

### **Phase 2: Authentication Integration (Week 1-2)**
1. ✅ Install Supabase client library
2. ✅ Create `AuthProvider` context
3. ✅ Add login/signup pages
4. ✅ Protect authenticated routes
5. ✅ Add Solana wallet connection (optional)

### **Phase 3: Dashboard Integration (Week 2)**
1. ✅ Connect Dashboard to `users` table
2. ✅ Display real user data (respect points, tier)
3. ✅ Add profile editing functionality
4. ✅ Implement IPFS avatar upload

### **Phase 4: IPFS Integration (Week 2-3)**
1. ✅ Set up Pinata/NFT.Storage account
2. ✅ Create IPFS upload utility functions
3. ✅ Add file upload UI components
4. ✅ Test image/document uploads

### **Phase 5: Lounge Integration (Week 3)**
1. ✅ Connect chat to `lounge_messages` table
2. ✅ Implement real-time subscriptions
3. ✅ Add message composer with file upload
4. ✅ Display IPFS avatars and attachments

### **Phase 6: Command Room Integration (Week 3-4)**
1. ✅ Connect deals system to database
2. ✅ Add deal creation with IPFS documents
3. ✅ Build analytics dashboard
4. ✅ Implement team assignment features

### **Phase 7: NFT Minting (Week 4)**
1. ✅ Create NFT metadata generator
2. ✅ Upload metadata to IPFS
3. ✅ Integrate Solana NFT minting (Metaplex)
4. ✅ Update user record on successful mint

### **Phase 8: Testing & Polish (Week 5)**
1. ✅ End-to-end testing
2. ✅ Performance optimization
3. ✅ Security audit
4. ✅ Documentation

---

## 🔧 Environment Variables Needed

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# IPFS (Pinata)
VITE_PINATA_API_KEY=your-api-key
VITE_PINATA_SECRET_KEY=your-secret-key
VITE_PINATA_JWT=your-jwt-token

# IPFS Gateway (for reading)
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Solana (for NFT minting)
VITE_SOLANA_NETWORK=mainnet-beta
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
VITE_GOLD_MAFIA_TOKEN_MINT=your-token-mint-address
```

---

## 📦 Dependencies to Install

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@pinata/sdk": "^2.1.0",
    "@solana/web3.js": "^1.87.0",
    "@metaplex-foundation/js": "^0.19.0",
    "@solana/wallet-adapter-react": "^0.15.32",
    "@solana/wallet-adapter-wallets": "^0.19.16",
    "ipfs-http-client": "^60.0.1",
    "react-query": "^3.39.3" // For data fetching/caching
  }
}
```

---

## 📊 Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **User Registration** | 100+ users | Supabase `users` count |
| **Daily Active Users** | 30+ DAU | Supabase analytics |
| **Messages Sent** | 500+ messages | `lounge_messages` count |
| **Deals Created** | 50+ deals | `deals` count |
| **NFTs Minted** | 80% of users | `users.family_badge_nft_minted = true` |
| **IPFS Uploads** | 200+ files | Track IPFS CIDs in database |
| **Average Session Time** | 10+ minutes | Supabase realtime analytics |

---

## 🛡️ Security Considerations

### **Authentication**
- ✅ Use Supabase Auth (industry-standard)
- ✅ Implement JWT token refresh
- ✅ Add rate limiting on login attempts
- ✅ Require email verification for new accounts

### **Database**
- ✅ Enable Row Level Security on all tables
- ✅ Use prepared statements (Supabase handles this)
- ✅ Validate all user inputs
- ✅ Audit logs for sensitive operations

### **IPFS**
- ✅ Validate file types before upload
- ✅ Limit file sizes (max 10MB for images, 50MB for docs)
- ✅ Scan uploads for malware (use VirusTotal API)
- ✅ Don't expose Pinata secret keys in frontend

### **Solana**
- ✅ Verify wallet ownership before linking
- ✅ Sign messages for authentication
- ✅ Use hardware wallet support
- ✅ Audit smart contracts before deployment

---

## 📝 Next Steps

1. **Review this plan** and confirm the scope
2. **Set up Supabase project** and get credentials
3. **Create Pinata account** and get API keys
4. **Install dependencies** (`pnpm add @supabase/supabase-js` etc.)
5. **Create `.env` file** with all credentials
6. **Begin Phase 1** (Supabase setup)

---

## 🤝 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Pinata Docs**: https://docs.pinata.cloud
- **IPFS Docs**: https://docs.ipfs.tech
- **Solana Docs**: https://docs.solana.com
- **Metaplex Docs**: https://docs.metaplex.com

---

**Last Updated**: October 21, 2025
**Version**: 1.0
**Status**: Ready for Implementation 🚀
