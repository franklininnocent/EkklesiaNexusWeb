"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedReveal({
  children,
  className = "",
  delay = 0,
}: AnimatedRevealProps) {
  return (
    <motion.div
      className={`min-w-0 motion-reduce:transform-none ${className}`}
      initial={{ opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
