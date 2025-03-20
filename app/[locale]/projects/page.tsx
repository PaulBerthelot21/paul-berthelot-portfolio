import { useTranslations } from "next-intl";
import { getProjects } from "@/lib/projects-utils";
import { ProjectsList } from "@/components/projects/projects-list";

export default function ProjectsPage() {
  const projects = getProjects();
  const tProjects = useTranslations("Projects");

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">{tProjects("title")}</h1>
      
      <ProjectsList 
        projects={projects} 
        noProjectsMessage={tProjects("noProjects")} 
      />
    </div>
  );
}
