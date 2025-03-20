import Link from "next/link";
import { ProjectData } from "@/lib/projects-utils";

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
        <div className={`relative h-48 bg-gradient-to-br ${project.imageColor}`}>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl text-center px-4">
            <span className="line-clamp-2 overflow-ellipsis">{project.title}</span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 truncate">{project.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
