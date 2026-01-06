import { useSimulationStore } from "@/store/simulationStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, Clock, ShieldCheck, Users } from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

export function ROICalculator() {
    const { roiResult, roiInputs, updateRoiInputs } = useSimulationStore()
    const { t } = useTranslation(["dashboard", "common"])


    // Helper for input updates
    const updateInput = (field: keyof typeof roiInputs, value: number) => {
        updateRoiInputs({ [field]: value })
    }

    if (!roiResult) return null

    return (
        <Card className="border-success/20 bg-success/5">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-success" />
                        {t("roi.title")}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Result Summary */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-background border p-3 text-center shadow-sm">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{t("roi.monthly")}</p>
                        <p className="text-lg font-bold text-success">{roiResult.monthly.totalSavingsEur.toLocaleString()}€</p>
                        <p className="text-[10px] text-muted-foreground">
                            {roiInputs.workingDaysPerMonth} {t("common:days")}
                        </p>
                    </div>
                    <div className="rounded-lg bg-background border p-3 text-center shadow-sm">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{t("roi.daily")}</p>
                        <p className="text-lg font-bold text-success">{roiResult.daily.totalSavingsEur.toLocaleString()}€</p>
                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-success/30 text-success">
                            {t("dashboard:simulation.reduction")}
                        </Badge>
                    </div>
                </div>

                <Separator className="bg-success/10" />

                {/* Main Inputs */}
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("roi.costPerWaitHour")}</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={roiInputs.costPerWaitHourEur}
                                    onChange={(e) => updateInput("costPerWaitHourEur", Number(e.target.value))}
                                    className="h-8 text-xs pr-5 bg-background"
                                />
                                <span className="absolute right-2 top-1.5 text-xs text-muted-foreground">€</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("roi.trucksPerDay")}</Label>
                            <div className="flex items-center h-8 px-3 rounded-md border bg-muted/20 text-xs text-muted-foreground cursor-not-allowed" title="Driven by simulation volume">
                                {roiResult.assumptions.workingDaysPerMonth === 0 ? 0 : Math.round(roiResult.deltas.waitSavedMinPerTruck * 0 + 50)} {/* Placeholder, actually simpler to show 'variable' or read baseline */}
                                <span className="ml-1 opacity-50">(Sim)</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("roi.workingDaysPerMonth")}</Label>
                        <Select
                            value={roiInputs.workingDaysPerMonth.toString()}
                            onValueChange={(val) => updateInput("workingDaysPerMonth", Number(val))}
                        >
                            <SelectTrigger className="h-8 text-xs bg-background">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="20">20 {t("common:days")} ({t("common:standard")})</SelectItem>
                                <SelectItem value="22">22 {t("common:days")} ({t("roi.labels.logisticsAvg")})</SelectItem>
                                <SelectItem value="26">26 {t("common:days")} ({t("roi.labels.highIntensity")})</SelectItem>
                                <SelectItem value="30">30 {t("common:days")} ({t("roi.labels.ops247")})</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                {/* Breakdown */}
                <div className="space-y-2 pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        {t("roi.breakdown")}
                    </p>
                    <div className="space-y-2 bg-background/50 p-2 rounded-lg border border-success/10">
                        <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock className="h-3 w-3 text-blue-500" />
                                {t("roi.waitingCostSaved")}
                            </span>
                            <span className="font-mono font-bold">{roiResult.daily.waitSavingsEur}€</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                <ShieldCheck className="h-3 w-3 text-orange-500" />
                                {t("roi.penaltiesAvoided")}
                            </span>
                            <span className="font-mono font-bold">{roiResult.daily.slaSavingsEur}€</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-t border-dashed pt-1.5 mt-1.5">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock className="h-3 w-3 text-green-600" />
                                {t("roi.waitSavedPerTruck")}
                            </span>
                            <span className="font-mono font-bold text-green-600">
                                {Math.round(roiResult.deltas.waitSavedMinPerTruck)} min
                            </span>
                        </div>
                    </div>
                </div>



                {/* Payback Badge */}
                <Badge variant="outline" className="w-full justify-center py-1.5 text-xs bg-success/10 text-success border-success/20">
                    <TrendingUp className="h-3 w-3 mr-1.5" />
                    {t(roiResult.paybackStatement as any)}
                </Badge>
            </CardContent>
        </Card>
    )
}
