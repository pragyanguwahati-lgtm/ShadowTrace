"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Terminal, FileText, Compass, Shield, ArrowRight, X, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  id: string;
  title: string;
  category: "Cases" | "Tradecraft" | "Tools" | "Security";
  route: string;
  snippet: string;
}

const SEARCH_DIRECTORY: SearchItem[] = [
  { id: "case-01", title: "Flight Path Telemetry (Phantom Protocol)", category: "Cases", route: "/investigation/phantom-protocol", snippet: "Trace dark vessel ADS-B telemetry and identify maritime landing coordinates." },
  { id: "case-02", title: "Metadata Leak (Operation Midnight)", category: "Cases", route: "/investigation/operation-midnight", snippet: "Examine hex fields, extract GPS EXIF vectors, and locate scrubbed photo source." },
  { id: "case-03", title: "Alias Footprint Syndicate", category: "Cases", route: "/cases", snippet: "De-anonymize suspect handles across fragmented public relay platforms." },
  { id: "cases-arc", title: "Active Operation Arc Directory", category: "Cases", route: "/cases", snippet: "View 3 interlinked syndicate operations with procedural clue progression." },
  { id: "tradecraft-geo", title: "Geolocate Anything (GEOINT)", category: "Tradecraft", route: "/#learn", snippet: "Solar azimuth angles, terrain alignment, and satellite geolocation." },
  { id: "tradecraft-hex", title: "Read Hidden Data (Forensics)", category: "Tradecraft", route: "/#learn", snippet: "File headers, EXIF metadata, and hex byte inspection." },
  { id: "tradecraft-sig", title: "Follow Public Signals (SIGINT)", category: "Tradecraft", route: "/#learn", snippet: "Flight transponders, AIS marine signals, and radio telemetry." },
  { id: "practice-sandbox", title: "OSINT Interactive Practice Sandbox", category: "Tools", route: "/#practice", snippet: "Interactive practice environment for real-world evidence tradecraft." },
  { id: "reports-dossiers", title: "Intelligence Dossiers & PDF Reports", category: "Tools", route: "/report", snippet: "Official debrief reports and cryptographically signed case findings." },
  { id: "safety-policy", title: "Safe By Design (Rules of Engagement)", category: "Security", route: "/#safety", snippet: "100% fictional staged data with zero contact with real individuals." }
];

interface TacticalCommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function TacticalCommandPalette({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: TacticalCommandPaletteProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    }
    setInternalIsOpen(false);
  };

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global CMD+K / CTRL+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isControlled && controlledOnClose) {
          if (isOpen) controlledOnClose();
        } else {
          setInternalIsOpen(prev => !prev);
        }
      }
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isControlled, controlledOnClose, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const filtered = SEARCH_DIRECTORY.filter(item => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: SearchItem) => {
    handleClose();
    router.push(item.route);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <>
      {/* Quick Launcher Trigger Button for standalone mode */}
      {!isControlled && (
        <button
          type="button"
          onClick={() => setInternalIsOpen(true)}
          className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-border/60 bg-surface/40 hover:border-cyan-400/40 text-muted hover:text-white text-xs font-mono transition-all cursor-pointer"
          title="Open Command Palette (Cmd + K)"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px]">Quick Search</span>
          <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-black/60 border border-border text-text/60">⌘K</kbd>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-xl bg-[#0a0c11] border border-cyan-400/30 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_30px_rgba(34,224,255,0.15)] overflow-hidden font-mono"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-400/20 bg-black/60">
                <Search className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search cases, evidence, tradecraft, or commands..."
                  className="bg-transparent border-none outline-none flex-1 text-xs text-white placeholder:text-muted/60"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-muted hover:text-white p-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-black border border-border/80 text-muted">ESC</kbd>
              </div>

              {/* Search Results List */}
              <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/20">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted">
                    No intelligence records matching &quot;{query}&quot;
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`p-2.5 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-cyan-400/10 border border-cyan-400/30 text-white"
                            : "hover:bg-white/5 border border-transparent text-muted"
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="mt-0.5 shrink-0 text-cyan-400">
                            {item.category === "Cases" && <Terminal className="w-3.5 h-3.5" />}
                            {item.category === "Tradecraft" && <Compass className="w-3.5 h-3.5" />}
                            {item.category === "Tools" && <FileText className="w-3.5 h-3.5" />}
                            {item.category === "Security" && <Shield className="w-3.5 h-3.5" />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-white truncate flex items-center gap-2">
                              <span>{item.title}</span>
                              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded border border-cyan-400/20 text-cyan-300">
                                {item.category}
                              </span>
                            </div>
                            <div className="text-[11px] text-muted truncate mt-0.5 font-sans">
                              {item.snippet}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? "text-cyan-400 translate-x-1" : "text-muted/40"}`} />
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-black/80 border-t border-cyan-400/10 text-[10px] text-muted flex items-center justify-between">
                <span>Navigate: <kbd className="px-1 py-0.5 rounded bg-surface">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-surface">↓</kbd></span>
                <span>Select: <kbd className="px-1 py-0.5 rounded bg-surface">ENTER</kbd></span>
                <span>Close: <kbd className="px-1 py-0.5 rounded bg-surface">ESC</kbd></span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
