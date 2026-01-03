import type { ScenarioPreset } from "@/types/categoryData"

export const LOGISTIKER_PRESETS: ScenarioPreset[] = [
    {
        id: "general",
        label: "Logistik Allgemein",
        industry: "general",
        description: "Standard Warehouse Ops, balanced throughput & queue risk.",
        defaults: {
            volumeLevel: "normal",
            rampsCount: 6,
            latenessProbability: 0.25,
            priorityShare: 0.10,
            staffingLevel: "normal",
            slaStrictness: "normal",
        },
        activeConstraints: ["FIFO", "DOCK_CAPABILITY"],
    },
    {
        id: "food",
        label: "Lebensmittel",
        industry: "food",
        description: "Cold chain windows, FIFO pressure, HACCP-like compliance.",
        defaults: {
            volumeLevel: "peak",
            rampsCount: 8,
            latenessProbability: 0.30,
            priorityShare: 0.20,
            staffingLevel: "high",
            slaStrictness: "high",
        },
        activeConstraints: ["COLD_CHAIN", "FIFO", "TIME_WINDOWS"],
    },
    {
        id: "fashion",
        label: "Fashion & Retail",
        industry: "fashion",
        description: "Peak bursts, returns handling, time-to-shelf.",
        defaults: {
            volumeLevel: "peak",
            rampsCount: 7,
            latenessProbability: 0.35,
            priorityShare: 0.12,
            staffingLevel: "normal",
            slaStrictness: "normal",
        },
        activeConstraints: ["PEAK_BURSTS", "RETURNS", "TIME_TO_SHELF"],
    },
    {
        id: "pharma",
        label: "Pharma & Life Sciences",
        industry: "pharma",
        description: "GDP compliance, temperature integrity, audit readiness.",
        defaults: {
            volumeLevel: "normal",
            rampsCount: 5,
            latenessProbability: 0.18,
            priorityShare: 0.25,
            staffingLevel: "high",
            slaStrictness: "high",
        },
        activeConstraints: ["GDP", "TEMP_INTEGRITY", "AUDIT_TRAIL"],
    },
]
