"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ 
  textToCopy, 
  label, 
  className = "" 
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.warn("Clipboard access denied");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      title={copied ? "Copied!" : `Copy: ${textToCopy}`}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer border ${
        copied 
          ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-400" 
          : "border-border/60 bg-surface/50 text-muted hover:text-white hover:border-cyan-400/50"
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] font-bold">COPIED</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          {label && <span className="text-[10px]">{label}</span>}
        </>
      )}
    </button>
  );
}
