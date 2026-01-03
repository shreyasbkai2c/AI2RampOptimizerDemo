import { cn } from "@/lib/utils"
import logoImage from "@/data/AI2RampOptimizerLogo.png"

interface AI2ConnectLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function AI2ConnectLogo({ className, size = "md", showText = true }: AI2ConnectLogoProps) {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-[120px]",
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={logoImage}
        alt="AI2Connect Logo"
        className={cn(sizes[size], "w-auto")}
      />

      {showText && (
        <span className={cn(
          "font-bold tracking-tight text-foreground",
          size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-lg"
        )}>
          AI2Connect
        </span>
      )}
    </div>
  )
}

export function AI2RampOptimizerLogo({ className, size = "md" }: Omit<AI2ConnectLogoProps, "showText">) {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={logoImage}
        alt="AI2RampOptimizer Logo"
        className={cn(sizes[size], "w-auto")}
      />
    </div>
  )
}
