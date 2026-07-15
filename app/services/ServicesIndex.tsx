'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { servicesData } from '@/lib/servicesData';
import { Globe, Search, MessageSquare, Phone, Bot, Share2, Megaphone, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const serviceIcons: Record<string, LucideIcon> = {
  web: Globe,
  seo: Search,
  'whatsapp-chatbot': MessageSquare,
  voice: Phone,
  'web-chatbot': Bot,
  'social-media': Share2,
  'paid-ads': Megaphone,
};

const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVars = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function ServicesIndex() {
  const entries = Object.entries(servicesData);

  return (
    <div className="min-h-screen flex flex-col bg-[#050914] text-white relative overflow-hidden font-sans pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#050914] to-[#050914]" />

      <Nav />

      <main className="flex-grow container mx-auto px-6 py-12 lg:py-20 relative z-10 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            What we do
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            Pick your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">weapon.</span>
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Seven ways we help brands get found, get heard, and get paid. Choose one to see how it works.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {entries.map(([slug, service]) => {
            const Icon = serviceIcons[slug] ?? Globe;
            return (
              <motion.div key={slug} variants={itemVars}>
                <Link
                  href={`/services/${slug}`}
                  className="group relative flex flex-col h-full p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 hover:border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2">{service.subtitle}</div>
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors drop-shadow-sm">
                    {service.title}
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{service.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-16 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Not sure what you need?</h3>
            <p className="text-neutral-400">Tell us what you&apos;re stuck on — we&apos;ll point you to the right fit.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-colors shadow-lg shadow-blue-900/30"
          >
            Book a consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
