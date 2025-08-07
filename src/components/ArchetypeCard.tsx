import { Archetype } from "@/data/archetypes";
import { cn } from "@/lib/utils";

interface ArchetypeCardProps {
  archetype: Archetype;
  onClick: () => void;
}

export const ArchetypeCard = ({ archetype, onClick }: ArchetypeCardProps) => {
  // Convert hex to HSL for better integration with our design system
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const hslColor = hexToHsl(archetype.hex);
  const isLight = parseInt(hslColor.split(' ')[2]) > 50;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ease-smooth",
        "hover:scale-105 hover:shadow-glow-card hover:-translate-y-1",
        "bg-gradient-card border border-card-border"
      )}
      onClick={onClick}
      style={{
        background: `linear-gradient(145deg, ${archetype.hex}15, ${archetype.hex}25)`,
        borderColor: `${archetype.hex}30`
      }}
    >
      {/* Background Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${archetype.hex}, transparent 70%)`
        }}
      />
      
      {/* Card Content */}
      <div className="relative p-6 h-40 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div 
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: archetype.hex }}
          />
          <span className="text-xs font-medium text-muted-foreground bg-muted/20 px-2 py-1 rounded-full backdrop-blur-sm">
            {archetype.category}
          </span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {archetype.name}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">
            {archetype.moodTone}
          </p>
          <div className="flex items-center gap-1 text-sm">
            <span>{archetype.emojiSigils}</span>
          </div>
        </div>
      </div>

      {/* Hover Animation Border */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${archetype.hex}40, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite'
        }}
      />
    </div>
  );
};