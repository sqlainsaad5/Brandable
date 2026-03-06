"use client";

import { useEffect, useRef, useState } from "react";

type Options = IntersectionObserverInit & { triggerOnce?: boolean };

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
): [React.RefObject<T | null>, boolean] {
  const { triggerOnce = true, threshold = 0.1, root = null, rootMargin = "0px" } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (triggerOnce && entry.isIntersecting) observer.unobserve(el);
      },
      { threshold, root, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, triggerOnce]);

  return [ref, isIntersecting];
}
