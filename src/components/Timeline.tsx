import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/data/categoryData";

interface TimeSlotCardProps {
  slot: TimeSlot;
  onClick: () => void;
}

export function TimeSlotCard({ slot, onClick }: TimeSlotCardProps) {
  const statusStyles = {
    free: "bg-muted border-2 border-border hover:border-primary",
    busy: "gradient-busy text-white border-transparent",
    recommended: "bg-success/5 border-3 border-success",
    critical: "gradient-critical text-white border-transparent animate-pulse-ring"
  };

  const isLight = slot.status === "free" || slot.status === "recommended";

  return (
    <div 
      className={cn(
        "relative rounded-xl p-5 min-h-[140px] cursor-pointer",
        "transition-all duration-300 hover:-translate-y-0.5",
        statusStyles[slot.status]
      )}
      onClick={onClick}
    >
      {/* Status Badge */}
      {slot.status === "recommended" && (
        <div className="absolute -top-3 right-3 bg-success text-white px-3 py-1 rounded-full text-xs font-bold">
          ⭐ AI-Empfohlen
        </div>
      )}
      {slot.status === "critical" && (
        <div className="absolute -top-3 right-3 bg-destructive text-white px-3 py-1 rounded-full text-xs font-bold">
          🔴 KRITISCH
        </div>
      )}

      <div className={cn(
        "text-lg font-bold mb-2",
        isLight ? "text-foreground" : "text-white"
      )}>
        {slot.time}
      </div>
      
      {slot.location && (
        <div className={cn(
          "text-sm mb-1",
          isLight ? "text-muted-foreground" : "text-white/90"
        )}>
          📍 {slot.location}
        </div>
      )}
      
      <div className={cn(
        "text-sm mb-1",
        isLight ? "text-foreground" : "text-white"
      )}>
        {slot.truck}
      </div>
      
      <div className={cn(
        "text-xs opacity-90 mb-1",
        isLight ? "text-muted-foreground" : "text-white/90"
      )}>
        {slot.info}
      </div>
      
      <div className={cn(
        "text-xs mt-2",
        isLight ? "text-foreground/70" : "text-white/80"
      )}>
        {slot.details}
      </div>

      {/* Badge */}
      {slot.status === "recommended" && (
        <div className="mt-3">
          <span className="bg-success text-white px-3 py-1 rounded-md text-xs font-semibold">
            Empfohlen
          </span>
        </div>
      )}
    </div>
  );
}

interface TimelineProps {
  slots: TimeSlot[];
  title: string;
  onSlotClick: (slot: TimeSlot) => void;
}

export function Timeline({ slots, title, onSlotClick }: TimelineProps) {
  return (
    <div className="bg-muted p-6 md:p-8 rounded-2xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-3">
          📅 {title}
        </h2>
      </div>
      
      <div className="bg-card p-6 rounded-xl overflow-x-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-w-[600px]">
          {slots.map((slot, index) => (
            <TimeSlotCard 
              key={index} 
              slot={slot} 
              onClick={() => onSlotClick(slot)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
