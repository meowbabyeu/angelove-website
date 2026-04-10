# AngeLove Website — Developer Guide

## Quick Start

```bash
git clone https://github.com/meowbabyeu/angelove-website.git
cd angelove-website
npm install
npm run dev
```

Site runs at `http://localhost:3000`. It will redirect to `/en` automatically.

## Tech Stack

- **Next.js 16** (App Router, SSG)
- **React 19**, **TypeScript**
- **Tailwind CSS 4** (config in `src/app/globals.css` via `@theme inline`)
- **next-intl** v4.9 — 3 languages (EN, DE, FR)
- **Stripe Checkout** (hosted) — API route at `/api/checkout`
- **Lucide React** — icons

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # All pages (EN/DE/FR routing)
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout (fonts, cart, header, footer)
│   │   ├── products/
│   │   │   ├── page.tsx       # Product catalog
│   │   │   └── [slug]/        # Product detail pages (sofa, sessel, huepfpolster)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── checkout/          # Success + cancel pages
│   ├── api/checkout/route.ts  # Stripe session creation
│   └── globals.css            # Tailwind + design system colors
├── components/                # All UI components
├── i18n/                      # Routing, navigation, request config
└── lib/
    ├── products.ts            # Product data (prices, variants, images)
    └── cart.tsx               # Cart context + localStorage
messages/
├── en.json                    # English translations
├── de.json                    # German translations
└── fr.json                    # French translations
public/
├── brand/logo.png             # AngeLove logo
├── products/                  # Product images
└── lifestyle/                 # Lifestyle/hero images
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | #F5EDE3 | Backgrounds, cards |
| `turquoise` | #5BB8B0 | Accents, links, badges |
| `coral` | #E8856C | CTA buttons |
| `brown` | #3D2E22 | Text |
| `brown-muted` | #7A6B5D | Secondary text |
| `off-white` | #FAF8F5 | Page background |

**Fonts:** Varela Round (headings, `font-heading`), Nunito Sans (body, `font-body`)

## Workflow

### 1. Create a branch
```bash
git checkout master
git pull
git checkout -b feat/your-change-name
```

### 2. Make changes + test locally
```bash
npm run dev
```

Check at least 2 languages (EN + DE) when editing translations.

### 3. Build before pushing
```bash
npm run build
```
Fix any TypeScript or build errors before pushing.

### 4. Push + create PR
```bash
git push origin feat/your-change-name
```
Then create a Pull Request on GitHub against `master`.

### 5. Merge = auto-deploy
Once PR is merged to `master`, Vercel deploys automatically to https://www.angelove.shop.

## Common Tasks

### Add/edit product data
Edit `src/lib/products.ts` — prices (in cents), variants, dimensions, Amazon URLs, review counts.

### Add/edit translations
Edit files in `messages/` — always update all 3 files (en.json, de.json, fr.json).

### Add product images
Drop images into `public/products/`. Use descriptive names: `sofa-cream.jpg`, `sessel-pink.jpg`.

### Change shipping price or countries
Edit `src/app/api/checkout/route.ts` — `fixed_amount` for price, `allowed_countries` for countries.
Also update `src/components/CartDrawer.tsx` (shipping constant) and translations.

## Important Notes

- **Stripe checkout is NOT LIVE yet** — needs `STRIPE_SECRET_KEY` env var in Vercel
- **Do NOT push directly to `master`** — always use branches + PRs
- **Translations** — every user-facing text must be in all 3 languages
- **Images** — currently unoptimized (raw PNGs). Use WebP when adding new ones
- **Commit messages** — English, imperative mood ("Add feature" not "Added feature")
