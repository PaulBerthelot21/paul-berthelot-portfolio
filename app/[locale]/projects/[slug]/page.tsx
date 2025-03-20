import { getProjectBySlug, getProjects } from "@/lib/projects-utils";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { ProjectDetail } from "@/components/projects/projects-slug-page";

// Permet de générer les pages statiques pour tous les projets
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  // Convertir le contenu Markdown en HTML
  const contentHtml = marked.parse(project.content) as string;
  
  return (
    <ProjectDetail 
      project={project} 
      contentHtml={contentHtml} 
      backLinkText="Retour aux projets" 
    />
  );
}
