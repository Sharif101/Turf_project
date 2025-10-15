"use client";

import Image from "next/image";
import pic1 from "../../../images/football-match-on-turf-at-night-with-floodlights.jpg";
import pic2 from "../../../images/cricket-practice-nets-with-players.jpg";
import pic3 from "../../../images/aerial-view-of-football-turf-facility.jpg";
import pic4 from "../../../images/cricket-pitch-with-players-batting.jpg";

const images = [pic1, pic2, pic3, pic4];

export default function Gallery() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-black to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Facilities
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Take a look at our world-class sports infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Gallery ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/50 transition-all duration-300 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
