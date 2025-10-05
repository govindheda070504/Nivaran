import { MapPin, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export interface RescueCase {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "New" | "In Progress" | "Resolved";
  imageUrl?: string;
  reportedAt: string;
  contactInfo: string;
}

interface RescueCardProps {
  rescue: RescueCase;
  onTakeAction?: (id: string) => void;
}

export function RescueCard({ rescue, onTakeAction }: RescueCardProps) {
  const severityColors = {
    Low: "bg-green-100 text-green-800 border-green-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    High: "bg-orange-100 text-orange-800 border-orange-200",
    Critical: "bg-red-100 text-red-800 border-red-200",
  };

  const statusColors = {
    New: "bg-blue-100 text-blue-800 border-blue-200",
    "In Progress": "bg-purple-100 text-purple-800 border-purple-200",
    Resolved: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {rescue.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={rescue.imageUrl}
            alt={rescue.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground">{rescue.title}</h3>
          <div className="flex gap-2 flex-shrink-0">
            <Badge className={severityColors[rescue.severity]} variant="outline">
              {rescue.severity}
            </Badge>
            <Badge className={statusColors[rescue.status]} variant="outline">
              {rescue.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">{rescue.description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          <span>{rescue.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1 text-primary" />
          <span>{rescue.reportedAt}</span>
        </div>
      </CardContent>
      {onTakeAction && rescue.status === "New" && (
        <CardFooter>
          <Button
            onClick={() => onTakeAction(rescue.id)}
            className="w-full"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Take Action
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}