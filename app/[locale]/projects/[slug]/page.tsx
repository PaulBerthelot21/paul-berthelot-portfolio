import { getProjectBySlug, getProjects } from "@/lib/projects-utils";
import { notFound } from "next/navigation";
import html from 'remark-html';
import { remark } from 'remark';
import { ProjectDetail } from "@/components/projects/projects-slug-page";

// Permet de générer les pages statiques pour tous les projets
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const projects = await getProjects(locale);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Définir le type des paramètres avec Promise selon les recommandations pour Next.js 15
type ProjectPageParams = Promise<{ slug: string; locale: string }>;

export default async function ProjectPage(props: { params: ProjectPageParams }) {
  const params = await props.params;
  const { slug, locale } = params;
  const project = await getProjectBySlug(slug, locale);

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
