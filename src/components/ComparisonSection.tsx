import { cn } from "@/lib/utils";
import type { Comparison } from "@/data/categoryData";

interface ComparisonSectionProps {
  comparison: Comparison;
}

export function ComparisonSection({ comparison }: ComparisonSectionProps) {
  return (
    <div className="bg-muted p-6 md:p-8 rounded-2xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-3">
          📊 Vorher vs. Nachher
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before */}
        <div className={cn(
          "p-8 rounded-xl text-center",
          "bg-red-50 border-3 border-red-300"
        )}>
          <div className="text-2xl font-bold mb-6 text-foreground">
            ❌ Ohne AI2RampOptimizer
          </div>
          {comparison.before.map((metric, index) => (
            <div key={index} className="my-5">
              <div className="text-muted-foreground mb-2">{metric.label}</div>
              <div className="text-4xl md:text-5xl font-bold text-destructive">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
        
        {/* After */}
        <div className={cn(
          "p-8 rounded-xl text-center",
          "bg-green-50 border-3 border-success"
        )}>
          <div className="text-2xl font-bold mb-6 text-foreground">
            ✅ Mit AI2RampOptimizer
          </div>
          {comparison.after.map((metric, index) => (
            <div key={index} className="my-5">
              <div className="text-muted-foreground mb-2">{metric.label}</div>
              <div className="text-4xl md:text-5xl font-bold text-success">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
