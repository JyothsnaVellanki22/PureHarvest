"use client";

import React from "react";
import { 
  Plus, 
  Users, 
  TrendingUp, 
  Package, 
  MessageSquare, 
  LayoutDashboard, 
  Sprout, 
  Settings,
  Bell,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FarmerDashboard() {
  const stats = [
    { title: "Total Subscribers", value: "284", change: "+15%", icon: Users, color: "bg-blue-100 text-blue-700" },
    { title: "Monthly Revenue", value: "₹4,12,500", change: "+12%", icon: TrendingUp, color: "bg-green-100 text-green-700" },
    { title: "Active Plans", value: "8", change: "0", icon: Sprout, color: "bg-orange-100 text-orange-700" },
    { title: "Pending Deliveries", value: "42", change: "+5", icon: Package, color: "bg-purple-100 text-purple-700" },
  ];

  const recentUpdates = [
    { id: 1, title: "Chili Drying Process Started", time: "2 hours ago", status: "Posted" },
    { id: 2, title: "Paddy Harvest Timeline", time: "Yesterday", status: "Draft" },
    { id: 3, title: "Turmeric Batch 04 Update", time: "3 days ago", status: "Posted" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary mb-2">Rythu Dashboard</h1>
          <p className="text-foreground/60">Manage your farm, plans, and connect with your subscribers.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-foreground/10 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-secondary/20 transition-all">
            <Bell className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
            <Plus className="w-4 h-4" />
            Create New Plan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-foreground/5 shadow-premium"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-2xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : stat.change === '0' ? 'text-gray-400' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-foreground/40 font-medium">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Plans & Orders */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-foreground/5 rounded-[2.5rem] shadow-premium overflow-hidden">
            <div className="p-8 border-b border-foreground/5 flex justify-between items-center">
              <h2 className="font-display text-2xl font-bold text-primary">Active Harvest Plans</h2>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-foreground/5">
              {[
                { name: "Premium Red Chili Plan", subs: 76, capacity: 80, price: "₹16,999", status: "Active" },
                { name: "Paddy Harvest Sponsorship", subs: 28, capacity: 30, price: "₹5,999", status: "Active" },
                { name: "Organic Turmeric Batch", subs: 50, capacity: 50, price: "₹2,499", status: "Sold Out" },
              ].map((plan, i) => (
                <div key={i} className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-secondary/5 transition-all">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="bg-secondary/30 p-3 rounded-2xl">
                      <Sprout className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">{plan.name}</div>
                      <div className="text-foreground/40 text-sm">{plan.subs} / {plan.capacity} Subscribers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="font-bold text-primary">{plan.price}</div>
                      <div className="text-[10px] uppercase font-black text-foreground/30 tracking-widest">Per Season</div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      plan.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {plan.status}
                    </span>
                    <button className="p-2 text-foreground/40 hover:text-primary transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-foreground/5 rounded-[2.5rem] shadow-premium p-8">
            <h2 className="font-display text-2xl font-bold text-primary mb-8">Harvest Progress</h2>
            <div className="space-y-8">
              {[
                { crop: "Red Chilies", progress: 85, color: "bg-red-500", date: "Harvest in 4 days" },
                { crop: "Organic Paddy", progress: 60, color: "bg-yellow-500", date: "Harvest in 12 days" },
                { crop: "Heritage Turmeric", progress: 95, color: "bg-orange-500", date: "Ready to harvest" },
              ].map((crop, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="font-bold text-lg">{crop.crop}</div>
                      <div className="text-xs text-foreground/40">{crop.date}</div>
                    </div>
                    <div className="font-display font-bold text-primary">{crop.progress}%</div>
                  </div>
                  <div className="h-3 bg-secondary/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${crop.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${crop.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Updates & Feedback */}
        <div className="space-y-8">
          <div className="bg-primary text-white p-8 rounded-[2.5rem] shadow-xl">
            <h3 className="font-display text-2xl font-bold mb-6">Subscriber Updates</h3>
            <div className="space-y-6">
              {recentUpdates.map((update) => (
                <div key={update.id} className="flex gap-4">
                  <div className="bg-white/10 p-2 h-fit rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{update.title}</div>
                    <div className="text-white/40 text-xs mt-1">{update.time} • {update.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 bg-accent text-primary py-4 rounded-2xl font-bold hover:bg-accent-hover transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Post Update
            </button>
          </div>

          <div className="bg-white border border-foreground/5 p-8 rounded-[2.5rem] shadow-premium">
            <h3 className="font-display text-xl font-bold text-primary mb-6">Recent Feedback</h3>
            <div className="space-y-6">
              {[
                { user: "Sarah J.", comment: "The tomatoes last week were incredible! Best I've ever had.", rating: 5 },
                { user: "Mark D.", comment: "Everything was super fresh. Loving the subscription.", rating: 5 },
              ].map((review, i) => (
                <div key={i} className="pb-6 border-b border-foreground/5 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-sm">{review.user}</div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/60 text-xs leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
