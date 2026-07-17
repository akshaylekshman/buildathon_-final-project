"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Users2, 
  Plus, 
  Activity, 
  Pill, 
  Calendar, 
  Settings2,
  Droplet,
  HeartPulse,
  UserPlus
} from "lucide-react";

export default function FamilyProfilesPage() {
  const familyMembers = [
    {
      id: 1,
      name: "John Doe",
      relation: "Self (Primary)",
      age: 32,
      bloodGroup: "O+",
      conditions: ["None"],
      medicines: ["Multivitamins"],
      nextAppointment: "Cardiology (Today)",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      active: true
    },
    {
      id: 2,
      name: "Jane Doe",
      relation: "Spouse",
      age: 29,
      bloodGroup: "A+",
      conditions: ["Asthma"],
      medicines: ["Inhaler (SOS)"],
      nextAppointment: "No upcoming appointments",
      image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      active: false
    },
    {
      id: 3,
      name: "Robert Doe",
      relation: "Father",
      age: 65,
      bloodGroup: "O-",
      conditions: ["Hypertension", "Diabetes"],
      medicines: ["Amlodipine", "Metformin"],
      nextAppointment: "General Checkup (Aug 15)",
      image: "https://i.pravatar.cc/150?img=11",
      active: false
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Users2 className="w-8 h-8 text-primary" /> Family Profiles
          </h1>
          <p className="text-foreground/60">Manage healthcare for your dependents and family members.</p>
        </div>
        <Button className="gap-2 shrink-0">
          <UserPlus className="w-4 h-4" /> Add Member
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {familyMembers.map((member) => (
          <GlassCard 
            key={member.id} 
            className={`p-6 transition-all ${member.active ? 'border-primary ring-1 ring-primary shadow-lg shadow-primary/10' : 'hover:border-primary/30'} flex flex-col`}
          >
            <div className="flex items-start justify-between mb-6 border-b border-border/50 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full overflow-hidden ${member.active ? 'ring-4 ring-primary' : 'ring-2 ring-border'}`}>
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  {member.active && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-card rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-md">{member.relation}</span>
                    <span className="text-sm text-foreground/60">{member.age} yrs</span>
                  </div>
                </div>
              </div>
              <Button variant={member.active ? "outline" : "secondary"} size="sm" className="h-8">
                {member.active ? 'Active Profile' : 'Switch To'}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-foreground/50 uppercase flex items-center gap-1.5 mb-1">
                    <Droplet className="w-3.5 h-3.5 text-red-500" /> Blood Group
                  </p>
                  <p className="font-medium">{member.bloodGroup}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-foreground/50 uppercase flex items-center gap-1.5 mb-1">
                    <HeartPulse className="w-3.5 h-3.5 text-teal-500" /> Conditions
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.conditions.map((c, i) => (
                      <span key={i} className="text-sm font-medium bg-card border border-border px-2 py-0.5 rounded-md">{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-foreground/50 uppercase flex items-center gap-1.5 mb-1">
                    <Pill className="w-3.5 h-3.5 text-purple-500" /> Active Medicines
                  </p>
                  <div className="flex flex-col gap-1">
                    {member.medicines.map((m, i) => (
                      <span key={i} className="text-sm truncate">{m}</span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-foreground/50 uppercase flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" /> Next Appointment
                  </p>
                  <p className="text-sm font-medium truncate">{member.nextAppointment}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex justify-end gap-2">
               <Button variant="ghost" size="sm" className="gap-2 text-foreground/60 hover:text-foreground h-9">
                 <Activity className="w-4 h-4" /> View History
               </Button>
               <Button variant="ghost" size="sm" className="gap-2 text-foreground/60 hover:text-foreground h-9">
                 <Settings2 className="w-4 h-4" /> Edit Profile
               </Button>
            </div>
          </GlassCard>
        ))}
        
        {/* Add New Profile Card */}
        <GlassCard interactive className="p-6 border-dashed border-2 bg-transparent flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2">Add Family Member</h3>
          <p className="text-sm text-foreground/60 max-w-[250px]">
            Keep track of health records, prescriptions, and appointments for your loved ones.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
