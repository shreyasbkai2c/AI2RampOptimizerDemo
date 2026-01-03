import { useSimulationStore } from "@/store/simulationStore"
import { explainRecommendation, type ExplanationResult } from "@/lib/simulation/explain"
import type { Recommendation } from "@/types/categoryData"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle2, Info, ShieldCheck, TrendingDown, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

interface AIExplainPanelProps {
    recommendation: Recommendation | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AIExplainPanel({ recommendation, open, onOpenChange }: AIExplainPanelProps) {
    const { t } = useTranslation(["dashboard", "common"])
    const { config, kpis, applyRecommendation } = useSimulationStore()

    const explanation = useMemo<ExplanationResult | null>(() => {
        if (!recommendation) return null
        return explainRecommendation(recommendation, config, kpis)
    }, [recommendation, config, kpis])

    if (!recommendation || !explanation) return null

    const handleApply = () => {
        applyRecommendation(recommendation.id)
        onOpenChange(false)
    }

    const confidenceColors = {
        high: "text-success bg-success/10 border-success/20",
        medium: "text-orange-500 bg-orange-500/10 border-orange-500/20",
        low: "text-destructive bg-destructive/10 border-destructive/20"
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[480px] flex flex-col">
                <SheetHeader className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <SheetTitle className="text-lg">{t(recommendation.title as any)}</SheetTitle>
                            <SheetDescription className="text-xs">
                                {t("dashboard:modal.aiRecommendation" as any)}
                            </SheetDescription>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className={cn("w-fit text-xs", confidenceColors[explanation.confidence])}
                    >
                        {t("dashboard:explain.confidence")}: {t(`dashboard:explain.confidence${explanation.confidence.charAt(0).toUpperCase() + explanation.confidence.slice(1)}` as any)}
                    </Badge>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                    {/* Why AI chose this */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <Info className="h-4 w-4 text-blue-500" />
                            {t("dashboard:explain.whyThis")}
                        </div>
                        <ul className="space-y-2">
                            {explanation.reasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                    {t(reason as any)}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <Separator />

                    {/* Constraints */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                            {t("dashboard:explain.constraints")}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {explanation.matchedConstraints.map((c) => (
                                <Badge key={c} variant="secondary" className="text-xs">
                                    {t(c as any)}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Impact if ignored */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            {t("dashboard:explain.ifIgnored")}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-lg border p-3 text-center space-y-1">
                                <TrendingDown className="h-5 w-5 mx-auto text-destructive" />
                                <p className="text-lg font-bold text-destructive">+{explanation.counterfactual.avgWaitMinDelta}m</p>
                                <p className="text-[10px] text-muted-foreground">{t("dashboard:explain.waitTime")}</p>
                            </div>
                            <div className="rounded-lg border p-3 text-center space-y-1">
                                <AlertTriangle className="h-5 w-5 mx-auto text-orange-500" />
                                <p className="text-lg font-bold text-orange-500">{t(explanation.counterfactual.riskDelta as any)}</p>
                                <p className="text-[10px] text-muted-foreground">{t("dashboard:explain.risk")}</p>
                            </div>
                            <div className="rounded-lg border p-3 text-center space-y-1">
                                <ShieldCheck className="h-5 w-5 mx-auto text-destructive" />
                                <p className="text-lg font-bold text-destructive">+{explanation.counterfactual.slaViolationsDelta}</p>
                                <p className="text-[10px] text-muted-foreground">{t("dashboard:explain.slaViolations")}</p>
                            </div>
                        </div>
                    </section>
                </div>

                <SheetFooter className="border-t pt-4">
                    <Button
                        onClick={handleApply}
                        className="w-full rounded-xl font-bold"
                    >
                        {t(recommendation.actionLabel as any)}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
