"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Info, Sprout, Calendar, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    id: "1",
    name: "Standard Harvest",
    price: "₹5,999",
    duration: "6 Months",
    yield: "20-25kg",
    features: [
      "Direct farm-to-table delivery",
      "Monthly status reports",
      "Basic crop insurance",
      "Harvest day invite",
      "Fixed yield guarantee"
    ],
    recommended: false,
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    id: "2",
    name: "Premium Sponsorship",
    price: "₹16,999",
    duration: "1 Year",
    yield: "75-80kg",
    features: [
      "Priority seasonal selection",
      "Bi-weekly detailed reports",
      "Comprehensive crop insurance",
      "Exclusive farm stay (1 night)",
      "Dedicated Rythu coordinator",
      "Personalized packaging"
    ],
    recommended: true,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    id: "3",
    name: "Community Estate",
    price: "₹32,999",
    duration: "1 Year",
    yield: "180-200kg",
    features: [
      "Commercial grade volume",
      "Daily live farm camera access",
      "Full supply chain tracking",
      "Farm-to-Mandi logistics",
      "Quarterly farm visits",
      "Tax saving benefits (80G)"
    ],
    recommended: false,
    color: "bg-accent/10 text-accent-hover border-accent/20"
  }
];

export default function PlansPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6">
            Investment & Subscriptions
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
            Choose Your Harvest Plan
          </h1>
          <p className="text-foreground/60 text-lg">
            Support our Rythus by sponsoring a harvest. Get fresh, high-quality produce while empowering rural communities.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-[2.5rem] border bg-card shadow-premium hover:shadow-2xl transition-all flex flex-col ${
              plan.recommended ? "border-primary scale-105 z-10" : "border-border"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-foreground/40 text-sm">/season</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-bold ${plan.color}`}>
                <Calendar className="w-4 h-4" />
                {plan.duration} Plan
              </div>
            </div>

            <div className="space-y-6 flex-grow mb-10">
              <div className="p-4 bg-muted rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">Expected Yield</span>
                  <Sprout className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{plan.yield}</div>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/70">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
              plan.recommended 
                ? "bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20" 
                : "bg-muted text-primary hover:bg-primary/5 border border-primary/10"
            }`}>
              Select Plan
              <Sprout className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-y border-border">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h4 className="font-display text-xl font-bold mb-2">Secure Investment</h4>
          <p className="text-sm text-foreground/60">Your funds are protected by our crop failure guarantee and insurance.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
            <TrendingUp className="w-8 h-8 text-accent-hover" />
          </div>
          <h4 className="font-display text-xl font-bold mb-2">High ROI</h4>
          <p className="text-sm text-foreground/60">Receive up to 40% more value in fresh produce compared to retail markets.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
            <Info className="w-8 h-8 text-blue-700" />
          </div>
          <h4 className="font-display text-xl font-bold mb-2">Transparent Tracking</h4>
          <p className="text-sm text-foreground/60">Monitor your harvest progress with bi-weekly updates and live farm feeds.</p>
        </div>
      </div>
    </div>
  );
}
