"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Project } from "@/types/portfolio";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/supabase";
import { DataLoader } from "./ui/data-loader";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  }),
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load projects")
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const loadingComponent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="h-full flex flex-col overflow-hidden border rounded-xl"
          >
            <Skeleton className="w-full h-40" />
            <CardHeader className="px-3 py-3 sm:px-4 sm:py-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </CardHeader>
            <CardContent className="px-3 sm:px-4 py-0 flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </CardContent>
            <CardFooter className="px-3 py-3 sm:px-4 sm:py-4 pt-3 mt-auto flex justify-between gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const emptyComponent = (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">No Projects Yet</h2>
      <p className="text-muted-foreground mb-6">
        Start adding projects to showcase your work.
      </p>
    </div>
  );
  return (
    <DataLoader
      isLoading={loading}
      data={projects}
      error={error}
      loadingComponent={loadingComponent}
      emptyComponent={emptyComponent}
    >
      {(projects) => (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl"
              >
                <Card className="h-full flex flex-col overflow-hidden border rounded-xl">
                  <div className="relative w-full h-40 sm:h-36 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <CardHeader className="px-3 sm:px-4">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm line-clamp-2 mt-1">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-3 sm:px-4 py-0 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-muted text-xs px-1.5 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>

                  <CardFooter className="px-3 sm:px-4 pt-3 mt-auto flex justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 px-2.5"
                      asChild
                    >
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="text-xs h-8 px-2.5" asChild>
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </DataLoader>
  );
}
