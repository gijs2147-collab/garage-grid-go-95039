import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MapPin, Package, Tag, Car, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PartCardProps {
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
  onDelete: (id: string) => void;
}

const PartCard = ({ id, name, sku, location, quantity, condition, category, make, model, imageUrl, onDelete }: PartCardProps) => {
  const handleDelete = () => {
    onDelete(id);
    toast.success("Part deleted successfully");
  };
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square bg-muted relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        <Badge 
          className="absolute top-2 right-2 bg-background/90 text-foreground border-border"
        >
          Qty: {quantity}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            {sku && <p className="text-sm text-muted-foreground">SKU: {sku}</p>}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-medium">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car className="w-4 h-4" />
            <span>{make} {model}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              <Tag className="w-3 h-3" />
              {category}
            </Badge>
            <Badge variant={condition === "New" ? "default" : "secondary"}>
              {condition}
            </Badge>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full mt-3"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Part
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{name}" from your inventory. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartCard;
