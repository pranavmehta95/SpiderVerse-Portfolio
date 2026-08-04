"use client";
import { useState, useEffect } from "react";

export function useParticleCount() {
  const [count, setCount] = useState(20); // Default to desktop

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCount(5); // Mobile
      } else if (window.innerWidth < 1024) {
        setCount(10); // Tablet
      } else {
        setCount(20); // Desktop
      }
    }

    // Set initially
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return count;
}
