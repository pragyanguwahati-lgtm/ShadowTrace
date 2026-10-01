# 🕵️‍♂️ ShadowTrace — Tactical Cyber Intelligence & OSINT Simulator

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![WebGL](https://img.shields.io/badge/WebGL-Fluid_Shader-e11d48?style=flat-square&logo=webgl)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
[![Security](https://img.shields.io/badge/Security-Sanitized_Inputs-10b981?style=flat-square)](https://owasp.org/)

**ShadowTrace** is an interactive, cinematic cyber intelligence and OSINT (Open Source Intelligence) investigation simulator. Step into the shoes of a classified operative to analyze security logs, decrypt intercepted communications, run tactical terminal commands, correlate clues across interlinked syndicate operations, and generate official classified dossiers.

---

## ✨ Key Features

- 🌌 **Living WebGL Fluid Noise Canvas Background**
  - Custom GPU fragment shader simulating an evolving tactical surveillance fluid field.
  - Responsive mouse interaction and smooth 60 FPS rendering under a deep obsidian radar atmosphere.

- 🎲 **Procedural Case Generation Engine**
  - Generates 3 interlinked, progression-based cases per syndicate operation (e.g., *The Silent Hand*, *Apex Transit Collective*, *Chimera Syndicate*, *Vanguard Crypt*).
  - Procedural coherence: every generated operation links flight ADS-B telemetry, ground radar stations, access logs, and C2 proxies into an airtight deductive graph.
  - Option to trigger fresh operations via **"Scan New Operation Arc"** while permanently archiving solved cases to the historical dossiers.

- 🛡️ **Operative Account System & User-to-User Isolation**
  - Secure profile registration and authentication modal (Username + Password).
  - **Strict Multi-User Isolation**: Every operative's case progression, clearance levels, active operations, and archives are isolated under independent namespaces (`shadowtrace_user_<id>_*`). Other users cannot tamper with or inspect foreign progress.
  - **Salted SHA-256 Client-Side Hashing**: Zero plaintext password exposure.

- 💡 **Offline Tactical Progressive Hints**
  - Replaced external AI dependencies with an integrated, zero-latency **Tactical Guidance & Case Hints** panel.
  - Step-by-step progressive nudges (**"Request Next Nudge"**) that guide operatives toward the next logical deduction without spoiling findings.
  - Contextual action buttons that instantly dispatch relevant queries into the OSINT console.

- 💻 **Tactical OSINT Terminal with Injection Hardening**
  - Interactive cyber command-line interface supporting `trace`, `scan`, `whois`, and `intel`.
  - **Contextual Telemetry**: Commands automatically adapt to the active procedural case's specific target IPs, compromised internal workstations, domains, and coordinates.
  - **Security Hardening**: Built-in input sanitization filters (`sanitizeTerminalInput`) that strip command chaining characters (`;`, `&`, `|`, `` ` ``, `$`), neutralize HTML tags, and prevent injection attacks.

- 🔬 **Interactive OSINT Practice Sandbox**
  - Zero-risk sandbox on the landing page for operatives to master essential tradecraft:
    - **EXIF Forensics**: Extract hidden camera models, timestamps, and GPS coordinates from image metadata.
    - **WHOIS Recon**: Inspect registrar entities and nameserver routes.
    - **Base64 Decryption**: Decode obfuscated strings and intercepted payloads.

- 📑 **Cryptographically Styled PDF Dossier Export**
  - Synthesizes findings, logs, intercepted media, and investigation timeline.
  - Exports official signed intelligence dossiers using `@react-pdf/renderer`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (Turbopack, App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS |
| **Shader & FX** | [WebGL 1.0/2.0](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [Framer Motion](https://www.framer.com/motion/) |
| **Engine & Storage** | Procedural Case Generator, User-Scoped Local Registry |
| **Security & Crypto** | Web Crypto API (SHA-256), Regex Sanitization Gates |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Architecture

```
ShadowTrace/
├── src/
│   ├── app/
│   │   ├── cases/
│   │   │   └── page.tsx                   # Operation arc hub, progression & dossier history
│   │   ├── investigation/
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Active tactical console (Evidence Board, Terminal, Hints)
│   │   ├── report/
│   │   │   └── page.tsx                   # Debrief summary & PDF dossier export
│   │   ├── globals.css                    # Ambient dark obsidian gradient & tokens
│   │   ├── layout.tsx                     # Root layout with WebGL canvas & navigation
│   │   └── page.tsx                       # Cinematic landing page & OSINT sandbox
│   ├── components/
│   │   ├── AuthModal.tsx                  # Operative login & account registration modal
│   │   ├── Navigation.tsx                 # Header with clearance status & account controls
│   │   ├── OSINTPracticeSandbox.tsx       # 3-drill interactive forensics sandbox
│   │   ├── OSINTTerminal.tsx              # Sandboxed CLI console with contextual telemetry
│   │   ├── ReportPDF.tsx                  # PDF document dossier template
│   │   ├── TacticalHintsPanel.tsx         # Progressive offline hint & guidance engine
│   │   └── TacticalShaderBackground.tsx   # Living WebGL fluid noise canvas
│   └── lib/
│       ├── auth/
│       │   └── user-store.ts              # Multi-user accounts & isolated storage namespaces
│       ├── engine/
│       │   ├── case-store.ts              # User-scoped active cases, lock sync & archives
│       │   └── procedural-generator.ts    # Procedural DAG case & syndicate generator
│       ├── security/
│       │   └── sanitize.ts                # XSS, username, password & terminal sanitization
│       └── firebase/
│           ├── actions.ts                 # Session tracking actions
│           └── schema.ts                  # Case and Clue schema definitions
├── public/                                # Static images & mission media
├── .gitignore                             # Ignored dependencies & build artifacts
├── package.json
└── tsconfig.json
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
