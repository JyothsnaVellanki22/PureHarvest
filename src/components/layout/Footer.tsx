import React from "react";
import Link from "next/link";
import { Sprout, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#DDF2E4] text-primary/80 pt-16 pb-8 px-6 border-t border-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="text-primary w-6 h-6" />
            <span className="font-display text-2xl font-bold tracking-tight text-primary">
              PureHarvest
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs text-primary/60">
            Connecting you directly with the roots. PureHarvest is a platform
            dedicated to transparent, sustainable, and direct farm-to-consumer
            supply chains.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Social icons removed due to missing exports in lucide-react */}
          </div>
        </div>

        <div>
          <h4 className="text-primary font-bold mb-6 tracking-tight">Platform</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/browse" className="hover:text-primary-dark transition-colors">Browse Farms</Link></li>
            <li><Link href="/plans" className="hover:text-primary-dark transition-colors">Harvest Plans</Link></li>
            <li><Link href="/farmer" className="hover:text-primary-dark transition-colors">Become a Farmer</Link></li>
            <li><Link href="/gift" className="hover:text-primary-dark transition-colors">Gift a Harvest</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-primary font-bold mb-6 tracking-tight">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-primary-dark transition-colors">Our Mission</Link></li>
            <li><Link href="/sustainability" className="hover:text-primary-dark transition-colors">Sustainability</Link></li>
            <li><Link href="/journal" className="hover:text-primary-dark transition-colors">Farm Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-primary font-bold mb-6 tracking-tight">Newsletter</h4>
          <p className="text-xs mb-4 text-primary/60">Get updates on seasonal harvests and new farms.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/50 border border-primary/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary/30 transition-colors placeholder:text-primary/30"
            />
            <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-primary/40 uppercase tracking-widest font-bold">
        <p>© 2026 PureHarvest. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
