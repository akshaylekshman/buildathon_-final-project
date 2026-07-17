"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Library, 
  Search, 
  ShieldCheck, 
  Heart, 
  Stethoscope, 
  Apple, 
  Syringe, 
  Siren,
  FileText,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MedicalLibraryPage() {
  const categories = [
    { name: "WHO Guidelines", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "First Aid", icon: Heart, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Diseases", icon: Stethoscope, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Nutrition", icon: Apple, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Vaccination", icon: Syringe, color: "text-teal-500", bg: "bg-teal-500/10" },
    { name: "Emergency Care", icon: Siren, color: "text-orange-500", bg: "bg-orange-500/10" }
  ];

  const articles = [
    {
      id: 1,
      title: "Basic CPR Guidelines 2026",
      category: "First Aid",
      readTime: "5 min read",
      author: "Red Cross & WHO",
      desc: "Learn the life-saving technique of Cardiopulmonary Resuscitation (CPR) with updated 2026 guidelines."
    },
    {
      id: 2,
      title: "Managing Type 2 Diabetes",
      category: "Diseases",
      readTime: "8 min read",
      author: "National Health Authority",
      desc: "Comprehensive guide on diet, medication, and lifestyle changes to effectively manage Type 2 Diabetes."
    },
    {
      id: 3,
      title: "Essential Vitamins for Immunity",
      category: "Nutrition",
      readTime: "4 min read",
      author: "Global Health Institute",
      desc: "Discover which vitamins and minerals are crucial for maintaining a strong immune system."
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Library className="w-8 h-8 text-primary" /> Medical Library
          </h1>
          <p className="text-foreground/60">Access verified health guidelines, first aid protocols, and medical knowledge.</p>
        </div>
      </div>

      <GlassCard className="p-4 flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
          <input 
            type="text" 
            placeholder="Search symptoms, diseases, guidelines..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm font-medium"
          />
        </div>
        <Button className="h-[50px] px-8 rounded-xl shrink-0">Search Library</Button>
      </GlassCard>

      <div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <GlassCard key={i} interactive className="p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-primary/30 group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-sm leading-tight">{cat.name}</span>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Featured Articles & Guidelines</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <GlassCard key={article.id} className="p-0 overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-md">
                      {article.category}
                    </span>
                    <span className="text-sm font-medium text-foreground/50">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-foreground/70 mb-4 line-clamp-2">{article.desc}</p>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" /> {article.author}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary p-0 hover:bg-transparent">
                      Read More <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
            <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center mb-4">
              <Siren className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">Emergency Protocols</h2>
            <p className="text-sm text-foreground/70 mb-6">Quick access to life-saving instructions during medical emergencies.</p>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-red-500/30 transition-colors">
                <span className="font-bold text-sm">Heart Attack</span>
                <ChevronRight className="w-4 h-4 text-foreground/40" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-red-500/30 transition-colors">
                <span className="font-bold text-sm">Choking (Heimlich)</span>
                <ChevronRight className="w-4 h-4 text-foreground/40" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-red-500/30 transition-colors">
                <span className="font-bold text-sm">Severe Bleeding</span>
                <ChevronRight className="w-4 h-4 text-foreground/40" />
              </button>
            </div>
          </GlassCard>
          
          <GlassCard className="p-5 border-primary/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Offline Downloads
            </h3>
            <p className="text-sm text-foreground/60 mb-4">Download essential guidelines to access them without internet connection.</p>
            <Button variant="outline" className="w-full gap-2 bg-card">
              Manage Downloads
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
