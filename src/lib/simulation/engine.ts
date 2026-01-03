import type { SimulationState } from "@/store/simulationStore"
import type { SimEvent } from "@/types/categoryData"
import { LOGISTIKER_PRESETS } from "@/lib/simulation/presets"
import { rng } from "./utils"

/**
 * Generates operational events based on the current simulation state.
 */
export function generateEvents(state: SimulationState): SimEvent[] {
    const { derived, presetId, nowMin } = state
    const events: SimEvent[] = []

    // Resolve industry from preset
    const preset = LOGISTIKER_PRESETS.find(p => p.id === presetId)
    const industry = preset?.industry || "general"

    // Chance of a truck being late
    // Base lateness from derived params
    // Factor in eventRateMultiplier to scale event frequency globally
    if (rng.chance(derived.latenessProbability * 0.1 * derived.eventRateMultiplier)) {
        events.push({
            id: `event-late-${nowMin}`,
            type: "TRUCK_LATE",
            severity: "warning",
            timeMin: nowMin,
            message: "logistiker:events.truckLate",
            data: { delayMin: 25, carrier: "DHL" }
        })
    }

    // High utilization bottleneck
    // Scale chance by eventRateMultiplier (e.g. peak load increases this)
    if (state.kpis.rampUtilizationPct > 85 && rng.chance(0.05 * derived.eventRateMultiplier)) {
        events.push({
            id: `event-bottleneck-${nowMin}`,
            type: "DOCK_BLOCKED",
            severity: "critical",
            timeMin: nowMin,
            message: "logistiker:events.dockBlocked",
            data: { rampId: "R-2" }
        })
    }

    // Industry specific events
    if (industry === "food" || industry === "pharma") {
        if (rng.chance(0.03 * derived.eventRateMultiplier)) {
            events.push({
                id: `event-temp-${nowMin}`,
                type: "TEMP_RISK",
                severity: "critical",
                timeMin: nowMin,
                message: "logistiker:events.tempRisk",
                data: { shipmentId: "ship-482" }
            })
        }
    }

    return events
}
