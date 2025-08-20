"use client"

import confetti from 'canvas-confetti';

interface ConfettiSuperProps {
  colors?: string[];
  duration?: number;
}

// Fonction qui adapte les paramètres selon la taille d'écran
const getResponsiveConfig = () => {
  if (typeof window === 'undefined') return { particleCount: 6, radius: 0.3, scalar: 0.7 };
  
  const width = window.innerWidth;
  
  if (width < 640) { // Mobile
    return {
      particleCount: 4,
      radius: 0.25,
      scalar: 0.6,
      ticks: 250
    };
  } else if (width < 1024) { // Tablet
    return {
      particleCount: 5,
      radius: 0.28,
      scalar: 0.65,
      ticks: 275
    };
  } else { // Desktop
    return {
      particleCount: 6,
      radius: 0.3,
      scalar: 0.7,
      ticks: 300
    };
  }
};

// Fonction qui crée une spirale de confettis avec transition fluide
const spiral = (colors?: string[], duration = 5000) => {
  const defaultColors = colors || ['#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'];
  const animationEnd = Date.now() + duration;
  const fadeOutDuration = 1000; // 1 seconde de fade out
  
  const frame = () => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return;
    }
    
    const config = getResponsiveConfig();
    const progress = 1 - (timeLeft / duration);
    const radians = progress * Math.PI * 8;
    
    // Calculer l'intensité pour le fade out
    let intensity = 1;
    if (timeLeft < fadeOutDuration) {
      intensity = timeLeft / fadeOutDuration;
    }
    
    const adjustedParticleCount = Math.max(1, Math.floor(config.particleCount * intensity));
    
    confetti({
      particleCount: adjustedParticleCount,
      startVelocity: 0,
      ticks: config.ticks,
      origin: {
        x: 0.5 + config.radius * Math.cos(radians),
        y: 0.5 + config.radius * Math.sin(radians)
      },
      colors: defaultColors,
      shapes: ['circle', 'square'],
      gravity: 0.5,
      scalar: config.scalar * intensity,
      drift: 0,
    });
    
    requestAnimationFrame(frame);
  };
  
  frame();
};

export const launchConfettiSuper = ({ colors, duration = 5000 }: ConfettiSuperProps = {}) => {
  setTimeout(() => {
    spiral(colors, duration);
  }, 0);
};

export default function AnimationConfettiSuper() {
  return null; // Composant sans rendu visuel, fournit uniquement des fonctions utilitaires
}
