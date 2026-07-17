"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Settings, 
  User, 
  Globe, 
  Moon, 
  Bell, 
  Shield, 
  Lock, 
  Smartphone,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "language", label: "Language", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Moon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
    { id: "devices", label: "Connected Devices", icon: Smartphone },
  ];

  const [activeTab, setActiveTab] = React.useState("appearance");

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" /> Settings
        </h1>
        <p className="text-foreground/60">Manage your account preferences and app settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md font-medium"
                  : "hover:bg-card text-foreground/70 font-medium"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "appearance" && (
            <GlassCard className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-6">Appearance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mounted && theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                         <span className="w-6 h-6 bg-yellow-400 rounded-full"></span>
                      </div>
                      <span className="font-medium">Light</span>
                    </button>
                    <button 
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mounted && theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                         <span className="w-6 h-6 bg-slate-400 rounded-full"></span>
                      </div>
                      <span className="font-medium">Dark</span>
                    </button>
                    <button 
                      onClick={() => setTheme("system")}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mounted && theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-900 flex items-center justify-center border border-border">
                      </div>
                      <span className="font-medium">System</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Accent Color</h3>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-offset-background ring-blue-600"></button>
                    <button className="w-10 h-10 rounded-full bg-teal-500"></button>
                    <button className="w-10 h-10 rounded-full bg-purple-500"></button>
                    <button className="w-10 h-10 rounded-full bg-orange-500"></button>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "profile" && (
            <GlassCard className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
              <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-card shadow-lg bg-card">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md border-2 border-background">
                    <User className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">First Name</label>
                      <input type="text" defaultValue="John" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email Address</label>
                    <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none" />
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Placeholders for other tabs */}
          {["language", "notifications", "privacy", "security", "devices"].includes(activeTab) && (
            <GlassCard className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px] text-center animate-in fade-in duration-500">
              <Settings className="w-12 h-12 text-primary/20 mb-4" />
              <h2 className="text-xl font-bold mb-2 capitalize">{activeTab} Settings</h2>
              <p className="text-foreground/60 max-w-sm">This section is currently under development. Configure your {activeTab} preferences soon.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
