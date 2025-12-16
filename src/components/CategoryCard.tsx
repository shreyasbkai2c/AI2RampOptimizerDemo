import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  badges: { text: string; variant?: "default" | "green" }[];
  onClick: () => void;
}

export function CategoryCard({ 
  icon, 
  title, 
  description, 
  features, 
  badges, 
  onClick 
}: CategoryCardProps) {
  return (
    <div 
      className={cn(
        "group relative bg-card rounded-2xl p-10 md:p-12 cursor-pointer",
        "shadow-md hover:shadow-lg transition-all duration-300",
        "hover:-translate-y-2 overflow-hidden"
      )}
      onClick={onClick}
    >
      {/* Top gradient bar */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1.5",
        "bg-gradient-to-r from-primary to-secondary",
        "transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
      )} />
      
      <div className="text-7xl mb-6">{icon}</div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{title}</h2>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      
      <div className="space-y-3 mb-6 text-left">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-sm text-foreground/80">
            <span className="text-success">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <span 
            key={index}
            className={cn(
              "inline-block px-4 py-2 rounded-full text-xs font-semibold",
              badge.variant === "green" 
                ? "bg-success/10 text-success" 
                : "bg-muted text-primary"
            )}
          >
            {badge.text}
          </span>
        ))}
      </div>
    </div>
  );
}
