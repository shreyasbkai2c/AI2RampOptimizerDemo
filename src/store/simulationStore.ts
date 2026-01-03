import { create } from "zustand"
import { rng } from "@/lib/simulation/utils"
import type { KPIs, RampSlot, Shipment, SimEvent, Recommendation } from "@/types/categoryData"
import { LOGISTIKER_PRESETS } from "@/lib/simulation/presets"
import { generateEvents } from "@/lib/simulation/engine"
import { generateRecommendations } from "@/lib/simulation/optimizer"
import { type SimpleControls, type DerivedParams, mapControlsToParams } from "@/lib/simulation/parameters"
import { calculateROI, type RoiInputs, type RoiResult } from "@/lib/simulation/roi"

export type SimulationState = {
    presetId: string
    controls: SimpleControls
    derived: DerivedParams

    // ROI
    roiInputs: RoiInputs
    roiResult: RoiResult
    updateRoiInputs: (patch: Partial<RoiInputs>) => void

    // System state
    nowMin: number
    playing: boolean
    speed: 1 | 2 | 5

    // Simulation Entities
    shipments: Shipment[]
    slots: RampSlot[]
    events: SimEvent[]
    recommendations: Recommendation[]
    kpis: KPIs
    baselineKpis: KPIs  // "before AI"

    // UI Selection
    selectedSlotId?: string
    selectedRecommendationId?: string

    // Actions
    setPreset: (presetId: string) => void
    updateControls: (patch: Partial<SimpleControls>) => void
    play: () => void
    pause: () => void
    setSpeed: (s: 1 | 2 | 5) => void
    tick: () => void
    reset: () => void

    selectSlot: (slotId?: string) => void
    applyRecommendation: (recId: string) => void
}

const DEFAULT_CONTROLS: SimpleControls = {
    volumeLevel: "normal",
    rampState: "all",
    priorityState: "medium",
    staffingLevel: "normal",
    greenModuleEnabled: false,
    // Removed old ROI props from here as they live in roiInputs now
    costPerWaitHourEur: 45,
    trucksPerDay: 50,
    slaPenaltyPerViolationEur: 250
}

const DEFAULT_ROI_INPUTS: RoiInputs = {
    costPerWaitHourEur: 45,
    workingDaysPerMonth: 22,
    slaPenaltyPerViolationEur: 250
}

// Fixed system constants
const HORIZON_MIN = 720
const TIME_STEP_MIN = 15

// Helper to get initial derived params
const getInitialDerived = (presetId: string, controls: SimpleControls) => {
    const preset = LOGISTIKER_PRESETS.find(p => p.id === presetId) || LOGISTIKER_PRESETS[0]
    return mapControlsToParams(controls, preset)
}

// Initial ROI dummy (will be overwritten on first reset/hydration)
const INITIAL_ROI_RESULT = calculateROI(
    { trucksProcessed: 50, avgWaitMin: 45 },
    { trucksProcessed: 50, avgWaitMin: 20 },
    DEFAULT_ROI_INPUTS
)

