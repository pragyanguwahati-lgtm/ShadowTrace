"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      prevent: (node) => {
        // Prevent Lenis from intercepting scroll inside inner scrollable containers
        return (
          node.classList?.contains("overflow-y-auto") ||
          node.classList?.contains("overflow-auto") ||
          Boolean(node.closest?.(".overflow-y-auto")) ||
          Boolean(node.closest?.(".overflow-auto")) ||
          node.tagName === "INPUT" ||
          node.tagName === "TEXTAREA"
        );
      },
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
