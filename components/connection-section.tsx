"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Globe,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { SocialConnection, Testimonial } from "@/types/portfolio";
import { getSocialConnections, getTestimonials } from "@/lib/supabase";
import { Skeleton } from "./ui/skeleton";
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

interface ConnectionsData {
  connections: SocialConnection[];
  testimonials: Testimonial[];
}

export function ConnectionsSection() {
  const [data, setData] = useState<ConnectionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [connectionsData, testimonialsData] = await Promise.all([
          getSocialConnections(),
          getTestimonials(),
        ]);

        setData({
          connections: connectionsData,
          testimonials: testimonialsData,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load connections data")
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Map icon string to Lucide icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Github: <Github className="h-5 w-5" />,
      Twitter: <Twitter className="h-5 w-5" />,
      Linkedin: <Linkedin className="h-5 w-5" />,
      Instagram: <Instagram className="h-5 w-5" />,
      Mail: <Mail className="h-5 w-5" />,
      Globe: <Globe className="h-5 w-5" />,
    };

    return iconMap[iconName] || <Globe className="h-5 w-5" />;
  };

  const loadingComponent = (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex gap-6 py-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="flex-shrink-0 w-[350px] h-[200px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const emptyComponent = (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">No Connections Yet</h2>
      <p className="text-muted-foreground mb-6">
        Add your social media links and testimonials to connect with others.
      </p>
    </div>
  );
  return (
    <DataLoader
      isLoading={loading}
      data={data}
      error={error}
      loadingComponent={loadingComponent}
      emptyComponent={emptyComponent}
    >
      {(data) => {
        return (
          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.connections.map((connection, i) => (
                  <motion.div
                    key={connection.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Button
                      variant="outline"
                      className={`w-full justify-start h-auto py-4`}
                      asChild
                    >
                      <a
                        href={connection.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getIconComponent(connection.icon)}
                        <div className="text-left ml-3">
                          <div className="font-medium">
                            {connection.platform}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {connection.username}
                          </div>
                        </div>
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
              <Marquee
                gradient
                gradientColor="black"
                pauseOnClick
                className="rounded-2xl mt-4 py-4 overflow-y-hidden"
              >
                {data.testimonials.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.author}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="rounded-2xl max-w-md mr-10"
                  >
                    <Card className="mt-3">
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-4">
                          <div className="relative">
                            <span className="text-6xl text-muted absolute -top-6 -left-2">
                              &quot;
                            </span>
                            <p className="text-muted-foreground relative z-10 pl-4">
                              {testimonial.text}
                            </p>
                          </div>
                          <div className="flex items-center pt-4">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                              <Avatar className="w-full h-auto rounded-full border border-gray-200">
                                <AvatarImage
                                  src={testimonial.image || "/placeholder.svg"}
                                  alt="Profile"
                                />
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <p className="font-medium">
                                {testimonial.author}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.position}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Marquee>
            </div>
          </div>
        );
      }}
    </DataLoader>
  );
}
