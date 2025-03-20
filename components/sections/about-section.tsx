import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Maximize2 } from "lucide-react";
import { AnimationEmoji } from "../animations/animation-emoji";

type AboutSectionProps = {
  onOpen: () => void;
  itemVariants: any;
};

export default function AboutSection({ onOpen, itemVariants }: AboutSectionProps) {
  const t = useTranslations("About");

  return (
    <motion.div 
      className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 shadow-lg flex items-center cursor-pointer relative group"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onOpen}
    >
      <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
        <Maximize2 className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-32 h-32 flex-shrink-0">
          <AnimationEmoji />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Paul Berthelot</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("description")}
          </p>
          <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
            {t("readMore")}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 