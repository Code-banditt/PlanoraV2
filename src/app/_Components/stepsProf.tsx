"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BarChart3,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function ProFeatures() {
  const features = [
    {
      title: "Real-time Appointment Tracking",
      description:
        "A live-syncing calendar that updates the second a client books. No more double bookings or manual entries.",
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      tag: "Live Sync",
      color: "bg-blue-50",
    },
    {
      title: "Smart Client CRM",
      description:
        "Every client has a story. Track service history, preferences, and private notes in one secure place.",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      tag: "Retention",
      color: "bg-indigo-50",
    },
    {
      title: "Growth Analytics",
      description:
        "Visualize your revenue and booking trends with heatmaps and automated monthly performance reports.",
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
      tag: "Insights",
      color: "bg-emerald-50",
    },
    {
      title: "Automated Reminders",
      description:
        "Reduce no-shows by 40% with automated SMS and email reminders tailored to your brand voice.",
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      tag: "Automation",
      color: "bg-orange-50",
    },
    {
      title: "Secure Payments",
      description:
        "Integrate Stripe or PayPal to take deposits or full payments upfront. Guaranteed payout protection.",
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      tag: "Financials",
      color: "bg-purple-50",
    },
    {
      title: "Waitlist Management",
      description:
        "Fully booked? Let Planora manage your waitlist and automatically notify clients when a spot opens.",
      icon: <Clock className="w-6 h-6 text-rose-600" />,
      tag: "Optimization",
      color: "bg-rose-50",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Text */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">
            Powerful Infrastructure
          </h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight max-w-2xl leading-tight">
            Built for those who take their{" "}
            <span className="underline decoration-blue-500 underline-offset-8">
              business seriously.
            </span>
          </p>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2rem] bg-[#fdfdfd] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300"
            >
              {/* Feature Icon & Tag */}
              <div className="flex items-center justify-between mb-8">
                <div
                  className={`p-4 rounded-2xl ${feature.color} transition-transform group-hover:scale-110 duration-300`}
                >
                  {feature.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  {feature.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>

              {/* Subtle Decorative Element */}
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-1 bg-blue-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Features */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-white mb-2">
              Need a custom workflow?
            </h4>
            <p className="text-slate-400">
              Our Enterprise team can build bespoke integrations for your
              agency.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}
