export type RoiKpis = {
    trucksProcessed: number
    avgWaitMin: number
    slaViolations?: number
    idleTimeMin?: number
}

export type RoiInputs = {
    costPerWaitHourEur: number
    workingDaysPerMonth: number
    slaPenaltyPerViolationEur?: number
}

export type RoiResult = {
    deltas: {
        waitSavedMinPerTruck: number
        slaViolationsAvoided: number
        idleTimeSavedMin: number
    }
    daily: {
        waitSavingsEur: number
        slaSavingsEur: number
        totalSavingsEur: number
    }
    monthly: {
        totalSavingsEur: number
    }
    annual: {
        totalSavingsEur: number
    }
    assumptions: {
        workingDaysPerMonth: number
        costPerWaitHourEur: number
        slaPenaltyPerViolationEur: number
    }
    paybackStatement: string
}

export function calculateROI(
    baseline: RoiKpis,
    current: RoiKpis,
    inputs: RoiInputs
): RoiResult {
    const {
        costPerWaitHourEur,
        workingDaysPerMonth,
        slaPenaltyPerViolationEur = 0
    } = inputs

    // 1. Calculate Deltas (Baseline - Current)
    const waitSavedMinPerTruck = baseline.avgWaitMin - current.avgWaitMin
    const slaViolationsAvoided = (baseline.slaViolations || 0) - (current.slaViolations || 0)
    const idleTimeSavedMin = (baseline.idleTimeMin || 0) - (current.idleTimeMin || 0)

    // 2. Daily Savings
    // Wait Cost: (Minutes Saved / 60) * Trucks * Cost/Hour
    const dailyWaitSavingsHours = (waitSavedMinPerTruck / 60) * current.trucksProcessed
    const waitSavingsEur = dailyWaitSavingsHours * costPerWaitHourEur

    // SLA Penalty Savings
    const slaSavingsEur = slaViolationsAvoided * slaPenaltyPerViolationEur

    // Total Daily
    const totalDailySavingsEur = waitSavingsEur + slaSavingsEur

    // 3. Roll-ups
    const monthlyTotal = totalDailySavingsEur * workingDaysPerMonth
    const annualTotal = monthlyTotal * 12

    // 4. Payback/Impact Statement
    let paybackStatement = "dashboard:roi.payback.slow"
    if (annualTotal > 50000) paybackStatement = "dashboard:roi.payback.fast"
    else if (annualTotal > 20000) paybackStatement = "dashboard:roi.payback.medium"

    return {
        deltas: {
            waitSavedMinPerTruck,
            slaViolationsAvoided,
            idleTimeSavedMin
        },
        daily: {
            waitSavingsEur: Math.round(waitSavingsEur),
            slaSavingsEur: Math.round(slaSavingsEur),
            totalSavingsEur: Math.round(totalDailySavingsEur)
        },
        monthly: {
            totalSavingsEur: Math.round(monthlyTotal)
        },
        annual: {
            totalSavingsEur: Math.round(annualTotal)
        },
        assumptions: {
            workingDaysPerMonth,
            costPerWaitHourEur,
            slaPenaltyPerViolationEur
        },
        paybackStatement
    }
}
