"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight, Sprout } from "lucide-react";
import { motion } from "framer-motion";

interface FarmCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  tags: string[];
  plansCount: number;
}

const FarmCard = ({ id, name, location, rating, image, tags, plansCount }: FarmCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-card rounded-2xl overflow-hidden shadow-premium group border border-border"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-foreground">{name}</h3>
          <div className="flex items-center gap-1 text-sm font-bold text-accent">
            <Star className="w-4 h-4 fill-accent" />
            {rating}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-foreground/40 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {location}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <Sprout className="w-4 h-4" />
            {plansCount} active plans
          </div>
          <Link
            href={`/farm/${id}`}
            className="flex items-center gap-1 text-primary font-bold text-sm group/btn"
          >
            View Farm
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FarmCard;
