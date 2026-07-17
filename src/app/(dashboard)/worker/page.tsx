"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  MapPin, 
  Pill, 
  Clipboard, 
  Search, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  Upload
} from "lucide-react";

export default function HealthcareWorkerPage() {
  const patients = [
    {
      id: 1,
      name: "Ramesh Kumar",
      age: 45,
      village: "Sector 4, Village A",
      status: "critical",
      issue: "High Blood Pressure",
      lastVisit: "2 days ago",
      medicines: "Amlodipine"
    },
    {
      id: 2,
      name: "Sita Devi",
      age: 62,
      village: "Sector 2, Village B",
      status: "stable",
      issue: "Diabetes Type 2",
      lastVisit: "1 week ago",
      medicines: "Metformin"
    },
    {
      id: 3,
      name: "Arjun Singh",
      age: 12,
      village: "Sector 4, Village A",
      status: "recovering",
      issue: "Viral Fever",
      lastVisit: "Today",
      medicines: "Paracetamol"
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" /> Healthcare Worker Dashboard
          </h1>
          <p className="text-foreground/60">Manage village patients, distribute medicines, and track community health.</p>
        </div>
        <Button className="gap-2 shrink-0">
          <Clipboard className="w-4 h-4" /> Log Visit
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 bg-blue-500/10 border-blue-500/20">
          <p className="text-sm font-bold text-blue-600 mb-1">Total Patients</p>
          <p className="text-3xl font-black text-blue-700 dark:text-blue-500">124</p>
        </GlassCard>
        <GlassCard className="p-4 bg-orange-500/10 border-orange-500/20">
          <p className="text-sm font-bold text-orange-600 mb-1">Critical Cases</p>
          <p className="text-3xl font-black text-orange-700 dark:text-orange-500">3</p>
        </GlassCard>
        <GlassCard className="p-4 bg-teal-500/10 border-teal-500/20">
          <p className="text-sm font-bold text-teal-600 mb-1">Medicines Given</p>
          <p className="text-3xl font-black text-teal-700 dark:text-teal-500">85</p>
        </GlassCard>
        <GlassCard className="p-4 bg-purple-500/10 border-purple-500/20">
          <p className="text-sm font-bold text-purple-600 mb-1">Reports Uploaded</p>
          <p className="text-3xl font-black text-purple-700 dark:text-purple-500">12</p>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Search patients by name or village..." 
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-card shrink-0">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </GlassCard>

          <div className="space-y-4">
            {patients.map(patient => (
              <GlassCard key={patient.id} className="p-0 overflow-hidden hover:border-primary/30 transition-colors">
                <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">{patient.name}</h3>
                      <span className="text-sm text-foreground/60">{patient.age} yrs</span>
                      {patient.status === 'critical' && (
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-600 text-xs font-bold rounded-full flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Critical
                        </span>
                      )}
                      {patient.status === 'stable' && (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs font-bold rounded-full">Stable</span>
                      )}
                      {patient.status === 'recovering' && (
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-xs font-bold rounded-full">Recovering</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-3">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {patient.village}</span>
                      <span className="flex items-center gap-1.5 font-medium text-primary"><AlertTriangle className="w-4 h-4" /> {patient.issue}</span>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Button size="sm" className="gap-2"><Pill className="w-4 h-4" /> Issue Meds</Button>
                    <Button size="sm" variant="outline" className="gap-2 bg-card"><Upload className="w-4 h-4" /> Upload Report</Button>
                  </div>
                </div>
                <div className="bg-card/50 p-3 px-5 border-t border-border flex justify-between items-center text-sm">
                  <span className="text-foreground/60">Last visit: {patient.lastVisit}</span>
                  <span className="font-medium text-foreground/80">Active Meds: {patient.medicines}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h2 className="text-lg font-bold mb-4">Today's Schedule</h2>
            <div className="space-y-4 relative">
              <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-primary/20"></div>
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-sm ring-4 ring-background">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm">Sector 1, Village C</h4>
                <p className="text-xs text-foreground/60">Completed • 12 patients seen</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-sm ring-4 ring-background animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <h4 className="font-bold text-sm">Sector 4, Village A</h4>
                <p className="text-xs text-foreground/60">In Progress • 8 patients remaining</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm ring-4 ring-background">
                </div>
                <h4 className="font-bold text-sm">Sector 2, Village B</h4>
                <p className="text-xs text-foreground/60">Upcoming • Est. 3:00 PM</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-lg font-bold mb-4 text-orange-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Low Stock Alerts
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="font-medium">Paracetamol 500mg</span>
                <span className="text-red-500 font-bold">12 strips left</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="font-medium">Amoxicillin Syrup</span>
                <span className="text-red-500 font-bold">5 bottles left</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">ORS Packets</span>
                <span className="text-orange-500 font-bold">20 packets left</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-card h-9">Request Restock</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
