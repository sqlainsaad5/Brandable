"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/store/uiStore";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [, setSubmitted] = useState(false);
  const newsletterPopupSeen = useUIStore((s) => s.newsletterPopupSeen);
  const setNewsletterPopupSeen = useUIStore((s) => s.setNewsletterPopupSeen);

  useEffect(() => {
    if (newsletterPopupSeen) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [newsletterPopupSeen]);

  const close = () => {
    setShow(false);
    setNewsletterPopupSeen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    close();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-background p-8 shadow-hard"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 p-2 text-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Get 10% off your first order
            </h3>
            <p className="mt-2 text-sm text-muted">
              Join our newsletter for exclusive offers and early access.
            </p>
            <form onSubmit={handleSubmit} className="mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/20 bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-accent py-3 font-semibold text-background hover:bg-accent-hover transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
