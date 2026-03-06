"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
};

export function FadeIn({ children, className, delay = 0, duration = 0.4, y = 20 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
