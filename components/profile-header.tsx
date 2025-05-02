"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { Profile } from "@/types/portfolio";
import { getProfileData } from "@/lib/supabase";
import { DataLoader } from "./ui/data-loader";
import Image from "next/image";
import Link from "next/link";

export function ProfileHeader() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfileData();
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load profile data")
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const loadingComponent = (
    <div className="space-y-4">
      <div className="flex flex-row md:flex-col gap-4 md:gap-0 items-center md:items-start">
        <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 md:w-full md:h-auto md:max-w-[280px] rounded-lg" />
        <div className="space-y-1 md:space-y-2 flex-1 md:pt-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div>
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex gap-2 items-center">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="space-y-2 text-sm hidden md:block">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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

  return (
    <DataLoader
      isLoading={loading}
      data={profile}
      error={error}
      loadingComponent={loadingComponent}
    >
      {(profile) => (
        <motion.div className="space-y-4" variants={profileVariants}>
          <div className="flex flex-row md:flex-col gap-4 md:gap-0 items-center md:items-start">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-[280px] md:h-[280px] md:max-w-[280px] rounded-full"
            >
              <Image
                className="w-full h-full rounded-full border object-cover"
                src={profile?.avatar || "https://picsum.photos/600"}
                height={600}
                width={600}
                alt={profile?.name || "Profile"}
              />
              {/* <Avatar className="w-full h-full rounded-full border">
                <AvatarImage
                  width={600}
                  height={600}
                  src={profile?.avatar || "https://picsum.photos/600"}
                />

                <AvatarFallback className="w-24 h-24 sm:w-32 sm:h-32 md:w-[280px] md:h-[280px] rounded-full">
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar> */}
            </motion.div>
            <motion.div
              className="space-y-1 md:space-y-2 flex-1 md:pt-4"
              variants={itemVariants}
            >
              <h1 className="text-xl sm:text-2xl font-bold">
                {profile?.name || "Adzka Fahmi Aulia Hakim"}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {profile?.title || "Techie"}
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <p className="text-sm text-muted-foreground mb-4">
              {profile?.bio ||
                "I build exceptional digital experiences that live at the intersection of design and technology."}
            </p>
            <div className="flex gap-2 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button className="w-full" variant="default" asChild>
                  <Link href={`mailto:${"adzka.alhakim@gmail.com"}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <Link
                    href={
                      "https://drive.google.com/uc?export=download&id=1WwmpBgXzwGRd7D0DRroo5JOPfK8Z9FmU"
                    }
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download Resume</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="space-y-2 text-sm hidden md:block"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{profile?.job_title || "Senior Frontend Developer"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile?.location || "Palembang, Indonesia"}</span>
            </div>
          </motion.div>

          {/* Mobile-only info row */}
          <motion.div
            className="flex gap-4 text-xs md:hidden"
            variants={itemVariants}
          >
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-muted-foreground" />
              <span>{profile?.job_title || "Senior Frontend Dev"}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span>{profile?.location || "Palembang"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </DataLoader>
  );
}
