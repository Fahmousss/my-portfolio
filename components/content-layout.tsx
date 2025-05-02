"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavigationBar } from "./navigation-bar";

interface ContentLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export default function ContentLayout({
  children,
  currentPage,
}: ContentLayoutProps) {
  return (
    <>
      <NavigationBar currentPage={currentPage} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
