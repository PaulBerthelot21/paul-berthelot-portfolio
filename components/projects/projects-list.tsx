import { ProjectData } from "@/lib/projects-utils";
import { ProjectCard } from "./projects-card";

interface ProjectsListProps {
  projects: ProjectData[];
  noProjectsMessage: string;
}

export function ProjectsList({ projects, noProjectsMessage }: ProjectsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          {noProjectsMessage}
        </div>
      )}
    </div>
  );
}
