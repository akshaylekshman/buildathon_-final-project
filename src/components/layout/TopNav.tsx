"use client";

import * as React from "react";
import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-lg hover:bg-card text-foreground/70 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search medical records..." 
            className="w-96 pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-full hover:bg-card text-foreground/70 hover:text-foreground transition-colors relative"
        >
          {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className="p-2.5 rounded-full hover:bg-card text-foreground/70 hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-foreground/60">Premium User</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5 cursor-pointer">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
