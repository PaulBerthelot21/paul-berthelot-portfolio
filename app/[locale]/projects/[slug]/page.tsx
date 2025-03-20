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
  
  console.log(`[DEBUG] Params statiques générés:`, allParams);
  return allParams;
}

// Définir le type des paramètres avec Promise selon les recommandations pour Next.js 15
type ProjectPageParams = Promise<{ slug: string; locale: string }>;

export default async function ProjectPage(props: { params: ProjectPageParams }) {
  const params = await props.params;
  const { slug, locale } = params;
  
  console.log(`[DEBUG] Page de projet demandée pour slug=${slug}, locale=${locale}`);
  
  try {
    const project = await getProjectBySlug(slug, locale);
    
    console.log(`[DEBUG] Résultat de getProjectBySlug:`, project ? 'Projet trouvé' : 'Projet non trouvé');
    
    if (!project) {
      console.log(`[DEBUG] Projet non trouvé, redirection vers 404`);
      notFound();
    }
    
    console.log(`[DEBUG] Traitement du contenu Markdown avec remark`);
    try {
      const processedContent = await remark()
        .use(html)
        .process(project.content);
      const contentHtml = processedContent.toString();
      
      console.log(`[DEBUG] Contenu HTML généré avec succès, longueur:`, contentHtml.length);
      
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
