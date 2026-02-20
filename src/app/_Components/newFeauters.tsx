"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Video,
  MessageCircle,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Sparkles,
  Users,
} from "lucide-react";

export default function NewFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "HD Video Calls",
      description: "Crystal-clear video consultations directly in the app",
      highlights: ["Screen sharing", "Record sessions", "Group calls"],
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Realtime Chat",
      description: "Instant messaging with file sharing & voice notes",
      highlights: ["File sharing", "Voice messages", "Read receipts"],
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Collaboration",
      description: "Work together in real-time with shared whiteboards",
      highlights: ["Whiteboard", "Document edit", "Live annotations"],
      color: "from-purple-500 to-pink-500",
      delay: 0.3,
    },
  ];

  const benefits = [
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Save 40% time with instant communication",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "End-to-end encrypted for complete privacy",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Connect from anywhere, on any device",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            New Feature Alert
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Connect in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
              Real-Time
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Introducing video calls and instant messaging—communicate directly
            with professionals without leaving the platform.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 h-full">
                {/* Floating icon */}
                <div className="absolute -top-4 left-8">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>

                  <div className="space-y-3">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent group-hover:via-blue-500 to-transparent transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Mockup/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Mock browser window */}
              <div className="p-4 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Video call mockup */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Main video */}
                  <div className="col-span-2 aspect-video rounded-xl bg-gradient-to-br from-blue-900 to-cyan-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-white font-semibold">
                        Live Video Call
                      </div>
                      <div className="text-cyan-300 text-sm">00:24:18</div>
                    </div>
                  </div>

                  {/* Participant thumbnails */}
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
                    >
                      <div className="text-cyan-300">Participant {i}</div>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Chat sidebar */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gray-900 border-l border-gray-700 p-4 hidden md:block">
                <div className="text-white font-semibold mb-4">Chat</div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg ${i === 2 ? "bg-blue-900/30" : "bg-gray-800"}`}
                    >
                      <div className="text-sm text-gray-300">
                        Message {i}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Seamless Communication Experience
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                  }
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-gray-700 text-lg">{benefit.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3">
                Available Now for All Users
              </h4>
              <p className="text-gray-600 mb-4">
                No additional fees. Start using video calls and chat with your
                next booking.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-blue-200">
                  Free to use
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-blue-200">
                  No time limits
                </span>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-blue-200">
                  All devices
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Connect Live?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Experience the future of professional communication. Try video
              calls and chat on your next appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Try Video Call Demo
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
