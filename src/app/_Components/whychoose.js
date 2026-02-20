"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default function PlanoraFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Find Pros", href: "/findProfessional" },
      { name: "Dashboard", href: "/Dashboard" },
      { name: "Become a Pro", href: "/FormPage" },
      { name: "Pricing", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Contact", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#050A18] relative overflow-hidden pt-24 pb-12 border-t border-white/5 w-full">
      {/* Decorative Background Element (Echoing the Hero Slant) */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-[35deg] pointer-events-none"
        style={{ transformOrigin: "top right" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black text-xl">P</span>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Planora
              </span>
            </Link>

            <p className="text-blue-100/50 text-lg max-w-sm leading-relaxed font-medium">
              Elevating the professional landscape through seamless connections
              and elite-level workflow management.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-cyan-500 hover:text-black transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] italic">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group text-blue-100/40 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        {link.name}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-blue-100/30 text-xs font-bold tracking-widest uppercase">
            © {currentYear} Planora Network. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">
                System Operational
              </span>
            </div>
            <p className="text-blue-100/30 text-[10px] font-black uppercase tracking-widest">
              Designed for Excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
