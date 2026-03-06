"use client";

import { useEffect, useState } from "react";

export function useScrollPosition(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return y;
}
