import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Package } from "lucide-react";
import PartCard from "@/components/PartCard";
import AddPartDialog from "@/components/AddPartDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Part {
  id: string;
  name: string;
  sku: string;
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

  const categories = ["all", ...Array.from(new Set(parts.map((part) => part.category)))];

  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, SKU, location, category, make, or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
              {/* Parts Grid */}
              {filteredParts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredParts.map((part) => (
                    <PartCard key={part.id} {...part} />
                  ))}
                </div>
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
