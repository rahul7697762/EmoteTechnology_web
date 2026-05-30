'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA DICTIONARY ---
const servicesData: Record<string, any> = {
  'web': {
    title: "Cinematic Web",
    subtitle: "Web Development",
    desc: "We build high-end, immersive websites that refuse to be ignored. Custom 3D interactions, GSAP animations, and pixel-perfect layouts designed to convert.",
    metrics: [["14d", "Avg. Launch"], ["100%", "Custom Code"], ["Sub-1s", "Load Time"]],
    scope: [
      ["Design System", "Custom typography, colors, and interactive tokens."],
      ["3D & Motion", "GSAP ScrollTriggers and Framer Motion integration."],
      ["SEO Ready", "Technical SEO and semantic HTML built-in."],
      ["Headless CMS", "Sanity or Contentful for easy content editing."],
    ],
    pricing: [
      { name: "Starter", price: "RM 12k", unit: "one-time", body: "3-page cinematic landing experience with core animations." },
      { name: "Platform", price: "RM 25k", unit: "one-time", body: "Full multi-page architecture, CMS integration, and complex 3D routing." }
    ]
  },
  'seo': {
    title: "Data-Driven Search",
    subtitle: "SEO Architecture",
    desc: "Stop guessing. We engineer your platform's technical architecture and content hierarchy to dominate search results and capture high-intent traffic.",
    metrics: [["3x", "Traffic Growth"], ["Top 3", "Ranking Focus"], ["0", "Blackhat Tactics"]],
    scope: [
      ["Technical Audit", "Deep-dive into core web vitals and crawlability."],
      ["Keyword Matrix", "High-intent semantic clustering."],
      ["Content Engine", "Programmatic SEO and structured data implementation."],
      ["Authority Building", "White-hat link acquisition strategies."],
    ],
    pricing: [
      { name: "Foundation", price: "RM 5k", unit: "one-time", body: "Technical overhaul, schema markup, and initial keyword mapping." },
      { name: "Growth", price: "RM 3k", unit: "/ month", body: "Ongoing content creation, link building, and rank tracking." }
    ]
  },
  'whatsapp-chatbot': {
    title: "WhatsApp Chatbots",
    subtitle: "Automated Support",
    desc: "Meet your customers where they already are. We build verified, on-brand WhatsApp bots that book, qualify and route — in any language.",
    metrics: [["10d", "Avg. Launch"], ["89%", "Auto-handled"], ["24/7", "Always Up"]],
    scope: [
      ["Verified WABA setup", "Green-tick, business profile, templates approved."],
      ["Conversation flows", "Up to 8 intents, with handoff to a human."],
      ["CRM integration", "HubSpot, Pipedrive, or your custom backend."],
      ["Payments + bookings", "In-thread payments and calendar slots."],
    ],
    pricing: [
      { name: "Launch", price: "RM 18k", unit: "one-time", body: "Up to 4 intents · 30-day iteration · WABA setup" },
      { name: "Operate", price: "RM 4.8k", unit: "/ month", body: "Ongoing flows · analytics · monthly improvements" }
    ]
  },
  'voice': {
    title: "AI Voice Agents",
    subtitle: "Intelligent Reception",
    desc: "Never miss a lead. Our AI voice agents answer calls, qualify leads, and book appointments 24/7 with human-like latency and emotion.",
    metrics: [["<800ms", "Latency"], ["24/7", "Availability"], ["100%", "Call Answer Rate"]],
    scope: [
      ["Custom Voice Clone", "Brand-aligned voice personas and accents."],
      ["Dynamic Routing", "Live call transfers based on intent severity."],
      ["Real-time Calendar", "Direct integration with Calendly or Google Calendar."],
      ["Post-call SMS", "Automated follow-up texts with summary links."],
    ],
    pricing: [
      { name: "Setup", price: "RM 15k", unit: "one-time", body: "Custom voice training, SIP trunking, and intent mapping." },
      { name: "Usage", price: "RM 0.50", unit: "/ minute", body: "Pay strictly for active conversational minutes." }
    ]
  },
  'web-chatbot': {
    title: "Web Chatbots",
    subtitle: "Site Assistants",
    desc: "Turn your website into a 24/7 sales rep. We build context-aware AI chatbots that understand your documentation and guide users to conversion.",
    metrics: [["95%", "Resolution Rate"], ["0s", "Wait Time"], ["Multi", "Language Support"]],
    scope: [
      ["Knowledge Base Sync", "Trained on your PDFs, URLs, and Zendesk."],
      ["Lead Capture", "In-chat forms and meeting schedulers."],
      ["Human Handoff", "Seamless transition to live support agents."],
      ["Custom UI", "Beautiful, brand-matched chat widget styling."],
    ],
    pricing: [
      { name: "Integration", price: "RM 8k", unit: "one-time", body: "Widget deployment, initial training, and platform setup." },
      { name: "Managed", price: "RM 2k", unit: "/ month", body: "Continuous AI training and conversation optimization." }
    ]
  }
};

export default function ServicePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const data = servicesData[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050914] text-white">
        <h1 className="text-3xl">Service not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050914] text-white relative overflow-hidden font-sans pt-24">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050914] to-[#050914]" />
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/></svg>')" }} />

      <Nav />

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 py-12 lg:py-20 relative z-10 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              {data.subtitle}
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 drop-shadow-lg"
          >
            {data.title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{data.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12"
          >
            {data.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/contact" className="group relative flex items-center gap-3 bg-white text-[#0A101D] px-8 py-4 rounded-xl font-bold overflow-hidden hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-lg">
              <span className="relative">Book a Build Call</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Metrics Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          {data.metrics.map(([val, label]: [string, string], i: number) => (
            <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-colors shadow-xl">
              <div className="text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{val}</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scope Section */}
        <div className="mb-32">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            01 &middot; Scope
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 drop-shadow-md">What ships in the build.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.scope.map(([h, b]: [string, string], i: number) => (
              <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex gap-6 items-start group shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all border border-blue-500/20 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{h}</h3>
                  <p className="text-neutral-400 leading-relaxed">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            02 &middot; Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 drop-shadow-md">Transparent investments.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.pricing.map((plan: any, i: number) => (
              <div key={i} className={cn(
                "p-10 rounded-[2.5rem] border flex flex-col relative overflow-hidden shadow-2xl",
                i === 1 
                  ? "border-blue-500/30 bg-gradient-to-b from-blue-900/20 to-transparent" 
                  : "border-white/10 bg-white/[0.02]"
              )}>
                {i === 1 && <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />}
                
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Plan 0{i + 1}</span>
                <h3 className="text-3xl font-bold text-white mb-8">{plan.name}</h3>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm font-semibold text-neutral-400">{plan.unit}</span>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-10 flex-grow">{plan.body}</p>
                
                <Link href="/contact" className={cn(
                  "w-full py-4 rounded-xl font-bold text-center transition-all",
                  i === 1 
                    ? "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}>
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
