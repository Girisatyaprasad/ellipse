---
name: Obsidian & Slate
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
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
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
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is built for high-performance productivity and conversational intelligence. It prioritizes **Apple-level restraint** and **Linear-like clarity**, removing all superfluous decoration to focus on the content and the data. The brand personality is tactical, professional, and high-status—evoking the feeling of a refined, physical tool rather than a digital interface.

The design style is **Minimalist-Technic**. It utilizes deep obsidian surfaces, low-contrast titanium borders, and sharp typography to create a workspace that feels calm and authoritative. Every element is intentional; whitespace is used as a structural tool to group information and guide the user's focus without the need for heavy containers or aggressive shadows.

## Colors

This design system is strictly **Dark Mode First**. The palette is monochromatic and deeply saturated to minimize eye strain and maximize the impact of the content.

- **Primary Canvas:** `#090909` (Obsidian) is the foundation for all primary surfaces.
- **Structural Accents:** `#1C1C1C` (Titanium) is used for all borders, dividers, and subtle component backgrounds to define space without breaking the visual flow.
- **Typography:** Pure white (`#FFFFFF`) is reserved for headers and active states to ensure maximum legibility. Soft Slate (`#888888`) handles all secondary body text and metadata.
- **Action Accents:** Intelligent Blue (`#3b82f6`) is used surgically for AI-driven insights, primary actions, and focused states. It should never overwhelm the screen.

## Typography

The system utilizes **Inter** for all interface elements to maintain a systematic and utilitarian aesthetic. 

- **High-Contrast Hierarchy:** Use pure white for headlines and Slate for body text to create immediate visual order.
- **Vertical Rhythm:** Line heights are generous (1.5 - 1.6x) to ensure long-form conversations and task lists remain readable during high-stress workflows.
- **Labels:** Small caps with slight letter spacing are used for "Status" labels and metadata to differentiate them from actionable text.
- **Monospace:** JetBrains Mono is used for technical data, IDs, and code snippets to maintain a precise, developer-friendly feel.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid with Fixed Constraints**. Content is centered within a maximum width of 1200px on desktop to prevent eye fatigue, while sidebar and navigation elements hug the viewport edges.

- **The 4px Rule:** All spacing (padding, margins, gaps) must be a multiple of 4px.
- **Conversational Flow:** In chat interfaces, use a 24px vertical gap between message groups and a 12px gap between individual bubbles within a group.
- **Safe Areas:** Maintain a minimum 24px horizontal margin on mobile devices to ensure the "Titanium" borders don't feel cramped against the screen edge.

## Elevation & Depth

This system avoids traditional drop shadows in favor of **Tonal Layering** and **Low-Contrast Outlines**.

- **Level 0 (Background):** `#090909` - The primary canvas.
- **Level 1 (Cards/Bubbles):** `#0D0D0D` - Slightly lifted surfaces with a `1px` solid `#1C1C1C` border.
- **Level 2 (Popovers/Modals):** `#141414` - Elevated surfaces used for temporary UI. These may use a very subtle, 20% opacity black shadow to provide a hint of separation from Level 1.
- **Tactile Feel:** Interactive elements (buttons, inputs) use a subtle interior gradient or a slightly brighter border (`#2A2A2A`) on hover to simulate physical response.

## Shapes

The shape language is **Soft-Industrial**. We avoid hyper-rounded "pill" shapes for primary containers to maintain a serious, high-status aesthetic.

- **Primary Components:** 4px (`rounded-sm`) for buttons, inputs, and small cards.
- **Message Bubbles:** 8px (`rounded-md`) to provide a slightly softer feel for conversational content.
- **Inner Elements:** Nested elements should have a radius 2px smaller than their parent to maintain visual nesting harmony.

## Components

### Message Bubbles
Messages should not have aggressive backgrounds. User messages utilize a subtle Titanium border (`#1C1C1C`) with white text. AI or System messages should be borderless with a very slight surface tint (`#0D0D0D`) and the Intelligent Blue accent used only for the AI icon or specific insights.

### Task & Decision Cards
These are "physical artifacts." They must feature a clear header, a status label in the top-right (using `label-md` typography), and a clear separator line (`1px` solid `#1C1C1C`). Actions within cards are always right-aligned.

### Buttons
- **Primary:** White background, black text. No border.
- **Secondary:** Transparent background, Titanium border, white text.
- **Ghost:** Transparent background, slate text. No border.

### Input Fields
Inputs are minimal. A bottom border only (`1px` solid `#1C1C1C`) is preferred for chat inputs, while form inputs use a full 4px rounded frame. The focus state is signaled by the border changing to Intelligent Blue.

### Status Indicators
Replace all "Reality State" or "Syncing" jargon with:
- **Active:** A solid 6px blue dot.
- **Pending:** A 6px slate ring.
- **Paused:** A 6px slate square.