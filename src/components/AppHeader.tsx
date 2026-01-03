import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import logoImage from "@/data/AI2RampOptimizerLogo.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LanguageToggle } from "@/components/common/LanguageToggle"

interface AppHeaderProps {
  categoryName: string
  categoryIcon: string
  industries: Record<string, string>
  currentIndustry: string
  onIndustryChange: (industry: string) => void
  greenModuleEnabled: boolean
  onToggleGreenModule: () => void
  onBack: () => void
}

export function AppHeader({
  categoryName,
  categoryIcon,
  industries,
  currentIndustry,
  onIndustryChange,
  greenModuleEnabled,
  onToggleGreenModule,
  onBack,
}: AppHeaderProps) {
  const { t } = useTranslation(["common"])

  const displayCategoryName = categoryName.includes(":") ? t(categoryName as any) : categoryName

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="AI2RampOptimizer Logo" className="h-9 w-auto" />
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight text-foreground md:text-lg">
              AI2RampOptimizer
            </div>
            <div className="text-xs text-muted-foreground">
              {t("dashboard")} • {displayCategoryName}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">
            {categoryIcon} {displayCategoryName}
          </Badge>

          <Separator orientation="vertical" className="hidden h-8 md:block" />

          {/* Industry Select */}
          {useMemo(() => (
            <Select
              key={`industry-select-${categoryName}`}
              value={currentIndustry}
              onValueChange={onIndustryChange}
            >
              <SelectTrigger className="w-[220px] rounded-xl">
                <SelectValue placeholder={t("selectIndustry")} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(industries).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label.includes(":") ? t(label as any) : label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ), [categoryName, currentIndustry, industries, onIndustryChange, t])}

          {/* Green module toggle */}
          <Button
            variant={greenModuleEnabled ? "secondary" : "outline"}
            className="rounded-xl"
            onClick={onToggleGreenModule}
          >
            🌱 {t("greenModule")}
          </Button>

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Back */}
          <Button variant="outline" className="rounded-xl" onClick={onBack}>
            {t("back")}
          </Button>
        </div>
      </div>
    </header>
  )
}
