"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CerebruasProps = {
  credits?: number
  onCreditsClick?: () => void
  name?: string
  className?: string
  style?: React.CSSProperties
}

export function Cerebruas({
  credits,
  onCreditsClick,
  name = "Cerebruas",
  className,
  style,
}: CerebruasProps) {
  return (
    <div className={cn("relative rounded-lg border bg-background p-6", className)} style={style}>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 left-2"
        onClick={onCreditsClick}
      >
        {typeof credits === "number" ? `Credits: ${credits}` : "Credits"}
      </Button>

      <div className="text-2xl font-semibold">{name}</div>
    </div>
  )
}

