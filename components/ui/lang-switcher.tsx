"use client"

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "./button";
import { routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function LangSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    
    // Filtrer les autres langues disponibles (toutes sauf celle active)
    const otherLocales = routing.locales.filter(lang => lang !== locale);
        
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                >
                    {locale.toUpperCase()}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {otherLocales.map((lang) => (
                    <DropdownMenuItem key={lang} asChild>
                        <Link href={pathname} locale={lang}>
                            {lang.toUpperCase()}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

