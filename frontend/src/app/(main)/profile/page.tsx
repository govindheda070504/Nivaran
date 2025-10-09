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

const THEME = {
  primary: "#19C2E6",
  accent: "#FED801",
  cta: "#FF5A1F",
  text: "#fff"
};

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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: THEME.primary }}>
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
                        <Label htmlFor="name" style={{ color: THEME.primary }}>Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({ ...profileData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" style={{ color: THEME.primary }}>Email</Label>
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
                        <Label htmlFor="phone" style={{ color: THEME.primary }}>Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({ ...profileData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" style={{ color: THEME.primary }}>Location</Label>
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
                    <h2 className="text-2xl font-bold mb-2" style={{ color: THEME.primary }}>
                      {profileData.name}
                    </h2>
                    <p className="mb-4" style={{ color: "#eaf7ff" }}>{profileData.bio}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center" style={{ color: "#eaf7ff" }}>
                        <Mail className="w-4 h-4 mr-2" style={{ color: THEME.accent }} />
                        {profileData.email}
                      </div>
                      <div className="flex items-center" style={{ color: "#eaf7ff" }}>
                        <Phone className="w-4 h-4 mr-2" style={{ color: THEME.accent }} />
                        {profileData.phone}
                      </div>
                      <div className="flex items-center" style={{ color: "#eaf7ff" }}>
                        <MapPin className="w-4 h-4 mr-2" style={{ color: THEME.accent }} />
                        {profileData.location}
                      </div>
                      <div className="flex items-center" style={{ color: "#eaf7ff" }}>
                        <Calendar className="w-4 h-4 mr-2" style={{ color: THEME.accent }} />
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
          <Card style={{ background: "#eaf7ff" }}>
            <CardContent className="pt-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" style={{ color: THEME.cta }} />
              <div className="text-2xl font-bold" style={{ color: THEME.primary }}>{stats.rescues}</div>
              <p className="text-sm" style={{ color: THEME.primary }}>Rescues</p>
            </CardContent>
          </Card>
          <Card style={{ background: "#eaf7ff" }}>
            <CardContent className="pt-6 text-center">
              <User className="w-8 h-8 mx-auto mb-2" style={{ color: "#60C437" }} />
              <div className="text-2xl font-bold" style={{ color: "#60C437" }}>
                {stats.adoptions}
              </div>
              <p className="text-sm" style={{ color: "#60C437" }}>Adoptions</p>
            </CardContent>
          </Card>
          <Card style={{ background: "#eaf7ff" }}>
            <CardContent className="pt-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: THEME.primary }} />
              <div className="text-2xl font-bold" style={{ color: THEME.primary }}>
                {stats.volunteering}
              </div>
              <p className="text-sm" style={{ color: THEME.primary }}>Volunteering</p>
            </CardContent>
          </Card>
          <Card style={{ background: "#eaf7ff" }}>
            <CardContent className="pt-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2" style={{ color: THEME.accent }} />
              <div className="text-2xl font-bold" style={{ color: THEME.accent }}>{stats.points}</div>
              <p className="text-sm" style={{ color: THEME.accent }}>Points</p>
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
                <h3 className="text-xl font-semibold" style={{ color: THEME.primary }}>Recent Rescues</h3>
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
                <h3 className="text-xl font-semibold" style={{ color: THEME.primary }}>Your Achievements</h3>
                <p className="text-sm" style={{ color: THEME.primary }}>
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
                        style={{
                          background: achievement.earned ? "#eaf7ff" : "#eaf7ff",
                          opacity: achievement.earned ? 1 : 0.5
                        }}
                      >
                        <CardContent className="pt-6 text-center">
                          <Icon
                            className={`w-12 h-12 mx-auto mb-3 ${achievement.color}`}
                          />
                          <h4 className="font-semibold mb-1" style={{ color: THEME.primary }}>
                            {achievement.title}
                          </h4>
                          <p className="text-xs" style={{ color: THEME.primary }}>
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
                <h3 className="text-xl font-semibold" style={{ color: THEME.primary }}>Notification Settings</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: THEME.primary }}>Email Notifications</p>
                    <p className="text-sm" style={{ color: THEME.primary }}>
                      Receive updates via email
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: THEME.primary }}>Push Notifications</p>
                    <p className="text-sm" style={{ color: THEME.primary }}>
                      Get instant alerts for nearby rescues
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium" style={{ color: THEME.primary }}>SMS Alerts</p>
                    <p className="text-sm" style={{ color: THEME.primary }}>
                      Receive text messages for critical cases
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold" style={{ color: THEME.primary }}>Privacy & Security</h3>
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