import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you\'re looking for doesn\'t exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        background: '#0A0A0C',
        color: '#fff',
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, color: 'rgba(255,255,255,0.08)', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: -16 }}>Page not found</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 400, lineHeight: 1.6 }}>
        The page you&apos;re looking for has moved or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 8,
          padding: '12px 32px',
          background: '#fff',
          color: '#0A0A0C',
          borderRadius: 12,
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
