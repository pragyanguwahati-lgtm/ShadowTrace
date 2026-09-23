"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [level, setLevel] = useState<string>("4");

  useEffect(() => {
    const updateLevel = () => {
      if (typeof window !== "undefined") {
        setLevel(localStorage.getItem("shadowtrace_level") || "4");
      }
    };
    updateLevel();
    window.addEventListener("shadowtrace-progression-updated", updateLevel);
    return () => window.removeEventListener("shadowtrace-progression-updated", updateLevel);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 text-text backdrop-blur-md bg-background/50 border-b border-border/20">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-display text-2xl font-semibold tracking-wide hover:text-accent transition-colors">
          ShadowTrace
        </Link>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-[10px] font-mono tracking-wider text-accent uppercase font-bold">
          <Shield className="w-3 h-3 text-accent" />
          <span>LVL {level} OPERATIVE</span>
        </div>
      </div>
      
      <nav className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
        <Link 
          href="/cases" 
          className={`hover:text-accent transition-colors ${pathname.startsWith("/cases") ? "text-accent" : "text-text/70"}`}
        >
          Cases
        </Link>
        <Link 
          href="/report" 
          className={`hover:text-accent transition-colors ${pathname.startsWith("/report") ? "text-accent" : "text-text/70"}`}
        >
          Reports
        </Link>
      </nav>
    </header>
  );
}
