# Gold Mafia - Refactored Structure

## 📁 Project Structure

The monolithic 443-line component has been split into separate pages with Next.js App Router:

```
app/
├── page.tsx                    # Landing Page (/)
├── dashboard/
│   └── page.tsx               # Dashboard Page (/dashboard)
├── layout.tsx                 # Root layout
└── globals.css                # Global styles with animations
```

## 🎯 Pages

### Landing Page (`/`)
**File:** `app/page.tsx`
**Size:** ~125 lines (down from 443)
**Features:**
- Hero section with video background
- Gold Mafia branding and logo
- Mint button with vault crack animation
- Confetti explosion on mint
- Redirects to `/dashboard` after minting

**State Management:**
- `isConnecting` - Wallet connection status
- `showConfetti` - Confetti animation trigger
- `crackScreen` - Vault crack overlay trigger

**Navigation:**
- Uses `useRouter()` from `next/navigation`
- Saves wallet to localStorage
- Redirects to dashboard after 3-second confetti

### Dashboard Page (`/dashboard`)
**File:** `app/dashboard/page.tsx`
**Size:** ~450 lines
**Features:**
- Protected route (checks localStorage)
- 4-tab interface:
  - **Overview** - Wallet info, email creation, gold bar visualization
  - **Members** - Directory of 4 mock members
  - **Mint NFT** - Membership NFT minting (0.1 SOL)
  - **Projects** - Marketplace with 3 mock projects

**State Management:**
- `walletAddress` - Connected wallet from localStorage
- `customEmail` - Custom email prefix
- `activeTab` - Current active tab

**Mock Data:**
- Members: Don Soprano, Consigliere Ray, Capo Tony, Soldier Mike
- Projects: Gold NFT Collection, Mafia Metaverse, Token Swap Protocol

**Navigation:**
- "Back to Landing" button clears localStorage and returns to `/`
- Phantom wallet integration (mock)

## 📐 Design Changes (20% Smaller)

All elements have been reduced by 20% across the board:

### Landing Page
- Logo: `w-24` → `w-32` (was `w-32` → `w-40`)
- Title: `text-[8vw]` (was `text-[10vw]`)
- Subtitle: `text-2xl md:text-4xl` (was `text-3xl md:text-5xl`)
- Button: `text-xl md:text-2xl py-6` (was `text-2xl md:text-3xl py-8`)
- Button text: `text-[10px]` (was `text-xs`)

### Dashboard
- Logo: `w-8 h-8` (was `w-10 h-10`)
- Title: `text-2xl sm:text-4xl md:text-5xl` (was `text-3xl sm:text-5xl md:text-7xl`)
- Tab buttons: `text-[10px] sm:text-xs py-1.5 sm:py-2` (was `text-xs sm:text-sm py-2 sm:py-3`)
- Card titles: `text-sm sm:text-base` (was `text-base sm:text-lg`)
- Card descriptions: `text-[10px] sm:text-xs` (was `text-xs sm:text-sm`)
- Member avatars: `w-7 h-7 sm:w-10 sm:h-10` (was `w-8 h-8 sm:w-12 sm:h-12`)
- NFT preview: `text-3xl sm:text-6xl` (was `text-4xl sm:text-8xl`)
- Gold bar visualization: `h-32 sm:h-52` (was `h-40 sm:h-64`)
- Crown icon: `text-base sm:text-2xl` (was `text-xl sm:text-3xl`)

## 🔗 Routing

### Navigation Flow
```
Landing (/) 
   ↓ [Mint Button]
   ↓ (Saves to localStorage)
   ↓ (3s confetti delay)
   ↓
Dashboard (/dashboard)
   ↓ [Back to Landing Button]
   ↓ (Clears localStorage)
   ↓
Landing (/)
```

### LocalStorage Keys
- `goldmafia_minted` - "true" after successful mint
- `goldmafia_wallet` - Mock wallet address (0x...)

## 🎨 Shared Styling

All pages use the same gold theme from `app/globals.css`:
- `.gold-text-drip` - Gold gradient text effect
- `.animate-glow-pulse` - Pulsing glow (2s)
- `.animate-vapor-trail` - Fade-in upward (1.5s)
- `.animate-heartbeat` - Heartbeat pulse (1.5s)
- `.animate-float` - Floating animation (3s)
- `.crack-overlay` - Screen shatter effect
- `.confetti-piece` - Falling confetti
- `.gold-bar` - Rising gold bars
- `.glass-panel` - Frosted glass
- `.god-rays` - Volumetric light rays
- `.spark-gold` - Twinkling particles
- `.particle-gold` - Floating particles
- `.animate-shine` - Shine sweep effect

## 🚀 Running the Project

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📝 Key Improvements

✅ **Separation of Concerns**
- Landing page handles wallet connection
- Dashboard handles all post-mint features
- Clear separation between public and protected routes

✅ **Cleaner Code**
- No more giant 443-line component
- Each page is self-contained
- Easier to maintain and debug

✅ **Better Performance**
- Smaller initial bundle (landing page loads first)
- Dashboard only loads when needed
- Code splitting by route

✅ **Maintainability**
- Easy to add new dashboard tabs
- Simple to modify landing page
- Clear file structure

✅ **20% Smaller Design**
- All text, spacing, and elements reduced proportionally
- Better fits on 1366x768 screens
- Maintains responsive design
- Preserves visual hierarchy

## 🔮 Future Enhancements

- Add real Solana wallet integration (Phantom/Jupiter)
- Connect to backend API for members/projects
- Implement actual email creation service
- Add more dashboard tabs (Analytics, Settings, etc.)
- Create reusable components in `/components`
- Add middleware for route protection
- Implement proper authentication

## 📄 File Sizes

- **Before:** 443 lines in `app/page.tsx`
- **After:** 
  - Landing: ~125 lines
  - Dashboard: ~450 lines
  - **Total: ~575 lines** (but properly organized)

The slight increase in total lines is due to:
- Proper component separation
- Better readability
- Complete import statements for each file
- No shared state complications
