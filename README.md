# Monorepo

> A pnpm monorepo with shared UI, Tailwind v4 everywhere, and clean TypeScript configs.

## Quick Start

```bash
pnpm install
pnpm dev
```

| App | URL | Framework |
|-----|-----|-----------|
| web | http://localhost:3000 | Next.js 15 |
| docs | http://localhost:3001 | Next.js 15 |
| cdn | http://localhost:3002 | Vite 6 |

---

## Architecture

```
monorepo/
├── apps/
│   ├── cdn/                # Vite — static site
│   ├── docs/               # Next.js — documentation
│   └── web/                # Next.js — main application
├── packages/
│   ├── eslint-config/      # Shared ESLint flat configs
│   ├── typescript-config/  # Shared TypeScript configs
│   └── ui/                 # Shared React components + Tailwind theme
├── package.json            # Hoisted dev dependencies
├── pnpm-workspace.yaml     # Workspace definition + version catalog
└── turbo.json              # Task orchestration
```

---

## Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Package Manager | pnpm (workspaces + catalog) | 9.15 |
| Build Orchestration | Turborepo | 2.3 |
| Framework (web, docs) | Next.js | 15.1 |
| Framework (cdn) | Vite | 6.0 |
| UI Library | React | 19 |
| Styling | Tailwind CSS | 4.0 |
| Language | TypeScript | 5.7 |
| Linting | ESLint (flat config) | 9.17 |

---

# React

All three apps are React 19 applications with different build tools:

| App | Framework | React | Build Tool | JSX Transform |
|-----|-----------|-------|------------|---------------|
| `apps/cdn` | React SPA | 19 | Vite | `react-jsx` |
| `apps/docs` | Next.js 15 | 19 | Webpack/Turbopack | `preserve` |
| `apps/web` | Next.js 15 | 19 | Webpack/Turbopack | `preserve` |

### Vite App (`apps/cdn`)

```ts
// vite.config.ts
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

- `@vitejs/plugin-react` handles JSX transformation
- TypeScript config: `"jsx": "react-jsx"`

### Next.js Apps (`apps/web`, `apps/docs`)

- Next.js handles React automatically
- TypeScript config: `"jsx": "preserve"` (Next.js transforms it)
- Requires `transpilePackages: ["@repo/ui"]` to compile workspace packages

---

# TypeScript Configuration

## Inheritance Chain

```
packages/typescript-config/
├── base.json               ← Foundation for all configs
├── nextjs.json             ← Extends base + Next.js settings
├── vite.json               ← Extends base + Vite settings
└── react-library.json      ← Extends base + library settings
```

### Visual Inheritance

```
base.json
    │
    ├── nextjs.json
    │       ├── apps/web/tsconfig.json
    │       └── apps/docs/tsconfig.json
    │
    ├── vite.json
    │       └── apps/cdn/tsconfig.json
    │
    └── react-library.json
            └── packages/ui/tsconfig.json
```

## Base Config

`packages/typescript-config/base.json` — shared foundation:

```json
{
  "compilerOptions": {
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "declaration": true,
    "declarationMap": true,
    "incremental": true,
    "verbatimModuleSyntax": true
  },
  "exclude": ["node_modules", "dist", ".next", ".turbo"]
}
```

### Key Settings Explained

| Setting | Value | Rationale |
|---------|-------|-----------|
| `moduleResolution` | `bundler` | Modern resolution for Vite/Next.js bundlers |
| `verbatimModuleSyntax` | `true` | Explicit `import type` required — cleaner code |
| `isolatedModules` | `true` | Required for esbuild/swc transpilation |
| `noEmit` | `true` | Bundlers handle emit, tsc only type-checks |
| `skipLibCheck` | `true` | Faster builds, skip checking `node_modules` |
| `incremental` | `true` | Faster subsequent builds |

## Framework Configs

### Next.js (`nextjs.json`)

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "allowJs": true
  }
}
```

- `jsx: "preserve"` — Next.js handles JSX transformation
- `plugins` — Enables Next.js TypeScript plugin for App Router

### Vite (`vite.json`)

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

- `jsx: "react-jsx"` — Modern JSX transform (no React import needed)

### React Library (`react-library.json`)

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

