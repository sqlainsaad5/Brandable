"use client";

import { motion } from "framer-motion";

export function ProductsGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
