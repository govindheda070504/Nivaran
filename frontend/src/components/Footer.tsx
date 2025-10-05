import { Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">Nivran</span>
            </div>
            <p className="text-muted-foreground mb-4">
              AI-powered rescue and welfare platform connecting citizens, NGOs, and
              volunteers to respond to emergencies involving stray animals and
              vulnerable beings.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 Nivran. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Join as NGO
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Volunteer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span>help@nivran.org</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}