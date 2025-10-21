# Backend Setup Guide

This guide will walk you through setting up Supabase, Pinata (IPFS), and Solana wallet integration for the Gold Mafia platform.

---

## 📊 Part 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: `gold-mafia` (or your preference)
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Start with Free tier

4. Wait for project creation (takes ~2 minutes)

### 1.2 Get API Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`
3. Paste them into your `.env` file

### 1.3 Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open `supabase/schema.sql` from your project
4. Copy the entire file contents
5. Paste into the SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter`)
7. Verify success - you should see:
   - ✅ Tables created (profiles, messages, deals, etc.)
   - ✅ RLS policies enabled
   - ✅ Triggers and functions created
   - ✅ Seed data inserted (channels, achievements)

### 1.4 Verify Database Setup

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - `profiles`
   - `channels`
   - `messages`
   - `message_reactions`
   - `deals`
   - `deal_assignments`
   - `deal_comments`
   - `achievements`
   - `user_achievements`
   - `activity_log`

3. Click on `channels` table - you should see 4 pre-populated channels:
   - general
   - deals
   - strategy
   - lounge

### 1.5 Enable Real-Time (Optional but Recommended)

1. Go to **Database** → **Replication**
2. Find these tables and enable replication:
   - `messages`
   - `message_reactions`
   - `deals`
   - `deal_comments`
   - `profiles`

This enables real-time updates for chat and deals.

---

## 📦 Part 2: Pinata (IPFS) Setup

### 2.1 Create Pinata Account

1. Go to [https://pinata.cloud](https://pinata.cloud) and sign up
2. Verify your email address
3. Complete onboarding

### 2.2 Generate API Keys

1. Go to **Developers** → **API Keys**
2. Click **"New Key"**
3. Configure key permissions:
   - ✅ **pinFileToIPFS** (upload files)
   - ✅ **pinJSONToIPFS** (upload metadata)
   - Optional: **unpin**, **pinList** (if you want to manage pins)
4. Give it a name: `gold-mafia-app`
5. Click **"Create Key"**
6. **IMPORTANT**: Copy and save these values immediately (shown only once):
   - **API Key** → `VITE_PINATA_API_KEY`
   - **API Secret** → `VITE_PINATA_SECRET_API_KEY`
   - **JWT** → `VITE_PINATA_JWT`

7. Paste into your `.env` file

### 2.3 Set Up Gateway (Optional)

1. Go to **Gateways** in Pinata dashboard
2. You can use the default gateway: `gateway.pinata.cloud`
3. Or create a dedicated gateway for better performance:
   - Click **"Create Gateway"**
   - Choose a subdomain: `your-app-name.mypinata.cloud`
   - Update `.env`: `VITE_PINATA_GATEWAY=your-app-name.mypinata.cloud`

### 2.4 Test IPFS Upload

Run this in your browser console after starting the app:

```javascript
// Test file upload
const testFile = new File(['Hello IPFS!'], 'test.txt', { type: 'text/plain' });
const result = await uploadFileToPinata(testFile, { name: 'test-upload' });
console.log('IPFS Hash:', result.ipfs_hash);
console.log('URL:', result.url);
```

Visit the URL - you should see your test file!

---

## 🪙 Part 3: Solana Wallet Setup

### 3.1 Choose Network

For development, use **devnet**:
```env
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com
```

For production, use **mainnet-beta**:
```env
VITE_SOLANA_NETWORK=mainnet-beta
VITE_SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
```

### 3.2 Get Better RPC Endpoint (Recommended)

Free public RPCs are rate-limited. For better performance:

**Option A: QuickNode**
1. Sign up at [https://quicknode.com](https://quicknode.com)
2. Create a Solana endpoint
3. Copy the HTTPS URL → `VITE_SOLANA_RPC_ENDPOINT`

**Option B: Helius**
1. Sign up at [https://helius.dev](https://helius.dev)
2. Create an API key
3. Use: `https://rpc.helius.xyz/?api-key=YOUR_KEY`

### 3.3 Install Wallet Extension

Users will need a Solana wallet browser extension:
- **Phantom**: [https://phantom.app](https://phantom.app) (Recommended)
- **Solflare**: [https://solflare.com](https://solflare.com)
- **Backpack**: [https://backpack.app](https://backpack.app)

### 3.4 Get Devnet SOL (for testing)

1. Install Phantom wallet
2. Switch to Devnet in wallet settings
3. Get free devnet SOL:
   - Use wallet's built-in airdrop
   - Or visit: [https://solfaucet.com](https://solfaucet.com)

---

## ✅ Verification Checklist

Before moving forward, verify:

### Supabase
- [ ] Project created and running
- [ ] API keys in `.env` file
- [ ] Schema.sql executed successfully
- [ ] Tables visible in Table Editor
- [ ] Seed data present (4 channels, 4 achievements)
- [ ] Real-time enabled on key tables

### Pinata
- [ ] Account created and verified
- [ ] API keys generated and saved
- [ ] Keys in `.env` file
- [ ] Gateway configured
- [ ] Test upload successful

### Solana
- [ ] Network selected (devnet/mainnet)
- [ ] RPC endpoint configured
- [ ] Wallet extension installed
- [ ] Test wallet funded (devnet SOL)

### Environment
- [ ] All `.env` variables filled
- [ ] No placeholder values like `your-project-id`
- [ ] `.env` file in gitignore (check!)
- [ ] Development server runs without errors

---

## 🔧 Troubleshooting

### Supabase Connection Error
```
Error: Invalid Supabase URL
```
**Fix**: Double-check `VITE_SUPABASE_URL` format: `https://xxxxx.supabase.co`

### Pinata Upload Fails
```
Error: Pinata upload failed: 401 Unauthorized
```
**Fix**: Verify `VITE_PINATA_JWT` is correct and has proper permissions

### RLS Policy Error
```
Error: new row violates row-level security policy
```
**Fix**: Make sure user is authenticated before database operations

### Real-Time Not Working
```
Messages don't appear in real-time
```
**Fix**: 
1. Check replication is enabled for the table
2. Verify subscription in browser console
3. Check Supabase project logs for errors

---

## 🚀 Next Steps

After completing this setup:

1. **Test Authentication**
   - Create a test user account
   - Verify profile is created automatically
   - Check RLS policies allow proper access

2. **Test Chat System**
   - Send a message in Lounge
   - Verify it appears in real-time
   - Test file upload to IPFS

3. **Test Deal Management**
   - Create a test deal in Command Room
   - Upload a document to IPFS
   - Verify document appears in deal

4. **Connect Wallet**
   - Install Phantom wallet
   - Connect to the app
   - Test NFT minting flow

5. **Deploy**
   - Set up production environment variables
   - Configure Vercel/Netlify for deployment
   - Test production build

---

## 📚 Additional Resources

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Pinata Docs**: [https://docs.pinata.cloud](https://docs.pinata.cloud)
- **Solana Docs**: [https://docs.solana.com](https://docs.solana.com)
- **Wallet Adapter**: [https://github.com/solana-labs/wallet-adapter](https://github.com/solana-labs/wallet-adapter)

---

## 💡 Tips

- **Development**: Use devnet for Solana, test data for Supabase
- **Staging**: Use testnet for Solana, separate Supabase project
- **Production**: Use mainnet-beta, production Supabase project
- **Security**: Never commit `.env` file to git
- **Performance**: Use dedicated RPC endpoints (QuickNode/Helius)
- **Monitoring**: Enable Supabase logs and Pinata analytics

---

Need help? Check the main README.md or create an issue on GitHub.
