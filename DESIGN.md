# Design System: 🇫🇷 Voyage en France 2026

## 1. Visual Theme & Atmosphere
A restrained, editorial luxury travel companion tailored for high-intensity in-transit mobile execution. The visual tone is inspired by mid-century French cartography, archival typography, and contemporary Swiss editorial interfaces. The atmosphere balances crisp tactile density with serene spatial clarity — confident, purposeful, and free of generic AI design clichés.

- **Density:** 7/10 (High-efficiency informational density for travel transit)
- **Variance:** 6/10 (Asymmetric keynotes, fluid date carousels, tactile boarding pass vault)
- **Motion:** 6/10 (Weighty spring physics: stiffness 120, damping 20; hardware-accelerated transforms only)

---

## 2. Color Palette & Roles

- **Canvas Noir** (`#080c14`) — Primary backdrop, ultra-deep navy tone avoiding pure pitch black.
- **Card Surface** (`#111827`) — Primary container and interactive tile base (90% opacity with backdrop blur).
- **Elevated Surface** (`#1f293d`) — Hover and focus states with tactile lift.
- **Whisper Border** (`rgba(255, 255, 255, 0.07)`) — 1px subtle structural separation lines.
- **Archival Ochre / Amber Accent** (`#d97706`) — Singular primary accent for active states, key passcodes, and crucial actions.
- **Ochre Muted** (`rgba(217, 119, 6, 0.15)`) — Background tint for active badges and copy chips.
- **Paris Slate** (`#f1f5f9`) — Primary headline and high-contrast typography.
- **Muted Platinum** (`#94a3b8`) — Secondary text, body descriptions, and timeline notes.
- **Carbon Dim** (`#64748b`) — Metadata, timestamps, and utility captions.

---

## 3. Typography Architecture

- **Editorial Headings:** `Noto Serif TC`, serif (Font weight: 700) — Dignified, timeless French editorial tone.
- **Body & Interface:** `Outfit`, -apple-system, sans-serif (Font weight: 400, 500, 600) — Geometric, modern legibility.
- **Precision Data & Codes:** `ui-monospace`, `SFMono-Regular`, `Menlo`, monospace — Strict 1:1 monospace alignment for barrier access codes (645504, 6060), booking references, and departure times.

---

## 4. Component Stylings & Behaviors

### Primary Keynote Capsule (Today's Focus)
- Elevated 16px radius container with an Ochre hairline border (`1px solid rgba(217, 119, 6, 0.3)`).
- Asymmetric layout featuring the date, current geographic vector, highlight passcodes, and direct tactile action buttons.

### Date Carousel (Horizontal Scroll)
- Smooth snap-aligned date pills with 12px padding.
- Active state transitions with a crisp ochre indicator, subtle scale feedback, and center alignment.

### Timeline Cards
- Left vertical structural guide with precision timing indicators.
- Actionable chips for navigation, status verification, and instant clipboard copy.

### Pass Vault (Wallet Aesthetic)
- Tactile boarding pass card styling with perforated divider lines, dashed borders, and clear reference tags.

---

## 5. Anti-Patterns (Banned)
- ❌ No generic neon purple/cyan AI glow gradients.
- ❌ No pure pitch black (`#000000`).
- ❌ No cheesy emoji overuse as structural headings.
- ❌ No centered hero text banners with meaningless marketing slogans.
- ❌ No floating elements with vague elevation.
- ❌ No horizontal overflow on mobile viewports (< 768px).
