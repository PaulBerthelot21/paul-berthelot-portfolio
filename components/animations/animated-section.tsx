import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  once?: boolean;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0.2,
  direction = "up",
  once = true,
}: AnimatedSectionProps) => {
  const directionOffset = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0,
        x: directionOffset[direction].x,
        y: directionOffset[direction].y,
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          delay,
        },
      }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}; 