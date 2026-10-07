"use client";

import React from "react";
import Image from "next/image";
import { 
  MapPin, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Info, 
  ArrowLeft,
  Share2,
  Heart,
  TrendingUp,
  Package
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ALL_FARMS } from "@/lib/data";

export default function FarmDetailPage() {
  const routeParams = useParams();
  const farmId = (routeParams?.id as string) || "1";
  const matchedFarm = ALL_FARMS.find((f) => f.id === farmId);

  // Dynamic farm details with fallback
  const farm = {
    id: farmId,
    name: matchedFarm?.name ? `${matchedFarm.name} Estate` : "Oakhaven Organics",
    location: matchedFarm?.location || "Guntur, Andhra Pradesh",
    rating: matchedFarm?.rating || 4.9,
    reviews: 128,
    description: matchedFarm?.description || `Dedicated to sustainable, regenerative agriculture in ${matchedFarm?.district || "Andhra Pradesh"}. Partnering directly with consumers for transparent harvest cycles and direct farm-to-table delivery without intermediaries.`,
    image: matchedFarm?.image || "/hero.png",
    tags: matchedFarm?.tags || ["Organic", "Direct Harvest", "Certified"],
    activePlans: [
      {
        id: "p1",
        name: "Summer Vegetable Box",
        price: 45,
        period: "per week",
        desc: "A diverse selection of 8-10 seasonal vegetables harvested same-day.",
        includes: ["Heirloom Tomatoes", "Organic Kale", "Summer Squash", "Fresh Herbs"],
        spots: 12,
      },
      {
        id: "p2",
        name: "The Orchard Bounty",
        price: 35,
        period: "per week",
        desc: "A basket of our finest seasonal fruits, from stone fruits to berries.",
        includes: ["White Peaches", "Blackberries", "Plums", "Honey"],
        spots: 8,
      },
      {
        id: "p3",
        name: "Full Farm Subscription",
        price: 75,
        period: "per week",
        desc: "The ultimate experience. Includes vegetables, fruits, and a dozen farm eggs.",
        includes: ["Veggie Box", "Fruit Basket", "Farm Eggs", "Monthly Surprise"],
        spots: 5,
        popular: true,
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link 
        href="/browse" 
        className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
              <Image 
                src={farm.image} 
                alt={farm.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute top-6 right-6 flex gap-3">
                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-primary">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-red-500">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {farm.tags.map(tag => (
                <span key={tag} className="bg-secondary/30 text-primary-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-5xl font-bold text-primary mb-4">{farm.name}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-foreground/60 mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                {farm.location}
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-bold text-foreground">{farm.rating}</span>
                <span>({farm.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-medium">Top Rated Farm 2024</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/70 leading-relaxed">
              <p>{farm.description}</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-bold text-primary mb-8">Choose a Harvest Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farm.activePlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-[2rem] border ${plan.popular ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'border-foreground/10 bg-white'} shadow-sm relative overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-primary">${plan.price}</span>
                    <span className="text-foreground/40 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-foreground/60 text-sm mb-6 leading-relaxed">
                    {plan.desc}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {plan.includes.map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs font-bold text-orange-600 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Only {plan.spots} spots left!
                    </div>
                    <button className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${plan.popular ? 'bg-accent text-primary shadow-lg shadow-accent/20' : 'bg-primary text-white'}`}>
                      Subscribe
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-28">
            <h3 className="font-display text-2xl font-bold mb-6">Farmer's Note</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent">
                <Image src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=200" alt="Farmer" fill className="object-cover" />
              </div>
              <div>
                <div className="font-bold">Thomas Miller</div>
                <div className="text-secondary/60 text-xs">Head Farmer</div>
              </div>
            </div>
            <p className="text-secondary/80 text-sm leading-relaxed mb-8 italic">
              "The spring rain has been wonderful this year. The tomatoes are looking better than ever. We can't wait to share this harvest with you!"
            </p>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4 text-sm">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Next Harvest</div>
                  <div className="font-bold">May 15th, 2024</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Package className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Delivery Area</div>
                  <div className="font-bold">Within 50 miles</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 bg-white text-primary py-4 rounded-2xl font-bold hover:bg-secondary transition-all">
              Message Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
