"use client";

import React, { useState, useEffect } from "react";
import ProfessionalCard from "@/app/_Components/ProfessionalCard";
import { fetchUsers } from "../lib/fetchPros";
import { useQuery } from "@tanstack/react-query";
import {
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";

const PROFESSIONS = [
  "Doctor",
  "Nurse",
  "Dentist",
  "Therapist",
  "Personal Trainer",
  "Nutritionist",
  "Barber",
  "Makeup Artist",
  "Photographer",
  "Videographer",
  "Graphic Designer",
  "Web Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Digital Marketer",
  "SEO Specialist",
  "Content Writer",
  "Social Media Manager",
  "Lawyer",
  "Accountant",
  "Real Estate Agent",
  "Teacher",
  "Event Planner",
  "Plumber",
  "Electrician",
  "Other",
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ProfessionalsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: pros = [], isLoading } = useQuery({
    queryKey: ["pros"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isFilterOpen]);

  const filteredPros = pros
    .filter((pro) =>
      filter
        ? pro.professional?.title?.toLowerCase().includes(filter.toLowerCase())
        : true,
    )
    .filter((pro) =>
      selectedDays.length > 0
        ? selectedDays.some((day) =>
            pro.professional?.availability?.some((a) => a.day.includes(day)),
          )
        : true,
    )
    .filter((pro) =>
      searchTerm
        ? (pro.professional?.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          pro.professional?.services?.some((service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : true,
    );

  const sortedPros = [...filteredPros].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return (a.professional?.name || "").localeCompare(
          b.professional?.name || "",
        );
      case "name-desc":
        return (b.professional?.name || "").localeCompare(
          a.professional?.name || "",
        );
      case "profession-asc":
        return (a.professional?.title || "").localeCompare(
          b.professional?.title || "",
        );
      case "profession-desc":
        return (b.professional?.title || "").localeCompare(
          a.professional?.title || "",
        );
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedPros.length / itemsPerPage);
  const paginatedPros = sortedPros.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const clearFilters = () => {
    setFilter("");
    setSelectedDays([]);
    setSearchTerm("");
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-80 bg-white border-r border-slate-100 transform transition-transform duration-500 ease-out lg:translate-x-0 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-800">
                Filter Experts
              </h2>
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
            {/* Profession Section */}
            <div>
              <label className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-4 block">
                Specialization
              </label>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-xl px-4 py-3 text-slate-700 transition-all outline-none"
              >
                <option value="">All Fields</option>
                {PROFESSIONS.map((prof) => (
                  <option key={prof} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Days Section */}
            <div>
              <label className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-4 block">
                Availability
              </label>
              <div className="space-y-3">
                {DAYS.map((day) => (
                  <label
                    key={day}
                    className="flex items-center group cursor-pointer"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDays.includes(day)}
                        onChange={() => {
                          toggleDay(day);
                          setCurrentPage(1);
                        }}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 checked:bg-indigo-600 checked:border-indigo-600 transition-all"
                      />
                      <svg
                        className="absolute w-3.5 h-3.5 mt-0.5 ml-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-slate-600 group-hover:text-indigo-600 transition-colors">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex gap-3">
            <button
              onClick={clearFilters}
              className="flex items-center justify-center p-3 rounded-xl bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-100"
            >
              Show Results
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-80">
        {/* Modern Hero Section */}
        <section className="relative px-6 pt-10 lg:px-12">
          <div className="relative h-64 lg:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pros"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-indigo-900/40 to-transparent flex flex-col justify-center px-8 lg:px-16">
              <span className="bg-indigo-500/30 backdrop-blur-md text-indigo-100 text-[12px] font-bold uppercase tracking-[0.2em] w-fit px-4 py-1.5 rounded-full mb-4">
                Exclusive Access
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white max-w-lg leading-tight">
                Connect with world-class professionals.
              </h2>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 lg:px-12">
          {/* Action Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                The Directory
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Showing {filteredPros.length} experts available for hire
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="search"
                  placeholder="Search name or service..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full md:w-80 pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 rounded-2xl transition-all outline-none text-sm font-medium"
                />
              </div>

              <div className="h-10 w-[1px] bg-slate-200 hidden md:block mx-2" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 outline-none hover:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="name-asc">Sort A-Z</option>
                <option value="name-desc">Sort Z-A</option>
                <option value="profession-asc">By Field A-Z</option>
              </select>
            </div>
          </div>

          {/* Grid Layout */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm animate-pulse"
                >
                  <div className="h-48 bg-slate-100 rounded-2xl mb-4" />
                  <div className="h-4 bg-slate-100 w-3/4 rounded-full mb-2" />
                  <div className="h-4 bg-slate-100 w-1/2 rounded-full" />
                </div>
              ))}
            </div>
          ) : paginatedPros.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {paginatedPros.map((pro, i) => (
                <div
                  key={pro._id || i}
                  className="transform hover:-translate-y-2 transition-all duration-300"
                >
                  <ProfessionalCard pro={pro} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <div className="inline-flex p-6 bg-slate-100 rounded-full mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                No experts found
              </h3>
              <p className="text-slate-500 mt-2">
                Try adjusting your filters or search keywords.
              </p>
              <button
                onClick={clearFilters}
                className="mt-8 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Elegant Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-20 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2 px-4">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all ${
                        pageNum === currentPage
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                          : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Floating Filter Button (Mobile) */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="fixed bottom-8 right-8 lg:hidden bg-indigo-600 text-white p-5 rounded-[2rem] shadow-2xl z-50 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3"
      >
        <Filter className="w-6 h-6" />
        <span className="font-bold pr-2">Filter</span>
      </button>
    </div>
  );
}
