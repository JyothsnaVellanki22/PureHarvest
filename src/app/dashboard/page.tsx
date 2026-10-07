"use client";

import React from "react";
import { 
  ShoppingBag, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Settings, 
  ChevronRight,
  Sprout,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CustomerDashboard() {
  const subscriptions = [
    {
      id: "s1",
      farm: "Oakhaven Organics",
      plan: "Summer Vegetable Box",
      status: "Active",
      nextDelivery: "May 15, 2024",
      price: "$45.00",
      image: "/hero.png",
    },
    {
      id: "s2",
      farm: "Sunrise Valley Farms",
      plan: "Fresh Eggs Weekly",
      status: "Paused",
      nextDelivery: "Resume in June",
      price: "$12.00",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=200",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary mb-2">Welcome back, Jessica</h1>
          <p className="text-foreground/60">You have 1 delivery arriving this week.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-foreground/10 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-secondary/20 transition-all">
            <Settings className="w-4 h-4" />
            Manage Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-primary text-white p-6 rounded-[2rem] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Sprout className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Sustainability Impact</span>
            </div>
            <div className="text-4xl font-bold mb-2">124kg</div>
            <p className="text-secondary/60 text-xs leading-relaxed">
              Organic waste diverted and local soil health supported through your subscriptions.
            </p>
          </div>

          <div className="bg-white border border-foreground/5 p-6 rounded-[2rem] shadow-premium">
            <div className="flex items-center gap-3 mb-4 text-foreground/40">
              <CreditCard className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Spending</span>
            </div>
            <div className="text-3xl font-bold text-primary">$157.00</div>
            <p className="text-foreground/40 text-xs mt-1">Total this month</p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="lg:col-span-3 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-bold text-primary">Active Subscriptions</h2>
              <Link href="/browse" className="text-accent text-sm font-bold flex items-center gap-1">
                Browse more farms <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <motion.div
                  key={sub.id}
                  whileHover={{ x: 5 }}
                  className="bg-white border border-foreground/5 p-4 md:p-6 rounded-3xl shadow-premium flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="relative w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <Image src={sub.image} alt={sub.farm} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-primary">{sub.farm}</h3>
                        <p className="text-foreground/60 text-sm">{sub.plan}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <Calendar className="w-4 h-4 text-accent" />
                        Next: {sub.nextDelivery}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <Clock className="w-4 h-4 text-accent" />
                        Weekly
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/60">
                        <MapPin className="w-4 h-4 text-accent" />
                        Home Delivery
                      </div>
                      <div className="text-right font-bold text-primary">
                        {sub.price}
                      </div>
                    </div>
                  </div>
                  <button className="p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-all">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-primary mb-6">Recent Deliveries</h2>
            <div className="bg-white border border-foreground/5 rounded-[2rem] shadow-premium overflow-hidden">
              {[
                { date: "May 8, 2024", farm: "Oakhaven Organics", items: "8 items", status: "Delivered" },
                { date: "May 1, 2024", farm: "Oakhaven Organics", items: "7 items", status: "Delivered" },
                { date: "Apr 24, 2024", farm: "Sunrise Valley Farms", items: "12 eggs", status: "Delivered" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-b border-foreground/5 last:border-0 hover:bg-secondary/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.farm}</div>
                      <div className="text-foreground/40 text-xs">{item.date} • {item.items}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600">Successfully Delivered</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Minimal Link stub if it's not imported correctly (though it should be from next/link)
import Link from "next/link";
