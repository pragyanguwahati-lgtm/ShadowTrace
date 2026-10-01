"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Trophy, 
  Sparkles, 
  RotateCw, 
  Layers, 
  History, 
  Compass, 
  ExternalLink 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DynamicCase } from "@/lib/engine/procedural-generator";
import { 
  getOrGenerateActiveCases, 
  generateNewOperation, 
  getCompletedCaseIds, 
  getCaseHistory 
} from "@/lib/engine/case-store";
import { getActiveUser, OperativeAccount } from "@/lib/auth/user-store";
import { startSession } from "@/lib/firebase/actions";

export default function CasesPage() {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cases, setCases] = useState<DynamicCase[]>([]);
  const [historyCases, setHistoryCases] = useState<DynamicCase[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [clearanceLevel, setClearanceLevel] = useState<string>("4");
  const [operativeRank, setOperativeRank] = useState<string>("Cyber Investigator");
  const [activeUser, setActiveUser] = useState<OperativeAccount | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const router = useRouter();

  const loadAllData = () => {
    if (typeof window !== "undefined") {
      const user = getActiveUser();
      setActiveUser(user);
      if (user) {
        setClearanceLevel(user.clearanceLevel || "4");
        setOperativeRank(user.operativeRank || "Cyber Investigator");
      } else {
        setClearanceLevel(localStorage.getItem("shadowtrace_level") || "4");
        setOperativeRank(localStorage.getItem("shadowtrace_rank") || "Cyber Investigator");
      }

      const active = getOrGenerateActiveCases();
      setCases(active);

      const history = getCaseHistory();
      setHistoryCases(history);

      const completed = getCompletedCaseIds();
      setCompletedIds(completed);
    }
  };

  useEffect(() => {
    loadAllData();
    window.addEventListener("shadowtrace-cases-updated", loadAllData);
    window.addEventListener("shadowtrace-progression-updated", loadAllData);
    window.addEventListener("shadowtrace-auth-updated", loadAllData);
    return () => {
      window.removeEventListener("shadowtrace-cases-updated", loadAllData);
      window.removeEventListener("shadowtrace-progression-updated", loadAllData);
      window.removeEventListener("shadowtrace-auth-updated", loadAllData);
    };
  }, []);

  const handleGenerateNewOperation = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const fresh = generateNewOperation();
      setCases(fresh);
      setIsGenerating(false);
    }, 500);
  };

  const handleCaseSelect = (c: DynamicCase) => {
    if (c.isLocked) return;
    setIsLoading(true);
    startSession(c.id).catch((err) => console.warn("Session tracking error:", err));
    router.push(`/investigation/${c.id}`);
  };

  const activeOpName = cases[0]?.operationName || "Active Syndicate Investigation";

  return (
    <div className="flex flex-col min-h-screen pb-16 max-w-7xl mx-auto w-full px-6 lg:px-16">
      
      {/* Header with Operative Clearance Level Ribbon */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 mt-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>OPERATIVE CLEARANCE LEVEL {clearanceLevel}</span>
            <span className="text-text/40">•</span>
            <span className="text-text/80">{operativeRank}</span>
            {activeUser && (
              <>
                <span className="text-text/40">•</span>
                <span className="text-cyan-300 font-bold">{activeUser.username}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateNewOperation}
              disabled={isGenerating}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 font-mono text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-sm"
              title="Procedurally generate a new 3-case syndicate operation while preserving solved history"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin text-cyan-400" : ""}`} />
              <span>{isGenerating ? "Intercepting Signals..." : "Scan New Operation Arc"}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1.5 font-bold">
              <Compass className="w-4 h-4" />
              <span>{activeOpName} • 3 Interlinked Progression Cases</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl tracking-tight">Active Operation Arc</h1>
          </div>
          <p className="text-text/60 text-sm max-w-xl font-light">
            Each syndicate operation is procedurally generated with airtight cross-clue correlation, live terminal telemetry, and progressive hints.
          </p>
        </div>
      </motion.header>

      {/* Case Directory */}
      <div className="flex flex-col gap-6 flex-1 mb-16">
        {cases.map((c, index) => {
          const isHovered = hoveredCase === c.id;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onHoverStart={() => setHoveredCase(c.id)}
              onHoverEnd={() => setHoveredCase(null)}
              onClick={() => handleCaseSelect(c)}
              className={`relative group border rounded-xl p-6 md:p-8 overflow-hidden select-none transition-all ${
                c.isLocked 
                  ? "cursor-not-allowed opacity-45 border-border/40 bg-surface/20" 
                  : c.isSolved
                    ? "cursor-pointer border-emerald-500/40 bg-surface/30 hover:border-emerald-500/80"
                    : "cursor-pointer border-border/60 bg-surface/40 hover:border-accent/70 hover:shadow-xl"
              }`}
            >
              {/* Background Cover Image Reveal */}
              <AnimatePresence>
                {isHovered && !c.isLocked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.12 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
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
                  <div className="flex flex-wrap items-center gap-2.5 mb-2 font-mono">
                    <span className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded font-semibold ${
                      c.isSolved
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : !c.isLocked
                          ? "bg-accent/15 text-accent border border-accent/40"
                          : "bg-surface text-text/40 border border-border/60"
                    }`}>
                      {c.unlockTag || (c.isSolved ? "Solved // Archived" : c.isLocked ? "Classified" : "Active Directive")}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-text/40">
                      Difficulty: {c.difficulty}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-text/40">
                      Est: {c.estimatedTime}m
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl group-hover:text-accent transition-colors duration-300 flex items-center gap-3">
                    <span>{c.title}</span>
                    {c.isSolved && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </h2>
                </div>

                <div className="md:w-1/3">
                  <p className="text-text/70 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
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
                        {c.isSolved ? "Review" : "Launch"}
                      </span>
                      <div className="flex items-center justify-center w-11 h-11 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 text-text group-hover:text-accent transition-colors duration-300" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Historical Operations Dossier Archive */}
      {historyCases.length > 0 && (
        <section className="pt-8 border-t border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-text/60">
              <History className="w-4 h-4 text-accent" />
              <span>Archived Operation Dossiers ({historyCases.length})</span>
            </div>
            <Link 
              href="/report"
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View Dossier Reports</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {historyCases.map((hc) => (
              <div 
                key={hc.id}
                className="p-4 rounded-lg border border-emerald-500/30 bg-surface/20 flex flex-col justify-between gap-3 hover:border-emerald-500/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1.5 uppercase font-bold">
                    <span>ARCHIVED // SOLVED</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-display text-lg text-white font-medium line-clamp-1">
                    {hc.title}
                  </h3>
                  <p className="text-text/60 text-xs line-clamp-2 mt-1">
                    {hc.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                  <span className="text-text/40">{hc.operationName || "Syndicate Case"}</span>
                  <Link 
                    href={`/investigation/${hc.id}`}
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    <span>Re-examine</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
