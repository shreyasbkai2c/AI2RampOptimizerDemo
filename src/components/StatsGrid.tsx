import { cn } from "@/lib/utils"
import type { Stat } from "@/data/categoryData"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

interface StatCardProps {
  stat: Stat
  onClick: () => void
}

export function StatCard({ stat, onClick }: StatCardProps) {
  const { t } = useTranslation(["dashboard", "logistiker"])
  const borderColors = {
    info: "border-l-info",
    success: "border-l-success",
    warning: "border-l-warning",
  }

  // Determine if stat.label is a translation key or a raw string
  const displayLabel = stat.label.includes(":") ? t(stat.label as any) : stat.label

  return (
    <Card
      className={cn(
        "group cursor-pointer border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        borderColors[stat.class as keyof typeof borderColors] || "border-l-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="text-3xl" role="img" aria-label={displayLabel}>
              {stat.icon}
            </span>
            <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
              {stat.trend}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {displayLabel as any}
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              {stat.value}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  stats: Stat[]
  onStatClick: (label: string) => void
}

export function StatsGrid({ stats, onStatClick }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          stat={stat}
          onClick={() => onStatClick(stat.label)}
        />
      ))}
    </div>
  )
}
