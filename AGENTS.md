# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-18
**Commit:** d9959c3
**VCS:** jj (Jujutsu) with git colocated

## OVERVIEW

Personal website with vim-inspired UI. SvelteKit 2 + Svelte 5 + TypeScript + TailwindCSS.

## STRUCTURE

```
src/
├── routes/
│   ├── +page.svelte         # Home (renders MainMenu)
│   ├── +layout.svelte       # Root layout
│   ├── talks/+page.svelte   # Talks page
│   ├── mode.svelte.ts       # Vim mode state (NORMAL/INSERT/VISUAL)
│   └── *.svelte             # UI components (non-standard location)
└── lib/
    └── index.ts             # Empty barrel
```

## WHERE TO LOOK

| Task            | Location                                                         |
| --------------- | ---------------------------------------------------------------- |
| Add new page    | `src/routes/{name}/+page.svelte`                                 |
| Add component   | `src/routes/*.svelte` (current pattern) or `src/lib/` (standard) |
| Vim mode colors | `src/routes/mode.svelte.ts`                                      |
| Theme config    | `tailwind.config.js` (Catppuccin)                                |
| Fonts           | `tailwind.config.js` (JetBrains Mono)                            |

## CONVENTIONS

### Code Style

- **Tabs** (not spaces)
- **Single quotes**
- **No trailing commas**
- Print width: 100

### Vim Mode System

State in `mode.svelte.ts` using Svelte 5 runes (`$state`). Colors via CSS var `--mode-color`:

- NORMAL: `--ctp-blue`
- INSERT: `--ctp-green`
- VISUAL: `--ctp-mauve`

### Theme

Catppuccin Macchiato. Classes prefixed `ctp-*` (e.g., `text-ctp-blue`).

### Adapter

Dual adapter: Bun (dev) / Vercel (prod). Switched via `NODE_ENV` in `svelte.config.js`.

## ANTI-PATTERNS (THIS PROJECT)

- **Components in routes/** - Current pattern places components in `src/routes/` instead of `src/lib/`. Follow existing pattern unless refactoring.
- **@ts-expect-error** - Used in `mode.svelte.ts` for DOM style manipulation. Known tech debt.

## VCS

Uses **jj (Jujutsu)**, NOT git directly. Git colocated as backend.

```bash
jj status          # not git status
jj log             # not git log
jj new             # create new change
jj describe        # set commit message
jj bookmark set    # like git branch
```

## COMMANDS

```bash
bun run dev        # Start dev server (Bun adapter)
bun run build      # Production build (Vercel adapter)
bun run check      # Type check + svelte-check
bun run lint       # Prettier check
bun run format     # Prettier write
```

## NOTES

- No tests exist (vitest configured but unused)
- No CI pipeline - relies on Vercel auto-deploy
- `src/lib/index.ts` is empty; shared code currently in `src/routes/`
