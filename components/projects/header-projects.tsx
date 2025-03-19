"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeaderProjects() {
  const router = useRouter();
  const tProjects = useTranslations("Projects");
  return (
    <div className="flex justify-between items-center">
      <Button onClick={() => router.push("/")}>
        <ArrowLeft className="w-4 h-4" />
        {tProjects("back")}
      </Button>
    </div>
  );
}
