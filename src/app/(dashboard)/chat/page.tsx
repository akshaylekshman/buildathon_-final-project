"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Send, 
  Mic, 
  Image as ImageIcon, 
  FileText, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw, 
  Square, 
  Download,
  Plus,
  MessageSquare,
  Bot,
  User
} from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello John! I'm Gemma, your AI healthcare assistant. How can I help you today? You can ask me about your symptoms, upload a prescription, or discuss your recent test reports.",
    }
  ]);
  const [inputValue, setInputValue] = React.useState("");

  const suggestedQuestions = [
    "What should I do for a mild fever?",
    "Explain my recent blood test report",
    "Remind me to take my medicines",
    "What are the side effects of Paracetamol?"
  ];

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-6">
      {/* Sidebar - Chat History */}
      <div className="w-64 hidden lg:flex flex-col gap-4">
        <Button className="w-full gap-2 rounded-xl" variant="outline">
          <Plus className="w-4 h-4" /> New Chat
        </Button>
        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
          <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">Today</div>
          <button className="w-full text-left px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm truncate flex items-center gap-3">
            <MessageSquare className="w-4 h-4 shrink-0" />
            Mild headache symptoms
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-card text-foreground/70 font-medium text-sm truncate flex items-center gap-3 transition-colors">
            <MessageSquare className="w-4 h-4 shrink-0" />
            Blood test explanation
          </button>
          
          <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 mt-6 px-2">Previous 7 Days</div>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-card text-foreground/70 font-medium text-sm truncate flex items-center gap-3 transition-colors">
            <MessageSquare className="w-4 h-4 shrink-0" />
            Prescription for fever
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold">Gemma AI</h2>
              <p className="text-xs text-primary font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" title="Export Chat">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          {messages.length === 1 && (
            <div className="grid sm:grid-cols-2 gap-4 mb-8 mt-4">
              {suggestedQuestions.map((q, i) => (
                <button key={i} className="text-left p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all text-sm font-medium text-foreground/80">
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className="space-y-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-card border border-border rounded-tl-sm'}`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-foreground/40 hover:text-foreground hover:bg-card rounded-md transition-colors"><Copy className="w-4 h-4" /></button>
                    <button className="p-1.5 text-foreground/40 hover:text-foreground hover:bg-card rounded-md transition-colors"><RefreshCw className="w-4 h-4" /></button>
                    <button className="p-1.5 text-foreground/40 hover:text-green-500 hover:bg-card rounded-md transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                    <button className="p-1.5 text-foreground/40 hover:text-red-500 hover:bg-card rounded-md transition-colors"><ThumbsDown className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {/* Typing indicator placeholder */}
          {/* <div className="flex gap-4 max-w-[85%]">...</div> */}
        </div>

        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-md">
          <div className="flex items-end gap-2 bg-card border border-border rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <div className="flex items-center gap-1 pb-1 pl-1">
              <button className="p-2 text-foreground/50 hover:text-primary transition-colors rounded-full hover:bg-primary/10">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-foreground/50 hover:text-primary transition-colors rounded-full hover:bg-primary/10">
                <FileText className="w-5 h-5" />
              </button>
            </div>
            
            <textarea 
              className="flex-1 bg-transparent resize-none border-none focus:outline-none p-2 max-h-32 min-h-[44px] text-sm custom-scrollbar"
              placeholder="Message Gemma AI..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={1}
            />

            <div className="flex items-center gap-1 pb-1 pr-1">
              {inputValue ? (
                <button className="p-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-md">
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <button className="p-2.5 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <p className="text-center text-[10px] text-foreground/40 mt-3">
            Gemma AI can make mistakes. Always consult a real doctor for serious conditions.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
