"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  MessageSquare, 
  FileText, 
  Clipboard, 
  Calendar, 
  PhoneCall,
  X,
  Phone,
  AlertTriangle,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

const quickActions = [
  { title: "Start AI Chat", icon: MessageSquare, href: "/chat", color: "from-blue-500 to-sky-500" },
  { title: "Upload Prescription", icon: FileText, href: "/analyzer/prescription", color: "from-teal-400 to-emerald-500" },
  { title: "Upload Report", icon: Clipboard, href: "/analyzer/report", color: "from-purple-500 to-pink-500" },
  { title: "Book Appointment", icon: Calendar, href: "/appointments", color: "from-orange-400 to-red-500" },
];

const EMERGENCY_NUMBERS = [
  { label: "Ambulance", number: "102", icon: "🚑", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  { label: "Police", number: "100", icon: "🚔", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { label: "Fire Brigade", number: "101", icon: "🚒", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { label: "Emergency", number: "112", icon: "🆘", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

export default function DashboardOverview() {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "User";
  const [showSOS, setShowSOS] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const handleSOSOpen = () => {
    setShowSOS(true);
    // Try to get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationGranted(true);
          setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocationGranted(false);
          setLocation(null);
        }
      );
    }
  };

  const callNumber = (num: string) => {
    window.location.href = `tel:${num}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-10">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome back, {firstName}</h1>
        <p className="text-foreground/60 text-lg">Quickly access your healthcare tools and resources.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br ${action.color} shadow-lg shadow-black/5 aspect-square flex flex-col justify-between cursor-pointer transition-all`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-15">
                  <action.icon className="w-24 h-24 transform rotate-12" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-lg leading-snug">{action.title}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Banner */}
      <GlassCard className="p-0 overflow-hidden border-red-500/20 bg-red-500/5 mt-8">
        <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 animate-pulse shrink-0">
              <PhoneCall className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-500">Emergency Help Needed?</h3>
              <p className="text-sm text-foreground/60">Instantly request location-aware emergency medical services.</p>
            </div>
          </div>
          <button
            onClick={handleSOSOpen}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black tracking-wider transition-all shadow-lg shadow-red-500/30 text-center animate-pulse"
          >
            SOS EMERGENCY
          </button>
        </div>
      </GlassCard>

      {/* Emergency SOS Modal */}
      <AnimatePresence>
        {showSOS && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-card border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-red-500 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                  <div>
                    <h2 className="text-xl font-black tracking-wide">EMERGENCY SOS</h2>
                    <p className="text-red-100 text-xs font-medium">Select a service to call immediately</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSOS(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Location */}
                {location && (
                  <div className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl p-3">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="font-medium">Location detected: {location}</span>
                  </div>
                )}

                {/* Emergency Numbers */}
                <div className="grid grid-cols-2 gap-3">
                  {EMERGENCY_NUMBERS.map((service) => (
                    <button
                      key={service.number}
                      onClick={() => callNumber(service.number)}
                      className={`p-4 rounded-2xl border ${service.border} ${service.bg} hover:scale-105 active:scale-95 transition-all text-left group`}
                    >
                      <div className="text-2xl mb-2">{service.icon}</div>
                      <div className={`text-lg font-black ${service.color}`}>{service.number}</div>
                      <div className="text-sm font-semibold text-foreground/70">{service.label}</div>
                      <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <Phone className="w-3 h-3" /> Tap to call
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-center text-foreground/40 pb-1">
                  These are official India emergency numbers. Tap any card to dial directly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
