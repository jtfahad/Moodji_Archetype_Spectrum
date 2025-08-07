import { useState } from "react";
import { ArchetypeCard } from "@/components/ArchetypeCard";
import { ArchetypeModal } from "@/components/ArchetypeModal";
import { archetypesData, Archetype } from "@/data/archetypes";
import { Search, Filter, Sparkles } from "lucide-react";

const Index = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleCardClick = (archetype: Archetype) => {
    setSelectedArchetype(archetype);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArchetype(null);
  };

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(archetypesData.map(a => a.category)))];

  // Filter archetypes
  const filteredArchetypes = archetypesData.filter(archetype => {
    const matchesSearch = archetype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         archetype.moodTone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         archetype.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || archetype.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-cosmic">
        <div className="absolute inset-0 bg-background/10" />
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-primary-glow" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Moodji Archetypes
            </h1>
            <Sparkles className="w-8 h-8 text-primary-glow" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the sacred spectrum of human experience through interactive archetype cards
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search archetypes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-card border border-card-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredArchetypes.length} archetype{filteredArchetypes.length !== 1 ? 's' : ''}
            {categoryFilter !== "All" && ` in ${categoryFilter}`}
          </p>
        </div>

        {/* Archetypes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArchetypes.map((archetype) => (
            <ArchetypeCard
              key={archetype.payloadSignature}
              archetype={archetype}
              onClick={() => handleCardClick(archetype)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredArchetypes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No archetypes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search term or filter selection
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ArchetypeModal
        archetype={selectedArchetype}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;