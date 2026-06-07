'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Phone, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const channels = [
  { id: 'email', label: 'Email', value: 'info@emotetechnology.in', icon: Mail, color: 'text-blue-400' },
  { id: 'whatsapp', label: 'WhatsApp', value: '+60 1x xxxx xxxx', icon: MessageSquare, color: 'text-green-400' },
  { id: 'voice', label: 'Voice Agent', value: 'Try it now', icon: Phone, color: 'text-purple-400' },
  { id: 'calendly', label: 'Calendly', value: '20-min intro call', icon: Calendar, color: 'text-orange-400' },
];

const services = ['Web Development', 'SEO', 'Web Chatbot', 'WhatsApp Bots', 'Voice Agents', 'Other'];

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>(['WhatsApp Bots']);

  const toggle = (s: string) =>
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  // Framer Motion variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050914] text-white relative overflow-hidden font-sans pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#050914] to-[#050914]" />
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/></svg>')" }} />

      <Nav />

      <main className="flex-grow container mx-auto px-6 py-12 lg:py-20 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Text & Channels */}
          <motion.div 
            variants={containerVars} initial="hidden" animate="show"
            className="flex flex-col gap-10"
          >
            <motion.div variants={itemVars}>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <span className="relative flex h-2 w-2 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Let's Build Something
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
                Tell us what<br />you're <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">stuck on.</span>
              </h1>
              <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
                One sentence is enough. We'll come back with one idea, three options, zero pitch decks.
              </p>
            </motion.div>

            <motion.div variants={itemVars} className="grid sm:grid-cols-2 gap-4 mt-4">
              {channels.map((channel) => (
                <div 
                  key={channel.id}
                  className="group relative flex flex-col p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-900/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <channel.icon className={cn("w-8 h-8 mb-4 drop-shadow-md", channel.color)} strokeWidth={1.5} />
                  <div className="text-sm text-neutral-400 font-medium mb-1">{channel.label}</div>
                  <div className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors drop-shadow-sm">{channel.value}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVars} className="mt-4 flex items-center gap-5 text-neutral-400 p-6 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                <MapPin className="w-6 h-6 text-blue-400 drop-shadow-md" />
              </div>
              <div>
                <div className="text-base font-semibold text-white mb-1 tracking-tight">Office · Bangsar, KL</div>
                <div className="text-sm">Mon–Fri · 10:00 AM – 6:00 PM MYT</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Soft glow behind form */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-50 pointer-events-none" />
            
            <div className="relative p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-[#0A101D]/80 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-white tracking-tight drop-shadow-md">Project Inquiry</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Company (Optional)</label>
                  <input type="text" placeholder="Acme Corp" className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner" />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">I'm interested in...</label>
                  <div className="flex flex-wrap gap-2.5">
                    {services.map(s => (
                      <button
                        key={s}
                        onClick={() => toggle(s)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                          selected.includes(s) 
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-[1.02]" 
                            : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">Project Details</label>
                  <textarea 
                    placeholder="Tell us a bit about your current situation and what you're looking to achieve..." 
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none shadow-inner" 
                  />
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-sm text-neutral-400 flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    Usually replies within 24h
                  </span>
                  <button className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-[#0A101D] px-8 py-3.5 rounded-xl font-bold overflow-hidden hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Send Request</span>
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
