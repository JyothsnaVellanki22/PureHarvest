"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, Users, ArrowRight, Sprout } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const values = [
    {
      icon: <Leaf className="w-6 h-6 text-primary" />,
      title: "Sustainable Agriculture",
      description: "We prioritize farms that use regenerative practices, ensuring our soil remains fertile for generations to come."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Total Transparency",
      description: "Know exactly where your food comes from, how it's grown, and who grew it. No secrets, just pure food."
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Direct Support",
      description: "By skipping the middleman, 100% of your support goes directly to the farmers, empowering rural communities."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Driven",
      description: "We're more than a marketplace; we're a bridge between urban consumers and rural producers."
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Andhra Pradesh Farmland"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-accent/90 text-primary font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-6 shadow-lg">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-balance leading-tight">
              Empowering the Rythu, <br /> Nourishing the People.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              PureHarvest is a bridge between the vibrant fields of Andhra Pradesh & Telangana and your dinner table.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">The PureHarvest Story</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 leading-tight">
              Reclaiming the Glory of Deccan Agriculture.
            </h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                From the fertile Guntur chili fields to the golden paddy fields of Krishna Valley, our region has always been a granary for the nation. However, the modern supply chain has often disconnected the consumer from the 'Rythu' (farmer).
              </p>
              <p>
                We started PureHarvest in Hyderabad with a simple goal: to ensure that the produce grown with sweat and passion in our villages reaches you directly, fresh and untainted.
              </p>
              <p>
                By removing the complex layers of middlemen, we ensure that you get the best quality Guntur chilies, Banganapalle mangoes, and Nizamabad turmeric, while our farmers receive the fair value they deserve.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 p-4 glass rounded-2xl border-primary/5">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Sprout className="text-primary w-6 h-6" />
              </div>
              <p className="text-sm font-medium italic text-primary">
                "We're not just selling crops; we're preserving a culture and empowering those who feed us."
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl z-10">
              <Image
                src="/images/indian-paddy.jpg"
                alt="Fresh Harvested Crops"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">Our Values</motion.h2>
            <motion.h3 {...fadeIn} className="text-3xl md:text-5xl font-display font-bold text-primary">What We Stand For</motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5 group"
              >
                <div className="bg-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-display font-bold text-primary mb-4">{value.title}</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto gradient-primary rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <motion.div {...fadeIn} className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to Meet Your Farmer?</h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              Join the thousands of people who are already enjoying fresh, seasonal produce while supporting sustainable agriculture.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/browse" 
                className="bg-accent text-primary px-8 py-4 rounded-full font-bold hover:bg-accent-hover transition-all shadow-lg flex items-center gap-2 group"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/farmer" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all border border-white/10"
              >
                Become a Farmer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