- Same as Vite — library code uses modern JSX transform

## App Configs

Each app extends its framework config and adds path aliases:

```json
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@repo/ui": ["../../packages/ui/src"],
      "@repo/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Path Aliases

| Alias | Resolves To | Purpose |
|-------|-------------|---------|
| `@/*` | `./src/*` | Clean app-local imports |
| `@repo/ui` | `../../packages/ui/src` | IDE/TypeScript resolution |
| `@repo/ui/*` | `../../packages/ui/src/*` | Deep imports |

**Note:** These aliases are for TypeScript/IDE. Bundlers use their own resolution:
- Next.js: `transpilePackages` in `next.config.ts`
- Vite: `resolve.alias` in `vite.config.ts`

---

# ESLint Configuration

## Flat Config (ESLint 9+)

Using modern flat config format — not legacy `.eslintrc`:

```
packages/eslint-config/
├── base.js      ← Foundation: JS + TypeScript rules
├── nextjs.js    ← Extends base + React rules
└── vite.js      ← Extends base + React rules
```

### Base Config

```js
// packages/eslint-config/base.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    ignores: ["dist/**", ".next/**", "node_modules/**", ".turbo/**"],
  },
];
```

### Framework Configs

```js
// packages/eslint-config/nextjs.js
import base from "./base.js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  ...base,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
```

### App Usage

```js
// apps/web/eslint.config.mjs
import config from "@repo/eslint-config/nextjs";

export default config;
```

### Why Flat Config?

| Benefit | Explanation |
|---------|-------------|
| Future-proof | Legacy `.eslintrc` is deprecated |
| Explicit | Clear what configs are applied |
| Composable | Easy to extend and override |
| Type-safe | Better IDE support |

---

# Tailwind CSS v4

## CSS-First Configuration

Tailwind v4 moves config from JavaScript to CSS:

### What's Gone

- `tailwind.config.js` / `tailwind.config.ts` (optional now)
- `@tailwind base; @tailwind components; @tailwind utilities;`

### What's New

- `@import "tailwindcss";` — single import
- `@theme { }` — design tokens in CSS
- `@source` — content scanning directives

## Theme Definition

`packages/ui/src/styles.css` — the design system source:

```css
@import "tailwindcss";

@source "./components/**/*.tsx";

@theme {
  /* Colors */
  --color-brand: #6366f1;
  --color-brand-hover: #4f46e5;
  --color-brand-active: #4338ca;

  --color-surface: #fafafa;
  --color-surface-raised: #ffffff;
  --color-surface-sunken: #f4f4f5;

  --color-border: #e4e4e7;
  --color-text: #18181b;
  --color-text-muted: #71717a;
  --color-text-inverted: #ffffff;

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Typography */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
}
```

## Integration Paths

### Next.js → PostCSS

```js
// apps/web/postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Vite → Vite Plugin

```ts
// apps/cdn/vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

The Vite plugin is faster — no PostCSS overhead.

## App CSS Files

Each app imports the UI styles and declares content sources:

```css
/* apps/web/src/app/globals.css */
@import "@repo/ui/styles.css";
@import "tailwindcss";

@source "../**/*.tsx";
@source "../../../packages/ui/src/**/*.tsx";
```

### Why Two `@source` Directives?

| Directive | Scans | Purpose |
|-----------|-------|---------|
| `@source "../**/*.tsx"` | App components | App-specific classes |
| `@source "../../../packages/ui/src/**/*.tsx"` | UI package | Shared component classes |

## When You'd Still Use a Config File

Tailwind v4 supports `tailwind.config.ts` for:

- Plugins (e.g., `@tailwindcss/typography`)
- Complex custom utilities
- Programmatic theme generation

```ts
// packages/ui/tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  plugins: [typography],
} satisfies Config;
```

```css
@import "tailwindcss";
@config "./tailwind.config.ts";
```

## Tailwind Summary

| Aspect | Implementation |
|--------|----------------|
| Next.js integration | `@tailwindcss/postcss` via `postcss.config.mjs` |
| Vite integration | `@tailwindcss/vite` plugin (no PostCSS needed) |
| Theme/config | CSS via `@theme { }` |
| Content scanning | `@source` directives in CSS |
| Plugins | Optional `tailwind.config.ts` + `@config` |

---

# Dependency Strategy

## Version Catalog

All versions centralized in `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"

