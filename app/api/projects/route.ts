import { getProjects } from '@/lib/projects-utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    );
  }
} 