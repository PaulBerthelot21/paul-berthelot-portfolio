'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectsList } from "./projects-list";
import { ProjectData } from "@/lib/projects-utils";
import { TechnologiesFilter } from "./technologies-filter";

interface ClientProjectsProps {
  initialProjects: ProjectData[];
}

export function ClientProjects({ initialProjects }: ClientProjectsProps) {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const tProjects = useTranslations("Projects");

  // Extraire toutes les technologies uniques des projets
  const allTechnologies = Array.from(
    new Set(
      initialProjects.flatMap(project => project.technologies)
    )
  ).sort();

  // Filtrer les projets en fonction des technologies sélectionnées
  const filteredProjects = selectedTechnologies.length > 0
    ? initialProjects.filter(project =>
        selectedTechnologies.some(tech => project.technologies.includes(tech))
      )
    : initialProjects;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">{tProjects("title")}</h1>
      
      <TechnologiesFilter
        technologies={allTechnologies}
        selectedTechnologies={selectedTechnologies}
        onTechnologyToggle={setSelectedTechnologies}
      />

      <ProjectsList 
        projects={filteredProjects} 
        noProjectsMessage={tProjects("noProjects")} 
      />
    </div>
  );
} 