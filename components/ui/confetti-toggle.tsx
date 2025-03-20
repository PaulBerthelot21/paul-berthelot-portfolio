"use client"

import * as React from "react"
import { PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ConfettiToggle() {
    return (
        <Button
          variant="outline"
          size="icon"
          onClick={() => console.log}
        >
          <PartyPopper className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle confetti</span>
        </Button>
      )
}