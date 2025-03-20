import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { GraduationCap, Maximize2 } from "lucide-react";
import { educationIds } from "@/lib/data/education";

type EducationSectionProps = {
  onOpen: () => void;
  itemVariants: Variants;
};

export default function EducationSection({ onOpen, itemVariants }: EducationSectionProps) {
  const tEducation = useTranslations("Education");

  return (
    <motion.div 
      className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-6 shadow-lg cursor-pointer relative group"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onOpen}
    >
      <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
        <Maximize2 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <GraduationCap className="mr-2 h-5 w-5" /> {tEducation("title")}
      </h3>
      <div className="space-y-2">
        {educationIds.slice(0, 2).map((eduId) => (
          <div key={eduId} className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
            <p className="font-medium">{tEducation(`${eduId}.degree`)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tEducation(`${eduId}.institution`)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 