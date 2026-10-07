"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sprout, Menu, X, User, ShoppingBasket, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Browse Farms", href: "/browse" },
    { name: "About Us", href: "/about" },
    { name: "Rythu Portal", href: "/farmer" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass py-3 shadow-premium" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Sprout className="text-white w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            PureHarvest
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors text-foreground/70 hover:text-primary"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button className="p-2 hover:bg-secondary/50 rounded-full transition-colors relative">
            <ShoppingBasket className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
          </button>
          <Link
            href="/login"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass shadow-2xl p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground py-2 border-b border-foreground/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <Link
                href="/login"
                className="w-full text-center bg-primary text-white py-3 rounded-xl font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
