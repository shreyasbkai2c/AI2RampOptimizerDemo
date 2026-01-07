import { cn } from "@/lib/utils"
import type { Comparison } from "@/data/categoryData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XCircle, CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ComparisonSectionProps {
  comparison: Comparison
}

export function ComparisonSection({ comparison }: ComparisonSectionProps) {
  const { t } = useTranslation(["dashboard"])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
        📊 {t("dashboard:comparison.title")}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Before */}
        <Card className="border-destructive/20 bg-destructive/5 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 group">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              {t("dashboard:comparison.beforeTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {comparison.before.map((metric, index) => (
              <div key={index} className="space-y-1 transition-all duration-300 group-hover:px-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {t(metric.label as any)}
                </p>
                <p className="text-3xl font-bold tracking-tight text-destructive md:text-4xl">
                  {metric.value.includes(":") ? t(metric.value as any) : metric.value}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* After */}
        <Card className="border-success/20 bg-success/10 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 overflow-hidden pointer-events-none">
            <div className="bg-success text-white text-[10px] font-bold px-8 py-1 rotate-45 translate-x-3 -translate-y-1 shadow-sm">
              AI OPTIMIZED
            </div>
          </div>
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <CardTitle className="text-lg font-bold text-foreground">
              {t("dashboard:comparison.afterTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {comparison.after.map((metric, index) => (
              <div key={index} className="space-y-1 transition-all duration-300 group-hover:px-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {t(metric.label as any)}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-3xl font-bold tracking-tight text-success md:text-4xl">
                    {metric.value.includes(":") ? t(metric.value as any) : metric.value}
                  </p>
                  <Badge className="bg-success/20 text-success hover:bg-success/20 border-transparent">
                    {t("dashboard:comparison.optimalBadge")}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
