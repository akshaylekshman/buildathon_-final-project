"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  ArrowRightLeft, 
  Volume2, 
  Copy, 
  Mic, 
  History, 
  Languages 
} from "lucide-react";

export default function TranslationPage() {
  const [sourceLang, setSourceLang] = React.useState("English");
  const [targetLang, setTargetLang] = React.useState("Hindi");
  
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Languages className="w-8 h-8 text-primary" /> Medical Translation
        </h1>
        <p className="text-foreground/60">Translate medical terms and instructions accurately.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Source Text */}
        <GlassCard className="p-0 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-border bg-card/50 flex items-center justify-between">
            <select 
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="bg-transparent font-medium focus:outline-none text-foreground/80 cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Tamil">Tamil</option>
            </select>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-foreground/50">
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          <textarea 
            className="flex-1 w-full bg-transparent p-6 resize-none focus:outline-none min-h-[250px] text-lg leading-relaxed placeholder:text-foreground/30"
            placeholder="Type medical text here..."
            defaultValue="Please take this medicine twice a day after meals."
          />
          <div className="p-3 flex justify-end gap-2 text-foreground/40 border-t border-border bg-background/30">
             <span className="text-xs">51 / 5000</span>
          </div>
        </GlassCard>

        {/* Swap Button (Mobile) */}
        <div className="flex justify-center lg:hidden">
          <Button variant="secondary" size="icon" className="rounded-full shadow-md z-10 -my-6" onClick={swapLanguages}>
            <ArrowRightLeft className="w-5 h-5 rotate-90" />
          </Button>
        </div>

        {/* Target Text */}
        <GlassCard className="p-0 overflow-hidden flex flex-col relative">
          {/* Swap Button (Desktop) */}
          <div className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10">
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg border-4 border-background h-12 w-12" onClick={swapLanguages}>
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
          </div>

          <div className="p-3 border-b border-border bg-card/50 flex items-center justify-between bg-primary/5">
            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="bg-transparent font-medium focus:outline-none text-primary cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
          <textarea 
            className="flex-1 w-full bg-transparent p-6 resize-none focus:outline-none min-h-[250px] text-lg leading-relaxed text-primary font-medium"
            readOnly
            defaultValue="कृपया भोजन के बाद दिन में दो बार यह दवा लें।"
          />
          <div className="p-3 flex items-center gap-2 border-t border-border bg-background/30">
            <Button variant="ghost" size="sm" className="h-9 gap-2 text-foreground/60 hover:text-primary">
              <Copy className="w-4 h-4" /> Copy
            </Button>
            <Button variant="ghost" size="sm" className="h-9 gap-2 text-foreground/60 hover:text-primary">
              <Volume2 className="w-4 h-4" /> Speak
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* History */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 mt-8">
          <History className="w-5 h-5 text-foreground/50" /> Recent Translations
        </h2>
        <div className="space-y-3">
          <GlassCard className="p-4 flex items-center justify-between hover:border-primary/30 cursor-pointer transition-colors">
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-sm text-foreground/50 mb-1 flex items-center gap-2">
                English <ArrowRightLeft className="w-3 h-3" /> Spanish
              </p>
              <p className="font-medium truncate">Blood pressure is slightly elevated.</p>
              <p className="text-primary truncate text-sm">La presión arterial está ligeramente elevada.</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full text-foreground/40 shrink-0">
              <Copy className="w-4 h-4" />
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
