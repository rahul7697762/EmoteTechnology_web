'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { ServiceData } from '@/lib/servicesData';

export default function ServiceContent({ data }: { data: ServiceData }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--text-main)] relative overflow-hidden font-sans pt-24">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[var(--page-bg)] to-[var(--page-bg)]" />
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/></svg>')",
        }}
      />

      <Nav />

      <main className="flex-grow container mx-auto px-6 py-12 lg:py-20 relative z-10 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              {data.subtitle}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 drop-shadow-lg"
          >
            {data.title.split(' ')[0]}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {data.title.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--dim)] max-w-2xl leading-relaxed mb-12"
          >
            {data.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative flex items-center gap-3 bg-[var(--text-main)] text-[var(--page-bg)] px-8 py-4 rounded-xl font-bold overflow-hidden hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-lg"
            >
              <span className="relative">Book a Build Call</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          {data.metrics.map(([val, label], i) => (
            <div
              key={i}
              className="p-8 rounded-[2rem] border border-[var(--border-glass)] bg-[var(--bg-glass)] backdrop-blur-md flex flex-col items-center justify-center text-center group hover:bg-[var(--bg-glass-heavy)] transition-colors shadow-xl"
            >
              <div className="text-5xl font-bold text-[var(--text-main)] mb-2 group-hover:text-blue-400 transition-colors">
                {val}
              </div>
              <div className="text-sm font-semibold uppercase tracking-widest text-[var(--dim2)]">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scope Section */}
        <div className="mb-32">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--border-glass)] bg-[var(--bg-glass)] text-[var(--dim)] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            01 &middot; Scope
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 drop-shadow-md">What ships in the build.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.scope.map(([h, b], i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--bg-glass)] hover:bg-[var(--bg-glass-heavy)] transition-colors flex gap-6 items-start group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all border border-blue-500/20 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-blue-300 transition-colors">
                    {h}
                  </h3>
                  <p className="text-[var(--dim)] leading-relaxed">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
