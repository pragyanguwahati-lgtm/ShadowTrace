# 🕵️‍♂️ ShadowTrace — Tactical Cyber Intelligence & OSINT Simulator

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-8E75B2?style=flat-square&logo=google)](https://aistudio.google.com/)

**ShadowTrace** is an interactive, cinematic cyber intelligence and OSINT (Open Source Intelligence) investigation simulator. Step into the shoes of a classified operative to analyze security logs, decrypt intercepted communications, run tactical terminal commands, collaborate with an AI co-investigator, and generate official classified dossiers.

---

## ✨ Key Features

- 🎯 **Classified Case Files & Dynamic Progression**
  - **The Phantom Protocol**: Investigate an unauthorized Section 4 perimeter breach, trace compromised server access logs, and expose "The Silent Hand" syndication.
  - **Operation Midnight**: Intercept rogue satellite telemetry bursts over the Atlantic, decrypt flight trajectory overrides, and neutralize ground rogue transmitters.
  - **Operative Clearance System**: Level up your clearance from Level 4 Investigator to Level 6 Master Cyber Director as you resolve cases.

- 💻 **Tactical OSINT Terminal**
  - Simulated interactive command-line environment for cyber reconnaissance.
  - Built-in commands:
    - `trace <ip>` — Trace network routing, autonomous system numbers (ASN), and geolocation.
    - `scan <ip>` — Execute simulated port audits and vulnerability surface scans.
    - `whois <target>` — Query domain registries and target asset metadata.
    - `intel <keyword>` — Search classified threat intelligence databases.

- 🤖 **AI Tactical Neural Link (Google Gemini)**
  - Real-time streaming AI co-investigator powered by `@google/genai`.
  - Context-aware intelligence analysis: injects active case briefs, discovered clues, and investigation milestones into runtime reasoning.
  - Built with multi-model fallback routines and resilient offline tactical intel modules.

- 📑 **Classified Dossier & PDF Export**
  - Synthesizes findings, logs, intercepted media, and AI assessments.
  - Generates downloadable, styled PDF reports using `@react-pdf/renderer`.

- 🎨 **Cinematic Cyber-Noir Interface**
  - Smooth inertia scrolling powered by **Lenis**.
  - Choreographed viewport triggers and scroll timelines with **GSAP & ScrollTrigger**.
  - Fluid state transitions and tactical modals using **Framer Motion**.
  - Tailored dark aesthetic with monospace telemetry and amber/cyan radar accents.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS |
| **Animations & FX** | [GSAP](https://gsap.com/), [ScrollTrigger](https://gsap.com/scrolltrigger/), [Framer Motion](https://www.framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/) |
| **AI Engine** | [Google Gemini GenAI SDK (`@google/genai`)](https://aistudio.google.com/) |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) |
| **Database & Cloud** | [Firebase / Cloud Firestore](https://firebase.google.com/) (with local resilient fallback) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Architecture

```
ShadowTrace/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── gemini/
│   │   │       └── route.ts         # Gemini AI streaming endpoint with model fallbacks
│   │   ├── cases/
│   │   │   └── page.tsx             # Case dossier hub & clearance status
│   │   ├── investigation/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Active tactical workspace (Board, Files, OSINT Terminal)
│   │   ├── report/
│   │   │   └── page.tsx             # Post-investigation report & PDF dossier export
│   │   ├── globals.css              # Custom cyber-noir theme variables & base styling
│   │   ├── layout.tsx               # Root layout with Navigation & Lenis smooth scroll
│   │   └── page.tsx                 # Cinematic hero landing & mission briefing
│   ├── components/
│   │   ├── AIPanel.tsx              # Streaming AI Tactical Assistant drawer
│   │   ├── LenisProvider.tsx        # Smooth scroll provider
│   │   ├── Navigation.tsx           # Global header with active clearance badge
│   │   ├── OSINTTerminal.tsx        # Interactive CLI terminal for IP & intel tracing
│   │   └── ReportPDF.tsx            # PDF Document template for case dossiers
│   └── lib/
│       ├── data/
│       │   └── seed-case.ts         # Case records, evidence items, and clue graphs
│       └── firebase/
│           ├── actions.ts           # Firestore session & case progression handlers
│           ├── config.ts            # Firebase client initialization
│           └── schema.ts            # TypeScript interfaces for Cases, Clues, and Logs
├── public/                          # Static assets and telemetry icons
├── .env.example                     # Environment configuration template
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone & Navigate
```bash
cd ShadowTrace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env.local
```

Populate your `.env.local`:
```env
# Gemini API Key (Required for live AI Tactical Assistant)
# Obtain your key at: https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (Optional - offline local storage fallback is enabled)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server at `localhost:3000`.
- `npm run build` — Compiles and creates an optimized production build.
- `npm run start` — Boots the production server.
- `npm run lint` — Runs ESLint checks across TypeScript and React code.

---

## 🔒 Security & Privacy Notice

ShadowTrace is a **simulated cybersecurity training and investigative experience**. All IP addresses, server logs, entities ("The Silent Hand"), and intercepted messages provided in cases are fictitious and intended solely for simulation, education, and entertainment purposes.
