import { getProjectBySlug, getProjects } from "@/lib/projects-utils";
import { notFound } from "next/navigation";
import html from 'remark-html';
import { remark } from 'remark';
import { ProjectDetail } from "@/components/projects/projects-slug-page";

// Permet de générer les pages statiques pour tous les projets
export async function generateStaticParams() {
  const locales = ['fr', 'en'];
  const allParams = [];
  
  for (const locale of locales) {
    const projects = await getProjects(locale);
    const params = projects.map((project) => ({
      slug: project.slug,
      locale,
    }));
    allParams.push(...params);
  }
  
  return allParams;
}

// Définir le type des paramètres avec Promise selon les recommandations pour Next.js 15
type ProjectPageParams = Promise<{ slug: string; locale: string }>;

export default async function ProjectPage(props: { params: ProjectPageParams }) {
  const params = await props.params;
  const { slug, locale } = params;
    
  try {
    const project = await getProjectBySlug(slug, locale);
    
    if (!project) {
      notFound();
    }
    
    try {
      const processedContent = await remark()
        .use(html)
        .process(project.content);
      const contentHtml = processedContent.toString();
      
      return (
        <ProjectDetail
          project={project}
          contentHtml={contentHtml}
        />
      );
    } catch (remarkError) {
      console.error(`[DEBUG] Erreur lors du traitement du contenu Markdown:`, remarkError);
      throw remarkError;
    }
  } catch (error) {
    console.error(`[DEBUG] Erreur globale dans ProjectPage:`, error);
    throw error; // Permet à Next.js de gérer correctement l'erreur
  }
}
