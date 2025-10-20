# 🚀 Quick Start Guide - Supabase & IPFS Setup

## ⚡ Immediate Action Items

### Step 1: Create Supabase Project (5 minutes)
1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign in with GitHub
4. Click **"New project"**
   - Organization: Create "Gold Mafia"
   - Name: `goldmafia-production`
   - Database Password: **Save this securely!**
   - Region: Choose closest to your users
   - Pricing: Start with **Free tier**
5. Wait for project to initialize (~2 minutes)

### Step 2: Get Supabase Credentials (2 minutes)
1. In your Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in left sidebar
3. Copy these values:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 3: Create Database Schema (10 minutes)
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Authentication
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT UNIQUE NOT NULL,
  
  -- Profile
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_ipfs_hash TEXT,
  bio TEXT,
  
  -- Solana
  solana_wallet_address TEXT UNIQUE,
  wallet_verified BOOLEAN DEFAULT FALSE,
  
  -- Gamification
  membership_tier TEXT DEFAULT 'Associate',
  respect_points INTEGER DEFAULT 0,
  total_deals_completed INTEGER DEFAULT 0,
  
  -- NFT
  family_badge_nft_minted BOOLEAN DEFAULT FALSE,
  family_badge_nft_mint_address TEXT,
  family_badge_metadata_ipfs TEXT,
  
  -- Achievements
  achievements JSONB DEFAULT '[]',
  
  -- Privacy
  profile_visibility TEXT DEFAULT 'members_only',
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE
);

-- 2. Deals Table
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  estimated_value NUMERIC(15, 2),
  status TEXT DEFAULT 'open',
  
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  assigned_to UUID[] DEFAULT '{}',
  
  documents_ipfs JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  deadline TIMESTAMP WITH TIME ZONE
);

-- 3. Lounge Messages Table
CREATE TABLE lounge_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  
  attachments_ipfs JSONB DEFAULT '[]',
  reply_to UUID REFERENCES lounge_messages(id),
  reactions JSONB DEFAULT '{}',
  
  is_pinned BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

-- 4. Create Indexes
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_wallet ON users(solana_wallet_address);
CREATE INDEX idx_deals_creator ON deals(created_by);
CREATE INDEX idx_lounge_user ON lounge_messages(user_id);
CREATE INDEX idx_lounge_created ON lounge_messages(created_at DESC);

-- 5. Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE lounge_messages ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for Users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = auth_id);

CREATE POLICY "Members can view other members"
  ON users FOR SELECT
  USING (is_active = TRUE AND is_verified = TRUE);

-- 7. RLS Policies for Lounge
CREATE POLICY "Authenticated users can view messages"
  ON lounge_messages FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can send messages"
  ON lounge_messages FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- 8. Function to auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Trigger to auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Click **"Run"** (or press Ctrl+Enter)
5. Verify success: Should see "Success. No rows returned"

### Step 4: Set Up Pinata (IPFS) (5 minutes)
1. Go to https://pinata.cloud
2. Click **"Start Building"**
3. Sign up with email
4. Verify your email
5. Go to **API Keys** (left sidebar)
6. Click **"New Key"**
   - Key Name: `goldmafia-production`
   - Permissions: Check **"Pin to IPFS"**
