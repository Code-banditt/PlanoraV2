"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Leslie Alexander",
    role: "Fitness Enthusiast",
    content:
      "Booking a fitness coach through Planora was seamless. I scheduled my sessions in minutes and the experience has been fantastic.",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
  },
  {
    name: "Jacob Jones",
    role: "Marketing Lead",
    content:
      "The accuracy of the reviews is what stands out. Effortless booking for professional services.",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
  },
  {
    name: "Jenny Wilson",
    role: "Photographer",
    content:
      "Simple, professional, and business-growing. Planora is a game changer for freelancers.",
    avatar:
      "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
  },
];

const Reviews = () => {
  return (
    <section className="relative py-12 md:py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-100/40 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="container relative px-5 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold text-blue-700 rounded-full bg-blue-50 ring-1 ring-blue-700/10 uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" />
            <span>Trusted Community</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            What our clients{" "}
            <span className="italic font-serif text-blue-600">actually</span>{" "}
            say.
          </h2>
        </div>

        {/* CORE FIX: 
            - Mobile: Single column (flex flex-col)
            - Tablet/Desktop: Grid with 12 columns
        */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Main Card: Full width on mobile, 8/12 on desktop */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-8 md:row-span-2 relative p-6 md:p-12 overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-2xl flex flex-col justify-between min-h-[350px] md:min-h-[500px]"
          >
            <Quote className="absolute top-[-10px] right-[-10px] w-32 h-32 text-white/5 rotate-12" />

            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xl md:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight">
                &ldquo;{reviews[0].content}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4 mt-10 relative z-10">
              <Image
                src={reviews[0].avatar}
                alt=""
                width={64}
                height={64}
                className="rounded-2xl ring-2 ring-slate-700 w-12 h-12 md:w-16 md:h-16"
              />
              <div>
                <h4 className="text-lg font-bold">{reviews[0].name}</h4>
                <p className="text-slate-400 text-sm">{reviews[0].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Blue Card: Full width on mobile, 4/12 on desktop */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-4 p-6 md:p-8 bg-blue-600 rounded-[2rem] shadow-xl text-white flex flex-col justify-between min-h-[250px]"
          >
            <p className="text-lg font-medium italic leading-relaxed">
              &ldquo;{reviews[2].content}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-8">
              <Image
                src={reviews[2].avatar}
                alt=""
                width={44}
                height={44}
                className="rounded-full ring-2 ring-blue-400 w-10 h-10"
              />
              <div>
                <p className="text-sm font-bold">{reviews[2].name}</p>
                <p className="text-xs text-blue-100">{reviews[2].role}</p>
              </div>
            </div>
          </motion.div>

          {/* White Card: Full width on mobile, 4/12 on desktop */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-4 p-6 md:p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col justify-between min-h-[250px]"
          >
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-blue-600 text-blue-600"
                  />
                ))}
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                &ldquo;{reviews[1].content}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <Image
                src={reviews[1].avatar}
                alt=""
                width={40}
                height={40}
                className="rounded-full ring-1 ring-slate-200 w-10 h-10"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {reviews[1].name}
                </p>
                <p className="text-xs text-slate-500">{reviews[1].role}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee - Simplified Mobile Logic */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee py-2">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="text-xl md:text-2xl font-black text-slate-200 mx-8 uppercase tracking-widest"
                >
                  #PlanoraCommunity
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Reviews;
