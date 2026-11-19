# Graph Report - arcade  (2026-11-19)

## Corpus Check
- 34 files · ~22,607 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 262 nodes · 544 edges · 9 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `189fe2a3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- ProjectPreview.tsx
- TetrisEngine
- icons.tsx
- compilerOptions
- portfolio.ts
- layout.tsx
- ProjectsSection.tsx
- AgenticTetris.tsx

## God Nodes (most connected - your core abstractions)
1. `AgenticTetris()` - 27 edges
2. `TetrisEngine` - 25 edges
3. `ArrowUpRight()` - 18 edges
4. `compilerOptions` - 16 edges
5. `absoluteCells()` - 12 edges
6. `Tag()` - 12 edges
7. `react` - 12 edges
8. `SectionShell()` - 11 edges
9. `cellsCollide()` - 10 edges
10. `Home()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `AgenticTetris()` --calls--> `absoluteCells()`  [EXTRACTED]
  src/components/contact/AgenticTetris.tsx → src/lib/tetris/engine.ts
- `AgenticTetris()` --calls--> `TetrisEngine`  [EXTRACTED]
  src/components/contact/AgenticTetris.tsx → src/lib/tetris/engine.ts
- `ContactSection()` --calls--> `AgenticTetris()`  [EXTRACTED]
  src/components/sections/ContactSection.tsx → src/components/contact/AgenticTetris.tsx
- `FlagshipCard()` --calls--> `ProjectPreview()`  [EXTRACTED]
  src/components/sections/ProjectsSection.tsx → src/components/projects/ProjectPreview.tsx
- `landingRow()` --calls--> `cellsCollide()`  [EXTRACTED]
  src/lib/tetris/agent.ts → src/lib/tetris/engine.ts

## Import Cycles
- None detected.

## Communities (9 total, 0 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.08
Nodes (33): eslintConfig, dependencies, framer-motion@^14.9.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, devDependencies, eslint@^9 (+25 more)

### Community 1 - "ProjectPreview.tsx"
Cohesion: 0.43
Nodes (6): BARS, PlannerPreview(), PlatformPreview(), PreviewKind, ProjectPreview(), TransformerPreview()

### Community 2 - "TetrisEngine"
Cohesion: 0.18
Nodes (4): absoluteCells(), cellsCollide(), gravityInterval(), TetrisEngine

### Community 3 - "icons.tsx"
Cohesion: 0.08
Nodes (36): nextConfig, next, react, DisabledAction(), metadata, PendingViewer(), ResumePage(), CARD_H (+28 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "portfolio.ts"
Cohesion: 0.10
Nodes (22): EASE, ExperienceCard(), HorizontalExperienceTimeline(), REST, TimelineNode(), WIND, StatusPill(), BEYOND_TECH (+14 more)

### Community 6 - "layout.tsx"
Cohesion: 0.24
Nodes (7): instrumentSerif, jakartaSans, jetbrainsMono, metadata, RootLayout(), viewport, CustomCursor()

### Community 8 - "ProjectsSection.tsx"
Cohesion: 0.17
Nodes (23): Home(), FOOTER_NAV, SiteFooter(), BeyondTechSection(), DetailModal(), CertificationsSection(), ContactSection(), EducationSection() (+15 more)

### Community 9 - "AgenticTetris.tsx"
Cohesion: 0.06
Nodes (55): AgenticTetris(), CabinetButton(), Callout, Chamber(), Controls, drawBlock(), drawGhost(), drawGrid() (+47 more)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `icons.tsx` to `package.json`, `portfolio.ts`, `layout.tsx`, `ProjectsSection.tsx`, `AgenticTetris.tsx`?**
  _High betweenness centrality (0.358) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `AgenticTetris()` (e.g. with `.drainEvents()` and `.ghostCells()`) actually correct?**
  _`AgenticTetris()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07563025210084033 - nodes in this community are weakly interconnected._
- **Why does `TetrisEngine` connect `TetrisEngine` to `AgenticTetris.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `icons.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Why does `AgenticTetris()` connect `AgenticTetris.tsx` to `ProjectsSection.tsx`, `TetrisEngine`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._