export const useSimulationStore = create<SimulationState>((set, get) => ({
    presetId: "general",
    controls: DEFAULT_CONTROLS,
    derived: getInitialDerived("general", DEFAULT_CONTROLS),

    roiInputs: DEFAULT_ROI_INPUTS,
    roiResult: INITIAL_ROI_RESULT,

    nowMin: 0,
    playing: false,
    speed: 1,
    shipments: [],
    slots: [],
    events: [],
    recommendations: [],
    kpis: {
        shipmentVolume: 0,
        avgWaitMin: 0,
        rampUtilizationPct: 0,
        monthlySavingsEur: 0,
    },
    baselineKpis: {
        shipmentVolume: 0,
        avgWaitMin: 0,
        rampUtilizationPct: 0,
        monthlySavingsEur: 0,
    },

    setPreset: (presetId) => {
        const { controls } = get()
        const preset = LOGISTIKER_PRESETS.find(p => p.id === presetId)
        if (!preset) return

        // Update derived state based on new preset defaults + current controls
        const newDerived = mapControlsToParams(controls, preset)

        set({
            presetId,
            derived: newDerived
        })
        get().reset()
    },

    updateControls: (patch) => {
        const { controls, presetId } = get()
        const newControls = { ...controls, ...patch }
        const preset = LOGISTIKER_PRESETS.find(p => p.id === presetId) || LOGISTIKER_PRESETS[0]
        const newDerived = mapControlsToParams(newControls, preset)

        set({
            controls: newControls,
            derived: newDerived
        })
    },

    play: () => set({ playing: true }),
    pause: () => set({ playing: false }),
    setSpeed: (speed) => set({ speed }),

    tick: () => {
        const { playing, nowMin, events, recommendations, kpis, derived } = get()
        if (!playing) return

        const nextMin = nowMin + TIME_STEP_MIN

        // Generate new events and recommendations using DerivedParams
        const newEvents = generateEvents(get())
        const newRecs = generateRecommendations(get(), newEvents)

        // KPI drift logic using derived parameters
        const drift = 0.5 * derived.latenessProbability
        const updatedKpis = {
            ...kpis,
            avgWaitMin: kpis.avgWaitMin + Math.floor(rng.next() * drift),
            // Cap utilization at 98%
            rampUtilizationPct: Math.min(98, kpis.rampUtilizationPct + (rng.next() > 0.7 ? 1 : 0)),
            slaViolations: Math.max(0, (kpis.slaViolations || 0) + (rng.next() > 0.8 ? 1 : 0))
        }

        set({
            nowMin: nextMin,
            events: [...newEvents, ...events].slice(0, 20),
            recommendations: [...newRecs, ...recommendations].slice(0, 10),
            kpis: updatedKpis
        })
    },

    reset: () => {
        const { derived, presetId, roiInputs } = get()
        const preset = LOGISTIKER_PRESETS.find(p => p.id === presetId) || LOGISTIKER_PRESETS[0]

        // --- 1. Generate Shipments based on Volume Multiplier ---
        const baseTrucks = 50 // Standard daily volume
        const adjustedTrucks = Math.round(baseTrucks * derived.volumeMultiplier)
        const mockShipments: Shipment[] = Array.from({ length: 15 }).map((_, i) => ({
            id: `ship-${i}`,
            carrierName: ["DHL", "Kühne+Nagel", "Schenker", "Dachser", "FedEx"][i % 5],
            etaMin: Math.floor(rng.next() * HORIZON_MIN),
            serviceMin: Math.round((30 + rng.next() * 60) * derived.serviceTimeMultiplier),
            priority: rng.next() < derived.priorityShare ? "urgent" : "normal",
            constraints: i % 4 === 0 ? ["COLD_CHAIN"] : i % 7 === 0 ? ["GDP"] : [],
        }))

        // --- 2. Generate Slots ---
        const mockSlots: RampSlot[] = []
        const useRamps = derived.availableRampsCount
        const ramps = Array.from({ length: useRamps }).map((_, i) => `R-${i + 1}`)

        let occupancyBase = 0.7
        if (derived.expectedCongestion === "Low") occupancyBase = 0.5
        if (derived.expectedCongestion === "High") occupancyBase = 0.85
        if (derived.expectedCongestion === "Critical") occupancyBase = 0.95

        ramps.forEach(rampId => {
            for (let t = 0; t < HORIZON_MIN; t += 60) {
                if (rng.next() < occupancyBase) {
                    const ship = mockShipments[Math.floor(rng.next() * mockShipments.length)]
                    const isLate = rng.next() < derived.latenessProbability
                    mockSlots.push({
                        id: `slot-${rampId}-${t}`,
                        rampId,
                        startMin: t + (isLate ? 15 : 0),
                        endMin: t + 45 + (isLate ? 15 : 0),
                        shipmentId: ship.id,
                        status: isLate ? "critical" : (ship.priority === "urgent" ? "critical" : "busy")
                    })
                } else if (rng.next() < 0.3) {
                    mockSlots.push({
                        id: `slot-${rampId}-${t}`,
                        rampId,
                        startMin: t,
                        endMin: t + 45,
                        status: "recommended"
                    })
                }
            }
        })

        // --- 3. Initial KPIs ---
        const kpis: KPIs = {
            shipmentVolume: adjustedTrucks,
            avgWaitMin: derived.predictedWaitAI,
            rampUtilizationPct: Math.round(occupancyBase * 100),
            monthlySavingsEur: derived.projectedSavingsEur,
            co2SavedKg: derived.projectedCO2Saved,
            slaViolations: Math.round(adjustedTrucks * 0.02) // Approx 2% violations with AI
        }

        const baselineKpis: KPIs = {
            ...kpis,
            avgWaitMin: derived.predictedWaitBaseline,
            monthlySavingsEur: 0,
            rampUtilizationPct: Math.max(0, kpis.rampUtilizationPct - 15),
            slaViolations: Math.round(adjustedTrucks * 0.15) // Approx 15% violations baseline
        }

        // --- 4. ROI Calculation ---
        const roiBaseline = {
            trucksProcessed: baselineKpis.shipmentVolume,
            avgWaitMin: baselineKpis.avgWaitMin,
            slaViolations: baselineKpis.slaViolations,
            idleTimeMin: (baselineKpis.shipmentVolume * 15) // placeholder logic
        }

        const roiCurrent = {
            trucksProcessed: kpis.shipmentVolume,
            avgWaitMin: kpis.avgWaitMin,
            slaViolations: kpis.slaViolations,
            idleTimeMin: (kpis.shipmentVolume * 5)
        }


        const roiResult = calculateROI(roiBaseline, roiCurrent, roiInputs)

        set({
            nowMin: 0,
            playing: false,
            shipments: mockShipments,
            slots: mockSlots,
            events: [],
            recommendations: [],
            kpis,
            baselineKpis,
            roiResult
        })
    },

    selectSlot: (selectedSlotId) => set({ selectedSlotId }),

    applyRecommendation: (recId) => {
        const { recommendations, kpis, baselineKpis, roiInputs } = get()
        const rec = recommendations.find(r => r.id === recId)
        if (!rec) return

        const updatedKpis = {
            ...kpis,
            avgWaitMin: Math.max(5, kpis.avgWaitMin - (rec.impact.avgWaitReductionMin || 0)),
            monthlySavingsEur: kpis.monthlySavingsEur + (rec.impact.costSavingEur || 0)
        }

        // Recompute ROI
        const roiBaseline = {
            trucksProcessed: baselineKpis.shipmentVolume,
            avgWaitMin: baselineKpis.avgWaitMin,
            slaViolations: Math.round(baselineKpis.shipmentVolume * 0.05),
            idleTimeMin: (baselineKpis.shipmentVolume * 15)
        }

        const roiCurrent = {
            trucksProcessed: updatedKpis.shipmentVolume,
            avgWaitMin: updatedKpis.avgWaitMin,
            slaViolations: Math.round(updatedKpis.shipmentVolume * 0.01),
            idleTimeMin: (updatedKpis.shipmentVolume * 5)
        }

        const roiResult = calculateROI(roiBaseline, roiCurrent, roiInputs)

        set({
            recommendations: recommendations.filter(r => r.id !== recId),
            kpis: updatedKpis,
            roiResult
        })
    },

    updateRoiInputs: (patch) => {
        const { roiInputs, kpis, baselineKpis } = get()
        const newInputs = { ...roiInputs, ...patch }

        // Recompute ROI immediately
        const roiBaseline = {
            trucksProcessed: baselineKpis.shipmentVolume,
            avgWaitMin: baselineKpis.avgWaitMin,
            slaViolations: Math.round(baselineKpis.shipmentVolume * 0.05),
            idleTimeMin: (baselineKpis.shipmentVolume * 15)
        }

        const roiCurrent = {
            trucksProcessed: kpis.shipmentVolume,
            avgWaitMin: kpis.avgWaitMin,
            slaViolations: Math.round(kpis.shipmentVolume * 0.01),
            idleTimeMin: (kpis.shipmentVolume * 5)
        }

        const roiResult = calculateROI(roiBaseline, roiCurrent, newInputs)

        set({
            roiInputs: newInputs,
            roiResult
        })
    }
}))

function industryBasedWait(ind: string) {
    switch (ind) {
        case "fashion": return 18
        case "food": return 14
        case "pharma": return 12
        default: return 16
    }
}
