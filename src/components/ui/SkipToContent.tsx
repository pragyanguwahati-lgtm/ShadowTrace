"use client";

interface SkipToContentProps {
  contentId?: string;
}

export default function SkipToContent({ contentId = "main-content" }: SkipToContentProps) {
  return (
    <a
      href={`#${contentId}`}
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 rounded-lg bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(34,224,255,0.8)] focus:outline-none transition-all"
    >
      Skip to main investigation content
    </a>
  );
}
