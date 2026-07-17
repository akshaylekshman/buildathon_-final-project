"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Pill,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Stethoscope,
  Activity,
  Shield,
  Zap,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { reviewMedicine } from "@/services/api";

interface SideEffects {
  common: string[];
  severe: string[];
}

interface ReviewResult {
  name: string;
  drugClass: string;
  uses: string[];
  sideEffects: SideEffects;
  dosageNotes: string;
  warnings: string[];
  isAppropriate: boolean | null;
  appropriatenessReason: string;
  alternatives: string[];
}

const EXAMPLE_MEDICINES = [
  { name: "Metformin", sickness: "Type 2 Diabetes" },
  { name: "Amoxicillin", sickness: "Bacterial infection" },
  { name: "Ibuprofen", sickness: "Joint pain" },
  { name: "Paracetamol", sickness: "Fever" },
  { name: "Atorvastatin", sickness: "High cholesterol" },
  { name: "Cetirizine", sickness: "Allergies" },
];

export default function MedicineReviewerPage() {
  const [medicineName, setMedicineName] = React.useState("");
  const [sickness, setSickness] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<ReviewResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleReview = async (name?: string, symptom?: string) => {
    const med = name || medicineName;
    if (!med.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    if (name) {
      setMedicineName(name);
      setSickness(symptom || "");
    }

    try {
      const data = await reviewMedicine(med, symptom ?? sickness);
      if (data && data.success !== false) {
        setResult(data);
      } else {
        setError(data?.error || "Gemma could not parse this medicine. Please try a more specific name.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to the local Gemma model. Please ensure Ollama is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleReview();
  };

  const AppropriatenessCard = () => {
    if (!result || result.isAppropriate === null) return null;
    const isGood = result.isAppropriate;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <GlassCard className={`p-0 overflow-hidden border-2 ${isGood ? "border-green-500/30" : "border-red-500/30"}`}>
          <div className={`p-4 flex items-center gap-3 ${isGood ? "bg-green-500/10" : "bg-red-500/10"}`}>
            {isGood
              ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
              : <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
            <div>
              <h3 className={`font-bold ${isGood ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {isGood ? "✓ Indicated for your condition" : "✗ Not recommended for your condition"}
              </h3>
              <p className="text-sm text-foreground/70 mt-0.5">{result.appropriatenessReason}</p>
            </div>
          </div>
          {result.alternatives && result.alternatives.length > 0 && !isGood && (
            <div className="p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider flex items-center gap-2">
                <ArrowRight className="w-3 h-3" /> Better alternatives for your condition
              </p>
              <div className="flex flex-wrap gap-2">
                {result.alternatives.map((alt, i) => (
                  <button
                    key={i}
                    onClick={() => handleReview(alt, sickness)}
                    className="px-3 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors font-medium"
                  >
                    {alt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
            <Pill className="w-5 h-5" />
          </span>
          Medicine Reviewer
        </h1>
        <p className="text-foreground/60">
          Enter any medicine name to get a Gemma AI-powered review of its uses, side effects, and suitability for your condition.
        </p>
      </div>

      {/* Search Area */}
      <GlassCard className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
              <Pill className="w-4 h-4 text-primary" /> Medicine Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                placeholder="e.g. Metformin, Amoxicillin..."
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-secondary" /> Your Sickness / Symptom <span className="text-foreground/40 text-xs font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                placeholder="e.g. Fever, Diabetes, Joint pain..."
                value={sickness}
                onChange={(e) => setSickness(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full gap-2 py-6 text-base font-semibold shadow-lg"
          onClick={() => handleReview()}
          disabled={loading || !medicineName.trim()}
        >
          {loading ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing with Gemma AI...</>
          ) : (
            <><Search className="w-4 h-4" /> Review Medicine</>
          )}
        </Button>

        {/* Quick examples */}
        <div className="space-y-2">
          <p className="text-xs text-foreground/40 font-medium uppercase tracking-wider">Quick examples</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_MEDICINES.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleReview(ex.name, ex.sickness)}
                className="px-3 py-1.5 text-xs bg-card border border-border rounded-full hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all font-medium text-foreground/70"
              >
                {ex.name} · {ex.sickness}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard className="p-4 border-red-500/20 bg-red-500/5 flex items-center gap-3 text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm flex-1">{error}</span>
              <Button size="sm" variant="ghost" onClick={() => setError(null)}>Dismiss</Button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading skeleton */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <GlassCard className="p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Pill className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg">Gemma is reviewing <span className="text-primary">{medicineName}</span>...</p>
              <p className="text-sm text-foreground/50 mt-1 animate-pulse">Analyzing pharmacological data, uses, side effects, and compatibility.</p>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Medicine Header Card */}
            <GlassCard className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Pill className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{result.name}</h2>
                    <span className="inline-block mt-1 px-3 py-0.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                      {result.drugClass}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleReview()} title="Refresh">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              {result.dosageNotes && (
                <div className="mt-4 p-3 bg-background/50 rounded-xl border border-border text-sm text-foreground/70 flex gap-2">
                  <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{result.dosageNotes}</span>
                </div>
              )}
            </GlassCard>

            {/* Appropriateness for sickness */}
            {sickness && <AppropriatenessCard />}

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Uses */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <GlassCard className="p-5 h-full border-green-500/20">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-5 h-5" /> Medical Uses
                  </h3>
                  <ul className="space-y-2">
                    {result.uses?.map((use, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>

              {/* Side Effects */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <GlassCard className="p-5 h-full space-y-4 border-orange-500/20">
                  <h3 className="font-bold flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <AlertTriangle className="w-5 h-5" /> Side Effects
                  </h3>
                  {result.sideEffects?.common?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Common</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.sideEffects.common.map((se, i) => (
                          <span key={i} className="px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs rounded-full border border-orange-500/20">
                            {se}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.sideEffects?.severe?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Severe / Rare</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.sideEffects.severe.map((se, i) => (
                          <span key={i} className="px-2 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-xs rounded-full border border-red-500/20">
                            {se}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </div>

            {/* Warnings */}
            {result.warnings?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <GlassCard className="p-5 border-yellow-500/20 bg-yellow-500/5">
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Shield className="w-5 h-5" /> Warnings & Precautions
                  </h3>
                  <ul className="space-y-2">
                    {result.warnings.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 mt-0.5 shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            )}

            {/* Alternatives (when no sickness specified but alternatives exist) */}
            {(!sickness || result.isAppropriate === true) && result.alternatives?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <GlassCard className="p-5">
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5" /> Related / Alternative Medicines
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.alternatives.map((alt, i) => (
                      <button
                        key={i}
                        onClick={() => handleReview(alt, sickness)}
                        className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        {alt}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Disclaimer */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="flex items-start gap-2 p-4 rounded-xl bg-card/50 border border-border text-xs text-foreground/40">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>This review is generated by a local AI model (Gemma 4) for informational purposes only. Always consult a qualified healthcare professional before taking or changing any medication.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
