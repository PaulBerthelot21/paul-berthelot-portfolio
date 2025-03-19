"use client"

import { LangSwitcher } from "./lang-switcher";
import { ModeToggle } from "./mode-toggle";
import { Link } from "@/i18n/navigation";
export function Navbar() {
    return (
        <div className="flex bg-red-500 dark:bg-blue-500 flex-row justify-between items-center p-4">
            <div className="flex flex-row items-center gap-4">
                <h1 className="text-2xl font-bold">Paul Berthelot</h1>
                <div className="flex flex-row gap-2">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <LangSwitcher />
                <ModeToggle />
            </div>
        </div>
    );
}
