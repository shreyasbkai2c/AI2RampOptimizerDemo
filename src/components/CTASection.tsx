import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

interface CTASectionProps {
  onCTAClick: () => void
}

export function CTASection({ onCTAClick }: CTASectionProps) {
  const { t } = useTranslation(["dashboard"])

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center bg-card">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("dashboard:ctaSection.title")}
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
          {t("dashboard:ctaSection.subtitle")}
        </p>
      </div>
      <Button
        size="lg"
        onClick={onCTAClick}
        className="rounded-2xl px-12 py-7 text-lg font-bold shadow-xl transition-all hover:shadow-2xl hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary/20 group"
      >
        <span className="flex items-center gap-3">
          {t("dashboard:ctaSection.button")}
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </span>
      </Button>
    </div>
  )
}