catalog:
  # React
  react: "^19.0.0"
  react-dom: "^19.0.0"
  "@types/react": "^19.0.0"
  "@types/react-dom": "^19.0.0"

  # TypeScript
  typescript: "^5.7.0"
  "@types/node": "^22.10.0"

  # ESLint
  eslint: "^9.17.0"
  "@eslint/js": "^9.17.0"
  # ... etc

  # Frameworks
  next: "^15.1.0"
  vite: "^6.0.0"
```

Apps reference with `catalog:`:

```json
{
  "dependencies": {
    "react": "catalog:",
    "next": "catalog:"
  }
}
```

### Why Catalog?

| Benefit | Explanation |
|---------|-------------|
| Single source of truth | All versions in one file |
| Consistency | Same version across all packages |
| Easy updates | Change once, applies everywhere |
| Explicit | Apps still declare their deps |

## Hoisting Strategy

### Hoisted to Root

Shared dev tooling in root `package.json`:

```json
{
  "devDependencies": {
    "turbo": "^2.3.0",
    "prettier": "^3.4.0",
    "typescript": "catalog:",
    "eslint": "catalog:",
    "tailwindcss": "catalog:",
    "@tailwindcss/postcss": "catalog:",
    "@tailwindcss/vite": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "@types/node": "catalog:"
  }
}
```

**Why hoist these:**

- Dev tools used everywhere
- Single install, pnpm dedupes
- Consistent versions guaranteed

### Kept in Apps

Runtime dependencies stay local:

| Package | Location | Rationale |
|---------|----------|-----------|
| `react`, `react-dom` | Each app | Runtime dep — apps own their runtime |
| `next` | apps/web, apps/docs | Framework — tightly coupled to app |
| `vite` | apps/cdn | Build tool — specific to this app |
| `@vitejs/plugin-react` | apps/cdn | Vite-specific plugin |

**Why not hoist React:**

- React is a runtime dependency, not a dev tool
- Root `package.json` shouldn't have runtime deps
- Apps should explicitly declare their requirements

### packages/ui Dependencies

```json
{
  "dependencies": {
    "clsx": "catalog:",
    "tailwind-merge": "catalog:"
  },
  "peerDependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  }
}
```

- `clsx` + `tailwind-merge` — actual deps (used by components)
- `react` — peer dep (provided by consuming apps)

---

# UI Package

## Raw Source Consumption

`packages/ui` exports raw TypeScript — no build step:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./styles.css": "./src/styles.css"
  }
}
```

Apps compile the source themselves:

| App Type | How It Compiles UI |
|----------|-------------------|
| Next.js | `transpilePackages: ["@repo/ui"]` |
| Vite | `resolve.alias` pointing to source |

### Why Raw Source?

| Benefit | Explanation |
|---------|-------------|
| No build step | Faster iteration, simpler setup |
| HMR works | Changes reflect instantly |
| Tree-shaking | Apps bundle only what they import |
| Simple debugging | No sourcemap indirection |

### Trade-offs

| Downside | Mitigation |
|----------|------------|
| Each app compiles UI | Acceptable for small teams |
| Can't publish to npm | Add build step when needed |
| Bundler differences possible | Rare in practice |

## Component Structure

```
packages/ui/src/
├── index.ts           # Exports
├── styles.css         # Tailwind theme
├── lib/
│   └── utils.ts       # cn() helper
└── components/
    ├── button.tsx
    └── card.tsx
```

### Example Component

```tsx
// packages/ui/src/components/button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand text-text-inverted hover:bg-brand-hover": variant === "default",
            "border border-border bg-transparent hover:bg-surface-sunken": variant === "outline",
            // ... other variants
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
```

### Usage in Apps

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@repo/ui";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
        <Button variant="outline">Cancel</Button>
      </CardContent>
    </Card>
  );
}
```

---

# Scripts

## Root Scripts

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "clean": "turbo clean"
  }
}
```

## Turborepo Tasks

