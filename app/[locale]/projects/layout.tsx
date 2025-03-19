"use client";

import HeaderProjects from "@/components/projects/header-projects";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-center">
        <HeaderProjects />    
      </div>
      {children}
    </div>
  );
}

