'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Search, Clock, Calendar, ArrowRight, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const tags = ['All', 'SEO', 'Voice AI', 'Chatbots', 'WhatsApp', 'Engineering', 'Behind the work'];

const posts = [
  { title: 'How we rank local plumbers in 90 days', tag: 'SEO', mins: '5 min', date: "Mar '26", featured: true },
  { title: 'Designing voice agents that don\'t sound like voice agents', tag: 'Voice AI', mins: '8 min', date: "Mar '26" },
  { title: 'When NOT to build a chatbot', tag: 'Chatbots', mins: '4 min', date: "Feb '26" },
  { title: 'WhatsApp WABA: the part nobody warns you about', tag: 'WhatsApp', mins: '6 min', date: "Feb '26" },
  { title: 'Our internal LLM prompt template, annotated', tag: 'Engineering', mins: '7 min', date: "Jan '26" },
  { title: 'What 127 projects taught us about scope', tag: 'Behind the work', mins: '5 min', date: "Jan '26" },
  { title: 'Local SEO playbook for clinics, free', tag: 'SEO', mins: '12 min', date: "Dec '25" },
];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filteredPosts = activeTag === 'All' 
    ? posts.filter(p => !p.featured) 
    : posts.filter(p => p.tag === activeTag && !p.featured);

  const featured = posts.find(p => p.featured);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
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
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
          <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={itemVars}>
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                The Journal
              </div>
            </motion.div>
            <motion.h1 variants={itemVars} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8 drop-shadow-lg">
              Field notes<br />from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">build.</span>
            </motion.h1>
            <motion.p variants={itemVars} className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed">
              Half playbooks, half post-mortems. Written by the people who shipped the thing.
            </motion.p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 p-4 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-lg"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mr-2 px-2">Filter</span>
            {tags.map((t) => (
              <button 
                key={t}
                onClick={() => setActiveTag(t)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                  activeTag === t 
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                    : "bg-transparent border-transparent text-neutral-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
            />
          </div>
        </motion.div>

        {/* Featured Post (only show if 'All' is selected) */}
        <AnimatePresence mode="wait">
          {activeTag === 'All' && featured && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, margin: 0 }} transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <div className="group rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-[#0A101D] overflow-hidden flex flex-col md:flex-row items-stretch shadow-2xl hover:border-blue-500/40 transition-colors">
                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#0A101D] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                  {/* Abstract placeholder visual */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center opacity-20 rotate-[-15deg] scale-150">
                    <div className="w-full h-8 bg-blue-500/30 blur-md rounded-full" />
                    <div className="w-3/4 h-8 bg-purple-500/30 blur-md rounded-full" />
                    <div className="w-1/2 h-8 bg-cyan-500/30 blur-md rounded-full" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-500/30">Featured</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-neutral-400 text-xs font-bold uppercase tracking-widest border border-white/10">{featured.tag}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-md group-hover:text-blue-300 transition-colors">{featured.title}</h2>
                  <div className="flex items-center gap-6 text-sm text-neutral-400 mb-8 font-medium">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featured.mins}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featured.date}</span>
                  </div>
                  <Link href="#" className="inline-flex items-center gap-3 bg-white text-[#0A101D] px-6 py-3 rounded-xl font-bold overflow-hidden hover:scale-[1.02] transition-transform shadow-lg self-start">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {filteredPosts.map((post, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                key={post.title} 
                className="group flex flex-col p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-900/10 hover:border-white/10 cursor-pointer"
              >
                <div className="w-full h-48 rounded-2xl bg-[#0A101D] border border-white/5 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-blue-300 text-[10px] font-bold uppercase tracking-widest border border-white/10 group-hover:border-blue-500/30 transition-colors">{post.tag}</span>
                </div>
                <h3 className="text-xl font-bold leading-snug mb-4 group-hover:text-blue-300 transition-colors">{post.title}</h3>
                
                <div className="mt-auto pt-6 flex items-center justify-between text-xs text-neutral-500 font-medium border-t border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.mins}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mb-32">
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors mr-2">
            &larr;
          </button>
          {[1, 2, 3, '...', 8].map((p, i) => (
            <button key={i} className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors border",
              p === 1 
                ? "bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white",
              p === '...' && "bg-transparent border-transparent cursor-default hover:bg-transparent hover:text-neutral-400"
            )}>
              {p}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors ml-2">
            &rarr;
          </button>
        </div>

        {/* Newsletter */}
        <div className="p-10 md:p-16 rounded-[3rem] border border-blue-500/20 bg-gradient-to-br from-[#0A101D] to-blue-900/20 backdrop-blur-2xl shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                <Mail className="w-4 h-4" /> The Newsletter
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
                One useful thing,<br />one Friday a month.
              </h2>
            </div>
            
            <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="you@company.com" 
                className="flex-grow px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
              />
              <button className="group relative flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-bold overflow-hidden hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
