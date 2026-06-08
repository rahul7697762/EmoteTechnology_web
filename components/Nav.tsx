'use client';
import Link from 'next/link';
import { NavHeader } from '@/components/ui/nav-header';
import { Home, Layers, CreditCard, Briefcase, Info } from 'lucide-react';

export default function Nav() {
  return (
    <header>
      <nav
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 48px',
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100}}
      >
        <div className="glass" style={{ position: 'absolute', inset: 0, zIndex: -1, borderRadius: 0, border: 'none', borderBottom: '1px solid var(--border-glass)', background: 'rgba(11, 15, 25, 0.85)' }} />
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit', background: 'rgba(255, 255, 255, 0.95)', padding: '6px 16px', borderRadius: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src="/logo.png" alt="emote logo" style={{ height: 28, width: 'auto' }} />
        </Link>

        {/* Desktop links — hidden on mobile via .nav-links CSS class */}
        <div className="nav-links">
          <NavHeader />
        </div>

        {/* Right side: CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/contact" className="wf-btn solid glass" style={{ fontSize: 13 }}>
            Get a quote
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full z-[100] flex md:hidden items-center justify-around bg-[#0b0f19]/90 backdrop-blur-xl border-t border-white/10 pt-3 pb-4 px-2">
        <Link href="/" className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors">
          <Home size={22} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ fontFamily: 'Times New Roman' }}>Home</span>
        </Link>
        <Link href="/services/whatsapp-chatbot" className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors">
          <Layers size={22} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ fontFamily: 'Times New Roman' }}>Services</span>
        </Link>
        <Link href="/pricing" className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors">
          <CreditCard size={22} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ fontFamily: 'Times New Roman' }}>Pricing</span>
        </Link>
        <Link href="/#work" className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors">
          <Briefcase size={22} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ fontFamily: 'Times New Roman' }}>Work</span>
        </Link>
        <Link href="/about" className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors">
          <Info size={22} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ fontFamily: 'Times New Roman' }}>About</span>
        </Link>
      </div>
    </header>
  );
}
