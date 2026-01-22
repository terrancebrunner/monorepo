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
- `@custom-variant` — custom variant definitions

## Theme Definition

`packages/ui/src/styles.css` — the design system source with shadcn-style tokens:

```css
@import "tailwindcss";

@source "./primitives/**/*.tsx";
@source "./blocks/**/*.tsx";

@custom-variant dark (&:is(.dark *));

@theme {
  /* Fonts */
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* Semantic Colors (light mode defaults) */
  --background: var(--color-white);
  --foreground: var(--color-neutral-950);
  --card: var(--color-white);
  --card-foreground: var(--color-neutral-950);
  --primary: var(--color-neutral-900);
  --primary-foreground: var(--color-neutral-50);
  --secondary: var(--color-neutral-100);
  --secondary-foreground: var(--color-neutral-900);
  --muted: var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-500);
  --accent: var(--color-neutral-100);
  --accent-foreground: var(--color-neutral-900);
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);
  --border: var(--color-neutral-200);
  --input: var(--color-neutral-200);
  --ring: var(--color-neutral-400);

  /* Radius */
  --radius: 0.625rem;

  /* Shadows */
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
}

/* Dark mode overrides */
.dark {
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-50);
  --card: var(--color-neutral-900);
  --card-foreground: var(--color-neutral-50);
  /* ... all tokens have dark variants */
}
```

### Design Token Reference

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `background` / `foreground` | white / neutral-950 | neutral-950 / neutral-50 | Page bg and text |
| `card` / `card-foreground` | white / neutral-950 | neutral-900 / neutral-50 | Card surfaces |
| `primary` / `primary-foreground` | neutral-900 / neutral-50 | neutral-200 / neutral-900 | Primary actions |
| `secondary` / `secondary-foreground` | neutral-100 / neutral-900 | neutral-800 / neutral-50 | Secondary actions |
| `muted` / `muted-foreground` | neutral-100 / neutral-500 | neutral-800 / neutral-400 | Subtle elements |
| `destructive` / `destructive-foreground` | red-600 / white | red-400 / neutral-50 | Destructive actions |
| `border` | neutral-200 | neutral-800 | Border color |
| `input` | neutral-200 | neutral-800 | Input borders |
| `ring` | neutral-400 | neutral-300 | Focus rings |

### Dark Mode

Class-based dark mode via `@custom-variant dark`. Toggle by adding `.dark` to `<html>`:

```js
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');

// Toggle dark mode
document.documentElement.classList.toggle('dark');
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

@source "../**/*.tsx";
@source "../../../../packages/ui/src/**/*.tsx";
```

**Important:** `@source` paths are relative to the CSS file location:
- cdn (`apps/cdn/src/`): `../../../packages/ui/src/**/*.tsx`
- docs/web (`apps/*/src/app/`): `../../../../packages/ui/src/**/*.tsx`

### Why Two `@source` Directives?

| Directive | Scans | Purpose |
|-----------|-------|---------|
| `@source "../**/*.tsx"` | App components | App-specific classes |
| `@source "../../../../packages/ui/src/**/*.tsx"` | UI package | Shared component classes |

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

  # Frameworks
  next: "^15.1.0"
  vite: "^6.0.0"

  # UI utilities
  clsx: "^2.1.1"
  tailwind-merge: "^2.6.0"
  class-variance-authority: "^0.7.0"

  # Icons
  lucide-react: "^0.487.0"

  # Radix UI
  "@radix-ui/react-avatar": "^1.1.0"
  "@radix-ui/react-label": "^2.1.0"
  "@radix-ui/react-slot": "^1.1.0"
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
    "tailwindcss": "catalog:"
  }
}
```

### Kept in Apps

Runtime dependencies stay local:

| Package | Location | Rationale |
|---------|----------|-----------|
| `react`, `react-dom` | Each app | Runtime dep — apps own their runtime |
| `next` | apps/web, apps/docs | Framework — tightly coupled to app |
| `vite` | apps/cdn | Build tool — specific to this app |

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

## Folder Structure

```
packages/ui/src/
├── primitives/     # Base components
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   └── index.ts
├── blocks/         # Composed components
│   ├── profile-card.tsx
│   └── index.ts
├── lib/
│   └── utils.ts    # cn() helper
├── styles.css      # Design tokens
└── index.ts        # Barrel exports
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `clsx` + `tailwind-merge` | `cn()` utility for class merging |
| `class-variance-authority` | CVA for variant-based component styling |
| `lucide-react` | Icon library |
| `@radix-ui/react-avatar` | Accessible avatar primitive |
| `@radix-ui/react-label` | Accessible label primitive |
| `@radix-ui/react-slot` | Polymorphic `asChild` pattern |

## Components

### Primitives

| Component | Variants | Features |
|-----------|----------|----------|
| `Button` | default, secondary, outline, ghost, destructive, link | Sizes: default, sm, lg, icon. Supports `asChild` |
| `Card` | — | CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `Avatar` | — | AvatarImage, AvatarFallback (Radix-based) |
| `Badge` | default, secondary, outline, destructive | — |
| `Input` | — | Styled input with focus states |
| `Label` | — | Radix-based for accessibility |

### Blocks

| Component | Description |
|-----------|-------------|
| `ProfileCard` | Composed profile card using Avatar, Badge, Button, Card |

### Example: Button with CVA

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### The `asChild` Pattern

Allows polymorphic rendering — the Button can render as any element:

```tsx
// Renders as <button>
<Button>Click me</Button>

// Renders as <a> (for Next.js Link)
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

### Usage in Apps

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  ProfileCard,
} from "@repo/ui";

export default function Page() {
  return (
    <main className="min-h-screen bg-background p-8">
      <ProfileCard
        name="Jane Doe"
        role="Software Engineer"
        avatarUrl="/avatar.jpg"
        skills={["React", "TypeScript", "Node.js"]}
        recentActivity="Shipped new feature"
        team="Platform"
        email="jane@example.com"
      />
    </main>
  );
}
```

## Adding Components

### Adding a Primitive

1. Create `packages/ui/src/primitives/[name].tsx`
2. Use `cn()` for class merging
3. Use CVA for variants
4. Use `forwardRef` for ref forwarding
5. Support `asChild` via Radix Slot where appropriate
6. Export from `packages/ui/src/primitives/index.ts`

### Adding a Block

1. Create `packages/ui/src/blocks/[name].tsx`
2. Compose from existing primitives
3. Use **named exports** (not default) for barrel re-export compatibility
4. Export from `packages/ui/src/blocks/index.ts`

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
| **shadcn-style tokens** | Semantic naming, light/dark mode support |
| **CVA for variants** | Type-safe, composable variant definitions |
| **Radix primitives** | Accessible, unstyled base components |
| **Primitives + Blocks** | Layered architecture for composition |
| **TypeScript config inheritance** | DRY, framework-specific settings isolated |
| **ESLint flat config** | Modern, composable, future-proof |
| **Path aliases** | Clean imports, IDE support |
| **`transpilePackages`** | Next.js compiles workspace TypeScript |
| **Named exports** | Required for barrel re-exports (`export *`) |

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
│           ├── lib/
│           │   └── utils.ts
│           ├── primitives/
│           │   ├── index.ts
│           │   ├── avatar.tsx
│           │   ├── badge.tsx
│           │   ├── button.tsx
│           │   ├── card.tsx
│           │   ├── input.tsx
│           │   └── label.tsx
│           └── blocks/
│               ├── index.ts
│               └── profile-card.tsx
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
