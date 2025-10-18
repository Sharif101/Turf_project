"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@premiumturf.com",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Sports Complex, City Center",
  },
  {
    icon: Clock,
    title: "Hours",
    details: "Open 24/7",
  },
];

export default function Contact() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-emerald-950/20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get In{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Have questions? We&apos;d love to hear from you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Name
                    </label>
                    <Input
                      placeholder="Your name"
                      className="bg-black/50 border-emerald-500/30 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Phone
                    </label>
                    <Input
                      placeholder="Your phone"
                      className="bg-black/50 border-emerald-500/30 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-black/50 border-emerald-500/30 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="bg-black/50 border-emerald-500/30 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-400">{info.details}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Google Map */}
            <Card className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20 overflow-hidden">
              <div className="h-64 md:h-80 w-full">
                <iframe
                  title="Turf Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.1684406844192!2d90.48379877602203!3d23.70567819049058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b7007d96400d%3A0xb5721f9738f2cbfa!2sMohakash%20Turf!5e0!3m2!1sen!2sbd!4v1760522268691!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
