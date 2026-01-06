import { CategoryCard } from "./CategoryCard"
import { AI2ConnectLogo } from "./AI2ConnectLogo"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"

interface LandingPageProps {
  onSelectCategory: (category: string) => void
}

export function LandingPage({ onSelectCategory }: LandingPageProps) {
  const { t } = useTranslation(["common", "dashboard"])

  const categories = useMemo(() => [
    {
      id: "logistics",
      icon: "🏢",
      title: t("common:categories.logistics"),
      description: t("dashboard:landingPage.logistics.desc"),
      features: [
        t("dashboard:landingPage.logistics.feature1"),
        t("dashboard:landingPage.logistics.feature2"),
        t("dashboard:landingPage.logistics.feature3"),
        t("dashboard:landingPage.logistics.feature4"),
      ],
      badges: [
        { text: "€20.4k/Monat", variant: "green" as const },
        { text: "30% Effizienz", variant: "default" as const }
      ],
    },
    {
      id: "carrier",
      icon: "🚛",
      title: t("common:categories.carrier"),
      description: t("dashboard:landingPage.carrier.desc"),
      features: [
        t("dashboard:landingPage.carrier.feature1"),
        t("dashboard:landingPage.carrier.feature2"),
        t("dashboard:landingPage.carrier.feature3"),
        t("dashboard:landingPage.carrier.feature4"),
      ],
      badges: [
        { text: "€9.2k/Monat", variant: "green" as const },
        { text: "-52% Wartezeit", variant: "default" as const },
        { text: "96% Pünktlichkeit", variant: "default" as const },
      ],
    },
    {
      id: "healthcare",
      icon: "🏥",
      title: t("common:categories.healthcare"),
      description: t("dashboard:landingPage.healthcare.desc"),
      features: [
        t("dashboard:landingPage.healthcare.feature1"),
        t("dashboard:landingPage.healthcare.feature2"),
        t("dashboard:landingPage.healthcare.feature3"),
        t("dashboard:landingPage.healthcare.feature4"),
      ],
      badges: [
        { text: "€8.2k/Monat", variant: "green" as const },
        { text: "100% GDP", variant: "default" as const },
        { text: "GHA Accelerator", variant: "default" as const },
      ],
    },
  ], [t])

  return (
    <div className="min-h-svh bg-background selection:bg-primary/10 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-success/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center px-4 py-20 md:py-32">
        {/* Brand/Hero section */}
        <div className="flex flex-col items-center gap-6 mb-16 text-center max-w-4xl mx-auto">
          <div className="rounded-2xl bg-card p-3 shadow-sm border border-border">
            <AI2ConnectLogo size="lg" showText={false} className="text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
              AI2RampOptimizer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              {t("dashboard:landingPage.heroSub")} <span className="text-primary">{t("dashboard:landingPage.heroHighlight")}</span>
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10 w-full">
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

        {/* Footer/Trust markers */}
        <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            {t("dashboard:landingPage.trustMark")}
          </p>
        </div>
      </div>
    </div>
  )
}
