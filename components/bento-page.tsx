"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatedText } from "./animations/AnimatedText";
import { ModalType } from "./sections/modal-content";
import Modal from "./sections/modal";
import AboutSection from "./sections/about-section";
import SkillsSection from "./sections/skills-sections";
import EducationSection from "./sections/education-section";
import ProjectsSection from "./sections/projects-section";
import ExperienceSection from "./sections/experience-section";
import ContactSection from "./sections/contact-section";
import SettingsSection from "./sections/settings-section";
import { useRouter } from "next/navigation";

export default function BentoPage() {
  const t = useTranslations("Home");
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const router = useRouter();

  // Variantes pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const openModal = (type: ModalType) => {
    setModalOpen(type);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <AnimatedText
            text={t("greeting")}
            wordByWord
            className="text-4xl md:text-6xl font-bold mb-2"
            delay={0.3}
            duration={0.08}
          />
          <AnimatedText
            text={t("title")}
            wordByWord
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
            delay={0.8}
            duration={0.08}
          />
        </div>

        {/* Grille Bento */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[auto,auto,auto] gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profil */}
          <AboutSection onOpen={() => openModal("about")} itemVariants={itemVariants} />

          {/* Compétences */}
          <SkillsSection onOpen={() => openModal("skills")} itemVariants={itemVariants} />

          {/* Formation */}
          <EducationSection onOpen={() => openModal("education")} itemVariants={itemVariants} />

          {/* Projet en vedette */}
          <ProjectsSection onOpen={() => router.push("/projects")} itemVariants={itemVariants} />

          {/* Expérience */}
          <ExperienceSection itemVariants={itemVariants} />

          {/* Contact */}
          <ContactSection itemVariants={itemVariants} />

          {/* Préférences (Thème & Langue) */}
          <SettingsSection itemVariants={itemVariants} />
        </motion.div>
      </div>

      {/* Modal */}
      <Modal modalOpen={modalOpen} closeModal={closeModal} />
    </>
  );
} 