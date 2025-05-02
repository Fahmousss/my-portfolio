"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      // Update motion values
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Floating particles that react to cursor */}
      <ParticleField
        mousePosition={mousePosition}
        dimensions={dimensions}
        theme="dark"
      />
    </>
  );
}

interface ParticleFieldProps {
  mousePosition: { x: number; y: number };
  dimensions: { width: number; height: number };
  theme: string | undefined;
}

function ParticleField({ mousePosition, dimensions }: ParticleFieldProps) {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    // Create particles only once when component mounts
    if (particles.length === 0 && dimensions.width > 0) {
      const newParticles = Array.from({ length: 20 }, () => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }
  }, [dimensions, particles.length]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {particles.map((particle, i) => {
        // Calculate distance from mouse to particle
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Influence decreases with distance
        const maxDistance = 300;
        const influence = Math.max(0, 1 - distance / maxDistance);

        // Movement direction away from cursor
        const moveX = influence * -dx * 0.2;
        const moveY = influence * -dy * 0.2;

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-white
            `}
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
              opacity: 0.3,
            }}
            animate={{
              x: particle.x + moveX,
              y: particle.y + moveY,
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              x: { type: "spring", stiffness: 10, damping: 20 },
              y: { type: "spring", stiffness: 10, damping: 20 },
              opacity: {
                duration: 3 + particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          />
        );
      })}
    </div>
  );
}
