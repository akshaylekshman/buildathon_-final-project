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
  LogOut,
  AlertCircle,
  CheckCircle,
  Loader2,
  Camera,
  ImagePlus
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/AuthContext";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { user, logout, updateProfileState } = useAuth();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (user) {
      const parts = user.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmailState(user.email || "");
    }
  }, [user]);

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "language", label: "Language", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Moon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
  ];

  const [activeTab, setActiveTab] = React.useState("profile");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !emailState) {
      setMessage("First name and email are required.");
      setIsError(true);
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email: emailState,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        updateProfileState(data.user.name, data.user.email);
        setMessage("Profile updated successfully!");
        setIsError(false);
      } else {
        setMessage(data.error || "Failed to update profile.");
        setIsError(true);
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

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
              onClick={() => {
                setActiveTab(tab.id);
                setMessage(null);
              }}
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
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium cursor-pointer"
            >
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
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mounted && theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <span className="w-6 h-6 bg-yellow-400 rounded-full" />
                      </div>
                      <span className="font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mounted && theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                        <span className="w-6 h-6 bg-slate-400 rounded-full" />
                      </div>
                      <span className="font-medium">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${mounted && theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-900 flex items-center justify-center border border-border" />
                      <span className="font-medium">System</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Accent Color</h3>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-offset-background ring-blue-600" />
                    <button className="w-10 h-10 rounded-full bg-teal-500" />
                    <button className="w-10 h-10 rounded-full bg-purple-500" />
                    <button className="w-10 h-10 rounded-full bg-orange-500" />
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "profile" && (
            <GlassCard className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold mb-6">Profile Settings</h2>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-xl border text-sm flex items-start gap-3 ${
                    isError
                      ? "bg-red-500/10 border-red-500/20 text-red-500"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  }`}
                >
                  {isError ? <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSaveChanges} className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-card flex items-center justify-center">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary/60" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md border-2 border-background hover:bg-primary/90 transition-colors"
                      title="Upload photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{firstName} {lastName}</p>
                    <p className="text-sm text-foreground/50 mb-2">{emailState}</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                    >
                      <ImagePlus className="w-3.5 h-3.5" /> Upload profile photo
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={saving}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={saving}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    value={emailState}
                    onChange={(e) => setEmailState(e.target.value)}
                    required
                    disabled={saving}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:opacity-50"
                  />
                </div>

                <Button type="submit" disabled={saving} className="flex items-center gap-2">
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </GlassCard>
          )}

          {/* Placeholders for other tabs */}
          {["language", "notifications", "privacy", "security"].includes(activeTab) && (
            <GlassCard className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px] text-center animate-in fade-in duration-500">
              <Settings className="w-12 h-12 text-primary/20 mb-4" />
              <h2 className="text-xl font-bold mb-2 capitalize">{activeTab} Settings</h2>
              <p className="text-foreground/60 max-w-sm">
                This section is currently under development. Configure your {activeTab} preferences soon.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
