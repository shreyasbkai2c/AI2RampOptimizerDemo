import type { SimulationState } from "@/store/simulationStore"
import type { SimEvent, Recommendation } from "@/types/categoryData"

/**
 * Heuristic-based recommendation engine.
 */
export function generateRecommendations(state: SimulationState, events: SimEvent[]): Recommendation[] {
    const { nowMin, controls } = state
    const recommendations: Recommendation[] = []

    for (const event of events) {
        if (event.type === "TRUCK_LATE") {
            recommendations.push({
                id: `rec-late-${event.id}`,
                createdAtMin: nowMin,
                title: "logistiker:recommendations.reschedule.label",
                description: "logistiker:recommendations.reschedule.desc",
                actionLabel: "common:actions.apply",
                impact: {
                    avgWaitReductionMin: 12,
                    costSavingEur: 150,
                    // Use controls directly for feature flags
                    co2SavingKg: controls.greenModuleEnabled ? 15 : undefined
                },
                reasoning: [
                    "dashboard:explain.late.avoidBlock",
                    "dashboard:explain.late.allowPrio",
                    "dashboard:explain.late.saveCost"
                ],
                targetSlotId: "some-slot-id",
                data: { truck: "LKW DHL", time: `${nowMin + 30} Min`, waitTime: 12 }
            })
        }

        if (event.type === "DOCK_BLOCKED") {
            recommendations.push({
                id: `rec-block-${event.id}`,
                createdAtMin: nowMin,
                title: "logistiker:recommendations.reschedule.label", // Reuse or add specific
                description: "logistiker:recommendations.staffUp.desc",
                actionLabel: "common:actions.apply",
                impact: {
                    avgWaitReductionMin: 8,
                    costSavingEur: 280
                },
                reasoning: [
                    "dashboard:explain.block.clearCongestion",
                    "dashboard:explain.block.increaseThroughput",
                    "dashboard:explain.block.optimizeStaff"
                ],
                data: { rampId: "R-2", throughput: 15 }
            })
        }

        if (event.type === "TEMP_RISK") {
            recommendations.push({
                id: `rec-temp-${event.id}`,
                createdAtMin: nowMin,
                title: "logistiker:recommendations.priority.label",
                description: "logistiker:recommendations.priority.desc",
                actionLabel: "common:actions.accept",
                impact: {
                    avgWaitReductionMin: 0,
                    costSavingEur: 1200
                },
                reasoning: [
                    "dashboard:explain.temp.minimizeRisk",
                    "dashboard:explain.temp.protectValue",
                    "dashboard:explain.temp.auditTrail"
                ],
                data: { truck: "Pharma Express", penalty: 1200 }
            })
        }
    }

    return recommendations
}
