"use client";

import * as React from "react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Plus, 
  Trash2,
  CheckCircle2,
  Stethoscope
} from "lucide-react";

interface Appointment {
  id: string;
  hospitalName: string;
  department: string;
  date: string;
  time: string;
  type: "in-person" | "video";
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      hospitalName: "City General Hospital",
      department: "Cardiology",
      date: "2026-07-18",
      time: "16:00",
      type: "in-person",
    },
    {
      id: "2",
      hospitalName: "Metro Health Clinic",
      department: "Dermatology",
      date: "2026-08-20",
      time: "11:00",
      type: "video",
    },
  ]);

  const [hospitalName, setHospitalName] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState<"in-person" | "video">("in-person");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospitalName || !department || !date || !time) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substring(2, 9),
      hospitalName,
      department,
      date,
      time,
      type,
    };

    setAppointments([newAppointment, ...appointments]);
    setHospitalName("");
    setDepartment("");
    setDate("");
    setTime("");
    setType("in-person");

    setSuccessMessage("Appointment scheduled successfully!");
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1.5 flex items-center gap-2.5">
          <Building2 className="w-6 h-6 text-primary" /> Hospital Visits & Appointments
        </h1>
        <p className="text-foreground/60 text-xs">Schedule and track your appointments at local medical centers.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Column: Form to book appointment */}
        <div className="md:col-span-7 space-y-6">
          <GlassCard className="p-6 border border-border/80">
            <h2 className="text-sm font-bold tracking-wider uppercase text-foreground/70 mb-5">Schedule a New Visit</h2>
            
            {successMessage && (
              <div className="mb-5 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">Hospital / Clinic Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/45" />
                  <input
                    type="text"
                    required
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    placeholder="Enter hospital name (e.g., City General Hospital)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card/45 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground placeholder:text-foreground/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">Department / Specialty</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/45" />
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Cardiology, Neurology, General Medicine, etc."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card/45 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground placeholder:text-foreground/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/45" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card/45 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/45" />
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card/45 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all text-foreground cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider block">Consultation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("in-person")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      type === "in-person"
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card/40 border-border text-foreground/70 hover:bg-card/90"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    In-Person Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("video")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      type === "video"
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card/40 border-border text-foreground/70 hover:bg-card/90"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Video Call
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 rounded-lg text-xs font-semibold mt-4 shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" /> Schedule Appointment
              </Button>
            </form>
          </GlassCard>
        </div>

        {/* Right Column: List of upcoming appointments */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-foreground/70 mb-4">Scheduled Visits ({appointments.length})</h2>
            
            {appointments.length === 0 ? (
              <GlassCard className="p-8 text-center border border-dashed border-border/80">
                <Building2 className="w-10 h-10 mx-auto text-foreground/30 mb-3 animate-pulse" />
                <p className="text-xs text-foreground/60 font-medium">No appointments scheduled.</p>
                <p className="text-[10px] text-foreground/40 mt-1">Fill out the form to book a visit.</p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {appointments.map((app) => (
                  <GlassCard key={app.id} className="p-4 relative overflow-hidden border-border/60 flex flex-col justify-between hover:border-border transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    
                    <div className="flex items-start justify-between gap-2 mb-3 pl-1.5">
                      <div>
                        <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {app.hospitalName}
                        </h3>
                        <p className="text-[10px] text-foreground/60 mt-0.5">{app.department} Department</p>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                        app.type === "video" 
                          ? "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20" 
                          : "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20"
                      }`}>
                        {app.type === "video" ? "Video" : "In-Person"}
                      </span>
                    </div>

                    <div className="bg-secondary/30 dark:bg-zinc-900/50 rounded-lg p-2.5 flex items-center justify-between text-[11px] mb-3 ml-1.5 border border-border/40">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <CalendarIcon className="w-3.5 h-3.5 text-foreground/50" />
                        <span>{app.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Clock className="w-3.5 h-3.5 text-foreground/50" />
                        <span>{app.time}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pl-1.5">
                      <button
                        onClick={() => handleCancelAppointment(app.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-red-500/10 text-red-500 transition-all text-[10px] font-semibold cursor-pointer border border-transparent hover:border-red-500/20 active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Cancel Visit
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
