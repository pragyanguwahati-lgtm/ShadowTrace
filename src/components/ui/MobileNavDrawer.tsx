"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Terminal, FileText, Compass, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavDrawerProps {
  onOpenAuth: () => void;
  isGuest: boolean;
  username?: string;
  clearanceLevel: string;
}

export default function MobileNavDrawer({ 
  onOpenAuth, 
  isGuest, 
  username, 
  clearanceLevel 
}: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeDrawer = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Mobile Menu"
        className="p-2 rounded-lg border border-border/60 bg-surface/50 text-text/80 hover:text-white hover:border-cyan-400 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#090b10] border-l border-cyan-400/20 p-6 flex flex-col font-mono shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>ShadowTrace Mobile</span>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-1 rounded text-muted hover:text-white"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Clearance / Identity Status */}
              <div className="my-5 p-3 rounded-xl border border-cyan-400/25 bg-cyan-950/20 space-y-1">
                <div className="text-[10px] uppercase text-muted">Active Identity</div>
                <div className="text-xs font-bold text-white">
                  {username || (isGuest ? "Guest Operative (Unsaved)" : "Unverified Recruit")}
                </div>
                <div className="text-[10px] text-amber">
                  Clearance Level {clearanceLevel}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    onOpenAuth();
                  }}
                  className="w-full mt-2 py-1.5 rounded bg-cyan-400/20 hover:bg-cyan-400 text-cyan-300 hover:text-black text-[11px] font-bold uppercase transition-all"
                >
                  {username ? "Account Status" : isGuest ? "Save Progress (Create ID)" : "Sign In / Register"}
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 flex-1 text-sm">
                <Link
                  href={isHome ? "#cases" : "/cases"}
                  onClick={closeDrawer}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 text-text flex items-center justify-between"
                >
                  <span>Cases &amp; Operations</span>
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </Link>

                <Link
                  href={isHome ? "#learn" : "/#learn"}
                  onClick={closeDrawer}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 text-muted hover:text-white flex items-center justify-between"
                >
                  <span>Tradecraft Modules</span>
                  <Compass className="w-4 h-4 text-cyan-400" />
                </Link>

                <Link
                  href={isHome ? "#practice" : "/#practice"}
                  onClick={closeDrawer}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 text-muted hover:text-white"
                >
                  Practice Sandbox
                </Link>

                <Link
                  href={isHome ? "#safety" : "/#safety"}
                  onClick={closeDrawer}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 text-muted hover:text-white"
                >
                  Safety &amp; Rules
                </Link>

                <Link
                  href="/report"
                  onClick={closeDrawer}
                  className="px-3 py-2 rounded-lg hover:bg-white/5 text-accent flex items-center justify-between"
                >
                  <span>Debrief Reports</span>
                  <FileText className="w-4 h-4" />
                </Link>
              </nav>

              {/* Bottom System Telemetry */}
              <div className="pt-4 border-t border-border/40 text-[10px] text-muted space-y-1">
                <div>ShadowTrace v3.4 // Tactical OSINT</div>
                <div className="text-cyan-400/60">Zero-Trace Local Processing</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
