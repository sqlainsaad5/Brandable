"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  return (
    <span className={cn("inline-flex overflow-hidden", className)}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.25em]"
          style={{ overflow: "hidden" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
