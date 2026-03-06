"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

export function HeroCinematic() {
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video or image background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted={muted}
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50" aria-hidden />
      </div>

      {/* Fallback gradient if no video */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight"
        >
          BRANDABLE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-foreground/90 max-w-xl"
        >
          Women&apos;s Western Wear
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-background shadow-medium hover:bg-accent-hover transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/products?filter=new"
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-white/5 transition-colors"
          >
            New Arrivals
          </Link>
        </motion.div>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-background/50 text-foreground hover:bg-background/80 transition-colors"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#lookbook"
          aria-label="Scroll to content"
          className="flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
