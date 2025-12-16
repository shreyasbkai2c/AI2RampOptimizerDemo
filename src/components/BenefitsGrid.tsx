import { cn } from "@/lib/utils";
import type { Benefit } from "@/data/categoryData";

interface BenefitCardProps {
  benefit: Benefit;
}

function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className={cn(
      "bg-card p-6 rounded-xl border-l-4 border-l-primary",
      "transition-all duration-300 hover:translate-x-1 hover:shadow-md"
    )}>
      <div className="text-3xl mb-3">{benefit.icon}</div>
      <div className="text-lg font-semibold text-foreground mb-2">{benefit.title}</div>
      <div className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</div>
    </div>
  );
}

interface BenefitsGridProps {
  benefits: Benefit[];
  greenBenefits?: Benefit[];
}

export function BenefitsGrid({ benefits, greenBenefits }: BenefitsGridProps) {
  const allBenefits = greenBenefits ? [...benefits, ...greenBenefits] : benefits;

  return (
    <div className="bg-muted p-6 md:p-8 rounded-2xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-3">
          ✨ Ihre Vorteile
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {allBenefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  );
}
