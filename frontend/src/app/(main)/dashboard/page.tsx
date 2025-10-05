"use client"
import { useState } from "react";
import { Filter, Map, List, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RescueCard, RescueCase } from "@/components/RescueCard";
import { MapView } from "@/components/MapView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock rescue cases data
  const mockRescues: RescueCase[] = [
    {
      id: "1",
      title: "Injured Stray Dog on Highway",
      description: "Large dog with visible leg injury, appears unable to walk properly. Located near highway exit.",
      location: "Highway 101, Exit 45, Mumbai",
      severity: "Critical",
      status: "New",
      imageUrl: "https://images.unsplash.com/photo-1553434133-96822a8e94af?w=400",
      reportedAt: "2 hours ago",
      contactInfo: "+91 98765 43210",
    },
    {
      id: "2",
      title: "Abandoned Puppies in Park",
      description: "Three puppies, approximately 2 months old, found in cardboard box at city park.",
      location: "Central Park, Andheri West",
      severity: "High",
      status: "In Progress",
      imageUrl: "https://images.unsplash.com/photo-1671564831911-b357c38f5d69?w=400",
      reportedAt: "5 hours ago",
      contactInfo: "+91 98765 43211",
    },
    {
      id: "3",
      title: "Injured Cat Near Market",
      description: "Cat with eye infection, seems friendly but needs medical attention.",
      location: "Crawford Market, South Mumbai",
      severity: "Medium",
      status: "New",
      imageUrl: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400",
      reportedAt: "1 day ago",
      contactInfo: "+91 98765 43212",
    },
    {
      id: "4",
      title: "Malnourished Dog Colony",
      description: "Group of 5-6 dogs showing signs of malnutrition in residential area.",
      location: "Goregaon East, Mumbai",
      severity: "High",
      status: "New",
      reportedAt: "3 hours ago",
      contactInfo: "+91 98765 43213",
    },
    {
      id: "5",
      title: "Bird with Broken Wing",
      description: "Pigeon unable to fly, appears to have injured wing.",
      location: "Marine Drive, Mumbai",
      severity: "Low",
      status: "Resolved",
      reportedAt: "2 days ago",
      contactInfo: "+91 98765 43214",
    },
  ];

  const filteredRescues = mockRescues.filter((rescue) => {
    const matchesStatus = filterStatus === "all" || rescue.status === filterStatus;
    const matchesSeverity =
      filterSeverity === "all" || rescue.severity === filterSeverity;
    const matchesSearch =
      searchQuery === "" ||
      rescue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rescue.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const stats = {
    total: mockRescues.length,
    new: mockRescues.filter((r) => r.status === "New").length,
    inProgress: mockRescues.filter((r) => r.status === "In Progress").length,
    resolved: mockRescues.filter((r) => r.status === "Resolved").length,
  };

  const handleTakeAction = (id: string) => {
    toast.success(`You've taken responsibility for case #${id}`);
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Rescue Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage and respond to active rescue cases in your area
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Cases</p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-700">{stats.new}</div>
              <p className="text-sm text-blue-600">New</p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-700">
                {stats.inProgress}
              </div>
              <p className="text-sm text-purple-600">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">
                {stats.resolved}
              </div>
              <p className="text-sm text-green-600">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              {/* Severity Filter */}
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Content */}
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRescues.length > 0 ? (
              filteredRescues.map((rescue) => (
                <RescueCard
                  key={rescue.id}
                  rescue={rescue}
                  onTakeAction={handleTakeAction}
                />
              ))
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No rescue cases found matching your filters.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ) : (
          <MapView rescues={filteredRescues} />
        )}
      </div>
    </div>
  );
}