# Design

Recorded from the built website. Source of truth for tokens: `src/styles/global.css`.

## Color
Sampled from the logo.

| Role | Light | Dark |
|---|---|---|
| Ground | `#f5f6fd` | `#09071f` |
| Surface | `#ffffff` | `#121036` |
| Heading | `#140c63` | `#ffffff` |
| Body / muted | `#14123a` / `#4b4a6b` | `#e7e6f7` / `#b3b1d4` |
| Panel / field | `#140c63` / `#1c118a` | `#171150` / `#140c63` |
| Link | `#2b1fb0` | `#5ff0e3` |

Signal teal `#1be6d6` is used on indigo, or as a fill with dark indigo text. For teal text on light grounds use `#056458`. Check statuses: passed teal, failed `#ffb4b8`, unavailable `#ffd68a`, skipped `#c9c6f2`; every status also has an icon and a word.

Theme follows the system preference.

## Type
Manrope Variable, self-hosted. Headings 800 with tracking between -0.025em and -0.035em; body 400 to 600. Monospace only for commands and code.

## Shape and components
- Pill buttons, status chips and graph nodes; large radii (1rem to 1.5rem) on panels. The capsule comes from the logo's speed lines.
- Lists and rows separated by hairlines instead of card grids.
- Icons: Lucide, default stroke (1.75 for large icons).
- Indigo fields own whole sections (check report, task graph, footer).

## Motion
One authored moment: check report rows slide in like the logo's speed lines. Disabled under reduced motion.

## Logo
The logo always sits directly on the page with a transparent background, in light and dark (project owner's choice). Never put it on a tile. The apple touch icon is the one exception: it keeps an opaque white background for phone home screens.

## Voice
Planned behavior is always labelled as planned. No performance claims, testimonials or install instructions.
