# ShadowTrace - Full Codebase Export

This file contains the complete source code and documentation of ShadowTrace.
You can copy-paste this directly into Gemini or any LLM.


---

## File: `PRD.md`

```md
# ShadowTrace — Product Requirements Document (PRD)

Version: 1.0

## Vision
ShadowTrace is an AI-powered cyber investigation simulator that transforms cybersecurity learning into a cinematic detective experience.

## Core User Journey
1. Open ShadowTrace.
2. Select investigation.
3. Examine evidence.
4. Ask AI questions.
5. Connect clues.
6. Generate downloadable investigation report.

## Core Features
- Cinematic landing page
- Case selection
- Interactive evidence board
- AI investigation assistant (Gemini)
- Investigation timeline
- OSINT simulation
- Professional PDF report

## Tech Stack
- Next.js 15
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis
- Gemini API
- Firebase
- Vercel
- React PDF Renderer

## MVP
One complete investigation with AI guidance and downloadable report.

```

---

## File: `DESIGN.md`

```md
# ShadowTrace — Design System

## Design Philosophy
A cinematic intelligence dossier inspired by luxury editorial storytelling.

## Colors
- Background: #090909
- Surface: #111111
- Border: #2C2C2C
- Text: #F2F0EB
- Accent: #D4A95A

## Typography
- Display: Canela / Cormorant Garamond
- Body: Inter

## Motion
- Drift
- Dissolve
- Unfold
- Parallax
- 0.8–1.6s cinematic transitions

## Components
- Hero
- Floating Navigation
- Case Cards
- Evidence Board
- AI Panel
- Timeline
- OSINT Console
- Report Preview

```

---

## File: `ARCHITECTURE.md`

```md
# ShadowTrace — Architecture

## High-Level Architecture

User
↓
Next.js Frontend
↓
Vercel Serverless API
├── Gemini API
└── Firebase

## Frontend
- Next.js 15
- Tailwind
- GSAP
- Framer Motion

## Backend
- Serverless Functions
- Session management
- AI orchestration
- PDF generation

## Data
Firestore collections:
- users
- sessions
- reports
- cases

```

---

## File: `RULES.md`

```md
# ShadowTrace — Development Rules

## Product Rules
- Ship one polished investigation.
- AI assists but never spoils.
- Every animation has purpose.

## UI Rules
- Generous whitespace.
- Oversized typography.
- Premium spacing.
- No RGB hacker clichés.

## Performance
- 60 FPS target.
- Lazy-load heavy assets.
- GPU transforms only.

## Git
- feature/*
- fix/*
- main

```

---

## File: `PHASES.md`

```md
# ShadowTrace — Development Phases

## Phase 0
Project setup.

## Phase 1
Cinematic landing.

## Phase 2
Case selection.

## Phase 3
Evidence board.

## Phase 4
Gemini integration.

## Phase 5
Timeline.

## Phase 6
Report generation.

## Phase 7
Polish and optimization.

```

---

## File: `MEMORY.md`

```md
# ShadowTrace — Project Memory

## Identity
- Name: ShadowTrace
- Tagline: Every clue tells a story.

## Permanent Decisions
- One polished investigation first.
- Premium dark theme.
- Gold accent only for discoveries.
- Cinematic scrolling remains central.

## Demo Flow
1. Homepage
2. Case
3. Evidence
4. AI analysis
5. Timeline
6. Download report

```

---

## File: `package.json`

```json
{
  "name": "shadow-trace",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@google/genai": "^2.24.0",
    "@react-pdf/renderer": "^4.9.0",
    "firebase": "^12.19.0",
    "framer-motion": "^13.4.2",
    "gsap": "^3.15.0",
    "lenis": "^1.3.26",
    "lucide-react": "^1.47.0",
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

---

## File: `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

```

---

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

---

## File: `firestore.rules`

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /cases/{caseId} {
      allow read: if true;
      allow write: if false;
    }
    match /clues/{clueId} {
      allow read: if true; 
      allow write: if false;
    }
    match /sessions/{sessionId} {
      // Allow user to read/write their own sessions
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      // Allow creation if the user matches the payload
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    match /reports/{reportId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}

```

---

## File: `src/app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #090909;
  --surface: #111111;
  --border: #2C2C2C;
  --text: #F2F0EB;
  --accent: #D4A95A;
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-text: var(--text);
  --color-accent: var(--accent);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
}

body {
  background: var(--background);
  color: var(--text);
}

html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

