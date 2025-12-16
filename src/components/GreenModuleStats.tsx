interface GreenModuleStatsProps {
  stats: { icon: string; value: string; label: string }[];
}

export function GreenModuleStats({ stats }: GreenModuleStatsProps) {
  return (
    <div className="bg-muted p-6 md:p-8 rounded-2xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-3">
          🌱 Nachhaltigkeits-Impact
        </h2>
      </div>
      
      <div className="gradient-success p-6 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-success mb-1">{stat.value}</div>
              <div className="text-sm text-success/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
