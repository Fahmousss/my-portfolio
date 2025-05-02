"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Briefcase, Code, Download, Star } from "lucide-react";
import BeamsBackground from "./beams-background";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { PortfolioStats } from "@/types/portfolio";
import { getPortfolioStats } from "@/lib/supabase";
import { DataLoader } from "./ui/data-loader";
import Link from "next/link";

export function PortfolioBanner() {
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getPortfolioStats();
        setStats(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load portfolio stats")
        );
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const loadingComponent = (
    <motion.div
      className="w-full rounded-xl overflow-hidden mb-6 border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative">
        <BeamsBackground />
        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-5/6 max-w-lg" />
              <div className="flex flex-wrap gap-3 pt-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-8">
              <div className="flex flex-col items-center">
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex flex-col items-center">
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex flex-col items-center">
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <DataLoader
      isLoading={loading}
      data={stats}
      error={error}
      loadingComponent={loadingComponent}
    >
      {(stats) => (
        <motion.div
          className="w-full rounded-xl overflow-hidden mb-6 border"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative ">
            {/* Background with gradient */}
            <BeamsBackground />

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Creative Developer &{" "}
                    <span className="text-primary">Designer</span>
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
                    I build stuff with Laravel, NextJS, React Native, and
                    Flutter — not a frontend or backend wizard 🧙‍♂️, but I know my
                    way around! I love using AI 🤖 to speed things up and solve
                    problems smarter, not harder 💡
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <TooltipProvider delayDuration={500}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" className="gap-2">
                            <Briefcase className="h-4 w-4" />
                            Hire Me
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Not yet brow :p</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Link
                        href={
                          "https://drive.google.com/uc?export=download&id=1WwmpBgXzwGRd7D0DRroo5JOPfK8Z9FmU"
                        }
                      >
                        <Download className="h-4 w-4" />
                        Download CV
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 sm:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-7 w-7 mr-2 text-primary" />
                      <span className="text-2xl sm:text-3xl font-bold">
                        {stats?.experience || 0}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Years Experience
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <Code className="h-7 w-7 mr-2 text-primary" />
                      <span className="text-2xl sm:text-3xl font-bold">
                        {stats?.projects || 0}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Projects Completed
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <Star className="h-7 w-7 mr-2 text-primary" />
                      <span className="text-2xl sm:text-3xl font-bold">
                        {stats?.clients || 0}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Happy Clients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </DataLoader>
  );
}
