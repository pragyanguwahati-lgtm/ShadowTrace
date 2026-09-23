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
