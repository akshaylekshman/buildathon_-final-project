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
  Trash2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Reminder {
  id: number;
  name: string;
  time: string;
  status: "taken" | "upcoming";
  food: string;
  iconColor: string;
  bgColor: string;
}

const ICON_COLORS = [
  { iconColor: "text-blue-500", bgColor: "bg-blue-500/10" },
  { iconColor: "text-orange-500", bgColor: "bg-orange-500/10" },
  { iconColor: "text-purple-500", bgColor: "bg-purple-500/10" },
  { iconColor: "text-teal-500", bgColor: "bg-teal-500/10" },
  { iconColor: "text-pink-500", bgColor: "bg-pink-500/10" },
  { iconColor: "text-yellow-600", bgColor: "bg-yellow-500/10" },
];

const FOOD_OPTIONS = ["After Food", "Before Food", "Anytime", "With Water"];

export default function MedicineReminderPage() {
  const [notifications, setNotifications] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newTime, setNewTime] = React.useState("08:00");
  const [newFood, setNewFood] = React.useState("After Food");
  const [nextId, setNextId] = React.useState(4);

  const [reminders, setReminders] = React.useState<Reminder[]>([
    { id: 1, name: "Amoxicillin 500mg", time: "08:00 AM", status: "taken", food: "After Food", iconColor: "text-blue-500", bgColor: "bg-blue-500/10" },
    { id: 2, name: "Vitamin C", time: "01:00 PM", status: "upcoming", food: "Anytime", iconColor: "text-orange-500", bgColor: "bg-orange-500/10" },
    { id: 3, name: "Paracetamol 650mg", time: "08:00 PM", status: "upcoming", food: "After Food", iconColor: "text-purple-500", bgColor: "bg-purple-500/10" },
  ]);

  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    const colors = ICON_COLORS[nextId % ICON_COLORS.length];
    const newReminder: Reminder = {
      id: nextId,
      name: newName.trim(),
      time: formatTime(newTime),
      status: "upcoming",
      food: newFood,
      ...colors,
    };
    setReminders((prev) => [...prev, newReminder].sort((a, b) => {
      const toMins = (t: string) => {
        const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;
        let h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const p = match[3].toUpperCase();
        if (p === "AM" && h === 12) h = 0;
        if (p === "PM" && h !== 12) h += 12;
        return h * 60 + m;
      };
      return toMins(a.time) - toMins(b.time);
    }));
    setNextId((n) => n + 1);
    setNewName("");
    setNewTime("08:00");
    setNewFood("After Food");
    setShowModal(false);
  };

  const markTaken = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "taken" } : r))
    );
  };

  const deleteReminder = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const todayDate = today.getDate();

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" /> Medicine Reminders
          </h1>
          <p className="text-foreground/60">Track your daily medication and never miss a dose.</p>
        </div>
        <Button className="gap-2 shrink-0" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" /> Add Medicine
        </Button>
      </div>

      {/* Add Medicine Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-primary" /> Add Medicine Reminder
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-card text-foreground/50 hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Medicine Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Paracetamol 500mg"
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">When to take</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FOOD_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setNewFood(opt)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                          newFood === opt
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-border hover:border-primary/50 text-foreground/70"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1 bg-background" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAdd} disabled={!newName.trim()}>
                  <Plus className="w-4 h-4 mr-1" /> Add Reminder
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Today's Schedule</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/60">Alerts</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? "bg-primary" : "bg-border"}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${notifications ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>

          {reminders.length === 0 && (
            <div className="text-center py-16 text-foreground/40">
              <Pill className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No medicines added yet</p>
              <p className="text-sm mt-1">Click "Add Medicine" to set your first reminder</p>
            </div>
          )}

          <div className="space-y-4">
            <AnimatePresence>
              {reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <GlassCard className={`p-5 flex items-center gap-4 transition-all group ${reminder.status === "taken" ? "opacity-50 grayscale" : "hover:border-primary/30"}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${reminder.bgColor} ${reminder.iconColor}`}>
                      <Pill className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg truncate">{reminder.name}</h3>
                        <span className="text-xs font-bold px-2 py-1 bg-background rounded-md border border-border ml-2 shrink-0">
                          {reminder.food}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/60 text-sm font-medium">
                        <Clock className="w-4 h-4" /> {reminder.time}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {reminder.status === "taken" ? (
                        <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/30">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      ) : (
                        <button
                          onClick={() => markTaken(reminder.id)}
                          className="w-10 h-10 rounded-full bg-card hover:bg-primary hover:text-white border border-border flex items-center justify-center transition-colors shadow-sm"
                          title="Mark as taken"
                        >
                          <CheckCircle2 className="w-5 h-5 text-foreground/40 hover:text-white" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="w-10 h-10 rounded-full hover:bg-red-500/10 text-foreground/20 hover:text-red-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-0 overflow-hidden">
            <div className="bg-primary p-4 text-white">
              <h3 className="font-bold mb-1 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" /> {monthName} {year}
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 text-center text-xs font-bold text-foreground/50 mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - (new Date(year, today.getMonth(), 1).getDay()) + 1;
                  const isValid = day >= 1 && day <= new Date(year, today.getMonth() + 1, 0).getDate();
                  const isToday = isValid && day === todayDate;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        !isValid ? "text-foreground/20" :
                        isToday ? "bg-primary text-white shadow-sm font-bold" : "hover:bg-card"
                      }`}
                    >
                      {isValid ? day : ""}
                    </div>
                  );
                })}
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
                      className="absolute bottom-0 w-full bg-primary rounded-full transition-all"
                      style={{ height: `${val}%` }}
                    />
                  </div>
                  <span className="text-xs text-foreground/50 font-medium">
                    {["S", "M", "T", "W", "T", "F", "S"][i]}
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
