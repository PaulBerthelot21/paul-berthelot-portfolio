import { useTranslations } from "next-intl";
import { educationIds, certificationIds } from "@/lib/data/education";
import { experienceIds } from "@/lib/data/experiences";
import { Skill, skills } from "@/lib/data/skills"; 

export type ModalType = "about" | "skills" | "projects" | "education" | "experience" | null;

type ModalContentProps = {
  modalOpen: ModalType;
};

export default function ModalContent({ modalOpen }: ModalContentProps) {
  const tAbout = useTranslations("About");
  const tEducation = useTranslations("Education");
  const tExperience = useTranslations("Experience");
  const tSkills = useTranslations("Skills");

  switch (modalOpen) {
    case "about":
      return (
        <div className="p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{tAbout("bioTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{tAbout("bioPara1")}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{tAbout("bioPara2")}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{tAbout("bioPara3")}</p>
        </div>
      );
    case "skills":
      return (
        <div className="p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{tSkills("title")}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">{tSkills("frontend")}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.skillType === "frontend").map((skill: Skill) => (
                  <span key={skill.id} className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">{tSkills("backend")}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.skillType === "backend").map((skill: Skill) => (
                  <span key={skill.id} className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">{tSkills("database")}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.skillType === "database").map((skill: Skill) => (
                  <span key={skill.id} className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">{tSkills("devops")}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.skillType === "devops").map((skill: Skill) => (
                  <span key={skill.id} className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{tSkills("other")}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.skillType === "other").map((skill: Skill) => (
                  <span key={skill.id} className="bg-gray-100 dark:bg-gray-900/30 px-3 py-1 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      );
    
    case "education":
      return (
        <div className="p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{tEducation("title")}</h2>
          <div className="space-y-6">
            {educationIds.map((eduId) => (
              <div key={eduId} className="border-l-2 border-blue-500 pl-4 pb-2">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-semibold">{tEducation(`${eduId}.degree`)}</h3>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                      {tEducation(`${eduId}.years`)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">{tEducation(`${eduId}.institution`)}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{tEducation(`${eduId}.description`)}</p>
                </div>
            ))}
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">{tEducation("certifications.title")}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                {certificationIds.map((certId) => (
                  <li key={certId}>{tEducation(`certifications.${certId}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
      
    case "experience":
      return (
        <div className="p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">{tExperience("title")}</h2>
          <div className="space-y-6">
            {experienceIds.map((expId) => (
              <div key={expId}>
                <h3 className="text-xl font-semibold">{tExperience(`${expId}.job`)}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">{tExperience(`${expId}.location`)}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">{tExperience(`${expId}.years`)}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">{tExperience(`${expId}.jobType`)}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">{tExperience(`${expId}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      );
    
      default:
      return null;
  }
} 