export interface Stat {
  icon: string;
  label: string;
  value: string;
  trend: string;
  class: 'info' | 'success' | 'warning';
}

export interface TimeSlot {
  id: string;
  time: string;
  truck: string;
  info: string;
  details: string;
  status: 'free' | 'busy' | 'recommended' | 'critical';
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
  name: string; // Translation key: common:categories.xxx
  icon: string;
  industries: Record<string, string>; // Values are translation keys: common:industries.xxx
  data: Record<string, IndustryData>;
  benefits: Benefit[] | Record<string, Benefit[]>;
}

export const categoryData: Record<string, CategoryInfo> = {
  logistics: {
    name: 'common:categories.logistics',
    icon: '🏢',
    industries: {
      general: 'common:industries.general',
      food: 'common:industries.food',
      fashion: 'common:industries.fashion',
      pharma: 'common:industries.pharma'
    },
    data: {
      general: {
        stats: [
          { icon: '📦', label: 'dashboard:stats.deliveriesToday', value: '52', trend: 'dashboard:trends.moreThanPlanned', class: 'info' },
          { icon: '⚡', label: 'dashboard:stats.rampUtilization', value: '89%', trend: 'dashboard:trends.withAi', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '16 min', trend: 'dashboard:trends.reduction', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '20400€', trend: 'dashboard:trends.guaranteed', class: 'success' }
        ],
        slots: [
          { id: 'sped-int-1', time: '08:00', truck: 'dashboard:trucks.truck#1247', info: 'dashboard:slotInfo.standard', details: 'dashboard:slotDetails.pallets#15', status: 'busy' },
          { id: 'sped-int-2', time: '09:00', truck: 'dashboard:trucks.truck#2891', info: 'dashboard:slotInfo.express', details: 'dashboard:slotDetails.pallets#22', status: 'busy' },
          { id: 'sped-int-3', time: '10:00', truck: 'dashboard:trucks.optimalMix', info: 'dashboard:slotInfo.savesTime#27', details: 'dashboard:slotDetails.rampOptimal#2', status: 'recommended' },
          { id: 'sped-int-4', time: '11:00', truck: 'dashboard:trucks.available', info: 'dashboard:slotInfo.allRampsFree', details: 'dashboard:slotDetails.flexible', status: 'free' },
          { id: 'sped-int-5', time: '12:00', truck: 'dashboard:trucks.truck#4782', info: 'dashboard:slotInfo.containerUnload', details: 'dashboard:slotDetails.pallets#30', status: 'busy' },
          { id: 'sped-int-6', time: '13:00', truck: 'dashboard:trucks.aiRecommendation', info: 'dashboard:slotInfo.savesTime#18', details: 'dashboard:slotDetails.avoidPeak', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '29 min' },
            { label: 'dashboard:comparison.metrics.utilization', value: '67%' },
            { label: 'dashboard:comparison.metrics.delays', value: '29200€' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '16 min' },
            { label: 'dashboard:comparison.metrics.utilization', value: '89%' },
            { label: 'dashboard:comparison.metrics.delays', value: '8800€' }
          ]
        }
      },
      food: {
        stats: [
          { icon: '🧊', label: 'dashboard:stats.coldFrozenDeliveries', value: '28', trend: 'dashboard:trends.allCompliant', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.fifoCompliance', value: '98%', trend: 'dashboard:trends.vsManual', class: 'success' },
          { icon: '🌡️', label: 'dashboard:stats.tempBreaks', value: '0', trend: 'dashboard:trends.haccpCompliant', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '12800€', trend: 'dashboard:trends.spoilagePrevented', class: 'success' }
        ],
        slots: [
          { id: 'food-1', time: '08:00', truck: 'dashboard:trucks.freshExpress', info: 'dashboard:slotInfo.fifoPrio', details: 'dashboard:slotDetails.rampCool#1', status: 'critical' },
          { id: 'food-2', time: '09:00', truck: 'dashboard:trucks.frozenDelivery', info: 'dashboard:slotInfo.frozen', details: 'dashboard:slotDetails.rampFrozen#2', status: 'busy' },
          { id: 'food-3', time: '10:00', truck: 'dashboard:trucks.optimalCold', info: 'dashboard:slotInfo.savesTime#22', details: 'dashboard:slotDetails.coolChainOpt', status: 'recommended' },
          { id: 'food-4', time: '11:00', truck: 'dashboard:trucks.dryGoods', info: 'dashboard:slotInfo.standard', details: 'dashboard:slotDetails.ramp#4', status: 'busy' },
          { id: 'food-5', time: '12:00', truck: 'dashboard:trucks.hygieneSlot', info: 'dashboard:slotInfo.afterCleaning', details: 'dashboard:slotDetails.rampCleaned#1', status: 'free' },
          { id: 'food-6', time: '13:00', truck: 'dashboard:trucks.freshFast', info: 'dashboard:slotInfo.expressGoods', details: 'dashboard:slotInfo.savesTime#15', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTimeColdGoods', value: '32 min' },
            { label: 'dashboard:comparison.metrics.tempBreaks', value: '12/Mon' },
            { label: 'dashboard:comparison.metrics.spoilage', value: '4800€' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTimeColdGoods', value: '14 min' },
            { label: 'dashboard:comparison.metrics.tempBreaks', value: '0/Mon' },
            { label: 'dashboard:comparison.metrics.spoilage', value: '0€' }
          ]
        }
      },
      fashion: {
        stats: [
          { icon: '📦', label: 'dashboard:stats.deliveriesPerDay', value: '68', trend: 'dashboard:trends.peakSeason', class: 'info' },
          { icon: '🔄', label: 'dashboard:stats.returnsRate', value: '18%', trend: 'dashboard:trends.handledOptimally', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.timeToShelf', value: '4.2h', trend: 'dashboard:trends.faster', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '15200€', trend: 'dashboard:trends.peakOptimization', class: 'success' }
        ],
        slots: [
          { id: 'fashion-1', time: '08:00', truck: 'dashboard:trucks.hangingFashion', info: 'dashboard:slotInfo.preSeason', details: 'dashboard:slotDetails.rampHanging#1', status: 'busy' },
          { id: 'fashion-2', time: '09:00', truck: 'dashboard:trucks.accessoriesMix', info: 'dashboard:slotInfo.multiBrand', details: 'dashboard:slotDetails.cartons#45', status: 'busy' },
          { id: 'fashion-3', time: '10:00', truck: 'dashboard:trucks.peakOptimization', info: 'dashboard:slotInfo.savesTime#28', details: 'dashboard:slotDetails.avoidTraffic', status: 'recommended' },
          { id: 'fashion-4', time: '11:00', truck: 'dashboard:trucks.returnsWave', info: 'dashboard:slotInfo.returnsHandling', details: 'dashboard:slotDetails.ramp#3', status: 'busy' },
          { id: 'fashion-5', time: '12:00', truck: 'dashboard:trucks.expressCollection', info: 'dashboard:slotInfo.timeCritical', details: 'dashboard:slotDetails.launchTomorrow', status: 'critical' },
          { id: 'fashion-6', time: '13:00', truck: 'dashboard:trucks.optimalFashion', info: 'dashboard:slotInfo.afterPeak', details: 'dashboard:slotDetails.savesTime#19', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.peakWaitTime', value: '42 min' },
            { label: 'dashboard:comparison.metrics.overtime', value: 'dashboard:comparisonValues.180hPerMon' },
            { label: 'dashboard:comparison.metrics.timeToShelf', value: '6.8h' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.peakWaitTime', value: '18 min' },
            { label: 'dashboard:comparison.metrics.overtime', value: 'dashboard:comparisonValues.45hPerMon' },
            { label: 'dashboard:comparison.metrics.timeToShelf', value: '4.2h' }
          ]
        }
      },
      pharma: {
        stats: [
          { icon: '🔬', label: 'dashboard:stats.validatedDeliveries', value: '45', trend: 'dashboard:trends.gdpCompliant', class: 'info' },
          { icon: '🧊', label: 'dashboard:stats.coldChainIntegrity', value: '100%', trend: 'dashboard:trends.coldChain', class: 'success' },
          { icon: '📋', label: 'dashboard:stats.auditReadiness', value: '100%', trend: 'dashboard:trends.documented', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '18400€', trend: 'dashboard:trends.complianceEfficiency', class: 'success' }
        ],
        slots: [
          { id: 'pharma-1', time: '08:00', truck: 'dashboard:trucks.vaccineExpress', info: 'dashboard:slotInfo.tempGdp', details: 'dashboard:slotDetails.rampValid#1', status: 'critical' },
          { id: 'pharma-2', time: '09:00', truck: 'dashboard:trucks.routinePharma', info: 'dashboard:slotInfo.gdpDoc', details: 'dashboard:slotDetails.ramp#2', status: 'busy' },
          { id: 'pharma-3', time: '10:00', truck: 'dashboard:trucks.optimalGdp', info: 'dashboard:slotInfo.savesTime#25', details: 'dashboard:slotDetails.auditOpt', status: 'recommended' },
          { id: 'pharma-4', time: '11:00', truck: 'dashboard:trucks.clinicalStudy', info: 'dashboard:slotInfo.specialDoc', details: 'dashboard:slotDetails.ramp#3', status: 'busy' },
          { id: 'pharma-5', time: '12:00', truck: 'dashboard:trucks.narcotics', info: 'dashboard:slotInfo.btmDoc', details: 'dashboard:slotDetails.rampSecure#1', status: 'busy' },
          { id: 'pharma-6', time: '13:00', truck: 'dashboard:trucks.expressPharma', info: 'dashboard:slotInfo.savesTime#20', details: 'dashboard:slotDetails.gdpFast', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTimePharma', value: '35 min' },
            { label: 'dashboard:comparison.metrics.auditIssues', value: 'dashboard:comparisonValues.8perYear' },
            { label: 'dashboard:comparison.metrics.waste', value: '6200€' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTimePharma', value: '12 min' },
            { label: 'dashboard:comparison.metrics.auditIssues', value: 'dashboard:comparisonValues.0PerYear' },
            { label: 'dashboard:comparison.metrics.waste', value: '0€' }
          ]
        }
      }
    },
    benefits: [
      { icon: '🎯', title: 'dashboard:benefits.logistics.autoOptTitle', desc: 'dashboard:benefits.logistics.autoOptDesc' },
      { icon: '📊', title: 'dashboard:benefits.logistics.transparencyTitle', desc: 'dashboard:benefits.logistics.transparencyDesc' },
      { icon: '💰', title: 'dashboard:benefits.logistics.savingsTitle', desc: 'dashboard:benefits.logistics.savingsDesc' },
      { icon: '🔌', title: 'dashboard:benefits.logistics.integrationTitle', desc: 'dashboard:benefits.logistics.integrationDesc' }
    ]
  },
  carrier: {
    name: 'common:categories.carrier',
    icon: '🚛',
    industries: {
      ftl: 'common:industries.ftl',
      ltl: 'common:industries.ltl',
      express: 'common:industries.express'
    },
    data: {
      ftl: {
        stats: [
          { icon: '🚛', label: 'dashboard:stats.bookedSlotsToday', value: '18', trend: 'dashboard:trends.allConfirmed', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '12 min', trend: 'dashboard:trends.vsNoBooking', class: 'success' },
          { icon: '📍', label: 'dashboard:stats.avgStopsPerDay', value: '15', trend: 'dashboard:trends.morePossible', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '9200€', trend: 'dashboard:trends.fuelTime', class: 'success' }
        ],
        slots: [
          { id: 'sped-4-1', time: '08:00', truck: 'dashboard:trucks.depotMunich', info: 'dashboard:slotInfo.slotBooked', details: 'dashboard:slotDetails.ramp#2', status: 'busy', location: 'München' },
          { id: 'sped-4-2', time: '10:00', truck: 'dashboard:trucks.depotStuttgart', info: 'dashboard:slotInfo.slotBooked', details: 'dashboard:slotDetails.ramp#1', status: 'busy', location: 'Stuttgart' },
          { id: 'sped-4-3', time: '12:00', truck: 'dashboard:trucks.optimalSlot', info: 'dashboard:slotInfo.savesTime#25', details: 'dashboard:slotDetails.routeOpt', status: 'recommended', location: 'Nürnberg' },
          { id: 'sped-4-4', time: '14:00', truck: 'dashboard:trucks.available', info: 'dashboard:slotInfo.bookNow', details: 'dashboard:slotDetails.rampFree', status: 'free', location: 'Frankfurt' },
          { id: 'sped-4-5', time: '15:00', truck: 'dashboard:trucks.optimalRoute', info: 'dashboard:slotInfo.savesTime#18', details: 'dashboard:slotDetails.recommended', status: 'recommended', location: 'Köln' },
          { id: 'sped-4-6', time: '17:00', truck: 'dashboard:trucks.expressSlot', info: 'dashboard:slotInfo.fastLane', details: 'dashboard:slotDetails.premium', status: 'busy', location: 'Hamburg' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTimePerStop', value: '25 min' },
            { label: 'dashboard:comparison.metrics.stopsPerDay', value: '12' },
            { label: 'dashboard:comparison.metrics.fuel', value: '1840€' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTimePerStop', value: '12 min' },
            { label: 'dashboard:comparison.metrics.stopsPerDay', value: '15' },
            { label: 'dashboard:comparison.metrics.fuel', value: '1540€' }
          ]
        }
      },
      ltl: {
        stats: [
          { icon: '📦', label: 'dashboard:stats.ltlDeliveriesToday', value: '24', trend: 'dashboard:trends.multiStop', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '15 min', trend: 'dashboard:trends.reductionGeneric', class: 'success' },
          { icon: '🗺️', label: 'dashboard:stats.kmsSavedPerDay', value: '45', trend: 'dashboard:trends.routeOptimized', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '7800€', trend: 'dashboard:trends.efficiency', class: 'success' }
        ],
        slots: [
          { id: 'ltl-1', time: '07:00', truck: 'dashboard:trucks.multiStopA', info: 'dashboard:slotInfo.stops5', details: 'dashboard:slotDetails.optPlanned', status: 'busy' },
          { id: 'ltl-2', time: '09:00', truck: 'dashboard:trucks.multiStopB', info: 'dashboard:slotInfo.stops4', details: 'dashboard:slotDetails.routeOpt', status: 'busy' },
          { id: 'ltl-3', time: '11:00', truck: 'dashboard:trucks.optimalLtl', info: 'dashboard:slotInfo.savesTime#22', details: 'dashboard:slotDetails.multiStopRoute', status: 'recommended' },
          { id: 'ltl-4', time: '13:00', truck: 'dashboard:trucks.available', info: 'dashboard:slotInfo.slotFree', details: 'dashboard:slotDetails.flexBooking', status: 'free' },
          { id: 'ltl-5', time: '15:00', truck: 'dashboard:trucks.afternoonRoute', info: 'dashboard:slotInfo.standardGeneric', details: 'dashboard:slotDetails.savesTime#15', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTimePerStop', value: '29 min' },
            { label: 'dashboard:comparison.metrics.kmsPerDay', value: '320' },
            { label: 'dashboard:comparison.metrics.stopsPerTour', value: '4' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTimePerStop', value: '15 min' },
            { label: 'dashboard:comparison.metrics.kmsPerDay', value: '275' },
            { label: 'dashboard:comparison.metrics.stopsPerTour', value: '5' }
          ]
        }
      },
      express: {
        stats: [
          { icon: '⚡', label: 'dashboard:stats.expressDeliveries', value: '42', trend: 'dashboard:trends.priority', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '8 min', trend: 'dashboard:trends.reductionHigh', class: 'success' },
          { icon: '🎯', label: 'dashboard:stats.onTimeDelivery', value: '96%', trend: 'dashboard:trends.guaranteedGeneric', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '11200€', trend: 'dashboard:trends.premium', class: 'success' }
        ],
        slots: [
          { id: 'exp-1', time: '06:00', truck: 'dashboard:trucks.earlyExpress', info: 'dashboard:slotInfo.prio1', details: 'dashboard:slotDetails.fastLane', status: 'critical' },
          { id: 'exp-2', time: '08:00', truck: 'dashboard:trucks.morningExpress', info: 'dashboard:slotInfo.prio2', details: 'dashboard:slotDetails.quickHandling', status: 'busy' },
          { id: 'exp-3', time: '10:00', truck: 'dashboard:trucks.optimalExpress', info: 'dashboard:slotInfo.savesTime#30', details: 'dashboard:slotDetails.premiumSlot', status: 'recommended' },
          { id: 'exp-4', time: '12:00', truck: 'dashboard:trucks.middayExpress', info: 'dashboard:slotInfo.fastLane', details: 'dashboard:slotDetails.rampReserved', status: 'busy' },
          { id: 'exp-5', time: '14:00', truck: 'dashboard:trucks.available', info: 'dashboard:slotInfo.expressGoods', details: 'dashboard:slotDetails.bookNow', status: 'free' },
          { id: 'exp-6', time: '16:00', truck: 'dashboard:trucks.lateExpress', info: 'dashboard:slotInfo.savesTime#25', details: 'dashboard:slotDetails.recommended', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit', value: '23 min' },
            { label: 'Pünktlichkeit', value: '78%' },
            { label: 'Expresszuschlag', value: '2400€' }
          ],
          after: [
            { label: 'Wartezeit', value: '8 min' },
            { label: 'Pünktlichkeit', value: '96%' },
            { label: 'Expresszuschlag', value: '1200€' }
          ]
        }
      }
    },
    benefits: [
      { icon: '📅', title: 'dashboard:benefits.carrier.slotsTitle', desc: 'dashboard:benefits.carrier.slotsDesc' },
      { icon: '🗺️', title: 'dashboard:benefits.carrier.routingTitle', desc: 'dashboard:benefits.carrier.routingDesc' },
      { icon: '⏱️', title: 'dashboard:benefits.carrier.throughputTitle', desc: 'dashboard:benefits.carrier.throughputDesc' },
      { icon: '📱', title: 'dashboard:benefits.carrier.mobileTitle', desc: 'dashboard:benefits.carrier.mobileDesc' }
    ]
  },
  healthcare: {
    name: 'common:categories.healthcare',
    icon: '🏥',
    industries: {
      hospital: 'common:industries.hospital',
      pharmacy: 'common:industries.pharmacy',
      medical: 'common:industries.medical'
    },
    data: {
      hospital: {
        stats: [
          { icon: '🔴', label: 'dashboard:stats.criticalDeliveries', value: '3', trend: 'dashboard:trends.allOnTime', class: 'warning' },
          { icon: '🧊', label: 'dashboard:stats.coldChainIntegrity', value: '100%', trend: 'dashboard:trends.gdpCompliantGeneric', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTimePharma', value: '8 min', trend: 'dashboard:trends.reductionMassive', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '8200€', trend: 'dashboard:trends.spoilagePrevented', class: 'success' }
        ],
        slots: [
          { id: 'hos-1', time: '08:00', truck: 'dashboard:trucks.emergencyBlood', info: 'dashboard:slotInfo.critical', details: 'dashboard:slotDetails.rampCool#1', status: 'critical' },
          { id: 'hos-2', time: '09:00', truck: 'dashboard:trucks.routinePharma', info: 'dashboard:slotInfo.gdpDoc', details: 'dashboard:slotDetails.coolChainOpt', status: 'busy' },
          { id: 'hos-3', time: '10:00', truck: 'dashboard:trucks.optimalExpress', info: 'dashboard:slotInfo.coolRampFree', details: 'dashboard:slotDetails.savesTime#27', status: 'recommended' },
          { id: 'hos-4', time: '11:00', truck: 'dashboard:trucks.chemoPatient', info: 'dashboard:slotInfo.critical', details: 'dashboard:slotDetails.opTime#13:00', status: 'critical' },
          { id: 'hos-5', time: '12:00', truck: 'dashboard:trucks.sterileGoods', info: 'dashboard:slotInfo.hygieneZone', details: 'dashboard:slotDetails.rampClean#3', status: 'busy' },
          { id: 'hos-6', time: '13:00', truck: 'dashboard:trucks.optimalPharma', info: 'dashboard:slotInfo.gdpCompliant', details: 'dashboard:slotDetails.savesTime#18', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTimePharma', value: '28 min' },
            { label: 'dashboard:comparison.metrics.gdpCompliance', value: '87%' },
            { label: 'dashboard:comparison.metrics.wastePerMonth', value: '4200€' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTimePharma', value: '8 min' },
            { label: 'dashboard:comparison.metrics.gdpCompliance', value: '100%' },
            { label: 'dashboard:comparison.metrics.wastePerMonth', value: '0€' }
          ]
        }
      },
      pharmacy: {
        stats: [
          { icon: '💊', label: 'dashboard:stats.pharmaDeliveries', value: '34', trend: 'dashboard:trends.gdpCompliant', class: 'info' },
          { icon: '🧊', label: 'dashboard:stats.coldGoods', value: '18', trend: 'dashboard:trends.allCompliant', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '10 min', trend: 'dashboard:trends.reductionHigh', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '6800€', trend: 'dashboard:trends.optimized', class: 'success' }
        ],
        slots: [
          { id: 'phar-1', time: '08:00', truck: 'dashboard:trucks.pharmacyExpress', info: 'dashboard:slotInfo.severalStops', details: 'dashboard:slotDetails.routeOpt', status: 'busy' },
          { id: 'phar-2', time: '09:00', truck: 'dashboard:trucks.coldPharma', info: 'dashboard:slotInfo.temp2_8', details: 'dashboard:slotDetails.rampCool#1', status: 'busy' },
          { id: 'phar-3', time: '10:00', truck: 'dashboard:trucks.optimalExpress', info: 'dashboard:slotInfo.savesTime#22', details: 'dashboard:slotDetails.multiStopRoute', status: 'recommended' },
          { id: 'phar-4', time: '11:00', truck: 'dashboard:trucks.standardOtc', info: 'dashboard:slotInfo.otc', details: 'dashboard:slotDetails.ramp#3', status: 'busy' },
          { id: 'phar-5', time: '12:00', truck: 'dashboard:trucks.available', info: 'dashboard:slotInfo.flexible', details: 'dashboard:slotDetails.allRampsFree', status: 'free' },
          { id: 'phar-6', time: '13:00', truck: 'dashboard:trucks.afternoonRoute', info: 'dashboard:slotInfo.standardGeneric', details: 'dashboard:slotDetails.savesTime#15', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '29 min' },
            { label: 'dashboard:comparison.metrics.coldChainOk', value: '92%' },
            { label: 'dashboard:comparison.metrics.documentation', value: 'dashboard:comparisonValues.1_5hPerDay' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '10 min' },
            { label: 'dashboard:comparison.metrics.coldChainOk', value: '100%' },
            { label: 'dashboard:comparison.metrics.documentation', value: 'dashboard:comparisonValues.auto' }
          ]
        }
      },
      medical: {
        stats: [
          { icon: '🔬', label: 'dashboard:stats.medicalDeviceDeliveries', value: '22', trend: 'dashboard:trends.specialTransport', class: 'info' },
          { icon: '📦', label: 'dashboard:stats.sterileGoods', value: '15', trend: 'dashboard:trends.hygieneCompliant', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '12 min', trend: 'dashboard:trends.reductionHigh58', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '7400€', trend: 'dashboard:trends.optimized', class: 'success' }
        ],
        slots: [
          { id: 'med-1', time: '08:00', truck: 'dashboard:trucks.opInstruments', info: 'dashboard:slotInfo.sterile', details: 'dashboard:slotDetails.cleanRoomRamp', status: 'busy' },
          { id: 'med-2', time: '09:00', truck: 'dashboard:trucks.dialysis', info: 'dashboard:slotInfo.timeCritical', details: 'dashboard:slotDetails.ramp#2', status: 'busy' },
          { id: 'med-3', time: '10:00', truck: 'dashboard:trucks.optimalMedical', info: 'dashboard:slotInfo.savesTime#25', details: 'dashboard:slotDetails.hygieneOpt', status: 'recommended' },
          { id: 'med-4', time: '11:00', truck: 'dashboard:trucks.imagingEq', info: 'dashboard:slotInfo.heavyTransport', details: 'dashboard:slotDetails.specialRamp', status: 'busy' },
          { id: 'med-5', time: '12:00', truck: 'dashboard:trucks.labSupplies', info: 'dashboard:slotInfo.standardGeneric', details: 'dashboard:slotDetails.ramp#4', status: 'busy' },
          { id: 'med-6', time: '13:00', truck: 'dashboard:trucks.expressMedical', info: 'dashboard:slotInfo.standardGeneric', details: 'dashboard:slotDetails.savesTime#16', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '28 min' },
            { label: 'dashboard:comparison.metrics.hygieneCompliance', value: '88%' },
            { label: 'dashboard:comparison.metrics.specialHandling', value: 'dashboard:comparisonValues.manual' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '12 min' },
            { label: 'dashboard:comparison.metrics.hygieneCompliance', value: '100%' },
            { label: 'dashboard:comparison.metrics.specialHandling', value: 'dashboard:comparisonValues.auto' }
          ]
        }
      }
    },
    benefits: {
      hospital: [
        { icon: '🎯', title: 'dashboard:benefits.hospital.prioTitle', desc: 'dashboard:benefits.hospital.prioDesc' },
        { icon: '🧊', title: 'dashboard:benefits.hospital.coldChainTitle', desc: 'dashboard:benefits.hospital.coldChainDesc' },
        { icon: '📋', title: 'dashboard:benefits.hospital.gdpTitle', desc: 'dashboard:benefits.hospital.gdpDesc' },
        { icon: '💰', title: 'dashboard:benefits.hospital.wasteTitle', desc: 'dashboard:benefits.hospital.wasteDesc' }
      ],
      pharmacy: [
        { icon: '💊', title: 'dashboard:benefits.pharmacy.routingTitle', desc: 'dashboard:benefits.pharmacy.routingDesc' },
        { icon: '🧊', title: 'dashboard:benefits.pharmacy.coldChainTitle', desc: 'dashboard:benefits.pharmacy.coldChainDesc' },
        { icon: '📋', title: 'dashboard:benefits.pharmacy.gdpTitle', desc: 'dashboard:benefits.pharmacy.gdpDesc' },
        { icon: '💰', title: 'dashboard:benefits.pharmacy.savingsTitle', desc: 'dashboard:benefits.pharmacy.savingsDesc' }
      ],
      medical: [
        { icon: '🔬', title: 'dashboard:benefits.medical.sterileTitle', desc: 'dashboard:benefits.medical.sterileDesc' },
        { icon: '📦', title: 'dashboard:benefits.medical.specialTitle', desc: 'dashboard:benefits.medical.specialDesc' },
        { icon: '🧹', title: 'dashboard:benefits.medical.hygieneTitle', desc: 'dashboard:benefits.medical.hygieneDesc' },
        { icon: '💰', title: 'dashboard:benefits.medical.protectionTitle', desc: 'dashboard:benefits.medical.protectionDesc' }
      ]
    }
  }
};

export const greenData = {
  stats: [
    { icon: '🌍', value: '2.8t', label: 'dashboard:green.co2Saved' },
    { icon: '🌳', value: '140', label: 'dashboard:green.treesPlanted' },
    { icon: '⚡', value: '-81%', label: 'dashboard:green.idleEmissions' },
    { icon: '♻️', value: '15%', label: 'dashboard:green.lessEmpty' }
  ],
  benefits: [
    { icon: '📊', title: 'dashboard:green.trackingTitle', desc: 'dashboard:green.trackingDesc' },
    { icon: '⏱️', title: 'dashboard:green.idleTitle', desc: 'dashboard:green.idleDesc' },
    { icon: '🗺️', title: 'dashboard:green.routingTitle', desc: 'dashboard:green.routingDesc' },
    { icon: '💰', title: 'dashboard:green.priceTitle', desc: 'dashboard:green.priceDesc' }
  ]
};
