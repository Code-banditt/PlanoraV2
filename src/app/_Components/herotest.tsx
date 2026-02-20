"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Video, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -z-10 rounded-bl-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-6 leading-[0.95] tracking-tighter">
              #1 Scheduling Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              The world&apos;s most <br />
              loved{" "}
              <span className="text-blue-600 leading-[0.95] tracking-tighter">
                scheduling solution.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
              Experience why more than 1 million professionals trust Planora to
              manage their appointments and grow their business.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200/50">
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 font-bold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-600 hover:text-blue-600">
                Explore Solution
              </button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={`https://randomuser.me/api/portraits/thumb/men/${i + 20}.jpg`}
                    alt="User"
                    width={40}
                    height={40}
                  />
                ))}
              </div>
              <div className="text-sm font-medium">
                <p className="text-slate-900">More than 100k+</p>
                <p className="text-slate-500">Professionals on our door</p>
              </div>
              <div className="flex items-center text-sm font-medium ml-6">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image & Floating UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Professional Image */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
                alt="Professional Woman"
                width={600}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Floating Video Call UI */}
            <div className="absolute top-8 right-8 z-20 bg-white p-3 rounded-2xl shadow-lg animate-float">
              <div className="relative rounded-xl overflow-hidden w-32 h-24">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
                  alt="Client on video call"
                  width={128}
                  height={96}
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 p-1 rounded-full">
                  <Video className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Floating Features List */}
            <div className="absolute bottom-12 -left-12 z-20 bg-white p-6 rounded-[2rem] shadow-xl animate-float-delayed hidden lg:block">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </span>
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm font-medium text-slate-600">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </span>
                  24/7 Virtual Consultation
                </li>
                <li className="flex items-center text-sm font-medium text-slate-600">
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  </span>
                  Secure Client Directory
                </li>
                <li className="flex items-center text-sm font-medium text-slate-600">
                  <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  </span>
                  Integrated Payments
                </li>
              </ul>
              {/* Call Actions */}
              <div className="mt-6 flex justify-center space-x-4">
                <button className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-200">
                  <Phone className="w-5 h-5 rotate-[135deg]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
