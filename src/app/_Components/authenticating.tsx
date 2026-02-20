"use client";

import { useEffect, useState } from "react";
import { Shield, Sparkles, CheckCircle, Lock } from "lucide-react";

export default function AuthLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { icon: Shield, text: "Verifying credentials...", color: "text-blue-500" },
    { icon: Lock, text: "Securing session...", color: "text-cyan-500" },
    {
      icon: Sparkles,
      text: "Loading preferences...",
      color: "text-indigo-500",
    },
    { icon: CheckCircle, text: "Finalizing...", color: "text-emerald-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Planora
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
          </div>
          <p className="mt-4 text-gray-500 text-sm font-light tracking-wider">
            Modern Healthcare Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
          <div className="text-center">
            {/* Animated icon container */}
            <div className="relative inline-block mb-8">
              <div className="relative">
                {/* Outer subtle ring */}
                <div className="absolute -inset-4">
                  <svg className="w-32 h-32" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="56"
                      fill="none"
                      stroke="url(#gradient-ring)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient
                        id="gradient-ring"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#e0e7ff" />
                        <stop offset="100%" stopColor="#f0f9ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Icon background */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center shadow-inner border border-gray-100">
                  <div
                    className={`${steps[currentStep].color} transition-all duration-500`}
                  >
                    {(() => {
                      const Icon = steps[currentStep].icon;
                      return <Icon className="w-12 h-12" />;
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Status text */}
            <div className="space-y-6">
              <div className="h-8">
                <p className="text-xl font-medium text-gray-800 transition-all duration-500">
                  {steps[currentStep].text}
                </p>
              </div>

              {/* Elegant progress indicator */}
              <div className="relative">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full animate-shimmer" />
                </div>
                <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentStep
                          ? "bg-blue-500 scale-125"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security status */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Secure Connection</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>End-to-end Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                  i === currentStep % 3 ? "opacity-100 scale-125" : "opacity-30"
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Please wait while we prepare your personalized healthcare dashboard
        </p>
      </div>

      {/* Subtle footer */}
      <div className="fixed bottom-6 text-center">
        <p className="text-xs text-gray-300">
          © {new Date().getFullYear()} Planora Health Inc.
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }

        .fade-in-out {
          animation: fadeInOut 1.5s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
