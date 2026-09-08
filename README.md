# jonathanbergamo

Personal portfolio built as a small desktop OS: every section is a window you can drag, resize, minimise and maximise, with a taskbar, a Start menu and a procedural 3D avatar standing on the desktop. On phones the same windows become full-screen sheets with a bottom navigation.

Live: https://jonathanbergamo.vercel.app

## Stack

Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (base-nova) · Zustand · Motion · React Three Fiber + drei · Vitest · Playwright

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3008
pnpm check        # lint + typecheck + unit tests
pnpm build        # static export to out/
pnpm test:e2e     # Playwright (builds and serves out/ on :3100)
```

## Editing content

- `src/data/profile.ts` — name, links, status, CV paths
- `src/data/experience.ts` — roles and bullets (EN + PT)
- `src/data/projects.ts` — projects: title, summary, markdown description, tags, optional links and image, period, status, featured
- `src/data/skills.ts` — grouped skills; `core: true` renders as a bold chip
- `messages/en.ts` and `messages/pt.ts` — UI copy. `pt.ts` is typed against `en.ts`, so a missing key fails `pnpm typecheck`; a unit test also checks parity.
- `public/cv/` — drop `jonathan-bergamo-cv-en.pdf` and `jonathan-bergamo-cv-pt.pdf` here

## Layout

- `src/store/window-store.ts` — window state (open/minimised/closed, rect, z-order) persisted to localStorage as `jb-windows`
- `src/components/os/` — desktop shell, windows, taskbar, Start menu, drag/resize hooks, mobile shell
- `src/components/windows/` — one component per section
- `src/components/avatar/` — the avatar: materials, mesh tree, scene, SVG fallback, capability probe
- `src/i18n/` — locale store, provider and typed `t()`

## Design rules

Five colours only: `#780000 #c1121f #fdf0d5 #003049 #669bbc`, defined once in `src/app/globals.css`. CI fails on hex literals elsewhere, except the avatar materials (skin tone is the one documented exception).
