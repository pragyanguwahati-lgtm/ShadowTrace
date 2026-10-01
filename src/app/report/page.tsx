"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "@/components/ReportPDF";
import { 
  getCaseById, 
  getCluesForCase, 
  getCompletedCaseIds, 
  markCaseSolved,
  getCaseHistory 
} from "@/lib/engine/case-store";
import { getActiveUser, isGuestSession, OperativeAccount } from "@/lib/auth/user-store";
import { DynamicCase } from "@/lib/engine/procedural-generator";
import { Download, ArrowRight, ShieldCheck, Trophy, Award, CheckCircle2, FileText, ChevronRight, AlertTriangle } from "lucide-react";
import AuthModal from "@/components/AuthModal";

function ReportContent() {
  const [isClient, setIsClient] = useState(false);
  const [completedCases, setCompletedCases] = useState<string[]>([]);
  const [clearanceLevel, setClearanceLevel] = useState<string>("4");
  const [operativeRank, setOperativeRank] = useState<string>("Cyber Investigator");
  const [activeUser, setActiveUser] = useState<OperativeAccount | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const justSolvedId = searchParams.get("solved");

  const loadData = () => {
    if (typeof window !== "undefined") {
      const user = getActiveUser();
      const guest = isGuestSession();
      setActiveUser(user);
      setIsGuest(guest);
      if (user) {
        setClearanceLevel(user.clearanceLevel || "4");
        setOperativeRank(user.operativeRank || "Cyber Investigator");
      } else {
        setClearanceLevel(localStorage.getItem("shadowtrace_level") || "4");
        setOperativeRank(localStorage.getItem("shadowtrace_rank") || "Cyber Investigator");
      }

      const storedCompleted = getCompletedCaseIds();
      if (justSolvedId && !storedCompleted.includes(justSolvedId)) {
        markCaseSolved(justSolvedId);
      }
      setCompletedCases(getCompletedCaseIds());
    }
  };

  useEffect(() => {
    setIsClient(true);
    loadData();
    window.addEventListener("shadowtrace-progression-updated", loadData);
    window.addEventListener("shadowtrace-auth-updated", loadData);
    return () => {
      window.removeEventListener("shadowtrace-progression-updated", loadData);
      window.removeEventListener("shadowtrace-auth-updated", loadData);
    };
  }, [justSolvedId]);

  // Generate resolved dossiers
  const displayCaseIds = completedCases.length > 0 ? completedCases : ["phantom-protocol"];

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 pb-16">
      {/* Operative Registration / Guest Prompt Modal */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onSuccess={() => {
          setAuthOpen(false);
          loadData();
        }}
        promptTitle="Save Your Dossiers & Clearance"
        promptDescription="Create an Operative ID to permanently archive completed debriefs and keep your clearance credentials. Or continue in Guest Mode (progress is not stored)."
      />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 mt-4"
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

      {/* Guest Mode Notice Banner */}
      {isGuest && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl border border-amber/40 bg-gradient-to-r from-amber/15 via-black/50 to-surface/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber/20 border border-amber/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber" />
            </div>
            <div className="font-mono text-xs">
              <div className="text-amber font-bold uppercase tracking-wider flex items-center gap-2">
                <span>Guest Session Active</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber/20 border border-amber/30 text-amber font-semibold">
                  UNARCHIVED
                </span>
              </div>
              <div className="text-text/70 mt-0.5 font-sans">
                Dossier debriefs and clearances are volatile and will be lost after this session unless saved to an Operative ID.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Create Operative ID &amp; Save</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

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
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                CLEARANCE LEVEL {clearanceLevel}
              </h2>
              <span className="text-xs font-mono text-accent bg-accent/20 border border-accent/30 px-2.5 py-0.5 rounded-full font-semibold">
                {operativeRank}
              </span>
              {activeUser && (
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-400/30 px-2.5 py-0.5 rounded-full font-bold">
                  {activeUser.username}
                </span>
              )}
            </div>
            <p className="text-text/70 text-xs md:text-sm font-mono mt-2">
              Cases Solved: {completedCases.length} | Authorization: {completedCases.length > 0 ? "Verified Operations Debrief Clearance" : "Standard Directive Clearance"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/cases"
              className="px-5 py-3 rounded-full bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              <span>Explore Operation Dossiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Dossier Cards Grid */}
      <div className="space-y-6">
        <h3 className="text-xs font-mono uppercase tracking-widest text-text/50">
          Available Intelligence Dossiers ({completedCases.length > 0 ? `${completedCases.length} Solved` : "Pending"})
        </h3>

        {displayCaseIds.map((cId) => {
          const caseData = getCaseById(cId);
          const clueList = getCluesForCase(cId);
          const isSolved = completedCases.includes(caseData.id);

          return (
            <div 
              key={caseData.id}
              className={`border rounded-xl p-6 md:p-8 backdrop-blur-md transition-all ${
                isSolved 
                  ? "border-emerald-500/40 bg-surface/40 hover:border-emerald-500/70" 
                  : "border-border/40 bg-surface/20"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded font-bold ${
                      isSolved
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-accent/10 text-accent border border-accent/30"
                    }`}>
                      {isSolved ? "Case Solved // Verified" : "Dossier In Progress"}
                    </span>
                    <span className="text-xs font-mono text-text/40">Difficulty: {caseData.difficulty}</span>
                    <span className="text-xs font-mono text-text/40">Operation: {caseData.operationName || "Syndicate"}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl mb-2 text-white">{caseData.title}</h2>
                  <p className="text-text/70 text-sm max-w-xl font-light leading-relaxed">
                    {caseData.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  {isClient && isSolved ? (
                    <PDFDownloadLink 
                      document={<ReportPDF investigationCase={caseData} clues={clueList} />} 
                      fileName={`dossier-${caseData.id}.pdf`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full hover:bg-emerald-400 transition-colors font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/10 cursor-pointer"
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
                      href={`/investigation/${caseData.id}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-full hover:bg-accent/80 transition-colors font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-accent/20"
                    >
                      <span>Investigate Case</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  <Link
                    href={`/investigation/${caseData.id}`}
                    className="w-full sm:w-auto px-4 py-3 rounded-full border border-border/80 text-text/70 hover:text-white hover:border-text/60 font-mono text-xs uppercase tracking-wider text-center transition-colors"
                  >
                    Revisit Console
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
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
