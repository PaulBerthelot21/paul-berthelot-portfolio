import { getProjects } from '@/lib/projects-utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Récupérer la locale à partir des paramètres de la requête
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') || 'fr';
    
    const projects = await getProjects(locale);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    );
  }
} 