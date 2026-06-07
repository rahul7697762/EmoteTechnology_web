'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { MapPin, Globe, Code, PenTool, Mic, Briefcase, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const team = [
  { name: 'Shivam', role: 'Director', icon: Briefcase },
  { name: 'Kusam', role: 'SEO & Social Media Expert', icon: Globe },
  { name: 'Rahul', role: 'Web Developer', icon: Code }
];

const rules = [
  'No PMs between you and us.',
  'No fixed scope sold by people who don\'t build.',
  'No retainers without monthly proof.',
  'No AI slop. Real models, real prompts, reviewed.',
  'No quiet launches. We ship together.',
];

export default function AboutPage() {
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
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050914] to-[#050914]" />
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/></svg>')" }} />

      <Nav />

      <main className="flex-grow container mx-auto px-6 py-12 lg:py-20 relative z-10 max-w-7xl">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-32">
          <motion.div variants={containerVars} initial="hidden" animate="show" className="flex-1 max-w-3xl">
            <motion.div variants={itemVars}>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                About Us
              </div>
            </motion.div>
            <motion.h1 variants={itemVars} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8 drop-shadow-lg">
              A small studio<br />in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Kuala Lumpur</span><br />that ships a lot.
            </motion.h1>
            <motion.p variants={itemVars} className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-6">
              Most agencies bill for hours. We bill for outcomes you can point at — a site that ranks, a bot that books, a phone that picks up at 2am.
            </motion.p>
            <motion.p variants={itemVars} className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
              We started in 2019 making websites for friends. Today we're seven people running web, chat, voice and SEO as one connected practice. The thread is the same: software that listens, and ships.
            </motion.p>
          </motion.div>
        </div>

        {/* Numbers Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 border-y border-white/10 py-12"
        >
          {[
            ['2019', 'founded'], 
            ['127', 'projects shipped'], 
            ['12', 'countries served'], 
            ['7', 'humans on staff']
          ].map(([n, l], i) => (
            <div key={i} className={cn("flex flex-col items-center justify-center text-center", i !== 0 && "md:border-l md:border-white/10")}>
              <div className="text-5xl lg:text-7xl font-bold text-white mb-2 drop-shadow-md">{n}</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-blue-400">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            The Actual Humans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 drop-shadow-md">Meet the team.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex flex-col items-center text-center group shadow-lg">
                <div className="w-20 h-20 rounded-full bg-[#0A101D] border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:border-blue-500/30 transition-colors text-3xl font-bold text-blue-400">
                  {member.name[0]}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values / Manifesto */}
        <div className="mb-32 grid lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
              How We Work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-md">Five rules we don't break.</h2>
            <p className="text-lg text-neutral-400">Our manifesto for shipping great software.</p>
          </div>
          <div className="flex flex-col gap-6">
            {rules.map((rule, i) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent hover:from-white/[0.05] transition-colors flex gap-6 items-center group shadow-lg">
                <span className="text-5xl font-bold text-white/10 group-hover:text-blue-500/20 transition-colors font-mono">0{i + 1}</span>
                <p className="text-xl font-medium text-white/90 group-hover:text-white transition-colors">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Office Location */}
        <div className="mb-20">
          <div className="p-8 md:p-12 rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-[#0A101D] backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                Where We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Bangsar, KL.</h2>
              <p className="text-xl text-neutral-400 mb-8">(And online everywhere else.)</p>
              <div className="flex items-center gap-3 text-blue-400 font-medium">
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="text-sm md:text-base">DSS-15, Trishala City road, Zirakpur, Punjab</span>
              </div>
            </div>
            
            {/* Visual Abstract map/location graphic */}
            <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent opacity-50 animate-pulse" />
              <div className="absolute w-full h-[1px] bg-white/10" />
              <div className="absolute h-full w-[1px] bg-white/10" />
              <div className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,1)] z-10" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20 border-t border-white/10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Hiring? <span className="text-neutral-600">No.</span><br />Always reading? <span className="text-blue-400">Yes.</span></h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">Send a paragraph + a thing you've made. We reply to everyone.</p>
          <Link href="mailto:hr@emotetechnology.in" className="inline-flex items-center gap-3 bg-white text-[#0A101D] px-8 py-4 rounded-xl font-bold overflow-hidden hover:scale-[1.02] transition-transform shadow-lg">
            <span>hr@emotetechnology.in</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
