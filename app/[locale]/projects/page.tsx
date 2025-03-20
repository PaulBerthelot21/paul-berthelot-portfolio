import { getProjects } from "@/lib/projects-utils";
import { ClientProjects } from "@/components/projects/client-projects";

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ClientProjects initialProjects={projects} />;
}
