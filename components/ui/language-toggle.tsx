"use client"
import * as React from "react"
import { Globe } from "lucide-react"
import { Button } from "./button";
import { useRouter, usePathname } from "../../i18n/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useTranslations } from "next-intl";
import { routing } from "../../i18n/routing";

// Carte des emojis de drapeaux pour chaque langue
const LANGUAGE_FLAGS: Record<string, string> = {
    fr: "🇫🇷",
    en: "🇬🇧",
    // Ajouter d'autres langues ici si nécessaire
};

export function LanguageToggle() {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("Language");
    
    // Récupérer les langues disponibles depuis la configuration
    const availableLocales = routing.locales;
    
    const switchLocale = (locale: string) => {
        router.replace(pathname, { locale });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label={t("toggle")}
                >
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{t("toggle")}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-1">
                <div className="flex flex-col gap-1">
                    {availableLocales.map((locale) => (
                        <Button 
                            key={locale}
                            variant="ghost" 
                            onClick={() => switchLocale(locale)}
                            className="justify-start"
                        >
                            {LANGUAGE_FLAGS[locale]} {t(locale)}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}