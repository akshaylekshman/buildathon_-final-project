"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  FileText, 
  Clipboard, 
  Calendar, 
  Bell, 
  Library, 
  Users, 
  Users2, 
  BarChart3, 
  Settings, 
  LogOut,
  Activity,
  Pill
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard Overview", href: "/dashboard", icon: Activity },
  { name: "AI Chat", href: "/chat", icon: MessageSquare },
  { name: "Prescription Analyzer", href: "/analyzer/prescription", icon: FileText },
  { name: "Medical Report", href: "/analyzer/report", icon: Clipboard },
  { name: "Medicine Reviewer", href: "/reviewer", icon: Pill },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Medicine Reminder", href: "/reminders", icon: Bell },
  { name: "Patient History", href: "/history", icon: Activity },
  { name: "Medical Library", href: "/library", icon: Library },
  { name: "Healthcare Worker", href: "/worker", icon: Users },
  { name: "Family Profiles", href: "/family", icon: Users2 },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 hidden lg:flex flex-col h-screen border-r border-border bg-card/50 backdrop-blur-xl shrink-0">
      <div className="h-20 flex items-center px-8 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
            N
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            NEXCARE AI
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "text-primary font-medium bg-primary/10" 
                    : "text-foreground/70 hover:text-foreground hover:bg-card"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  />
                )}
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-foreground/50 group-hover:text-primary")} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
