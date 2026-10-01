"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Radio, 
  Shield, 
  Terminal, 
  Compass, 
  Binary, 
  Lock, 
  ChevronRight,
  Eye,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import TacticalShaderBackground from "@/components/TacticalShaderBackground";
import OSINTPracticeSandbox from "@/components/OSINTPracticeSandbox";

type EvidenceKey = "adsb" | "audio" | "photo" | "registry";

export default function Home() {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceKey>("adsb");

  return (
    <div className="relative w-full text-text overflow-x-hidden min-h-screen">
      {/* 1. Exact Living WebGL Background Shader from HTML Mockup */}
      <TacticalShaderBackground />

      {/* Main Content Container */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 w-full pt-6 pb-24 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SECTION WITH PROMINENT SHADOWTRACE BRANDING           */}
        {/* ========================================================= */}
        <header className="text-center pt-6 sm:pt-12 pb-12 sm:pb-16 flex flex-col items-center">
          
          {/* Animated Tactical Cyber Insignia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-4 mx-auto select-none"
          >
            {/* Ambient Multi-Hue Pulsing Glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-2xl animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl" />
            
            {/* Rotating Outer Radar Telemetry Ring */}
            <svg className="w-full h-full animate-[spin_16s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#22e0ff" strokeWidth="1.2" strokeDasharray="6 4" strokeOpacity="0.6" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#ffb020" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.4" />
              <path d="M 50 2 L 50 10 M 50 90 L 50 98 M 2 50 L 10 50 M 90 50 L 98 50" stroke="#22e0ff" strokeWidth="1.5" />
            </svg>

            {/* Inner Counter-Rotating Target Reticle */}
            <svg className="absolute w-16 h-16 animate-[spin_8s_linear_infinite_reverse]" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="#22e0ff" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M 30 6 L 30 14 M 30 46 L 30 54 M 6 30 L 14 30 M 46 30 L 54 30" stroke="#ffb020" strokeWidth="1.2" />
            </svg>

            {/* Center Core Emblem Badge */}
            <div className="absolute w-12 h-12 rounded-xl bg-gradient-to-br from-[#102a35] via-[#0a0c11] to-[#251f10] border border-cyan-400/60 flex items-center justify-center shadow-[0_0_25px_rgba(34,224,255,0.7)] backdrop-blur-md">
              <Radio className="w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
          </motion.div>

          {/* ======================================================= */}
          {/* BIG SHADOWTRACE BRAND TITLE                             */}
          {/* ======================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center select-none"
          >
            <div className="font-mono font-black text-6xl sm:text-8xl md:text-9xl tracking-[0.08em] sm:tracking-[0.14em] uppercase bg-gradient-to-b from-white via-[#E6EAF2] to-[#8A93A6] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(34,224,255,0.4)]">
              SHADOWTRACE
            </div>
            
            <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-cyan-300/80 -mt-1 sm:-mt-2 mb-6">
              <span>● Tactical OSINT Intelligence Platform</span>
              <span className="text-white/20">|</span>
              <span className="text-amber-400">Clearance Level 4+</span>
            </div>
          </motion.div>

          {/* Clearance Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber/40 bg-amber/10 text-amber font-mono text-xs tracking-wider mb-6 shadow-[0_0_20px_rgba(255,176,32,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <span>New case drop · top 10 share a bounty</span>
          </motion.div>

          {/* Headline from Mockup */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-mono font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] mb-5 select-none"
          >
            Dynamic OSINT<br />
            <em className="italic text-cyan-400 [text-shadow:0_0_36px_rgba(34,224,255,0.65)] not-italic font-normal">
              i
            </em>nvestigations
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl mx-auto text-muted text-base sm:text-lg font-normal leading-relaxed mb-8 px-2"
          >
            Solve live cases with open-source evidence only. Every case reshuffles its clues, so no write-up gives you the answer.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/cases"
              className="inline-flex items-center gap-3 font-mono font-bold text-sm sm:text-base text-[#0a0c11] bg-cyan-400 hover:bg-cyan-300 px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(34,224,255,0.45)] hover:shadow-[0_0_45px_rgba(34,224,255,0.7)] cursor-pointer group"
            >
              <span>Initialize Briefing</span>
              <span className="inline-block w-2 h-4 bg-[#0a0c11] animate-cursor-blink" />
            </Link>

            <Link
              href="#cases"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-text border border-cyan-400/30 hover:border-cyan-400 bg-white/5 hover:bg-white/10 px-6 py-3.5 sm:py-4 rounded-full transition-all backdrop-blur-md"
            >
              <span>View Active Dossiers</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </motion.div>

          {/* ========================================================= */}
          {/* INTERACTIVE CONSOLE PREVIEW MOCKUP                         */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-14 sm:mt-16 w-full max-w-4xl bg-[#0a0c11]/90 border border-cyan-400/20 rounded-2xl shadow-[0_25px_80px_rgba(34,224,255,0.1),0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden text-left"
            aria-label="Case workspace preview"
          >
            {/* Console Header Bar */}
            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-3 border-b border-cyan-400/20 bg-black/60 font-mono text-xs text-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a3040] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a3040] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a3040] inline-block" />
              <span className="ml-2 text-text/80 font-medium">case_01 / flight-path-telemetry</span>
              <span className="ml-auto text-amber flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber animate-ping inline-block" />
                <span>● live</span>
              </span>
            </div>

            {/* Console 3-Column Tactical Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[210px_1fr_230px] min-h-[300px]">
              
              {/* Column 1: Evidence Selector */}
              <div className="p-4 border-b md:border-b-0 md:border-r border-cyan-400/20 bg-black/40">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3 font-semibold">
                  Evidence
                </h4>
                <div className="space-y-1.5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedEvidence("adsb")}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                      selectedEvidence === "adsb"
                        ? "border-cyan-400 text-cyan-300 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,224,255,0.2)] font-medium"
                        : "border-transparent text-muted hover:text-text hover:bg-white/5"
                    }`}
                  >
                    ads-b_log.csv
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvidence("audio")}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                      selectedEvidence === "audio"
                        ? "border-cyan-400 text-cyan-300 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,224,255,0.2)] font-medium"
                        : "border-transparent text-muted hover:text-text hover:bg-white/5"
                    }`}
                  >
                    tower_audio.wav
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvidence("photo")}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                      selectedEvidence === "photo"
                        ? "border-cyan-400 text-cyan-300 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,224,255,0.2)] font-medium"
                        : "border-transparent text-muted hover:text-text hover:bg-white/5"
                    }`}
                  >
                    press_photo.jpg
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvidence("registry")}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                      selectedEvidence === "registry"
                        ? "border-cyan-400 text-cyan-300 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,224,255,0.2)] font-medium"
                        : "border-transparent text-muted hover:text-text hover:bg-white/5"
                    }`}
                  >
                    registry_scan.pdf
                  </button>
                </div>
              </div>

              {/* Column 2: Tactical Radar Route Visualization */}
              <div className="p-0 border-b md:border-b-0 md:border-r border-cyan-400/20 relative overflow-hidden flex items-center justify-center bg-[#07090c]">
                <svg
                  viewBox="0 0 420 300"
                  preserveAspectRatio="xMidYMid slice"
                  className="w-full h-full block"
                  aria-label="Map with flight route"
                >
                  <defs>
                    <pattern id="tacticalGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#22e0ff" strokeOpacity="0.08" strokeWidth="1" />
                    </pattern>
                    <radialGradient id="radarBackdrop" cx="30%" cy="65%">
                      <stop offset="0%" stopColor="#16303a" />
                      <stop offset="100%" stopColor="#0a0c11" />
                    </radialGradient>
                  </defs>

                  <rect width="420" height="300" fill="url(#radarBackdrop)" />
                  <rect width="420" height="300" fill="url(#tacticalGrid)" />

                  {/* Concentric radar range rings */}
                  <circle cx="210" cy="150" r="60" fill="none" stroke="#22e0ff" strokeOpacity="0.12" strokeDasharray="3 3" />
                  <circle cx="210" cy="150" r="110" fill="none" stroke="#22e0ff" strokeOpacity="0.08" />

                  {/* Flight Vector Curve */}
                  <path
                    d="M 30 230 Q 150 70 250 130 T 390 60"
                    fill="none"
                    stroke="#22e0ff"
                    strokeWidth="1.8"
                    strokeDasharray="6 5"
                  />

                  {/* Ping Nodes */}
                  <circle cx="30" cy="230" r="5" fill="#22e0ff" />
                  <circle cx="250" cy="130" r="3.5" fill="#8a93a6" />
                  
                  {/* Destination / Last Ping Contact */}
                  <circle cx="390" cy="60" r="6" fill="#ffb020" />
                  <circle cx="390" cy="60" r="15" fill="none" stroke="#ffb020" strokeOpacity="0.5" strokeWidth="1.5">
                    <animate attributeName="r" values="7;20;7" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
                  </circle>

                  {/* Telemetry Labels */}
                  <text x="40" y="256" fill="#8a93a6" fontFamily="var(--font-mono), monospace" fontSize="11">
                    ICAO 4CA7B2 · FL370
                  </text>
                  <text x="290" y="40" fill="#ffb020" fontFamily="var(--font-mono), monospace" fontSize="11" fontWeight="bold">
                    last ping 03:42Z
                  </text>
                </svg>

                {/* Contextual Telemetry Overlay */}
                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-300/80 bg-black/70 px-2.5 py-1 rounded border border-cyan-400/20 backdrop-blur-md">
                  {selectedEvidence === "adsb" && "ACTIVE STREAM: 1090MHz Mode S Squawk 7700"}
                  {selectedEvidence === "audio" && "AUDIO SPECTROGRAM: VHF 124.850 MHz Tower Feed"}
                  {selectedEvidence === "photo" && "EXIF METADATA: 4K Sensor Lat/Lon Pinpoint"}
                  {selectedEvidence === "registry" && "ICAO REGISTRY: Airframe Tail N409SX Verified"}
                </div>
              </div>

              {/* Column 3: Analyst Notes */}
              <div className="p-4 bg-black/40 font-mono text-xs">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted mb-3 font-semibold">
                  Analyst notes
                </h4>

                <div className="border-l-2 border-amber pl-3 py-1 mb-4 text-muted">
                  <b className="text-text font-semibold block mb-0.5">Transponder off at 03:42Z</b>
                  Signal drops 40 km from the coast line.
                </div>

                <div className="border-l-2 border-cyan-400 pl-3 py-1 mb-4 text-muted">
                  <b className="text-text font-semibold block mb-0.5">Registry mismatch</b>
                  Owner shell company lists two addresses in Panama.
                </div>

                <div className="border-l-2 border-amber pl-3 py-1 text-muted">
                  <b className="text-amber font-semibold block mb-0.5">Cryptographic Keyring</b>
                  Payload hash matches Section 4 breach logs.
                </div>
              </div>

            </div>
          </motion.div>
        </header>

        {/* ========================================================= */}
        {/* SECTION 1: PICK A CASE                                    */}
        {/* ========================================================= */}
        <section id="cases" className="pt-20 sm:pt-28">
          <h2 className="font-mono font-bold text-3xl sm:text-5xl md:text-6xl text-center tracking-tight mb-3">
            Pick a case
          </h2>
          <p className="text-center text-muted max-w-lg mx-auto mb-12 sm:mb-16 text-base sm:text-lg">
            Three live investigations, from a first-week warm-up to a full alias hunt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Case 1: Flight Path Telemetry */}
            <article className="group bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl overflow-hidden flex flex-col backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,224,255,0.2)] transition-all duration-300">
              <div className="h-44 bg-[#0a0c11] border-b border-cyan-400/20 relative overflow-hidden">
                <svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
                  <rect width="360" height="180" fill="#0a0c11" />
                  <path
                    d="M 20 140 c 40 -20 60 10 100 -6 s 50 -40 90 -30 30 40 70 20 40 -40 60 -30"
                    fill="none"
                    stroke="#2a4a55"
                    strokeWidth="10"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30 150 Q 130 40 210 80 T 330 40"
                    fill="none"
                    stroke="#22e0ff"
                    strokeWidth="1.6"
                    strokeDasharray="5 5"
                  />
                  <circle cx="30" cy="150" r="4" fill="#22e0ff" />
                  <circle cx="330" cy="40" r="5" fill="#ffb020" />
                </svg>
              </div>

              <div className="p-6 flex flex-col flex-1 gap-2.5">
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span className="font-semibold text-text/80">Case 1</span>
                  <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                    Easy
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Flight Path Telemetry
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  A private jet went dark over open water. Rebuild its route from public pings and name where it landed.
                </p>
                <Link
                  href="/investigation/phantom-protocol"
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-300 hover:underline"
                >
                  <span>Open case file</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Case 2: Metadata Leak */}
            <article className="group bg-[#0f1117]/60 border border-amber/25 rounded-xl overflow-hidden flex flex-col backdrop-blur-xl hover:border-amber hover:shadow-[0_0_35px_rgba(255,176,32,0.2)] transition-all duration-300">
              <div className="h-44 bg-[#0a0c11] border-b border-amber/20 p-4 font-mono text-[11px] leading-relaxed text-muted select-none overflow-hidden">
                <div><span className="text-[#5b6478]">0000A0</span>  45 78 69 66 00 00  <span className="text-[#5b6478]">Exif..</span></div>
                <div><span className="text-[#5b6478]">0000B0</span>  4D 4D 00 2A 00 00  <span className="text-[#5b6478]">MM.*..</span></div>
                <div><span className="text-[#5b6478]">0000C0</span>  <span className="text-amber bg-amber/15 px-1 py-0.5 rounded font-bold">47 50 53 4C 61 74</span>  <span className="text-amber">GPSLat</span></div>
                <div><span className="text-[#5b6478]">0000D0</span>  <span className="text-amber bg-amber/15 px-1 py-0.5 rounded font-bold">32 33 2E 32 36 31</span>  <span className="text-amber">23.261</span></div>
                <div><span className="text-[#5b6478]">0000E0</span>  41 75 74 68 6F 72  <span className="text-cyan-300 font-semibold">Author</span></div>
                <div><span className="text-[#5b6478]">0000F0</span>  6D 2E 72 61 6F 40  <span className="text-cyan-300 font-semibold">m.rao@</span></div>
              </div>

              <div className="p-6 flex flex-col flex-1 gap-2.5">
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span className="font-semibold text-text/80">Case 2</span>
                  <span className="text-amber font-bold px-2 py-0.5 rounded bg-amber/10 border border-amber/20">
                    Medium
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-amber transition-colors">
                  Metadata Leak
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  A &quot;scrubbed&quot; press photo still carries hidden fields. Inspect the hex, then trace the author and location.
                </p>
                <Link
                  href="/investigation/operation-midnight"
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-amber hover:underline"
                >
                  <span>Open case file</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

            {/* Case 3: Alias Footprint */}
            <article className="group bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl overflow-hidden flex flex-col backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,224,255,0.2)] transition-all duration-300">
              <div className="h-44 bg-[#0a0c11] border-b border-cyan-400/20 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
                  <rect width="360" height="180" fill="#0a0c11" />
                  <g stroke="#22e0ff" strokeOpacity="0.4" strokeWidth="1.2">
                    <line x1="180" y1="90" x2="80" y2="45" />
                    <line x1="180" y1="90" x2="270" y2="40" />
                    <line x1="180" y1="90" x2="90" y2="145" />
                    <line x1="80" y1="45" x2="40" y2="105" />
                    <line x1="270" y1="40" x2="325" y2="85" />
                  </g>
                  <line x1="180" y1="90" x2="285" y2="135" stroke="#ffb020" strokeWidth="1.6" strokeDasharray="4 4" />
                  
                  <g fill="#0f1117" stroke="#22e0ff" strokeWidth="1.5">
                    <circle cx="80" cy="45" r="9" />
                    <circle cx="270" cy="40" r="9" />
                    <circle cx="90" cy="145" r="9" />
                    <circle cx="40" cy="105" r="6" />
                    <circle cx="325" cy="85" r="6" />
                  </g>

                  {/* Target Node */}
                  <circle cx="285" cy="135" r="10" fill="#0f1117" stroke="#ffb020" strokeWidth="2" />
                  <circle cx="180" cy="90" r="16" fill="#22e0ff" fillOpacity="0.15" stroke="#22e0ff" strokeWidth="2" />
                  <text x="164" y="94" fill="#e6eaf2" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight="bold">
                    @n0va
                  </text>
                </svg>
              </div>

              <div className="p-6 flex flex-col flex-1 gap-2.5">
                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <span className="font-semibold text-text/80">Case 3</span>
                  <span className="text-red-400 font-bold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                    Hard
                  </span>
                </div>
                <h3 className="font-mono text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Alias Footprint
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  One handle, five platforms, no real name. Link the accounts and find the person behind them.
                </p>
                <Link
                  href="/cases"
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-300 hover:underline"
                >
                  <span>Open case file</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: LEARN THE TRADECRAFT                           */}
        {/* ========================================================= */}
        <section id="learn" className="pt-24 sm:pt-32">
          <h2 className="font-mono font-bold text-3xl sm:text-5xl md:text-6xl text-center tracking-tight mb-3">
            Learn the tradecraft
          </h2>
          <p className="text-center text-muted max-w-lg mx-auto mb-12 sm:mb-16 text-base sm:text-lg">
            Every case teaches a technique you can use on real, authorised work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-7 sm:p-8 backdrop-blur-xl hover:border-cyan-400/60 transition-colors">
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase mb-5 block">
                geoint
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
                Geolocate anything
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Match shadows, signage and terrain to a map pin, then defend your answer with solar azimuth vectors.
              </p>
            </div>

            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-7 sm:p-8 backdrop-blur-xl hover:border-cyan-400/60 transition-colors">
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase mb-5 block">
                forensics
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
                Read the hidden data
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Pull metadata, hashes and file headers out of images and documents without leaving forensic traces.
              </p>
            </div>

            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-7 sm:p-8 backdrop-blur-xl hover:border-cyan-400/60 transition-colors">
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase mb-5 block">
                sigint-lite
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
                Follow public signals
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Work with flight logs, vessel trackers, satellite telemetry downlinks, and open radio feeds.
              </p>
            </div>

            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-7 sm:p-8 backdrop-blur-xl hover:border-cyan-400/60 transition-colors">
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase mb-5 block">
                humint-lite
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
                Map an online identity
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Connect handles, avatars, PGP fingerprints, and writing habits across dispersed darknet platforms.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: SAFE BY DESIGN                                 */}
        {/* ========================================================= */}
        <section id="safety" className="pt-24 sm:pt-32">
          <h2 className="font-mono font-bold text-3xl sm:text-5xl md:text-6xl text-center tracking-tight mb-3">
            Safe by design
          </h2>
          <p className="text-center text-muted max-w-lg mx-auto mb-12 sm:mb-16 text-base sm:text-lg">
            Practice on staged data. Nothing you do touches a real person or active production systems.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-xl">
              <b className="font-mono font-bold text-3xl sm:text-4xl text-cyan-300 block tracking-tight mb-1">
                100%
              </b>
              <span className="text-muted text-xs sm:text-sm font-normal">
                fictional subjects and staged evidence
              </span>
            </div>

            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-xl">
              <b className="font-mono font-bold text-3xl sm:text-4xl text-text block tracking-tight mb-1">
                0
              </b>
              <span className="text-muted text-xs sm:text-sm font-normal">
                live systems touched, passive collection only
              </span>
            </div>

            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-xl">
              <b className="font-mono font-bold text-3xl sm:text-4xl text-amber block tracking-tight mb-1">
                24/7
              </b>
              <span className="text-muted text-xs sm:text-sm font-normal">
                tactical hints and mentor guidance
              </span>
            </div>

            <div className="bg-[#0f1117]/60 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-xl">
              <b className="font-mono font-bold text-3xl sm:text-4xl text-cyan-400 block tracking-tight mb-1">
                1 / run
              </b>
              <span className="text-muted text-xs sm:text-sm font-normal">
                clues reshuffle on every fresh investigation
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE OSINT PRACTICE SANDBOX                        */}
        {/* ========================================================= */}
        <section id="practice" className="pt-20 sm:pt-28">
          <OSINTPracticeSandbox />
        </section>

        {/* ========================================================= */}
        {/* FOOTER                                                    */}
        {/* ========================================================= */}
        <footer className="mt-24 sm:mt-32 pt-12 border-t border-cyan-400/20 font-mono text-xs text-muted">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div>
              <h5 className="font-bold text-text uppercase tracking-wider mb-3">Cases</h5>
              <div className="space-y-2">
                <Link href="/investigation/phantom-protocol" className="block hover:text-cyan-300 transition-colors">
                  Flight Path Telemetry
                </Link>
                <Link href="/investigation/operation-midnight" className="block hover:text-cyan-300 transition-colors">
                  Metadata Leak
                </Link>
                <Link href="/cases" className="block hover:text-cyan-300 transition-colors">
                  Alias Footprint
                </Link>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-text uppercase tracking-wider mb-3">Learn</h5>
              <div className="space-y-2">
                <Link href="#learn" className="block hover:text-cyan-300 transition-colors">
                  Geolocation
                </Link>
                <Link href="#learn" className="block hover:text-cyan-300 transition-colors">
                  File forensics
                </Link>
                <Link href="#learn" className="block hover:text-cyan-300 transition-colors">
                  Identity mapping
                </Link>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-text uppercase tracking-wider mb-3">Platform</h5>
              <div className="space-y-2">
                <Link href="#safety" className="block hover:text-cyan-300 transition-colors">
                  Safety Protocol
                </Link>
                <Link href="/cases" className="block hover:text-cyan-300 transition-colors">
                  Operative Console
                </Link>
                <Link href="/report" className="block hover:text-cyan-300 transition-colors">
                  Dossier Reports
                </Link>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-text uppercase tracking-wider mb-3">About</h5>
              <div className="space-y-2">
                <Link href="/cases" className="block hover:text-cyan-300 transition-colors">
                  Investigation Hub
                </Link>
                <span className="block text-text/40">Clearance L4-L6</span>
                <span className="block text-text/40">Encrypted AES-256</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-cyan-400/10 text-muted/70">
            <span>© 2026 ShadowTrace. Training and simulation use only.</span>
            <span>Passive OSINT · Staged Telemetry · Privacy Ensured</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
