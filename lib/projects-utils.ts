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

export async function getProjects(locale: string = 'fr'): Promise<ProjectData[]> {
  try {
    // Vérifier d'abord si le dossier spécifique à la langue existe
    const localizedDirectory = path.join(process.cwd(), `public/projects/${locale}`);
    const defaultDirectory = path.join(process.cwd(), 'public/projects');
    
    // Utiliser le dossier localisé s'il existe, sinon utiliser le dossier par défaut
    const projectsDirectory = fs.existsSync(localizedDirectory) 
      ? localizedDirectory 
      : defaultDirectory;
    
    const fileNames = fs.readdirSync(projectsDirectory);
    
    const projects = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        const { data, content } = matter(fileContents);
        
        return {
          slug,
          title: data.title || slug,
          description: data.description || '',
          technologies: data.technologies || [],
          imageColor: data.imageColor || 'from-blue-400 to-purple-500',
          content,
          order: data.order !== undefined ? Number(data.order) : undefined,
        };
      });
    
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
    // Vérifier d'abord si le fichier existe dans le dossier spécifique à la langue
    const localizedDirectory = path.join(process.cwd(), `public/projects/${locale}`);
    const defaultDirectory = path.join(process.cwd(), 'public/projects');
    
    let fullPath = path.join(localizedDirectory, `${slug}.md`);
    
    // Si le fichier n'existe pas dans le dossier localisé, essayer le dossier par défaut
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(defaultDirectory, `${slug}.md`);
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      technologies: data.technologies || [],
      imageColor: data.imageColor || 'from-blue-400 to-purple-500',
      content,
      order: data.order !== undefined ? Number(data.order) : undefined,
    };
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${slug}:`, error);
    return null;
  }
}
