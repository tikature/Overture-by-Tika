# QA — Testing & Verification

## Overflow Check Script

Paste this into the browser console to verify no horizontal overflow at any viewport width:

```javascript
(function() {
  const results = [];
  const docWidth = document.documentElement.scrollWidth;
  const winWidth = window.innerWidth;
  
  console.log(`📐 Viewport: ${winWidth}px | Document: ${docWidth}px`);
  
  if (docWidth > winWidth) {
    console.warn(`⚠️ OVERFLOW DETECTED: ${docWidth - winWidth}px`);
    results.push(`Document overflow: ${docWidth - winWidth}px`);
  } else {
    console.log(`✅ No document-level overflow`);
  }
  
  document.querySelectorAll('*').forEach(el => {
    const rect = el.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(el);
    const isVisible = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    
    if (!isVisible) return;
    
    if (rect.left < 0 || rect.right > winWidth) {
      results.push(`❌ ${el.tagName}.${el.className.split(' ')[0]} at x=${rect.left.toFixed(0)}, width=${rect.width.toFixed(0)}`);
      console.warn(`❌ Overflow: ${el.tagName}`, el);
    }
  });
  
  if (results.length === 0) {
    console.log(`✅ All elements within bounds`);
  } else {
    console.table(results);
  }
})();
```

## Responsive Test Widths

Test these widths to ensure full viewport coverage:
- 320px (small mobile)
- 360px (iPhone SE)
- 393px (iPhone 16)
- 430px (iPhone 16 Plus)
- 768px (tablet portrait)
- 1024px (tablet landscape)
- 1280px (desktop)
- 1440px (desktop wide)
- 1920px (full HD)

All sections must render with equal px-4 padding and no horizontal scrollbar.

## Typing Effect Validation

Check the typing effect at `/`:
1. Copy roles array from console: `window.__ROLES_EN` and `window.__ROLES_ID`
2. Verify no role is empty, truncated, or corrupted
3. Test locale switch (EN ↔ ID) and verify typing resets
4. Enable prefers-reduced-motion: should show first role static
5. Timings: type 100ms, delete 45ms, hold 1900ms, gap 400ms

## Stage Card Header

Verify at mobile (393px) and desktop (1920px):
1. "STAGE VIRTUOSO EDITION" may wrap to 2 lines on mobile
2. "PRINCIPAL MAESTRO" badge stays inside card border (no overflow)
3. Header uses `flex items-start justify-between gap-3`
4. Badge has `shrink-0 whitespace-nowrap` (no clipping)

## Navbar CTA

1. At 1280px+: "Get in Touch" fully visible (no clipping)
2. Label changed from "Explore Productions"
3. Navbar items fit inside pill without reduction in gap/tracking
4. Mobile menu (hamburger) works correctly

## About Section Stats

1. Stats animate count-up on scroll (if prefers-reduced-motion is not set)
2. All 4 stat cards visible at 393px (2 columns)
3. Arch SVG scales responsively (w-full h-auto max-w-full)
4. Principles cards render without overflow
