"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Upload, 
  FileText, 
  Download,
  AlertCircle,
  Activity,
  ThumbsUp,
  Stethoscope,
  HelpCircle,
  BarChart2,
  RefreshCw,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { analyzeMedicalReportPDF } from "@/services/api";

interface RiskIndicator {
  name: string;
  value: string;
  status: "low" | "high" | "normal";
}

interface AnalysisResult {
  success: boolean;
  summary: string;
  riskIndicators: RiskIndicator[];
  normalValues: string[];
  recommendations: string[];
  questionsToAsk: string[];
}

export default function MedicalReportAnalyzerPage() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
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
    setFileName(file.name);

    try {
      const data = await analyzeMedicalReportPDF(file);
      if (data && data.success) {
        setResult(data);
      } else {
        setError(data?.error || "Failed to analyze the medical report. Please ensure the PDF is a valid lab report.");
      }
    } catch (err: any) {
      console.error("Report processing error:", err);
      setError(err.message || "An error occurred during report analysis. Please check that Ollama is running locally.");
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
    if (file && file.type === "application/pdf") {
      await processFile(file);
    } else if (file) {
      setError("Only PDF files are supported for medical report analysis.");
    }
  };

  const handleReset = () => {
    setResult(null);
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Medical Report Analyzer</h1>
          <p className="text-foreground/60">Upload lab reports (PDF) to get a simplified summary and health insights from Gemma AI.</p>
        </div>
        {result && (
          <Button variant="outline" className="gap-2 bg-card shrink-0" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> Export Summary
          </Button>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="application/pdf" 
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
          <h3 className="text-xl font-bold mb-2">Analyzing Lab Report...</h3>
          <p className="text-foreground/60 max-w-md animate-pulse">
            Gemma AI is extracting text from the PDF report, identifying key ranges, and compiling a plain English explanation.
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
            <h3 className="text-xl font-bold mb-2">Upload Lab Report (PDF)</h3>
            <p className="text-foreground/60 max-w-md mb-8">
              Drag and drop your blood test, lipid panel, or other lab report here, or click to browse.
            </p>
            <Button className="gap-2" onClick={handleBrowseFiles}><FileText className="w-4 h-4" /> Browse PDF Files</Button>
          </GlassCard>
        </div>
      )}

      {result && !analyzing && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar / PDF Preview */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-4 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="font-semibold text-sm truncate max-w-[180px]">{fileName || "Report.pdf"}</span>
                <Button variant="ghost" size="sm" className="h-8" onClick={handleReset}>Change File</Button>
              </div>
              <div className="flex-1 bg-card rounded-xl border border-border flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 w-full p-4 space-y-2 opacity-30">
                  <div className="h-4 bg-foreground/50 rounded w-3/4"></div>
                  <div className="h-4 bg-foreground/50 rounded w-1/2"></div>
                  <div className="h-4 bg-foreground/50 rounded w-full mt-6"></div>
                  <div className="h-4 bg-foreground/50 rounded w-5/6"></div>
                  <div className="h-4 bg-foreground/50 rounded w-4/6"></div>
                  <div className="h-32 border-2 border-dashed border-foreground/30 rounded mt-8"></div>
                </div>
                <div className="z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> PDF Parsed
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Simple Explanation
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {result.summary}
              </p>
            </GlassCard>

            <div className="grid sm:grid-cols-2 gap-6">
              <GlassCard className="p-0 overflow-hidden border-orange-500/20">
                <div className="bg-orange-500/10 p-4 border-b border-orange-500/20 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-orange-600">Risk Indicators / Out of Range</h3>
                </div>
                <div className="p-4 space-y-4">
                  {result.riskIndicators && result.riskIndicators.length > 0 ? (
                    result.riskIndicators.map((indicator, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{indicator.name}</span>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${indicator.status === "low" ? "bg-blue-500/10 text-blue-600" : indicator.status === "high" ? "bg-red-500/10 text-red-600" : "bg-orange-500/10 text-orange-600"}`}>
                            {indicator.value} ({indicator.status.toUpperCase()})
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${indicator.status === "low" ? "bg-blue-500 w-[35%]" : indicator.status === "high" ? "bg-red-500 w-[80%]" : "bg-orange-500 w-[60%]"}`}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-foreground/50 text-center py-4">No risk indicators detected. All parsed parameters look within normal ranges.</p>
                  )}
                </div>
              </GlassCard>

              <GlassCard className="p-0 overflow-hidden border-green-500/20">
                <div className="bg-green-500/10 p-4 border-b border-green-500/20 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-600">Normal Parameters</h3>
                </div>
                <div className="p-4 space-y-3">
                  {result.normalValues && result.normalValues.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {result.normalValues.map((val, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-foreground/80">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          <span className="truncate">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/50 text-center py-4">No specific normal parameters listed in the summary.</p>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Displaying static Hemoglobin trend for context, or we can make it visually aligned */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" /> Reference Trend Chart
              </h2>
              <div className="h-40 flex items-end justify-between gap-2 px-2 pt-6">
                {[14.2, 13.8, 12.5, 11.2].map((val, i) => (
                  <div key={i} className="w-1/4 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                    <div 
                      className={`w-full max-w-12 rounded-t-lg transition-all ${val < 13 ? 'bg-orange-400' : 'bg-primary'}`}
                      style={{ height: `${(val / 16) * 100}%` }}
                    ></div>
                    <span className="text-xs text-foreground/50">{['Jan', 'Mar', 'Jun', 'Sep'][i]}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-center text-foreground/40 mt-4">Illustration showing Hemoglobin reference trends over time.</p>
            </GlassCard>

            <div className="grid sm:grid-cols-2 gap-6">
              <GlassCard className="p-5 bg-card/50">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-primary">
                  <Stethoscope className="w-5 h-5" /> Health Recommendations
                </h3>
                <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside">
                  {result.recommendations && result.recommendations.length > 0 ? (
                    result.recommendations.map((rec, idx) => (
                      <li key={idx} className="leading-relaxed">{rec}</li>
                    ))
                  ) : (
                    <li>Consult with a healthcare practitioner regarding your overall health summary.</li>
                  )}
                </ul>
              </GlassCard>

              <GlassCard className="p-5 bg-card/50">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-secondary">
                  <HelpCircle className="w-5 h-5" /> Questions for Your Doctor
                </h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {result.questionsToAsk && result.questionsToAsk.length > 0 ? (
                    result.questionsToAsk.map((q, idx) => (
                      <li key={idx} className="bg-background p-2.5 rounded border border-border leading-relaxed">
                        {idx + 1}. {q}
                      </li>
                    ))
                  ) : (
                    <li className="bg-background p-2.5 rounded border border-border">No specific questions generated. Ask about normal ranges and necessary lifestyle adaptations.</li>
                  )}
                </ul>
              </GlassCard>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
