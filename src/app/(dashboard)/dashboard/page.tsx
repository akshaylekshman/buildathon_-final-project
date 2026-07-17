"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  MessageSquare, 
  FileText, 
  Clipboard, 
  Calendar, 
  Activity,
  HeartPulse,
  Pill,
  PhoneCall,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const stats = [
  { title: "Today's Appointments", value: "2", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Active Medicines", value: "4", icon: Pill, color: "text-teal-500", bg: "bg-teal-500/10" },
  { title: "Reports Uploaded", value: "12", icon: Clipboard, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "AI Conversations", value: "28", icon: MessageSquare, color: "text-sky-500", bg: "bg-sky-500/10" },
];

const quickActions = [
  { title: "Start AI Chat", icon: MessageSquare, href: "/chat", color: "from-blue-500 to-sky-500" },
  { title: "Upload Prescription", icon: FileText, href: "/analyzer/prescription", color: "from-teal-400 to-emerald-500" },
  { title: "Upload Report", icon: Clipboard, href: "/analyzer/report", color: "from-purple-500 to-pink-500" },
  { title: "Book Appointment", icon: Calendar, href: "/appointments", color: "from-orange-400 to-red-500" },
];

const recentActivity = [
  { title: "Dr. Sarah Smith", desc: "Cardiologist Consultation", time: "Today, 10:00 AM", type: "appointment" },
  { title: "Blood Test Report", desc: "Analyzed successfully", time: "Yesterday", type: "report" },
  { title: "Amoxicillin 500mg", desc: "Prescription analyzed", time: "Mon, 2:30 PM", type: "prescription" },
  { title: "Gemma AI", desc: "Discussed mild headache symptoms", time: "Sun, 9:15 PM", type: "chat" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, John</h1>
        <p className="text-foreground/60">Here is your healthcare summary for today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-6 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/60">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden rounded-2xl p-4 text-white bg-gradient-to-br ${action.color} shadow-lg aspect-square flex flex-col justify-between`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <action.icon className="w-16 h-16 transform rotate-12" />
                  </div>
                  <action.icon className="w-8 h-8" />
                  <span className="font-semibold text-sm leading-tight max-w-[80%]">{action.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          <GlassCard className="p-0 overflow-hidden border-red-500/20 bg-red-500/5 mt-6">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-500">Emergency Help</h3>
                  <p className="text-sm text-foreground/60">Call ambulance or emergency contacts instantly.</p>
                </div>
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors shadow-md">
                SOS
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <GlassCard key={i} className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{activity.title}</p>
                  <p className="text-sm text-foreground/60 truncate">{activity.desc}</p>
                  <p className="text-xs text-foreground/40 mt-1">{activity.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground/30 self-center" />
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
