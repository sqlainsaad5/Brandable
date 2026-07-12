"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

function pickHeroSrc() {
  if (typeof window === "undefined") return "/videos/hero.mp4";
  return window.matchMedia("(max-width: 768px)").matches
    ? "/videos/hero-mobile.mp4"
    : "/videos/hero.mp4";
}

export function HeroCinematic() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Defer video until after first paint so poster + text appear instantly
  useEffect(() => {
    const connection =
      typeof navigator !== "undefined"
        ? (navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string };
          }).connection
        : undefined;

    // Only skip video when user explicitly requested data savings
    if (connection?.saveData) return;

    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const start = () => setVideoSrc(pickHeroSrc());

    let idleId: number;
    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(start, { timeout: 800 });
    } else {
      idleId = window.setTimeout(start, 250);
    }

    return () => {
      if (win.cancelIdleCallback) win.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !videoSrc) return;

    const tryPlay = () => {
      el.muted = muted;
      const play = el.play();
      if (play) play.catch(() => {});
    };

    tryPlay();

    const onVisibility = () => {
      if (document.hidden) {
        el.pause();
      } else {
        tryPlay();
      }
    };

    const onEnded = () => {
      el.currentTime = 0;
      tryPlay();
    };

    const onStall = () => {
      // Resume after a brief buffer stall (common on mobile)
      window.setTimeout(tryPlay, 300);
    };

    document.addEventListener("visibilitychange", onVisibility);
    el.addEventListener("ended", onEnded);
    el.addEventListener("stalled", onStall);
    el.addEventListener("waiting", onStall);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("stalled", onStall);
      el.removeEventListener("waiting", onStall);
    };
  }, [videoSrc, muted]);

  return (
    <section className="relative h-[min(100svh,900px)] w-full max-w-[100vw] overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/videos/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {videoSrc && !videoError && (
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-poster.jpg"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
          />
        )}

        <div className="absolute inset-0 bg-foreground/55" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background/80"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-3"
        >
          <Logo variant="hero" wrapLink />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-full break-words font-display text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          BRANDABLE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-3 max-w-xl font-sans text-base font-medium text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:mt-4 sm:text-lg"
        >
          Women&apos;s Western Wear
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-medium transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Shop Now
          </Link>
          <Link
            href="/products?filter=new"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/80 bg-white/15 px-8 py-3 text-sm font-semibold text-white shadow-soft backdrop-blur-sm transition-colors hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            New Arrivals
          </Link>
        </motion.div>
      </div>

      {videoSrc && !videoError && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="absolute bottom-20 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground shadow-soft transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-6 sm:right-6"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8"
      >
        <motion.a
          href="#trust-bar"
          aria-label="Scroll to content"
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 text-white/75 transition-colors hover:text-white"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
