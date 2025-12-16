import { CategoryCard } from "./CategoryCard";
import { AI2ConnectLogo } from "./AI2ConnectLogo";

interface LandingPageProps {
  onSelectCategory: (category: string) => void;
}

const categories = [
  {
    id: "logistics",
    icon: "🏢",
    title: "Für Logistiker",
    description: "Optimieren Sie Ihre Rampenplanung – egal ob Lebensmittel, Fashion, Pharma oder Standard-Logistik",
    features: [
      "Automatische Zeitfenster-Optimierung",
      "Branchenspezifische Anforderungen",
      "Kühlketten & Compliance",
      "Peak-Management"
    ],
    badges: [
      { text: "€20.4k/Monat", variant: "green" as const },
      { text: "30% Effizienz", variant: "default" as const },
      { text: "IFOY Award", variant: "default" as const }
    ]
  },
  {
    id: "carrier",
    icon: "🚛",
    title: "Für Speditionen",
    description: "Buchen Sie Zeitfenster im Voraus, optimieren Sie Ihre Touren und minimieren Sie Wartezeiten",
    features: [
      "Zeitfenster-Buchungssystem",
      "Touren-Optimierung",
      "Multi-Location Support",
      "Mobile App für Fahrer"
    ],
    badges: [
      { text: "€9.2k/Monat", variant: "green" as const },
      { text: "-52% Wartezeit", variant: "default" as const },
      { text: "96% Pünktlichkeit", variant: "default" as const }
    ]
  },
  {
    id: "healthcare",
    icon: "🏥",
    title: "Für Gesundheitswesen",
    description: "Kritische Lieferungen priorisieren, Kühlketten überwachen, GDP-Compliance sicherstellen",
    features: [
      "Kritische Prioritäten (Notfall)",
      "Kühlketten-Management",
      "GDP/HACCP-Compliance",
      "Audit-Ready Dokumentation"
    ],
    badges: [
      { text: "€8.2k/Monat", variant: "green" as const },
      { text: "100% GDP", variant: "default" as const },
      { text: "GHA Accelerator", variant: "default" as const }
    ]
  }
];

export function LandingPage({ onSelectCategory }: LandingPageProps) {
  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center px-4 py-10 md:py-20">
      <div className="max-w-7xl w-full text-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-5 mb-6">
          <AI2ConnectLogo size="lg" showText={false} className="text-white" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-shadow">
            AI2RampOptimizer
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/95 mb-12 md:mb-16 max-w-3xl mx-auto">
          Intelligente Rampenplanung mit KI – messbar, nachhaltig, effizient
        </p>
        
        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              description={category.description}
              features={category.features}
              badges={category.badges}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
