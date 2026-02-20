"use client";

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { useCreateAppointment } from "../reactQueryCalls/useCreatePro";
import { ProfessionalData } from "../types";
import { toast } from "react-hot-toast";
import { useAppointments } from "../reactQueryCalls/useAppointments";
import { setHours, setMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  MapPinIcon,
  VideoCameraIcon,
  XMarkIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Logic-only interfaces (preserved)
interface Payment {
  amount: number;
  currency: string;
  method: "card" | "paypal" | "cash" | "other";
  transactionId?: string;
  receiptUrl?: string;
  status?: "pending" | "completed" | "failed" | "refunded";
}

interface AppointmentFormProps {
  professional: ProfessionalData["professional"];
  identity: ProfessionalData;
  onClose: () => void;
  onSubmit: (data: any) => void;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AppointmentForm({
  professional,
  identity,
  onClose,
  onSubmit,
  setModalOpen,
}: AppointmentFormProps) {
  const { data: session } = useSession();
  const { mutate: bookAppointment } = useCreateAppointment();
  const router = useRouter();

  // States (logic preserved)
  const [date, setDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [notes, setNotes] = useState("");
  const [type, setType] = useState<"in-person" | "online">("in-person");
  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [payment, setPayment] = useState<Payment>({
    amount: 0,
    currency: "USD",
    method: "card",
    status: "pending",
  });

  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const { data } = useAppointments();
  const bookedSlots =
    data?.filter(
      (a) => a.professional.toString() === identity._id.toString(),
    ) ?? [];
  const bookedDates = bookedSlots.map((a) => new Date(a.date));

  useEffect(() => {
    if (selectedService) {
      setPayment((prev) => ({ ...prev, amount: selectedService.price }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Log in required");
      router.push("/login");
      return;
    }
    if (!date || !selectedService) {
      toast.error("Please select a date and service.");
      return;
    }

    const payload = {
      client: session.user.id,
      professional: identity._id,
      service: selectedService.name,
      date: date.toISOString(),
      notes,
      type,
      location: type === "in-person" ? location : undefined,
      meetingLink: type === "online" ? meetingLink : undefined,
      payment: { ...payment },
    };

    bookAppointment(payload);
    onSubmit(payload);
    setModalOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden max-h-[95vh] border border-white/20">
        {/* Left: Professional Context (The "Why") */}
        <div className="md:w-1/3 relative bg-slate-900 text-white p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src={professional.avatar}
              className="w-full h-full object-cover blur-md scale-110"
              alt=""
            />
          </div>

          <div className="relative z-10">
            <button
              onClick={onClose}
              className="md:hidden absolute top-0 right-0 p-2 text-white/50"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 flex items-center justify-center overflow-hidden">
              <img
                src={professional.avatar}
                className="w-full h-full object-cover"
                alt={professional.name}
              />
            </div>
            <h3 className="text-2xl font-black tracking-tight">
              {professional.name}
            </h3>
            <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mt-1">
              {professional.title}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
                <span>Verified Professional</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CreditCardIcon className="w-5 h-5 text-indigo-400" />
                <span>Secure Payment Processing</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-2">
              Booking Summary
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-bold">
                  {selectedService?.name || "No service selected"}
                </p>
                <p className="text-xs text-slate-400">
                  {type === "online" ? "Online Meeting" : "In-person"}
                </p>
              </div>
              <p className="text-xl font-black text-indigo-400">
                ${payment.amount}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="md:w-2/3 bg-white p-6 sm:p-10 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              Configure Booking
            </h2>
            <button
              onClick={onClose}
              className="hidden md:block p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                Select Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {professional.services?.map((srv, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      setSelectedService({ name: srv.name, price: srv.price })
                    }
                    className={clsx(
                      "cursor-pointer p-4 rounded-2xl border-2 transition-all",
                      selectedService?.name === srv.name
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-100 hover:border-indigo-200",
                    )}
                  >
                    <p
                      className={clsx(
                        "font-bold text-sm",
                        selectedService?.name === srv.name
                          ? "text-indigo-600"
                          : "text-slate-700",
                      )}
                    >
                      {srv.name}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      ${srv.price} • {srv.duration} mins
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Picker Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                  Date & Time
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
                  <DatePicker
                    className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer"
                    selected={date}
                    onChange={(d) => setDate(d!)}
                    showTimeSelect
                    filterDate={(d) =>
                      professional.availability
                        .flatMap((a) => a.day)
                        .some(
                          (name) => dayMap[name.toLowerCase()] === d.getDay(),
                        )
                    }
                    filterTime={(time) =>
                      !bookedDates.some(
                        (booked) => booked.getTime() === time.getTime(),
                      )
                    }
                    minDate={new Date()}
                    placeholderText="Select Schedule"
                    dateFormat="MMMM d, h:mm aa"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                  Meeting Format
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setType("in-person")}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                      type === "in-person"
                        ? "bg-white shadow-sm text-indigo-600"
                        : "text-slate-500",
                    )}
                  >
                    <MapPinIcon className="w-4 h-4" /> In-person
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("online")}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                      type === "online"
                        ? "bg-white shadow-sm text-indigo-600"
                        : "text-slate-500",
                    )}
                  >
                    <VideoCameraIcon className="w-4 h-4" /> Online
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Inputs based on type */}
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              {type === "in-person" ? (
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                    Session Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600"
                    placeholder="Street address or studio name"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                    Meeting Platform/Link
                  </label>
                  <input
                    type="text"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600"
                    placeholder="Zoom, Google Meet, or Skype ID"
                    required
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 min-h-[80px]"
                placeholder="Tell the professional anything they should know before the start..."
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Total to Pay
                </span>
                <span className="text-2xl font-black text-slate-900">
                  ${payment.amount}
                </span>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
              >
                {type === "in-person" ? "Confirm Booking" : "Secure Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
