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
          { icon: '📦', label: 'dashboard:stats.deliveriesToday', value: '52', trend: '↗ +8 mehr als geplant', class: 'info' },
          { icon: '⚡', label: 'dashboard:stats.rampUtilization', value: '89%', trend: '↗ +32% mit KI', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '16 Min', trend: '↘ -45% Reduktion', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€20.4k', trend: '↗ Messbar garantiert', class: 'success' }
        ],
        slots: [
          { id: 'sped-int-1', time: '08:00', truck: 'LKW #1247', info: 'Standard-Lieferung', details: '15 Paletten', status: 'busy' },
          { id: 'sped-int-2', time: '09:00', truck: 'LKW #2891', info: 'Express-Lieferung', details: '22 Paletten', status: 'busy' },
          { id: 'sped-int-3', time: '10:00', truck: 'Optimal für Mix', info: 'Spart 27 Min', details: 'Rampe 2 optimal', status: 'recommended' },
          { id: 'sped-int-4', time: '11:00', truck: 'Verfügbar', info: 'Alle Rampen frei', details: 'Flexibel planbar', status: 'free' },
          { id: 'sped-int-5', time: '12:00', truck: 'LKW #4782', info: 'Container-Entladung', details: '30 Paletten', status: 'busy' },
          { id: 'sped-int-6', time: '13:00', truck: 'AI-Empfehlung', info: 'Spart 18 Min', details: 'Peak vermeiden', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '29 Min' },
            { label: 'dashboard:comparison.metrics.utilization', value: '67%' },
            { label: 'dashboard:comparison.metrics.delays', value: '€29.2k' }
          ],
          after: [
            { label: 'dashboard:comparison.metrics.waitTime', value: '16 Min' },
            { label: 'dashboard:comparison.metrics.utilization', value: '89%' },
            { label: 'dashboard:comparison.metrics.delays', value: '€8.8k' }
          ]
        }
      },
      food: {
        stats: [
          { icon: '🧊', label: 'Kühl-/TK-Lieferungen', value: '28', trend: 'Alle konform', class: 'info' },
          { icon: '⏱️', label: 'FIFO-Konformität', value: '98%', trend: '↗ +12% vs. manuell', class: 'success' },
          { icon: '🌡️', label: 'Temperatur-Breaks', value: '0', trend: 'HACCP-konform', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€12.8k', trend: '↗ Verderb verhindert', class: 'success' }
        ],
        slots: [
          { id: 'food-1', time: '08:00', truck: 'Frischware Express', info: 'FIFO Priorität', details: 'Rampe 1 (Kühl)', status: 'critical' },
          { id: 'food-2', time: '09:00', truck: 'Tiefkühl-Lieferung', info: '-18°C TK', details: 'Rampe 2 (TK)', status: 'busy' },
          { id: 'food-3', time: '10:00', truck: 'Optimal Kühlware', info: 'Spart 22 Min', details: 'Kühlkette optimal', status: 'recommended' },
          { id: 'food-4', time: '11:00', truck: 'Trockenwaren', info: 'Standard', details: 'Rampe 4', status: 'busy' },
          { id: 'food-5', time: '12:00', truck: 'Hygiene-Zeitfenster', info: 'Nach Reinigung', details: 'Rampe 1 gereinigt', status: 'free' },
          { id: 'food-6', time: '13:00', truck: 'Fresh & Fast', info: 'Expressware', details: 'Spart 15 Min', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit Kühlware', value: '32 Min' },
            { label: 'Temperatur-Breaks', value: '12/Mon' },
            { label: 'Verderb', value: '€4.8k' }
          ],
          after: [
            { label: 'Wartezeit Kühlware', value: '14 Min' },
            { label: 'Temperatur-Breaks', value: '0/Mon' },
            { label: 'Verderb', value: '€0' }
          ]
        }
      },
      fashion: {
        stats: [
          { icon: '📦', label: 'Lieferungen/Tag', value: '68', trend: 'Peak-Saison', class: 'info' },
          { icon: '🔄', label: 'Returns-Rate', value: '18%', trend: 'Optimal gehandelt', class: 'success' },
          { icon: '⏱️', label: 'Time-to-Shelf', value: '4.2h', trend: '↘ -38% schneller', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€15.2k', trend: '↗ Peak-Optimierung', class: 'success' }
        ],
        slots: [
          { id: 'fashion-1', time: '08:00', truck: 'Hängend Fashion', info: 'Pre-Season', details: 'Rampe 1 (Hängend)', status: 'busy' },
          { id: 'fashion-2', time: '09:00', truck: 'Accessories Mix', info: 'Multi-Brand', details: '45 Kartons', status: 'busy' },
          { id: 'fashion-3', time: '10:00', truck: 'Peak-Optimierung', info: 'Spart 28 Min', details: 'Vermeidet Stoßzeit', status: 'recommended' },
          { id: 'fashion-4', time: '11:00', truck: 'Returns-Welle', info: 'Retouren-Handling', details: 'Rampe 3', status: 'busy' },
          { id: 'fashion-5', time: '12:00', truck: 'Express New Collection', info: 'Zeitkritisch', details: 'Launch morgen!', status: 'critical' },
          { id: 'fashion-6', time: '13:00', truck: 'Optimal Fashion', info: 'Nach Peak', details: 'Spart 19 Min', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Peak Wartezeit', value: '42 Min' },
            { label: 'Überstunden', value: '180h/Mon' },
            { label: 'Time-to-Shelf', value: '6.8h' }
          ],
          after: [
            { label: 'Peak Wartezeit', value: '18 Min' },
            { label: 'Überstunden', value: '45h/Mon' },
            { label: 'Time-to-Shelf', value: '4.2h' }
          ]
        }
      },
      pharma: {
        stats: [
          { icon: '🔬', label: 'Validierte Lieferungen', value: '45', trend: '100% GDP-konform', class: 'info' },
          { icon: '🧊', label: 'Kühlketten-Integrität', value: '100%', trend: '2-8°C durchgehend', class: 'success' },
          { icon: '📋', label: 'Audit-Readiness', value: '100%', trend: 'Vollständig dokumentiert', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€18.4k', trend: '↗ Compliance + Effizienz', class: 'success' }
        ],
        slots: [
          { id: 'pharma-1', time: '08:00', truck: 'Vakzine Express', info: '2-8°C GDP', details: 'Rampe 1 (Validiert)', status: 'critical' },
          { id: 'pharma-2', time: '09:00', truck: 'Routine Pharma', info: 'GDP-Dokumentiert', details: 'Rampe 2', status: 'busy' },
          { id: 'pharma-3', time: '10:00', truck: 'Optimal GDP-Slot', info: 'Spart 25 Min', details: 'Audit-optimiert', status: 'recommended' },
          { id: 'pharma-4', time: '11:00', truck: 'Klinische Studie', info: 'Spezialdokumentation', details: 'Rampe 3', status: 'busy' },
          { id: 'pharma-5', time: '12:00', truck: 'Narkotika-Lieferung', info: 'BtM dokumentiert', details: 'Rampe 1 (Sicher)', status: 'busy' },
          { id: 'pharma-6', time: '13:00', truck: 'Express Pharma', info: 'Spart 20 Min', details: 'GDP + schnell', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit Pharma', value: '35 Min' },
            { label: 'Audit-Issues', value: '8/Jahr' },
            { label: 'Verfall', value: '€6.2k' }
          ],
          after: [
            { label: 'Wartezeit Pharma', value: '12 Min' },
            { label: 'Audit-Issues', value: '0/Jahr' },
            { label: 'Verfall', value: '€0' }
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
          { icon: '🚛', label: 'Gebuchte Slots heute', value: '18', trend: 'Alle bestätigt', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '12 Min', trend: '↘ -52% vs. ohne Buchung', class: 'success' },
          { icon: '📍', label: 'Stops/Tag (Ø)', value: '15', trend: '↗ +3 mehr möglich', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€9.2k', trend: '↗ Kraftstoff + Zeit', class: 'success' }
        ],
        slots: [
          { id: 'sped-4-1', time: '08:00', truck: 'Depot München', info: 'Slot gebucht', details: 'Rampe 2', status: 'busy', location: 'München' },
          { id: 'sped-4-2', time: '10:00', truck: 'Depot Stuttgart', info: 'Slot gebucht', details: 'Rampe 1', status: 'busy', location: 'Stuttgart' },
          { id: 'sped-4-3', time: '12:00', truck: 'Optimal-Slot', info: 'Spart 25 Min', details: 'Route optimiert', status: 'recommended', location: 'Nürnberg' },
          { id: 'sped-4-4', time: '14:00', truck: 'Verfügbar', info: 'Jetzt buchen', details: 'Rampe frei', status: 'free', location: 'Frankfurt' },
          { id: 'sped-4-5', time: '15:00', truck: 'Optimal für Route', info: 'Spart 18 Min', details: 'Empfohlen', status: 'recommended', location: 'Köln' },
          { id: 'sped-4-6', time: '17:00', truck: 'Express-Slot', info: 'Fast Lane', details: 'Premium', status: 'busy', location: 'Hamburg' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit/Stop', value: '25 Min' },
            { label: 'Stops/Tag', value: '12' },
            { label: 'Kraftstoff', value: '€1.84k' }
          ],
          after: [
            { label: 'Wartezeit/Stop', value: '12 Min' },
            { label: 'Stops/Tag', value: '15' },
            { label: 'Kraftstoff', value: '€1.54k' }
          ]
        }
      },
      ltl: {
        stats: [
          { icon: '📦', label: 'Teilladungen heute', value: '24', trend: 'Multi-Stop', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '15 Min', trend: '↘ -48%', class: 'success' },
          { icon: '🗺️', label: 'km gespart/Tag', value: '45', trend: 'Route optimiert', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€7.8k', trend: '↗ Effizienz', class: 'success' }
        ],
        slots: [
          { id: 'ltl-1', time: '07:00', truck: 'Multi-Stop Route A', info: '5 Stops', details: 'Optimal geplant', status: 'busy' },
          { id: 'ltl-2', time: '09:00', truck: 'Multi-Stop Route B', info: '4 Stops', details: 'Route optimiert', status: 'busy' },
          { id: 'ltl-3', time: '11:00', truck: 'Optimal LTL', info: 'Spart 22 Min', details: 'Multi-Stop', status: 'recommended' },
          { id: 'ltl-4', time: '13:00', truck: 'Verfügbar', info: 'Slot frei', details: 'Flexible Buchung', status: 'free' },
          { id: 'ltl-5', time: '15:00', truck: 'Nachmittags-Route', info: 'Optimal', details: 'Spart 15 Min', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit/Stop', value: '29 Min' },
            { label: 'km/Tag', value: '320' },
            { label: 'Stopps/Tour', value: '4' }
          ],
          after: [
            { label: 'Wartezeit/Stop', value: '15 Min' },
            { label: 'km/Tag', value: '275' },
            { label: 'Stopps/Tour', value: '5' }
          ]
        }
      },
      express: {
        stats: [
          { icon: '⚡', label: 'Express-Lieferungen', value: '42', trend: 'Priorität', class: 'info' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '8 Min', trend: '↘ -65%', class: 'success' },
          { icon: '🎯', label: 'Pünktlichkeit', value: '96%', trend: '↗ Garantiert', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€11.2k', trend: '↗ Premium', class: 'success' }
        ],
        slots: [
          { id: 'exp-1', time: '06:00', truck: 'Early Express', info: 'Priorität 1', details: 'Fast Lane', status: 'critical' },
          { id: 'exp-2', time: '08:00', truck: 'Morning Express', info: 'Priorität 2', details: 'Schnellabfertigung', status: 'busy' },
          { id: 'exp-3', time: '10:00', truck: 'Optimal Express', info: 'Spart 30 Min', details: 'Premium Slot', status: 'recommended' },
          { id: 'exp-4', time: '12:00', truck: 'Midday Express', info: 'Fast Lane', details: 'Rampe reserviert', status: 'busy' },
          { id: 'exp-5', time: '14:00', truck: 'Verfügbar', info: 'Express-Slot', details: 'Jetzt buchen', status: 'free' },
          { id: 'exp-6', time: '16:00', truck: 'Late Express', info: 'Spart 25 Min', details: 'Empfohlen', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit', value: '23 Min' },
            { label: 'Pünktlichkeit', value: '78%' },
            { label: 'Expresszuschlag', value: '€2.4k' }
          ],
          after: [
            { label: 'Wartezeit', value: '8 Min' },
            { label: 'Pünktlichkeit', value: '96%' },
            { label: 'Expresszuschlag', value: '€1.2k' }
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
          { icon: '🔴', label: 'Kritische Lieferungen', value: '3', trend: 'Alle pünktlich', class: 'warning' },
          { icon: '🧊', label: 'Kühlketten-Konformität', value: '100%', trend: 'GDP-compliant', class: 'success' },
          { icon: '⏱️', label: 'Ø Wartezeit Pharma', value: '8 Min', trend: '↘ -72% vs. Standard', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€8.2k', trend: '↗ Verfall verhindert', class: 'success' }
        ],
        slots: [
          { id: 'hos-1', time: '08:00', truck: 'Notfall-Blutkonserven', info: '🔴 KRITISCH', details: 'Rampe 1 (Kühl)', status: 'critical' },
          { id: 'hos-2', time: '09:00', truck: 'Routine Pharma', info: 'GDP-Dokumentiert', details: '2-8°C Kühlkette', status: 'busy' },
          { id: 'hos-3', time: '10:00', truck: 'Express optimal', info: 'Kühlrampe frei', details: 'Spart 27 Min', status: 'recommended' },
          { id: 'hos-4', time: '11:00', truck: 'Chemo Patient Müller', info: '🔴 KRITISCH', details: 'OP 13:00 Uhr!', status: 'critical' },
          { id: 'hos-5', time: '12:00', truck: 'Sterilgut', info: 'Hygiene-Zone', details: 'Rampe 3 (Clean)', status: 'busy' },
          { id: 'hos-6', time: '13:00', truck: 'Optimal Pharma', info: 'GDP-konform', details: 'Spart 18 Min', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit Pharma', value: '28 Min' },
            { label: 'GDP-Compliance', value: '87%' },
            { label: 'Verfall/Monat', value: '€4.2k' }
          ],
          after: [
            { label: 'Wartezeit Pharma', value: '8 Min' },
            { label: 'GDP-Compliance', value: '100%' },
            { label: 'Verfall/Monat', value: '€0' }
          ]
        }
      },
      pharmacy: {
        stats: [
          { icon: '💊', label: 'Pharma-Lieferungen', value: '34', trend: '100% GDP', class: 'info' },
          { icon: '🧊', label: 'Kühlware', value: '18', trend: 'Alle konform', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '10 Min', trend: '↘ -65%', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€6.8k', trend: '↗ Optimiert', class: 'success' }
        ],
        slots: [
          { id: 'phar-1', time: '08:00', truck: 'Apotheken-Express', info: 'Mehrere Stops', details: 'Route optimiert', status: 'busy' },
          { id: 'phar-2', time: '09:00', truck: 'Kühlware Pharma', info: '2-8°C', details: 'Rampe 1 (Kühl)', status: 'busy' },
          { id: 'phar-3', time: '10:00', truck: 'Optimal Express', info: 'Spart 22 Min', details: 'Multi-Stop Route', status: 'recommended' },
          { id: 'phar-4', time: '11:00', truck: 'Standard OTC', info: 'Over-the-Counter', details: 'Rampe 3', status: 'busy' },
          { id: 'phar-5', time: '12:00', truck: 'Verfügbar', info: 'Flexibel', details: 'Alle Rampen frei', status: 'free' },
          { id: 'phar-6', time: '13:00', truck: 'Nachmittags-Route', info: 'Optimal', details: 'Spart 15 Min', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit', value: '29 Min' },
            { label: 'Kühlketten-OK', value: '92%' },
            { label: 'Dokumentation', value: '1.5h/Tag' }
          ],
          after: [
            { label: 'Wartezeit', value: '10 Min' },
            { label: 'Kühlketten-OK', value: '100%' },
            { label: 'Dokumentation', value: 'Auto' }
          ]
        }
      },
      medical: {
        stats: [
          { icon: '🔬', label: 'Medizintechnik', value: '22', trend: 'Spezialtransport', class: 'info' },
          { icon: '📦', label: 'Sterilgut', value: '15', trend: 'Hygiene-konform', class: 'success' },
          { icon: '⏱️', label: 'dashboard:stats.avgWaitTime', value: '12 Min', trend: '↘ -58%', class: 'success' },
          { icon: '💰', label: 'dashboard:stats.monthlySavings', value: '€7.4k', trend: '↗ Optimiert', class: 'success' }
        ],
        slots: [
          { id: 'med-1', time: '08:00', truck: 'OP-Instrumente', info: 'Steril', details: 'Clean Room Rampe', status: 'busy' },
          { id: 'med-2', time: '09:00', truck: 'Dialyse-Zubehör', info: 'Zeitkritisch', details: 'Rampe 2', status: 'busy' },
          { id: 'med-3', time: '10:00', truck: 'Optimal Medizin', info: 'Spart 25 Min', details: 'Hygiene optimal', status: 'recommended' },
          { id: 'med-4', time: '11:00', truck: 'Imaging Equipment', info: 'Schwertransport', details: 'Spezialrampe', status: 'busy' },
          { id: 'med-5', time: '12:00', truck: 'Labor-Supplies', info: 'Standard', details: 'Rampe 4', status: 'busy' },
          { id: 'med-6', time: '13:00', truck: 'Express Medical', info: 'Optimal', details: 'Spart 16 Min', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit', value: '28 Min' },
            { label: 'Hygiene-Compliance', value: '88%' },
            { label: 'Spezial-Handling', value: 'Manuell' }
          ],
          after: [
            { label: 'Wartezeit', value: '12 Min' },
            { label: 'Hygiene-Compliance', value: '100%' },
            { label: 'Spezial-Handling', value: 'Auto' }
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
