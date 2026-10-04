'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, ChevronUp } from 'lucide-react';
import FormStatusAlert from './FormStatusAlert';

export default function TacticalDispatchBeacon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('field_bug');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Small debounce to avoid abrupt collapse if the cursor moves slightly
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  // Keyboard shortcut listener: F8 toggles uplink, Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    // Simulate secure transmission to tactical HQ
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setMessage('');
        setSubmitted(false);
        setIsOpen(false);
      }, 2500);
    }, 800);
  };

  const isExpanded = isHovered || isOpen;

  return (
    <>
      {/* Floating Beacon Container with Hover Cue & Pop-up (Bottom-Right so it never obstructs terminal view) */}
      <div
        className="fixed bottom-5 right-6 z-40 print:hidden select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={() => setIsHovered(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsHovered(false);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* Cue / Minimized State: Prompts the user to hover over it */
            <motion.button
              key="beacon-cue"
              type="button"
              onClick={() => {
                setIsHovered(true);
                setIsOpen(true);
              }}
              aria-label="HQ Tactical Support Beacon - Hover to expand"
              aria-expanded={false}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="group relative flex items-center gap-2 px-3 py-1.5 bg-[#0a0c10]/95 hover:bg-[#0e1420] border border-[#22e0ff]/40 hover:border-[#22e0ff] text-[#22e0ff] shadow-[0_0_15px_rgba(34,224,255,0.18)] hover:shadow-[0_0_25px_rgba(34,224,255,0.35)] transition-all cursor-pointer font-mono text-xs backdrop-blur-md rounded-none"
            >
              {/* Tactical Corner Accents */}
              <span className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-[#22e0ff]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-[#22e0ff]" />

              {/* Visual Cue: Explicitly indicates to hover */}
              <span className="flex items-center gap-1 text-[9px] font-mono font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-400/40 px-1.5 py-0.5 tracking-wider group-hover:bg-cyan-900/80 transition-colors">
                <ChevronUp className="w-2.5 h-2.5 animate-bounce text-cyan-300" />
                HOVER TO EXPAND
              </span>

              <span className="tracking-wider uppercase font-semibold text-[11px]">
                HQ UPLINK
              </span>

              <Radio className="w-3.5 h-3.5 text-[#22e0ff] animate-pulse" />

              {/* Pulsing Beacon Light */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22e0ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22e0ff]" />
              </span>
            </motion.button>
          ) : (
            /* Pop-up State: Full tactical trigger button */
            <motion.div
              key="beacon-expanded"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="flex flex-col gap-1 items-end"
            >
              {/* Status Header Bar */}
              <div className="flex items-center gap-2 px-2.5 py-0.5 bg-[#0a0c10]/95 border border-[#22e0ff]/30 text-[9px] font-mono text-cyan-300/90 shadow-[0_0_10px_rgba(34,224,255,0.15)] backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="tracking-widest uppercase">ENCRYPTED CHANNEL // STANDBY</span>
                <span className="text-[8px] text-slate-400">[PRESS F8]</span>
              </div>

              {/* Main Expanded Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open HQ Tactical Support Beacon"
                aria-expanded={isOpen}
                className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#0a0c10]/98 hover:bg-[#0e1422] border ${
                  isOpen
                    ? 'border-[#00ff88] text-[#00ff88] shadow-[0_0_25px_rgba(0,255,136,0.35)]'
                    : 'border-[#22e0ff] text-[#22e0ff] shadow-[0_0_25px_rgba(34,224,255,0.35)]'
                } transition-all cursor-pointer font-mono text-xs backdrop-blur-xl`}
              >
                {/* Tactical Corner Brackets */}
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-current" />
                <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-current" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-current" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-current" />

                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current" />
                </span>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="tracking-wider uppercase font-bold text-xs text-white group-hover:text-cyan-200 transition-colors">
                      HQ UPLINK
                    </span>
                    <span className="text-[10px] text-cyan-300/90 bg-cyan-950/80 border border-cyan-400/40 px-1 py-0.2">
                      F8
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 group-hover:text-cyan-300/90 tracking-widest uppercase transition-colors">
                    {isOpen ? '● DISPATCH ACTIVE (CLICK TO CLOSE)' : '▸ CLICK TO TRANSMIT'}
                  </span>
                </div>

                <Radio className="w-4 h-4 ml-1 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Uplink Drawer / Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="beacon-title"
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0a0c10]/98 border border-[#22e0ff]/50 shadow-[0_0_35px_rgba(34,224,255,0.25)] p-5 font-mono backdrop-blur-xl animate-fade-in print:hidden"
        >
          {/* Tactical Corner Brackets */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#22e0ff]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#22e0ff]" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#22e0ff]" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#22e0ff]" />
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22e0ff] rounded-full animate-pulse" />
              <h3 id="beacon-title" className="text-xs font-bold text-white tracking-widest uppercase">
                HQ SECURE DISPATCH
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
              aria-label="Close dispatch modal"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <FormStatusAlert
              type="success"
              title="DISPATCH ENCRYPTED & LOGGED"
              message="Field transmission routed to ShadowTrace Cyber Command. Telemetry timestamp verified."
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] tracking-wider text-slate-400 uppercase mb-1">
                  CALLSIGN / AGENT ID
                </label>
                <input
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  placeholder="AGENT-ANONYMOUS"
                  className="w-full px-2.5 py-1.5 bg-black/60 border border-white/15 text-xs text-slate-200 focus:outline-none focus:border-[#22e0ff] font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-wider text-slate-400 uppercase mb-1">
                  TRANSMISSION CLASS
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black/60 border border-white/15 text-xs text-slate-200 focus:outline-none focus:border-[#22e0ff] font-mono cursor-pointer"
                >
                  <option value="field_bug">INTEL/GLITCH REPORT</option>
                  <option value="case_feedback">CASE DOSSIER FEEDBACK</option>
                  <option value="threat_intel">FIELD SUGGESTION / FEATURE</option>
                  <option value="protocol_inquiry">GENERAL PROTOCOL INQUIRY</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider text-slate-400 uppercase mb-1">
                  ENCRYPTED DISPATCH PAYLOAD *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe situational intelligence or feedback payload..."
                  className="w-full px-2.5 py-1.5 bg-black/60 border border-white/15 text-xs text-slate-200 focus:outline-none focus:border-[#22e0ff] font-sans resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-[11px] text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  ABORT
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="px-3 py-1.5 text-[11px] bg-[#22e0ff]/20 border border-[#22e0ff] text-[#22e0ff] hover:bg-[#22e0ff] hover:text-black font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  {isSubmitting && (
                    <span className="w-2.5 h-2.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  TRANSMIT BEACON
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
