"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, FolderOpen, Maximize2, X, Terminal, Clock, HelpCircle, ShieldAlert, CheckCircle2, ChevronRight, Trophy, ArrowRight, Award, ShieldCheck, Zap, RotateCcw, Lightbulb, AlertTriangle } from "lucide-react";
import { Clue } from "@/lib/firebase/schema";
import TacticalHintsPanel from "@/components/TacticalHintsPanel";
import OSINTTerminal from "@/components/OSINTTerminal";
import { getCaseById, getCluesForCase, markCaseSolved, getCompletedCaseIds } from "@/lib/engine/case-store";
import { getScopedStorageKey, getActiveUser, isGuestSession, hasAuthenticatedOrGuest, OperativeAccount } from "@/lib/auth/user-store";
import { DynamicCase } from "@/lib/engine/procedural-generator";
import AuthModal from "@/components/AuthModal";

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
  const [pendingTerminalQuery, setPendingTerminalQuery] = useState<string>("");
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<OperativeAccount | null>(null);

  // Procedural dynamic case resolution
  const [investigationCase, setInvestigationCase] = useState<DynamicCase>(() => getCaseById(caseId));
  const [clues, setClues] = useState<Clue[]>(() => getCluesForCase(caseId));

  useEffect(() => {
    const syncAuth = () => {
      setActiveUser(getActiveUser());
      setIsGuest(isGuestSession());
    };
    syncAuth();
    if (!hasAuthenticatedOrGuest()) {
      setAuthOpen(true);
    }
    window.addEventListener("shadowtrace-auth-updated", syncAuth);

    const loadedCase = getCaseById(caseId);
    const loadedClues = getCluesForCase(caseId);
    setInvestigationCase(loadedCase);
    setClues(loadedClues);
    const completed = getCompletedCaseIds();
    if (completed.includes(loadedCase.id)) {
      setIsCompleted(true);
    }

    return () => window.removeEventListener("shadowtrace-auth-updated", syncAuth);
  }, [caseId]);

  const triggerCompletion = () => {
    setIsCompleted(true);
    markCaseSolved(investigationCase.id);
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
      const key = getScopedStorageKey("completed_ids");
      const completed = getCompletedCaseIds().filter((id: string) => id !== investigationCase.id);
      localStorage.setItem(key, JSON.stringify(completed));
      window.dispatchEvent(new Event("shadowtrace-progression-updated"));
      window.dispatchEvent(new Event("shadowtrace-cases-updated"));
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
      {/* Operative Registration / Guest Prompt Modal */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        promptTitle="Save Your Investigation Progress"
        promptDescription="Sign in or register an Operative ID so your evidence discoveries, terminal traces, and solved status are saved. Or continue as Guest (progress is not stored)."
      />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-border/50">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl md:text-3xl tracking-tight">{investigationCase.title}</h1>
            <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-accent/10 border border-accent/30 text-accent rounded">
              Active Case
            </span>
            {isGuest && (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-amber/15 border border-amber/40 text-amber hover:border-amber rounded font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Guest Mode: Progress is not saved. Click to create an account."
              >
                <AlertTriangle className="w-3 h-3 text-amber shrink-0" />
                <span>Guest (Unsaved)</span>
              </button>
            )}
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
            <OSINTTerminal 
              onTraceComplete={handleTraceComplete}
              terminalIntel={investigationCase.terminalIntel}
              externalQuery={pendingTerminalQuery}
            />
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

        {/* Right Area (Tactical Progressive Hints) */}
        <div className="w-[380px] lg:w-[420px] flex flex-col h-full shrink-0">
          <TacticalHintsPanel 
            caseDetails={investigationCase} 
            cluesFound={reviewedClues.map(id => clues.find(c => c.id === id)).filter(Boolean) as Clue[]}
            onOpenTerminalQuery={(cmd) => {
              setActiveTab("terminal");
              setPendingTerminalQuery(cmd);
            }}
          />
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
                      <strong className="text-text">Correlate Anomalies:</strong> In <span className="text-accent">Server Access Logs</span>, identify rogue IP <code className="bg-surface px-1 py-0.5 rounded text-accent">{investigationCase.terminalIntel?.targetIp || "10.5.22.1"}</code> and its connection to the syndicate <span className="text-text font-bold">&quot;{investigationCase.terminalIntel?.syndicateName || "The Silent Hand"}&quot;</span>.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center shrink-0 font-bold">3</span>
                    <div>
                      <strong className="text-text">Tactical Progressive Hints:</strong> Use the field guidance panel on the right. Unlock sequential hints and instructions as you progress to verify deductions without spoilers.
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
                      <span className="text-text/40 line-through">PREVIOUS</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                      <span className="text-accent">CLEARED OPERATIVE</span>
                    </div>
                    <span className="text-xs font-mono text-text/70">
                      Case Dossier Closed • Next Mission Protocol Unlocked
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
                    <span>Correlated breach token to internal workstation ({investigationCase.terminalIntel?.internalIp || "192.168.1.104"}).</span>
                  </div>
                  <div className="flex items-start gap-2 text-text/90">
                    <span className="text-emerald-400 font-bold shrink-0">[✓]</span>
                    <span>Traced C2 command relay to offshore host ({investigationCase.terminalIntel?.targetIp || "10.5.22.1"}) operated by {investigationCase.terminalIntel?.syndicateName || "The Silent Hand"}.</span>
                  </div>
                  <div className="flex items-start gap-2 text-text/90">
                    <span className="text-emerald-400 font-bold shrink-0">[✓]</span>
                    <span>Discovered physical rendezvous at {investigationCase.terminalIntel?.locationName || "Pier 42"} [{investigationCase.terminalIntel?.coordinates || "37°48'N"}].</span>
                  </div>
                </div>

                {/* Guest Mode Notice in Victory Modal */}
                {isGuest && (
                  <div className="border border-amber/40 bg-amber/10 rounded-xl p-3.5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-amber">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber" />
                      <span>Guest Session: This solved case and clearance rank will NOT be stored permanently.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAuthOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber hover:bg-amber-400 text-black font-bold uppercase text-[10px] tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm"
                    >
                      Create ID &amp; Save Progress
                    </button>
                  </div>
                )}

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
