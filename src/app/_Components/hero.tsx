"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Star, Zap, ChevronDown } from "lucide-react";
import { useRef } from "react";

import PlanoraHeader from "./userheader";

export default function LandingHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: Image moves slightly slower than the scroll
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      // Changed: min-h-[115vh] creates that "slightly bigger than screen" feel
      className="bg-gradient-to-b from-blue-950 via-indigo-950 to-blue-900 relative overflow-hidden min-h-[115vh] flex flex-col"
    >
      <PlanoraHeader />

      <section className="flex-1 flex items-center relative z-10 pt-20 pb-32 lg:py-0">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 backdrop-blur-md rounded-full border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-300 mr-2" />
                <span className="text-xs font-black tracking-[0.2em] text-cyan-300 uppercase">
                  Premium Professional Network
                </span>
              </div>

<h1 className="text-5xl sm:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tighter text-white">
  <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent animate-gradient">
    Elevate Your
  </span>
  <span className="text-white">Workflow.</span>
</h1>

<p className="text-lg lg:text-2xl text-cyan-100/60 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
  Connect with vetted experts and manage your appointments with
  the worlds most intuitive platform.
</p>

<div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
  <Link
    href="/findProfessional"
    className="group relative px-10 py-5 bg-amber-400 text-gray-900 font-black rounded-2xl hover:bg-amber-300 transition-all flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.3)]"
  >
    <Zap className="w-5 h-5 mr-2 fill-current" />
    <span className="relative z-10">Find Your Pro</span>
  </Link>
  <Link
    href="/explore"
    className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all"
  >
    Browse Services
  </Link>
</div>
            </motion.div>

            {/* Right Column: Parallax Image */}
            <motion.div
              style={{ y: yImage, opacity: opacityFade }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center items-center h-full"
            >
              <div className="relative w-full max-w-2xl">
                {/* Image Container with Custom Aspect Ratio for the "Stretch" */}
                <div className="relative  overflow-hidden  group transform  hover:rotate-0 transition-transform duration-700">
                  <Image
                    src="/imgs/freepik1.jpeg"
                    alt="Expert"
                    width={1000}
                    height={400}
                    className="w-full h-auto min-h-[40vh] object-cover scale-100 group-hover:scale-100 transition-transform duration-1000"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-60" />

                  {/* Floating Content inside Image */}
                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20">
                      <p className="text-white font-bold">Verified Expert</p>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Glows */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 blur-[100px] -z-10 rounded-full animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/20 blur-[100px] -z-10 rounded-full animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: opacityFade }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-cyan-400/50 text-[10px] uppercase tracking-[0.3em] font-bold">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="text-cyan-400/50" />
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .animate-gradient {
          background-size: 200% auto;
          animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}
