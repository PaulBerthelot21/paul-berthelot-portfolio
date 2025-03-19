"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export const AnimationEmoji = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Créer des versions avec ressort pour un suivi plus fluide
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  // Transformations pour l'effet 3D
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!emojiRef.current) return;
      
      // Position relative au centre de l'élément
      const rect = emojiRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      ref={emojiRef}
      className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 dark:from-yellow-400 dark:to-yellow-500 flex items-center justify-center text-5xl shadow-xl cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="transform-gpu" style={{ transform: "translateZ(20px)" }}>
        😎
      </div>
    </motion.div>
  );
}; 