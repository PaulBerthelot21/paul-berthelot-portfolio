import { getProjects } from "@/lib/projects-utils";
import { ClientProjects } from "@/components/projects/client-projects";

export default async function ProjectsPage({
  params
}: {
  params: { locale: string }
}) {
  const { locale } = params;
  const projects = await getProjects(locale);
  
  return <ClientProjects initialProjects={projects} />;
}
