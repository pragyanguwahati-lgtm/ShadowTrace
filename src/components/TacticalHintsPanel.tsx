"use client";

import { useState } from "react";
import { 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert, 
  Compass, 
  Terminal, 
  Lock, 
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicCase, ContextualHint } from "@/lib/engine/procedural-generator";
import { Clue } from "@/lib/firebase/schema";

interface TacticalHintsPanelProps {
  caseDetails: DynamicCase;
  cluesFound: Clue[];
  onOpenTerminalQuery?: (command: string) => void;
}

export default function TacticalHintsPanel({
  caseDetails,
  cluesFound,
  onOpenTerminalQuery
}: TacticalHintsPanelProps) {
  const hints = caseDetails.hints || [];
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(0);

  const totalClues = 4;
  const progressPercent = Math.min(100, Math.round((cluesFound.length / totalClues) * 100));

  const handleUnlockNextHint = () => {
    if (unlockedHintIndex < hints.length - 1) {
      setUnlockedHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0c10]/90 border border-cyan-400/20 rounded-xl overflow-hidden font-mono text-xs">
      
      {/* Header Bar */}
      <div className="px-4 py-3 bg-black/60 border-b border-cyan-400/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber animate-pulse" />
          <span className="text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
            Tactical Guidance &amp; Case Hints
          </span>
        </div>
        <div className="text-[10px] text-muted">
          Clues Discovered: <span className="text-cyan-300 font-bold">{cluesFound.length}</span> / {totalClues}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        
        {/* Mission Objective Box */}
        <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-400/25 space-y-1">
          <div className="flex items-center gap-2 text-cyan-300 text-[10px] uppercase tracking-widest font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Primary Operational Directive</span>
          </div>
          <p className="text-text/90 text-xs leading-relaxed font-sans pt-1">
            {caseDetails.briefingText || "Correlate server access logs, identify the rogue proxy gateway, and pinpoint the physical handover coordinates."}
          </p>
        </div>

        {/* Investigation Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-[10px] text-muted mb-1.5 uppercase tracking-wider">
            <span>Dossier Reconstruction</span>
            <span className="text-cyan-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-amber transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Progressive Contextual Hints */}
        <div className="space-y-3 pt-2">
          <div className="text-[10px] uppercase tracking-widest text-muted flex items-center justify-between">
            <span>Progressive Clue Directions ({unlockedHintIndex + 1}/{hints.length})</span>
            {unlockedHintIndex < hints.length - 1 && (
              <button
                type="button"
                onClick={handleUnlockNextHint}
                className="text-amber hover:text-amber-300 flex items-center gap-1 transition-colors text-[10px] font-bold"
              >
                <span>Request Next Nudge</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {hints.map((hint, idx) => {
            const isUnlocked = idx <= unlockedHintIndex;
            return (
              <motion.div
                key={hint.id || idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-lg border transition-all ${
                  isUnlocked 
                    ? "bg-[#080d12] border-cyan-400/30 shadow-[0_0_15px_rgba(34,224,255,0.08)]"
                    : "bg-black/30 border-white/5 opacity-40 select-none"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isUnlocked ? "bg-cyan-400 text-black" : "bg-white/10 text-muted"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white text-xs">
                      {isUnlocked ? hint.title : "Classified Vector"}
                    </span>
                  </div>
                  {isUnlocked && (
                    <span className="text-[10px] text-cyan-300/80 uppercase">Active</span>
                  )}
                </div>

                <p className="text-muted text-xs leading-relaxed font-sans pl-6">
                  {isUnlocked ? hint.instruction : "Review initial case evidence or request tactical push to reveal."}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Tactical Terminal Triggers */}
        {caseDetails.terminalIntel && (
          <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-muted block font-bold">
              Suggested Terminal Queries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {caseDetails.terminalIntel.targetIp && (
                <button
                  type="button"
                  onClick={() => onOpenTerminalQuery?.(`trace ${caseDetails.terminalIntel.targetIp}`)}
                  className="px-2.5 py-1 rounded bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-[11px] transition-colors"
                >
                  trace {caseDetails.terminalIntel.targetIp}
                </button>
              )}
              {caseDetails.terminalIntel.domain && (
                <button
                  type="button"
                  onClick={() => onOpenTerminalQuery?.(`whois ${caseDetails.terminalIntel.domain}`)}
                  className="px-2.5 py-1 rounded bg-amber/10 hover:bg-amber/20 text-amber border border-amber/30 text-[11px] transition-colors"
                >
                  whois {caseDetails.terminalIntel.domain}
                </button>
              )}
              {caseDetails.terminalIntel.syndicateName && (
                <button
                  type="button"
                  onClick={() => onOpenTerminalQuery?.(`intel ${caseDetails.terminalIntel.syndicateName}`)}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-text/80 border border-white/10 text-[11px] transition-colors"
                >
                  intel {caseDetails.terminalIntel.syndicateName}
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Footer Status */}
      <div className="p-3 bg-black/60 border-t border-cyan-400/15 text-[10px] text-muted flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Offline Tactical Heuristic Solver Active</span>
        </span>
        <span className="text-cyan-300">0 ms latency</span>
      </div>

    </div>
  );
}
