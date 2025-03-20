"use client"

import confetti from 'canvas-confetti';

interface ConfettiSuperProps {
  type?: 'spiral' | 'rain';
  colors?: string[];
  duration?: number;
}

// Fonction qui crée une spirale de confettis
const spiral = (colors?: string[]) => {
  const defaultColors = colors || ['#9c27b0', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'];
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  
  const frame = () => {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return;
    }
    
    const particleCount = 6;
    const radians = (timeLeft / duration) * Math.PI * 8;
    
    confetti({
      particleCount,
      startVelocity: 0,
      ticks: 300,
      origin: {
        x: 0.5 + 0.3 * Math.cos(radians),
        y: 0.5 + 0.3 * Math.sin(radians)
      },
      colors: defaultColors,
      shapes: ['circle', 'square'],
      gravity: 0.5,
      scalar: 0.7,
      drift: 0,
    });
    
    requestAnimationFrame(frame);
  };
  
  frame();
};

// Fonction qui fait pleuvoir des confettis
const rain = (colors?: string[]) => {
  const defaultColors = colors || ['#76d7ea', '#a9eee6', '#56bae6', '#a6caf0', '#bfdbf7'];
  const duration = 6000;
  const end = Date.now() + duration;
  
  const makeItRain = () => {
    if (Date.now() > end) {
      return;
    }
    
    confetti({
      particleCount: 3,
      angle: 140,
      spread: 55,
      origin: { x: Math.random(), y: -0.1 },
      colors: defaultColors,
      gravity: 2.5,
      startVelocity: 15,
      scalar: 0.9,
      drift: 0,
      ticks: 400,
    });
    
    confetti({
      particleCount: 3,
      angle: 40,
      spread: 55,
      origin: { x: Math.random(), y: -0.1 },
      colors: defaultColors,
      gravity: 2.5,
      startVelocity: 15,
      scalar: 0.9,
      drift: 0,
      ticks: 400,
    });
    
    requestAnimationFrame(makeItRain);
  };
  
  makeItRain();
};

export const launchConfettiSuper = ({ type = 'spiral', colors, duration = 5000 }: ConfettiSuperProps = {}) => {
  setTimeout(() => {
    if (type === 'spiral') {
      spiral(colors);
    } else {
      rain(colors);
    }
  }, 0);
  
  if (duration > 0) {
    setTimeout(() => {
      confetti.reset();
    }, duration);
  }
};

export default function AnimationConfettiSuper() {
  return null; // Composant sans rendu visuel, fournit uniquement des fonctions utilitaires
}
