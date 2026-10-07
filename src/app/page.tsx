"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Truck, Users } from "lucide-react";
import FarmCard from "@/components/farm/FarmCard";

const FEATURED_FARMS = [
  {
    id: "1",
    name: "Red Spice Gardens",
    location: "Guntur, Andhra Pradesh",
    rating: 4.9,
    image: "/images/guntur-chili.jpg",
    tags: ["Chili", "Spices"],
    plansCount: 15,
  },
  {
    id: "3",
    name: "Golden Valley Paddy",
    location: "Vijayawada, Andhra Pradesh",
    rating: 4.7,
    image: "/images/indian-paddy.jpg",
    tags: ["Rice", "Staple"],
    plansCount: 20,
  },
  {
    id: "5",
    name: "Heritage Turmeric Hub",
    location: "Nizamabad, Telangana",
    rating: 4.9,
    image: "/images/turmeric.png",
    tags: ["Turmeric", "Medicinal"],
    plansCount: 12,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Paddy Fields"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block bg-accent/20 backdrop-blur-md border border-accent/30 text-accent font-bold px-4 py-1.5 rounded-full text-sm mb-6 tracking-wide uppercase">
              Empowering the Rythu
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
              Sponsor a Harvest, <br />
              <span className="text-secondary">Empower a Farmer.</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary/80 mb-10 leading-relaxed max-w-xl">
              Connect directly with farmers from Andhra Pradesh and Telangana. Skip the middleman, support regional agriculture, and receive fresh, seasonal crops at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/browse"
                className="bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-2"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/farmer"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Join as a Farmer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl font-bold mb-6 text-primary">Why PureHarvest?</h2>
          <p className="text-foreground/60 text-lg">
            We're redefining the food supply chain by putting power back into the hands of farmers and consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: Leaf,
              title: "Direct Sourcing",
              desc: "No warehouses, no wholesalers. Just you and the farm.",
              color: "bg-green-100 text-green-700",
            },
            {
              icon: ShieldCheck,
              title: "Traceable Quality",
              desc: "Know exactly where your food comes from and how it's grown.",
              color: "bg-blue-100 text-blue-700",
            },
            {
              icon: Truck,
              title: "Fresh Delivery",
              desc: "Produce is harvested at peak ripeness and shipped immediately.",
              color: "bg-orange-100 text-orange-700",
            },
            {
              icon: Users,
              title: "Local Impact",
              desc: "Every subscription directly funds local farmers and their families.",
              color: "bg-purple-100 text-purple-700",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-card border border-foreground/5 shadow-premium hover:shadow-2xl transition-all group"
            >
              <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Farms */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold mb-4 text-primary">Featured Farms</h2>
            <p className="text-foreground/60">
              Discover local producers who are committed to sustainable, high-quality agriculture.
            </p>
          </div>
          <Link
            href="/browse"
            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all underline decoration-accent decoration-2 underline-offset-8"
          >
            Browse all farms <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_FARMS.map((farm) => (
            <FarmCard key={farm.id} {...farm} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto gradient-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">Ready to transform your table?</h2>
            <p className="text-secondary/80 text-lg mb-12 leading-relaxed">
              Join thousands of families who are already supporting local farms and enjoying the freshest produce available.
            </p>
            <Link
              href="/register"
              className="bg-accent text-primary px-12 py-5 rounded-full font-bold text-xl hover:bg-accent-hover transition-all shadow-xl inline-flex items-center gap-3"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
