import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { InfoTip } from "@/components/ui/InfoTip"

interface GreenModuleStatsProps {
  stats: { icon: string; value: string; label: string }[]
}

export function GreenModuleStats({ stats }: GreenModuleStatsProps) {
  const { t } = useTranslation(["dashboard"])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl flex items-center gap-2">
        <span>🌱 {t("dashboard:greenModule")}</span>
        <InfoTip
          title={t("dashboard:infotip.sustainability.title")}
          points={t("dashboard:infotip.sustainability.points", { returnObjects: true }) as string[]}
        />
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

      {/* 3 Bullet Points for Sustainability Features */}
      <div className="pt-6 border-t border-success/10">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(t("dashboard:infotip.sustainability.points", { returnObjects: true }) as string[]).map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
              </div>
              <p className="text-sm text-muted-foreground leading-snug">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
