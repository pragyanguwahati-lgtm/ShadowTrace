"use client";

import { Radio } from "lucide-react";

interface CyberRadarLoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export default function CyberRadarLoader({ 
  label = "INITIALIZING TACTICAL TELEMETRY...", 
  size = "md" 
}: CyberRadarLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-20 h-20"
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 font-mono select-none">
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />

        {/* Outer Rotating Radar Ring */}
        <svg className="w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#22e0ff" strokeWidth="2" strokeDasharray="8 6" strokeOpacity="0.7" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#ffb020" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.5" />
          <path d="M 50 4 L 50 14 M 50 86 L 50 96 M 4 50 L 14 50 M 86 50 L 96 50" stroke="#22e0ff" strokeWidth="2" />
        </svg>

        {/* Counter-rotating Inner Sweep Reticle */}
        <svg className="absolute w-2/3 h-2/3 animate-[spin_2s_linear_infinite_reverse]" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="24" fill="none" stroke="#22e0ff" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M 30 6 L 30 14 M 30 46 L 30 54 M 6 30 L 14 30 M 46 30 L 54 30" stroke="#ffb020" strokeWidth="1.5" />
        </svg>

        {/* Central Core Indicator */}
        <div className="absolute w-1/3 h-1/3 rounded-full bg-gradient-to-br from-cyan-400 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,224,255,0.8)]">
          <Radio className="w-3/5 h-3/5 text-black animate-pulse" />
        </div>
      </div>

      {label && (
        <div className="text-xs text-cyan-300 tracking-[0.2em] uppercase font-bold flex items-center gap-2 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
