/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
  Certification,
  SoftSkill,
  TechnicalSkill,
  Tool,
} from "@/types/portfolio";
import {
  getCertifications,
  getSoftSkills,
  getTechnicalSkills,
  getTools,
} from "@/lib/supabase";
import { DataLoader } from "./ui/data-loader";
import { Progress } from "./ui/progress";
import Image from "next/image";

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

interface ProgressBarProps {
  level: number;
  delay: number;
  isInView: boolean;
}

interface SkillsData {
  technicalSkills: TechnicalSkill[];
  softSkills: SoftSkill[];
  tools: Tool[];
  certifications: Certification[];
}

export function SkillsSection() {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadSkillsData() {
      try {
        const [techSkills, soft, toolsData, certs] = await Promise.all([
          getTechnicalSkills(),
          getSoftSkills(),
          getTools(),
          getCertifications(),
        ]);

        setSkillsData({
          technicalSkills: techSkills,
          softSkills: soft,
          tools: toolsData,
          certifications: certs,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load skills data")
        );
      } finally {
        setLoading(false);
      }
    }

    loadSkillsData();
  }, []);

  const loadingComponent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Soft Skills & Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Soft Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Tools & Software</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative h-[16rem] w-full rounded-lg bg-muted"
            >
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const emptyComponent = (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">No Skills Data Available</h2>
      <p className="text-muted-foreground mb-6">
        Start adding your skills and certifications to showcase your expertise.
      </p>
    </div>
  );

  const ProgressBar: React.FC<ProgressBarProps> = ({
    level,
    delay,
    isInView,
  }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(level), 700);
      return () => clearTimeout(timer);
    }, [level]);

    return <Progress value={progress} className="h-2" />;
  };

  return (
    <DataLoader
      isLoading={loading}
      data={skillsData}
      error={error}
      loadingComponent={loadingComponent}
      emptyComponent={emptyComponent}
    >
      {(data) => (
        <div className="space-y-8" ref={skillsRef}>
          <div>
            <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.technicalSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <ProgressBar
                    level={skill.level}
                    delay={i * 100}
                    isInView={isInView}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Soft Skills & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Soft Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.softSkills.map((skill, i) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="bg-muted/50">
                            {skill.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Tools & Software</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.tools.map((tool, i) => (
                        <motion.div
                          key={tool.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <Badge variant="outline" className="bg-muted/50">
                            {tool.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative grid h-[16rem] w-full flex-col items-end overflow-hidden rounded-lg bg-white dark:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-500">
                    <a
                      href={cert.verify_url}
                      className="h-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-center">
                        <Image
                          src={cert.image}
                          height={600}
                          width={600}
                          alt={cert.name}
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-black/10"></div>
                      </div>

                      <div className="relative h-full flex flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-3">
                            <time className="text-gray-400">{cert.date}</time>
                            <Badge
                              variant="secondary"
                              className="bg-primary/20 text-primary hover:bg-primary/30"
                            >
                              {cert.issuer}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Award className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-medium text-white">
                              {cert.name}
                            </h2>
                          </div>
                          <h5 className="mb-2 text-sm text-slate-200">
                            {cert.description}
                          </h5>
                          <div className="flex justify-between items-center mt-3 text-xs">
                            <span className="text-gray-400">
                              ID: {cert.credential_id}
                            </span>
                            <div className="flex items-center gap-1 text-primary hover:underline">
                              Verify <ExternalLink className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DataLoader>
  );
}
