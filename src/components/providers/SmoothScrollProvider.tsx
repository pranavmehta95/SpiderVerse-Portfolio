"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return; // Fall back to native scrolling
    }

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Natural baseline scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2, // Keeps mobile feeling fast and native
    });

    // 3. Proper RAF cleanup loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. Anchor click interception for smooth in-page navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        // Only hijack internal hash links
        if (anchor.origin !== window.location.origin) return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          lenis.scrollTo(targetElement as HTMLElement, {
            duration: 1.0, // Snappy programatic scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          
          window.history.pushState(null, "", anchor.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // 5. Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
