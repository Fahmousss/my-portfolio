"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Code, User } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TabNavigationProps {
  activeTab: string;
}

export function TabNavigation({ activeTab }: TabNavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Tab data for easier management
  const tabs = [
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "connections", label: "Connections", icon: Users },
    { id: "skills", label: "Skills", icon: Code },
  ];

  return (
    <TabsList className="w-max min-w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <motion.div
            key={tab.id}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <TabsTrigger
              value={tab.id}
              className="data-[state=active]:bg-transparent data-[state=active]:dark:bg-transparent border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:dark:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none whitespace-nowrap"
            >
              <Icon className="h-4 w-4 mr-2" />
              <span
                className={isMobile && tab.id !== activeTab ? "sr-only" : ""}
              >
                {tab.label}
              </span>
            </TabsTrigger>
          </motion.div>
        );
      })}
    </TabsList>
  );
}
