"use client";

import { useRouter } from "next/navigation";
import { Briefcase, Users, Code, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationBarProps {
  currentPage: string;
}

export function NavigationBar({ currentPage }: NavigationBarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingPage, setLoadingPage] = useState<string | null>(null);

  const router = useRouter();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check scroll visibility
  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    const observer = new MutationObserver(checkScroll);
    if (navRef.current)
      observer.observe(navRef.current, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", checkScroll);
      observer.disconnect();
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (navRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "about", label: "About", icon: User, href: "/" },
    { id: "projects", label: "Projects", icon: Briefcase, href: "/projects" },
    {
      id: "connections",
      label: "Connections",
      icon: Users,
      href: "/connections",
    },
    { id: "skills", label: "Skills", icon: Code, href: "/skills" },
  ];

  return (
    <div className="relative">
      {showLeftScroll && !isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md rounded-full h-8 w-8"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {showRightScroll && !isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-md rounded-full h-8 w-8"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      <div
        className="overflow-x-auto scrollbar-hide relative"
        ref={navRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <nav className="w-max min-w-full flex justify-start border-b h-auto p-0 bg-transparent">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            const isLoading = loadingPage === link.id;
            const Icon = link.icon;

            return (
              <motion.div
                key={link.id}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <button
                  onClick={() => {
                    if (!isActive) {
                      setLoadingPage(link.id);
                      router.push(link.href);
                    }
                  }}
                  className={`px-4 py-2 flex items-center whitespace-nowrap cursor-pointer bg-transparent border-0 ${
                    isActive
                      ? "dark:border-b-2 dark:border-primary text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4 mr-2" />
                  )}
                  <span className={isMobile && !isActive ? "sr-only" : ""}>
                    {link.label}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
