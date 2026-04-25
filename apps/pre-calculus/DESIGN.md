# Design System — AP Precalculus

> Inspired by Linear: dark-mode-native, ultra-minimal, indigo primary with sky-blue accent.

## 1. Visual Theme & Atmosphere

Dark-mode-native canvas where content emerges from darkness. Precision-engineered hierarchy through luminance gradations — from barely-visible borders to luminous text. The system uses Inter Variable with OpenType features `"cv01"` and `"ss03"` for a cleaner, more geometric character.

**Key Characteristics:**
- Dark-mode-native: `#080a0f` canvas, `#141820` panels, `#1e2330` elevated surfaces
- Inter Variable with `"cv01", "ss03"` globally — geometric alternates
- Signature weight 510 (between regular and medium) for UI text
- Aggressive negative letter-spacing at display sizes (-2px at 68px)
- Indigo primary (`#5e6ad2`) for CTAs, sky-blue accent (`#38bdf8`) for interactive elements
- Semi-transparent white borders throughout
- Multi-layer shadows with inset variants for depth

## 2. Color Palette & Roles

### Background Surfaces
- **Canvas** (`#080a0f`): Page background — near-black with blue-cool undertone
- **Panel** (`#141820`): Sidebar and panel backgrounds
- **Surface** (`#1e2330`): Elevated surfaces, card backgrounds, dropdowns
- **Surface Light** (`#2a3040`): Hover states, slightly elevated components

### Text & Content
- **Primary Text** (`#f1f5f9`): Near-white — default text color
- **Secondary Text** (`#cbd5e1`): Cool silver-gray for body text
- **Muted Text** (`#94a3b8`): Placeholders, metadata, de-emphasized content

### Brand & Accent
- **Primary Indigo** (`#5e6ad2`): CTA button backgrounds, brand marks
- **Primary Hover** (`#4f5bc0`): Darker variant for hover states
- **Sky Accent** (`#38bdf8`): Links, active states, selected items, labels
- **Sky Light** (`#7dd3fc`): Lighter variant for hover states on accent elements

### Status Colors
- **Success** (`#22c55e`): Active/completion indicators
- **Warning** (`#f59e0b`): Attention states
- **Error** (`#ef4444`): Destructive actions

### Border & Divider
- **Border** (`rgba(255,255,255,0.10)`): Standard semi-transparent border
- **Border Strong** (`rgba(255,255,255,0.18)`): Prominent separations

## 3. Typography Rules

### Font Family
- **Primary**: `Inter Variable`, fallbacks: `SF Pro Display, -apple-system, system-ui, sans-serif`
- **Monospace**: `Fira Code`, fallbacks: `ui-monospace, SF Mono, Menlo`
- **OpenType Features**: `"cv01", "ss03"` enabled globally

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display | 68px | 510 | 1.05 | -2px |
| Section | 44px | 510 | 1.10 | -1.5px |
| Heading | 32px | 510 | 1.20 | -0.5px |
| Body Large | 18px | 400 | 1.60 | normal |
| Body | 16px | 400 | 1.50 | normal |
| Caption | 13px | 510 | 1.50 | normal |
| Label | 12px | 510 | 1.40 | normal |

### Principles
- **510 is the signature weight**: Between regular and medium for subtle emphasis
- **Compression at scale**: Display sizes use progressively tighter letter-spacing
- **Three-tier weight system**: 400 (reading), 510 (emphasis/UI), 590 (strong emphasis)

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#5e6ad2`
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 6px
- Font: 16px weight 510
- Hover: `#4f5bc0` with translateY(-1px)

**Secondary**
- Background: `#1e2330`
- Text: `#f8fafc`
- Padding: 12px 24px
- Radius: 6px
- Border: `1px solid rgba(255,255,255,0.18)`
- Hover: `#2a3040` with border-color `#38bdf8`

### Cards & Containers
- Background: `#1e2330`
- Border: `1px solid rgba(255,255,255,0.18)`
- Radius: 8px
- Hover: translateY(-3px) with shadow

### Inputs & Forms
- Background: `#1e2330`
- Border: `1px solid rgba(255,255,255,0.10)`
- Radius: 6px
- Padding: 12px 14px
- Focus: border-color `#38bdf8` with ring shadow

### Navigation
- Dark sticky header on `#141820` background
- Links: 13px weight 510, `#cbd5e1` text
- Active/hover: text lightens to `#f1f5f9`
- CTA: Indigo button

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px

### Grid & Container
- Max content width: 1200px
- Hero: centered single-column with generous padding
- Feature sections: 2-3 column grids

### Border Radius Scale
- Micro (2px): Inline badges, toolbar buttons
- Standard (4px): Small containers, list items
- Comfortable (6px): Buttons, inputs
- Card (8px): Cards, dropdowns
- Panel (12px): Panels, featured cards
- Full Pill (9999px): Chips, filter pills

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Page background |
| Surface | `#1e2330` bg + border | Cards, inputs |
| Elevated | Multi-layer shadow | Floating elements |
| Focus | Ring shadow | Keyboard focus |

## 7. Do's and Don'ts

### Do
- Use Inter Variable with `"cv01", "ss03"` on ALL text
- Use weight 510 as default emphasis weight
- Apply negative letter-spacing at display sizes
- Build on near-black backgrounds
- Use semi-transparent white borders
- Reserve indigo for CTAs, sky-blue for interactive accents

### Don't
- Don't use pure white (`#ffffff`) as primary text
- Don't use weight 700 (bold) — max is 590
- Don't introduce warm colors into the UI chrome
- Don't use positive letter-spacing on display text

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, reduced heading sizes |
| Tablet | 640-1024px | 2-column grids |
| Desktop | 1024-1280px | Full layout, 3-column grids |
| Large | >1280px | Centered, generous margins |

### Collapsing Strategy
- Display: 68px → 40px on mobile
- Navigation: horizontal → hamburger at 768px
- Feature cards: 3 → 2 → 1 column
