import { cn } from "@/lib/utils"
import type { Stat } from "@/data/categoryData"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { StatModalContent } from "./Modal"
import { Play } from "lucide-react"

interface StatCardProps {
  stat: Stat
  isExpanded: boolean
  onToggle: () => void
}

export function StatCard({ stat, isExpanded, onToggle }: StatCardProps) {
  const { t } = useTranslation(["dashboard", "logistiker"])
  const borderColors = {
    info: "border-l-info",
    success: "border-l-success",
    warning: "border-l-warning",
  }
  const bgHighlights = {
    info: "hover:bg-info/5",
    success: "hover:bg-success/5",
    warning: "hover:bg-warning/5",
  }

  // Determine if stat.label is a translation key or a raw string
  const displayLabel = stat.label.includes(":") ? t(stat.label as any) : stat.label

  return (
    <Card
      className={cn(
        "group cursor-pointer border-l-4 transition-all duration-300 relative overflow-hidden",
        isExpanded ? "ring-2 ring-primary/20 shadow-lg" : "hover:-translate-y-1 hover:shadow-md hover:scale-[1.01] hover:ring-1 hover:ring-primary/5",
        "active:scale-[0.98]",
        borderColors[stat.class as keyof typeof borderColors] || "border-l-primary",
        isExpanded ? "bg-accent/5" : bgHighlights[stat.class as keyof typeof bgHighlights] || "hover:bg-accent/5",
        isExpanded ? "lg:col-span-2 lg:row-span-2" : ""
      )}
      onClick={onToggle}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="relative flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <span className="text-3xl" role="img" aria-label={displayLabel}>
                {stat.icon}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                  {stat.trend.includes(":") ? t(stat.trend as any) : stat.trend}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {displayLabel}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                {stat.value}
              </h3>
            </div>

            {/* Expansion Toggle: Solid Play Button in bottom right */}
            <div className="absolute bottom-0 right-0">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
                isExpanded ? "bg-primary text-primary-foreground rotate-90" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              )}>
                <Play className={cn(
                  "h-4 w-4 transition-all",
                  isExpanded ? "fill-current" : "fill-current opacity-40 group-hover:opacity-100"
                )} />
              </div>
            </div>
          </div>

          {isExpanded && (
            <div className="border-t border-border/50 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <StatModalContent label={stat.label} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  stats: Stat[]
}

import { useState } from "react"

export function StatsGrid({ stats }: StatsGridProps) {
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 auto-rows-min">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          stat={stat}
          isExpanded={expandedLabel === stat.label}
          onToggle={() => setExpandedLabel(expandedLabel === stat.label ? null : stat.label)}
        />
      ))}
    </div>
  )
}
