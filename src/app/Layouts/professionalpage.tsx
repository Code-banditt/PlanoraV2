import Image from "next/image";

import { motion } from "framer-motion";

import PlanoraHead from "../_Components/professionalheader";
import { ArrowUpRight, Sparkles, ShieldCheck, CheckCircle } from "lucide-react";
import ProFeatures from "../_Components/stepsProf";
import TestimonialCarousel from "../_Components/testimonial";
import Link from "next/link";
import Footer from "../_Components/whychoose";

export default function ProfessionalPage() {
  return (
    <>
      <main className="min-h-screen relative bg-white flex flex-col py-4">
        {/* Header */}
        <PlanoraHead />

        {/* Hero section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#fafafa] py-20">
          {/* 1. The "Pattern" - Abstract background shapes for depth */}
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
          </div>

          <div className="container mx-auto px-6 max-w-7xl">
            <div className="relative flex flex-col lg:flex-row items-center gap-16">
              {/* Left Side: Sophisticated Content */}
              <div className="z-10 w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/5 border border-blue-600/10 mb-6">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                      Business Intelligence
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-7xl xl:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight">
                    Your Time. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                      Perfectly <br /> Orchestrated.
                    </span>
                  </h1>

                  <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
                    Planora gives you the surgical precision to manage,
                    reschedule, or reject appointments without the
                    back-and-forth noise.
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/Dashboard"
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200"
                    >
                      Enter Dashboard
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
                    </Link>

                    <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-semibold text-slate-600">
                        Secure & Encrypted
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: The "Floating Glass" Image Effect */}
              <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative group"
                >
                  {/* Decorative Frame */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />

                  <div className="relative bg-white p-4 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-md">
                    <Image
                      src="/imgs/designer2.png"
                      alt="Management Interface"
                      width={550}
                      height={550}
                      className="rounded-[2rem] object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      priority
                    />

                    {/* Floating UI Badges */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-slate-400 font-bold">
                            New Booking
                          </p>
                          <p className="text-sm font-bold text-slate-800">
                            Confirmed
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Appointments with negative margin to overlap */}

        {/* Steps section */}
        <div className="max-w-7xl mx-auto px-12 py-10">
          <ProFeatures />
        </div>

        {/* Steps for Professionals */}
        <TestimonialCarousel />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="container mx-auto px-8  flex flex-col justify-center items-center leading-relaxed"
        >
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
