"use client";

import { useParams } from "next/navigation";
import { useUser } from "@/app/reactQueryCalls/useGetUsers";
import { useState } from "react";
import AppointmentForm from "@/app/_Components/appointmentForm";
import LoadingDots from "@/app/_Components/loading";
import ProgressBar from "@/app/_Components/loadingProgress";
import {
  CheckBadgeIcon,
  MapPinIcon,
  StarIcon,
  CalendarDaysIcon,
  SparklesIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import AppointmentSuccessModal from "@/app/_Components/Congratulations";
import base64url from "base64url";

export default function ProfessionalProfilePage() {
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const params = useParams();
  const encodedId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = encodedId ? base64url.decode(encodedId) : undefined;

  const { data: user, error, isLoading } = useUser(id ?? "");

  if (isLoading) {
    return (
      <>
        <ProgressBar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
          <LoadingDots />
          <p className="text-slate-400 mt-4 font-medium animate-pulse">
            Syncing Professional Data...
          </p>
        </div>
      </>
    );
  }

  if (error || !user?.professional) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50 text-rose-700 font-bold">
        {error ? "Failed to load profile." : "No professional data found."}
      </div>
    );
  }

  const professional = user.professional;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Premium Mesh Header */}
      <div className="h-56 w-full relative overflow-hidden bg-indigo-600">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,#818cf8,rgba(255,255,255,0))]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[120%] bg-purple-500 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[120%] bg-blue-400 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Profile Card Overlay */}
        <div className="relative -mt-24 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 sm:p-10 border border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left: Avatar & Identity */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
              <div className="relative group">
                <img
                  src={professional.avatar}
                  alt={professional.name}
                  className="w-40 h-40 rounded-[2.5rem] ring-[12px] ring-white object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-2xl border-4 border-white shadow-lg">
                  <CheckBadgeIcon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    {professional.name}
                  </h1>
                </div>
                <p className="text-indigo-600 font-bold text-lg mt-1 uppercase tracking-wider text-sm">
                  {professional.title}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                    <MapPinIcon className="w-4 h-4 text-slate-400" />
                    {professional.location || "Remote / Global"}
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-black text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <StarIcon className="w-4 h-4" />
                    4.9{" "}
                    <span className="text-slate-400 font-medium ml-1">
                      (120+ reviews)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 !text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95"
              >
                <CalendarDaysIcon className="w-5 h-5" />
                Book Session
              </button>
              <button className="flex-1 lg:flex-none border-2 border-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Message
              </button>
            </div>
          </div>

          {/* Role & Skills Section */}
          <div className="mt-12 pt-10 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-3 rounded-2xl">
                  <SparklesIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Expertise Area
                  </p>
                  <p className="text-slate-700 font-bold">
                    {professional.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {professional.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white border border-slate-200 text-slate-600 text-xs font-black px-4 py-2 rounded-xl shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default"
                  >
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Availability Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
              <h3 className="text-slate-900 font-black text-xl mb-6 flex items-center gap-3">
                <CalendarDaysIcon className="w-6 h-6 text-indigo-600" />
                Availability
              </h3>
              <div className="space-y-4">
                {professional.availability?.map((slot, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:bg-indigo-50/50 transition-colors"
                  >
                    <p className="text-indigo-600 font-black text-xs uppercase tracking-tighter mb-1">
                      {slot.day.join(" • ")}
                    </p>
                    <p className="text-slate-700 font-bold text-sm">
                      {slot.from}{" "}
                      <span className="text-slate-400 font-medium">to</span>{" "}
                      {slot.to}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
              <h4 className="font-bold text-lg mb-2">Secure Booking</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                All payments are held in escrow until the service is marked as
                completed by both parties.
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase">
                <WalletIcon className="w-4 h-4" />
                Satisfaction Guaranteed
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 h-full">
              <h3 className="text-slate-900 font-black text-xl mb-8 flex items-center gap-3">
                <SparklesIcon className="w-6 h-6 text-indigo-600" />
                Offered Services
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {professional.services?.map((service, idx) => (
                  <div
                    key={idx}
                    className="group relative border border-slate-100 rounded-[2rem] p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-slate-800 font-black text-xl group-hover:text-indigo-600 transition-colors">
                        {service.name}
                      </h4>
                      <span className="bg-emerald-50 text-emerald-600 font-black px-3 py-1 rounded-xl text-sm border border-emerald-100">
                        ${service.price}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {service.name === "Consultation"
                        ? "A 30-minute session to discuss your needs and how I can help."
                        : service.name === "Project Review"
                        ? "A detailed review of your project and feedback on improvements."
                        : service.price}
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all"
                    >
                      Select Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          identity={user}
          professional={{ ...professional }}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log("Appointment booked:", data);
            setShowForm(false);
          }}
          setModalOpen={setModalOpen}
        />
      )}
      {modalOpen && <AppointmentSuccessModal setModalOpen={setModalOpen} />}
    </main>
  );
}
