'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

interface TechnologiesFilterProps {
  technologies: string[];
  selectedTechnologies: string[];
  onTechnologyToggle: (technologies: string[]) => void;
}

export function TechnologiesFilter({ 
  technologies, 
  selectedTechnologies, 
  onTechnologyToggle 
}: TechnologiesFilterProps) {
  const t = useTranslations('Projects');

  const toggleTechnology = (tech: string) => {
    onTechnologyToggle(
      selectedTechnologies.includes(tech)
        ? selectedTechnologies.filter(t => t !== tech)
        : [...selectedTechnologies, tech]
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{t('filterByTechnology')}</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Button
            key={tech}
            onClick={() => toggleTechnology(tech)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedTechnologies.includes(tech)
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60'
              }`}
          >
            {tech}
          </Button>
        ))}
      </div>
    </div>
  );
} 