import { getProjectBySlug, getProjects } from "@/lib/projects-utils";
import { notFound } from "next/navigation";
import html from 'remark-html';
import { remark } from 'remark';
import { ProjectDetail } from "@/components/projects/projects-slug-page";

// Permet de générer les pages statiques pour tous les projets
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params
}: {
  params: { slug: string, locale: string }
}) {
  // Utiliser Promise.resolve pour s'assurer que les paramètres sont attendus
  const { slug } = await Promise.resolve(params);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
}
