"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { Story } from "@/types/portfolio";
import { getStories } from "@/lib/supabase";
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

export function StoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadStories() {
      try {
        const data = await getStories();
        setStories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load stories")
        );
      } finally {
        setLoading(false);
      }
    }
    loadStories();
  }, []);

  const loadingComponent = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Stories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative h-[30rem] w-full rounded-lg bg-muted"
          >
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );

  const emptyComponent = (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">No Stories Yet</h2>
      <p className="text-muted-foreground mb-6">
        Start writing to share your experiences and insights.
      </p>
    </div>
  );
  return (
    <DataLoader
      isLoading={loading}
      data={stories}
      error={error}
      loadingComponent={loadingComponent}
      emptyComponent={emptyComponent}
    >
      {(stories) => (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="relative grid h-[30rem] w-full flex-col items-end overflow-hidden rounded-lg bg-white dark:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-500">
                  <a href="#" className="h-full">
                    <div
                      className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-center"
                      style={{ backgroundImage: `url('${story.image}')` }}
                    >
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-black/10"></div>
                    </div>

                    <div className="relative h-full flex flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-3">
                          <time dateTime={story.date}>{story.date}</time>
                          <Badge
                            variant="secondary"
                            className="bg-primary/20 text-primary hover:bg-primary/30"
                          >
                            {story.category}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <h2 className="mb-3 text-2xl font-medium text-white">
                          {story.title}
                        </h2>
                        <h5 className="mb-2 text-sm text-slate-200">
                          {story.excerpt}
                        </h5>
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </DataLoader>
  );
}
