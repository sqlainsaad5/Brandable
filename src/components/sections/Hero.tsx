"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div
        className="absolute inset-0 -z-10 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201, 162, 39, 0.15), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {HERO.headline}
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {HERO.subhead}
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button href={HERO.ctaHref} variant="primary" size="default">
            {HERO.cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
