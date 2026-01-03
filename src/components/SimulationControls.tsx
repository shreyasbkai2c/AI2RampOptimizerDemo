import { useSimulationStore } from "@/store/simulationStore"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Play, Pause, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { LiveSummaryPanel } from "@/components/logistics/LiveSummaryPanel"
import type { OperationalLoad, RampAvailability, PriorityPressure, StaffingLevel } from "@/lib/simulation/parameters"
import { LOGISTIKER_PRESETS } from "@/lib/simulation/presets"

export function SimulationControls() {
    const { controls, updateControls, reset, presetId, setPreset, playing, play, pause, speed, setSpeed, nowMin } = useSimulationStore()
    const { t } = useTranslation(["dashboard", "common", "logistiker"])

    const formatTime = (min: number) => {
        const hours = Math.floor(min / 60)
        const mins = min % 60
        return `${(8 + hours).toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    }

    return (
        <div className="rounded-2xl border bg-card p-4 shadow-sm space-y-4">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8">
                {/* Playback Group */}
                <div className="flex items-center gap-3 pr-6 border-r border-border/50 h-9">
                    <Button
                        variant={playing ? "secondary" : "default"}
                        size="sm"
                        onClick={playing ? pause : play}
                        className="rounded-xl h-9 px-4 gap-2 min-w-[100px]"
                    >
                        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {playing ? t("common:actions.pause") : t("common:actions.start")}
                    </Button>

                    <Select value={speed.toString()} onValueChange={(v) => setSpeed(Number(v) as 1 | 2 | 5)}>
                        <SelectTrigger className="w-16 h-9 rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1x</SelectItem>
                            <SelectItem value="2">2x</SelectItem>
                            <SelectItem value="5">5x</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/30 rounded-xl border border-border/50">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-mono font-bold">{formatTime(nowMin)}</span>
                    </div>
                </div>

                {/* Parameters Group - Allowing wrap and ensuring alignment */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 flex-1">
                    {/* 1. Operational Load */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold min-h-[1.25rem] leading-tight">
                            {t("dashboard:simulation.operationalLoad")}
                        </Label>
                        <Select
                            value={controls.volumeLevel}
                            onValueChange={(val: OperationalLoad) => {
                                updateControls({ volumeLevel: val })
                                reset()
                            }}
                        >
                            <SelectTrigger className="h-9 w-full rounded-lg border-muted">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">{t("logistiker:volumeLevel.low")}</SelectItem>
                                <SelectItem value="normal">{t("logistiker:volumeLevel.normal")}</SelectItem>
                                <SelectItem value="peak">{t("logistiker:volumeLevel.peak")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 2. Ramp Availability */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold min-h-[1.25rem] leading-tight">
                            {t("dashboard:simulation.rampAvailability")}
                        </Label>
                        <Select
                            value={controls.rampState}
                            onValueChange={(val: RampAvailability) => {
                                updateControls({ rampState: val })
                                reset()
                            }}
                        >
                            <SelectTrigger className="h-9 w-full rounded-lg border-muted">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t("logistiker:rampAvailability.all")}</SelectItem>
                                <SelectItem value="oneDown">{t("logistiker:rampAvailability.oneDown")}</SelectItem>
                                <SelectItem value="twoDown">{t("logistiker:rampAvailability.twoDown")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 3. Priority Pressure */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold min-h-[1.25rem] leading-tight">
                            {t("dashboard:simulation.priorityPressure")}
                        </Label>
                        <Select
                            value={controls.priorityState}
                            onValueChange={(val: PriorityPressure) => {
                                updateControls({ priorityState: val })
                                reset()
                            }}
                        >
                            <SelectTrigger className="h-9 w-full rounded-lg border-muted">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">{t("logistiker:priorityPressure.low")}</SelectItem>
                                <SelectItem value="medium">{t("logistiker:priorityPressure.medium")}</SelectItem>
                                <SelectItem value="high">{t("logistiker:priorityPressure.high")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 4. Staffing Level */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold min-h-[1.25rem] leading-tight">
                            {t("dashboard:simulation.staffingLevel")}
                        </Label>
                        <Select
                            value={controls.staffingLevel}
                            onValueChange={(val: StaffingLevel) => {
                                updateControls({ staffingLevel: val })
                                reset()
                            }}
                        >
                            <SelectTrigger className="h-9 w-full rounded-lg border-muted">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">{t("logistiker:staffingLevel.low")}</SelectItem>
                                <SelectItem value="normal">{t("logistiker:staffingLevel.normal")}</SelectItem>
                                <SelectItem value="high">{t("logistiker:staffingLevel.high")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Right Group: Green Module + Reset */}
                    <div className="flex items-center gap-6 pl-6 border-l border-border/50">
                        {/* 5. Green Module */}
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-0.5 max-w-[140px]">
                                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold leading-none">
                                    {t("common:greenModule")}
                                </Label>
                                <p className="text-[9px] text-muted-foreground leading-tight">
                                    {t("dashboard:simulation.greenModuleDesc")}
                                </p>
                            </div>
                            <Switch
                                checked={controls.greenModuleEnabled}
                                onCheckedChange={(val) => {
                                    updateControls({ greenModuleEnabled: val })
                                    reset()
                                }}
                                className="scale-90"
                            />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                            onClick={() => setPreset(presetId)}
                            title={t("common:reset")}
                        >
                            <RefreshCcw className="h-4 w-4" />
                        </Button>
                    </div>


                </div>


            </div>

            {/* Live Predictive Summary */}
            <LiveSummaryPanel />
        </div>
    )
}
