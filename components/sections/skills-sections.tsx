import { motion } from "framer-motion";
import { Code, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { skills } from "@/lib/data/skills";

type SkillsSectionProps = {
  onOpen: () => void;
  itemVariants: any;
};

export default function SkillsSection({ onOpen, itemVariants }: SkillsSectionProps) {
  const tSkills = useTranslations("Skills");

  return (
    <motion.div 
      className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-3xl p-6 shadow-lg cursor-pointer relative group"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onOpen}
    >
      <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
        <Maximize2 className="h-4 w-4 text-amber-500 dark:text-amber-400" />
      </div>
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Code className="mr-2 h-5 w-5" /> {tSkills("title")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.slice(0, 10).map((skill) => (
          <span 
            key={skill.id} 
            className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            {skill.name}
          </span>
        ))}
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          +{skills.length - 10} plus
        </span>
      </div>
    </motion.div>
  );
} 