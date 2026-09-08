# jonathanbergamo

Personal portfolio built as a small desktop OS: every section is a window you can drag, resize, minimise and maximise, with a taskbar, a Start menu, floating widgets and a 3D avatar (Ready Player Me model, Mixamo wave) standing on the desktop. On phones the same windows become full-screen sheets with a bottom navigation.

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
- `src/components/avatar/` — the avatar: GLB model in `public/models`, wave clip in `public/animations`, scene, SVG fallback, capability probe
- `src/components/widgets/` — floating desktop widgets (clocks, weather, status, GitHub)
- `src/data/photos.ts` + `public/photos/` — photography grid pulled from Instagram
- `src/data/music.ts` + `src/data/playlist.json` — the music widget's YouTube playlist; run `pnpm music:sync` after changing the id to refresh titles and tempos (BPM from Deezer; fill in missing ones by hand and they survive later syncs). The avatar's dance speed follows the current track's BPM
- `src/i18n/` — locale store, provider and typed `t()`

## Design rules

Every palette is five roles (ink, mid, paper, accent, deep) defined in `src/app/globals.css` and listed in `src/data/palettes.ts`. Components only use the semantic tokens, so CI fails on hex literals anywhere else.
