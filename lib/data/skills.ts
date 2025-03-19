export type Skill = {
    id: string;
    name: string;
    icon?: string;
    skillType: "frontend" | "backend" | "database" | "devops" | "other";
};

export const skills: Skill[] = [
    { id: "angular", name: "Angular", skillType: "frontend" },
    { id: "nextjs", name: "Next.js", skillType: "frontend" },
    { id: "astro", name: "Astro", skillType: "frontend" },
    { id: "tailwind", name: "Tailwind CSS", skillType: "frontend" },
    { id: "typescript", name: "TypeScript", skillType: "frontend" },
    { id: "javascript", name: "JavaScript", skillType: "frontend" },
    { id: "symfony", name: "Symfony", skillType: "backend" },
    { id: "php", name: "PHP", skillType: "backend" },
    { id: "nestjs", name: "NestJS", skillType: "backend" },
    { id: "java", name: "Java", skillType: "backend" },
    { id: "mysql", name: "MySQL", skillType: "database" },
    { id: "postgresql", name: "PostgreSQL", skillType: "database" },
    { id: "mongodb", name: "MongoDB", skillType: "database" },
    { id: "docker", name: "Docker", skillType: "devops" },
    { id: "git", name: "Git", skillType: "devops" },
    { id: "github", name: "GitHub", skillType: "devops" },
    { id: "gitlab", name: "GitLab", skillType: "devops" },
    { id: "linux", name: "Linux", skillType: "other" },
    { id: "figma", name: "Figma", skillType: "other" },
    { id: "cicd", name: "CI/CD", skillType: "devops" },
    { id: "jest", name: "Jest", skillType: "frontend" },
    { id: "cypress", name: "Cypress", skillType: "frontend" },
    { id: "restapi", name: "REST API", skillType: "backend" },
    { id: "ollama", name: "Ollama", skillType: "other" },
];