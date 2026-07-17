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
  BarChart2
} from "lucide-react";

export default function MedicalReportAnalyzerPage() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState(true); // Mocking result state

  return (
    <div className="space-y-8 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Medical Report Analyzer</h1>
          <p className="text-foreground/60">Upload lab reports to get a simplified summary and health insights.</p>
        </div>
        {result && (
          <Button variant="outline" className="gap-2 bg-card shrink-0">
            <Download className="w-4 h-4" /> Export Summary
          </Button>
        )}
      </div>

      {!result ? (
        <GlassCard className="border-dashed border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors py-20 flex flex-col items-center justify-center text-center cursor-pointer">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6 animate-pulse">
            <Upload className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold mb-2">Upload Lab Report (PDF)</h3>
          <p className="text-foreground/60 max-w-md mb-8">
            Securely upload your blood test, MRI, or any other lab report. Gemma AI will summarize it in plain English.
          </p>
          <Button className="gap-2"><FileText className="w-4 h-4" /> Browse PDF Files</Button>
        </GlassCard>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar / PDF Preview */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="p-4 flex flex-col h-[600px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="font-semibold text-sm">CBC_Report_JohnDoe.pdf</span>
                <Button variant="ghost" size="sm" className="h-8">Change File</Button>
              </div>
              <div className="flex-1 bg-card rounded-xl border border-border flex flex-col items-center justify-center relative overflow-hidden">
                {/* Mock PDF Viewer */}
                <div className="absolute top-0 w-full p-4 space-y-2 opacity-30">
                  <div className="h-4 bg-foreground/50 rounded w-3/4"></div>
                  <div className="h-4 bg-foreground/50 rounded w-1/2"></div>
                  <div className="h-4 bg-foreground/50 rounded w-full mt-6"></div>
                  <div className="h-4 bg-foreground/50 rounded w-5/6"></div>
                  <div className="h-4 bg-foreground/50 rounded w-4/6"></div>
                  <div className="h-32 border-2 border-dashed border-foreground/30 rounded mt-8"></div>
                </div>
                <div className="z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-border shadow-sm">
                  <FileText className="w-4 h-4 text-primary" /> Preview Disabled
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
                Your Complete Blood Count (CBC) report looks mostly normal. However, your <strong className="text-primary">Hemoglobin (Hb) levels are slightly lower</strong> than the standard range, which might indicate mild anemia. This could be why you've been feeling unusually tired lately. Your white blood cell count is perfect, meaning there's no sign of active infection.
              </p>
            </GlassCard>

            <div className="grid sm:grid-cols-2 gap-6">
              <GlassCard className="p-0 overflow-hidden border-orange-500/20">
                <div className="bg-orange-500/10 p-4 border-b border-orange-500/20 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-orange-600">Risk Indicators</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Hemoglobin</span>
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-600 text-xs font-bold rounded">11.2 g/dL (Low)</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-foreground/50 mt-1">Normal Range: 13.8 - 17.2 g/dL</p>
                </div>
              </GlassCard>

              <GlassCard className="p-0 overflow-hidden border-green-500/20">
                <div className="bg-green-500/10 p-4 border-b border-green-500/20 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-600">Normal Values</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>WBC Count</span>
                    <span className="font-medium">6.5 K/uL</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Platelets</span>
                    <span className="font-medium">250 K/uL</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>RBC Count</span>
                    <span className="font-medium">4.8 M/uL</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" /> Historical Trend (Hemoglobin)
              </h2>
              <div className="h-48 flex items-end justify-between gap-2 px-2">
                {/* Mock Chart */}
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
            </GlassCard>

            <div className="grid sm:grid-cols-2 gap-6">
              <GlassCard className="p-5 bg-card/50">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-primary">
                  <Stethoscope className="w-5 h-5" /> Doctor Recommendations
                </h3>
                <ul className="space-y-2 text-sm text-foreground/80 list-disc list-inside">
                  <li>Increase iron-rich foods (spinach, red meat, lentils).</li>
                  <li>Consider taking a Vitamin C supplement to boost iron absorption.</li>
                  <li>Consult doctor about potential iron supplements.</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-5 bg-card/50">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-secondary">
                  <HelpCircle className="w-5 h-5" /> Questions to Ask
                </h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="bg-background p-2 rounded border border-border">1. Do I need an iron supplement, or is diet enough?</li>
                  <li className="bg-background p-2 rounded border border-border">2. When should I repeat this blood test?</li>
                </ul>
              </GlassCard>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
