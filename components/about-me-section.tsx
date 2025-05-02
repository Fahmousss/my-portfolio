"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  Instagram,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getProfileData,
  getExperience,
  getProjects,
  getStories,
  getTechnicalSkills,
  getSocialConnections,
} from "@/lib/supabase";
import type {
  Profile,
  Experience,
  Project,
  Story,
  TechnicalSkill,
  SocialConnection,
} from "@/types/portfolio";
import { DataLoader } from "@/components/ui/data-loader";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

interface AboutMeData {
  profile: Profile | null;
  experience: Experience[];
  recentProjects: Project[];
  recentStory: Story | null;
  keySkills: TechnicalSkill[];
  socialConnections: SocialConnection[];
}

export function AboutMeSection() {
  const [data, setData] = useState<AboutMeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch all required data in parallel
        const [
          profileData,
          experienceData,
          projectsData,
          storiesData,
          skillsData,
          socialConnectionsData,
        ] = await Promise.all([
          getProfileData(),
          getExperience(),
          getProjects(),
          getStories(),
          getTechnicalSkills(),
          getSocialConnections(),
        ]);

        setData({
          profile: profileData,
          experience: experienceData,
          recentProjects: projectsData.slice(0, 2), // Get only the first 2 projects
          recentStory: storiesData.length > 0 ? storiesData[0] : null, // Get the first story
          keySkills: skillsData.slice(0, 5), // Get top 5 skills
          socialConnections: socialConnectionsData,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load about me data")
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Replace the hardcoded socialConnections array with a function to map icon strings to components
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
    <motion.div
      className="mb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* About Me Loading */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-2">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience Summary Loading */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Story Loading */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <div className="relative h-[20rem] w-full rounded-lg">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          </div>
        </motion.div>

        {/* Recent Projects Loading */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-20 w-20 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <div className="flex gap-2 mt-1">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Skeleton className="h-9 w-32" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const emptyComponent = (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">No Profile Data Available</h2>
      <p className="text-muted-foreground mb-6">
        Start by adding your profile information to create your about me
        section.
      </p>
      <Button>Add Profile Data</Button>
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
      {(data) => (
        <motion.div
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {/* About Me */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    👋 Hey there! I&apos;m a web and mobile developer who’s not
                    exactly a frontend or backend wizard — but I know my way
                    around both worlds. What really sets me apart is my ability
                    to harness AI (yep, I’m that guy who talks to ChatGPT a lot
                    🧠) to boost productivity, solve tricky problems, and get
                    things built faster and smarter.
                  </p>
                  <p>
                    📱 I’ve built mobile apps using React Native and Flutter,
                    and developed full-featured monolithic websites using
                    Laravel, Filament, Inertia.js, and Laravel API. I’ve also
                    worked on a fun web-based typing racer game built with
                    Next.js — blending performance, interactivity, and a bit of
                    creativity. I enjoy mixing code, AI tools, and a passion for
                    clean design to bring ideas to life. Always learning, always
                    building, always exploring what&apos;s next. 🚀
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience Summary */}
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.experience.length > 0 ? (
                    data.experience.map((job) => (
                      <div key={job.id} className="flex gap-4">
                        <div className="mt-1">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {job.start_date} - {job.end_date || "Present"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Senior Frontend Developer
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            TechCorp Inc.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            2020 - Present
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Frontend Developer</h3>
                          <p className="text-sm text-muted-foreground">
                            DesignHub
                          </p>
                          <p className="text-sm text-muted-foreground">
                            2017 - 2020
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Projects */}
            {data.recentProjects.length > 0 && (
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.recentProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        className="flex gap-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            width={80}
                            height={80}
                            src={
                              project.image ||
                              "/placeholder.svg?height=80&width=80"
                            }
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="flex gap-2 mt-1">
                            {project.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Link
                            href={project.live_url}
                            className="text-sm text-primary hover:underline inline-flex items-center mt-2"
                          >
                            View Project{" "}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                    <div className="pt-2">
                      <Button variant="outline" asChild>
                        <Link href="/projects" className="group">
                          View All Projects
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Skills Summary */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Skills Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {data.keySkills.length > 0 ? (
                      data.keySkills.map((skill, i) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))
                    ) : (
                      <>
                        {[
                          "JavaScript",
                          "React",
                          "TypeScript",
                          "Node.js",
                          "UI/UX Design",
                        ].map((skill, i) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                          >
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span className="font-medium">Top Technologies</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full-stack developer with hands-on experience in Laravel,
                      React Native, Flutter, and Next.js — leveraging AI tools
                      to boost productivity and build smart, user-focused apps.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/skills" className="group">
                        View All Skills
                        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Connect With Me */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {data.socialConnections &&
                    data.socialConnections.length > 0 ? (
                      data.socialConnections.map((connection) => (
                        <motion.div
                          key={connection.id}
                          whileHover={{ y: -3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Link
                            href={connection.url}
                            className={`inline-flex items-center justify-center h-10 w-10 rounded-full bg-muted ${connection.color}`}
                            title={connection.platform}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {getIconComponent(connection.icon)}
                            <span className="sr-only">
                              {connection.platform}
                            </span>
                          </Link>
                        </motion.div>
                      ))
                    ) : (
                      // Fallback social connections if none are found in the database
                      <>
                        {[
                          {
                            name: "LinkedIn",
                            icon: Linkedin,
                            url: "#",
                            color: "text-blue-600",
                          },
                          {
                            name: "GitHub",
                            icon: Github,
                            url: "#",
                            color: "text-gray-800 dark:text-gray-200",
                          },
                          {
                            name: "Twitter",
                            icon: Twitter,
                            url: "#",
                            color: "text-sky-500",
                          },
                          {
                            name: "Email",
                            icon: Mail,
                            url: "mailto:hello@example.com",
                            color: "text-emerald-600",
                          },
                        ].map((social) => {
                          const Icon = social.icon;
                          return (
                            <motion.div
                              key={social.name}
                              whileHover={{ y: -3 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Link
                                href={social.url}
                                className={`inline-flex items-center justify-center h-10 w-10 rounded-full bg-muted ${social.color}`}
                                title={social.name}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Icon className="h-5 w-5" />
                                <span className="sr-only">{social.name}</span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      I&apos;m always open to discussing new projects, creative
                      ideas, or opportunities to be part of your vision.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button size="sm" asChild>
                      <Link href={`mailto:${"adzka.alhakim@gmail.com"}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Get In Touch
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}
