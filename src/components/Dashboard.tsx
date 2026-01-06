import { useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { categoryData, greenData, type TimeSlot, type Benefit } from "@/data/categoryData"
import { AppHeader } from "./AppHeader"
import { StatsGrid } from "./StatsGrid"
import { Timeline } from "./Timeline"
import { ComparisonSection } from "./ComparisonSection"
import { BenefitsGrid } from "./BenefitsGrid"
import { GreenModuleStats } from "./GreenModuleStats"
import { CTASection } from "./CTASection"
import { StatModalContent, SlotModalContent, CTAModalContent } from "./Modal"
import { SimulationControls } from "./SimulationControls"
import { DecisionFeed } from "./DecisionFeed"
import { ROICalculator } from "./ROICalculator"
import { useSimulationStore } from "@/store/simulationStore"
import { LOGISTIKER_PRESETS } from "@/lib/simulation/presets"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DashboardProps {
  category: string
  onBack: () => void
}

type ModalType = "stat" | "slot" | "cta" | null

export function Dashboard({ category, onBack }: DashboardProps) {
  const { t } = useTranslation(["dashboard", "common"])
  const data = categoryData[category]
  const { presetId, setPreset, controls, slots: simSlots, kpis: simKpis, baselineKpis, reset, shipments, updateControls } = useSimulationStore()

  const [localIndustry, setLocalIndustry] = useState(() => {
    const firstIndustry = Object.keys(data.industries)[0]
    return firstIndustry
  })

  // Source of truth for industry based on category
  const activeIndustry = category === "logistics"
    ? (LOGISTIKER_PRESETS.find(p => p.id === presetId)?.industry || "general")
    : localIndustry

  // Sync green module toggle
  const greenModuleEnabled = controls.greenModuleEnabled
  const setGreenModuleEnabled = (enabled: boolean) => updateControls({ greenModuleEnabled: enabled })

  // Initialize simulation on first load for logistics
  useEffect(() => {
    if (category === "logistics") {
      reset()
    }
  }, [category, reset])

  // Simulation Loop
  const playing = useSimulationStore(s => s.playing)
  const tick = useSimulationStore(s => s.tick)
  const speed = useSimulationStore(s => s.speed)

  useEffect(() => {
    let interval: any
    if (playing && category === "logistics") {
      interval = setInterval(() => {
        tick()
      }, 1000 / speed)
    }
    return () => clearInterval(interval)
  }, [playing, speed, tick, category])

  // Sync simulation industry
  useEffect(() => {
    if (category === "logistics") {
      setLocalIndustry(activeIndustry)
    }
  }, [activeIndustry, category])

  const [modalType, setModalType] = useState<ModalType>(null)
  const [modalData, setModalData] = useState<string | TimeSlot | null>(null)

  // Map Simulation data to UI components
  const displayStats = useMemo(() => {
    if (category !== "logistics") return data.data[activeIndustry].stats

    return [
      { icon: '📦', label: 'dashboard:stats.deliveriesToday', value: simKpis.shipmentVolume.toString(), trend: t("dashboard:simulation.scenarioDrivenEstimate"), class: 'info' as const },
      { icon: '⚡', label: 'dashboard:stats.rampUtilization', value: `${Math.round(simKpis.rampUtilizationPct)}%`, trend: `+${Math.round(simKpis.rampUtilizationPct - baselineKpis.rampUtilizationPct)}% ${t("dashboard:simulation.withAi")}`, class: 'success' as const },
      { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: `${simKpis.avgWaitMin} Min`, trend: `-${Math.round((1 - simKpis.avgWaitMin / baselineKpis.avgWaitMin) * 100)}% ${t("dashboard:simulation.reduction")}`, class: 'success' as const },
      { icon: '💰', label: 'dashboard:stats.monthlySavings', value: `${Math.round(simKpis.monthlySavingsEur)}€`, trend: `${t("dashboard:simulation.measurable")}`, class: 'success' as const }
    ]
  }, [category, activeIndustry, data.data, simKpis, baselineKpis, t])

  const displaySlots = useMemo(() => {
    if (category !== "logistics") return data.data[activeIndustry].slots

    return simSlots.map(slot => {
      const shipment = shipments.find(s => s.id === slot.shipmentId)
      return {
        id: slot.id,
        time: `${Math.floor(slot.startMin / 60).toString().padStart(2, '0')}:${(slot.startMin % 60).toString().padStart(2, '0')}`,
        truck: shipment?.carrierName || (slot.status === "recommended" ? t("dashboard:simulation.optimalSpot") : t("dashboard:simulation.available")),
        info: shipment ? (shipment.priority === "urgent" ? t("dashboard:simulation.expressDelivery") : t("dashboard:simulation.standardDelivery")) : (slot.status === "recommended" ? t("dashboard:simulation.aiOptimization") : t("dashboard:simulation.allRampsFree")),
        details: shipment ? shipment.constraints.map(c => t(`dashboard:explain.constraintsList.${c}` as any)).join(', ') || t("dashboard:simulation.normalHandling") : (slot.status === "recommended" ? t("dashboard:simulation.avoidsBottlenecks") : t("dashboard:simulation.flexiblePlanning")),
        status: slot.status,
        location: slot.rampId
      } as TimeSlot
    }).sort((a, b) => a.time.localeCompare(b.time))
  }, [category, activeIndustry, data.data, simSlots, shipments, t])

  const displayComparison = useMemo(() => {
    if (category !== "logistics") return data.data[activeIndustry].comparison

    return {
      before: [
        { label: 'dashboard:comparison.metrics.waitTime', value: `${baselineKpis.avgWaitMin} Min` },
        { label: 'dashboard:comparison.metrics.utilization', value: `${Math.round(baselineKpis.rampUtilizationPct)}%` },
        { label: 'dashboard:comparison.metrics.delays', value: `${baselineKpis.slaViolations ?? 0}` }
      ],
      after: [
        { label: 'dashboard:comparison.metrics.waitTime', value: `${simKpis.avgWaitMin} Min` },
        { label: 'dashboard:comparison.metrics.utilization', value: `${Math.round(simKpis.rampUtilizationPct)}%` },
        { label: 'dashboard:comparison.metrics.delays', value: `${simKpis.slaViolations ?? 0}` }
      ]
    }
  }, [category, activeIndustry, data.data, simKpis, baselineKpis])

  const benefits: Benefit[] = useMemo(() => {
    if (Array.isArray(data.benefits)) return data.benefits
    if (activeIndustry && data.benefits[activeIndustry]) return data.benefits[activeIndustry]
    return Object.values(data.benefits)[0] || []
  }, [data.benefits, activeIndustry])

  const handleStatClick = (label: string) => {
    setModalData(label)
    setModalType("stat")
  }

  const handleSlotClick = (slot: TimeSlot) => {
    setModalData(slot)
    setModalType("slot")
  }

  const handleCTAClick = () => {
    setModalData(null)
    setModalType("cta")
  }

  const handleCloseModal = () => {
    setModalType(null)
    setModalData(null)
  }

  const handleBookDemo = () => {
    window.open("https://tucalendi.com/ai2connect", "_blank")
  }

  const getModalTitle = () => {
    switch (modalType) {
      case "stat":
        // Handle both translated and raw labels
        const rawLabel = modalData as string
        const translatedLabel = rawLabel.includes(":") ? t(rawLabel as any) : rawLabel
        return t("dashboard:modal.statTitle", { label: translatedLabel })
      case "slot": {
        const slot = modalData as TimeSlot
        if (slot?.status === "recommended") return `⭐ ${t("dashboard:modal.aiRecommendation")}`
        if (slot?.status === "critical") return `🔴 ${t("dashboard:modal.criticalDelivery")}`
        return slot?.status === "busy" ? `📦 ${t("dashboard:modal.busy")}` : `✅ ${t("dashboard:modal.available")}`
      }
      case "cta":
        return `🎯 ${t("dashboard:modal.potentialAnalysis")}`
      default:
        return ""
    }
  }

  const getTimelineTitle = () => {
    return category === "carrier"
      ? t("dashboard:timeline.title.carrier")
      : t("dashboard:timeline.title.logistiker")
  }

  return (
    <div className="min-h-svh bg-background">
      <AppHeader
        categoryName={data.name}
        categoryIcon={data.icon}
        industries={data.industries}
        currentIndustry={activeIndustry}
        onIndustryChange={(newIndustry) => {
          if (category === "logistics") {
            setPreset(newIndustry)
          } else {
            setLocalIndustry(newIndustry)
          }
        }}
        greenModuleEnabled={greenModuleEnabled}
        onToggleGreenModule={() => setGreenModuleEnabled(!greenModuleEnabled)}
        onBack={onBack}
      />

      <div className="container py-8 md:py-10">
        <div className="space-y-10">
          <StatsGrid stats={displayStats} onStatClick={handleStatClick} />

          {category === "logistics" && (
            <div className="space-y-10">
              <SimulationControls />
              <DecisionFeed />
              <ROICalculator />
            </div>
          )}

          {category === "carrier" && (
            <div className="space-y-10">
              {/* Carrier specific layout if needed, otherwise default to similar */}
            </div>
          )}

          {greenModuleEnabled && (
            <div className="rounded-2xl border bg-card p-4 shadow-sm">
              <GreenModuleStats stats={greenData.stats} />
            </div>
          )}

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <Timeline
              slots={displaySlots}
              title={getTimelineTitle()}
              onSlotClick={handleSlotClick}
            />
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <ComparisonSection comparison={displayComparison} />
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <BenefitsGrid
              benefits={benefits}
              greenBenefits={greenModuleEnabled ? greenData.benefits : undefined}
            />
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <CTASection onCTAClick={handleCTAClick} />
          </div>
        </div>
      </div>

      {/* shadcn Dialogs (replacing custom Modal) */}
      <Dialog open={modalType === "stat"} onOpenChange={(o) => !o && handleCloseModal()}>
        <DialogContent className="rounded-2xl sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-foreground">{getModalTitle()}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <StatModalContent label={modalData as string} />

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" className="rounded-xl" onClick={handleCloseModal}>
                {t("common:close")}
              </Button>
              <Button className="rounded-xl" onClick={handleBookDemo}>
                {t("common:bookDemo")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalType === "slot"} onOpenChange={(o) => !o && handleCloseModal()}>
        <DialogContent className="rounded-2xl sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-foreground">{getModalTitle()}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {modalData && typeof modalData !== "string" && (
              <SlotModalContent slot={modalData as TimeSlot} />
            )}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" className="rounded-xl" onClick={handleCloseModal}>
                {t("common:close")}
              </Button>
              <Button className="rounded-xl" onClick={handleBookDemo}>
                {t("common:bookDemo")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalType === "cta"} onOpenChange={(o) => !o && handleCloseModal()}>
        <DialogContent className="rounded-2xl sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-foreground">{getModalTitle()}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <CTAModalContent />

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" className="rounded-xl" onClick={handleCloseModal}>
                {t("common:close")}
              </Button>
              <Button className="rounded-xl" onClick={handleBookDemo}>
                {t("common:bookDemo")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
