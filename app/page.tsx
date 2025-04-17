"use client";

import GitHubProfile from "@/components/page/github-profile";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GitHubProfile />
      </motion.div>
      <div className="fixed bottom-4 right-4">
        <Link href="/admin">
          <Button size="sm" variant="outline" className="rounded-full">
            <Settings className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </Link>
      </div>
    </div>
  );
}
