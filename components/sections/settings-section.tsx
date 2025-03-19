import { motion } from "framer-motion";
import { Palette, Globe } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { LangSwitcher } from "../ui/lang-switcher";

type SettingsSectionProps = {
  itemVariants: any;
};

export default function SettingsSection({ itemVariants }: SettingsSectionProps) {
  return (
    <motion.div 
      className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-3xl p-6 shadow-lg"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Palette className="mr-2 h-5 w-5" /> Préférences
      </h3>
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
          <p className="font-medium mb-2 flex items-center">
            <Palette className="mr-2 h-4 w-4" /> Thème
          </p>
          <ModeToggle />
        </div>
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
          <p className="font-medium mb-2 flex items-center">
            <Globe className="mr-2 h-4 w-4" /> Langue
          </p>
          <LangSwitcher />
        </div>
      </div>
    </motion.div>
  );
} 