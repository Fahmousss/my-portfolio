"use client";
import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "./container";
export default function AnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="container mx-auto py-4 sm:py-6 px-3 sm:px-4 z-10 md:px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}
