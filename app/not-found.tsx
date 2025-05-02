"use client";

import ContentLayout from "@/components/content-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <ContentLayout currentPage="error">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="space-y-6 max-w-md">
          {/* 404 Visual */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary/10 dark:text-primary/5">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold text-foreground">
                Page Not Found
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="text-muted-foreground text-lg">
            Oops! The page you&apos;re looking for seems to have wandered off
            into the digital wilderness.
          </p>

          {/* Suggestions */}
          <div className="bg-muted/50 p-4 rounded-lg text-sm text-left">
            <h3 className="font-medium mb-2">You might want to try:</h3>
            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
              <li>Checking the URL for typos</li>
              <li>Going back to the previous page</li>
              <li>Visiting the homepage to start fresh</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
