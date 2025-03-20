import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        {/* Placeholder pour l'en-tête avec dégradé */}
        <Skeleton className="h-64 w-full" />
        
        <div className="p-8">
          {/* Placeholder pour la description */}
          <Skeleton className="h-6 w-3/4 mb-6" />
          
          {/* Placeholder pour les tags de technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
          
          {/* Placeholder pour le contenu */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 