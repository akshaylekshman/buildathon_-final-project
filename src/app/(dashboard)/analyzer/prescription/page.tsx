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
  Calendar,
  RefreshCw,
  XCircle
} from "lucide-react";
import { analyzePrescriptionImage } from "@/services/api";

interface Medicine {
  name: string;
  purpose: string;
  timing: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  food: string;
  sideEffects: string[];
  warnings: string;
}

interface AnalysisResult {
  success: boolean;
  medicines: Medicine[];
  warnings: string;
}

export default function PrescriptionAnalyzerPage() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const processFile = async (file: File) => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    // Create a local image preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }

    try {
      const data = await analyzePrescriptionImage(file);
      if (data && data.success) {
        setResult(data);
      } else {
        setError(data?.error || "Failed to parse the prescription data. Please ensure it is a valid medical prescription.");
      }
    } catch (err: any) {
      console.error("Prescription processing error:", err);
      setError(err.message || "An error occurred while processing the prescription. Please verify Ollama is running locally.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImagePreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Prescription Analyzer</h1>
          <p className="text-foreground/60">Upload your prescription to extract medicines and get simple guidance using Gemma AI.</p>
        </div>
        {result && (
          <Button variant="outline" className="gap-2 bg-card" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> Print / Export
          </Button>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*,application/pdf" 
        className="hidden" 
      />

      {error && (
        <GlassCard className="border-red-500/20 bg-red-500/5 p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
          <XCircle className="w-5 h-5 shrink-0" />
          <div className="flex-1 text-sm">{error}</div>
          <Button size="sm" variant="ghost" className="hover:bg-red-500/10" onClick={handleReset}>Try Again</Button>
        </GlassCard>
      )}

      {analyzing && (
        <GlassCard className="py-20 flex flex-col items-center justify-center text-center bg-card/40">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-spin">
            <RefreshCw className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold mb-2">Analyzing Prescription...</h3>
          <p className="text-foreground/60 max-w-md animate-pulse">
            Gemma AI is reading the text, running OCR, and extracting medication timings. Please hold on.
          </p>
        </GlassCard>
      )}

      {!result && !analyzing && (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <GlassCard className={`border-dashed border-2 transition-all py-20 flex flex-col items-center justify-center text-center cursor-pointer ${dragActive ? 'border-primary bg-primary/10 scale-[1.01]' : 'border-primary/20 bg-primary/5 hover:bg-primary/10'}`} onClick={handleBrowseFiles}>
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload your Prescription</h3>
            <p className="text-foreground/60 max-w-md mb-8">
              Drag and drop a prescription image (PNG, JPG) or PDF here, or click to browse files.
            </p>
            <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
              <Button className="gap-2" onClick={handleBrowseFiles}><ImageIcon className="w-4 h-4" /> Browse Files</Button>
            </div>
          </GlassCard>
        </div>
      )}

      {result && !analyzing && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-4 relative overflow-hidden">
              <div className="aspect-[3/4] bg-card rounded-xl border border-border flex items-center justify-center relative overflow-hidden">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Prescription Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-foreground/40">
                    <FileText className="w-12 h-12" />
                    <span className="text-xs">Document Scan</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-border shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Scanned by Gemma
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2" onClick={handleReset}>
                <Upload className="w-4 h-4" /> Upload Different File
              </Button>
            </GlassCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {result.warnings && (
              <GlassCard className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-xl text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">AI Analysis Summary</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{result.warnings}</p>
                  </div>
                </div>
              </GlassCard>
            )}

            <div className="space-y-4">
              <h3 className="font-bold text-xl">Extracted Medicines</h3>
              {result.medicines && result.medicines.length > 0 ? (
                result.medicines.map((med, i) => (
                  <GlassCard key={i} className="p-0 overflow-hidden border-border/50">
                    <div className="p-5 border-b border-border/50 flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-primary">{med.name}</h4>
                        <p className="text-sm text-foreground/60">{med.purpose}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-semibold">
                        {med.food || "As directed"}
                      </span>
                    </div>
                    
                    <div className="p-5 bg-card/50 grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Schedule
                        </p>
                        <div className="flex gap-2">
                          <div className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${med.timing?.morning ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-background text-foreground/40 border border-border'}`}>Morning</div>
                          <div className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${med.timing?.afternoon ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' : 'bg-background text-foreground/40 border border-border'}`}>Afternoon</div>
                          <div className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${med.timing?.night ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20' : 'bg-background text-foreground/40 border border-border'}`}>Night</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {med.sideEffects && med.sideEffects.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> Side Effects
                            </p>
                            <p className="text-sm">{med.sideEffects.join(", ")}</p>
                          </div>
                        )}
                        {med.warnings && (
                          <div>
                            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-2">
                              <Info className="w-4 h-4" /> Warnings
                            </p>
                            <p className="text-sm text-orange-600 dark:text-orange-400">{med.warnings}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <GlassCard className="p-8 text-center text-foreground/50">
                  No medicines could be parsed. Check the scan summary above.
                </GlassCard>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleReset}>Clear Result</Button>
              <Button className="gap-2 shadow-lg"><Calendar className="w-4 h-4" /> Add to Reminders</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
