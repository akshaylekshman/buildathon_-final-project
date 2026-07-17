"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Users,
  Download
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/Button";

const adherenceData = [
  { name: 'Mon', completed: 100, missed: 0 },
  { name: 'Tue', completed: 80, missed: 20 },
  { name: 'Wed', completed: 100, missed: 0 },
  { name: 'Thu', completed: 60, missed: 40 },
  { name: 'Fri', completed: 100, missed: 0 },
  { name: 'Sat', completed: 100, missed: 0 },
  { name: 'Sun', completed: 50, missed: 50 },
];

const healthTrendData = [
  { month: 'Jan', bp: 130, sugar: 110 },
  { month: 'Feb', bp: 128, sugar: 105 },
  { month: 'Mar', bp: 125, sugar: 100 },
  { month: 'Apr', bp: 122, sugar: 95 },
  { month: 'May', bp: 120, sugar: 92 },
  { month: 'Jun', bp: 118, sugar: 90 },
];

const diseaseData = [
  { name: 'Hypertension', value: 400 },
  { name: 'Diabetes', value: 300 },
  { name: 'Asthma', value: 300 },
  { name: 'Anemia', value: 200 },
];

const COLORS = ['#2563EB', '#0EA5E9', '#14B8A6', '#8B5CF6'];

export default function AnalyticsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" /> Health Analytics
          </h1>
          <p className="text-foreground/60">Visualize your health trends and medicine adherence over time.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-card">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-primary">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Overall Health Score</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">85</p>
              <span className="text-sm font-medium text-green-500 mb-1">+2 pts</span>
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-teal-500">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Medicine Adherence</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">84%</p>
              <span className="text-sm font-medium text-red-500 mb-1">-4%</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex items-center gap-4 border-l-4 border-l-purple-500">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground/60">Active Profiles</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">3</p>
              <span className="text-sm font-medium text-foreground/40 mb-1">Family members</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-6">Medicine Adherence (This Week)</h2>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adherenceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.6 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.6 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="completed" stackId="a" fill="var(--primary)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="missed" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-6">Health Trends (Last 6 Months)</h2>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.6 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.6 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="bp" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="sugar" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm font-medium text-foreground/60">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> Blood Pressure (Sys)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent"></span> Blood Sugar (Fasting)</div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-6">Disease Distribution (Community View)</h2>
          <div className="h-72 w-full flex items-center justify-center">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {diseaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 px-8">
             {diseaseData.map((d, i) => (
               <div key={i} className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                   <span className="font-medium">{d.name}</span>
                 </div>
                 <span className="text-foreground/60">{d.value}</span>
               </div>
             ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-xl font-bold mb-6">Monthly Summary insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Improvement Detected
              </h4>
              <p className="text-sm text-foreground/70">Your fasting blood sugar has decreased by 18% over the last 6 months. Keep up the good diet and exercise.</p>
            </div>
            
            <div className="p-4 bg-card rounded-xl border border-border">
              <h4 className="font-bold text-orange-500 mb-1 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Attention Needed
              </h4>
              <p className="text-sm text-foreground/70">Medicine adherence dropped to 50% on Sunday. Would you like to set a stronger alarm or SMS reminder?</p>
              <Button variant="outline" size="sm" className="mt-3 text-xs h-8">Update Reminders</Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
