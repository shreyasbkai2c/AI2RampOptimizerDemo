export interface Stat {
  icon: string;
  label: string;
  value: string;
  trend: string;
  class: 'info' | 'success' | 'warning';
}

export interface TimeSlot {
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
  name: string;
  icon: string;
  industries: Record<string, string>;
  data: Record<string, IndustryData>;
  benefits: Benefit[] | Record<string, Benefit[]>;
}

export const categoryData: Record<string, CategoryInfo> = {
  logistics: {
    name: 'Logistiker',
    icon: '🏢',
    industries: {
      general: 'Logistik Allgemein',
      food: 'Lebensmittel',
      fashion: 'Fashion & Retail',
      pharma: 'Pharma & Life Sciences'
    },
    data: {
      general: {
        stats: [
          { icon: '📦', label: 'Lieferungen heute', value: '52', trend: '↗ +8 mehr als geplant', class: 'info' },
          { icon: '⚡', label: 'Rampenauslastung', value: '89%', trend: '↗ +32% mit KI', class: 'success' },
          { icon: '⏱️', label: 'Ø Wartezeit', value: '16 Min', trend: '↘ -45% Reduktion', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€20.4k', trend: '↗ Messbar garantiert', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'LKW #1247', info: 'Standard-Lieferung', details: '15 Paletten', status: 'busy' },
          { time: '09:00', truck: 'LKW #2891', info: 'Express-Lieferung', details: '22 Paletten', status: 'busy' },
          { time: '10:00', truck: 'Optimal für Mix', info: 'Spart 27 Min', details: 'Rampe 2 optimal', status: 'recommended' },
          { time: '11:00', truck: 'Verfügbar', info: 'Alle Rampen frei', details: 'Flexibel planbar', status: 'free' },
          { time: '12:00', truck: 'LKW #4782', info: 'Container-Entladung', details: '30 Paletten', status: 'busy' },
          { time: '13:00', truck: 'AI-Empfehlung', info: 'Spart 18 Min', details: 'Peak vermeiden', status: 'recommended' }
        ],
        comparison: {
          before: [
            { label: 'Wartezeit', value: '29 Min' },
            { label: 'Auslastung', value: '67%' },
            { label: 'Kosten', value: '€29.2k' }
          ],
          after: [
            { label: 'Wartezeit', value: '16 Min' },
            { label: 'Auslastung', value: '89%' },
            { label: 'Kosten', value: '€8.8k' }
          ]
        }
      },
      food: {
        stats: [
          { icon: '🧊', label: 'Kühl-/TK-Lieferungen', value: '28', trend: 'Alle konform', class: 'info' },
          { icon: '⏱️', label: 'FIFO-Konformität', value: '98%', trend: '↗ +12% vs. manuell', class: 'success' },
          { icon: '🌡️', label: 'Temperatur-Breaks', value: '0', trend: 'HACCP-konform', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€12.8k', trend: '↗ Verderb verhindert', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'Frischware Express', info: 'FIFO Priorität', details: 'Rampe 1 (Kühl)', status: 'critical' },
          { time: '09:00', truck: 'Tiefkühl-Lieferung', info: '-18°C TK', details: 'Rampe 2 (TK)', status: 'busy' },
          { time: '10:00', truck: 'Optimal Kühlware', info: 'Spart 22 Min', details: 'Kühlkette optimal', status: 'recommended' },
          { time: '11:00', truck: 'Trockenwaren', info: 'Standard', details: 'Rampe 4', status: 'busy' },
          { time: '12:00', truck: 'Hygiene-Zeitfenster', info: 'Nach Reinigung', details: 'Rampe 1 gereinigt', status: 'free' },
          { time: '13:00', truck: 'Fresh & Fast', info: 'Expressware', details: 'Spart 15 Min', status: 'recommended' }
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
          { icon: '💰', label: 'Einsparung/Monat', value: '€15.2k', trend: '↗ Peak-Optimierung', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'Hängend Fashion', info: 'Pre-Season', details: 'Rampe 1 (Hängend)', status: 'busy' },
          { time: '09:00', truck: 'Accessories Mix', info: 'Multi-Brand', details: '45 Kartons', status: 'busy' },
          { time: '10:00', truck: 'Peak-Optimierung', info: 'Spart 28 Min', details: 'Vermeidet Stoßzeit', status: 'recommended' },
          { time: '11:00', truck: 'Returns-Welle', info: 'Retouren-Handling', details: 'Rampe 3', status: 'busy' },
          { time: '12:00', truck: 'Express New Collection', info: 'Zeitkritisch', details: 'Launch morgen!', status: 'critical' },
          { time: '13:00', truck: 'Optimal Fashion', info: 'Nach Peak', details: 'Spart 19 Min', status: 'recommended' }
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
          { icon: '💰', label: 'Einsparung/Monat', value: '€18.4k', trend: '↗ Compliance + Effizienz', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'Vakzine Express', info: '2-8°C GDP', details: 'Rampe 1 (Validiert)', status: 'critical' },
          { time: '09:00', truck: 'Routine Pharma', info: 'GDP-Dokumentiert', details: 'Rampe 2', status: 'busy' },
          { time: '10:00', truck: 'Optimal GDP-Slot', info: 'Spart 25 Min', details: 'Audit-optimiert', status: 'recommended' },
          { time: '11:00', truck: 'Klinische Studie', info: 'Spezialdokumentation', details: 'Rampe 3', status: 'busy' },
          { time: '12:00', truck: 'Narkotika-Lieferung', info: 'BtM dokumentiert', details: 'Rampe 1 (Sicher)', status: 'busy' },
          { time: '13:00', truck: 'Express Pharma', info: 'Spart 20 Min', details: 'GDP + schnell', status: 'recommended' }
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
      { icon: '🎯', title: 'Automatische Optimierung', desc: 'Die KI optimiert automatisch alle Zeitfenster basierend auf Ihren Präferenzen und Constraints.' },
      { icon: '📊', title: 'Live-Transparenz', desc: 'Sehen Sie in Echtzeit, welche Rampen belegt sind, wann Platz ist und wo Optimierungspotenzial liegt.' },
      { icon: '💰', title: 'Messbare Einsparungen', desc: 'Durchschnittlich €20.400/Monat – wir zeigen Ihnen VOR dem Start, was Sie sparen werden.' },
      { icon: '🔌', title: 'Einfache Integration', desc: 'Verbindet sich mit Ihrem WMS, TMS und ERP. Keine Prozessänderungen notwendig.' }
    ]
  },
  carrier: {
    name: 'Speditionen',
    icon: '🚛',
    industries: {
      ftl: 'Komplettladung (FTL)',
      ltl: 'Teilladung (LTL)',
      express: 'Express & KEP'
    },
    data: {
      ftl: {
        stats: [
          { icon: '🚛', label: 'Gebuchte Slots heute', value: '18', trend: 'Alle bestätigt', class: 'info' },
          { icon: '⏱️', label: 'Ø Wartezeit', value: '12 Min', trend: '↘ -52% vs. ohne Buchung', class: 'success' },
          { icon: '📍', label: 'Stops/Tag (Ø)', value: '15', trend: '↗ +3 mehr möglich', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€9.2k', trend: '↗ Kraftstoff + Zeit', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'Depot München', info: 'Slot gebucht', details: 'Rampe 2', status: 'busy', location: 'München' },
          { time: '10:00', truck: 'Depot Stuttgart', info: 'Slot gebucht', details: 'Rampe 1', status: 'busy', location: 'Stuttgart' },
          { time: '12:00', truck: 'Optimal-Slot', info: 'Spart 25 Min', details: 'Route optimiert', status: 'recommended', location: 'Nürnberg' },
          { time: '14:00', truck: 'Verfügbar', info: 'Jetzt buchen', details: 'Rampe frei', status: 'free', location: 'Frankfurt' },
          { time: '15:00', truck: 'Optimal für Route', info: 'Spart 18 Min', details: 'Empfohlen', status: 'recommended', location: 'Köln' },
          { time: '17:00', truck: 'Express-Slot', info: 'Fast Lane', details: 'Premium', status: 'busy', location: 'Hamburg' }
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
          { icon: '⏱️', label: 'Ø Wartezeit', value: '15 Min', trend: '↘ -48%', class: 'success' },
          { icon: '🗺️', label: 'km gespart/Tag', value: '45', trend: 'Route optimiert', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€7.8k', trend: '↗ Effizienz', class: 'success' }
        ],
        slots: [
          { time: '07:00', truck: 'Multi-Stop Route A', info: '5 Stops', details: 'Optimal geplant', status: 'busy' },
          { time: '09:00', truck: 'Multi-Stop Route B', info: '4 Stops', details: 'Route optimiert', status: 'busy' },
          { time: '11:00', truck: 'Optimal LTL', info: 'Spart 22 Min', details: 'Multi-Stop', status: 'recommended' },
          { time: '13:00', truck: 'Verfügbar', info: 'Slot frei', details: 'Flexible Buchung', status: 'free' },
          { time: '15:00', truck: 'Nachmittags-Route', info: 'Spart 15 Min', details: 'Empfohlen', status: 'recommended' }
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
          { icon: '⏱️', label: 'Ø Wartezeit', value: '8 Min', trend: '↘ -65%', class: 'success' },
          { icon: '🎯', label: 'Pünktlichkeit', value: '96%', trend: '↗ Garantiert', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€11.2k', trend: '↗ Premium', class: 'success' }
        ],
        slots: [
          { time: '06:00', truck: 'Early Express', info: 'Priorität 1', details: 'Fast Lane', status: 'critical' },
          { time: '08:00', truck: 'Morning Express', info: 'Priorität 2', details: 'Schnellabfertigung', status: 'busy' },
          { time: '10:00', truck: 'Optimal Express', info: 'Spart 30 Min', details: 'Premium Slot', status: 'recommended' },
          { time: '12:00', truck: 'Midday Express', info: 'Fast Lane', details: 'Rampe reserviert', status: 'busy' },
          { time: '14:00', truck: 'Verfügbar', info: 'Express-Slot', details: 'Jetzt buchen', status: 'free' },
          { time: '16:00', truck: 'Late Express', info: 'Spart 25 Min', details: 'Empfohlen', status: 'recommended' }
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
      { icon: '📅', title: 'Garantierte Zeitfenster', desc: 'Buchen Sie Slots im Voraus – keine Wartezeiten mehr an der Rampe, planbare Routen.' },
      { icon: '🗺️', title: 'Bessere Tourenplanung', desc: 'Das System zeigt, welche Zeitfenster optimal zu Ihrer Route passen – spart Kilometer.' },
      { icon: '⏱️', title: 'Mehr Lieferungen/Tag', desc: 'Weniger Wartezeit = mehr Stops = mehr Umsatz. Durchschnittlich 3 zusätzliche Stops/Tag.' },
      { icon: '📱', title: 'Mobile App für Fahrer', desc: 'Alle gebuchten Zeitfenster, Routen und Änderungen in Echtzeit auf dem Smartphone.' }
    ]
  },
  healthcare: {
    name: 'Gesundheitswesen',
    icon: '🏥',
    industries: {
      hospital: 'Krankenhaus',
      pharmacy: 'Apotheken-Logistik',
      medical: 'Medizintechnik'
    },
    data: {
      hospital: {
        stats: [
          { icon: '🔴', label: 'Kritische Lieferungen', value: '3', trend: 'Alle pünktlich', class: 'warning' },
          { icon: '🧊', label: 'Kühlketten-Konformität', value: '100%', trend: 'GDP-compliant', class: 'success' },
          { icon: '⏱️', label: 'Ø Wartezeit Pharma', value: '8 Min', trend: '↘ -72% vs. Standard', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€8.2k', trend: '↗ Verfall verhindert', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'Notfall-Blutkonserven', info: '🔴 KRITISCH', details: 'Rampe 1 (Kühl)', status: 'critical' },
          { time: '09:00', truck: 'Routine Pharma', info: 'GDP-Dokumentiert', details: '2-8°C Kühlkette', status: 'busy' },
          { time: '10:00', truck: 'Express optimal', info: 'Kühlrampe frei', details: 'Spart 27 Min', status: 'recommended' },
          { time: '11:00', truck: 'Chemo Patient Müller', info: '🔴 KRITISCH', details: 'OP 13:00 Uhr!', status: 'critical' },
          { time: '12:00', truck: 'Sterilgut', info: 'Hygiene-Zone', details: 'Rampe 3 (Clean)', status: 'busy' },
          { time: '13:00', truck: 'Optimal Pharma', info: 'GDP-konform', details: 'Spart 18 Min', status: 'recommended' }
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
          { icon: '⏱️', label: 'Ø Wartezeit', value: '10 Min', trend: '↘ -65%', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€6.8k', trend: '↗ Optimiert', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'Apotheken-Express', info: 'Mehrere Stops', details: 'Route optimiert', status: 'busy' },
          { time: '09:00', truck: 'Kühlware Pharma', info: '2-8°C', details: 'Rampe 1 (Kühl)', status: 'busy' },
          { time: '10:00', truck: 'Optimal Express', info: 'Spart 22 Min', details: 'Multi-Stop Route', status: 'recommended' },
          { time: '11:00', truck: 'Standard OTC', info: 'Over-the-Counter', details: 'Rampe 3', status: 'busy' },
          { time: '12:00', truck: 'Verfügbar', info: 'Flexibel', details: 'Alle Rampen frei', status: 'free' },
          { time: '13:00', truck: 'Nachmittags-Route', info: 'Optimal', details: 'Spart 15 Min', status: 'recommended' }
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
          { icon: '⏱️', label: 'Ø Wartezeit', value: '12 Min', trend: '↘ -58%', class: 'success' },
          { icon: '💰', label: 'Einsparung/Monat', value: '€7.4k', trend: '↗ Optimiert', class: 'success' }
        ],
        slots: [
          { time: '08:00', truck: 'OP-Instrumente', info: 'Steril', details: 'Clean Room Rampe', status: 'busy' },
          { time: '09:00', truck: 'Dialyse-Zubehör', info: 'Zeitkritisch', details: 'Rampe 2', status: 'busy' },
          { time: '10:00', truck: 'Optimal Medizin', info: 'Spart 25 Min', details: 'Hygiene optimal', status: 'recommended' },
          { time: '11:00', truck: 'Imaging Equipment', info: 'Schwertransport', details: 'Spezialrampe', status: 'busy' },
          { time: '12:00', truck: 'Labor-Supplies', info: 'Standard', details: 'Rampe 4', status: 'busy' },
          { time: '13:00', truck: 'Express Medical', info: 'Optimal', details: 'Spart 16 Min', status: 'recommended' }
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
        { icon: '🎯', title: 'Prioritäts-Management', desc: 'Kritische Lieferungen wie Notfall-Medikamente und Blutkonserven werden automatisch priorisiert.' },
        { icon: '🧊', title: 'Kühlketten-Überwachung', desc: 'Automatische Zuordnung zu temperaturgeführten Rampen mit lückenloser Dokumentation.' },
        { icon: '📋', title: 'GDP-Compliance', desc: 'Automatische Dokumentation für Pharma-Audits – Temperaturlogs, Zeitstempel, Abweichungen.' },
        { icon: '💰', title: 'Verfall-Prävention', desc: 'Verhindert verdorbene Ware durch optimale Kühlketten-Planung – spart €4.200/Monat.' }
      ],
      pharmacy: [
        { icon: '💊', title: 'Apotheken-Routing', desc: 'Optimierte Multi-Stop-Routen für Apotheken-Belieferung – minimiert Gesamtfahrzeit.' },
        { icon: '🧊', title: 'Kühlware-Priorisierung', desc: 'Temperaturgeführte Ware wird automatisch bevorzugt behandelt.' },
        { icon: '📋', title: 'GDP-Dokumentation', desc: 'Lückenlose Nachverfolgung aller Pharma-Lieferungen für Audits.' },
        { icon: '💰', title: 'Route-Optimierung', desc: 'Spart durchschnittlich 35 km pro Tag durch bessere Planung.' }
      ],
      medical: [
        { icon: '🔬', title: 'Sterilgut-Handling', desc: 'Dedizierte Clean Room Rampen für sterile Medizinprodukte.' },
        { icon: '📦', title: 'Spezialtransport', desc: 'Automatische Zuordnung für Schwertransporte und empfindliche Geräte.' },
        { icon: '🧹', title: 'Hygiene-Compliance', desc: 'Automatische Reinigungs-Slots und Hygiene-Dokumentation.' },
        { icon: '💰', title: 'Equipment-Schutz', desc: 'Minimiert Wartezeiten für teure Medizintechnik – spart €7.4k/Monat.' }
      ]
    }
  }
};

export const greenData = {
  stats: [
    { icon: '🌍', value: '2.8t', label: 'CO₂ eingespart/Monat' },
    { icon: '🌳', value: '140', label: 'Bäume gepflanzt (Äquiv.)' },
    { icon: '⚡', value: '-81%', label: 'Leerlauf-Emissionen' },
    { icon: '♻️', value: '15%', label: 'Weniger Leerfahrten' }
  ],
  benefits: [
    { icon: '📊', title: 'CO₂-Tracking & Reporting', desc: 'Automatische Berechnung des CO₂-Fußabdrucks pro Lieferung mit CSRD-konformen Reports.' },
    { icon: '⏱️', title: 'Idle Time Reduction', desc: 'Minimiert Leerlauf-Emissionen um 81% durch optimale Zeitfenster-Planung.' },
    { icon: '🗺️', title: 'Route Optimization', desc: 'Intelligente Routenvorschläge sparen durchschnittlich 17km und 4kg CO₂ pro Lieferung.' },
    { icon: '💰', title: 'CO₂-Preis-Einsparung', desc: 'Bei €100/Tonne CO₂ = €280/Monat gespart. Tendenz steigend.' }
  ]
};
