# 🎨 Car4You - Design System & Visual Guide

## Color Palette

### Primary Colors
- **Primary Blue**: `#60a5fa` - Main interactive elements
- **Accent Purple**: `#a78bfa` - Highlights and gradients
- **Dark Background**: `#0f0f1e` - Main background
- **Dark Surface**: `#1a1a2e` - Card backgrounds

### Text Colors
- **Primary Text**: `#e5e7eb` - Main text
- **Secondary Text**: `#d1d5db` - Labels and descriptions
- **Muted Text**: `#9ca3af` - Tertiary information
- **Disabled Text**: `rgba(255,255,255,0.45)` - Disabled states

### Semantic Colors
- **Success**: `#10b981` - Confirmations
- **Error**: `#ef4444` - Errors and alerts
- **Warning**: `#f59e0b` - Warnings

---

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes
- **Heading 1**: 36px (Bold 700)
- **Heading 2**: 22px (Bold 700)
- **Heading 3**: 20px (Bold 700)
- **Body Large**: 16px (Regular 400)
- **Body Regular**: 14px (Regular 400)
- **Label**: 13px (Semibold 600)
- **Caption**: 12px (Semibold 600)
- **Tiny**: 11px (Semibold 600)

### Font Weights
- 300: Light
- 400: Regular
- 500: Medium
- 600: Semibold
- 700: Bold
- 800: Extra Bold

---

## Spacing System

Standard spacing scale:
- `4px` - Minimal spacing
- `8px` - Small gaps
- `12px` - Compact spacing
- `16px` - Standard padding
- `20px` - Medium spacing
- `24px` - Large spacing
- `32px` - Extra large
- `40px` - Page padding
- `48px` - Large sections

---

## Border Radius

- **Tiny**: `6px` - Small elements
- **Small**: `8px` - Buttons, small cards
- **Medium**: `10px` - Input fields
- **Large**: `12px` - Cards
- **XL**: `16px` - Large containers
- **Full**: `50%` - Circular elements

---

## Shadows

### Shadow Levels
```css
/* Elevation 1 (Subtle) */
box-shadow: 0 4px 12px rgba(0,0,0,0.2);

/* Elevation 2 (Normal) */
box-shadow: 0 10px 40px rgba(0,0,0,0.3);

/* Elevation 3 (Strong) */
box-shadow: 0 20px 60px rgba(0,0,0,0.3);

/* Focus State */
box-shadow: 0 0 0 3px rgba(96,165,250,0.1);
```

---

## Components Styling

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
padding: 12px 24px;
border-radius: 10px;
color: white;
font-weight: 600;
box-shadow: 0 8px 24px rgba(96, 165, 250, 0.3);
```

#### Secondary Button
```css
border: 1px solid rgba(255,255,255,0.1);
background: transparent;
color: white;
padding: 12px 20px;
border-radius: 10px;
```

### Input Fields
```css
border: 1px solid rgba(255,255,255,0.1);
background: rgba(0,0,0,0.2);
padding: 12px 14px;
border-radius: 10px;
color: #e5e7eb;
transition: all 0.2s ease;
```

### Cards
```css
background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
border: 1px solid rgba(255,255,255,0.1);
border-radius: 16px;
backdrop-filter: blur(10px);
box-shadow: 0 20px 60px rgba(0,0,0,0.3);
```

---

## Animations & Transitions

### Standard Transitions
```css
transition: all 0.2s ease;  /* Quick interactions */
transition: all 0.3s ease;  /* Standard animations */
transition: all 0.4s ease;  /* Slower, more noticeable */
```

### Common Animation Curves
- **ease**: Standard easing
- **cubic-bezier(0.4, 0, 0.2, 1)**: Material Design easing
- **ease-out**: Fast start, slow end
- **ease-in**: Slow start, fast end

### Hover Effects
1. **Lift**: `transform: translateY(-2px) to -8px`
2. **Scale**: `transform: scale(1.05)`
3. **Brightness**: `filter: brightness(1.1)`
4. **Glow**: Enhanced `box-shadow`

---

## Glassmorphism Effect

```css
background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
border: 1px solid rgba(255,255,255,0.1);
backdrop-filter: blur(10px);
```

---

## Responsive Breakpoints

```css
/* Desktop (default) */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
```

### Layout Adjustments
- **Desktop**: Multi-column grids, sidebars
- **Tablet**: 2-column layouts, adjusted spacing
- **Mobile**: Single column, optimized spacing

---

## Accessibility Features

✅ High contrast text (WCAG AA compliant)
✅ Focus indicators on interactive elements
✅ Readable font sizes (min 14px)
✅ Proper label associations
✅ Keyboard navigation support
✅ Error messages clear and associated

---

## Best Practices

1. **Consistency**: Use defined spacing and colors
2. **Clarity**: Clear visual hierarchy
3. **Feedback**: Instant visual feedback on interactions
4. **Performance**: GPU-accelerated animations
5. **Accessibility**: Inclusive design for all users

---

## Implementation Tips

### When adding new components:
1. Use the defined color palette
2. Follow spacing system (multiples of 4px)
3. Apply consistent border radius
4. Add appropriate shadows
5. Include smooth transitions
6. Test on mobile devices
7. Verify color contrast ratios

---

## Customization Guide

To change the primary color throughout the app:

1. Find and replace `#60a5fa` with your color
2. Find and replace `#a78bfa` with accent color
3. Update CSS variables in root if needed
4. Test all interactive states (hover, focus, active)

---

**Your Car4You design system is complete and ready for scaling!** 🚗✨
