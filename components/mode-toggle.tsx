"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 p-2 bg-zinc-200 rounded-full"></div>;
  }
  return (
    <motion.button
      whileTap={{ rotate: 360 }}
      whileHover={{ rotate: 90 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:scale-110 transition"
    >
      {theme === "dark" ? (
        <Sun className="w-[1.2rem] h-[1.2rem]" />
      ) : (
        <Moon className="w-[1.2rem] h-[1.2rem]" />
      )}
    </motion.button>
  );
}
