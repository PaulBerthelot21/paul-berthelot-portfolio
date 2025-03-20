import { getProjects } from "@/lib/projects-utils";
import { ClientProjects } from "@/components/projects/client-projects";

// Définir le type des paramètres avec Promise selon les recommandations pour Next.js 15
type ProjectsPageParams = Promise<{ locale: string }>;

export default async function ProjectsPage(props: { params: ProjectsPageParams }) {
  const params = await props.params;
  const { locale } = params;
  const projects = await getProjects(locale);
  
  return <ClientProjects initialProjects={projects} />;
}
