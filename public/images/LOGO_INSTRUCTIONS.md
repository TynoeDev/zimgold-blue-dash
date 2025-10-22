# Gold Mafia Logo Instructions

## Logo Placement

The Gold Mafia logo has been integrated into the website in two sizes:

### 1. Landing Page (Large Logo)
- **Location**: Above "GOLD MAFIA" title on the main landing page
- **Size**: 
  - Mobile: 128x128px (w-32 h-32)
  - Tablet: 192x192px (w-48 h-48)
  - Desktop: 256x256px (w-64 h-64)
- **Effects**: 
  - Floating animation
  - Gold glow shadow (drop-shadow)

### 2. Dashboard (Small Logo)
- **Location**: Top center of dashboard, above "YOUR EMPIRE" title
- **Size**: 40x40px (w-10 h-10)
- **Effects**: Gold glow shadow

## How to Add Your Logo

1. **Save your logo image** as: `goldmafia-logo.png`
2. **Place it in**: `public/images/` folder
3. **Recommended format**: PNG with transparent background
4. **Recommended resolution**: 512x512px (will scale automatically)

## Current Path
The code is looking for: `/images/goldmafia-logo.png`

This translates to: `a:\github\gold mafia\GoldMafia\public\images\goldmafia-logo.png`

## Alternative Formats
If you prefer a different format, you can change the file extension in:
- `app/page.tsx` line ~403 (landing page)
- `app/page.tsx` line ~104 (dashboard)

Replace `.png` with `.jpg`, `.svg`, or `.webp` as needed.

## Tips
- Use PNG for transparency
- Use SVG for perfect scaling
- Ensure the logo has good contrast on black background
- The logo will automatically get a gold glow effect
