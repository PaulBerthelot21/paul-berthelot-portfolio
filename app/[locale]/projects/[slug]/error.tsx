'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Journaliser l'erreur côté client
    console.error('Erreur dans la page du projet:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
      <h2 className="text-2xl font-bold mb-4">Une erreur s&apos;est produite</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {error.message || "Impossible de charger les détails du projet"}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={reset}
          variant="outline"
        >
          Réessayer
        </Button>
        <Button 
          onClick={() => router.push('/projects')}
          variant="default"
        >
          Retour aux projets
        </Button>
      </div>
    </div>
  );
} 