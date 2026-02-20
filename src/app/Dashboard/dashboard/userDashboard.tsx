"use client";

import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Wallet,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  History,
  Bell,
  Search,
  User as UserIcon,
} from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: appointments, isLoading } = useAppointments();
  const router = useRouter();

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email",
    image: session?.user?.image,
  };

  const vitalsData = [
    {
      label: "Total Bookings",
      value: appointments?.length || 0,
      icon: <CalendarDays className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-50",
    },
    {
      label: "Month's Spend",
      value:
        appointments?.reduce((sum, a) => sum + (a.payment?.amount || 0), 0) ||
        0,
      unit: "$",
      icon: <Wallet className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      label: "Completed",
      value: appointments?.filter((a) => a.status === "completed").length || 0,
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Pending",
      value: appointments?.filter((a) => a.status === "pending").length || 0,
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-50",
    },
  ];

  const appointmentsData =
    appointments?.map((appt) => ({
      doctor:
        typeof appt.professional === "object"
          ? appt.professional?.name
          : appt.professional || "Professional",

      specification: appt.service || "Service",
      date: new Date(appt.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: new Date(appt.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: appt.status,
      rawStatus: appt.status,
    })) || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans text-slate-900">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Hey, {user.name.split(" ")[0]}{" "}
            <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            You have{" "}
            {appointments?.filter((a) => a.status === "pending").length || 0}{" "}
            upcoming sessions this week.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-8 w-[1px] bg-slate-100 mx-1"></div>
          <div className="flex items-center gap-3 pl-2 pr-4">
            {user.image ? (
              <img
                src={user.image}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-100"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-bold text-slate-700">
              {user.name}
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Content Area */}
        <section className="lg:col-span-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vitalsData.map(({ label, value, unit, icon, color }) => (
              <div
                key={label}
                className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-50 hover:shadow-md transition-shadow group"
              >
                <div
                  className={`${color} w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                >
                  {icon}
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {label}
                </p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">
                  {unit}
                  {value}
                </h3>
              </div>
            ))}
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
            <div className="p-8 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-500" />
                Appointment Log
              </h3>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition">
                View All
              </button>
            </div>

            <div className="overflow-x-auto px-4 pb-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.1em]">
                    <th className="pb-4 px-4">Professional</th>
                    <th className="pb-4 px-4">Service</th>
                    <th className="pb-4 px-4">Schedule</th>
                    <th className="pb-4 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {appointmentsData.map((a, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            <img
                              src={"/imgs/barber.png"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">
                            {a.doctor}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-500">
                        {a.specification}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm font-bold text-slate-700">
                          {a.date}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter">
                          {a.time}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div
                          className={`mx-auto w-fit px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border
                          ${
                            a.rawStatus === "completed"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : a.rawStatus === "pending"
                                ? "bg-amber-50 text-amber-600 border-amber-100"
                                : "bg-slate-50 text-slate-500 border-slate-100"
                          }
                        `}
                        >
                          {a.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Right Sidebar Area */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Next Appointment Card */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <div className="bg-white/20 w-fit p-2 rounded-xl backdrop-blur-md mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-indigo-100 font-bold text-sm uppercase tracking-widest mb-1">
                Upcoming Session
              </h3>
              {appointments?.[0] ? (
                <>
                  <div className="text-3xl font-black mb-4">
                    {new Date(appointments[0].date).toLocaleDateString(
                      "en-US",
                      { weekday: "long", day: "numeric", month: "short" },
                    )}
                  </div>
                  <div className="flex items-center justify-between bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-600 text-xs font-black">
                        {appointments[0].service.charAt(0)}
                      </div>
                      <span className="font-bold text-sm truncate max-w-[120px]">
                        {appointments[0].service}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-60" />
                  </div>
                </>
              ) : (
                <p className="text-indigo-200 mt-2 font-medium italic">
                  No sessions booked yet
                </p>
              )}
            </div>
            {/* Background Decor */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Quick Actions/Services */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              Recent Services
            </h3>
            <div className="space-y-4">
              {appointments?.slice(0, 4).map((appt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {appt.service}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {new Date(appt.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/professionals")}
              className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition shadow-lg shadow-slate-100"
            >
              Find New Professional
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
