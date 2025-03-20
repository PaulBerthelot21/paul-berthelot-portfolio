"use client";

import ProjectsHeader from "@/components/projects/projects-header";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 max-w-6xl">
      <ProjectsHeader />
      <main className="mt-4">
        {children}
      </main>
    </div>
  );
}

