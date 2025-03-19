import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
import { experienceIds } from "@/lib/data/experiences";

type ExperienceSectionProps = {
  itemVariants: any;
};

export default function ExperienceSection({ itemVariants }: ExperienceSectionProps) {
  const tExperience = useTranslations("Experience");
  return (
    <motion.div
      className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-3xl p-6 shadow-lg"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Briefcase className="mr-2 h-5 w-5" /> {tExperience("title")}
      </h3>
      <div className="space-y-3">
        {experienceIds.map((expId) => (
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <p className="font-medium">{tExperience(`${expId}.job`)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tExperience(`${expId}.years`)}</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tExperience(`${expId}.location`)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tExperience(`${expId}.jobType`)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tExperience(`${expId}.description`)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 