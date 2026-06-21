---
name: Ellipse Organizational Intelligence
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c5c6cb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9195'
  outline-variant: '#44474a'
  surface-tint: '#c1c7cf'
  primary: '#ffffff'
  on-primary: '#2b3137'
  primary-container: '#dde3eb'
  on-primary-container: '#5f656c'
  inverse-primary: '#595f66'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#ffffff'
  on-tertiary: '#263143'
  tertiary-container: '#d8e3fb'
  on-tertiary-container: '#5a6579'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde3eb'
  primary-fixed-dim: '#c1c7cf'
  on-primary-fixed: '#161c22'
  on-primary-fixed-variant: '#41474e'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 80px
  gutter: 24px
  margin: 48px
---

## Brand & Style
The design system is rooted in the philosophy of **Organizational Intelligence**—a move away from "dashboards" toward systemic clarity. The aesthetic is heavily inspired by the precision of premium hardware and high-end productivity tools (Apple, Linear, Raycast). 

The personality is characterized by **Quiet Confidence**. It avoids the frantic energy of typical enterprise SaaS in favor of an infrastructural, calm environment. The interface should feel like an extension of the operating system—stable, predictable, and deeply integrated. We employ a refined **Minimalism** blended with **Glassmorphism**, using subtle translucency and light-refractive edges to define space rather than heavy shadows or saturated colors. The goal is to reduce cognitive load while providing a sense of immense structural depth.

## Colors
The palette is monochromatic and low-chroma, emphasizing texture and luminance over hue. 

- **Surfaces:** We utilize a "Deep Space" hierarchy. The primary canvas is `#0A0A0A`. Interactive or floating elements use `#121212` (Graphite) with a subtle titanium-colored stroke.
- **Accents:** The only permissible accent is a **Soft Blue-Gray** (`#94A3B8`). It is used sparingly for active states or focus indicators.
- **Tints:** Use pure white and varying opacities of white (e.g., 90%, 60%, 40%) for text to maintain a natural, high-dynamic-range feel.
- **Interactive States:** Hover states should rarely change background color; instead, they should increase the luminosity of the border or the text contrast.

## Typography
The typography system uses **Inter** for its systematic, utilitarian neutrality, paired with **Geist** for technical labels and data-heavy secondary information.

- **Scale:** Large display sizes use tight tracking and high-weight fonts to create "anchors" in the layout.
- **Contrast:** We use font weight and opacity rather than color to define hierarchy. Primary information is White (90% opacity), secondary is Slate (60%), and tertiary is Slate (40%).
- **Alignment:** Consistent left-alignment is preferred. Justified or centered text should be avoided to maintain the architectural "grid" feel.

## Layout & Spacing
This design system utilizes a **Fixed-Fluid Hybrid** grid. 

- **Philosophy:** Negative space is treated as a first-class citizen. Large "air gaps" (80px+) are used to separate major logical sections.
- **Grid:** A 12-column grid is used for desktop, but elements frequently "break" the grid to create asymmetrical interest.
- **Relationship-Oriented Design:** Instead of standard lists, use a "Node & Canvas" approach where elements are grouped by proximity and connected by subtle, low-opacity lines (0.05 opacity white) to show organizational lineage.
- **Responsive:** On mobile, margins reduce from 48px to 16px, and multi-column relationship maps collapse into vertical stacks with "Progressive Disclosure" buttons to expand detail.

## Elevation & Depth
Elevation is not conveyed through shadows, but through **Tonal Layering** and **Subtle Luster**.

- **Level 0 (Canvas):** Pure `#0A0A0A`.
- **Level 1 (Card/Section):** `#121212` with a 1px solid border of `rgba(255, 255, 255, 0.05)`.
- **Level 2 (Popovers/Modals):** `#1A1A1A` with a subtle backdrop blur (20px) to simulate frosted titanium.
- **Inner Glow:** Interactive elements use a top-weighted inner stroke (0.5px) of `rgba(255,255,255,0.1)` to mimic light catching an edge.
- **Shadows:** Only used for floating modals. Use a large, extremely soft (60px blur), low-opacity (40%) black shadow to create a physical "lift" without visual noise.

## Shapes
We use a **Soft Geometric** approach. The standard radius is 4px-8px, providing a professional, precise feel without being overly clinical or "bubbly."

- **Standard Elements:** 6px (buttons, input fields).
- **Large Containers:** 12px (cards, modals).
- **Data Points:** 2px (small nodes or status indicators).
- **Circles:** Reserved exclusively for user avatars or "System Health" indicators to make them stand out against the geometric grid.

## Components

- **Buttons:** Primarily "Ghost" or "Outline." The "Primary" button is a solid titanium-gray with white text. No gradients. Hover state is a subtle increase in border luminosity.
- **Command Bar (K-Menu):** A central component for this design system. It should be a floating, glassmorphic bar (Raycast-inspired) that acts as the primary navigational engine.
- **Relationship Nodes:** Instead of rows, use small cards with "Lead Lines" connecting them. Each node shows minimal metadata, with a "Hover to Expand" interaction (Progressive Disclosure).
- **Input Fields:** Minimalist. No background fill on idle; only a bottom border. On focus, a subtle 1px border surrounds the field with a soft blue-gray glow.
- **Chips:** Small, monochromatic, using `label-md` typography. Used for tagging "Intelligence Entities" like Projects, Teams, or Knowledge Clusters.
- **Progressive Disclosure:** Information is hidden by default. Use "Details" chevrons that rotate with a precision 200ms animation.
- **The "Ellipse" Graph:** A custom component representing organizational connections. Nodes should be connected by thin, animated paths that pulse slightly when data flows between them.