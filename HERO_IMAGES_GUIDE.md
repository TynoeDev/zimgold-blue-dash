# Hero Image Animation - Landing Page

## Current Setup

Your landing page now features an **animated hero image slider** that smoothly transitions between multiple images!

### Images Currently Displaying:

1. **gold-mafia-hero-one.jpeg** - First image (8 seconds)
2. **goldmafia-hero-boss.jpg** - Boss with Rottweiler (8 seconds)

### Animation Details:

- **Duration:** 16 seconds total cycle (8 seconds per image)
- **Effect:** Smooth fade-in/out with subtle zoom
- **Transition:** Crossfade between images
- **Loop:** Infinite seamless loop

### How It Works:

```
Image 1 → Fade In (1s) → Display (7s) → Fade Out (1s)
   ↓
Image 2 → Fade In (1s) → Display (7s) → Fade Out (1s)
   ↓
[Loop back to Image 1]
```

## Adding More Images

To add more hero images to the rotation:

1. **Save your image** to `public/images/` folder
   - Name it something like: `goldmafia-hero-3.jpg`

2. **Edit** `app/page.tsx` around line 64-75

3. **Add a new image div** with the next animation delay:
   ```tsx
   <div className="absolute inset-0 w-full h-full animate-fadeSlide" style={{ animationDelay: '16s' }}>
     <img 
       src="/images/goldmafia-hero-3.jpg" 
       alt="Gold Mafia" 
       className="w-full h-full object-cover opacity-70"
     />
   </div>
   ```

4. **Adjust animation timing** in `app/globals.css`:
   - For 3 images: Change from `16s` to `24s` total
   - For 4 images: Change from `16s` to `32s` total
   - Pattern: `8 seconds × number of images`

## Image Guidelines:

- **Format:** JPG, PNG, or WebP
- **Resolution:** 1920x1080 or higher
- **Aspect Ratio:** 16:9 recommended
- **File Size:** Under 2MB per image for fast loading
- **Theme:** Gold Mafia aesthetic (gold, black, luxury, power)

## Current Animation Timing:

```css
@keyframes fadeSlide {
  0%   → Fade in starts
  5%   → Fully visible
  45%  → Still visible
  50%  → Fade out complete
  100% → Hidden, waiting for next cycle
}
```

## Ready for More!

Just send me the next images and I'll add them to the rotation! 👑✨
