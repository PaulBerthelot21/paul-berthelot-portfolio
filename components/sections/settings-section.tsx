import { motion, Variants } from "framer-motion";
import { Palette } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "../ui/language-toggle";
import { ConfettiToggle } from "../ui/confetti-toggle";

type SettingsSectionProps = {
  itemVariants: Variants;
};

export default function SettingsSection({ itemVariants }: SettingsSectionProps) {
  const t = useTranslations("Settings");

  return (
    <motion.div
      className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-3xl p-6 shadow-lg"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center justify-start">
        <Palette className="mr-2 h-5 w-5" /> {t("title")}
      </h3>
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">{t("theme")}</h4>
          <ModeToggle />
        </div>
        <div className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">{t("language")}</h4>
          <LanguageToggle />
        </div>
        <div className="flex items-center justify-between w-full">
          <h4 className="text-lg font-semibold">{t("confetti")}</h4>
          <ConfettiToggle />
        </div>
      </div>
    </motion.div>
  );
}
