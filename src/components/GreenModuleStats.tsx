import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

interface GreenModuleStatsProps {
  stats: { icon: string; value: string; label: string }[]
}

export function GreenModuleStats({ stats }: GreenModuleStatsProps) {
  const { t } = useTranslation(["dashboard"])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
        🌱 {t("dashboard:greenModule")}
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, index) => {
          const displayLabel = stat.label.includes(":") ? t(stat.label as any) : stat.label
          return (
            <div key={index} className="flex flex-col items-center text-center space-y-2 group">
              <div className="text-4xl transition-transform duration-300 group-hover:scale-110" role="img" aria-label={displayLabel}>
                {stat.icon}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tight text-success md:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-success/60 uppercase tracking-widest">
                  {displayLabel}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
