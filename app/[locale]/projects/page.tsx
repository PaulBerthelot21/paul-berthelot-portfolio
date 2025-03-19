import { useTranslations } from "next-intl";
import { getProjects, ProjectData } from "@/lib/projects-utils";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getProjects();
  const tProjects = useTranslations("Projects");

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">{tProjects("title")}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project: ProjectData) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="block">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
                <div className={`relative h-48 bg-gradient-to-br ${project.imageColor}`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                    {project.title}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
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
          ))
        ) : (
          // Projets par défaut si aucun n'est trouvé
          <>
            {/* Projet Portfolio */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">Portfolio</div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Portfolio Personnel</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Un portfolio moderne développé avec Next.js, TypeScript et Tailwind CSS.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">Next.js</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">TypeScript</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">Tailwind CSS</span>
                </div>
              </div>
            </div>
            
            {/* Projet E-commerce */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">E-commerce</div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Boutique en ligne</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Une plateforme de commerce électronique avec système de panier et paiement sécurisé.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">React</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">Node.js</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">MongoDB</span>
                </div>
              </div>
            </div>
            
            {/* Projet Productivité */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-amber-400 to-orange-500">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">Productivity</div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Application de Productivité</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Une application de gestion de tâches et de suivi du temps avec fonctionnalités collaboratives.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">Vue.js</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">Express</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">PostgreSQL</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
