"use client";

import { Shield, Clock, Users, Zap, Trophy, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Premium Quality",
    description:
      "FIFA and ICC approved synthetic turf with superior durability and performance",
  },
  {
    icon: Clock,
    title: "24/7 Booking",
    description: "Book your slots anytime with our easy online booking system",
  },
  {
    icon: Users,
    title: "Professional Staff",
    description: "Trained staff and coaches available for guidance and support",
  },
  {
    icon: Zap,
    title: "Floodlights",
    description:
      "High-quality LED floodlights for perfect visibility during night matches",
  },
  {
    icon: Trophy,
    title: "Tournament Ready",
    description:
      "Host tournaments and leagues with our professional-grade facilities",
  },
  {
    icon: Star,
    title: "Top Amenities",
    description: "Modern changing rooms, parking, and refreshment facilities",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Our Mohakash Turf
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the best facilities and services designed for serious
            players
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
