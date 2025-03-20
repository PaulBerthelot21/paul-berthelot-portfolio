import { ProjectData } from "@/lib/projects-utils";

interface ProjectDetailProps {
  project: ProjectData;
  contentHtml: string;
}

export function ProjectDetail({ project, contentHtml }: ProjectDetailProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className={`h-64 bg-gradient-to-br ${project.imageColor} flex items-center justify-center text-white`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center">{project.title}</h1>
        </div>
        
        <div className="p-8">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}
