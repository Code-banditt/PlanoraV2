"use client";

import React from "react";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Pricing = () => {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for freelancers just getting started.",
      features: ["Up to 50 bookings/mo", "Basic Analytics", "Email Support"],
      cta: "Start for Free",
      highlight: false,
    },
    {
      name: "Professional",
      price: "$29",
      description: "Everything you need to scale your business.",
      features: [
        "Unlimited Bookings",
        "Custom Branding",
        "Team Management",
        "Priority Support",
        "API Access",
      ],
      cta: "Get Started",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "Advanced security and dedicated support.",
      features: [
        "Custom Contracts",
        "SAML SSO",
        "Dedicated Manager",
        "Unlimited Teams",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Plans that grow with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[2.5rem] transition-all ${
                tier.highlight
                  ? "bg-slate-900 text-white shadow-2xl scale-110 z-10 border-4 border-indigo-500"
                  : "bg-white text-slate-900 shadow-sm border border-slate-200"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-xl font-medium opacity-70">
                    /mo
                  </span>
                </div>
                <p
                  className={`mt-4 text-sm ${tier.highlight ? "text-slate-400" : "text-slate-500"}`}
                >
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check
                      className={`w-5 h-5 ${tier.highlight ? "text-indigo-400" : "text-indigo-600"}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  tier.highlight
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
