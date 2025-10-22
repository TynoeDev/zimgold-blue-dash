# GOLD MAFIA - Born Gods 👑

<p align="center">
  <strong>The Most Luxurious Meme Token on Solana</strong>
</p>

<p align="center">
  <a href="http://localhost:3000" target="_blank"><strong>🌐 View Live Website »</strong></a>
</p>

---

## 🚀 About The Project

**GOLD MAFIA** is not just another meme token—it's a statement. A lifestyle. A movement for those born into greatness.

This ultra-premium landing page features:
- **Cinematic Hero Video**: Gold-plated Gulfstream jet landing with Don stepping out
- **Vault Crack Animation**: Screen shatters like gold vault opening on mint
- **Solana Integration**: Phantom/Jupiter wallet connect (0.001 SOL, 1B supply)
- **Auto-Generated Mafia Email**: mafia.[wallet]@goldmafia.org
- **Gold Bar Empire**: Animated wealth visualization post-mint
- **Zero Noise**: No forums. No shit. Just pure empire building.

---

## � Features

### Landing Page
* **Full-screen hero video** (10s loop, autoplay, muted)
* **"GOLD MAFIA" title** with gold dripping effect and glow pulse
* **"Born Gods" subtitle** with vapor trail animation
* **MINT button** with heartbeat pulse (20% width, bottom-center)
* **Pitch black background** (#000000), no scroll

### Minting Flow
1. User clicks "MINT $GOLDMAFIA"
2. Screen cracks with gold vault opening effect (CSS shatter)
3. Solana wallet connects (Phantom/Jupiter)
4. Mint transaction (0.001 SOL fee, 1B total supply)
5. Gold confetti explosion
6. Fade to personal dashboard

### Post-Mint Dashboard
* **"YOUR EMPIRE BUILT"** hero title
* **Auto-generated email**: mafia.[wallet-short]@goldmafia.org
* **Wallet display**: Connected address
* **Gold bar mountain**: Animated with crown avatar
* **Link Wallet button**: Connect to Phantom
* **"No forums. No shit."** tagline

---

## 🛠️ Tech Stack

* **Next.js 14**: React framework with App Router
* **React 18**: For building dynamic UI
* **Tailwind CSS**: Utility-first styling with custom animations
* **shadcn/ui**: High-quality component library
* **Solana Web3.js**: Blockchain integration (ready for Phantom/Jupiter)
* **Local Storage**: Persistent mint state

---

## � Installation & Setup

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

The site will be available at `http://localhost:3000`

---

## 🎨 Hero Video Setup

The landing page expects a hero video at `/public/videos/hero-landing.mp4`

### Midjourney Generation Prompt:
```
gulfstream g700 landing memphis river night, liquid gold dripping wings, black don 3 gold chains steps out, 2 tattooed bodyguards bullion cases, 4 women liquid gold micro dresses jet stairs sipping champagne, gold throne mountain background, crown tailfin sparks, cinematic 8k ultra real volumetric god rays no text
```

**Specs**: 10s loop, 1920x1080+, MP4 format, <50MB

See `/public/videos/README.md` for detailed instructions.

---

## 🔗 Solana Integration

The minting function is currently set up for demo mode. To enable real Solana transactions:

1. Uncomment the Phantom wallet code in `app/page.tsx`
2. Install Solana dependencies:
   ```bash
   pnpm add @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets
   ```
3. Configure your token mint address and program ID
4. Set up SPL token creation on Solana devnet/mainnet

---

## 🎯 Custom Animations

All custom animations are defined in `app/globals.css`:

- `gold-text-drip` - Gold gradient with dripping effect
- `animate-glow-pulse` - Pulsing glow effect
- `animate-vapor-trail` - Fade-in with upward movement
- `animate-heartbeat` - Heartbeat pulse for CTA button
- `crack-overlay` - Screen crack/shatter effect
- `confetti-piece` - Gold confetti explosion
- `gold-bar` - Animated gold bars with rise effect
- `glass-panel` - Frosted glass with gold tint
- `god-rays` - Volumetric light rays
- `spark-gold` - Twinkling gold particles

---

## 🎨 Color Palette

```css
Background: #000000 (Pure Black)
Primary Gold: #FFD700
Accent Gold: #FFED4E
Dark Gold: #D4AF37
Amber: #B8860B
```

---

## 📱 Responsive Design

- Desktop: Full cinematic experience
- Mobile: Optimized touch interactions, responsive text scaling
- No horizontal scroll
- Viewport-locked (no vertical scroll on landing)

---

## 🚀 Deployment

Ready to deploy to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

```bash
# Build production bundle
pnpm build

# Output will be in .next directory
```

---

## 📄 License

Distributed under the **MIT License**.

---

## 📧 Contact

Project: **GOLD MAFIA**  
Website: http://localhost:3000 (development)

---

**No forums. No shit. Just gold.**

