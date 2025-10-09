"use client"
import { useState, useRef, useEffect } from "react";
import { Upload, MapPin, Send, AlertCircle, Camera, Loader2, Navigation } from "lucide-react";
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

const THEME = {
  primary: "#19C2E6",
  accent: "#FED801",
  cta: "#FF5A1F",
  text: "#fff"
};


const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export default function ReportPage({ onNavigate }: ReportPageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDetection, setAiDetection] = useState<any>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    description: "",
    severity: "",
    contactName: "",
    contactPhone: "",
    location: "",
  });

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
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

  const getLocationSuggestions = async (input: string) => {
    if (input.length < 3) {
      setLocationSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // const response = await fetch(
      //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_MAPS_API_KEY}&components=country:IN`
      // );
      const response = await fetch(`/api/location-autocomplete?input=${encodeURIComponent(input)}`);
      const data = await response.json();

      if (data.predictions) {
        const suggestions = data.predictions.map((prediction: any) => prediction.description);
        setLocationSuggestions(suggestions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });
    getLocationSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, location: suggestion });
    setShowSuggestions(false);
    setLocationSuggestions([]);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      toast.info("Fetching your location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use Google Maps Geocoding API to get address
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            
            let locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            
            if (data.results && data.results[0]) {
              // Get formatted address from Google Maps
              locationString = data.results[0].formatted_address;
            }
            
            setFormData({
              ...formData,
              location: locationString,
            });
            toast.success("Location detected with Google Maps");
          } catch (error) {
            // Fallback to coordinates if Google API fails
            setFormData({
              ...formData,
              location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            });
            toast.success("Location detected");
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          toast.error("Unable to fetch location");
          console.error("Geolocation error:", error);
          setIsGettingLocation(false);
        }
      );
    } else {
      toast.error("Geolocation not supported");
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error("Please upload an image");
      return;
    }

    toast.success("Rescue report submitted successfully!");
    
    setTimeout(() => {
      onNavigate("dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ background: THEME.primary }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: THEME.text }}>
            Report a Rescue Case
          </h1>
          <p className="text-lg" style={{ color: "#eaf7ff" }}>
            Help us help them. Upload a photo and provide details about the animal in need.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold" style={{ color: THEME.primary }}>
              Case Details
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label style={{ color: THEME.primary }}>Upload Photo *</Label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
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
                      <Upload className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                      <p className="text-blue-500 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-blue-400">
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
                  <AlertDescription className="text-black">
                    AI is analyzing the image...
                  </AlertDescription>
                </Alert>
              )}

              {aiDetection && (
                <Alert className="bg-green-50 border-green-200">
                  <Camera className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-black">
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
              <div className="space-y-2 relative">
                <Label htmlFor="location" style={{ color: THEME.primary }}>Location *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={locationInputRef}
                      id="location"
                      placeholder="Enter address or location name"
                      value={formData.location}
                      onChange={handleLocationInputChange}
                      onFocus={() => {
                        if (locationSuggestions.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      className="text-black pr-4"
                      required
                    />
                    
                    {/* Location Suggestions Dropdown */}
                    {showSuggestions && locationSuggestions.length > 0 && (
                      <div
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                      >
                        {locationSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-black border-b border-gray-100 last:border-b-0"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              <span className="text-sm">{suggestion}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={getLocation}
                    disabled={isGettingLocation}
                    className="whitespace-nowrap border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800"
                  >
                    {isGettingLocation ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Navigation className="w-4 h-4 mr-2" />
                    )}
                    {isGettingLocation ? "Detecting..." : "Detect Location"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Powered by Google Maps</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" style={{ color: THEME.primary }}>Description </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the situation, animal behavior, surroundings..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="text-black"
                  //required
                />
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <Label htmlFor="severity" style={{ color: THEME.primary }}>Injury Severity *</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) =>
                    setFormData({ ...formData, severity: value })
                  }
                  required
                >
                  <SelectTrigger className="text-black">
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low" className="text-black">Low - Minor issues</SelectItem>
                    <SelectItem value="Medium" className="text-black">Medium - Needs attention</SelectItem>
                    <SelectItem value="High" className="text-black">High - Urgent care needed</SelectItem>
                    <SelectItem value="Critical" className="text-black">
                      Critical - Life-threatening
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName" style={{ color: THEME.primary }}>Your Name </Label>
                  <Input
                    id="contactName"
                    placeholder="Name"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="text-black"
                    //required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" style={{ color: THEME.primary }}>Phone Number </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+91 9278456790"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="text-black"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1" style={{ background: THEME.cta, color: THEME.text }}>
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
        <Card className="mt-6" style={{ background: "#eaf7ff", borderColor: THEME.primary }}>
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
                  <li>• Location powered by Google Maps for accuracy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}