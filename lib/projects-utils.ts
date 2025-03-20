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

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'public/projects');
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

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'public/projects');
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
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
