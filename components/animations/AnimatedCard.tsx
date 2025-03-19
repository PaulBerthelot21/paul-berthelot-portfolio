import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  delay?: number;
  index?: number;
}

export const AnimatedCard = ({
  children,
  className = "",
  href,
  delay = 0,
  index = 0,
}: AnimatedCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + index * 0.1,
        duration: 0.5,
      },
    },
  };

  const contentWithAnimation = (
    <motion.div
      className={`rounded-lg p-6 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {contentWithAnimation}
      </Link>
    );
  }

  return contentWithAnimation;
}; 