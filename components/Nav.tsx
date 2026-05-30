'use client';
import Link from 'next/link';
import { useState } from 'react';
import { NavHeader } from '@/components/ui/nav-header';
const links = ['Services', 'Pricing', 'Work', 'About', 'Blog'];
const linkHrefs: Record<string, string> = {
  Services: '/services/whatsapp-chatbot',
  Pricing: '/pricing',
  Work: '/#work',
  About: '/about',
  Blog: '/blog'};

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
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

      {/* Right side: CTA + hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/contact" className="wf-btn solid glass" style={{ fontSize: 13 }}>
          Get a quote
        </Link>
        {/* Hamburger — shown on mobile via .nav-ham CSS class */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-ham"
          style={{ alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, lineHeight: 1, padding: 4 }}
          aria-label="menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(11, 15, 25, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32}}>
          <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 24, right: 28, background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: 'var(--text-main)' }}>✕</button>
          {links.map(t => (
            <Link key={t} href={linkHrefs[t]} onClick={() => setOpen(false)}
              className="h-hand" style={{ fontSize: 40, textDecoration: 'none', color: 'var(--text-main)' }}>
              {t}
            </Link>
          ))}
          <Link href="/contact" className="wf-btn solid" onClick={() => setOpen(false)}>Get a quote</Link>
        </div>
      )}
    </nav>
  );
}
