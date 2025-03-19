import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  delay?: number;
  className?: string;
}

export const AnimatedCircularProgress = ({
  value,
  size = 100,
  strokeWidth = 8,
  color = "stroke-blue-500",
  bgColor = "stroke-gray-200",
  label,
  delay = 0.2,
  className = "",
}: AnimatedCircularProgressProps) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(value);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={`${bgColor} fill-none`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          className={`${color} fill-none`}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{ strokeDashoffset }}
          transition={{
            duration: 1.5,
            delay,
            ease: "easeInOut",
          }}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-lg font-semibold fill-current dark:fill-white"
        >
          {progress}%
        </text>
      </svg>
      {label && (
        <motion.p
          className="mt-2 text-center font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}; 