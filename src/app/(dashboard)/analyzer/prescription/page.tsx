"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  FileText, 
  Download,
  AlertTriangle,
  Clock,
  Info,
  CheckCircle2,
  ChevronDown
} from "lucide-react";

export default function PrescriptionAnalyzerPage() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState(true); // Mocking result state

  const mockMedicines = [
    {
      name: "Amoxicillin 500mg",
      purpose: "Bacterial infection",
      timing: { morning: true, afternoon: false, night: true },
      food: "After Food",
      sideEffects: ["Nausea", "Diarrhea"],
      warnings: "Finish the complete course. Do not stop early."
    },
    {
      name: "Paracetamol 650mg",
      purpose: "Fever and pain relief",
      timing: { morning: true, afternoon: true, night: true },
      food: "After Food",
      sideEffects: ["Rare allergic reactions"],
      warnings: "Do not exceed 4 tablets in 24 hours."
    }
  ];

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Prescription Analyzer</h1>
          <p className="text-foreground/60">Upload your prescription to extract medicines and get simple guidance.</p>
        </div>
        {result && (
          <Button variant="outline" className="gap-2 bg-card">
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        )}
      </div>

      {!result ? (
        <GlassCard className="border-dashed border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors py-20 flex flex-col items-center justify-center text-center cursor-pointer">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6 animate-pulse">
            <Upload className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold mb-2">Upload your Prescription</h3>
          <p className="text-foreground/60 max-w-md mb-8">
            Drag and drop an image or PDF here, or click to browse files. Our AI will analyze the handwriting and text.
          </p>
          <div className="flex gap-4">
            <Button className="gap-2"><ImageIcon className="w-4 h-4" /> Browse Files</Button>
            <Button variant="secondary" className="gap-2"><Camera className="w-4 h-4" /> Open Camera</Button>
          </div>
        </GlassCard>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-4 relative overflow-hidden">
              <div className="aspect-[3/4] bg-card rounded-xl border border-border flex items-center justify-center relative">
                {/* Placeholder for uploaded image */}
                <img 
                  src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&q=80" 
                  alt="Prescription" 
                  className="w-full h-full object-cover rounded-lg opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-border">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Scanned
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <Upload className="w-4 h-4" /> Re-upload
              </Button>
            </GlassCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-xl text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">AI Extraction Complete</h3>
                  <p className="text-sm text-foreground/70">Found 2 medicines. Please verify the details below with your physical prescription before consuming.</p>
                </div>
              </div>
            </GlassCard>

            <div className="space-y-4">
              <h3 className="font-bold text-xl">Extracted Medicines</h3>
              {mockMedicines.map((med, i) => (
                <GlassCard key={i} className="p-0 overflow-hidden border-border/50">
                  <div className="p-5 border-b border-border/50 flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-primary">{med.name}</h4>
                      <p className="text-sm text-foreground/60">{med.purpose}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-semibold">
                      {med.food}
                    </span>
                  </div>
                  
                  <div className="p-5 bg-card/50 grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Schedule
                      </p>
                      <div className="flex gap-2">
                        <div className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${med.timing.morning ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-background text-foreground/40 border border-border'}`}>Morning</div>
                        <div className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${med.timing.afternoon ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' : 'bg-background text-foreground/40 border border-border'}`}>Afternoon</div>
                        <div className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${med.timing.night ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20' : 'bg-background text-foreground/40 border border-border'}`}>Night</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Side Effects
                        </p>
                        <p className="text-sm">{med.sideEffects.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-2">
                          <Info className="w-4 h-4" /> Warnings
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">{med.warnings}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="flex justify-end">
               <Button className="gap-2 shadow-lg"><Calendar className="w-4 h-4" /> Add to Reminders</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
