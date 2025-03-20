"use client"
import * as React from "react"
import { Globe } from "lucide-react"
import { Button } from "./button";


export function LanguageToggle() {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => console.log("Language Toggle Clicked")}
        >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle language</span>
        </Button>
    );
}