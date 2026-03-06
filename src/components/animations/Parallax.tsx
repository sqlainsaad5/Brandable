"use client";

import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

export function Parallax({ children, className, offset = 50 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
