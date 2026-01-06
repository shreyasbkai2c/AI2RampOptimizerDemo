import React, { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "@/lib/utils"

interface InfoTipProps {
    title: string
    points: string[]
    paragraph?: string
    className?: string
}

export function InfoTip({ title, points, paragraph, className }: InfoTipProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const content = (
        <div className="space-y-3 p-1">
            <h4 className="font-bold text-sm leading-tight text-foreground">{title}</h4>
            {paragraph && <p className="text-xs text-muted-foreground leading-relaxed">{paragraph}</p>}
            <ul className="space-y-2 pt-1">
                {points.map((point, i) => (
                    <li key={i} className="text-xs flex items-start gap-2 text-foreground/80 leading-snug">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    )

    const trigger = (
        <button
            type="button"
            className={cn(
                "inline-flex items-center justify-center rounded-full text-muted-foreground/40 hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shrink-0",
                className
            )}
            aria-label={`${title} information`}
        >
            <Info className="h-4 w-4" />
        </button>
    )

    if (isMobile) {
        return (
            <Popover>
                <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                <PopoverContent className="w-[280px] sm:w-80 z-[100] shadow-xl border-primary/10">
                    {content}
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                <TooltipContent side="right" className="w-80 p-4 z-[100] shadow-xl border-primary/10 bg-popover/95 backdrop-blur-sm">
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
