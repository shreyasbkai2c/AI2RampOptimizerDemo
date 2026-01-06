import { useSimulationStore } from "@/store/simulationStore"
import { useTranslation } from "react-i18next"
import { AlertTriangle, Clock, TrendingUp, Leaf, Info } from "lucide-react"

export function LiveSummaryPanel() {
    const { derived } = useSimulationStore()
    const { t } = useTranslation(["dashboard", "common"])

    // Congestion indicator logic
    const congestionColor = {
        Low: "text-green-500",
        Medium: "text-amber-500",
        High: "text-orange-600",
        Critical: "text-red-600 animate-pulse"
    }[derived.expectedCongestion]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-4 bg-muted/20 rounded-xl border border-border/50 text-sm">

            {/* 1. Expected Congestion */}
            <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {t("dashboard:simulation.expectedCongestion")}
                </div>
                <div className={`font-bold text-lg ${congestionColor}`}>
                    {t(`dashboard:simulation.congestionLevels.${derived.expectedCongestion}` as any)}
                </div>
            </div>

            {/* 2. Predicted Wait Time Comparison */}
            <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" />
                    {t("dashboard:simulation.predictedWait")}
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-lg">{derived.predictedWaitAI} min</span>
                    <span className="text-xs text-muted-foreground line-through decoration-destructive/50">
                        {derived.predictedWaitBaseline} min
                    </span>
                </div>
            </div>

            {/* 3. Projected Savings */}
            <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {t("dashboard:simulation.projectedSavings")}
                </div>
                <div className="font-bold text-lg text-emerald-600">
                    {Math.round(derived.projectedSavingsEur)}€
                </div>
            </div>

            {/* 4. CO2 Savings (Conditional) */}
            <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    <Leaf className="h-3.5 w-3.5" />
                    {t("dashboard:simulation.projectedCO2")}
                </div>
                {derived.projectedCO2Saved > 0 ? (
                    <div className="font-bold text-lg text-emerald-600">
                        {(derived.projectedCO2Saved / 1000).toFixed(1)}t
                    </div>
                ) : (
                    <div className="text-xs text-muted-foreground py-1 flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        {t("dashboard:simulation.enableGreen")}
                    </div>
                )}
            </div>

        </div>
    )
}
