//put validation types here so that wrong values wont be passed to the components - Stat, TimeSlot, Comparison, Benefit, IndustryData, CategoryInfo

export type Persona = "logistiker" | "carrier" | "healthcare"
export type Industry = "general" | "food" | "fashion" | "pharma"

export type SlotStatus = "free" | "busy" | "recommended" | "critical"

export type Shipment = {
    id: string
    carrierName: string
    etaMin: number            // minutes from simulation start
    serviceMin: number        // unloading time
    priority: "normal" | "urgent"
    constraints: string[]     // e.g. ["COLD_CHAIN", "GDP"]
}

export type Ramp = { id: string; name: string; capabilities: string[] }

export type RampSlot = {
    id: string
    rampId: string
    startMin: number
    endMin: number
    shipmentId?: string
    status: SlotStatus
    locked?: boolean
}

export type KPIs = {
    shipmentVolume: number
    avgWaitMin: number
    rampUtilizationPct: number
    monthlySavingsEur: number
    co2SavedKg?: number
    idleTimeAvoidedMin?: number
    slaViolations?: number
}

export type SimulationConfig = {
    industry: Industry
    rampsCount: number
    timeStepMin: number
    horizonMin: number
    volumeLevel: "low" | "normal" | "peak"
    latenessProbability: number  // 0..1
    priorityShare: number        // 0..1
    staffingLevel: "low" | "normal" | "high"
    slaStrictness: "low" | "normal" | "high"
    greenModuleEnabled: boolean

    // ROI inputs (optional, user-editable)
    costPerWaitHourEur: number
    trucksPerDay: number
    slaPenaltyPerViolationEur: number
}

export type ScenarioPreset = {
    id: string
    label: string
    industry: Industry
    description: string
    defaults: Partial<SimulationConfig>
    activeConstraints: string[]
}

export type SimEventType =
    | "TRUCK_LATE"
    | "DOCK_BLOCKED"
    | "URGENT_ARRIVAL"
    | "TEMP_RISK"
    | "STAFF_SHORTAGE"

export type SimEvent = {
    id: string
    timeMin: number         // simulation time
    timestamp?: number      // real-world time or alternative sim time
    type: SimEventType
    severity: "info" | "warning" | "critical"
    message: string
    affectedShipmentId?: string
    affectedRampId?: string
    data?: any              // extra payload
}

export type Recommendation = {
    id: string
    createdAtMin: number
    title: string
    description?: string    // short summary
    actionLabel: string     // button text
    reasoning: string[]     // top reasons
    action?: SimulationAction
    impact: {               // renamed from estimatedImpact for brevity in code
        avgWaitReductionMin?: number
        costSavingEur?: number
        co2SavingKg?: number
    }
    targetSlotId?: string   // helper for UI focus
    data?: any              // for i18n interpolation
}

export type SimulationAction =
    | { type: "MOVE_SHIPMENT"; shipmentId: string; toSlotId: string }
    | { type: "LOCK_SLOT"; slotId: string }
    | { type: "OPEN_NEW_RAMP"; rampId: string }
    | { type: "RESEQUENCE"; strategy: "MIN_WAIT" | "PRIORITY_FIRST" }

export interface Stat {
    icon: string;
    label: string;
    value: string;
    trend: string;
    class: 'info' | 'success' | 'warning';
}

export interface TimeSlot {
    id: string; // Unique ID for reconciliation
    time: string;
    truck: string;
    info: string;
    details: string;
    status: SlotStatus;
    location?: string;
}

export interface Comparison {
    before: { label: string; value: string }[];
    after: { label: string; value: string }[];
}

export interface Benefit {
    icon: string;
    title: string;
    desc: string;
}

export interface IndustryData {
    stats: Stat[];
    slots: TimeSlot[];
    comparison: Comparison;
}

export interface CategoryInfo {
    name: string;
    icon: string;
    industries: Record<string, string>;
    data: Record<string, IndustryData>;
    benefits: Benefit[] | Record<string, Benefit[]>;
}
