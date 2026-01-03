import type { Recommendation, SimulationConfig, KPIs } from "@/types/categoryData"

export type ExplanationResult = {
    reasons: string[]
    matchedConstraints: string[]
    counterfactual: {
        avgWaitMinDelta: number
        riskDelta: string
        slaViolationsDelta: number
    }
    confidence: "high" | "medium" | "low"
}

/**
 * Generates a detailed explanation for a given recommendation.
 */
export function explainRecommendation(
    rec: Recommendation,
    config: SimulationConfig,
    kpis: KPIs
): ExplanationResult {
    const reasons: string[] = [...rec.reasoning]
    const matchedConstraints: string[] = []

    // Industry-specific constraints
    if (config.industry === "food") {
        matchedConstraints.push("dashboard:explain.constraintsList.COLD_CHAIN", "dashboard:explain.constraintsList.FIFO", "dashboard:explain.constraintsList.TIME_WINDOWS")
    } else if (config.industry === "pharma") {
        matchedConstraints.push("dashboard:explain.constraintsList.GDP", "dashboard:explain.constraintsList.TEMP_INTEGRITY", "dashboard:explain.constraintsList.AUDIT_TRAIL")
    } else if (config.industry === "fashion") {
        matchedConstraints.push("dashboard:explain.constraintsList.PEAK_BURSTS", "dashboard:explain.constraintsList.RETURNS", "dashboard:explain.constraintsList.TIME_TO_SHELF")
    } else {
        matchedConstraints.push("dashboard:explain.constraintsList.FIFO", "dashboard:explain.constraintsList.DOCK_CAPABILITY")
    }

    // Volume-based reasoning
    if (config.volumeLevel === "peak") {
        reasons.push("dashboard:explain.volume.peak")
    }

    // Calculate counterfactual impact
    const avgWaitMinDelta = rec.impact.avgWaitReductionMin || Math.round(kpis.avgWaitMin * 0.15)
    const slaViolationsDelta = config.slaStrictness === "high" ? 3 : config.slaStrictness === "normal" ? 2 : 1

    let riskDelta = "dashboard:explain.riskLevels.medium"
    if (config.latenessProbability > 0.3) {
        riskDelta = "dashboard:explain.riskLevels.high"
    } else if (config.latenessProbability < 0.15) {
        riskDelta = "dashboard:explain.riskLevels.low"
    }

    // Confidence based on data quality/scenario
    let confidence: ExplanationResult["confidence"] = "high"
    if (config.volumeLevel === "peak" && config.latenessProbability > 0.25) {
        confidence = "medium"
    }

    return {
        reasons: reasons.slice(0, 5),
        matchedConstraints,
        counterfactual: {
            avgWaitMinDelta,
            riskDelta,
            slaViolationsDelta
        },
        confidence
    }
}
