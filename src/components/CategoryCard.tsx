import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface CategoryCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  badges: { text: string; variant?: "default" | "green" }[]
  onClick: () => void
}

export function CategoryCard({
  icon,
  title,
  description,
  features,
  badges,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      className={cn(
        "group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-2xl border-2 hover:border-primary/20",
        "bg-card"
      )}
      onClick={onClick}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <CardHeader className="p-8 md:p-10 pb-4">
        <div className="text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110 origin-left" role="img" aria-label={title}>
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8 md:p-10 pt-0 space-y-6">
        <p className="text-muted-foreground leading-relaxed text-base">
          {description}
        </p>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
              <Check className="h-4 w-4 text-success shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-8 md:p-10 pt-0 flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            variant={badge.variant === "green" ? "secondary" : "outline"}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              badge.variant === "green" && "bg-success/10 text-success border-success/20 hover:bg-success/20"
            )}
          >
            {badge.text}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
