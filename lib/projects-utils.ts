import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  imageColor: string;
  content: string;
  order?: number; // Champ optionnel pour définir l'ordre d'affichage
}

// Précharger tous les projets au moment de la construction
const projectsCache: Record<string, Record<string, ProjectData>> = {
  fr: {},
  en: {},
};

// Cette fonction est appelée pendant la construction
function loadAllProjects() {
  const locales = ['fr', 'en'];
  
  for (const locale of locales) {
    try {
      const localizedDirectory = path.join(process.cwd(), `public/projects/${locale}`);
      const defaultDirectory = path.join(process.cwd(), 'public/projects');
      
      // Charger les projets du dossier localisé s'il existe
      if (fs.existsSync(localizedDirectory)) {
        const fileNames = fs.readdirSync(localizedDirectory);
        
        fileNames
          .filter(fileName => fileName.endsWith('.md'))
          .forEach(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(localizedDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            
            const { data, content } = matter(fileContents);
            
            projectsCache[locale][slug] = {
              slug,
              title: data.title || slug,
              description: data.description || '',
              technologies: data.technologies || [],
              imageColor: data.imageColor || 'from-blue-400 to-purple-500',
              content,
              order: data.order !== undefined ? Number(data.order) : undefined,
            };
          });
      }
      
      // Charger aussi les projets du dossier par défaut (seulement s'ils n'existent pas déjà dans la locale)
      const defaultFileNames = fs.readdirSync(defaultDirectory);
      
      defaultFileNames
        .filter(fileName => fileName.endsWith('.md'))
        .forEach(fileName => {
          const slug = fileName.replace(/\.md$/, '');
          
          // Si le projet n'existe pas déjà dans la locale spécifique
          if (!projectsCache[locale][slug]) {
            const fullPath = path.join(defaultDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            
            const { data, content } = matter(fileContents);
            
            projectsCache[locale][slug] = {
              slug,
              title: data.title || slug,
              description: data.description || '',
              technologies: data.technologies || [],
              imageColor: data.imageColor || 'from-blue-400 to-purple-500',
              content,
              order: data.order !== undefined ? Number(data.order) : undefined,
            };
          }
        });
    } catch (error) {
      console.error(`Erreur lors du préchargement des projets pour ${locale}:`, error);
    }
  }
}

// Précharger les projets au démarrage
loadAllProjects();

export async function getProjects(locale: string = 'fr'): Promise<ProjectData[]> {
  // Utiliser le cache au lieu de lire les fichiers chaque fois
  try {
    const projects = Object.values(projectsCache[locale] || {});
    
    // Trier les projets: d'abord par ordre (si défini), puis les autres
    return projects.sort((a, b) => {
      // Si les deux projets ont un ordre défini, les trier par ordre numérique
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      
      // Projets avec ordre défini apparaissent en premier
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      
      // Pour les autres projets sans ordre défini, conserver l'ordre d'origine
      return 0;
    });
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, locale: string = 'fr'): Promise<ProjectData | null> {
  try {
    console.log(`[DEBUG] Recherche du projet ${slug} dans la locale ${locale}`);
    
    // Chercher dans le cache au lieu de lire le fichier
    if (projectsCache[locale]?.[slug]) {
      console.log(`[DEBUG] Projet trouvé dans le cache pour locale=${locale}`);
      return projectsCache[locale][slug];
    }
    
    // Si pas trouvé dans la locale spécifique, essayer la locale par défaut 'fr'
    if (locale !== 'fr' && projectsCache['fr']?.[slug]) {
      console.log(`[DEBUG] Projet trouvé dans le cache pour locale=fr`);
      return projectsCache['fr'][slug];
    }
    
    console.log(`[DEBUG] Projet ${slug} non trouvé dans le cache`);
    return null;
  } catch (error) {
    console.error(`[DEBUG] Erreur complète lors du chargement du projet ${slug}:`, error);
    return null;
  }
}
