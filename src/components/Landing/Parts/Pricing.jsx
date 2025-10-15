"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Hourly",
    price: "₹999",
    period: "per hour",
    features: [
      "Any sport of your choice",
      "Floodlight facility",
      "Changing rooms",
      "Parking available",
      "Water & first aid",
    ],
    popular: false,
  },
  {
    name: "Monthly",
    price: "₹19,999",
    period: "per month",
    features: [
      "Unlimited bookings",
      "Priority slot booking",
      "Free coaching sessions",
      "Tournament participation",
      "Locker facility",
      "Guest passes (5/month)",
    ],
    popular: true,
  },
  {
    name: "Tournament",
    price: "Custom",
    period: "pricing",
    features: [
      "Full day booking",
      "Professional setup",
      "Scoreboard & equipment",
      "Refreshments included",
      "Photography coverage",
      "Trophy & medals",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Flexible{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that best fits your playing schedule
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-gradient-to-br ${
                plan.popular
                  ? "from-emerald-500/10 to-green-500/5 border-emerald-500/50 scale-105"
                  : "from-emerald-500/5 to-transparent border-emerald-500/20"
              } hover:border-emerald-500/40 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-4 text-white">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                </div>
                <p className="text-gray-400">{plan.period}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
                      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Us" : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
