"use client"

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  Heart,
  Award,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RescueCard, RescueCase } from "@/components/RescueCard";
import { toast } from "sonner";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Animal lover and volunteer. Passionate about helping stray animals and wildlife conservation.",
    joinedDate: "January 2024",
  });

  const stats = {
    rescues: 12,
    adoptions: 2,
    volunteering: "8 months",
    points: 450,
  };

  // Mock saved rescues
  const savedRescues: RescueCase[] = [
    {
      id: "1",
      title: "Injured Stray Dog on Highway",
      description: "Large dog with visible leg injury",
      location: "Highway 101, Exit 45, Mumbai",
      severity: "Critical",
      status: "Resolved",
      reportedAt: "1 week ago",
      contactInfo: "+91 98765 43210",
    },
    {
      id: "2",
      title: "Abandoned Puppies in Park",
      description: "Three puppies found in cardboard box",
      location: "Central Park, Andheri West",
      severity: "High",
      status: "Resolved",
      reportedAt: "2 weeks ago",
      contactInfo: "+91 98765 43211",
    },
  ];

  const achievements = [
    {
      icon: Heart,
      title: "Life Saver",
      description: "Rescued 10+ animals",
      earned: true,
      color: "text-red-500",
    },
    {
      icon: Award,
      title: "Early Responder",
      description: "First to respond 5 times",
      earned: true,
      color: "text-yellow-500",
    },
    {
      icon: Shield,
      title: "Guardian Angel",
      description: "Active volunteer for 6+ months",
      earned: true,
      color: "text-blue-500",
    },
    {
      icon: Calendar,
      title: "Consistent Helper",
      description: "Helped every week for a month",
      earned: false,
      color: "text-gray-400",
    },
  ];

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({ ...profileData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({ ...profileData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({ ...profileData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {profileData.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        {profileData.email}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        {profileData.phone}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Joined {profileData.joinedDate}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{stats.rescues}</div>
              <p className="text-sm text-muted-foreground">Rescues</p>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-green-50">
            <CardContent className="pt-6 text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-700">
                {stats.adoptions}
              </div>
              <p className="text-sm text-green-600">Adoptions</p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-700">
                {stats.volunteering}
              </div>
              <p className="text-sm text-blue-600">Volunteering</p>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/20 bg-yellow-50">
            <CardContent className="pt-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-700">{stats.points}</div>
              <p className="text-sm text-yellow-600">Points</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">My Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Recent Rescues</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedRescues.map((rescue) => (
                    <RescueCard key={rescue.id} rescue={rescue} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Your Achievements</h3>
                <p className="text-sm text-muted-foreground">
                  Earn badges by helping animals and contributing to the community
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <Card
                        key={achievement.title}
                        className={`${
                          achievement.earned
                            ? "border-primary/20 bg-primary/5"
                            : "opacity-50"
                        }`}
                      >
                        <CardContent className="pt-6 text-center">
                          <Icon
                            className={`w-12 h-12 mx-auto mb-3 ${achievement.color}`}
                          />
                          <h4 className="font-semibold text-foreground mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                          {achievement.earned && (
                            <Badge className="mt-3" variant="secondary">
                              Earned
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Notification Settings</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get instant alerts for nearby rescues
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive text messages for critical cases
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Privacy & Security</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => toast.info("Logout functionality coming soon")}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}