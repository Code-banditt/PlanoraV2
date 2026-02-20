"use client";

import { useState } from "react";
import { Avatar, Button, Modal, Popconfirm, Empty, notification } from "antd";
import {
  MoreHorizontal,
  Calendar as CalendarIcon,
  Clock,
  User,
  Check,
  X,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useUpdateAppointmentStatus } from "@/app/reactQueryCalls/useAppointmentStatus";
import { AppointmentType } from "@/app/types";
import AppointmentCalendar from "@/app/_Components/reactCalendar";
import ProgressBar from "@/app/_Components/loadingProgress";

export default function ProAppointment() {
  const { data, isLoading: fetching } = useAppointments();
  const loading = useSelector((state: RootState) => state.appointments.loading);
  const { mutate, isPending } = useUpdateAppointmentStatus();
  const [notify] = notification.useNotification();

  const [selectedClient, setSelectedClient] = useState<
    AppointmentType["client"] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showProfileModal = (client: AppointmentType["client"]) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  if (isPending) return <ProgressBar />;

  const handleAction = (data: AppointmentType, status: string) => {
    mutate(
      { appointmentId: data._id, status, date: data.date },
      {
        onSuccess: () => notify.success({ message: `Appointment ${status}` }),
        onError: () =>
          notify.error({ message: `Failed to ${status} appointment` }),
      },
    );
  };

  const pendingAppointments =
    data?.filter((appt: AppointmentType) => appt.status === "pending") || [];

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 px-6 py-10 bg-[#FAFAFA] min-h-screen font-sans">
      {/* Header with Stats Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Schedule <span className="text-blue-600">Overview</span>
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            You have {pendingAppointments.length} requests waiting for your
            approval.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">
                Total Bookings
              </p>
              <p className="text-xl font-black text-slate-900">
                {data?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Request Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Incoming Requests
            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded-full">
              {pendingAppointments.length}
            </span>
          </h2>
        </div>

        {fetching ? (
          <ProgressBar />
        ) : pendingAppointments.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 flex flex-col items-center">
            <Empty
              description={
                <span className="text-slate-400 font-medium">
                  Your inbox is clear! No pending requests.
                </span>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingAppointments.map((appt: AppointmentType) => (
              <div
                key={appt._id}
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="flex items-center gap-4 cursor-pointer group/avatar"
                    onClick={() => showProfileModal(appt.client)}
                  >
                    <Avatar
                      size={56}
                      className="bg-blue-600 ring-4 ring-blue-50 transition-transform group-hover/avatar:scale-110"
                    >
                      {appt.client.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover/avatar:text-blue-600 transition-colors">
                        {appt.client.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        {appt.service}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <CalendarIcon size={16} className="text-blue-500" />
                    <span className="text-sm font-bold">
                      {new Date(appt.date).toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-sm font-bold">
                      {new Date(appt.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Popconfirm
                    title="Accept this booking?"
                    onConfirm={() => handleAction(appt, "accepted")}
                    okButtonProps={{ className: "bg-blue-600" }}
                  >
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                      <Check size={16} /> Accept
                    </button>
                  </Popconfirm>
                  <Popconfirm
                    title="Decline request?"
                    onConfirm={() => handleAction(appt, "rejected")}
                  >
                    <button className="flex-1 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                      <X size={16} /> Decline
                    </button>
                  </Popconfirm>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Calendar Section with Custom Wrapper */}
      <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900">
            Monthly <span className="text-blue-600">Schedule</span>
          </h2>
          <Button type="text" className="font-bold text-blue-600">
            View Fullscreen
          </Button>
        </div>
        <AppointmentCalendar />
      </section>

      {/* Profile Modal Redesign */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        closeIcon={null}
        width={400}
      >
        {selectedClient && (
          <div className="p-6">
            <div className="flex flex-col items-center pb-8 border-b border-slate-100">
              <div className="relative mb-4">
                <Avatar
                  size={100}
                  className="bg-slate-900 border-4 border-white shadow-2xl text-2xl font-bold"
                >
                  {selectedClient.name?.charAt(0).toUpperCase()}
                </Avatar>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {selectedClient.name}
              </h2>
              <p className="text-slate-400 font-medium">
                {selectedClient.email}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-8">
              <div className="bg-slate-50 p-4 rounded-2xl text-center">
                <p className="text-2xl font-black text-slate-900">12</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  Total Visits
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center">
                <p className="text-2xl font-black text-blue-600">0%</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  No-Shows
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                <MessageSquare size={18} /> Send Message
              </button>
              <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                Full History <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
