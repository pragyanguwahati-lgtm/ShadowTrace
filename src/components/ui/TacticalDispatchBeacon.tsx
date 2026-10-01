'use client';

import React, { useState } from 'react';
import FormStatusAlert from './FormStatusAlert';

export default function TacticalDispatchBeacon() {
  const [isOpen, setIsOpen] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('field_bug');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <>
      {/* Floating Beacon Button */}
      <div className="fixed bottom-6 left-6 z-40 print:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open HQ Tactical Support Beacon"
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 bg-[#0a0c10]/95 hover:bg-[#0e121a] border border-[#22e0ff]/40 hover:border-[#22e0ff] text-[#22e0ff] shadow-[0_0_20px_rgba(34,224,255,0.2)] hover:shadow-[0_0_25px_rgba(34,224,255,0.4)] transition-all cursor-pointer font-mono text-xs select-none backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22e0ff] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22e0ff]" />
          </span>

          <span className="tracking-wider uppercase font-semibold text-[11px]">
            HQ UPLINK
          </span>

          <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors">
            [F8]
          </span>
        </button>
      </div>

      {/* Uplink Drawer / Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="beacon-title"
          className="fixed bottom-20 left-6 z-50 w-80 sm:w-96 bg-[#0a0c10]/98 border border-[#22e0ff]/50 shadow-[0_0_35px_rgba(34,224,255,0.25)] p-5 font-mono backdrop-blur-xl animate-fade-in print:hidden"
        >
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
