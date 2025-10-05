import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export interface AdoptionAnimal {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: "Male" | "Female";
  location: string;
  imageUrl: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
}

interface AdoptionCardProps {
  animal: AdoptionAnimal;
  onAdopt?: (id: string) => void;
}

export function AdoptionCard({ animal, onAdopt }: AdoptionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-56 overflow-hidden">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{animal.name}</h3>
            <p className="text-sm text-muted-foreground">{animal.breed}</p>
          </div>
          <Badge variant="secondary">{animal.gender}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {animal.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1 text-primary" />
          <span>{animal.age}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1 text-primary" />
          <span>{animal.location}</span>
        </div>
        <div className="flex gap-2">
          {animal.vaccinated && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Vaccinated
            </Badge>
          )}
          {animal.neutered && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Neutered
            </Badge>
          )}
        </div>
      </CardContent>
      {onAdopt && (
        <CardFooter>
          <Button
            onClick={() => onAdopt(animal.id)}
            className="w-full"
          >
            Adopt {animal.name}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}