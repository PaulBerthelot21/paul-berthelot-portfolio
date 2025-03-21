"use client";
import { Button } from '@/components/ui/button';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/navigation';
export default function NotFound() {
    const tError = useTranslations('ProjectError');
    const router = useRouter();
    
    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">{tError('title')}</h1>
            <p className="mb-6">{tError('message')}</p>
            <p className="mb-6">{tError('suggestion')}</p>

            <Button variant={"outline"} className="mt-4" onClick={() => router.push('/projects')}>
                {tError('goBackToProjects')}
            </Button>
        </main>
    );
}