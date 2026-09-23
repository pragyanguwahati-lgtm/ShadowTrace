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
