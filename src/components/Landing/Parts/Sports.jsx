"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// ✅ Make sure image imports match actual filenames (case-sensitive)
import img1 from "../../../images/professional-football-turf-field-with-goals.jpg";
import img2 from "../../../images/professional-cricket-turf-pitch-with-nets.jpg";

const sports = [
  {
    name: "Football",
    image: img1,
    features: [
      "5-a-side & 7-a-side",
      "FIFA Approved Turf",
      "Professional Goals",
      "Floodlit Pitches",
    ],
  },
  {
    name: "Cricket",
    image: img2,
    features: [
      "Practice Nets",
      "ICC Standard Pitch",
      "Bowling Machines",
      "Match Facilities",
    ],
  },
];

export default function Sports() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-emerald-950/20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Sports Facilities
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            State-of-the-art facilities for both football and cricket
            enthusiasts
          </p>
        </div>

        {/* Sports cards grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sports.map((sport, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 overflow-hidden group hover:border-emerald-500/40 transition-all duration-300"
            >
              {/* Image section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={sport.image}
                  alt={sport.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-500"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-3xl font-bold text-white drop-shadow-lg">
                  {sport.name}
                </h3>
              </div>

              {/* Card content */}
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  {sport.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 text-sm sm:text-base"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                  Book {sport.name} Turf
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
