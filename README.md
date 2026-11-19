# Manvitha Yalamanchili — Portfolio

An editorial portfolio for an agentic-AI and software engineer, built as a single-page Next.js App Router site with a dedicated résumé route. It pairs a serif/sans editorial layout with tactile, theme-aware detail work: a hanging ID badge in the hero, scroll-stacking project cards, and a working Agentic Tetris engine rendered on an HTML5 canvas.

Light and dark themes follow the operating system until the visitor picks a theme in the navbar, after which their choice is remembered.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `cacheComponents`) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` |
| Motion | Framer Motion (`MotionConfig reducedMotion="user"`) |
| Type | Instrument Serif, Plus Jakarta Sans, JetBrains Mono via `next/font` |
| Game | Hand-written SRS Tetris engine + heuristic agent, no game library |

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev      # development server
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # ESLint over the project
npx tsc --noEmit # standalone type check
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, pre-paint theme script, cursor
│   ├── page.tsx            # single-page flow + footer
│   ├── globals.css         # design tokens, dark theme, buttons, motion utilities
│   └── resume/page.tsx     # dedicated résumé viewer
├── components/
│   ├── contact/            # AgenticTetris — canvas engine + card UI
│   ├── hero/               # HangingIdCard — credential, lanyard, drag physics
│   ├── layout/             # NavBar, CommandPalette, SiteFooter
│   ├── projects/           # ProjectPreview — generated, theme-aware mock UI
│   ├── sections/           # one component per page section + shared primitives
│   └── ui/                 # icon set, ThemeToggle, CustomCursor
├── data/                   # all copy and content (typed, no markup)
├── lib/tetris/             # engine.ts (SRS rules) and agent.ts (heuristic)
└── types/portfolio.ts      # shared content types
```

## Features

- **Hero** — a 320×460 hanging ID credential with a woven lanyard, brushed-metal clasp, spring drop, 3D tilt, cursor-tracked glare, and drag physics.
- **Projects** — the three flagship builds as full-width horizontal cards that stack with `position: sticky` and scale to 0.96 as the next one covers them, each with a generated theme-aware preview. The remaining repositories sit below as a compact list with a `View All Projects →` link.
- **Experience** — staggered timeline cards that size to their content, with per-role detail expansion.
- **Supporting sections** — education, certifications, and a Beyond Tech editorial feature.
- **Contact** — a full-width `Contact Me` action that opens a pre-filled email draft, with a live Agentic Tetris console stacked underneath it.
- **Résumé** — `/resume` renders an embedded PDF viewer with `Open in New Tab ↗` and `Download PDF ↓` actions.
- **Command palette** — `Ctrl/⌘ K` jumps to sections, projects, and links.
- **Accessibility** — semantic landmarks, visible focus rings, labelled canvas and controls, arrow-key play scoped to the game card only, and reduced-motion support throughout.

## Theming

`src/app/layout.tsx` runs a blocking pre-paint script that applies `prefers-color-scheme` when no choice is stored, and listens for OS changes until the visitor toggles. `ThemeToggle` writes `localStorage.theme` and sets `data-theme` on `<html>`.

Every colour is a CSS variable in `src/app/globals.css`:

- Tailwind tokens (`--color-canvas`, `--color-surface`, `--color-primary`, `--color-steel-blue`, …) are redefined under `html[data-theme="dark"]`, so the whole site flips without per-component dark variants.
- Semantic aliases (`--bg-surface`, `--bg-surface-subtle`, `--border-subtle`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent-primary`) are available to components that prefer role-based names.
- The Tetris engine adds `--tetris-*` and `--piece-*` tokens; its canvas reads them with `getComputedStyle` and repaints on a `MutationObserver` watching `data-theme`.

## The Agentic Tetris engine

`src/lib/tetris/engine.ts` implements board state, SRS rotation, wall kicks, collision, line clears, scoring, and piece queue. `src/lib/tetris/agent.ts` enumerates every reachable `(rotation, column)` placement, simulates the drop and line clear, and scores the result with a Dellacherie-style heuristic (lines, aggregate height, holes, bumpiness).

The card (`src/components/contact/AgenticTetris.tsx`) boots only when 35% of it enters the viewport and pauses off-screen. It is laid out as an 820px two-column arcade console — the playable stage on the left, HUD, control pad and telemetry drawer on the right — and offers two modes:

- **AI Auto-Play** — the agent picks and executes placements; a pulsing callout invites visitors to take over. Telemetry collapses into one compact card (evaluated states, decision time, eval score) with a `View Heuristic Math ▾` accordion for the four weighted features.
- **Play Yourself** — arrow keys, space, or the tactile control pad drive the game (pressing any pad control mid-demo switches to human play and applies that move). Line clears shake the board and float the score; best human score and the AI's benchmark persist in `localStorage`, and a game over parks the board with `Play Again` / `Let AI Demo` instead of silently restarting. Keyboard capture is scoped to the focused card and only in this mode, so page scrolling is never hijacked.

## Content & links

All copy lives in `src/data/*.ts` and is typed by `src/types/portfolio.ts`; components never hard-code content. Content that is not yet confirmed is modelled honestly rather than invented:

- `SOCIAL_LINKS` holds email, GitHub, LinkedIn, and LeetCode URLs.
- `PROJECTS` holds each repository's summary, problem, solution, highlights, and stack. Add `preview: "platform" | "transformer" | "planner"` to a project to render its card preview.
- The contact button builds a `mailto:` draft from `SOCIAL_LINKS.email`.

### Enabling the résumé PDF

The résumé page ships in a pending state because no PDF is committed:

1. Drop the file in `public/` (for example `public/resume/manvitha-yalamanchili.pdf`).
2. Set `href` and `windowTitle` in `RESUME_SHORTCUT` in `src/data/site.ts`.

The viewer, `Open in New Tab ↗`, and `Download PDF ↓` all activate from that single value.

## Deployment

The app is fully static apart from fonts and deploys as-is to Vercel (or any Node host that can run `next build` and `next start`). No environment variables are required.

## Notes

- `graphify-out/` holds a generated knowledge graph of this codebase; `graphify update .` refreshes it after code changes.
- `next-env.d.ts`, build output, dependencies, caches, and env files are ignored — see `.gitignore`.
