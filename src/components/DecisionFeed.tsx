import { useSimulationStore } from "@/store/simulationStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle2, Info, Lightbulb, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { AIExplainPanel } from "./AIExplainPanel"
import type { Recommendation } from "@/types/categoryData"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export function DecisionFeed() {
    const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null)
    const [panelOpen, setPanelOpen] = useState(false)

    const handleRecClick = (rec: Recommendation) => {
        setSelectedRec(rec)
        setPanelOpen(true)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EventFeed className="md:col-span-1" />
                <RecommendationFeed className="md:col-span-2" onRecClick={handleRecClick} />
            </div>
            <AIExplainPanel
                recommendation={selectedRec}
                open={panelOpen}
                onOpenChange={setPanelOpen}
            />
        </>
    )
}

function EventFeed({ className }: { className?: string }) {
    const events = useSimulationStore((s) => s.events)
    const { t } = useTranslation(["dashboard"])

    return (
        <Card className={cn("flex flex-col h-[400px]", className)}>
            <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    {t("decisionFeed.liveEvents")}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    {events.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-24 text-muted-foreground text-xs italic">
                            {t("decisionFeed.waitingForEvents")}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {events.map((event) => (
                                <div key={event.id} className="flex gap-3 text-xs border-b border-border/40 pb-3 last:border-0">
                                    <div className="mt-0.5">
                                        {event.severity === "critical" ? (
                                            <AlertCircle className="h-4 w-4 text-destructive" />
                                        ) : event.severity === "warning" ? (
                                            <AlertCircle className="h-4 w-4 text-orange-500" />
                                        ) : (
                                            <Info className="h-4 w-4 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] opacity-60">
                                                {Math.floor(event.timeMin / 60).toString().padStart(2, '0')}:{(event.timeMin % 60).toString().padStart(2, '0')}
                                            </span>
                                            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
                                                {t(`common:events.${event.type}` as any, { defaultValue: event.type })}
                                            </Badge>
                                        </div>
                                        <p className="text-foreground/90 font-medium leading-normal">
                                            {t(event.message as any, event.data) as string}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

import { useToast } from "@/components/ui/use-toast"

function RecommendationFeed({ className, onRecClick }: { className?: string; onRecClick: (rec: Recommendation) => void }) {
    const { recommendations, applyRecommendation } = useSimulationStore()
    const { t } = useTranslation(["dashboard", "common"])
    const { toast } = useToast()

    const handleApply = (e: React.MouseEvent, rec: Recommendation) => {
        e.stopPropagation()
        applyRecommendation(rec.id)
        toast({
            title: t("common:actions.apply"),
            description: t("decisionFeed.recommendationApplied"),
            duration: 3000,
        })
    }

    return (
        <Card className={cn("flex flex-col h-[400px]", className)}>
            <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    {t("decisionFeed.aiSupport")}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    {recommendations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground space-y-2">
                            <div className="p-3 rounded-full bg-muted/50">
                                <CheckCircle2 className="h-6 w-6 opacity-20" />
                            </div>
                            <p className="text-xs italic">{t("decisionFeed.systemOptimized")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {recommendations.map((rec) => (
                                <Card
                                    key={rec.id}
                                    className="border-primary/20 bg-primary/5 shadow-sm overflow-hidden border-l-4 border-l-primary cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => onRecClick(rec)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                                            <div className="space-y-3 flex-1">
                                                <div>
                                                    <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                                                        {t(rec.title as any)}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed italic">
                                                        {t(rec.description as any, rec.data) as string}
                                                    </p>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("dashboard:decisionFeed.strategy")}:</p>
                                                    <ul className="grid grid-cols-1 gap-1">
                                                        {rec.reasoning.map((reason, i) => (
                                                            <li key={i} className="text-xs flex items-center gap-2 text-foreground/80">
                                                                <div className="h-1 w-1 rounded-full bg-primary" />
                                                                {t(reason as any)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 min-w-[140px]">
                                                <div className="rounded-lg bg-background p-2 border border-primary/10 space-y-2">
                                                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("decisionFeed.expectedImpact")}:</p>
                                                    <div className="space-y-1">
                                                        {rec.impact.avgWaitReductionMin && (
                                                            <div className="flex justify-between text-[11px]">
                                                                <span>{t("decisionFeed.waitTimeSaved")}:</span>
                                                                <span className="font-bold text-success">-{rec.impact.avgWaitReductionMin}m</span>
                                                            </div>
                                                        )}
                                                        {rec.impact.costSavingEur && (
                                                            <div className="flex justify-between text-[11px]">
                                                                <span>{t("decisionFeed.costSaved")}:</span>
                                                                <span className="font-bold text-success">€{rec.impact.costSavingEur}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm h-9"
                                                    onClick={(e) => handleApply(e, rec)}
                                                >
                                                    {t("common:actions.apply")}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
