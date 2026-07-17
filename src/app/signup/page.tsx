"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft, Mail, Lock, User, HeartPulse } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-background to-background"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <GlassCard className="p-8 sm:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-4 shadow-lg">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
            <p className="text-sm text-foreground/60 text-center mt-2">Join MediBridge AI for a smarter healthcare experience.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="John Doe" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button className="w-full mt-6 h-12 text-base rounded-xl" onClick={() => window.location.href='/dashboard'}>
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm text-foreground/60 mt-8">
            Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
