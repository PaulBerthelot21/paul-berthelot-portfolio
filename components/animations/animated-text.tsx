import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  wordByWord?: boolean;
  delay?: number;
  duration?: number;
}

export const AnimatedText = ({
  text,
  className = "",
  wordByWord = false,
  delay = 0,
  duration = 0.05,
}: AnimatedTextProps) => {
  // Variantes pour l'animation des mots
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * duration + delay,
        duration: 0.5,
      },
    }),
  };

  // Variantes pour l'animation des lettres
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * duration + delay,
        duration: 0.5,
      },
    }),
  };

  if (wordByWord) {
    const words = text.split(" ");
    return (
      <div className={`w-full mx-auto flex flex-wrap justify-center ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block mr-2"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full mx-auto flex flex-wrap ${className}`}>
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          custom={index}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}; 