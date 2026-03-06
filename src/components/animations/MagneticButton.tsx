"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const content = (
    <motion.span
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  const wrapper = (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block cursor-pointer", className)}
    >
      {href ? (
        <Link href={href} className="inline-block">
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className="inline-block">
          {content}
        </button>
      )}
    </div>
  );

  return wrapper;
}
