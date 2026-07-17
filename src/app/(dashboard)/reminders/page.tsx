"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Bell, 
  Plus, 
  Pill, 
  Clock, 
  CheckCircle2, 
  Calendar as CalendarIcon,
  BellOff
} from "lucide-react";

export default function MedicineReminderPage() {
  const [notifications, setNotifications] = React.useState(true);

  const reminders = [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      time: "08:00 AM",
      status: "taken",
      food: "After Food",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 2,
      name: "Vitamin C",
      time: "01:00 PM",
      status: "upcoming",
      food: "Anytime",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      id: 3,
      name: "Paracetamol 650mg",
      time: "08:00 PM",
      status: "upcoming",
      food: "After Food",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" /> Medicine Reminders
          </h1>
          <p className="text-foreground/60">Track your daily medication and never miss a dose.</p>
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add Medicine
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Today's Schedule</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/60">Alerts</span>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {reminders.map(reminder => (
              <GlassCard key={reminder.id} className={`p-5 flex items-center gap-4 transition-all ${reminder.status === 'taken' ? 'opacity-60 grayscale' : 'hover:border-primary/30'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${reminder.bgColor} ${reminder.iconColor}`}>
                  <Pill className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg truncate">{reminder.name}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-card rounded-md border border-border">
                      {reminder.food}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/60 text-sm font-medium">
                    <Clock className="w-4 h-4" /> {reminder.time}
                  </div>
                </div>

                <div className="shrink-0">
                  {reminder.status === 'taken' ? (
                    <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : (
                    <button className="w-10 h-10 rounded-full bg-card hover:bg-primary hover:text-white border border-border flex items-center justify-center transition-colors shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-foreground/40 hover:text-white" />
                    </button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-0 overflow-hidden">
            <div className="bg-primary p-4 text-white">
              <h3 className="font-bold mb-1 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" /> July 2026
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 text-center text-xs font-bold text-foreground/50 mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {/* Mock calendar days */}
                <div className="p-2 text-foreground/30">28</div><div className="p-2 text-foreground/30">29</div><div className="p-2 text-foreground/30">30</div>
                <div className="p-2">1</div><div className="p-2">2</div><div className="p-2">3</div><div className="p-2">4</div>
                <div className="p-2">5</div><div className="p-2 relative"><span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>6</div><div className="p-2">7</div><div className="p-2">8</div><div className="p-2">9</div><div className="p-2">10</div><div className="p-2">11</div>
                <div className="p-2">12</div><div className="p-2">13</div><div className="p-2">14</div><div className="p-2">15</div><div className="p-2">16</div><div className="p-2 bg-primary text-white rounded-lg shadow-sm">17</div><div className="p-2">18</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 bg-gradient-to-br from-card to-card/50">
            <h3 className="font-bold text-lg mb-4">Weekly Adherence</h3>
            <div className="flex items-end justify-between h-32 px-2">
              {[80, 100, 100, 60, 100, 100, 0].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-8">
                  <div className="w-full bg-border rounded-full h-24 relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-full" 
                      style={{ height: `${val}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-foreground/50 font-medium">
                    {['S','M','T','W','T','F','S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
