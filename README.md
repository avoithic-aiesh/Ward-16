# Ward 16 Digital Heritage | काठमाडौँ महानगरपालिका वडा नं. १६ डिजिटल सम्पदा

A comprehensive digital heritage platform, living cultural archive, interactive map, and educational resource preserving the monuments, sacred spaces, oral memories, and living traditions of **Ward No. 16, Kathmandu Metropolitan City, Nepal**.

---

## 🏛️ Project Overview

Ward 16 is a dynamic landscape where centuries of Newari hydraulic architecture (Balaju Baisdhara), sacred Matrika shrines (Pyatho Ajima), ancient rest houses (Patis), and living neighborhood traditions intersect with contemporary city life.

This initiative provides:
- **Interactive Heritage Exploration Map:** Geospatial landmark exploration with verified GPS coordinates and photo archives.
- **Dedicated Heritage Archives:** In-depth architectural, historical, and photographic documentation for **22 Dhara (Balaju Baisdhara)** and **Pyatho Ajima Temple**.
- **Interactive Heritage Suite:** Architectural hotspot inspection, historical Then-and-Now image sliders, audio storytelling players, educational quizzes, and panoramic scene viewers.
- **Bilingual Experience (English & नेपाली):** Concurrent-safe, tear-free dynamic localization preserving authentic cultural and Newari terminology (*Hiti*, *Makara*, *Dachi Appa*, *Ajima*, *Dafa Bhajan*, *Guthi*).
- **Contextual AI Heritage Guides:** Grounded, RAG-scoped conversational assistants backed strictly by verified historical records with hallucination guardrails.
- **Community Heritage Archive:** Ethical citizen submission portal for elder oral histories, family photographs, and personal reflections with pre-publication moderation.
- **Administrative CMS & Supabase Backend:** PostgreSQL database with Row Level Security (RLS), role-based access control, coordinate field verification, and asset tracking.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 16.4.6](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **UI Library:** [React 19.3.0](https://react.dev/)
- **Styling:** [Tailwind CSS v4.3.3](https://tailwindcss.com/) with custom Modern Heritage design tokens
- **Typography:** Google Fonts (`Cormorant Garamond` serif display, `Inter` body, Devanagari fallbacks `Mukta`, `Noto Sans Devanagari`)
- **Mapping:** [Leaflet 1.9.4](https://leafletjs.com/) & [React-Leaflet 5.0](https://react-leaflet.js.org/) with OpenStreetMap tiles
- **Database & Storage:** [Supabase](https://supabase.com/) PostgreSQL + Supabase Storage + Row Level Security (RLS)
- **State & i18n:** React 19 `useSyncExternalStore` for multi-tab storage sync
- **Tooling:** ESLint 9, Webpack production pipeline

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js 18.18+ or 20+
- npm (or pnpm / yarn)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/ward-16-heritage.git
cd ward-16-heritage
npm install
```

### 2. Configure Environment Variables
Copy the template and configure your secrets:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-server-service-role-key

# Optional Google Gemini API Key (for LLM generation in AI Guides)
GEMINI_API_KEY=your-gemini-api-key

# Base URL for Dynamic Sitemap & Robots.txt
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note:** The application includes a hybrid repository pattern. If Supabase keys are not set, all public routes, archives, and AI assistants operate offline using verified local seed data.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

### 5. Run Lint Checks
```bash
npm run lint
```

---

## 📁 Project Architecture

```
ward-16-heritage/
├── public/                     # Static media assets, photography, markers
├── src/
│   ├── app/                    # Next.js App Router (Pages, Layouts & APIs)
│   │   ├── page.js             # Homepage (Hero, Intro, Featured, Culture, CTA)
│   │   ├── explore-map/        # Interactive Ward 16 Heritage Map
│   │   ├── heritage/
│   │   │   ├── 22-dhara/       # 22 Dhara Detail Archive + AI Guide
│   │   │   └── pyatho-ajima/   # Pyatho Ajima Detail Archive + AI Guide
│   │   ├── ward/               # "Our Ward" civic, geographic & enclave overview
│   │   ├── culture/            # "Culture & Traditions" intangible heritage
│   │   ├── community-archive/  # Community oral histories & memory portal
│   │   │   ├── [slug]/         # Dynamic story detail reader
│   │   │   └── submit/         # Ethical visitor contribution form
│   │   ├── admin/              # Administrative Content Management System (CMS)
│   │   ├── api/                # Secure server endpoints
│   │   │   ├── heritage-guide/ # AI Grounded RAG assistant
│   │   │   ├── community-archive/submit/ # Rate-limited story submission
│   │   │   └── admin/          # Moderation & GPS verification routes
│   │   ├── sitemap.js          # Dynamic SEO sitemap
│   │   └── robots.js           # Dynamic robots.txt
│   ├── components/             # Modular React 19 UI components
│   │   ├── admin/              # CMS moderation dashboard & coordinate manager
│   │   ├── ai/                 # HeritageGuideChat assistant widget
│   │   ├── archive/            # StoryCard, Filters, Disclaimer, DetailView
│   │   ├── heritage/           # Hero, History, Architecture, Timeline, Gallery
│   │   ├── interactive/        # Hotspots, Slider, Audio, Quiz, 360 Tour
│   │   ├── layout/             # Navbar, Footer, MobileMenu
│   │   ├── map/                # Leaflet map, sidebar, popups, category filters
│   │   └── ui/                 # LanguageSwitcher, Button, SectionHeading
│   ├── data/                   # Verified heritage knowledge, map locations, seed data
│   ├── i18n/                   # Bilingual dictionaries (en.js, ne.js) & LanguageContext
│   └── lib/                    # Supabase clients, repository services, utilities
├── supabase/
│   └── migrations/             # Idempotent PostgreSQL schemas & seed data
│       ├── 001_initial_schema.sql
│       └── 002_seed_heritage_data.sql
└── .env.example                # Environment variables template
```

---

## 🔒 Security & Epistemic Safeguards

1. **Row Level Security (RLS):** Supabase policies prevent unauthorized database writes. Public visitors can only view published records and submit entries with `status: pending_review`.
2. **Pre-Publication Moderation:** Community contributions undergo human editorial review before appearing on the public website.
3. **Epistemic Distinction Notice:** Personal testimonies and family reflections are explicitly tagged with standardized disclaimers distinguishing oral memories from officially sanctioned Department of Archaeology (DoA) documentation.
4. **GPS Coordinate Field Verification:** Coordinates require confirmed GPS survey citation before receiving the `verified` badge on public map markers.
5. **Grounded AI RAG:** Assistant queries strictly retrieve verified knowledge chunks. Questions on undocumented topics return an exact required fallback (*"I don't currently have verified information about this topic in the Ward 16 Digital Heritage archive"*).
6. **Rate Limiting & Input Sanitization:** API endpoints employ sliding-window rate limiters and validate input lengths to protect against spam and injection attacks.

---

## 🌐 Production Deployment (Vercel)

The project is optimized for deployment on the [Vercel](https://vercel.com/) platform:
1. Push repository to GitHub/GitLab.
2. Import project into Vercel.
3. In Project Settings > Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY` (optional)
   - `NEXT_PUBLIC_SITE_URL` (production domain)
4. Build Command: `npm run build`
5. Output Directory: `.next` (default)

---

## 📝 License & Ethical Use

All historical chronicles, architectural notes, and cultural documentation are preserved for civic, cultural, and non-commercial educational purposes in collaboration with the residents and cultural custodians of Ward No. 16, Kathmandu Metropolitan City.
