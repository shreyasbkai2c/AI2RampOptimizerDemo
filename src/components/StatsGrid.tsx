import { cn } from "@/lib/utils";
import type { Stat } from "@/data/categoryData";

interface StatCardProps {
  stat: Stat;
  onClick: () => void;
}

export function StatCard({ stat, onClick }: StatCardProps) {
  const borderColors = {
    info: "border-l-info",
    success: "border-l-success",
    warning: "border-l-destructive"
  };

  return (
    <div 
      className={cn(
        "bg-card p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md",
        "border-l-4 transition-all duration-300",
        "cursor-pointer hover:-translate-y-1",
        borderColors[stat.class]
      )}
      onClick={onClick}
    >
      <div className="text-4xl mb-3">{stat.icon}</div>
      <div className="text-sm text-muted-foreground font-medium mb-2">{stat.label}</div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
      <div className="text-sm font-semibold text-success">{stat.trend}</div>
    </div>
  );
}

interface StatsGridProps {
  stats: Stat[];
  onStatClick: (label: string) => void;
}

export function StatsGrid({ stats, onStatClick }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          stat={stat} 
          onClick={() => onStatClick(stat.label)}
        />
      ))}
    </div>
  );
}
