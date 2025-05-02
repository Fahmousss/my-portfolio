import type React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GlassCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-white/20 dark:border-gray-800/30",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
