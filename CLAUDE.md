# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start Vite dev server (http://localhost:8080)
npm run build    # Production build to ./dist
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture Overview

This is a React 18 SPA marketing website for Gigglebyte AI Hub, built with:

- **Vite** - Build tool with SWC for fast compilation
- **TypeScript** - Loose type checking (noImplicitAny: false)
- **shadcn/ui** - Component library built on Radix UI primitives
- **Tailwind CSS** - Utility-first styling with custom CSS variables
- **React Router v6** - Client-side routing
- **Netlify** - Deployment with serverless functions

## Code Structure

```
src/
├── pages/           # Route page components (Home, About, Projects, Contact, NotFound)
├── components/
│   ├── ui/          # shadcn/ui components (50+ files)
│   └── *.tsx        # Layout, Header, Footer, ScrollToTop
├── hooks/           # Custom hooks (use-mobile, use-toast)
├── lib/utils.ts     # cn() utility for Tailwind class merging
├── integrations/    # Supabase client (configured but currently unused)
└── data/            # Static data (testimonials)

netlify/functions/   # Serverless functions (send-contact.ts)
```

## Key Patterns

- **Path alias**: `@/` maps to `./src/` (use `@/components/ui/button` etc.)
- **Class utility**: Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **Form validation**: Zod schemas for form inputs (see Contact.tsx)
- **Animations**: Framer Motion for transitions, Tailwind animations for simpler effects
- **Responsive**: `useIsMobile()` hook for mobile breakpoint detection

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with services/benefits |
| `/about` | About | Company and team info |
| `/automations` | Projects | Project showcase gallery |
| `/contact` | Contact | Contact form (posts to Netlify function) |
| `*` | NotFound | 404 fallback |

## Contact Form Flow

Contact form submissions go through:
1. Zod validation (with honeypot spam protection)
2. Rate limiting (60s cooldown)
3. POST to `/.netlify/functions/send-contact`

## Testing Workflow (Required)

After implementing code changes, always:
1. Create or update tests alongside the source file (e.g., `Component.tsx` → `Component.test.tsx`)
2. Run only the specific test file to verify:
   ```bash
   npm run test -- src/path/to/file.test.ts   # Run specific test in watch mode
   npm run test:run -- src/path/to/file.test.ts  # Run once
   ```
3. For e2e tests (in `e2e/` directory):
   ```bash
   npm run e2e -- e2e/feature.spec.ts
   ```

### Test Structure

| Location | Type | Runner | Command |
|----------|------|--------|---------|
| `src/**/*.test.ts(x)` | Unit/Integration | Vitest | `npm run test:run` |
| `e2e/*.spec.ts` | End-to-end | Playwright | `npm run e2e` |

### Full Test Suite Commands

```bash
npm run test:unit        # Unit tests (lib, hooks, netlify functions)
npm run test:integration # Integration tests (pages, components)
npm run e2e              # All e2e tests
npm run test:all         # All tests (vitest + playwright)
```
