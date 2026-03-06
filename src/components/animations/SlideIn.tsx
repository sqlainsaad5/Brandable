"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type SlideInProps = {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right" | "top" | "bottom";
  delay?: number;
};

export function SlideIn({ children, className, from = "left", delay = 0 }: SlideInProps) {
  const x = from === "left" ? -24 : from === "right" ? 24 : 0;
  const y = from === "top" ? -24 : from === "bottom" ? 24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
