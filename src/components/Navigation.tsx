"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, ArrowRight, Terminal, User as UserIcon } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { getActiveUser, OperativeAccount } from "@/lib/auth/user-store";

export default function Navigation() {
  const pathname = usePathname();
  const [level, setLevel] = useState<string>("4");
  const [activeUser, setActiveUser] = useState<OperativeAccount | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const updateAuth = () => {
      const user = getActiveUser();
      setActiveUser(user);
      if (user) {
        setLevel(user.clearanceLevel || "4");
      } else if (typeof window !== "undefined") {
        setLevel(localStorage.getItem("shadowtrace_level") || "4");
      }
    };
    updateAuth();
    window.addEventListener("shadowtrace-auth-updated", updateAuth);
    window.addEventListener("shadowtrace-progression-updated", updateAuth);
    return () => {
      window.removeEventListener("shadowtrace-auth-updated", updateAuth);
      window.removeEventListener("shadowtrace-progression-updated", updateAuth);
    };
  }, []);

  return (
    <>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 text-text backdrop-blur-xl bg-[#090909]/75 border-b border-[#2C2C2C]/50 transition-all duration-300">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 font-mono text-lg font-bold tracking-tight hover:text-accent transition-colors"
          >
            <span className="w-2.5 h-2.5 bg-accent shadow-[0_0_12px_rgba(212,169,90,0.8)] rounded-xs inline-block animate-pulse" />
            <span>ShadowTrace</span>
          </Link>

          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-950/20 text-[10px] font-mono tracking-wider text-cyan-300 hover:border-cyan-400 uppercase font-bold transition-all cursor-pointer"
            title="Manage Operative Credentials"
          >
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>{activeUser ? `${activeUser.username} • LVL ${level}` : `LVL ${level} OPERATIVE`}</span>
          </button>
        </div>
      
      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-2 font-mono text-xs">
        <Link 
          href={isHome ? "#cases" : "/cases"} 
          className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
            pathname.startsWith("/cases") 
              ? "text-accent bg-accent/10 border border-accent/30" 
              : "text-muted hover:text-text hover:bg-white/5"
          }`}
        >
          Cases
        </Link>
        <Link 
          href={isHome ? "#learn" : "/#learn"} 
          className="px-3 py-1.5 rounded-full text-muted hover:text-text hover:bg-white/5 transition-all duration-200"
        >
          Tradecraft
        </Link>
        <Link 
          href={isHome ? "#practice" : "/#practice"} 
          className="px-3 py-1.5 rounded-full text-muted hover:text-text hover:bg-white/5 transition-all duration-200"
        >
          Practice
        </Link>
        <Link 
          href={isHome ? "#safety" : "/#safety"} 
          className="px-3 py-1.5 rounded-full text-muted hover:text-text hover:bg-white/5 transition-all duration-200"
        >
          Safety
        </Link>
        <Link 
          href="/report" 
          className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
            pathname.startsWith("/report") 
              ? "text-accent bg-accent/10 border border-accent/30" 
              : "text-muted hover:text-text hover:bg-white/5"
          }`}
        >
          Reports
        </Link>
      </nav>

      {/* Right Action Button */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setAuthOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400 text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm"
          title="Account / Clearance Management"
        >
          <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{activeUser ? activeUser.username : "Operative ID"}</span>
        </button>

        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-obs bg-accent hover:bg-amber-400 px-4 py-2 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(212,169,90,0.3)] hover:shadow-[0_0_28px_rgba(212,169,90,0.55)] cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Initialize</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  </>
);
}

