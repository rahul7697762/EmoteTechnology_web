'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ variant = 'button' }: { variant?: 'button' | 'mobile' }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'light' : 'dark');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  if (variant === 'mobile') {
    return (
      <button
        onClick={toggle}
        aria-label="Toggle light and dark theme"
        className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ fontFamily: 'Times New Roman' }}>Theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
        color: '#fff', cursor: 'pointer', transition: 'all .3s ease',
      }}
    >
      {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
