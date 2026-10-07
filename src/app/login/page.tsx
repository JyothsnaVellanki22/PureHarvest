"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sprout, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent, role: 'customer' | 'farmer') => {
    e.preventDefault();
    // Mock login
    if (role === 'farmer') {
      router.push("/farmer");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 bg-secondary/10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-primary/5 p-12 border border-foreground/5"
      >
        <div className="text-center mb-10">
          <div className="inline-flex bg-primary p-3 rounded-2xl mb-6">
            <Sprout className="text-white w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-foreground/40 text-sm">Choose your portal to continue</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full pl-12 pr-6 py-4 bg-secondary/20 border-none rounded-2xl focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 bg-secondary/20 border-none rounded-2xl focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button 
              onClick={(e) => handleLogin(e, 'customer')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Sign In as Customer
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => handleLogin(e, 'farmer')}
              className="w-full bg-white border-2 border-primary text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/20 transition-all"
            >
              Sign In as Farmer
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-foreground/5 text-center">
          <p className="text-sm text-foreground/40">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Join the harvest
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
