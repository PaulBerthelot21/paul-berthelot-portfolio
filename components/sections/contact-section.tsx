import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

type ContactSectionProps = {
  itemVariants: any;
};

export default function ContactSection({ itemVariants }: ContactSectionProps) {
  const t = useTranslations("Contact");
  return (
    <motion.div 
      className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-3xl p-6 shadow-lg"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Mail className="mr-2 h-5 w-5" /> {t("title")}
      </h3>
      <div className="flex flex-col gap-3">
        <a 
          href="mailto:paulberthelotirl@gmail.com" 
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Mail className="mr-2 h-4 w-4" /> {t("email")}
        </a>
        <a 
          href="https://github.com/PaulBerthelot21" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Github className="mr-2 h-4 w-4" /> {t("github")}
        </a>
        <a 
          href="https://www.linkedin.com/in/paul-berthelot-012198198/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Linkedin className="mr-2 h-4 w-4" /> {t("linkedin")}
        </a>
      </div>
    </motion.div>
  );
} 