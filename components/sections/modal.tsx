import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import ModalContent, { ModalType } from "./modal-content";

type ModalProps = {
  modalOpen: ModalType;
  closeModal: () => void;
};

export default function Modal({ modalOpen, closeModal }: ModalProps) {
  const tEducation = useTranslations("Education");
  const tExperience = useTranslations("Experience");
  const tSkills = useTranslations("Skills");
  const tAbout = useTranslations("About");


  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!modalOpen) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeModal}
        />
        <motion.div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl z-50 max-w-4xl w-[calc(100%-2rem)] max-h-[calc(100vh-4rem)] overflow-y-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold">
              {modalOpen === "about" && tAbout("title")}
              {modalOpen === "skills" && tSkills("title")}
              {modalOpen === "education" && tEducation("title")}
              {modalOpen === "experience" && tExperience("title")}
            </h2>
            <button 
              onClick={closeModal}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="overflow-y-auto">
            <ModalContent modalOpen={modalOpen} />
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
} 