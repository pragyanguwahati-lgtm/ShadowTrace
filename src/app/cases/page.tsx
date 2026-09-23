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
