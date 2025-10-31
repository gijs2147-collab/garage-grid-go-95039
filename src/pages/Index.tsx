import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Package, LayoutGrid, List, LayoutList } from "lucide-react";
import PartCard from "@/components/PartCard";
import AddPartDialog from "@/components/AddPartDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Part {
  id: string;
  name: string;
  sku?: string;
  location: string;
  quantity: number;
  condition: string;
  category: string;
  make: string;
  model: string;
  imageUrl?: string;
}

const Index = () => {
  const [parts, setParts] = useState<Part[]>([
    {
      id: "1",
      name: "Front Brake Pad Set",
      sku: "BP-F-001",
      location: "Aisle 3, Shelf B2",
      quantity: 12,
      condition: "New",
      category: "Brakes",
      make: "Toyota",
      model: "Camry",
      imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    },
    {
      id: "2",
      name: "Engine Oil Filter",
      sku: "OF-001",
      location: "Aisle 1, Shelf A4",
      quantity: 24,
      condition: "New",
      category: "Engine",
      make: "Honda",
      model: "Accord",
      imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=400&fit=crop",
    },
    {
      id: "3",
      name: "Spark Plug Set",
      sku: "SP-004",
      location: "Aisle 2, Shelf C1",
      quantity: 8,
      condition: "New",
      category: "Engine",
      make: "Ford",
      model: "F-150",
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "feed">("grid");

  const categories = ["all", ...Array.from(new Set(parts.map((part) => part.category)))];

  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (part.sku && part.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      part.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || part.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddPart = (newPart: Omit<Part, "id">) => {
    const part: Part = {
      ...newPart,
      id: Date.now().toString(),
    };
    setParts([part, ...parts]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Tapacubos Motorsport Parts Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {parts.length} parts in stock
                </p>
              </div>
            </div>
            <AddPartDialog onAdd={handleAddPart} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Search Bar and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, SKU, location, category, make, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              title="List View"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "feed" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("feed")}
              title="Feed View"
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              {/* Parts Display */}
              {filteredParts.length > 0 ? (
                <>
                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredParts.map((part) => (
                        <PartCard key={part.id} {...part} />
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="space-y-2">
                      {filteredParts.map((part) => (
                        <Card key={part.id} className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            {part.imageUrl && (
                              <img
                                src={part.imageUrl}
                                alt={part.name}
                                className="w-16 h-16 rounded object-cover"
                              />
                            )}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-4 items-center">
                              <div className="sm:col-span-2">
                                <h3 className="font-semibold">{part.name}</h3>
                                {part.sku && <p className="text-sm text-muted-foreground">{part.sku}</p>}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Location: </span>
                                {part.location}
                              </div>
                              <div className="text-sm">
                                <Badge variant="secondary">{part.category}</Badge>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Qty: </span>
                                <span className="font-semibold">{part.quantity}</span>
                              </div>
                              <div className="text-sm">
                                {part.make} {part.model}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Feed View */}
                  {viewMode === "feed" && (
                    <div className="max-w-3xl mx-auto space-y-6">
                      {filteredParts.map((part) => (
                        <Card key={part.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          {part.imageUrl && (
                            <div className="w-full h-64 overflow-hidden">
                              <img
                                src={part.imageUrl}
                                alt={part.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-6 space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold mb-2">{part.name}</h3>
                              <div className="flex gap-2 flex-wrap">
                                <Badge>{part.category}</Badge>
                                <Badge variant="outline">{part.condition}</Badge>
                                {part.sku && <Badge variant="secondary">SKU: {part.sku}</Badge>}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground block">Location</span>
                                <span className="font-medium">{part.location}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block">Quantity</span>
                                <span className="font-medium">{part.quantity} in stock</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block">Make</span>
                                <span className="font-medium">{part.make}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block">Model</span>
                                <span className="font-medium">{part.model}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No parts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "Add your first part to get started"}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
