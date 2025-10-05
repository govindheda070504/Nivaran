"use client"
import { useState } from "react";
import { Upload, MapPin, Send, AlertCircle, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface ReportPageProps {
  onNavigate: (page: string) => void;
}

export default function ReportPage({ onNavigate }: ReportPageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDetection, setAiDetection] = useState<any>(null);
  const [formData, setFormData] = useState({
    description: "",
    severity: "",
    contactName: "",
    contactPhone: "",
    location: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Simulate AI detection
        simulateAIDetection();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIDetection = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiDetection({
        species: "Dog (Stray)",
        confidence: "95%",
        injuries: ["Limping on front left leg", "Minor wounds visible"],
        urgency: "Medium",
      });
      setIsAnalyzing(false);
      toast.success("Image analyzed successfully");
    }, 2000);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      toast.info("Fetching your location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          });
          toast.success("Location detected");
        },
        () => {
          toast.error("Unable to fetch location");
        }
      );
    } else {
      toast.error("Geolocation not supported");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    // Simulate submission to backend
    toast.success("Rescue report submitted successfully!");
    
    // Reset form
    setTimeout(() => {
      onNavigate("dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Report a Rescue Case
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us help them. Upload a photo and provide details about the animal in need.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Case Details</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Photo *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setImagePreview(null)}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* AI Detection Result */}
              {isAnalyzing && (
                <Alert>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <AlertDescription>
                    AI is analyzing the image...
                  </AlertDescription>
                </Alert>
              )}

              {aiDetection && (
                <Alert className="bg-green-50 border-green-200">
                  <Camera className="w-4 h-4 text-green-600" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <p className="font-semibold text-green-900">AI Detection Complete</p>
                      <p className="text-sm text-green-800">
                        <strong>Species:</strong> {aiDetection.species} (
                        {aiDetection.confidence} confidence)
                      </p>
                      <p className="text-sm text-green-800">
                        <strong>Detected Issues:</strong>{" "}
                        {aiDetection.injuries.join(", ")}
                      </p>
                      <p className="text-sm text-green-800">
                        <strong>Urgency Level:</strong> {aiDetection.urgency}
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter address or coordinates"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                  <Button type="button" variant="outline" onClick={getLocation}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Auto-detect
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the situation, animal behavior, surroundings..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <Label htmlFor="severity">Injury Severity *</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) =>
                    setFormData({ ...formData, severity: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low - Minor issues</SelectItem>
                    <SelectItem value="Medium">Medium - Needs attention</SelectItem>
                    <SelectItem value="High">High - Urgent care needed</SelectItem>
                    <SelectItem value="Critical">
                      Critical - Life-threatening
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    placeholder="John Doe"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Rescue Report
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate("home")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-blue-900">What happens next?</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Nearby NGOs and volunteers will be notified instantly</li>
                  <li>• You'll receive updates on the rescue progress</li>
                  <li>• Our AI will prioritize based on urgency level</li>
                  <li>• Your contact details remain private</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}