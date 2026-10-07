"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Calendar, User, ArrowRight, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JOURNAL_POSTS = [
  {
    id: 1,
    title: "The Golden Harvest of Nizamabad",
    excerpt: "Farmer Venkatesh shares his journey of transitioning his family's 10-acre land to 100% natural turmeric cultivation.",
    author: "Venkatesh Rao",
    date: "Oct 12, 2023",
    image: "/images/turmeric.png",
    category: "Farmer Story",
    testimony: "Before PureHarvest, I was at the mercy of middlemen. Now, I see my turmeric reaching families in Hyderabad and beyond, and the pride in my children's eyes is my true harvest."
  },
  {
    id: 2,
    title: "Red Diamonds: The Guntur Chili Story",
    excerpt: "How the drying process in Guntur defines the world-famous heat and flavor of the Teja chili variety.",
    author: "Lakshmi Devi",
    date: "Sep 28, 2023",
    image: "/images/guntur-chili.jpg",
    category: "Harvest Insight",
    testimony: "People only see the spice, but we see the sweat. This year, the support from harvest sponsors allowed us to install solar dryers, preserving the color and flavor perfectly."
  },
  {
    id: 3,
    title: "Paddy and Prosperity",
    excerpt: "A deep dive into the Krishna Valley's traditional rice varieties and why heritage grains are making a comeback.",
    author: "Anji Reddy",
    date: "Sep 15, 2023",
    image: "/images/indian-paddy.jpg",
    category: "Traditional Grains",
    testimony: "Growing Sona Masuri with organic compost has not only improved the taste but also restored the earth. My neighbors are now following my path."
  }
];

export default function JournalPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="inline-block bg-accent/20 text-accent-hover font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6">
            Farm Journal
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            Stories from the <br />
            <span className="text-secondary">Heart of the Field.</span>
          </h1>
          <p className="text-foreground/60 text-xl leading-relaxed">
            A window into the lives, traditions, and innovations of the Rythus who sustain us. Read about the passion behind every harvest.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="group relative"
        >
          <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl mb-8">
            <Image
              src={JOURNAL_POSTS[0].image}
              alt={JOURNAL_POSTS[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-foreground">
              {JOURNAL_POSTS[0].category}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-6 text-sm text-foreground/40 mb-4 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {JOURNAL_POSTS[0].date}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {JOURNAL_POSTS[0].author}
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 group-hover:text-secondary transition-colors">
              {JOURNAL_POSTS[0].title}
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed mb-8">
              {JOURNAL_POSTS[0].excerpt}
            </p>
            <div className="bg-secondary/10 p-8 rounded-[2.5rem] border-l-4 border-secondary mb-8 italic">
              <Quote className="w-8 h-8 text-secondary mb-4 opacity-50" />
              <p className="text-foreground font-medium leading-relaxed">
                {JOURNAL_POSTS[0].testimony}
              </p>
            </div>
            <button className="flex items-center gap-2 text-foreground font-bold hover:gap-3 transition-all underline decoration-accent decoration-2 underline-offset-8">
              Read Full Story <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* List of Other Posts */}
        <div className="space-y-12">
          {JOURNAL_POSTS.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col sm:flex-row gap-8 group"
            >
              <div className="relative w-full sm:w-48 aspect-square rounded-3xl overflow-hidden shadow-lg shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold text-accent mb-2 uppercase tracking-widest">{post.category}</span>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-foreground/60 text-sm mb-4 line-clamp-2 italic">"{post.testimony}"</p>
                <div className="flex items-center gap-4 text-xs text-foreground/40 font-medium">
                   <span>{post.author}</span>
                   <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                   <span>{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-8 mt-8 border-t border-foreground/5">
            <h4 className="font-display text-2xl font-bold text-foreground mb-6">Want to share your story?</h4>
            <p className="text-foreground/60 mb-8">If you're a Rythu and want to share your journey with our community, we'd love to hear from you.</p>
            <Link 
              href="/farmer" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
            >
              Join the Movement <Sprout className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
