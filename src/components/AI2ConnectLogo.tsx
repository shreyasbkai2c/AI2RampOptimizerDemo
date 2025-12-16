import { cn } from "@/lib/utils";

interface AI2ConnectLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function AI2ConnectLogo({ className, size = "md", showText = true }: AI2ConnectLogoProps) {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-[120px]"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        viewBox="0 0 100 100" 
        className={cn(sizes[size], "w-auto")}
        fill="none"
      >
        {/* Stylized hands/connection icon in cyan */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BCD4" />
            <stop offset="100%" stopColor="#0097A7" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#00BCD4" />
          </linearGradient>
        </defs>
        
        {/* Abstract connecting hands / AI symbol */}
        <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1"/>
        <circle cx="50" cy="50" r="35" fill="url(#logoGradient)" opacity="0.2"/>
        
        {/* Left hand / connector */}
        <path 
          d="M25 50 Q25 30 40 25 L40 35 Q32 38 32 50 Q32 62 40 65 L40 75 Q25 70 25 50Z" 
          fill="url(#logoGradient)"
        />
        
        {/* Right hand / connector */}
        <path 
          d="M75 50 Q75 30 60 25 L60 35 Q68 38 68 50 Q68 62 60 65 L60 75 Q75 70 75 50Z" 
          fill="url(#logoGradient2)"
        />
        
        {/* Center connection / AI node */}
        <circle cx="50" cy="50" r="12" fill="url(#logoGradient)" />
        <circle cx="50" cy="50" r="6" fill="white" />
        
        {/* Connection lines */}
        <path d="M38 50 L44 50" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M56 50 L62 50" stroke="url(#logoGradient2)" strokeWidth="3" strokeLinecap="round"/>
        
        {/* Top connection */}
        <circle cx="50" cy="25" r="5" fill="url(#logoGradient)" />
        <path d="M50 30 L50 38" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Bottom connection */}
        <circle cx="50" cy="75" r="5" fill="url(#logoGradient2)" />
        <path d="M50 70 L50 62" stroke="url(#logoGradient2)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      
      {showText && (
        <span className={cn(
          "font-bold tracking-tight",
          size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-lg"
        )}>
          AI2Connect
        </span>
      )}
    </div>
  );
}

export function AI2RampOptimizerLogo({ className, size = "md" }: Omit<AI2ConnectLogoProps, "showText">) {
  const sizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg 
        viewBox="0 0 40 40" 
        className={cn(sizes[size], "w-auto")}
        fill="none"
      >
        <defs>
          <linearGradient id="roLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BCD4" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
        
        {/* Ramp / optimization symbol */}
        <rect x="4" y="28" width="32" height="4" rx="2" fill="url(#roLogoGradient)" />
        <rect x="8" y="20" width="24" height="4" rx="2" fill="url(#roLogoGradient)" opacity="0.8" />
        <rect x="12" y="12" width="16" height="4" rx="2" fill="url(#roLogoGradient)" opacity="0.6" />
        
        {/* AI indicator */}
        <circle cx="20" cy="6" r="4" fill="url(#roLogoGradient)" />
        <circle cx="20" cy="6" r="2" fill="white" />
      </svg>
    </div>
  );
}
