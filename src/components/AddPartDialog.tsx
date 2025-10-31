import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Camera, Upload } from "lucide-react";
import { toast } from "sonner";

interface AddPartDialogProps {
  onAdd: (part: {
    name: string;
    sku: string;
    location: string;
    quantity: number;
    condition: string;
    category: string;
    make: string;
    model: string;
    imageUrl?: string;
  }) => void;
}

const AddPartDialog = ({ onAdd }: AddPartDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [condition, setCondition] = useState("New");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const categories = [
    "Engine",
    "Transmission",
    "Brakes",
    "Suspension",
    "Electrical",
    "Exhaust",
    "Interior",
    "Exterior",
    "Wheels & Tires",
    "Other"
  ];

  const carMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Porsche",
    "Volkswagen",
    "Nissan",
    "Mazda",
    "Subaru",
    "Hyundai",
    "Kia",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !sku || !location || !category || !make || !model) {
      toast.error("Please fill in all required fields");
      return;
    }

    onAdd({
      name,
      sku,
      location,
      quantity: parseInt(quantity),
      condition,
      category,
      make,
      model,
      imageUrl: imageUrl || undefined,
    });

    // Reset form
    setName("");
    setSku("");
    setLocation("");
    setQuantity("1");
    setCondition("New");
    setCategory("");
    setMake("");
    setModel("");
    setImageUrl("");
    setOpen(false);
    
    toast.success("Part added successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Add Part
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Part</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Part Image</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                type="url"
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button type="button" variant="outline" size="icon">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Paste an image URL or use camera to capture
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Part Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Front Brake Pad Set"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU / Part Number *</Label>
            <Input
              id="sku"
              placeholder="e.g., BP-F-001"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Brand *</Label>
              <Select value={make} onValueChange={setMake} required>
                <SelectTrigger id="make">
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                placeholder="e.g., Camry, Civic"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Warehouse Location *</Label>
            <Input
              id="location"
              placeholder="e.g., Aisle 3, Shelf B2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger id="condition">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                  <SelectItem value="Refurbished">Refurbished</SelectItem>
                  <SelectItem value="Damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Part
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartDialog;
