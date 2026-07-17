"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Calendar as CalendarIcon,
  Video,
  Building2,
  CheckCircle2
} from "lucide-react";

export default function AppointmentsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      experience: "15 yrs exp",
      rating: "4.9",
      reviews: "120",
      hospital: "City Heart Center",
      location: "Downtown",
      nextAvailable: "Today, 4:00 PM",
      fee: "$150",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80"
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Neurologist",
      experience: "12 yrs exp",
      rating: "4.8",
      reviews: "85",
      hospital: "Metro General Hospital",
      location: "Westside",
      nextAvailable: "Tomorrow, 10:00 AM",
      fee: "$200",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80"
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary" /> Book Appointment
          </h1>
          <p className="text-foreground/60">Find and book appointments with top doctors near you.</p>
        </div>
        <div className="flex bg-card rounded-xl p-1 border border-border">
          <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium shadow-sm">Upcoming (2)</button>
          <button className="px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground text-sm font-medium transition-colors">Past</button>
        </div>
      </div>

      {/* Search Section */}
      <GlassCard className="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search doctors, specialties, hospitals..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="md:w-64 relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Location" 
            defaultValue="New York, NY"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <Button className="h-[50px] px-8 rounded-xl md:w-auto w-full">Search</Button>
      </GlassCard>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold mb-4">Recommended Doctors</h2>
          <div className="space-y-4">
            {doctors.map(doctor => (
              <GlassCard key={doctor.id} className="p-5 flex flex-col sm:flex-row gap-6 hover:border-primary/30 transition-colors">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-primary/10 relative">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-1.5 left-2 flex items-center gap-1 text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {doctor.rating}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-primary">{doctor.name}</h3>
                    <span className="font-bold">{doctor.fee}</span>
                  </div>
                  <p className="text-sm font-medium mb-3">{doctor.specialty} • <span className="text-foreground/60">{doctor.experience}</span></p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-4">
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {doctor.hospital}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {doctor.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button className="flex-1 rounded-xl gap-2 h-10 shadow-sm text-sm">
                      <CalendarIcon className="w-4 h-4" /> Book Clinic Visit
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl gap-2 h-10 bg-card text-sm">
                      <Video className="w-4 h-4" /> Video Consult
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          
          <GlassCard className="p-0 overflow-hidden border-primary/20 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Dr. Sarah Smith</h3>
                  <p className="text-sm text-foreground/60">Cardiology Consultation</p>
                </div>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">Today</div>
              </div>
              
              <div className="bg-card/50 rounded-xl p-3 flex items-center gap-3 mb-4 border border-border/50">
                <div className="bg-background p-2 rounded-lg text-primary border border-border">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">4:00 PM - 4:30 PM</p>
                  <p className="text-xs text-foreground/60">In 2 hours</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-sm bg-card h-9">Reschedule</Button>
                <Button variant="outline" className="flex-1 text-sm bg-card h-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">Cancel</Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden border-border/50 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-foreground/20"></div>
            <div className="p-5 opacity-75">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Dr. Emily Chen</h3>
                  <p className="text-sm text-foreground/60">Dermatology</p>
                </div>
                <div className="bg-card text-foreground/60 px-2 py-1 rounded text-xs font-bold border border-border">Aug 20</div>
              </div>
              
              <div className="bg-card/50 rounded-xl p-3 flex items-center gap-3 border border-border/50">
                <div className="bg-background p-2 rounded-lg text-foreground/60 border border-border">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">11:00 AM</p>
                  <p className="text-xs text-foreground/60">Video Consultation</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
