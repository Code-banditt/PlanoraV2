"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Settings,
  User as UserIcon,
  MapPin,
  Mail,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  pending: "bg-amber-50 text-amber-600 border-amber-100 animate-pulse",
  canceled: "bg-rose-50 text-rose-600 border-rose-100",
  completed: "bg-slate-50 text-slate-500 border-slate-100",
};

export default function UserProfile() {
  const { data: session } = useSession();
  const { data: appointments, isLoading } = useAppointments();
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FBFBFE]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBFBFE] px-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-indigo-100/50 text-center max-w-sm">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Ready to start?
          </h2>
          <p className="text-slate-500 mb-8">
            You havent booked any services yet. Lets find the perfect pro for
            you.
          </p>
          <button
            onClick={() => router.push("/professionals")}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Explore Professionals
          </button>
        </div>
      </div>
    );
  }

  const groupedHistory = appointments.reduce(
    (acc, app) => {
      const month = new Date(app.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      acc[month] = acc[month] ? [...acc[month], app] : [app];
      return acc;
    },
    {} as Record<string, typeof appointments>,
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* Top Profile Header */}
      <div className="h-64 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-24 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <div className="p-8 pb-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                {/* Profile Image/Initial */}
                <div className="w-36 h-36 rounded-[2.5rem] border-[8px] border-white bg-indigo-600 shadow-2xl flex items-center justify-center text-white text-5xl font-black shrink-0 transition-transform hover:scale-105 duration-300">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="text-center md:text-left mb-2">
                  <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    {session?.user?.name}
                    <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                      {session?.user?.role || "Member"}
                    </span>
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Mail size={14} /> {session?.user?.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <MapPin size={14} /> New York, US
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pb-4">
                <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100">
                  <Settings size={20} />
                </button>
                <button
                  onClick={() => router.push("/chat")}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <MessageSquare size={18} /> Messages
                </button>
              </div>
            </div>

            {/* Custom Tab Navigation */}
            <div className="flex items-center gap-8 mt-12 border-b border-slate-100">
              {["overview", "accounts", "activities", "spending"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "pb-4 text-sm font-bold capitalize transition-all relative",
                    activeTab === tab
                      ? "text-indigo-600"
                      : "text-slate-400 hover:text-slate-600",
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-slate-50/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-8 space-y-6">
                {activeTab === "overview" ? (
                  <div className="space-y-8">
                    {Object.entries(groupedHistory).map(([month, apps]) => (
                      <div key={month} className="relative">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 bg-slate-200/50 w-fit px-3 py-1 rounded-full">
                          {month}
                        </h3>
                        <div className="space-y-4">
                          {apps.map((app) => (
                            <div
                              key={app._id}
                              className="group flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                                  {app.service?.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-slate-900 font-bold group-hover:text-indigo-600 transition-colors">
                                    {app.service}
                                  </p>
                                  <p className="text-xs text-slate-400 font-medium">
                                    With{" "}
                                    {typeof app.professional === "object"
                                      ? app.professional?.name
                                      : app.professional}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span
                                  className={clsx(
                                    "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border",
                                    statusStyles[app.status] || "bg-gray-100",
                                  )}
                                >
                                  {app.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 text-center">
                    <TrendingUp className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                      Analytics Coming Soon
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100">
                  <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase size={18} className="text-indigo-600" />
                    Pros Contacted
                  </h4>
                  <div className="space-y-4">
                    {appointments.slice(0, 5).map((app) => (
                      <div
                        key={app._id}
                        className="flex items-center gap-3 group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          {typeof app.professional === "object"
                            ? app.professional?.name?.charAt(0)
                            : "?"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {typeof app.professional === "object"
                              ? app.professional?.name
                              : "Professional"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                            {app.service}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
                  <h4 className="font-bold mb-2">Need Help?</h4>
                  <p className="text-sm text-indigo-100 mb-4">
                    Our support team is available 24/7 for any booking issues.
                  </p>
                  <button className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-white/30 transition-all">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
