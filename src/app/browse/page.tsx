"use client";

import React, { useState } from "react";
import { Search, MapPin, Grid2X2, Map, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FarmCard from "@/components/farm/FarmCard";
import { ALL_FARMS, CROP_CATEGORIES, LOCATIONS } from "@/lib/data";

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredFarms = ALL_FARMS.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          farm.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || 
                            farm.category === selectedCategory || 
                            farm.tags.includes(selectedCategory);
    
    const matchesLocation = selectedLocation === "All" || farm.district === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Direct from local producers
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl lg:text-6xl font-bold text-primary mb-6 text-balance"
            >
              Explore the <span className="text-accent italic">Purest</span> Harvests
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-foreground/60 text-lg max-w-xl"
            >
              Discover premium harvests across Andhra Pradesh and Telangana. 
              Filter by location to find the freshest produce in your district.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="space-y-10">
            {/* Search */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </h3>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Farm or crop..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-card border border-border rounded-2xl w-full focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Grid2X2 className="w-5 h-5" />
                Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {CROP_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                        : "bg-card border border-border text-foreground/60 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
                <Map className="w-5 h-5" />
                Location
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                      selectedLocation === loc
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                        : "bg-card border border-border text-foreground/60 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Farms Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40">
                {filteredFarms.length} Results Found
              </h2>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredFarms.map((farm) => (
                  <motion.div
                    key={farm.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FarmCard {...farm} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredFarms.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-card rounded-[3rem] border border-dashed border-border"
              >
                <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <MapPin className="w-12 h-12 text-primary/20" />
                </div>
                <h3 className="font-display text-3xl font-bold text-primary mb-3">No farms matching</h3>
                <p className="text-foreground/60 max-w-sm mx-auto text-lg">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => { setSelectedCategory("All"); setSelectedLocation("All"); setSearchQuery(""); }}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
