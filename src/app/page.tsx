"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  ArrowRight, 
  Upload, 
  Brain, 
  HeartPulse,
  MessageSquare,
  FileText,
  Clipboard,
  Mic,
  Languages,
  Calendar,
  Bell,
  Users,
  Users2,
  BarChart3,
  Library,
  WifiOff
} from "lucide-react";

const features = [
  { icon: MessageSquare, title: "AI Chat", desc: "Conversational healthcare assistant" },
  { icon: FileText, title: "Prescription Analyzer", desc: "Extract and explain medicine details" },
  { icon: Clipboard, title: "Medical Report", desc: "Simplify complex test results" },
  { icon: Mic, title: "Voice Assistant", desc: "Speak directly to your AI doctor" },
  { icon: Languages, title: "Translation", desc: "Multilingual medical support" },
  { icon: Calendar, title: "Appointments", desc: "Book and manage hospital visits" },
  { icon: Bell, title: "Medicine Reminder", desc: "Never miss a dose again" },
  { icon: Users, title: "Healthcare Worker", desc: "Dashboard for community health" },
  { icon: Users2, title: "Family Profiles", desc: "Manage health for all dependents" },
  { icon: BarChart3, title: "Analytics", desc: "Track health trends over time" },
  { icon: Library, title: "Medical Library", desc: "WHO verified health guidelines" },
  { icon: WifiOff, title: "Offline Support", desc: "Basic features without internet" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/10 dark:border-white/5 bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
              N
            </div>
            <span className="font-bold text-xl tracking-tight">NEXCARE AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide border border-primary/20 inline-block mb-6">
              Powered by Gemma 4
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              AI Powered <br className="hidden md:block" />
              <span className="text-primary">Healthcare Assistant</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Understand prescriptions, simplify medical reports, communicate in your language, and manage healthcare intelligently using state-of-the-art AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full">
                  Try Demo <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full bg-background">
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="aspect-[16/9] rounded-2xl md:rounded-[32px] overflow-hidden border border-border/50 shadow-2xl glass-panel relative bg-gradient-to-br from-card/80 to-card/40">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                {/* Placeholder for AI Doctor Illustration */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-accent p-1 animate-pulse shadow-[0_0_60px_rgba(37,99,235,0.4)]">
                  <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                    <HeartPulse className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Holographic Medical Dashboard</h3>
                  <p className="text-foreground/60 max-w-md mx-auto">Your personal AI doctor is ready to assist you.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-card/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How it works</h2>
            <p className="text-foreground/60 text-lg">Three simple steps to better healthcare.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard interactive className="text-center p-10 relative">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Upload</h3>
              <p className="text-foreground/60">Take a photo of your prescription or upload a PDF medical report.</p>
            </GlassCard>
            
            <GlassCard interactive className="text-center p-10 relative">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Gemma AI</h3>
              <p className="text-foreground/60">Our advanced AI securely analyzes and extracts all vital information.</p>
            </GlassCard>

            <GlassCard interactive className="text-center p-10 relative">
              <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Easy Guidance</h3>
              <p className="text-foreground/60">Get simple explanations, reminders, and actionable health insights.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive Features</h2>
            <p className="text-foreground/60 text-lg max-w-2xl">Everything you need to manage health intelligently, all in one premium platform.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <GlassCard key={idx} interactive className="p-6">
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-4 text-foreground/80">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-foreground/60">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">99%</div>
              <div className="text-primary-foreground/80 font-medium">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">50+</div>
              <div className="text-primary-foreground/80 font-medium">Languages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">24/7</div>
              <div className="text-primary-foreground/80 font-medium">Availability</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2">1M+</div>
              <div className="text-primary-foreground/80 font-medium">Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg">
              N
            </div>
            <span className="font-bold tracking-tight text-foreground/80">NEXCARE AI</span>
          </div>
          <p className="text-sm text-foreground/50">© 2026 NEXCARE AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
