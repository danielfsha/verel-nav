"use client";

import { useState, useEffect } from "react";

export default function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;

      setScrollY(currentScrollY);
      // round to 2 decimal places
      setScrollProgress(Number(Math.min(progress, 1).toFixed(2)));
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollProgress, scrollY };
}
