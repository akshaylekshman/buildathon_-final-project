"use client";

import * as React from "react";
import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-1.5 rounded-lg hover:bg-card text-foreground/70 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search medical records..." 
            className="w-80 pl-9 pr-4 py-2 rounded-lg bg-card/50 border border-border/70 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all text-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-card text-foreground/70 hover:text-foreground transition-colors relative"
        >
          {mounted && theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-card text-foreground/70 hover:text-foreground transition-colors relative">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-background"></span>
        </button>

        <div className="flex items-center gap-2.5 pl-4 border-l border-border/60">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-foreground">{user?.name || "Loading..."}</p>
            <p className="text-[10px] text-foreground/50">{user?.email || "Premium User"}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs cursor-pointer shadow-sm select-none">
            {user?.name ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "??"}
          </div>
        </div>
      </div>
    </header>
  );
}
