import React from "react";
import Contact from "./Parts/Contact";
import Hero from "./Parts/Hero";
import Features from "./Parts/Features";
import Gallery from "./Parts/Gallery";
import Pricing from "./Parts/Pricing";
import Footer from "./Parts/Footer";
import Sports from "./Parts/Sports";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Sports />
      <Gallery />
      {/* <Pricing /> */}
      <Contact />
      <Footer />
    </div>
  );
}
