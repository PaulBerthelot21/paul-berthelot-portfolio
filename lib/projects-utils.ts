import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  imageColor: string;
  content: string;
}

export function getProjects(): ProjectData[] {
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
          content
        };
      });
    
    return projects;
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
    return [];
  }
}

export function getProjectBySlug(slug: string): ProjectData | null {
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
      content
    };
  } catch (error) {
    console.error(`Erreur lors du chargement du projet ${slug}:`, error);
    return null;
  }
}
