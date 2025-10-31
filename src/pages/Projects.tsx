import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, FolderOpen } from "lucide-react";

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
  projectId?: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
}

const Projects = () => {
  const navigate = useNavigate();
  
  // Mock data - this should come from a shared state or database
  const [projects] = useState<Project[]>([
    { id: "1", name: "2024 BMW M3 Restoration", description: "Complete restoration project" },
    { id: "2", name: "Honda Civic Track Build", description: "Performance upgrade build" },
    { id: "3", name: "Ford F-150 Custom", description: "Custom build for client" },
  ]);

  const [parts] = useState<Part[]>([
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
      projectId: "1",
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
      projectId: "2",
    },
  ]);

  const getProjectParts = (projectId: string) => {
    return parts.filter((part) => part.projectId === projectId);
  };

  const getProjectStats = (projectId: string) => {
    const projectParts = getProjectParts(projectId);
    const totalParts = projectParts.length;
    const totalQuantity = projectParts.reduce((sum, part) => sum + part.quantity, 0);
    return { totalParts, totalQuantity };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Projects Overview</h1>
                <p className="text-sm text-muted-foreground">
                  {projects.length} active projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => {
              const { totalParts, totalQuantity } = getProjectStats(project.id);
              const projectParts = getProjectParts(project.id);

              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                        {project.description && (
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {totalParts} {totalParts === 1 ? "part" : "parts"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Parts:</span>
                          <span className="font-semibold ml-2">{totalParts}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Quantity:</span>
                          <span className="font-semibold ml-2">{totalQuantity}</span>
                        </div>
                      </div>

                      {projectParts.length > 0 ? (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Allocated Parts:</h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {projectParts.map((part) => (
                              <div
                                key={part.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  {part.imageUrl ? (
                                    <img
                                      src={part.imageUrl}
                                      alt={part.name}
                                      className="w-12 h-12 rounded object-cover"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                                      <Package className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium text-sm">{part.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {part.make} {part.model}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge variant="secondary">Qty: {part.quantity}</Badge>
                                  {part.sku && (
                                    <p className="text-xs text-muted-foreground mt-1">{part.sku}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No parts allocated to this project yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground">
              Create your first project to start organizing parts
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
