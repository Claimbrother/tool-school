# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (localhost:3000)
pnpm build      # Production build
pnpm lint       # ESLint
```

No test suite configured.

## Environment Variables

Required in `.env.local`:
- `MISTRAL_API_KEY` — Mistral AI for the course advisor chat endpoint
- `RESEND_API_KEY` — Resend for contact form emails

## Architecture

**"Smart Mana Tool School"** — portfolio and course landing page for Falilou Holler. Next.js 16 App Router with i18n routing via `next-intl`.

### Routing

All pages live under `app/[locale]/` with locales `de` (default), `en`, `fr`. The locale segment is handled by `app/i18n/routing.ts`. The root `app/[locale]/layout.tsx` is the actual RootLayout (the old `app/layout.tsx` was deleted).

### Page structure (`app/[locale]/page.tsx`)

Single-page scroll layout with anchor IDs:
1. `<HeroSection />` — full-width hero with aura animation details
2. `#classes` — `<TrainingCyclePath />` — course cards and training flow
3. `#contact` — `<ContactSection />` — contact form (Resend)

### API routes

| Route | Purpose |
|---|---|
| `POST /api/send` | Contact form — sends email via Resend to `claimbrother@gmail.com` |
| `POST /api/mistral-chat` | AI course advisor — Mistral `mistral-large-latest`, system prompt built from `app/api/data/` |
| `GET /api/courses` | Returns `app/api/data/courses.json` |

### Data layer (`app/api/data/`)

Static JSON/MD files consumed by the Mistral route to build the AI system prompt:
- `applicant.json` — Falilou's bio, experience, and innovation projects
- `course-details.json`, `courses.json` — course catalog
- `mentoring-philosophy.md` — loaded at request time by the Mistral route

### Component conventions

**`app/Global/UIComponents.tsx`** — exports `GlassCard` and `PillBadge`. These are the base UI primitives; use them for any glass-morphism cards.

**`components/myShit/`** — complex custom components (flip cards, swipe gallery, orbital gallery, video player). These are project-specific and not shadcn.

**`components/ui/`** — shadcn/ui components plus individual icon components (each icon is its own file).

### Known workarounds

- **`backdrop-blur` breaks CSS 3D transforms** — `GlassCard` on flip cards uses `opacity`/`visibility` toggling instead of `backface-visibility`. Do not replace with backface-visibility approach.
- **`@n8n/chat` CSS import crashes Turbopack** — `AIConsultant.tsx` dynamically injects the stylesheet via a `<link>` tag in `useEffect` instead of a static import. Keep this pattern.

### Types

Shared interfaces (`Course`, `Step`, `EmailDataProject`, `AuraCourse`, etc.) live in `app/[locale]/types.d.ts`. Import from `@/app/types`.
