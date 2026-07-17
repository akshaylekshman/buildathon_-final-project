"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  History, 
  Search, 
  Filter, 
  FileText, 
  Clipboard, 
  MessageSquare, 
  Calendar 
} from "lucide-react";

export default function PatientHistoryPage() {
  const historyItems = [
    {
      id: 1,
      type: "report",
      title: "Complete Blood Count",
      date: "July 15, 2026",
      desc: "Analyzed report showing mild anemia.",
      icon: Clipboard,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      id: 2,
      type: "prescription",
      title: "Fever Medication",
      date: "July 12, 2026",
      desc: "Prescribed Paracetamol and Amoxicillin.",
      icon: FileText,
      color: "text-teal-500",
      bg: "bg-teal-500/10"
    },
    {
      id: 3,
      type: "chat",
      title: "Gemma AI Consultation",
      date: "July 10, 2026",
      desc: "Discussed symptoms for mild headache.",
      icon: MessageSquare,
      color: "text-sky-500",
      bg: "bg-sky-500/10"
    },
    {
      id: 4,
      type: "appointment",
      title: "Dr. James Wilson",
      date: "June 28, 2026",
      desc: "Neurologist Consultation (Completed)",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <History className="w-8 h-8 text-primary" /> Patient History
          </h1>
          <p className="text-foreground/60">A complete timeline of your medical journey.</p>
        </div>
      </div>

      <GlassCard className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search history..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <Button variant="outline" className="gap-2 h-[50px] rounded-xl bg-card">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </GlassCard>

      <div className="relative pl-6 md:pl-8 space-y-8 border-l-2 border-border ml-4 md:ml-6 mt-8">
        {historyItems.map((item, index) => (
          <div key={item.id} className="relative">
            <div className={`absolute -left-[35px] md:-left-[43px] top-1 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center shadow-sm ${item.bg} ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            
            <GlassCard className="p-5 ml-6 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                <span className="text-sm font-medium text-foreground/50 bg-card px-3 py-1 rounded-full border border-border">
                  {item.date}
                </span>
              </div>
              <p className="text-foreground/70">{item.desc}</p>
            </GlassCard>
          </div>
        ))}
        
        <div className="relative">
          <div className="absolute -left-[23px] md:-left-[31px] top-1 w-6 h-6 rounded-full border-4 border-background bg-border flex items-center justify-center shadow-sm">
          </div>
          <p className="ml-6 text-foreground/40 font-medium italic">End of history</p>
        </div>
      </div>
    </div>
  );
}
