# Design

Recorded from the built website. Source of truth for tokens: `src/styles/global.css`.

## Color
Light only (project owner's choice: a lighter site). Grown from the logo and written in OKLCH.

| Token | Role |
|---|---|
| `ground`, `surface` | Page and raised areas: near-white with a faint violet tint, and white |
| `lilac`, `lilac-deep` | Section fill, footer, selected navigation, soft borders |
| `heading`, `ink`, `muted` | Deep indigo headings, body text, secondary text |
| `brand`, `brand-strong` | Primary actions, links, focus; hover |
| `signal`, `signal-ink`, `mint` | Teal for markers and selection; dark teal for teal text and lines |
| `pass`, `fail`, `warn`, `skip`, `sky` (+ `-ink`) | Soft fill with matching dark text for statuses and command areas |

Every status also has an icon and a word. Area chips always carry their name. Soft radial washes (`wash`) sit behind the opening and closing sections only.

## Type
Manrope Variable, self-hosted. Headings 800 with tracking between -0.025em and -0.035em; body 400 to 600. Monospace only for commands and code.

## Shape and components
- Pill buttons, status chips and graph nodes; large radii (1rem to 1.5rem) on panels. The capsule comes from the logo's speed lines.
- Lists and rows separated by hairlines instead of card grids.
- Icons: Lucide, default stroke (1.75 for large icons).
- Pale fills separate sections; no dark blocks.

## Motion
One authored moment: check report rows slide in like the logo's speed lines. Disabled under reduced motion.

## Logo
The logo sits directly on the page with a transparent background. The apple touch icon is the one exception and keeps an opaque white background.

## Voice
Planned behavior is always labelled as planned. No performance claims, testimonials or install instructions.
