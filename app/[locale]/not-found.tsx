import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
export default function NotFound() {
  const t = useTranslations('NotFound');
  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">{t('title')}</h1>
    <Link href="/">{t('home')}</Link>
  </div>;
}
