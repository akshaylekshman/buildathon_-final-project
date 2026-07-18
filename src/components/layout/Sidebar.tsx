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
  BarChart3, 
  Settings, 
  LogOut,
  Activity,
  Pill
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const NAV_ITEMS = [
  { name: "Dashboard Overview", href: "/dashboard", icon: Activity },
  { name: "AI Chat", href: "/chat", icon: MessageSquare },
  { name: "Prescription Analyzer", href: "/analyzer/prescription", icon: FileText },
  { name: "Medical Report", href: "/analyzer/report", icon: Clipboard },
  { name: "Medicine Reviewer", href: "/reviewer", icon: Pill },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Medicine Reminder", href: "/reminders", icon: Bell },
  { name: "Medical Library", href: "/library", icon: Library },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen border-r border-border/60 bg-card/45 backdrop-blur-xl shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border/60">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-base shadow-sm">
            N
          </div>
          <span className="font-extrabold text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            NEXCARE AI
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3.5 space-y-0.5 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "relative flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group text-xs cursor-pointer",
                  isActive 
                    ? "text-primary font-semibold bg-primary/8" 
                    : "text-foreground/60 hover:text-foreground hover:bg-card/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-r-full"
                  />
                )}
                <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-foreground/45 group-hover:text-primary/80")} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-border/60">
        <button 
          onClick={logout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-500/80 hover:text-red-500 hover:bg-red-500/8 transition-colors w-full cursor-pointer text-xs font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
