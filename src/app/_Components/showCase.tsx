"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  Shield,
  Zap,
  Award,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Lightbulb,
  Handshake,
} from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
  const team = [
    {
      name: "Alex Morgan",
      role: "CEO & Founder",
      description:
        "Former tech executive with 15+ years in platform development",
      expertise: "Platform Strategy & Innovation",
      avatarColor: "from-blue-500 to-cyan-500",
    },
    {
      name: "Sarah Chen",
      role: "Head of Operations",
      description:
        "Expert in service industry operations and quality assurance",
      expertise: "Operations & Quality Control",
      avatarColor: "from-emerald-500 to-teal-500",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      description: "Led engineering teams at multiple successful startups",
      expertise: "Technology & Infrastructure",
      avatarColor: "from-purple-500 to-pink-500",
    },
    {
      name: "Priya Sharma",
      role: "Head of Community",
      description: "Built thriving professional communities across industries",
      expertise: "Community & Partnerships",
      avatarColor: "from-amber-500 to-orange-500",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Founded",
      description:
        "Planora was born to solve professional discovery challenges",
    },
    {
      year: "2023",
      title: "10K Professionals",
      description: "Reached milestone of 10,000 verified professionals",
    },
    {
      year: "2023",
      title: "Series A",
      description: "Raised $15M to expand operations nationwide",
    },
    {
      year: "2024",
      title: "50+ Categories",
      description: "Expanded service offerings to 50+ professional categories",
    },
    {
      year: "2024",
      title: "200k+ Users",
      description: "Community grew to over 200,000 satisfied customers",
    },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Safety",
      description:
        "Every professional is thoroughly vetted and background-checked",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Efficiency",
      description:
        "Streamlined processes that save time for both clients and professionals",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer First",
      description: "Every decision is made with customer satisfaction in mind",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Accessibility",
      description:
        "Making professional services accessible to everyone, everywhere",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description:
        "Committed to delivering exceptional quality in every interaction",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth",
      description:
        "Creating opportunities for professionals to grow their businesses",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  const stats = [
    { value: "10K+", label: "Verified Professionals", icon: <Users /> },
    { value: "200k+", label: "Happy Customers", icon: <Heart /> },
    { value: "50+", label: "Service Categories", icon: <Award /> },
    { value: "4.9", label: "Average Rating", icon: <Star /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">
                OUR STORY
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500">
                Planora
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              We are revolutionizing how people connect with professionals.
              Founded in 2022, Planora bridges the gap between skilled
              professionals and those who need their expertise, creating
              meaningful connections that transform lives and businesses.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  OUR MISSION
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  To connect people with exceptional professionals
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe everyone deserves access to top-quality
                  professional services. Our mission is to create a platform
                  where finding the right expert is simple, transparent, and
                  reliable.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                  <span className="text-gray-700">
                    Democratize access to professional services
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                  <span className="text-gray-700">
                    Empower skilled professionals to grow their businesses
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                  <span className="text-gray-700">
                    Build trust through transparency and quality assurance
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-purple-600 text-sm font-semibold mb-4">
                  <Lightbulb className="w-4 h-4" />
                  OUR VISION
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  A world where expertise is accessible to all
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We envision a future where geographical boundaries dont limit
                  access to quality services, and professionals can thrive by
                  sharing their skills with a global community.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-6xl text-gray-300 mb-6"></div>
                <p className="text-lg text-gray-700 italic mb-6">
                  Our goal is to create the most trusted ecosystem for
                  professional services, where every interaction creates value
                  and builds lasting relationships.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Alex Morgan
                    </div>
                    <div className="text-sm text-gray-600">CEO & Founder</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at Planora
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <div className={value.color}>{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-gray-50 to-gray-100/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to transforming how people connect with
              professionals
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12"}`}
                  >
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold mb-4">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate team behind Planoras vision
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${member.avatarColor} mb-6`}
                  ></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium inline-block">
                    {member.expertise}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Whether you are looking for professional services or want to grow
              your business, we d love to have you be part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/findProfessional"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300"
              >
                Find a Professional
              </Link>
              <Link
                href="/FormPage"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Become a Professional
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// Star icon component
function Star({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
