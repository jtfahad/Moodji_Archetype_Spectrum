import { X, Palette, Music, Sparkles, Eye, Zap } from "lucide-react";
import { Archetype } from "@/data/archetypes";
import { cn } from "@/lib/utils";

interface ArchetypeModalProps {
  archetype: Archetype | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArchetypeModal = ({ archetype, isOpen, onClose }: ArchetypeModalProps) => {
  if (!isOpen || !archetype) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] mx-4 overflow-hidden rounded-2xl bg-gradient-modal border border-card-border shadow-modal"
        style={{
          background: `linear-gradient(to bottom, hsl(var(--card)), hsl(240 10% 5%))`,
          borderColor: `${archetype.hex}30`
        }}
      >
        {/* Header with Close Button */}
        <div className="relative p-6 border-b border-card-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-2xl"
              style={{ backgroundColor: archetype.hex }}
            >
              {archetype.emojiSigils.split(' ')[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {archetype.name}
              </h1>
              <div className="flex items-center gap-3">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white/90"
                  style={{ backgroundColor: archetype.hex }}
                >
                  {archetype.category}
                </span>
                <span className="text-lg font-semibold text-primary">
                  {archetype.moodTone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {archetype.description}
                </p>
              </div>

              {/* Color & Visual */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Visual Identity
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg shadow-sm"
                      style={{ backgroundColor: archetype.hex }}
                    />
                    <span className="font-mono text-sm bg-muted/20 px-3 py-1 rounded-lg">
                      {archetype.hex}
                    </span>
                  </div>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Visual Arrival:</strong> {archetype.visualArrival}
                    </p>
                  </div>
                </div>
              </div>

              {/* Audio & Animation */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  Audio & Animation
                </h2>
                <div className="space-y-3 bg-muted/10 p-4 rounded-lg">
                  <div>
                    <strong className="text-foreground">Soundtrack:</strong>
                    <span className="ml-2 text-muted-foreground">{archetype.soundtrack}</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Accent Animation:</strong>
                    <span className="ml-2 text-muted-foreground">{archetype.accentAnimation}</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Arrival Style Group:</strong>
                    <span className="ml-2 text-muted-foreground">{archetype.arrivalStyleGroup}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Technical Details */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Technical Details
                </h2>
                <div className="space-y-3 bg-muted/10 p-4 rounded-lg">
                  <div>
                    <strong className="text-foreground">UI Components:</strong>
                    <span className="ml-2 text-muted-foreground font-mono text-sm bg-muted/20 px-2 py-1 rounded">
                      {archetype.uiComponents}
                    </span>
                  </div>
                  <div>
                    <strong className="text-foreground">Payload Signature:</strong>
                    <span className="ml-2 text-muted-foreground font-mono text-sm bg-muted/20 px-2 py-1 rounded">
                      {archetype.payloadSignature}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emoji Sigils */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Sigils & Symbols
                </h2>
                <div className="bg-muted/10 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-3">
                    {archetype.emojiSigils}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sacred symbols representing the archetype's energy
                  </p>
                </div>
              </div>

              {/* Image */}
              {archetype.imageUrl && (
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">Visual Reference</h2>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={archetype.imageUrl} 
                      alt={`${archetype.name} archetype visualization`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ambient Glow Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${archetype.hex}, transparent 50%)`
          }}
        />
      </div>
    </div>
  );
};