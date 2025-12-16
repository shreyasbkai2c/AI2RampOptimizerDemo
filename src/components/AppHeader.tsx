import { cn } from "@/lib/utils";
import { AI2RampOptimizerLogo } from "./AI2ConnectLogo";

interface AppHeaderProps {
  categoryName: string;
  categoryIcon: string;
  industries: Record<string, string>;
  currentIndustry: string;
  onIndustryChange: (industry: string) => void;
  greenModuleEnabled: boolean;
  onToggleGreenModule: () => void;
  onBack: () => void;
}

export function AppHeader({
  categoryName,
  categoryIcon,
  industries,
  currentIndustry,
  onIndustryChange,
  greenModuleEnabled,
  onToggleGreenModule,
  onBack
}: AppHeaderProps) {
  return (
    <header className="gradient-header text-white px-4 md:px-10 py-5 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-3">
        <AI2RampOptimizerLogo size="md" />
        <span className="text-lg md:text-xl font-bold">AI2RampOptimizer</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Badge */}
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
          {categoryIcon} {categoryName}
        </span>
        
        {/* Industry Selector */}
        <select 
          className={cn(
            "bg-white/15 border-2 border-white/30 text-white",
            "px-4 py-2 rounded-lg text-sm font-semibold",
            "cursor-pointer appearance-none pr-10",
            "focus:outline-none focus:border-white"
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center"
          }}
          value={currentIndustry}
          onChange={(e) => onIndustryChange(e.target.value)}
        >
          {Object.entries(industries).map(([key, label]) => (
            <option key={key} value={key} className="text-foreground">
              {label}
            </option>
          ))}
        </select>
        
        {/* Green Module Toggle */}
        <button
          onClick={onToggleGreenModule}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-semibold",
            "border-2 transition-all duration-300",
            greenModuleEnabled 
              ? "bg-white/30 border-white" 
              : "bg-white/10 border-white/30 hover:bg-white/20"
          )}
        >
          🌱 Green Module
        </button>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className={cn(
            "px-5 py-2 rounded-lg font-semibold",
            "bg-white/20 border-2 border-white",
            "hover:bg-white hover:text-secondary transition-all duration-300"
          )}
        >
          ← Zurück
        </button>
      </div>
    </header>
  );
}
