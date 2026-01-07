import { cn } from "@/lib/utils"
import type { TimeSlot } from "@/data/categoryData"
import { Badge } from "@/components/ui/badge"
import { Check, Info, AlertCircle, Phone, Mail, Lightbulb, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Separator } from "@/components/ui/separator"
import { useSimulationStore } from "@/store/simulationStore"

interface StatModalContentProps {
  label: string
}

export function StatModalContent({ label }: StatModalContentProps) {
  const { t } = useTranslation(["dashboard", "common"])
  const { roiResult } = useSimulationStore()

  if (label === "dashboard:stats.monthlySavings") {
    return (
      <div className="space-y-6 py-2">
        {/* Meaning */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.savings.meaningTitle")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("dashboard:modal.savings.meaningDesc")}
          </p>
        </div>

        {/* Factors */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.savings.calculationTitle")}
          </h4>
          <ul className="space-y-2">
            {[
              t("dashboard:modal.savings.calcFactor1"),
              t("dashboard:modal.savings.calcFactor2"),
              t("dashboard:modal.savings.calcFactor3"),
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <Check className="h-4 w-4 text-success shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Logic */}
        <div className="bg-muted/30 p-4 rounded-xl border border-border/50 space-y-2">
          <h4 className="text-sm font-bold text-foreground">
            {t("dashboard:modal.savings.logicTitle")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            {t("dashboard:modal.savings.logicDesc")}
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.savings.breakdownTitle")}
          </h4>
          <div className="space-y-2 bg-success/5 p-4 rounded-xl border border-success/10">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("dashboard:modal.savings.breakdownWait")}</span>
              <span className="font-bold">{roiResult?.monthly.waitSavingsEur.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("dashboard:modal.savings.breakdownSla")}</span>
              <span className="font-bold">{roiResult?.monthly.slaSavingsEur.toLocaleString()}€</span>
            </div>
            <Separator className="bg-success/20" />
            <div className="flex justify-between text-base font-bold text-success">
              <span>{t("dashboard:modal.savings.breakdownTotal")}</span>
              <span>{roiResult?.monthly.totalSavingsEur.toLocaleString()}€</span>
            </div>
          </div>
        </div>

        {/* Potential Analysis CTA */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            {t("dashboard:modal.seeExactNumbers")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("dashboard:modal.potentialAnalysisDesc")}
          </p>
        </div>
      </div>
    )
  }

  if (label === "dashboard:stats.avgWaitTime") {
    return (
      <div className="space-y-6 py-2">
        {/* Definition */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.waitTime.definition")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            {t("dashboard:modal.waitTime.definitionDesc")}
          </p>
        </div>

        {/* Before vs After */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.waitTime.comparisonTitle")}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-destructive/5 p-3 rounded-xl border border-destructive/10">
              <p className="text-[10px] uppercase font-bold text-destructive mb-1">{t("dashboard:modal.waitTime.before")}</p>
              <p className="text-xl font-bold text-foreground">32 min</p>
            </div>
            <div className="bg-success/5 p-3 rounded-xl border border-success/10">
              <p className="text-[10px] uppercase font-bold text-success mb-1">{t("dashboard:modal.waitTime.after")}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-foreground">18 min</p>
                <Badge className="bg-success text-success-foreground text-[10px] px-1.5 h-4">
                  -14m
                </Badge>
              </div>
            </div>
            <div className="col-span-2 bg-primary/5 p-2 rounded-lg border border-primary/10 text-center">
              <p className="text-xs font-bold text-primary">
                {t("dashboard:modal.waitTime.savedPerTruck")}: 14 min
              </p>
            </div>
          </div>
        </div>

        {/* Distribution */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.waitTime.distributionTitle")}
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>{t("dashboard:modal.waitTime.distUnder15")}</span>
              <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success w-[60%]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("dashboard:modal.waitTime.dist15to30")}</span>
              <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[30%]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("dashboard:modal.waitTime.distOver30")}</span>
              <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive w-[10%]" />
              </div>
            </div>
          </div>
        </div>

        {/* What AI Changed */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            {t("dashboard:modal.waitTime.aiChangesTitle")}
          </h4>
          <ul className="space-y-2">
            {[
              t("dashboard:modal.waitTime.aiChange1"),
              t("dashboard:modal.waitTime.aiChange2"),
              t("dashboard:modal.waitTime.aiChange3"),
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                <Check className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Analysis CTA */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            {t("dashboard:modal.seeExactNumbers")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("dashboard:modal.potentialAnalysisDesc")}
          </p>
        </div>
      </div>
    )
  }

  if (label === "dashboard:stats.deliveriesToday") {
    return (
      <div className="space-y-6 py-2">
        {/* Definition */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.deliveries.definition")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            {t("dashboard:modal.deliveries.definitionDesc")}
          </p>
        </div>

        {/* Breakdown Grid */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.deliveries.breakdown")}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
              <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t("dashboard:modal.deliveries.inboundLabel")}</p>
              <p className="text-xl font-bold text-foreground">42</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
              <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t("dashboard:modal.deliveries.outboundLabel")}</p>
              <p className="text-xl font-bold text-foreground">26</p>
            </div>
            <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
              <p className="text-[10px] uppercase font-bold text-primary mb-1">{t("dashboard:modal.deliveries.priorityLabel")}</p>
              <p className="text-xl font-bold text-primary">9</p>
            </div>
            <div className="bg-orange-500/5 p-3 rounded-xl border border-orange-500/10">
              <p className="text-[10px] uppercase font-bold text-orange-600 mb-1">{t("dashboard:modal.deliveries.lateArrivalsLabel")}</p>
              <p className="text-xl font-bold text-orange-600">7</p>
            </div>
          </div>
        </div>

        {/* Timeline Distribution */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.deliveries.timelineTitle")}
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-lg px-2 py-1 text-[10px] font-medium border-orange-500/30 text-orange-600 bg-orange-500/5">
              {t("dashboard:modal.deliveries.peaks.morning")}
            </Badge>
            <Badge variant="outline" className="rounded-lg px-2 py-1 text-[10px] font-medium border-blue-500/30 text-blue-600 bg-blue-500/5">
              {t("dashboard:modal.deliveries.peaks.midday")}
            </Badge>
            <Badge variant="outline" className="rounded-lg px-2 py-1 text-[10px] font-medium border-orange-500/30 text-orange-600 bg-orange-500/5">
              {t("dashboard:modal.deliveries.peaks.afternoon")}
            </Badge>
            <Badge variant="outline" className="rounded-lg px-2 py-1 text-[10px] font-medium border-green-500/30 text-green-600 bg-green-500/5">
              {t("dashboard:modal.deliveries.peaks.evening")}
            </Badge>
          </div>
        </div>

        {/* Potential Analysis CTA */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            {t("dashboard:modal.seeExactNumbers")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("dashboard:modal.potentialAnalysisDesc")}
          </p>
        </div>
      </div>
    )
  }

  if (label === "dashboard:stats.rampUtilization") {
    return (
      <div className="space-y-6 py-2">
        {/* Definition */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.utilization.definition")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            {t("dashboard:modal.utilization.definitionDesc")}
          </p>
        </div>

        {/* Before vs After */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.utilization.comparisonTitle")}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-destructive/5 p-3 rounded-xl border border-destructive/10">
              <p className="text-[10px] uppercase font-bold text-destructive mb-1">{t("dashboard:modal.utilization.before")}</p>
              <p className="text-xl font-bold text-foreground">61%</p>
            </div>
            <div className="bg-success/5 p-3 rounded-xl border border-success/10">
              <p className="text-[10px] uppercase font-bold text-success mb-1">{t("dashboard:modal.utilization.after")}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-foreground">70%</p>
                <Badge className="bg-success text-success-foreground text-[10px] px-1.5 h-4">
                  +9 pt
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Heat Insight */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
          <h4 className="text-sm font-bold text-primary flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            {t("dashboard:modal.utilization.peakInsight")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("dashboard:modal.utilization.peakInsightDesc")}
          </p>
        </div>

        {/* Causes of Idle Time */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
            {t("dashboard:modal.utilization.idleCauses")}
          </h4>
          <ul className="space-y-2">
            {[
              t("dashboard:modal.utilization.causeLate"),
              t("dashboard:modal.utilization.causeUnbalanced"),
              t("dashboard:modal.utilization.causeLongHandling"),
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Analysis CTA */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            {t("dashboard:modal.seeExactNumbers")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("dashboard:modal.potentialAnalysisDesc")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-2">
        <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
          {t("dashboard:modal.howMeasured")}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("dashboard:modal.metricBasis")}
        </p>
      </div>

      <ul className="space-y-3">
        {[
          t("dashboard:modal.statsDetails.timestamp"),
          t("dashboard:modal.statsDetails.comparison"),
          t("dashboard:modal.statsDetails.optimization"),
          t("dashboard:modal.statsDetails.transparency"),
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
            <Check className="h-4 w-4 text-success shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          {t("dashboard:modal.seeExactNumbers")}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("dashboard:modal.potentialAnalysisDesc")}
        </p>
      </div>
    </div>
  )
}

interface SlotModalContentProps {
  slot: TimeSlot
}

export function SlotModalContent({ slot }: SlotModalContentProps) {
  const { t } = useTranslation(["dashboard"])
  if (slot.status === "recommended") {
    return (
      <div className="space-y-6 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-foreground">
              {slot.time}{slot.location ? ` — ${slot.location}` : ""} — {slot.truck}
            </h4>
            <Badge className="bg-success text-success-foreground hover:bg-success/90">
              {t("dashboard:modal.aiRecommendation")}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-foreground">
            {t("dashboard:modal.whyOptimal")}
          </h5>
          <ul className="space-y-2">
            {[
              slot.details,
              t("dashboard:modal.optimalDetails.waitTime"),
              t("dashboard:modal.optimalDetails.resources"),
              t("dashboard:modal.optimalDetails.peaks"),
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-success/5 border border-success/10 p-4 flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">{t("dashboard:modal.estimatedSavings")}:</span>
          <span className="text-lg font-bold text-success">
            {slot.info.match(/\d+/)?.[0] || "20"} Min.
          </span>
        </div>
      </div>
    )
  }

  if (slot.status === "critical") {
    return (
      <div className="space-y-6 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-foreground">
              {slot.time}{slot.location ? ` — ${slot.location}` : ""} — {slot.truck}
            </h4>
            <Badge variant="destructive">{t("dashboard:modal.criticalDelivery")}</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-foreground">
            {t("dashboard:modal.whyCritical")}
          </h5>
          <ul className="space-y-2">
            {[
              slot.details,
              t("dashboard:modal.criticalDetails.score"),
              t("dashboard:modal.criticalDetails.reserved"),
              t("dashboard:modal.criticalDetails.alerts"),
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-4">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            <span className="font-bold text-destructive">{t("dashboard:modal.emergencyHandling")}:</span> {t("dashboard:modal.emergencyDesc")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-foreground">
            {slot.time}{slot.location ? ` — ${slot.location}` : ""}
          </h4>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {slot.status === "busy" ? t("dashboard:modal.busy") : t("dashboard:modal.available")}
          </p>
        </div>
        <p className="text-sm font-semibold text-foreground">{slot.truck}</p>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{slot.info}</p>
        <p className="text-sm text-muted-foreground italic border-l-2 pl-3 py-1">{slot.details}</p>
      </div>
    </div>
  )
}

export function CTAModalContent() {
  const { t } = useTranslation(["dashboard"])
  return (
    <div className="space-y-6 py-2">
      <div className="space-y-4">
        {[
          {
            title: t("dashboard:modal.ctaSteps.step1Title"),
            desc: t("dashboard:modal.ctaSteps.step1Desc"),
          },
          {
            title: t("dashboard:modal.ctaSteps.step2Title"),
            desc: t("dashboard:modal.ctaSteps.step2Desc"),
          },
          {
            title: t("dashboard:modal.ctaSteps.step3Title"),
            desc: t("dashboard:modal.ctaSteps.step3Desc"),
          },
        ].map((item, i) => (
          <div key={i} className="space-y-1">
            <h5 className="text-sm font-bold text-foreground">{item.title}</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-success/5 border border-success/10 p-4">
        <p className="text-xs font-bold text-foreground text-center flex items-center justify-center gap-2">
          <Check className="h-3 w-3 text-success" />
          {t("dashboard:modal.ctaFreeGuarantee")}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <p className="text-sm font-bold text-foreground uppercase tracking-widest text-center">
          {t("common:contact")}
        </p>
        <div className="flex flex-col gap-2 items-center text-sm text-muted-foreground">
          <a href="mailto:info@ai2connect-do.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            info@ai2connect-do.com
          </a>
          <a href="tel:+4923158097539" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            +49 231 58097539
          </a>
        </div>
      </div>
    </div>
  )
}
