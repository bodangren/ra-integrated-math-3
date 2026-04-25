---
version: alpha
name: Business Math V2 Design System
colors:
  primary: "#2D7D46"
  secondary: "#E8F3E5"
  background: "#FDFCF5"
  foreground: "#0A1C1A"
  accent: "#C98A1A"
  destructive: "#8C2A1C"
typography:
  display:
    fontFamily: Lora
  body:
    fontFamily: DM Sans
    fontSize: 16px
    lineHeight: 1.6
  mono:
    fontFamily: Fira Code
spacing:
  base: 4px
rounded:
  base: 8px
---

# Design System

## Overview
The Business Math V2 design system, titled **"Digital Ledger,"** is inspired by traditional accounting tools and modern spreadsheet software. It balances the tactile feel of quality ledger paper with the precision of financial interfaces.

## Colors
The palette uses **OKLCH** internally for better perceptual uniformity and accessibility.

### Core Palette
- **Primary (#2D7D46):** "Excel Green" — Used for primary actions, branding, and success states.
- **Secondary (#E8F3E5):** "Light Sage" — Used for subtle backgrounds, hover states, and secondary information.
- **Background (#FDFCF5):** "Ledger White" — A warm off-white that reduces eye strain and mimics high-quality paper.
- **Foreground (#0A1C1A):** "Forest Ink" — A deep, dark green-black used for maximum readability.
- **Accent (#C98A1A):** "Warm Amber" — Used for highlights, warnings, and interactive elements that need to stand out.

### Semantic Colors
- **Destructive (#8C2A1C):** "Ledger Red" — Used for errors, negative financial values, and critical warnings.
- **Muted (#F1F4F0):** Used for secondary text and decorative elements.

## Typography
The system uses a tri-font strategy to differentiate between narrative content, data entry, and numerical results.

### Font Families
- **Display (Lora):** A sophisticated serif used for headings (H1-H6) to provide a "textbook" or "journal" feel.
- **Body (DM Sans):** A clean, modern sans-serif optimized for long-form reading and interface labels.
- **Mono (Fira Code):** Used for numerical data, financial calculations, and spreadsheet-style inputs.

### Scale
- **H1:** 2.25rem, Bold, Lora
- **H2:** 1.875rem, SemiBold, Lora
- **Body-MD:** 1rem (16px), DM Sans
- **Numerical:** 0.875rem, Fira Code

## Layout & Spacing
The system follows a strict 4px/8px grid system.

### Containers
- **Max Width:** 1280px (Standard Desktop)
- **Padding:** 1rem (mobile) to 2.5rem (desktop)

### Roundness
- **Base Radius:** 0.5rem (8px) — Used for cards and primary containers.
- **Small Radius:** 0.375rem (6px) — Used for buttons and inputs.
- **Full Radius:** 9999px — Used for badges and pills.

## Surfaces & Depth
The "Digital Ledger" aesthetic avoids heavy shadows in favor of borders and subtle textures.

### Textures
- **Ledger Paper:** Subtle horizontal lines spaced at 28px to guide the eye.
- **Accounting Grid:** A precise 20px grid for data-heavy sections.

### Cards
- **Workbook Card:** Features a 3px left accent border that animates on hover.
- **Statement Card:** Uses a thicker 2px border in primary green for highlighted financial data.

## Components

### Buttons
- **Primary:** High-contrast Green with Forest Ink text or White.
- **Secondary:** Light Sage background with Forest Ink text.

### Inputs
- **Spreadsheet Style:** Minimal borders, using the Fira Code font for data entry.

## Do's and Don'ts
- **Do** use serif headings for narrative context.
- **Do** use monospace fonts for all numerical calculations.
- **Don't** use pure black (#000000); use Forest Ink (#0A1C1A) for better visual harmony.
- **Don't** use aggressive gradients; prefer solid "ink" colors or subtle financial-themed linear gradients.