```json
// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

### Task Behavior

| Task | Caching | Dependencies | Notes |
|------|---------|--------------|-------|
| `build` | Yes | Waits for deps | Outputs cached |
| `dev` | No | None | Persistent process |
| `lint` | Yes | None | Independent |
| `typecheck` | Yes | Waits for deps | Respects TS project refs |
| `clean` | No | None | Clears outputs |

---

# Key Decisions

| Decision | Rationale |
|----------|-----------|
| **Raw source UI** | No build complexity, instant HMR, simpler setup |
| **pnpm catalog** | Version consistency without hoisting runtime deps |
| **Hoisted dev tools** | Single update point for tooling |
| **Tailwind v4 CSS-first** | No config file bloat, theme in CSS |
| **TypeScript config inheritance** | DRY, framework-specific settings isolated |
| **ESLint flat config** | Modern, composable, future-proof |
| **Path aliases** | Clean imports, IDE support |
| **`transpilePackages`** | Next.js compiles workspace TypeScript |

---

# Potential Next Steps

Things not included but easy to add:

## 1. Pre-Built UI Package (tsup)

Add `tsup` to build `packages/ui` to `dist/`:

```bash
pnpm add -D tsup --filter @repo/ui
```

```ts
// packages/ui/tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
});
```

Update exports to point to `dist/`:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

**When to do this:**
- Publishing to npm
- Sharing outside monorepo
- Build performance issues
- Need semantic versioning

## 2. Component Preview App

Add a Vite dev server inside `packages/ui`:

```
packages/ui/
├── src/
├── preview/
│   ├── index.html
│   └── main.tsx
└── vite.config.ts
```

```ts
// packages/ui/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "preview",
  build: {
    outDir: "../preview-dist",
  },
});
```

**When to do this:**
- Design system documentation
- Component showcase
- Visual testing
- Stakeholder review

## 3. Radix UI Primitives

Add accessible primitives:

```bash
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip --filter @repo/ui
```

Update `tsup.config.ts` to externalize:

```ts
external: ["react", "react-dom", /^@radix-ui\/.*/],
```

**When to do this:**
- Need modals, dropdowns, tooltips
- Accessibility requirements
- Complex interactive components

## 4. Testing (Vitest)

Add unit tests:

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom --filter @repo/ui
```

```ts
// packages/ui/vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

**When to do this:**
- Component library grows
- CI/CD pipeline needed
- Regression prevention

## 5. Storybook

Add component documentation:

```bash
cd packages/ui
pnpm dlx storybook@latest init
```

**When to do this:**
- Team collaboration
- Design handoff
- Component documentation
- Visual regression testing

## 6. Changesets

Add versioning and changelogs:

```bash
pnpm add -D @changesets/cli -w
pnpm changeset init
```

**When to do this:**
- Publishing packages
- Tracking breaking changes
- Automated releases
- Multiple consumers

## 7. GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
```

**When to do this:**
- Team collaboration
- Automated quality checks
- Deploy previews

---

# File Reference

## Complete File Tree

```
monorepo/
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
│
├── packages/
│   ├── typescript-config/
│   │   ├── package.json
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   ├── vite.json
│   │   └── react-library.json
│   │
│   ├── eslint-config/
│   │   ├── package.json
│   │   ├── base.js
│   │   ├── nextjs.js
│   │   └── vite.js
│   │
│   └── ui/
│       ├── package.json
│       ├── tsconfig.json
│       ├── eslint.config.mjs
│       └── src/
│           ├── index.ts
│           ├── styles.css
│           ├── lib/utils.ts
│           └── components/
│               ├── button.tsx
│               └── card.tsx
│
└── apps/
    ├── web/
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── next.config.ts
    │   ├── postcss.config.mjs
    │   ├── eslint.config.mjs
    │   └── src/app/
    │       ├── globals.css
    │       ├── layout.tsx
    │       └── page.tsx
    │
    ├── docs/
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── next.config.ts
    │   ├── postcss.config.mjs
    │   ├── eslint.config.mjs
    │   └── src/app/
    │       ├── globals.css
    │       ├── layout.tsx
    │       └── page.tsx
    │
    └── cdn/
        ├── package.json
        ├── tsconfig.json
        ├── vite.config.ts
        ├── eslint.config.mjs
        ├── index.html
        └── src/
            ├── index.css
            ├── main.tsx
            └── App.tsx
```
