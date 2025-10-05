"use client";

import { Heart, Shield, MapPin, Users, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  const highlights = [
    {
      icon: Zap,
      title: "AI Detection",
      description: "Advanced AI-powered image recognition to identify animal species, injuries, and urgency levels automatically.",
      color: "text-yellow-500",
    },
    {
      icon: MapPin,
      title: "Nearby Help",
      description: "Real-time location mapping connects you with the closest NGOs, volunteers, and rescue services instantly.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Verified NGOs",
      description: "Partner with trusted, verified animal welfare organizations and experienced volunteers nationwide.",
      color: "text-green-500",
    },
  ];

  const stats = [
    { value: "2,500+", label: "Animals Rescued" },
    { value: "150+", label: "NGO Partners" },
    { value: "5,000+", label: "Active Volunteers" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-white to-accent/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                <span className="text-sm font-semibold">AI-Powered Rescue Platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Rescue. Connect. Care.
              </h1>
              <p className="text-xl text-muted-foreground">
                Join thousands of compassionate citizens, NGOs, and volunteers in saving
                lives. Report emergencies, adopt animals, and make a real difference in
                your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => handleNavigate("report")}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Report Rescue
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => handleNavigate("adopt")}
                >
                  Adopt Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553434133-96822a8e94af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJheSUyMGRvZyUyMHJlc2N1ZXxlbnwxfHx8fDE3NTk2NTgwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Animal rescue hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How Nivran Makes a Difference
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge technology to create a seamless rescue ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <Card key={highlight.title} className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-${highlight.color.split('-')[1]}/10 flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${highlight.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{highlight.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of compassionate volunteers and help save lives today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={() => handleNavigate("volunteer")}
            >
              <Users className="w-5 h-5 mr-2" />
              Join as Volunteer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white hover:text-primary"
              onClick={() => handleNavigate("dashboard")}
            >
              View Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Fast, Effective
            </h2>
            <p className="text-xl text-muted-foreground">
              Three easy steps to help save a life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Report",
                description: "Take a photo and share the location of an animal in need",
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our AI detects species, injuries, and notifies nearby helpers",
              },
              {
                step: "3",
                title: "Rescue",
                description: "Verified volunteers and NGOs respond and provide care",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}