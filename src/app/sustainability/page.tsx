"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Droplets, Wind, ShieldCheck, Sprout, Recycle } from "lucide-react";
import Image from "next/image";

const SustainabilityPage = () => {
  const practices = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Regenerative Farming",
      desc: "Our Rythus use ancient Vedic farming techniques combined with modern regenerative practices to restore soil health and biodiversity."
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      title: "Water Conservation",
      desc: "Implementing precision drip irrigation and rainwater harvesting to reduce water usage by up to 40% in drought-prone regions."
    },
    {
      icon: <Recycle className="w-8 h-8 text-orange-600" />,
      title: "Zero-Waste Packaging",
      desc: "All our produce is delivered in biodegradable, jute, or recycled paper packaging, ensuring our footprint is as green as our fields."
    },
    {
      icon: <Wind className="w-8 h-8 text-teal-600" />,
      title: "Carbon Neutral Logistics",
      desc: "By shipping directly from the farm to your door, we eliminate multiple storage points, significantly reducing our carbon emission per delivery."
    }
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Sustainable Fields"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6">
              Cultivating a <br />
              <span className="text-secondary">Greener Future.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              Sustainability isn't just a buzzword for us; it's the core of every seed we plant and every harvest we deliver.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Practices */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[3rem] bg-card border border-foreground/5 shadow-premium hover:shadow-2xl transition-all group"
            >
              <div className="bg-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {practice.icon}
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">{practice.title}</h3>
              <p className="text-foreground/60 leading-relaxed text-lg">{practice.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary py-24 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Our Commitment to <br /> the Earth.
              </h2>
              <div className="space-y-6">
                {[
                  "Eliminating 100% of single-use plastics from our supply chain by 2025.",
                  "Supporting 500+ small-scale Rythus in transitioning to natural farming.",
                  "Implementing solar-powered storage solutions at regional farm hubs.",
                  "Zero chemical pesticide usage across all partner farms."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-accent p-1 rounded-full mt-1">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg text-secondary/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/indian-paddy.jpg"
                alt="Impact"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;
