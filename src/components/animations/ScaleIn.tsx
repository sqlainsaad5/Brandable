"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ScaleInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
