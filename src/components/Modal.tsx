import { cn } from "@/lib/utils"
import type { TimeSlot } from "@/data/categoryData"
import { Badge } from "@/components/ui/badge"
import { Check, Info, AlertCircle, Phone, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"

interface StatModalContentProps {
  label: string
}

export function StatModalContent({ label }: StatModalContentProps) {
  const { t } = useTranslation(["dashboard"])
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
              {slot.time} — {slot.truck}
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
              {slot.time} — {slot.truck}
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
        <h4 className="text-base font-bold text-foreground">
          {slot.time}{slot.location ? ` — ${slot.location}` : ""}
        </h4>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {slot.status === "busy" ? t("dashboard:modal.busy") : t("dashboard:modal.available")}
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">{slot.truck}</p>
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
