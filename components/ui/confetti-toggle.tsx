"use client"

import * as React from "react"
import { PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { launchConfettiSuper } from "@/components/animations/animation-confetti-super"
import { useTranslations } from "next-intl"

// Palette de couleurs dans le style du portfolio
const portfolioColors = [
  '#3B82F6', // bleu
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#EC4899', // rose
  '#F43F5E', // rouge
  '#10B981', // vert émeraude
  '#14B8A6', // turquoise
  '#0EA5E9', // bleu clair
  '#6D28D9', // violet foncé
  '#D946EF', // magenta
];

export function ConfettiToggle() {
    const t = useTranslations("Settings");

    const handleToggleConfetti = () => {
        // Sélectionner aléatoirement 4-6 couleurs de la palette
        const numberOfColors = Math.floor(Math.random() * 3) + 4; // 4 à 6 couleurs
        let selectedColors: string[] = [];
        
        // Copier et mélanger les couleurs
        const shuffledColors = [...portfolioColors].sort(() => Math.random() - 0.5);
        selectedColors = shuffledColors.slice(0, numberOfColors);
        
        launchConfettiSuper({
            colors: selectedColors,
        });
    }

    return (
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleConfetti}
        >
          <PartyPopper className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("confetti")}</span>
        </Button>
    )
}