import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Monitor, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Type pour ProjectData
type ProjectData = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  imageColor: string;
  content: string;
};

type ProjectsSectionProps = {
  onOpen: () => void;
  itemVariants: any;
};

export default function ProjectsSection({ onOpen, itemVariants }: ProjectsSectionProps) {
  const tProjects = useTranslations("Projects");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  const displayProjects = projects.slice(0, 3);
  const hasMoreProjects = projects.length > 3;

  return (
    <motion.div 
      className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl p-6 shadow-lg cursor-pointer relative group"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onOpen}
    >
      <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
        <ArrowRight className="h-4 w-4 text-purple-500 dark:text-purple-400" />
      </div>
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Monitor className="mr-2 h-5 w-5" /> {tProjects("title")}
      </h3>
      
      <div className="flex flex-col gap-4 mb-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse h-6 w-6 rounded-full bg-purple-300 dark:bg-purple-700"></div>
          </div>
        ) : displayProjects.length > 0 ? (
          displayProjects.map((project: ProjectData, index: number) => (
            <div key={project.slug} className="flex flex-col md:flex-row gap-4 items-center border-b pb-4 last:border-0 last:pb-0 dark:border-slate-700">
              <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.imageColor}`}></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl text-center px-2">
                  <span className="line-clamp-2 overflow-ellipsis text-center w-full">{project.title}</span>
                </div>
              </div>
              <div className="w-full overflow-hidden">
                <h4 className="text-lg font-semibold mb-1 text-ellipsis overflow-hidden whitespace-nowrap">{project.title}</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm line-clamp-2 overflow-hidden">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl text-center px-2">
                <span className="line-clamp-2 overflow-ellipsis text-center w-full">Portfolio</span>
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <h4 className="text-lg font-semibold mb-1 text-ellipsis overflow-hidden whitespace-nowrap">{tProjects("portfolio.title")}</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm line-clamp-2 overflow-hidden">
                {tProjects("portfolio.description")}
              </p>
            </div>
          </div>
        )}
        
        {hasMoreProjects && (
          <div className="text-center mt-2">
            <div className="inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              {tProjects("seeAllProjects")}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
