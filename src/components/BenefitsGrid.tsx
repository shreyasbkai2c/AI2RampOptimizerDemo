import { cn } from "@/lib/utils"
import type { Benefit } from "@/data/categoryData"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

interface BenefitCardProps {
  benefit: Benefit
}

function BenefitCard({ benefit }: BenefitCardProps) {
  const { t } = useTranslation(["dashboard"])
  const displayTitle = benefit.title.includes(":") ? t(benefit.title as any) : benefit.title
  const displayDesc = benefit.desc.includes(":") ? t(benefit.desc as any) : benefit.desc

  return (
    <Card className="transition-all duration-300 hover:translate-x-1 hover:shadow-md border-l-4 border-l-primary bg-card">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="text-3xl shrink-0" role="img" aria-label={displayTitle}>
            {benefit.icon}
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              {displayTitle}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {displayDesc}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface BenefitsGridProps {
  benefits: Benefit[]
  greenBenefits?: Benefit[]
}

export function BenefitsGrid({ benefits, greenBenefits }: BenefitsGridProps) {
  const allBenefits = greenBenefits ? [...benefits, ...greenBenefits] : benefits
  const { t } = useTranslation(["dashboard"])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
        ✨ {t("dashboard:benefits.title")}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {allBenefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  )
}
