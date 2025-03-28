"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LanguageToggle } from "../ui/language-toggle";

interface ProjectsHeaderProps {
  projectTitle?: string;
}

export default function ProjectsHeader({ projectTitle }: ProjectsHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tProjects = useTranslations("Projects");

  // Déterminer si nous sommes sur une page de projet en analysant le pathname
  // Format attendu: /[locale]/projects/[slug]
  const pathSegments = pathname.split('/').filter(Boolean);
  const isProjectPage = pathSegments.length >= 3 && pathSegments[1] === 'projects' && pathSegments[2];

  // Si projectTitle n'est pas fourni mais que nous sommes sur une page de projet,
  // utiliser le slug comme titre temporaire (à remplacer par le vrai titre si nécessaire)
  const displayTitle = projectTitle || (isProjectPage ? pathSegments[2].replace(/-/g, ' ') : '');

  return (
    <div className="sticky top-0 z-10 bg-background flex flex-row justify-between items-center py-4 border-b mb-6 gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  {tProjects("home")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isProjectPage ? (
                <BreadcrumbLink asChild>
                  <Link href="/projects">
                    {tProjects("projects")}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{tProjects("projects")}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {isProjectPage && displayTitle && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{displayTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        <LanguageToggle />
        <ModeToggle />
      </div>
    </div>
  );
}