7. Click **"Create Key"**
8. **SAVE THESE IMMEDIATELY** (you won't see them again):
   ```
   API Key: xxxxxxxxxxxxxxxxxxxxx
   API Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 5: Create Environment File (3 minutes)
1. In your project root, create `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Pinata IPFS Configuration
VITE_PINATA_API_KEY=xxxxxxxxxxxxxxxxxxxxx
VITE_PINATA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# IPFS Gateway
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Solana Configuration
VITE_SOLANA_NETWORK=mainnet-beta
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
VITE_GOLD_MAFIA_WALLET=7xKXtg2CW87d97TXJSDpbD5jBkheTqA7v3LB9mP9qZ
```

2. Add `.env` to `.gitignore`:
```bash
# Environment variables
.env
.env.local
.env.production
```

### Step 6: Install Dependencies (2 minutes)
Run in terminal:
```powershell
pnpm add @supabase/supabase-js axios
```

### Step 7: Create Supabase Client (5 minutes)
Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export types
export type User = {
  id: string;
  email: string;
  username?: string;
  display_name?: string;
  avatar_ipfs_hash?: string;
  membership_tier: string;
  respect_points: number;
  family_badge_nft_minted: boolean;
  solana_wallet_address?: string;
};

export type Deal = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  status: string;
  created_by: string;
  created_at: string;
};

export type LoungeMessage = {
  id: string;
  user_id: string;
  message: string;
  message_type: string;
  created_at: string;
  attachments_ipfs: any[];
};
```

### Step 8: Create IPFS Utility (5 minutes)
Create `src/lib/ipfs.ts`:

```typescript
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;

/**
 * Upload file to IPFS via Pinata
 */
export const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload to IPFS');
  }

  const data = await response.json();
  return data.IpfsHash; // Returns CID
};

/**
 * Get IPFS file URL
 */
export const getIPFSUrl = (cid: string): string => {
  return `${IPFS_GATEWAY}${cid}`;
};

/**
 * Upload JSON metadata to IPFS
 */
export const uploadJSONToIPFS = async (metadata: object): Promise<string> => {
  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PINATA_JWT}`
    },
    body: JSON.stringify(metadata)
  });

  if (!response.ok) {
    throw new Error('Failed to upload JSON to IPFS');
  }

  const data = await response.json();
  return data.IpfsHash;
};
```

### Step 9: Test Connection (5 minutes)
Create `src/lib/test-connection.ts`:

```typescript
import { supabase } from './supabase';
import { uploadToIPFS, uploadJSONToIPFS } from './ipfs';

/**
 * Test Supabase connection
 */
export const testSupabase = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    console.log('✅ Supabase connected! User count:', data);
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};

/**
 * Test IPFS connection
 */
export const testIPFS = async () => {
  try {
    // Create a small test file
    const testData = { test: 'Hello from Gold Mafia', timestamp: Date.now() };
    const cid = await uploadJSONToIPFS(testData);
    console.log('✅ IPFS connected! Test CID:', cid);
    return cid;
  } catch (error) {
    console.error('❌ IPFS connection failed:', error);
    return null;
  }
};
```

### Step 10: Verify Setup (2 minutes)
In your browser console (F12), run:

```typescript
import { testSupabase, testIPFS } from '@/lib/test-connection';

// Test both services
await testSupabase();
await testIPFS();
```

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Pinata account created
- [ ] API keys saved securely
- [ ] `.env` file created with all credentials
- [ ] Dependencies installed (`@supabase/supabase-js`)
- [ ] `supabase.ts` client created
- [ ] `ipfs.ts` utility created
- [ ] Connection tests pass

---

## 🎯 Next Steps After Setup

1. **Build Authentication Flow**
   - Create login/signup pages
   - Add AuthProvider context
   - Protect dashboard routes

2. **Connect Dashboard**
   - Fetch real user data from Supabase
   - Display respect points, tier, NFT status
   - Add profile editing

3. **Integrate Lounge Chat**
   - Real-time message subscription
   - IPFS image uploads
   - User avatars

4. **Build Command Room**
   - Deal creation with IPFS documents
   - Analytics dashboard
   - Team assignments

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env` file exists in project root
- Verify variable names start with `VITE_`
- Restart dev server after creating `.env`

### "Failed to upload to IPFS"
- Verify Pinata JWT is correct
- Check file size (max 100MB on free tier)
- Ensure JWT has "Pin to IPFS" permission

### "Row Level Security policy violation"
- User must be authenticated
- Check RLS policies in Supabase dashboard
- Verify `auth.uid()` matches `users.auth_id`

---

**Total Setup Time**: ~45 minutes

**Status After Completion**: Ready to build authentication and dashboard integration! 🚀
