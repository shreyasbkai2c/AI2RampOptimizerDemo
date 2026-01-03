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
        className="rounded-xl px-8 font-semibold shadow-md transition-all hover:shadow-lg"
      >
        {t("dashboard:ctaSection.button")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