/* Custom sleek dark scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(17, 17, 17, 0.5);
}
::-webkit-scrollbar-thumb {
  background: rgba(212, 169, 90, 0.25);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 169, 90, 0.5);
}

```

---

## File: `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import Navigation from "@/components/Navigation";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadowTrace",
  description: "Every clue tells a story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <LenisProvider>
          <Navigation />
          <main className="flex-1 flex flex-col pt-24 pb-12 px-6 lg:px-24">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}

```

---

## File: `src/app/page.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  Globe, 
  ShieldAlert, 
  Fingerprint, 
  Activity, 
  Cpu, 
  Lock, 
  CheckCircle2, 
  Shield, 
  Radio, 
  ChevronDown 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const dossierCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Entrance Animation (Drift & Dissolve)
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(
          titleLine1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.1 }
        )
        .fromTo(
          titleLine2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ctaButtonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );

      // 2. Cinematic Scroll-Bound 3D Dossier Transition (Apple-Style Pinned Sequence)
      // Initial state of the procedural dossier card before scrolling
      gsap.set(dossierCardRef.current, {
        opacity: 0,
        scale: 0.75,
        rotationX: 25,
        y: 120,
        transformPerspective: 1200,
        transformOrigin: "center top",
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Step A: Hero text and CTA scale down slightly, fade out, and drift upward
      scrollTl
        .to(heroContentRef.current, {
          y: -90,
          opacity: 0,
          scale: 0.88,
          ease: "power2.inOut",
          duration: 1.6,
        }, 0)
        .to(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        }, 0)

        // Step B: Procedural 3D Dossier smoothly ascends into center view
        .to(dossierCardRef.current, {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          y: 0,
          ease: "power2.out",
          duration: 2.4,
        }, 0.5)

        // Step C: Subtle settle glow & focus
        .to(dossierCardRef.current, {
          boxShadow: "0 0 90px rgba(16, 185, 129, 0.22), 0 25px 60px rgba(0, 0, 0, 0.9)",
          duration: 1.0,
          ease: "none",
        }, 2.0);

    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background text-text select-none overflow-x-hidden">
      {/* Ambient background glow layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,9,0.7)_100%)]" />
      </div>

      {/* Main Full-Screen Pinned Section */}
      <section 
        ref={pinWrapperRef} 
        className="h-screen w-full relative flex items-center justify-center overflow-hidden z-10 [perspective:1200px]"
      >
        {/* ========================================================= */}
        {/* 1. INITIAL STATE: Centered Hero Text & CTA Button          */}
        {/* ========================================================= */}
        <div 
          ref={heroContentRef} 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-auto z-20 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full border border-border/60 bg-surface/40 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-accent">
            <Radio className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Encrypted Simulation Console • Clearance Level 4</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-6">
            <div ref={titleLine1Ref} className="opacity-0">Every clue</div>
            <div ref={titleLine2Ref} className="opacity-0">
              tells <span className="text-accent italic font-light">a story.</span>
            </div>
          </h1>

          <p 
            ref={descRef} 
            className="opacity-0 mt-6 text-text/60 text-base sm:text-xl md:text-2xl max-w-2xl font-light tracking-wide leading-relaxed"
          >
            Step into a cinematic cyber investigation simulator. Correlate network telemetry, intercept rogue transmissions, and reconstruct the breach.
          </p>

          <Link 
            href="/cases"
            ref={ctaButtonRef}
            className="opacity-0 mt-10 group flex items-center gap-4 border border-accent/40 hover:border-accent bg-surface/50 hover:bg-surface/80 px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg shadow-accent/10"
          >
            <span className="uppercase tracking-widest text-xs font-mono font-bold text-text group-hover:text-accent transition-colors">
              Begin Active Investigation
            </span>
            <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Scroll Hint */}
          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-10 flex flex-col items-center gap-2 opacity-0 text-text/40 font-mono text-[10px] uppercase tracking-widest pointer-events-none"
          >
            <span>Scroll to decrypt classified dossier</span>
            <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. THE PROCEDURAL DOSSIER CARD (Scroll-Bound 3D Entrance) */}
        {/* ========================================================= */}
        <div 
          ref={dossierCardRef} 
          className="absolute z-30 w-[92%] sm:w-[88%] max-w-4xl mx-auto rounded-2xl border border-emerald-500/40 bg-[#0d110f]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(16,185,129,0.14),0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden pointer-events-auto transition-shadow"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Card Top Glowing Border Strip */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500/20 via-accent to-emerald-500/20" />

          {/* Dossier Card Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-black/60 border-b border-emerald-950/60 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                TOP SECRET // SPECIAL ACCESS REQUIRED
              </span>
              <span className="text-text/30 hidden sm:inline">•</span>
              <span className="text-text/50 text-[10px] hidden sm:inline">REF: SHADOW-7702-PT</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-text/60">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span>CLASSIFICATION: LEVEL 4+</span>
            </div>
          </div>

          {/* Dossier Card Content Layout */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Title & Case Meta */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/40 pb-5">
              <div>
                <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-1.5 font-bold">
                  <Fingerprint className="w-4 h-4 text-accent" />
                  <span>Flagship Incident File #01</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl text-white tracking-tight">
                  The Phantom Protocol
                </h2>
                <p className="text-text/60 text-xs sm:text-sm font-light mt-1 max-w-xl">
                  Primary defense layer of Section 4 breached. An offshore adversary extracted cryptographic keyrings and is mobilizing for physical delivery.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-950/30 text-red-400 font-mono text-xs uppercase tracking-wider shrink-0">
                <ShieldAlert className="w-4 h-4" />
                <span>THREAT LEVEL: CRITICAL</span>
              </div>
            </div>

            {/* Classified OSINT Intelligence Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              {/* Target IP */}
              <div className="p-4 rounded-xl border border-emerald-950/80 bg-black/40 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between text-text/40 text-[10px] uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Target IP
                  </span>
                  <span className="text-emerald-400 font-bold">OFFSHORE C2</span>
                </div>
                <div className="text-lg font-bold text-emerald-300 font-mono tracking-wider">
                  10.5.22.1
                </div>
                <div className="text-[11px] text-text/60 mt-1">
                  Panama Relay • DarkNet Transit Group (AS9498)
                </div>
              </div>

              {/* Threat Syndicate */}
              <div className="p-4 rounded-xl border border-emerald-950/80 bg-black/40 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between text-text/40 text-[10px] uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    Syndicate
                  </span>
                  <span className="text-accent font-bold">ATTRIBUTED</span>
                </div>
                <div className="text-lg font-bold text-white font-mono tracking-wider">
                  The Silent Hand
                </div>
                <div className="text-[11px] text-text/60 mt-1">
                  Transnational Cyber-Espionage Collective
                </div>
              </div>

              {/* Physical Extraction */}
              <div className="p-4 rounded-xl border border-emerald-950/80 bg-black/40 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between text-text/40 text-[10px] uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Rendezvous
                  </span>
                  <span className="text-amber-400 font-bold">22:00 UTC</span>
                </div>
                <div className="text-lg font-bold text-emerald-300 font-mono tracking-wider">
                  Pier 42 Warehouse
                </div>
                <div className="text-[11px] text-text/60 mt-1">
                  37°48&apos;14.2&quot;N 122°16&apos;44.8&quot;W
                </div>
              </div>
            </div>

            {/* Live Telemetry Decrypt Snippet */}
            <div className="p-4 rounded-xl border border-border/50 bg-[#080b09] font-mono text-xs space-y-1.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-text/40 uppercase tracking-widest pb-1 border-b border-border/30">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-accent" />
                  RAW AUDIT LOG TRACE // PACKET DECOMPRESSION
                </span>
                <span className="text-emerald-400">INTEGRITY VERIFIED</span>
              </div>
              <p className="text-text/70 break-all leading-relaxed pt-1">
                <span className="text-text/40">13:55:36</span> <span className="text-amber-400">192.168.1.104</span> - GET /admin/secure/phantom <span className="text-red-400">401 UNAUTHORIZED</span>
              </p>
              <p className="text-text/70 break-all leading-relaxed">
                <span className="text-text/40">14:02:11</span> <span className="text-accent font-bold">10.5.22.1</span> - POST /api/v1/auth (Token: Operative-9) <span className="text-emerald-400">200 OK</span>
              </p>
              <p className="text-emerald-400/90 break-all leading-relaxed font-semibold">
                &gt; INTERCEPT: &quot;Package secured. Meet at extraction point Pier 42 at 22:00. Bring crypto drive.&quot;
              </p>
            </div>

            {/* Dossier Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-text/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3 Key Vectors Correlated • Ready for Deep Investigation</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/cases"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent text-background font-mono font-bold text-xs uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                >
                  <span>Launch Investigation Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supplementary Continuation Section */}
      <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto border-t border-border/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="p-6 rounded-2xl border border-border/40 bg-surface/20">
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4 mx-auto md:mx-0">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl mb-2 text-white">Authentic OSINT</h3>
            <p className="text-text/60 text-xs sm:text-sm font-light leading-relaxed">
              Trace IP addresses, port vulnerabilities, and rogue domain infrastructures using our realistic tactical command terminal.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/40 bg-surface/20">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 mx-auto md:mx-0">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl mb-2 text-white">Clearance Progression</h3>
            <p className="text-text/60 text-xs sm:text-sm font-light leading-relaxed">
              Solve classified cases to raise your clearance level, unlock advanced satellite reconnaissance missions, and claim senior operative dossiers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/40 bg-surface/20">
            <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4 mx-auto md:mx-0">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl mb-2 text-white">AI Deductions</h3>
            <p className="text-text/60 text-xs sm:text-sm font-light leading-relaxed">
              Interrogate ShadowTrace AI without fear of spoilers. Formulate tactical hypotheses and verify timeline correlations in real time.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-accent/50 bg-accent/10 text-accent hover:bg-accent hover:text-background font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>Proceed to Active Investigations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

```

---

## File: `src/app/cases/page.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { thePhantomProtocolCase, theOperationMidnightCase } from "@/lib/data/seed-case";
import { Case } from "@/lib/firebase/schema";
import { startSession } from "@/lib/firebase/actions";

export default function CasesPage() {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedCases, setCompletedCases] = useState<string[]>([]);
  const [clearanceLevel, setClearanceLevel] = useState<string>("4");
  const [operativeRank, setOperativeRank] = useState<string>("Cyber Investigator");
  const router = useRouter();

  useEffect(() => {
    const loadProgression = () => {
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("shadowtrace_completed") || "[]");
        const level = localStorage.getItem("shadowtrace_level") || "4";
        const rank = localStorage.getItem("shadowtrace_rank") || "Cyber Investigator";
        setCompletedCases(stored);
        setClearanceLevel(level);
        setOperativeRank(rank);
      }
    };

    loadProgression();
    window.addEventListener("shadowtrace-progression-updated", loadProgression);
    return () => window.removeEventListener("shadowtrace-progression-updated", loadProgression);
  }, []);

  const hasSolvedPhantom = completedCases.includes("phantom-protocol");
  const hasSolvedMidnight = completedCases.includes("operation-midnight");

  const caseList: (Case & { isLocked: boolean; isSolved: boolean; unlockTag?: string })[] = [
    {
      ...thePhantomProtocolCase,
      isLocked: false,
      isSolved: hasSolvedPhantom,
      unlockTag: hasSolvedPhantom ? "Case Solved // Archived" : "Active Flagship Case"
    },
    {
      ...theOperationMidnightCase,
      id: "operation-midnight",
      isLocked: !hasSolvedPhantom,
      isSolved: hasSolvedMidnight,
      unlockTag: hasSolvedMidnight 
        ? "Case Solved // Master Dossier" 
        : hasSolvedPhantom 
          ? "Level 5 Unlocked // Mission Ready" 
          : "Classified (Clearance L5 Req)"
    },
    {
      id: "locked-silk-road",
      title: "The Silk Road Reboot",
      description: "Dark web monitors have picked up chatter about a new marketplace. Infiltrate and identify the ringleader.",
      difficulty: "Hard",
      estimatedTime: 90,
      coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      briefingText: "",
      isLocked: true,
      isSolved: false,
      unlockTag: "Classified (Clearance L6 Req)"
    }
  ];

  const handleCaseSelect = (c: typeof caseList[0]) => {
    if (c.isLocked) return;
    setIsLoading(true);
    startSession(c.id).catch((err) => console.warn("Session tracking error:", err));
    router.push(`/investigation/${c.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Header with Operative Clearance Level Ribbon */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 mt-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>OPERATIVE CLEARANCE LEVEL {clearanceLevel}</span>
            <span className="text-text/40">•</span>
            <span className="text-text/80">{operativeRank}</span>
          </div>

          {hasSolvedPhantom && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>THE PHANTOM PROTOCOL SOLVED</span>
            </div>
          )}
        </div>

        <h1 className="font-display text-5xl md:text-7xl mb-4 tracking-tight">Active Investigations</h1>
        <p className="text-text/60 text-lg max-w-2xl font-light">
          {hasSolvedPhantom 
            ? "Clearance Level 5 verified. Operation Midnight transponders are now accessible for deep cyber reconnaissance."
            : "Select a dossier to begin. Complete The Phantom Protocol to earn Level 5 clearance and unlock deeper investigations."}
        </p>
      </motion.header>

      {/* Case Directory */}
      <div className="flex flex-col gap-8 flex-1">
        {caseList.map((c, index) => {
          const isHovered = hoveredCase === c.id;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              onHoverStart={() => setHoveredCase(c.id)}
              onHoverEnd={() => setHoveredCase(null)}
              onClick={() => handleCaseSelect(c)}
              className={`relative group border-b border-border/40 pb-8 overflow-hidden select-none transition-all ${
                c.isLocked 
                  ? "cursor-not-allowed opacity-45" 
                  : "cursor-pointer hover:border-accent/60"
              }`}
            >
              {/* Background Cover Image Reveal */}
              <AnimatePresence>
                {isHovered && !c.isLocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                  >
                    <Image
                      src={c.coverImage}
                      alt={c.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2 font-mono">
                    <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-semibold ${
                      c.isSolved
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : !c.isLocked
                          ? "bg-accent/15 text-accent border border-accent/40"
                          : "bg-surface text-text/40 border border-border/60"
                    }`}>
                      {c.unlockTag}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-text/40">
                      Difficulty: {c.difficulty}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-text/40">
                      Est: {c.estimatedTime}m
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl group-hover:text-accent transition-colors duration-500 flex items-center gap-3">
                    <span>{c.title}</span>
                    {c.isSolved && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    )}
                  </h2>
                </div>

                <div className="md:w-1/3">
                  <p className="text-text/70 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {c.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-end md:w-36 shrink-0">
                  {c.isLocked ? (
                    <div className="flex items-center gap-2 text-text/40 font-mono text-xs">
                      <Lock className="w-5 h-5 text-text/30" />
                      <span className="hidden sm:inline">Locked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                        {c.isSolved ? "Re-enter" : "Launch"}
                      </span>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors duration-500">
                        <ArrowRight className="w-5 h-5 text-text group-hover:text-accent transition-colors duration-500" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

```

---

## File: `src/app/investigation/[id]/page.tsx`

```tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, FolderOpen, Maximize2, X, Terminal, Clock, HelpCircle, ShieldAlert, CheckCircle2, ChevronRight, Trophy, ArrowRight, Award, ShieldCheck, Zap, RotateCcw } from "lucide-react";
import { thePhantomProtocolCase, phantomProtocolClues, theOperationMidnightCase, operationMidnightClues } from "@/lib/data/seed-case";
import { Clue } from "@/lib/firebase/schema";
import AIPanel from "@/components/AIPanel";
import OSINTTerminal from "@/components/OSINTTerminal";

function InvestigationContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawId = params?.id;
  const caseId = Array.isArray(rawId) ? rawId[0] : (rawId || "phantom-protocol");
  const sessionId = searchParams.get("session") || "session-active";
  const [activeTab, setActiveTab] = useState<"board" | "files" | "terminal" | "timeline">("board");
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [showBriefing, setShowBriefing] = useState<boolean>(true);
  const [reviewedClues, setReviewedClues] = useState<string[]>([]);
  const [osintTraced, setOsintTraced] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Dynamic case resolution based on route ID
  const isOperationMidnight = caseId === "operation-midnight" || caseId === "locked-1";
  const investigationCase = isOperationMidnight ? theOperationMidnightCase : thePhantomProtocolCase;
  const clues = isOperationMidnight ? operationMidnightClues : phantomProtocolClues;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("shadowtrace_completed") || "[]");
      if (stored.includes(investigationCase.id)) {
        setIsCompleted(true);
      }
    }
  }, [investigationCase.id]);

  const triggerCompletion = () => {
    setIsCompleted(true);
    if (typeof window !== "undefined") {
      const nextLevel = isOperationMidnight ? "6" : "5";
      const nextRank = isOperationMidnight ? "Master Cyber Director" : "Senior Cyber Investigator";
      localStorage.setItem("shadowtrace_level", nextLevel);
      localStorage.setItem("shadowtrace_rank", nextRank);
      const completed = JSON.parse(localStorage.getItem("shadowtrace_completed") || "[]");
      if (!completed.includes(investigationCase.id)) {
        completed.push(investigationCase.id);
        localStorage.setItem("shadowtrace_completed", JSON.stringify(completed));
      }
      window.dispatchEvent(new Event("shadowtrace-progression-updated"));
    }
    setTimeout(() => {
      setShowVictoryModal(true);
    }, 400);
  };

  const handleResetCase = () => {
    setReviewedClues([]);
    setOsintTraced(false);
    setIsCompleted(false);
    setShowVictoryModal(false);
    if (typeof window !== "undefined") {
      const completed = JSON.parse(localStorage.getItem("shadowtrace_completed") || "[]");
      const filtered = completed.filter((id: string) => id !== investigationCase.id);
      localStorage.setItem("shadowtrace_completed", JSON.stringify(filtered));
      if (filtered.length === 0) {
        localStorage.setItem("shadowtrace_level", "4");
        localStorage.setItem("shadowtrace_rank", "Cyber Investigator");
      }
      window.dispatchEvent(new Event("shadowtrace-progression-updated"));
    }
  };

  const handleOpenClue = (clue: Clue) => {
    setSelectedClue(clue);
    setReviewedClues(prev => {
      if (prev.includes(clue.id)) return prev;
      const updated = [...prev, clue.id];
      // STRICT REQUIREMENT: BOTH all clues examined AND OSINT traced
      if (updated.length >= clues.length && osintTraced && !isCompleted) {
        triggerCompletion();
      }
      return updated;
    });
  };

  const handleTraceComplete = (target: string) => {
    setOsintTraced(true);
    // STRICT REQUIREMENT: BOTH all clues examined AND OSINT traced
    if (reviewedClues.length >= clues.length && !isCompleted) {
      triggerCompletion();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-border/50">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl md:text-3xl tracking-tight">{investigationCase.title}</h1>
            <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-accent/10 border border-accent/30 text-accent rounded">
              Active Case
            </span>
            {isCompleted && (
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Solved
              </span>
            )}
          </div>
          <p className="text-text/50 text-xs mt-1 uppercase tracking-widest font-mono">
            Session: {sessionId} | Clearance: {isCompleted ? "Level 5 Senior Operative" : "Level 4 Operative"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {isCompleted ? (
            <Link 
              href={`/report?solved=${investigationCase.id}`}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent text-background hover:bg-accent/80 transition-all flex items-center gap-1.5 shadow-lg shadow-accent/20 animate-pulse font-mono font-bold"
            >
              <Trophy className="w-3.5 h-3.5" />
              Claim Level 5 Report →
            </Link>
          ) : (
            <button 
              onClick={() => setShowBriefing(true)}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full border border-accent/50 bg-accent/15 text-accent hover:bg-accent hover:text-background transition-all flex items-center gap-1.5 shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Field Guide
            </button>
          )}

          <button 
            onClick={handleResetCase}
            className="px-2.5 py-1.5 text-xs font-mono rounded-full border border-border/60 bg-surface/40 text-text/60 hover:text-red-400 hover:border-red-500/40 transition-colors flex items-center gap-1.5"
            title="Restart investigation and reset progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Case</span>
          </button>

          <button 
            onClick={() => setActiveTab("board")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-colors ${activeTab === "board" ? "bg-text text-background" : "bg-surface text-text hover:bg-surface/80"}`}
          >
            Evidence Board ({reviewedClues.length}/{clues.length})
          </button>
          <button 
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-colors flex items-center gap-1.5 ${activeTab === "terminal" ? "bg-accent text-background" : "bg-surface text-text hover:bg-surface/80"}`}
          >
            <Terminal className="w-3 h-3" /> OSINT {osintTraced ? "✓" : ""}
          </button>
          <button 
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-colors flex items-center gap-1.5 ${activeTab === "timeline" ? "bg-text text-background" : "bg-surface text-text hover:bg-surface/80"}`}
          >
            <Clock className="w-3 h-3" /> Timeline
          </button>
        </div>
      </header>

      {/* Operative Quick-Mission Ribbon */}
      <div className="bg-surface/40 border border-border/40 rounded-lg px-4 py-2.5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5 overflow-hidden font-mono text-xs">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isCompleted ? "bg-emerald-400" : "bg-accent"
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isCompleted ? "bg-emerald-400" : "bg-accent"
            }`}></span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-text/70 uppercase tracking-wider text-[11px]">CASE OBJECTIVES:</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
              reviewedClues.length >= clues.length 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                : "bg-surface text-accent border border-accent/40"
            }`}>
              {reviewedClues.length >= clues.length ? <CheckCircle2 className="w-3 h-3" /> : null}
              1. Clues ({reviewedClues.length}/{clues.length})
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
              osintTraced 
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
            }`}>
              {osintTraced ? <CheckCircle2 className="w-3 h-3" /> : null}
              2. OSINT Trace {osintTraced ? "Done" : "(Required)"}
            </span>
            {isCompleted && (
              <span className="text-emerald-400 font-bold ml-1">
                • CASE SOLVED!
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isCompleted ? (
            <button
              onClick={triggerCompletion}
              disabled={!(reviewedClues.length >= clues.length && osintTraced)}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded uppercase flex items-center gap-1.5 transition-all ${
                reviewedClues.length >= clues.length && osintTraced
                  ? "bg-accent text-background hover:bg-accent/80 cursor-pointer shadow-lg shadow-accent/20 animate-pulse"
                  : "bg-surface/50 text-text/30 border border-border/40 cursor-not-allowed"
              }`}
              title={
                reviewedClues.length >= clues.length && osintTraced
                  ? "All objectives verified! Click to conclude case."
                  : "Both objectives (1. Clues + 2. OSINT Trace) must be completed to close case."
              }
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{reviewedClues.length >= clues.length && osintTraced ? "Submit Findings & Complete Case" : "Complete Both Objectives"}</span>
            </button>
          ) : (
            <Link 
              href={`/report?solved=${investigationCase.id}`}
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1 font-bold"
            >
              View Final Report →
            </Link>
          )}

          <button 
            onClick={() => setShowBriefing(true)}
            className="text-xs font-mono text-text/60 hover:text-accent flex items-center gap-1 transition-colors"
          >
            Field Guide <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {/* Main Workspace Layout */}
      <div className="flex flex-1 gap-6 min-h-0">
        {/* Left Area (Board/Terminal/Files) */}
        <div className="flex-1 border border-border/50 bg-surface/30 rounded-xl relative overflow-hidden backdrop-blur-md flex flex-col">
          {activeTab === "board" && (
            <div className="p-8 h-full flex flex-wrap gap-6 items-start content-start overflow-y-auto">
              {clues.map((clue, idx) => {
                const isAnalyzed = reviewedClues.includes(clue.id);

                return (
                  <motion.div
                    key={clue.id}
                    layoutId={`clue-${clue.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleOpenClue(clue)}
                    className={`w-64 cursor-pointer group rounded-lg border bg-background/80 p-4 hover:shadow-lg transition-all ${
                      clue.isKeyDiscovery ? "border-accent/60 hover:border-accent" : "border-border hover:border-text/40"
                    } ${isAnalyzed ? "ring-1 ring-emerald-500/30" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-[10px] uppercase font-mono tracking-widest ${clue.isKeyDiscovery ? "text-accent" : "text-text/40"}`}>
                        {clue.type}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isAnalyzed ? (
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> ANALYZED
                          </span>
                        ) : (
                          <span className="text-[10px] text-accent/70 font-mono">UNEXAMINED</span>
                        )}
                        <Maximize2 className="w-3 h-3 text-text/30 group-hover:text-text/80 transition-colors ml-1" />
                      </div>
                    </div>
                    <h3 className={`font-medium text-sm line-clamp-2 ${clue.isKeyDiscovery ? "text-accent" : ""}`}>
                      {clue.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          )}
          
          {activeTab === "terminal" && (
            <OSINTTerminal onTraceComplete={handleTraceComplete} />
          )}

          {activeTab === "timeline" && (
            <div className="p-8 h-full flex flex-col gap-6 overflow-y-auto">
              <h2 className="font-display text-2xl mb-4">Investigation Timeline</h2>
              <div className="relative border-l border-border/50 ml-4 pl-6 space-y-8">
                {clues.map((clue, idx) => (
                  <motion.div 
                    key={clue.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[31px] top-1 w-3 h-3 rounded-full ${clue.isKeyDiscovery ? "bg-accent" : "bg-border"} ring-4 ring-background`} />
                    <span className="text-xs uppercase tracking-widest text-text/40 mb-1 block">
                      Evidence Discovered
                    </span>
                    <h3 className={`text-lg font-medium ${clue.isKeyDiscovery ? "text-accent" : ""}`}>
                      {clue.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Area (AI Panel Placeholder) */}
        <div className="w-[400px] border border-border/50 bg-surface/30 rounded-xl flex flex-col backdrop-blur-md overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-background/50 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
              <Search className="w-4 h-4 text-accent" />
              AI Assistant
            </h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <AIPanel caseDetails={investigationCase} cluesFound={clues} />
          </div>
        </div>
      </div>

      {/* Clue Detail Modal */}
      <AnimatePresence>
        {selectedClue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-background/80 backdrop-blur-sm">
            <motion.div 
              layoutId={`clue-${selectedClue.id}`}
              className={`w-full max-w-3xl max-h-full overflow-y-auto border bg-surface p-8 shadow-2xl relative ${
                selectedClue.isKeyDiscovery ? "border-accent/60" : "border-border"
              }`}
            >
              <button 
                onClick={() => setSelectedClue(null)}
                className="absolute top-6 right-6 text-text/50 hover:text-text"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-8">
                <span className={`text-xs uppercase font-mono tracking-widest ${selectedClue.isKeyDiscovery ? "text-accent" : "text-text/50"}`}>
                  Evidence ID: {selectedClue.id} • Type: {selectedClue.type}
                </span>
                <h2 className={`font-display text-4xl mt-4 ${selectedClue.isKeyDiscovery ? "text-accent" : ""}`}>
                  {selectedClue.title}
                </h2>
              </div>
              
              <div className="prose prose-invert max-w-none font-mono text-sm">
                {selectedClue.type === "image" ? (
                  <img src={selectedClue.content} alt={selectedClue.title} className="w-full h-auto rounded border border-border/50" />
                ) : (
                  <pre className="bg-background p-6 rounded whitespace-pre-wrap border border-border/30">
                    {selectedClue.content}
                  </pre>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Operative Mission Briefing & Beginner Field Guide Modal */}
      <AnimatePresence>
        {showBriefing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-accent/40 bg-surface p-6 md:p-8 rounded-xl shadow-2xl relative"
            >
              <button
                onClick={() => setShowBriefing(false)}
                className="absolute top-5 right-5 text-text/40 hover:text-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-accent text-xs font-mono tracking-widest uppercase mb-2">
                <ShieldAlert className="w-4 h-4" />
                Classified Case Briefing • Clearance L4
              </div>

              <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-3">
                {investigationCase.title}
              </h2>

              <p className="text-text/70 text-sm leading-relaxed mb-6 font-light">
                {investigationCase.briefingText}
              </p>

              {/* Beginner Roadmap */}
              <div className="border border-border/60 bg-background/60 rounded-lg p-5 mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Investigation Protocol (Beginner&apos;s Guide)
                </h3>
                <div className="space-y-3 text-xs text-text/80 font-mono">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center shrink-0 font-bold">1</span>
                    <div>
                      <strong className="text-text">Inspect Evidence Board:</strong> Click on each clue card to read raw access logs, intercepted emails, and aerial surveillance photos.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center shrink-0 font-bold">2</span>
                    <div>
                      <strong className="text-text">Correlate Anomalies:</strong> In <span className="text-accent">Server Access Logs</span>, identify rogue IP <code className="bg-surface px-1 py-0.5 rounded text-accent">10.5.22.1</code> and its connection to the syndicate <span className="text-text font-bold">&quot;The Silent Hand&quot;</span>.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center shrink-0 font-bold">3</span>
                    <div>
                      <strong className="text-text">Interrogate ShadowTrace AI:</strong> Use the tactical assistant on the right panel. Click the starter chips or type custom queries to verify deductions without spoilers.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center shrink-0 font-bold">4</span>
                    <div>
                      <strong className="text-text">Reconstruct Timeline:</strong> Switch to the <span className="text-text font-bold">Timeline</span> tab to establish the chronological sequence leading up to the 22:00 exchange.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center shrink-0 font-bold">5</span>
                    <div>
                      <strong className="text-text">Compile Official Dossier:</strong> Navigate to <span className="text-text font-bold">Case Reports</span> in the navigation bar to download your official PDF findings.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-text/40">
                  Tip: Reopen this guide anytime via the &quot;Field Guide&quot; button.
                </span>
                <button
                  onClick={() => setShowBriefing(false)}
                  className="bg-accent text-background font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-accent/80 transition-colors shadow-lg"
                >
                  Enter Console
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Victory / Case Cracked & Clearance Promotion Modal */}
      <AnimatePresence>
        {showVictoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl border-2 border-emerald-500/60 bg-[#080d08] p-6 md:p-8 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.2)] relative text-text overflow-hidden"
            >
              {/* Scanline glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-500/5 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>CASE FILE CLOSED // EVIDENCE VERIFIED</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                    PROMOTION APPROVED
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="font-display text-3xl md:text-5xl tracking-tight text-white mb-2">
                  {investigationCase.title}
                </h2>
                <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  STATUS: PERPETRATOR IDENTIFIED &amp; THREAT NEUTRALIZED
                </p>

                {/* Level Promotion Banner */}
                <div className="p-4 rounded-xl border border-accent/40 bg-accent/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block">
                      Clearance Accreditation Upgrade
                    </span>
                    <div className="text-xl md:text-2xl font-display font-bold text-white mt-0.5 flex items-center gap-2">
                      <span className="text-text/40 line-through">LEVEL 4</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                      <span className="text-accent">{isOperationMidnight ? "LEVEL 6" : "LEVEL 5"} OPERATIVE</span>
                    </div>
                    <span className="text-xs font-mono text-text/70">
                      Rank: {isOperationMidnight ? "Master Cyber Director" : "Senior Cyber Investigator"} • Next Mission Dossier Unlocked
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 border border-accent text-accent shadow-[0_0_20px_rgba(200,255,0,0.3)]">
                    <Trophy className="w-7 h-7" />
                  </div>
                </div>

                {/* Key Findings Recap */}
                <div className="border border-border/60 bg-black/40 rounded-xl p-4 mb-6 space-y-2 text-xs font-mono">
                  <div className="text-text/50 uppercase tracking-widest text-[10px] mb-2 font-bold">
                    INVESTIGATION DEBRIEF SUMMARY:
                  </div>
                  <div className="flex items-start gap-2 text-text/90">
                    <span className="text-emerald-400 font-bold shrink-0">[✓]</span>
                    <span>Correlated breach token to rogue internal workstation (192.168.1.104).</span>
                  </div>
                  <div className="flex items-start gap-2 text-text/90">
                    <span className="text-emerald-400 font-bold shrink-0">[✓]</span>
                    <span>Traced C2 command relay to offshore bulletproof host (10.5.22.1).</span>
                  </div>
                  <div className="flex items-start gap-2 text-text/90">
                    <span className="text-emerald-400 font-bold shrink-0">[✓]</span>
                    <span>Discovered physical rendezvous and rendezvous time (Pier 42, 22:00 UTC).</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-2">
                  <button
                    onClick={() => setShowVictoryModal(false)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-border text-text/60 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Inspect Console
                  </button>
                  <Link
                    href={`/report?solved=${investigationCase.id}`}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-accent text-background font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent/80 transition-all shadow-lg shadow-accent/20"
                  >
                    <span>Extract Dossier &amp; Proceed</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InvestigationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center flex-1 h-full min-h-[50vh] text-text/50 font-mono text-sm">
        <span className="animate-pulse">INITIALIZING TACTICAL CONSOLE...</span>
      </div>
    }>
      <InvestigationContent />
    </Suspense>
  );
}

```

---

## File: `src/app/report/page.tsx`

```tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "@/components/ReportPDF";
import { thePhantomProtocolCase, phantomProtocolClues, theOperationMidnightCase, operationMidnightClues } from "@/lib/data/seed-case";
import { Download, ArrowRight, ShieldCheck, Trophy, Award, CheckCircle2, FileText, ChevronRight } from "lucide-react";

function ReportContent() {
  const [isClient, setIsClient] = useState(false);
  const [completedCases, setCompletedCases] = useState<string[]>([]);
  const [clearanceLevel, setClearanceLevel] = useState<string>("4");
  const [operativeRank, setOperativeRank] = useState<string>("Cyber Investigator");
  const searchParams = useSearchParams();
  const justSolvedId = searchParams.get("solved");

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedCompleted = JSON.parse(localStorage.getItem("shadowtrace_completed") || "[]");
      const storedLevel = localStorage.getItem("shadowtrace_level") || "4";
      const storedRank = localStorage.getItem("shadowtrace_rank") || "Cyber Investigator";

      // If arrived via ?solved query, ensure it is recorded in completed cases
      if (justSolvedId && !storedCompleted.includes(justSolvedId)) {
        storedCompleted.push(justSolvedId);
        localStorage.setItem("shadowtrace_completed", JSON.stringify(storedCompleted));
        const updatedLevel = justSolvedId === "operation-midnight" ? "6" : "5";
        const updatedRank = justSolvedId === "operation-midnight" ? "Master Cyber Director" : "Senior Cyber Investigator";
        localStorage.setItem("shadowtrace_level", updatedLevel);
        localStorage.setItem("shadowtrace_rank", updatedRank);
        setClearanceLevel(updatedLevel);
        setOperativeRank(updatedRank);
        window.dispatchEvent(new Event("shadowtrace-progression-updated"));
      } else {
        setClearanceLevel(storedLevel);
        setOperativeRank(storedRank);
      }
      setCompletedCases(storedCompleted);
    }
  }, [justSolvedId]);

  const hasSolvedPhantom = completedCases.includes("phantom-protocol") || justSolvedId === "phantom-protocol";
  const hasSolvedMidnight = completedCases.includes("operation-midnight") || justSolvedId === "operation-midnight";

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full pb-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 mt-4"
      >
        <div className="flex items-center gap-3 text-xs font-mono text-accent uppercase tracking-widest mb-2">
          <FileText className="w-4 h-4" />
          <span>Department of Cyber Intelligence // Dossier Extraction</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl tracking-tight">Case Reports &amp; Dossiers</h1>
        <p className="text-text/60 text-sm md:text-base mt-2 max-w-2xl font-light">
          Official post-operation debriefs and cryptographically signed intelligence dossiers for verified operatives.
        </p>
      </motion.div>

      {/* Operative Clearance Status Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 md:p-8 rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/15 via-surface/80 to-surface/40 backdrop-blur-md mb-10 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Trophy className="w-48 h-48 text-accent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                OPERATIVE STATUS CONFIRMED
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                CLEARANCE LEVEL {clearanceLevel}
              </h2>
              <span className="text-xs font-mono text-accent bg-accent/20 border border-accent/30 px-2.5 py-0.5 rounded-full font-semibold">
                {operativeRank}
              </span>
            </div>
            <p className="text-text/70 text-xs md:text-sm font-mono mt-2">
              Cases Solved: {completedCases.length} | Authorization: {hasSolvedPhantom ? "Unlocked Level 5 Missions (Operation Midnight Ready)" : "Active on Flagship Assignment"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/cases"
              className="px-5 py-3 rounded-full bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              <span>{hasSolvedPhantom ? "Launch Operation Midnight" : "Return to Case Dossiers"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Dossier Cards Grid */}
      <div className="space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-text/50">
          Available Intelligence Dossiers ({completedCases.length > 0 ? "Verified" : "Pending"})
        </h3>

        {/* Case 1: The Phantom Protocol */}
        <div className={`border rounded-xl p-6 md:p-8 backdrop-blur-md transition-all ${
          hasSolvedPhantom 
            ? "border-emerald-500/40 bg-surface/40 hover:border-emerald-500/70" 
            : "border-border/40 bg-surface/20"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded font-bold ${
                  hasSolvedPhantom
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-accent/10 text-accent border border-accent/30"
                }`}>
                  {hasSolvedPhantom ? "Case Solved // Verified" : "Dossier In Progress"}
                </span>
                <span className="text-xs font-mono text-text/40">Difficulty: Medium</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl mb-2 text-white">{thePhantomProtocolCase.title}</h2>
              <p className="text-text/70 text-sm max-w-xl font-light leading-relaxed">
                Breach identified at Section 4 primary defense layer. IP 10.5.22.1 traced to &apos;The Silent Hand&apos; C2 server. Physical exchange at Pier 42 warehouse mapped.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {isClient ? (
                <PDFDownloadLink 
                  document={<ReportPDF investigationCase={thePhantomProtocolCase} clues={phantomProtocolClues} />} 
                  fileName={`dossier-${thePhantomProtocolCase.id}.pdf`}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full hover:bg-emerald-400 transition-colors font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/10"
                >
                  {({ loading }) => (
                    <>
                      <Download className="w-4 h-4" />
                      {loading ? "Compiling PDF..." : "Download Dossier PDF"}
                    </>
                  )}
                </PDFDownloadLink>
              ) : (
                <button className="flex items-center gap-2 bg-surface text-text/50 px-6 py-3 rounded-full font-mono text-xs tracking-wide uppercase border border-border" disabled>
                  <Download className="w-4 h-4" />
                  Loading PDF Engine...
                </button>
              )}

              <Link
                href="/investigation/phantom-protocol"
                className="w-full sm:w-auto px-4 py-3 rounded-full border border-border/80 text-text/70 hover:text-white hover:border-text/60 font-mono text-xs uppercase tracking-wider text-center transition-colors"
              >
                Revisit Console
              </Link>
            </div>
          </div>
        </div>

        {/* Case 2: Operation Midnight */}
        <div className={`border rounded-xl p-6 md:p-8 backdrop-blur-md transition-all ${
          hasSolvedMidnight
            ? "border-emerald-500/40 bg-surface/40"
            : hasSolvedPhantom
              ? "border-accent/40 bg-accent/5 hover:border-accent/70"
              : "border-border/30 bg-surface/10 opacity-60"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded font-bold ${
                  hasSolvedMidnight
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : hasSolvedPhantom
                      ? "bg-accent/20 text-accent border border-accent/40"
                      : "bg-surface text-text/40 border border-border"
                }`}>
                  {hasSolvedMidnight 
                    ? "Case Solved // Master Verified" 
                    : hasSolvedPhantom 
                      ? "Level 5 Mission Unlocked" 
                      : "Clearance Level 5 Required"}
                </span>
                <span className="text-xs font-mono text-text/40">Difficulty: Hard</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl mb-2 text-white">{theOperationMidnightCase.title}</h2>
              <p className="text-text/70 text-sm max-w-xl font-light leading-relaxed">
                Rogue high-frequency telemetry burst intercepted across military satellite transponders. Track orbital trajectory and decrypt ground terminal uplink.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {hasSolvedPhantom ? (
                isClient && hasSolvedMidnight ? (
                  <PDFDownloadLink 
                    document={<ReportPDF investigationCase={theOperationMidnightCase} clues={operationMidnightClues} />} 
                    fileName={`dossier-${theOperationMidnightCase.id}.pdf`}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full hover:bg-emerald-400 transition-colors font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/10"
                  >
                    {({ loading }) => (
                      <>
                        <Download className="w-4 h-4" />
                        {loading ? "Compiling PDF..." : "Download Dossier PDF"}
                      </>
                    )}
                  </PDFDownloadLink>
                ) : (
                  <Link
                    href="/investigation/operation-midnight"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-full hover:bg-accent/80 transition-colors font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-accent/20"
                  >
                    <span>Launch Investigation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )
              ) : (
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 text-text/40 font-mono text-xs">
                  <span>Solve Phantom Protocol to Unlock</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh] text-text/50 font-mono text-sm">
        <span className="animate-pulse">DECRYPTING INTELLIGENCE DOSSIERS...</span>
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}

```

---

## File: `src/app/api/gemini/route.ts`

```ts
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { messages, caseDetails, cluesFound } = await req.json();

    const userMessage = messages[messages.length - 1]?.content || "Provide an investigation status report.";
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const systemPrompt = `You are ShadowTrace AI, a tactical cyber intelligence simulator assistant.
CURRENT CASE: ${caseDetails?.title || "The Phantom Protocol"}
MISSION BRIEFING: ${caseDetails?.briefingText || "Investigate the unauthorized breach into Section 4."}

DISCOVERED EVIDENCE:
${(cluesFound || []).map((c: any) => `- [${c.type.toUpperCase()}] ${c.title}: ${c.content}`).join("\n")}

STRICT INSTRUCTIONS:
1. NEVER reveal the culprit's identity directly. Prompt the operative to review specific evidence (e.g. server logs, IP addresses, proxy networks).
2. Answer questions accurately based on the case facts, server logs (IP 10.5.22.1, proxy 'The Silent Hand', 22:00 warehouse extraction).
3. Maintain a cinematic, professional operative tone (2-4 sentences max).
4. If asked what to do, give a clear, tactical hint about which clue to examine next.`;

    if (!apiKey) {
      const mockResponse = "ShadowTrace Neural Link: API key is not configured. Please verify your GEMINI_API_KEY in .env.local.";
      return new Response(mockResponse, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Prioritized list of active Gemini models
    const candidateModels = [
      "gemini-3.5-flash-lite",
      "gemini-3.6-flash",
      "gemini-flash-latest",
      "gemini-3.7-flash"
    ];

    let fullText = "";

    for (const model of candidateModels) {
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents: [
            ...history,
            { role: "user", parts: [{ text: `${systemPrompt}\n\nOperative Query: ${userMessage}` }] }
          ],
          config: {
            temperature: 0.3,
          }
        });

        const readable = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of stream) {
                if (chunk.text) {
                  controller.enqueue(new TextEncoder().encode(chunk.text));
                }
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          }
        });

        return new Response(readable, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          }
        });
      } catch (err: any) {
        console.warn(`Model ${model} stream unavailable (${err?.status || err?.message}), attempting alternative...`);
      }
    }

    // Secondary fallback: Non-streaming generateContent
    for (const model of candidateModels) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: `${systemPrompt}\n\nOperative Query: ${userMessage}`
        });
        if (res.text) {
          fullText = res.text;
          break;
        }
      } catch (err) {
        console.warn(`Model ${model} generateContent unavailable:`, err);
      }
    }

    if (fullText) {
      return new Response(fullText, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    // In-character tactical fallback if all Google servers report high demand (503)
    const tacticalFallback = generateTacticalFallback(userMessage);
    return new Response(tacticalFallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(
      "ShadowTrace AI: Neural buffer overloaded. Hint: Focus on the unauthorized POST request to /api/v1/auth from IP 10.5.22.1.",
      { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
}

function generateTacticalFallback(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("silent hand") || q.includes("who")) {
    return "ShadowTrace Intel: 'The Silent Hand' is an offshore syndication known for proxy-routing cyber intrusions. Cross-reference their relay server logs with the intercepted email regarding the 22:00 package extraction.";
  }
  if (q.includes("log") || q.includes("ip") || q.includes("server")) {
    return "ShadowTrace Intel: Notice the 401 unauthorized access at 13:55, followed immediately by an authenticated POST from IP 10.5.22.1. This indicates an internal credential compromise.";
  }
  if (q.includes("extract") || q.includes("meet") || q.includes("where") || q.includes("warehouse")) {
    return "ShadowTrace Intel: Visual surveillance indicates an abandoned industrial warehouse at the harbor front designated for the 22:00 exchange. Ensure all crypto drives are logged.";
  }
  if (q.includes("hint") || q.includes("step") || q.includes("what to do") || q.includes("help") || q.includes("objective")) {
    return "ShadowTrace Intel: Operative, your priority is to correlate the rogue IP 10.5.22.1 with the intercepted communications in Evidence Clue #3, then pinpoint the physical rendezvous point in Clue #4.";
  }
  return "ShadowTrace AI: Analysis in progress. Digital forensic markers confirm an external intrusion via an offshore relay. Examine the Server Access Logs and verify the intercepted email timestamps.";
}

```

---

## File: `src/components/Navigation.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [level, setLevel] = useState<string>("4");

  useEffect(() => {
    const updateLevel = () => {
      if (typeof window !== "undefined") {
        setLevel(localStorage.getItem("shadowtrace_level") || "4");
      }
    };
    updateLevel();
    window.addEventListener("shadowtrace-progression-updated", updateLevel);
    return () => window.removeEventListener("shadowtrace-progression-updated", updateLevel);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 text-text backdrop-blur-md bg-background/50 border-b border-border/20">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-display text-2xl font-semibold tracking-wide hover:text-accent transition-colors">
          ShadowTrace
        </Link>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-[10px] font-mono tracking-wider text-accent uppercase font-bold">
          <Shield className="w-3 h-3 text-accent" />
          <span>LVL {level} OPERATIVE</span>
        </div>
      </div>
      
      <nav className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
        <Link 
          href="/cases" 
          className={`hover:text-accent transition-colors ${pathname.startsWith("/cases") ? "text-accent" : "text-text/70"}`}
        >
          Cases
        </Link>
        <Link 
          href="/report" 
          className={`hover:text-accent transition-colors ${pathname.startsWith("/report") ? "text-accent" : "text-text/70"}`}
        >
          Reports
        </Link>
      </nav>
    </header>
  );
}

```

---

## File: `src/components/AIPanel.tsx`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIPanelProps {
  caseDetails: any;
  cluesFound: any[];
}

export default function AIPanel({ caseDetails, cluesFound }: AIPanelProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "I am ShadowTrace AI. I have analyzed the initial briefing. How can I assist your investigation?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: queryText }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: queryText }],
          caseDetails,
          cluesFound
        })
      });

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      let done = false;
      let aiText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          aiText += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = aiText;
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("AI interaction error:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "ShadowTrace Tactical Assist: Focus on IP 10.5.22.1 in the Server Access Logs and cross-reference with Evidence #2."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  const starterChips = [
    { label: "🎯 Mission Objective", query: "What is my primary mission objective for this case?" },
    { label: "🔍 Analyze Logs", query: "Analyze the Server Access Logs and highlight anomalies." },
    { label: "🌐 The Silent Hand", query: "What intel do we have on 'The Silent Hand'?" },
    { label: "💡 Tactical Hint", query: "Give me a hint on what evidence to inspect next." },
  ];

  return (
    <div className="flex flex-col h-full bg-surface/20">
      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[88%] p-3 rounded-lg text-sm leading-relaxed ${
              m.role === "user" 
                ? "bg-text text-background rounded-tr-none font-medium" 
                : "bg-background/90 border border-border/60 rounded-tl-none font-mono text-text/90 shadow-sm"
            }`}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex justify-start"
          >
            <div className="bg-background/90 border border-border/60 p-3 rounded-lg rounded-tl-none flex items-center gap-2 text-accent">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs uppercase tracking-widest font-mono">Analyzing intelligence...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompt Chips for Beginners */}
      <div className="px-4 py-2 border-t border-border/30 bg-background/40">
        <p className="text-[10px] uppercase font-mono tracking-widest text-text/40 mb-2">Tactical Queries</p>
        <div className="flex flex-wrap gap-1.5">
          {starterChips.map((chip, i) => (
            <button
              key={i}
              type="button"
              disabled={isTyping}
              onClick={() => sendQuery(chip.query)}
              className="text-[11px] font-mono px-2.5 py-1 rounded border border-border/50 hover:border-accent hover:text-accent bg-surface/50 text-text/70 transition-colors disabled:opacity-40 text-left"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-border/50 bg-background/70">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask ShadowTrace AI for analysis..."
            className="w-full bg-surface border border-border/60 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50 font-mono text-xs"
          />
          <button 
            type="submit" 
            disabled={isTyping || !input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-accent/15 text-accent hover:bg-accent hover:text-background transition-colors disabled:opacity-40"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}

```

---

## File: `src/components/OSINTTerminal.tsx`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, ArrowRight, CornerDownLeft, Sparkles, Trash2 } from "lucide-react";

interface TerminalLine {
  type: "system" | "user" | "success" | "error" | "warning" | "intel";
  text: string;
}

interface OSINTTerminalProps {
  onTraceComplete?: (intelKey: string) => void;
}

export default function OSINTTerminal({ onTraceComplete }: OSINTTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", text: "ShadowTrace Tactical OSINT v3.4 [Relay: SECURE_TUNNEL_09]" },
    { type: "system", text: "Type 'help' for command syntax, or enter an IP / domain to analyze." },
    { type: "intel", text: "OPERATIVE DIRECTIVE: Use raw server logs to identify and trace target IPs." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isProcessing]);

  const executeCommand = async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query || isProcessing) return;

    setInput("");
    setIsProcessing(true);

    // Append user command to history
    setHistory(prev => [...prev, { type: "user", text: `> ${query}` }]);

    const lower = query.toLowerCase();

    // Simulate cyber terminal processing latency
    setTimeout(() => {
      if (lower === "clear" || lower === "cls") {
        setHistory([
          { type: "system", text: "ShadowTrace Tactical OSINT v3.4 [Console Cleared]" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "help") {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "COMMAND DIRECTORY:" },
          { type: "system", text: "  trace <ip>       - Trace network route, ASN & geolocation (e.g. trace 10.5.22.1)" },
          { type: "system", text: "  scan <ip>        - Run port vulnerability audit (e.g. scan 192.168.1.104)" },
          { type: "system", text: "  whois <target>   - Retrieve registry & owner intelligence (e.g. whois 10.5.22.1)" },
          { type: "system", text: "  intel <keyword>  - Query classified threat database (e.g. intel Silent Hand)" },
          { type: "system", text: "  clear            - Wipe current terminal screen" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "trace") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Target IP address required." },
          { type: "system", text: "Example: trace 10.5.22.1" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "scan") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Target IP address required." },
          { type: "system", text: "Example: scan 192.168.1.104" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "whois") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Hostname or IP required." },
          { type: "system", text: "Example: whois 10.5.22.1" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower === "intel") {
        setHistory(prev => [
          ...prev,
          { type: "warning", text: "Syntax Error: Keyword required." },
          { type: "system", text: "Example: intel Silent Hand" }
        ]);
        setIsProcessing(false);
        return;
      }

      if (lower.includes("10.5.22.1")) {
        setHistory(prev => [
          ...prev,
          { type: "system", text: "[*] Initiating deep packet trace to 10.5.22.1..." },
          { type: "system", text: "    Hop 1: 192.168.1.1 [Internal Gateway] (0.4ms)" },
          { type: "system", text: "    Hop 2: 172.16.4.254 [Defense Perimeter Firewall] (1.1ms)" },
          { type: "system", text: "    Hop 3: 185.220.101.4 [Anonymizing Relay / Tor Node] (24.8ms)" },
          { type: "warning", text: "    Hop 4: 10.5.22.1 [DESTINATION - OFFSHORE HOSTING]" },
          { type: "intel", text: "=== WHOIS INTELLIGENCE REPORT ===" },
          { type: "system", text: "  Host Name: relay-04.silent-hand.net" },
          { type: "system", text: "  ASN: AS9498 (DarkNet Transit Group)" },
          { type: "system", text: "  Country: Panama [Offshore Bulletproof Hosting]" },
          { type: "system", text: "  Open Ports: 22 (SSH), 443 (HTTPS), 8080 (Encrypted Proxy)" },
          { type: "error", text: "  THREAT LEVEL: CRITICAL" },
          { type: "success", text: "  DEDUCTION: Confirmed primary command-and-control server operated by 'The Silent Hand'." }
        ]);
        onTraceComplete?.("10.5.22.1");
        setIsProcessing(false);
        return;
      }

      if (lower.includes("192.168.1.104")) {
        setHistory(prev => [
          ...prev,
          { type: "system", text: "[*] Scanning internal subnet address 192.168.1.104..." },
          { type: "system", text: "  Device: SEC4-WORKSTATION-09" },
          { type: "system", text: "  Subnet: Section 4 Government Internal Intranet" },
          { type: "system", text: "  Active Session: Operative-9 (Stolen Token)" },
          { type: "warning", text: "  Audit Event: 14:02:11 POST /api/v1/auth HTTP/1.1 (200 OK)" },
          { type: "success", text: "  DEDUCTION: Internal terminal compromised via stolen admin authentication token." }
        ]);
        onTraceComplete?.("192.168.1.104");
        setIsProcessing(false);
        return;
      }

      if (lower.includes("silent hand") || lower.includes("syndicate")) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "=== DOSSIER: THE SILENT HAND ===" },
          { type: "system", text: "  Classification: Transnational Cyber-Espionage Collective" },
          { type: "system", text: "  Target: Defense Protocols & Cryptographic Keyrings" },
          { type: "system", text: "  Intercepted Comms: 'Meet at extraction point at 22:00. Bring crypto drive.'" },
          { type: "warning", text: "  Physical Rendezvous: Abandoned Industrial Warehouse, Harbor Basin." },
          { type: "success", text: "  STATUS: Ready to finalize dossier for Case Report." }
        ]);
        onTraceComplete?.("silent-hand");
        setIsProcessing(false);
        return;
      }

      if (lower.includes("warehouse") || lower.includes("extraction") || lower.includes("location") || lower.includes("rendezvous")) {
        setHistory(prev => [
          ...prev,
          { type: "intel", text: "=== SATELLITE & SURVEILLANCE MATCH ===" },
          { type: "system", text: "  Coordinates: 37°48'14.2\"N 122°16'44.8\"W" },
          { type: "system", text: "  Location: Pier 42 Abandoned Industrial Cargo Facility" },
          { type: "system", text: "  Scheduled Time: 22:00 UTC (Today)" },
          { type: "success", text: "  Target Operative-9 confirmed en route with encrypted hardware drive." }
        ]);
        onTraceComplete?.("warehouse");
        setIsProcessing(false);
        return;
      }

      // Default contextual query responder
      setHistory(prev => [
        ...prev,
        { type: "system", text: `[*] Querying global intelligence relays for '${query}'...` },
        { type: "warning", text: "No direct match. Type 'help' for command syntax." }
      ]);
      setIsProcessing(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0f0a] font-mono text-xs md:text-sm text-green-400 select-text overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-green-900/40 bg-black/50 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-xs uppercase tracking-widest text-green-500 font-bold">
            OSINT Intelligence Console
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-green-500/60 uppercase hidden sm:inline">
            STATUS: <span className="text-green-400 font-bold animate-pulse">CONNECTED</span>
          </span>
          <button
            onClick={() => executeCommand("help")}
            className="px-2.5 py-1 rounded border border-green-900/80 bg-green-950/40 text-green-400 hover:bg-green-500 hover:text-black text-[11px] font-mono transition-colors"
          >
            help
          </button>
          <button
            onClick={() => executeCommand("clear")}
            className="p-1 text-green-500/40 hover:text-green-400 transition-colors"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output Console Logs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 leading-relaxed">
        {history.map((line, idx) => {
          let colorClass = "text-green-400/90";
          if (line.type === "user") colorClass = "text-accent font-bold";
          else if (line.type === "error") colorClass = "text-red-400 font-bold";
          else if (line.type === "warning") colorClass = "text-amber-400";
          else if (line.type === "intel") colorClass = "text-cyan-300 font-bold";
          else if (line.type === "success") colorClass = "text-emerald-300 font-bold";

          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap break-all`}>
              {line.text}
            </div>
          );
        })}

        {isProcessing && (
          <div className="text-green-400 flex items-center gap-2 animate-pulse">
            <span>&gt; Processing OSINT packet...</span>
          </div>
        )}

        <div ref={terminalBottomRef} />
      </div>

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-green-900/40 bg-black/60 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold text-sm shrink-0">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder="Enter command (e.g. trace 10.5.22.1, scan 192.168.1.104, whois)..."
            className="bg-transparent border-none outline-none flex-1 text-green-400 placeholder:text-green-900/60 font-mono text-xs md:text-sm"
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="px-3.5 py-1.5 rounded bg-green-500 text-black font-bold text-xs flex items-center gap-1 hover:bg-green-400 transition-colors disabled:opacity-30 shrink-0"
          >
            <span>SEND</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}

```

---

## File: `src/components/ReportPDF.tsx`

```tsx
"use client";

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Case, Clue } from '@/lib/firebase/schema';

// Styles for the PDF dossier
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#090909',
    padding: 40,
    color: '#F2F0EB',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4A95A',
    paddingBottom: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#D4A95A',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    color: '#F2F0EB',
    opacity: 0.6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#D4A95A',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#F2F0EB',
  },
  clueItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#111111',
    borderLeftWidth: 2,
    borderLeftColor: '#D4A95A',
  },
  clueTitle: {
    fontSize: 12,
    color: '#F2F0EB',
    marginBottom: 5,
  },
  clueContent: {
    fontSize: 9,
    color: '#F2F0EB',
    opacity: 0.8,
  }
});

interface ReportPDFProps {
  investigationCase: Case;
  clues: Clue[];
}

export const ReportPDF = ({ investigationCase, clues }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>OFFICIAL DOSSIER: {investigationCase.title}</Text>
        <Text style={styles.subtitle}>CLASSIFIED - FOR EYES ONLY • ID: {investigationCase.id}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>{investigationCase.briefingText}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovered Evidence</Text>
        {clues.map((clue, index) => (
          <View key={index} style={styles.clueItem}>
            <Text style={styles.clueTitle}>[{clue.type.toUpperCase()}] {clue.title}</Text>
            <Text style={styles.clueContent}>
              {clue.type === "image" ? "[ATTACHED MEDIA FILE]" : clue.content}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Analysis Synthesis</Text>
        <Text style={styles.text}>
          Based on the collected evidence, ShadowTrace AI confirms multiple overlapping indicators of compromise. 
          The extraction point and intercepted communications suggest highly coordinated activity.
        </Text>
      </View>
    </Page>
  </Document>
);

```

---

## File: `src/components/LenisProvider.tsx`

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      prevent: (node) => {
        // Prevent Lenis from intercepting scroll inside inner scrollable containers
        return (
          node.classList?.contains("overflow-y-auto") ||
          node.classList?.contains("overflow-auto") ||
          Boolean(node.closest?.(".overflow-y-auto")) ||
          Boolean(node.closest?.(".overflow-auto")) ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA"
        );
      },
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

```

---

## File: `src/lib/data/seed-case.ts`

```ts
import { Case, Clue } from "../firebase/schema";

export const thePhantomProtocolCase: Case = {
  id: "phantom-protocol",
  title: "The Phantom Protocol",
  description: "A highly confidential file has leaked from a secure government server. Can you trace the digital footprints before the perpetrator covers their tracks completely?",
  difficulty: "Medium",
  estimatedTime: 45,
  coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  briefingText: "Agent, we have a code red. An unidentified entity breached the primary defense layer of Section 4 last night. They downloaded the 'Phantom Protocol' files. Your job is to analyze the logs, identify the breach point, and uncover the identity of the attacker.",
};

export const phantomProtocolClues: Clue[] = [
  {
    id: "clue-1",
    caseId: "phantom-protocol",
    title: "Server Access Logs",
    type: "log",
    content: "192.168.1.104 - - [10/Oct/2026:13:55:36 -0700] \"GET /admin/secure/phantom HTTP/1.1\" 401 128\n10.5.22.1 - - [10/Oct/2026:14:02:11 -0700] \"POST /api/v1/auth HTTP/1.1\" 200 45\n10.5.22.1 - - [10/Oct/2026:14:05:01 -0700] \"GET /admin/secure/phantom HTTP/1.1\" 200 5633",
    unlockedBy: [],
    isKeyDiscovery: false,
  },
  {
    id: "clue-2",
    caseId: "phantom-protocol",
    title: "Suspicious IP Traced",
    type: "document",
    content: "The IP address 10.5.22.1 routes back to an offshore proxy server commonly used by a collective known as 'The Silent Hand'.",
    unlockedBy: ["clue-1"],
    isKeyDiscovery: true,
  },
  {
    id: "clue-3",
    caseId: "phantom-protocol",
    title: "Intercepted Email",
    type: "email",
    content: "From: X\nTo: Operative-9\n\nThe package is secured. Meet at the extraction point at 22:00. Bring the crypto drive.",
    unlockedBy: ["clue-2"],
    isKeyDiscovery: false,
  },
  {
    id: "clue-4",
    caseId: "phantom-protocol",
    title: "Extraction Point Identified",
    type: "image",
    content: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Abandoned warehouse
    unlockedBy: ["clue-3"],
    isKeyDiscovery: true,
  }
];

export const theOperationMidnightCase: Case = {
  id: "operation-midnight",
  title: "Operation Midnight",
  description: "A classified operation investigating rogue orbital transmissions intercepted over the Atlantic. Track the burst frequency, isolate rogue command keys, and locate the ground terminal.",
  difficulty: "Hard",
  estimatedTime: 120,
  coverImage: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  briefingText: "Senior Operative, welcome to Level 5. High-frequency telemetry packets were intercepted on military satellite transponders. A covert entity is attempting to override orbital trajectory controls. Decrypt the telemetry logs, identify the rogue ground transmitter, and secure the orbital constellation.",
};

export const operationMidnightClues: Clue[] = [
  {
    id: "om-clue-1",
    caseId: "operation-midnight",
    title: "Orbital Burst Telemetry",
    type: "log",
    content: "SAT-LINK-9 [FREQ: 14.245 GHz] - - [12/Oct/2026:02:14:19 UTC]\nCARRIER_LOCK: POSITIVE\nFRAME_SYNC: 0xDEADBEEF\nPACKET_IN: [AUTH_OVERRIDE_FLAG=1, GROUND_ID=STATION_AZORES_9]\nSTATUS: EMERGENCY PROTOCOL ENGAGED",
    unlockedBy: [],
    isKeyDiscovery: false,
  },
  {
    id: "om-clue-2",
    caseId: "operation-midnight",
    title: "Signal Intercept Record",
    type: "document",
    content: "Intelligence report confirms anomalous burst transmission originating from coordinates in the North Atlantic. Transmission source matches unregistered satellite uplink relay.",
    unlockedBy: ["om-clue-1"],
    isKeyDiscovery: true,
  },
  {
    id: "om-clue-3",
    caseId: "operation-midnight",
    title: "Intercepted Transmission Audio/Text",
    type: "email",
    content: "From: GHOST-RELAY-0\nTo: UNKNOWN\n\nPhase 2 payload queued. Satellite orbital thrusters will burn at 04:00 UTC unless downlink authentication is revoked.",
    unlockedBy: ["om-clue-2"],
    isKeyDiscovery: false,
  },
  {
    id: "om-clue-4",
    caseId: "operation-midnight",
    title: "Ground Station Satellite Image",
    type: "image",
    content: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    unlockedBy: ["om-clue-3"],
    isKeyDiscovery: true,
  }
];

```

---

## File: `src/lib/firebase/config.ts`

```ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "shadowtrace-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "shadowtrace-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "shadowtrace-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

// Initialize Firebase safely
let app: FirebaseApp | undefined;
let db: Firestore | undefined;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase running in offline/mock mode:", e);
}

export { app, db };

```

---

## File: `src/lib/firebase/schema.ts`

```ts
export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: number;
  lastLoginAt: number;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: number; // in minutes
  coverImage: string;
  briefingText: string;
}

export interface Clue {
  id: string;
  caseId: string;
  title: string;
  type: "document" | "image" | "email" | "log" | "audio";
  content: string; // Text or URL
  unlockedBy: string[]; // Clue IDs that must be found first
  isKeyDiscovery: boolean; // Triggers the gold accent and cinematic reveal
}

export interface TimelineEvent {
  id: string;
  timestamp: number;
  type: "discovery" | "ai_insight" | "note";
  title: string;
  description: string;
  clueId?: string;
}

export interface Session {
  id: string;
  userId: string;
  caseId: string;
  status: "active" | "completed";
  startedAt: number;
  completedAt?: number;
  discoveries: string[]; // Array of discovered Clue IDs
  timeline: TimelineEvent[];
}

export interface Report {
  id: string;
  sessionId: string;
  userId: string;
  caseId: string;
  pdfUrl?: string; // If stored in Storage
  generatedAt: number;
  summary: string; // AI generated summary of the investigation
}

```

---

## File: `src/lib/firebase/actions.ts`

```ts
import { db } from "./config";
import { collection, doc, setDoc } from "firebase/firestore";
import { Session } from "./schema";

export async function startSession(caseId: string, userId: string = "guest-user"): Promise<string> {
  const sessionId = `session-${Date.now()}`;
  try {
    if (db && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      const sessionRef = doc(collection(db, "sessions"), sessionId);
      const newSession: Session = {
        id: sessionId,
        userId,
        caseId,
        status: "active",
        startedAt: Date.now(),
        discoveries: [],
        timeline: [
          {
            id: `evt-${Date.now()}`,
            timestamp: Date.now(),
            type: "note",
            title: "Investigation Started",
            description: "Operative accessed the case file.",
          }
        ]
      };
      await setDoc(sessionRef, newSession);
    }
  } catch (error) {
    console.warn("Firebase session write bypassed (offline mode):", error);
  }
  return sessionId;
}

```
