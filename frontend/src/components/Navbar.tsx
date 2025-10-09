"use client";
import { Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Theme colors
const THEME = {
  primary: "#19C2E6",
  accent: "#FED801",
  cta: "#FF5A1F",
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Rescue", path: "/report" },
    { name: "Adopt", path: "/adoption" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav style={{ background: THEME.primary }} className="border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors"
              style={{ background: THEME.cta }}
            >
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-semibold" style={{ color: "#fff" }}>
              Nivaran
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? "font-bold"
                    : "hover:bg-yellow-300"
                }`}
                style={{
                  color: isActive(link.path) ? THEME.cta : "#fff",
                  background: isActive(link.path) ? THEME.accent : "transparent",
                  fontWeight: isActive(link.path) ? 700 : 400,
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ background: THEME.accent }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#FF5A1F]" />
            ) : (
              <Menu className="w-6 h-6 text-[#FF5A1F]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border" style={{ background: THEME.primary }}>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive(link.path)
                      ? "font-bold"
                      : "hover:bg-yellow-300"
                  }`}
                  style={{
                    color: isActive(link.path) ? THEME.cta : "#fff",
                    background: isActive(link.path) ? THEME.accent : "transparent",
                    fontWeight: isActive(link.path) ? 700 : 400,
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}