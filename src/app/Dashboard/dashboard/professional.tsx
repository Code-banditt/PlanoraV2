"use client";

import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import ProgressBar from "@/app/_Components/loadingProgress";

// Dynamic imports
const Example = dynamic(() => import("@/app/_Components/pieCharts"), {
  ssr: false,
});
const BarExample = dynamic(() => import("@/app/_Components/reactFlow"), {
  ssr: false,
});
import { List } from "@/app/_Components/list";
import UpcomingAppointments from "@/app/_Components/cardAppointment";

export default function ProfboardPage() {
  const { data: session } = useSession();
  const { data, isLoading } = useAppointments();

  if (isLoading) return <ProgressBar />;

  const totalAppointments = data?.length || 0;
  const totalPayment =
    data?.reduce((sum, appt) => sum + (appt.payment?.amount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 space-y-8">
      {/* 1. REFINED HEADER & USER PROFILE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Performance <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring your business activity for January 2026.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-200 w-fit">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
            {session?.user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Logged in as
            </p>
            <p className="text-sm font-bold text-slate-900">
              {session?.user?.name}
            </p>
          </div>
        </div>
      </div>

      {/* 2. METRICS ROW - Weighted Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Revenue Card */}
        <div className="lg:col-span-2 bg-slate-950 rounded-[2rem] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-blue-500/20 transition-all" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-1">
                Gross Revenue
              </p>
              <h2 className="text-5xl font-black text-white tracking-tighter">
                $
                {totalPayment.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <DollarSign className="text-white w-6 h-6" />
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 relative z-10">
            <span className="flex items-center gap-1 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">
              <TrendingUp size={14} /> +12.5%
            </span>
            <span className="text-slate-500 text-sm font-medium">
              vs. previous month
            </span>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between hover:border-blue-200 transition-all shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Users size={24} />
            </div>
            <ArrowUpRight className="text-slate-300" />
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900">
              {totalAppointments}
            </p>
            <p className="text-slate-500 font-bold text-sm">Total Bookings</p>
          </div>
        </div>

        {/* Secondary Revenue / Monthly Metric */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between hover:border-blue-200 transition-all shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
              <Calendar size={24} />
            </div>
            <ArrowUpRight className="text-slate-300" />
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900">
              ${(totalPayment * 0.09).toFixed(2)}
            </p>
            <p className="text-slate-500 font-bold text-sm">Projected (9%)</p>
          </div>
        </div>
      </div>

      {/* 3. ANALYTICS & LIST ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">
              Booking <span className="text-blue-600">Distribution</span>
            </h3>
            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <Example /> {/* Pie Chart */}
          </div>
        </div>

        {/* Appointment List Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
          <h3 className="text-xl font-black text-slate-900 mb-6">
            Recent Activity
          </h3>
          <div className="h-[350px] overflow-y-auto scrollbar-hide">
            <List data={data} />
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ACTION ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-black text-slate-900">Workload Flow</h3>
            <p className="text-sm text-slate-400 font-medium">
              Process visualization for current teams.
            </p>
          </div>
          <BarExample /> {/* React Flow */}
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">
            Calendar Preview
          </h3>
          <UpcomingAppointments appointments={[]} />
        </div>
      </div>
    </div>
  );
}
