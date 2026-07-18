"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { HeartPulse, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const MOCK_GOOGLE_ACCOUNTS = [
  { name: "Akshay", email: "akshay@gmail.com", avatar: "A" },
  { name: "Betty Joseph", email: "betty@gmail.com", avatar: "B" },
  { name: "Guest User", email: "guest@gmail.com", avatar: "G" }
];

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectGoogleAccount = async (account: typeof MOCK_GOOGLE_ACCOUNTS[0]) => {
    setShowGooglePrompt(false);
    setIsLoading(true);
    setError(null);
    try {
      // Decode helper supporting utf-8 to safe base64
      const utob = (str: string) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
      
      const header = utob(JSON.stringify({ alg: "RS256", kid: "mock-kid" }));
      const payload = utob(JSON.stringify({
        iss: "accounts.google.com",
        sub: `google-oauth-${account.email.split("@")[0]}`,
        email: account.email,
        email_verified: true,
        name: account.name,
        picture: `https://api.dicebear.com/7.x/initials/svg?seed=${account.name}`
      }));
      
      const mockToken = `${header}.${payload}.mock-signature`;
      const result = await loginWithGoogle(mockToken);
      if (!result.success) {
        setError(result.error || "Google Sign-In failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred during Google Sign-In.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Sleek ambient glow backgrounds for clean PC aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        <GlassCard className="p-8 md:p-10 border border-white/10 dark:border-white/5 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-4 shadow-xl shadow-primary/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome to Nexcare AI</h2>
            <p className="text-foreground/50 mt-1.5 text-sm">Sign in to manage your health</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-card/50 border border-border text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/10 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Minimalist Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-foreground/40 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={() => setShowGooglePrompt(true)}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-card border border-border hover:bg-card/85 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm font-semibold text-foreground/80 shadow-sm cursor-pointer"
          >
            <GoogleIcon />
            Sign in with Google
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/50">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Account Chooser Dialog */}
      <AnimatePresence>
        {showGooglePrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-[360px] bg-card border border-border/80 rounded-xl shadow-2xl overflow-hidden text-foreground"
            >
              <div className="p-6 text-center border-b border-border/50">
                <div className="flex justify-center mb-3">
                  <GoogleIcon />
                </div>
                <h3 className="text-sm font-bold">Sign in with Google</h3>
                <p className="text-xs text-foreground/50 mt-1">Choose an account to continue to Nexcare AI</p>
              </div>

              <div className="p-2.5 max-h-[280px] overflow-y-auto space-y-1">
                {MOCK_GOOGLE_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleSelectGoogleAccount(account)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-colors text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 group-hover:bg-primary/20 transition-colors">
                      {account.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold truncate text-foreground/90">{account.name}</p>
                      <p className="text-[10px] text-foreground/45 truncate">{account.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-border/50 bg-secondary/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowGooglePrompt(false)}
                  className="px-4 py-1.5 rounded-lg border border-border text-[11px] font-semibold hover:bg-secondary/30 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
