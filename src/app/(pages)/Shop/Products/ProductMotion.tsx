"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function ProductMotion({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.3),
        ease: "easeOut",
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-[background-color,color,border-color,box-shadow] duration-300 hover:shadow-xl hover:shadow-emerald-900/10"
    >
      {children}
    </motion.article>
  );
}
