# 🕵️‍♂️ ShadowTrace — Tactical Cyber Intelligence & OSINT Simulator

[![Live Production](https://img.shields.io/badge/Live%20Demo-shadow--trace--psi.vercel.app-22e0ff?style=for-the-badge&logo=vercel)](https://shadow-trace-psi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![WebGL](https://img.shields.io/badge/WebGL-Fluid_Shader-e11d48?style=flat-square&logo=webgl)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
[![Security](https://img.shields.io/badge/Security-RLS%20%26%20Rate_Limited-10b981?style=flat-square)](https://owasp.org/)

> **Live Deployment:** [https://shadow-trace-psi.vercel.app/](https://shadow-trace-psi.vercel.app/)

**ShadowTrace** is an interactive, cinematic cyber intelligence and OSINT (Open Source Intelligence) investigation simulator. Step into the shoes of a classified operative to analyze security logs, decrypt intercepted communications, run tactical terminal commands, correlate clues across interlinked syndicate operations, and generate official classified dossiers.

---

## 🌐 Live Application

Access the full tactical console deployed on Vercel:
**[https://shadow-trace-psi.vercel.app/](https://shadow-trace-psi.vercel.app/)**

- **Guest Mode**: Instantly test investigations with temporary in-memory telemetry.
- **Operative Mode**: Register an encrypted profile to persist clearance levels, solved operation arcs, and custom dossiers.

---

## ✨ Key Features

### 🎯 Multi-Directive Investigation & Evidence Enforcement
- **Dual Objective Gate**: A case can only be submitted and solved when operatives:
  1. Inspect **all** evidence items on the Evidence Board (logs, aerial surveillance, intercepted emails, hex dumps).
  2. Complete **all 4 discrete OSINT terminal directives**:
     - `c2_trace`: Correlate rogue command-and-control server via `trace <ip>`
     - `internal_scan`: Port scan rogue gateway for active services via `scan <ip>`
     - `whois_lookup`: Identify domain registrant & registrar DNS records via `whois <domain>`
     - `syndicate_intel`: Query threat actor records via `intel <syndicate>`
- **Live Directives HUD**: Interactive status bar showing real-time `X/4 RESOLVED` progress.

### 🛡️ Enterprise Security Suite
- **Row Level Security (RLS)**:
  - **Firestore**: [firestore.rules](firestore.rules) enforcing strict user-tenant isolation on `/users/{userId}`, `/sessions`, and `/reports`, immutable ownership guards on writes (`isIncomingOwner()`), and read-only `/cases` and `/clues`.
  - **PostgreSQL / Supabase**: [postgres-rls.sql](src/lib/security/postgres-rls.sql) providing `ENABLE ROW LEVEL SECURITY` with granular per-tenant policies.
- **Edge Rate Limiting**:
  - Sliding-window in-memory rate limiter with automated stale-bucket garbage collection ([rate-limiter.ts](src/lib/security/rate-limiter.ts)).
  - Next.js Edge Middleware ([middleware.ts](src/middleware.ts)) throttling sensitive endpoints at 15 req/min and general API routes at 60 req/min with `429 Too Many Requests` responses.
- **API Key & Bearer Authentication**:
  - Timing-safe cryptographic key verification ([api-auth.ts](src/lib/security/api-auth.ts)) supporting `x-api-key` and `Authorization: Bearer <KEY>`.
  - Edge middleware protection for `/api/intel/*` and `/api/protected/*`.
- **Hardened HTTP Headers**:
  - [vercel.json](vercel.json) enforces `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, and strict `Referrer-Policy`.

### 🎛️ Tactical UI/UX Suite
- 🔍 **Site Search & Command Palette** (`⌘K` / `Ctrl+K`): Modal search across all dossiers, operations, forensics drills, and directives ([TacticalCommandPalette.tsx](src/components/ui/TacticalCommandPalette.tsx)).
- 📱 **Mobile Navigation Drawer**: Smooth slideout menu with operative clearance status ([MobileNavDrawer.tsx](src/components/ui/MobileNavDrawer.tsx)).
- 📡 **Cyber Radar Loader**: Dual-ring SVG radar loader with sweep line animation for loading states ([CyberRadarLoader.tsx](src/components/ui/CyberRadarLoader.tsx)).
- 📋 **One-Click Copy Button**: Integrated into evidence cards for quick extraction of raw IPs, hashes, and coordinates ([CopyButton.tsx](src/components/ui/CopyButton.tsx)).
- 📊 **Ceiling Scroll Progress Bar**: Sleek 2px progress indicator tracking reading depth ([ScrollProgressBar.tsx](src/components/ui/ScrollProgressBar.tsx)).
- ⬆️ **Tactical Back to Top**: Smooth scroll-to-top trigger appearing past 400px scroll ([BackToTopButton.tsx](src/components/ui/BackToTopButton.tsx)).
- 👁️ **Password Visibility Toggle**: Interactive eye icon toggle with encrypted helper annotations ([PasswordInput.tsx](src/components/ui/PasswordInput.tsx)).
- 🚨 **Tactical Status Alerts**: Cyber-styled feedback boxes for form success, warning, and error states ([FormStatusAlert.tsx](src/components/ui/FormStatusAlert.tsx)).
- ⚠️ **Tactical Confirmation Modal**: Accessible verification dialog for destructive actions such as case progress purges ([TacticalConfirmModal.tsx](src/components/ui/TacticalConfirmModal.tsx)).
- ⏱️ **Telemetry Timestamp Badge**: Real-time sync badge with relative time ("SYNCED", "5M AGO") ([LastUpdatedBadge.tsx](src/components/ui/LastUpdatedBadge.tsx)).
- 📖 **Expandable FAQ Accordion**: Interactive briefing accordion for rules of engagement and FAQs ([TacticalAccordion.tsx](src/components/ui/TacticalAccordion.tsx)).
- 🚨 **HQ Dispatch Beacon**: Floating tactical uplink button for operative field reports and support ([TacticalDispatchBeacon.tsx](src/components/ui/TacticalDispatchBeacon.tsx)).
- 🍪 **Tactical Cookie Consent**: Privacy banner adhering to the obsidian cyber aesthetic ([TacticalCookieConsent.tsx](src/components/ui/TacticalCookieConsent.tsx)).
- 📈 **UTM Parameter Tracking**: Automatic campaign and referrer attribution stored per session ([UTMTracker.tsx](src/components/ui/UTMTracker.tsx)).
- 🖨️ **Dossier Print Stylesheet**: Dedicated `@media print` rules stripping canvases, navbars, and interactive buttons for clean paper/PDF export.

### 🌌 Living WebGL Fluid Noise Canvas Background
- Custom GPU fragment shader simulating an evolving tactical surveillance fluid field.
- Responsive mouse interaction and smooth 60 FPS rendering under a deep obsidian radar atmosphere ([TacticalShaderBackground.tsx](src/components/TacticalShaderBackground.tsx)).

### 🎲 Procedural Case Generation Engine
- Generates 3 interlinked, progression-based cases per syndicate operation (e.g., *The Silent Hand*, *Apex Transit Collective*, *Chimera Syndicate*, *Vanguard Crypt*).
- Procedural coherence: every generated operation links flight ADS-B telemetry, ground radar stations, access logs, and C2 proxies into an airtight deductive graph.

### 💡 Offline Tactical Progressive Hints
- Zero-latency **Tactical Guidance & Case Hints** panel.
- Step-by-step progressive nudges that guide operatives toward the next logical deduction without spoiling findings.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Live URL** | [https://shadow-trace-psi.vercel.app/](https://shadow-trace-psi.vercel.app/) |
| **Framework** | [Next.js 16 (Turbopack, App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS |
| **Shader & FX** | [WebGL 1.0/2.0](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [Framer Motion](https://www.framer.com/motion/) |
| **Edge & Security** | Next.js Edge Middleware, Sliding-Window IP Rate Limiter, Timing-Safe API Key Auth |
| **Data Isolation** | Firestore Security Rules (RLS), PostgreSQL Row Level Security |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Architecture

```
ShadowTrace/
├── firestore.rules                         # Firestore Row Level Security policies
├── vercel.json                             # Security headers, CSP & CORS edge config
├── src/
│   ├── middleware.ts                       # Edge Gateway: Rate Limiting & API Key Auth
│   ├── app/
│   │   ├── api/
│   │   │   ├── gemini/route.ts             # Classified AI endpoint
│   │   │   └── intel/route.ts              # Protected intelligence feed endpoint
│   │   ├── cases/page.tsx                  # Operation arc hub, progression & dossier history
│   │   ├── investigation/[id]/page.tsx     # Active tactical console (Evidence, Terminal, Hints)
│   │   ├── report/page.tsx                 # Debrief summary & PDF dossier export
│   │   ├── globals.css                     # Ambient styling, print rules & tactical hover states
│   │   ├── layout.tsx                      # Root layout with WebGL canvas & UI suite
│   │   └── page.tsx                        # Cinematic landing page & OSINT sandbox
│   ├── components/
│   │   ├── AuthModal.tsx                   # Operative login & account registration modal
│   │   ├── Navigation.tsx                  # Header with clearance status & command palette trigger
│   │   ├── OSINTPracticeSandbox.tsx        # 3-drill interactive forensics sandbox
│   │   ├── OSINTTerminal.tsx               # 4-directive CLI console with live HUD
│   │   ├── ReportPDF.tsx                   # PDF document dossier template
│   │   ├── TacticalHintsPanel.tsx          # Progressive offline hint & guidance engine
│   │   ├── TacticalShaderBackground.tsx    # Living WebGL fluid noise canvas
│   │   └── ui/                             # 19 Approved Modular Tactical UI Components
│   │       ├── BackToTopButton.tsx         # Scroll-to-top button
│   │       ├── CopyButton.tsx              # Clipboard copy button
│   │       ├── CyberRadarLoader.tsx        # SVG radar loader
│   │       ├── FormStatusAlert.tsx         # Success/error alert component
│   │       ├── LastUpdatedBadge.tsx        # Telemetry timestamp badge
│   │       ├── MobileNavDrawer.tsx         # Mobile navigation drawer
│   │       ├── PasswordInput.tsx           # Password visibility toggle input
│   │       ├── ScrollProgressBar.tsx       # Screen-top scroll progress indicator
│   │       ├── SkipToContent.tsx           # Accessible skip-link
│   │       ├── TacticalAccordion.tsx       # Collapsible FAQ & briefings
│   │       ├── TacticalCommandPalette.tsx  # Global site search palette (Cmd+K)
│   │       ├── TacticalConfirmModal.tsx    # Modal for destructive action verification
│   │       ├── TacticalCookieConsent.tsx   # Tactical privacy banner
│   │       ├── TacticalDispatchBeacon.tsx  # Floating HQ dispatch uplink
│   │       └── UTMTracker.tsx              # UTM campaign attribution tracker
│   └── lib/
│       ├── analytics/utm-tracker.ts        # UTM parsing & storage
│       ├── auth/user-store.ts              # Multi-user accounts & isolated namespaces
│       ├── engine/
│       │   ├── case-store.ts               # User-scoped active cases & archives
│       │   └── procedural-generator.ts     # Procedural DAG case generator
│       └── security/
│           ├── api-auth.ts                 # API Key & Bearer token verification
│           ├── postgres-rls.sql            # PostgreSQL RLS policies
│           ├── rate-limiter.ts             # Sliding-window IP rate limiter
│           └── sanitize.ts                 # Terminal & input sanitization
└── public/                                 # Static icons & telemetry badges
```

---

## 🚀 Getting Started

### 1. Clone & Navigate
```bash
git clone https://github.com/pragyanguwahati-lgtm/ShadowTrace.git
cd ShadowTrace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application is completely offline-ready and requires zero external API keys for core gameplay.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server at `localhost:3000`.
- `npm run build` — Compiles and creates an optimized production build with Turbopack.
- `npm run start` — Boots the production server.
- `npm run lint` — Runs ESLint checks across TypeScript and React code.

---

## 🔒 Security & Privacy Notice

ShadowTrace is a **simulated cybersecurity training and investigative experience**. All IP addresses, server logs, entities (e.g., "The Silent Hand"), and intercepted messages provided in cases are fictitious and generated procedurally solely for education and simulation purposes.
