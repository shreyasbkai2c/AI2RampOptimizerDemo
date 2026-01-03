import type { ScenarioPreset } from "@/types/categoryData"

export type OperationalLoad = "low" | "normal" | "peak"
export type RampAvailability = "all" | "oneDown" | "twoDown"
export type PriorityPressure = "low" | "medium" | "high"
export type StaffingLevel = "low" | "normal" | "high" // Mapped from "under" | "normal" | "full" internally if needed, but keeping consistent with UI values

export type SimpleControls = {
    volumeLevel: OperationalLoad // Mapped to 'load' concept
    rampState: RampAvailability // New explicit state
    priorityState: PriorityPressure // New explicit state
    staffingLevel: StaffingLevel
    greenModuleEnabled: boolean

    // ROI Configuration (Advanced)
    costPerWaitHourEur: number
    trucksPerDay: number
    slaPenaltyPerViolationEur: number
}

export type DerivedParams = {
    availableRampsCount: number
    volumeMultiplier: number
    latenessProbability: number
    arrivalClustering: number       // 1.0 normal, >1 more peaky
    serviceTimeMultiplier: number
    priorityShare: number
    slaStrictness: "low" | "normal" | "high"
    eventRateMultiplier: number
    engineIdleFactor: number        // fraction of wait treated as idling

    // UI Predictive Summaries
    expectedCongestion: "Low" | "Medium" | "High" | "Critical"
    predictedWaitBaseline: number
    predictedWaitAI: number
    projectedSavingsEur: number
    projectedCO2Saved: number
}

