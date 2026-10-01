"use client";

import { useState, useEffect } from "react";
import { Shield, Lock, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "shadowtrace_cookie_consent";

export default function TacticalCookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Subtle delay before showing so it doesn't jarringly block initial load
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ telemetry: true, essential: true, acceptedAt: Date.now() }));
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ telemetry: false, essential: true, acceptedAt: Date.now() }));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Privacy and Cookie Consent Notice"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-xl border border-cyan-400/30 bg-[#0a0c11]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(34,224,255,0.15)] font-mono text-xs text-text"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Session Telemetry &amp; Privacy</span>
            </div>
            <button
              onClick={handleEssentialOnly}
              className="text-muted hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-muted/90 leading-relaxed font-sans mb-3">
            ShadowTrace uses local browser storage strictly to preserve operative case progression, deductions, and UI state. Zero third-party behavioral trackers or external telemetry cookies are deployed.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-3 h-3" />
              <span>Acknowledge</span>
            </button>
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="py-1.5 px-3 rounded-lg border border-border/70 hover:border-cyan-400/50 text-muted hover:text-white text-[11px] transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
