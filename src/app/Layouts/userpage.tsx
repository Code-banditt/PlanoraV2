"use client";

import { motion } from "framer-motion";
import Steps from "../_Components/it";

import LandingHero from "../_Components/hero";
import BackgroundBlogCard from "../_Components/use";
import Reviews from "../_Components/testimonial";
import Footer from "../_Components/whychoose";
import Feauture from "../_Components/featuredpros";
import NewFeatures from "../_Components/newFeauters";
import AboutUsPage from "../_Components/showCase";
import Pricing from "../_Components/homeInput";
import HeroSection from "../_Components/herotest";

export default function UserLayout() {
  return (
    <main className="min-h-screen relative bg-white flex flex-col">
      {/* Header */}

      {/* New Hero Section */}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <LandingHero />
      </motion.div>

      <HeroSection />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <Feauture />
      </motion.div>

      {/* Steps Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <Steps />
      </motion.div>

      {/* Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <AboutUsPage />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="container mx-auto px-8 py-2 flex flex-col justify-center items-center leading-relaxed"
      >
        <NewFeatures />
      </motion.div>

      {/* Blog Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="container mx-auto px-8  flex flex-col justify-center items-center leading-relaxed"
      >
        <BackgroundBlogCard />
      </motion.div>

      <Pricing />

      {/* Blog Section */}
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
  );
}