export function mapControlsToParams(controls: SimpleControls, preset: ScenarioPreset): DerivedParams {
    const defaults = preset.defaults

    // 1. Operational Load Mapping
    let volumeMultiplier = 1.0
    let arrivalClustering = 1.0
    let latenessAdd = 0.0
    let eventRateMult_Load = 1.0
    let congestionBase = 0

    switch (controls.volumeLevel) {
        case "low":
            volumeMultiplier = 0.75
            arrivalClustering = 0.9
            latenessAdd = -0.05
            eventRateMult_Load = 0.85
            congestionBase = 1
            break
        case "normal":
            volumeMultiplier = 1.0
            arrivalClustering = 1.0
            latenessAdd = 0.0
            eventRateMult_Load = 1.0
            congestionBase = 2
            break
        case "peak":
            volumeMultiplier = 1.35
            arrivalClustering = 1.25
            latenessAdd = 0.12
            eventRateMult_Load = 1.25
            congestionBase = 4
            break
    }

    // 2. Ramp Availability Mapping
    const baseRamps = defaults.rampsCount // Use preset default as the baseline "all"
    let availableRampsCount = baseRamps
    let eventRateAdd_Ramps = 0.0

    switch (controls.rampState) {
        case "all":
            availableRampsCount = baseRamps
            break
        case "oneDown":
            availableRampsCount = Math.max(1, baseRamps - 1)
            eventRateAdd_Ramps = 0.10
            congestionBase += 1
            break
        case "twoDown":
            availableRampsCount = Math.max(1, baseRamps - 2)
            eventRateAdd_Ramps = 0.20
            congestionBase += 2
            break
    }

    // 3. Priority Pressure Mapping
    let priorityShare = 0.1
    let slaStrictness: "low" | "normal" | "high" = "normal"
    let criticalEventProbAdd = 0.0

    switch (controls.priorityState) {
        case "low":
            priorityShare = 0.08
            slaStrictness = "low"
            criticalEventProbAdd = 0.0
            break
        case "medium":
            priorityShare = 0.16
            slaStrictness = "normal"
            criticalEventProbAdd = 0.08
            congestionBase += 0.5
            break
        case "high":
            priorityShare = 0.28
            slaStrictness = "high"
            criticalEventProbAdd = 0.15
            congestionBase += 1.5
            break
    }

    // 4. Staffing Level Mapping
    let serviceTimeMultiplier = 1.0
    let eventRateAdd_Staff = 0.0

    switch (controls.staffingLevel) {
        case "low": // Understaffed
            serviceTimeMultiplier = 1.25
            eventRateAdd_Staff = 0.15
            congestionBase += 2
            break
        case "normal":
            serviceTimeMultiplier = 1.0
            eventRateAdd_Staff = 0.0
            break
        case "high": // Fully staffed
            serviceTimeMultiplier = 0.85
            eventRateAdd_Staff = -0.05
            congestionBase -= 1
            break
    }

    // 5. Green Module Mapping
    const engineIdleFactor = controls.greenModuleEnabled ? 0.8 : 0.5

    // Combine derived values
    const latenessProbability = Math.max(0, Math.min(1.0, (defaults.latenessProbability || 0.2) + latenessAdd))
    const eventRateMultiplier = eventRateMult_Load + eventRateAdd_Ramps + eventRateAdd_Staff + criticalEventProbAdd

    // Predictive KPI Calculations (Heuristics for "Preview")
    // Base wait time varies by industry approx: Fashion 18, Food 14, Pharma 12, General 16
    let baseWait = 15
    if (preset.industry === 'fashion') baseWait = 18
    if (preset.industry === 'food') baseWait = 14
    if (preset.industry === 'pharma') baseWait = 12

    // Apply modifiers to predict wait
    // Volume impact: ^1.5 roughly for congestion
    // Ramp impact: inversely proportional
    // Staffing: linear on service time -> wait time

    // Congestion Factor: (Volume * ServiceTime) / (Ramps)
    const loadFactor = (volumeMultiplier * serviceTimeMultiplier) / (availableRampsCount / baseRamps)

    // Baseline (Manual) Prediction
    const predictedWaitBaseline = Math.round(baseWait * Math.pow(loadFactor, 1.5) * (1 + latenessProbability))

    // AI Prediction (Optimized)
    // AI usually mitigates 30-50% of the "excess" wait + fixed optimization
    const savingsFactor = 0.45 // 45% reduction typical
    const predictedWaitAI = Math.round(predictedWaitBaseline * (1 - savingsFactor))

    // Savings Calculation
    // Avg truck cost €45/h -> €0.75/min
    // Daily trucks = ~50 * volumeMultiplier
    // Daily savings = Trucks * (WaitBaseline - WaitAI) * Cost
    const dailyTrucks = Math.round(50 * volumeMultiplier)
    const dailyMinutesSaved = dailyTrucks * (predictedWaitBaseline - predictedWaitAI)
    const dailyMoneySaved = dailyMinutesSaved * 0.75 // €0.75 per min
    const monthlySavings = dailyMoneySaved * 20 // 20 working days

    // CO2 Calculation
    // Idling truck ~ 2.5 kg CO2/hr -> ~0.04 kg/min
    // AI reduces wait time, thus idling. Also reduces "empty miles" (not calculated here precisely but estimated)
    // Green module enables explicit tracking strategy which finds ~15% more efficiency
    const greenBonus = controls.greenModuleEnabled ? 1.15 : 1.0
    const monthlyCO2Saved = Math.round(dailyMinutesSaved * 0.04 * 20 * greenBonus)

    // Expected Congestion Label
    let expectedCongestion: DerivedParams["expectedCongestion"] = "Low"
    if (congestionBase >= 3) expectedCongestion = "Medium"
    if (congestionBase >= 5) expectedCongestion = "High"
    if (congestionBase >= 7) expectedCongestion = "Critical"

    return {
        availableRampsCount,
        volumeMultiplier,
        latenessProbability,
        arrivalClustering,
        serviceTimeMultiplier,
        priorityShare,
        slaStrictness,
        eventRateMultiplier,
        engineIdleFactor,
        expectedCongestion,
        predictedWaitBaseline,
        predictedWaitAI,
        projectedSavingsEur: Math.round(monthlySavings),
        projectedCO2Saved: monthlyCO2Saved
    }
}
