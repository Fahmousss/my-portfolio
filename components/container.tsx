"use client";

import type React from "react";
import { motion } from "framer-motion";
import { PortfolioBanner } from "./portfolio-banner";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="space-y-4 sm:space-y-6"
        variants={containerVariants}
      >
        <PortfolioBanner />
        {/* Tabs Navigation */}
        {children}
      </motion.div>
    </>
  );
}
