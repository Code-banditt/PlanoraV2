"use client";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { ProfessionalData } from "../types";
import { useRouter } from "next/navigation";
import { Info, MessageSquare, Calendar, Star, ShieldCheck } from "lucide-react";
import base64url from "base64url";

export default function ProfessionalCard({ pro }: { pro: ProfessionalData }) {
  const router = useRouter();

  // Utility for IDs
  const encodedId = base64url.encode(pro._id);

  return (
    <div className="group relative w-full bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden">
      {/* Decorative Header Background */}
      <div className="h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 relative">
        <div className="absolute top-3 right-3">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> VERIFIED
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pb-6">
        {/* Avatar - Floating & Bordered */}
        <div className="flex justify-center -mt-12 mb-4">
          <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-[6px] border-white shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
            <Image
              src={pro?.professional.avatar}
              alt={pro?.professional.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Info Header */}
        <div className="text-center mb-5">
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {pro?.professional.name}
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <p className="text-sm text-slate-500 font-semibold tracking-wide uppercase text-[11px]">
              {pro?.professional.title}
            </p>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold ml-1 text-slate-700">
                {pro?.professional.references[0]?.rating?.toFixed(1) || "New"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-400 text-[12px] mt-2">
            <MapPinIcon className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span className="font-medium">
              {pro?.professional.location ?? "Remote"}
            </span>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-slate-50 rounded-2xl mb-6">
          <div className="text-center">
            <p className="text-[13px] font-bold text-slate-800">12</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
              Projects
            </p>
          </div>
          <div className="text-center border-x border-slate-200">
            <p className="text-[13px] font-bold text-slate-800">5y+</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
              Exp.
            </p>
          </div>
          <div className="text-center">
            <p className="text-[13px] font-bold text-slate-800">100%</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
              Success
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => router.push(`/profilePage/${encodedId}`)}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 !text-white text-sm font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-indigo-200"
          >
            <Info className="w-4 h-4" />
            View Profile
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => router.push(`/Appointment/${encodedId}`)}
              className="flex items-center justify-center gap-2 border border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 text-xs font-bold py-2.5 rounded-xl transition-all bg-white"
            >
              <Calendar className="w-4 h-4 text-indigo-500" />
              Book
            </button>

            <button
              onClick={() => router.push(`/chat/${encodedId}`)}
              className="flex items-center justify-center gap-2 border border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 text-xs font-bold py-2.5 rounded-xl transition-all bg-white"
            >
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
