import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WireCube } from '@/components/ThreeD';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      {/* HERO */}
      <section className="g-hero-end sp" style={{ paddingBottom: 40 }}>
        <div className="fade-up">
          <span className="wf-chip glass">about</span>
          <h1 className="h-hand" style={{ fontSize: 'clamp(60px,9vw,110px)', lineHeight: 0.9, marginTop: 18 }}>
            A small studio<br />in <span className="hi">Kuala Lumpur</span><br />that ships a lot.
          </h1>
        </div>
        <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          <WireCube size={180} />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="g-sidebar sp-sm" style={{ paddingBottom: 80 }}>
        <span className="wf-section-label glass" style={{ alignSelf: 'flex-start' }}>§ why we exist</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 720 }}>
          <p style={{ fontSize: 22, lineHeight: 1.4, margin: 0 }}>
            Most agencies bill for hours. We bill for outcomes you can point at — a site that ranks, a bot that books, a phone that picks up at 2am.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-main)', margin: 0 }}>
            We started in 2019 making websites for friends. Today we&apos;re seven people running web, chat, voice and SEO as one connected practice. The thread is the same: software that listens, and ships.
          </p>
        </div>
      </section>

      {/* NUMBERS */}
      <div className="glass sp-sm" style={{
        borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32}}>
        {[['2019', 'founded'], ['127', 'projects shipped'], ['12', 'countries served'], ['7', 'humans on staff']].map(([n, l]) => (
          <div key={l} style={{ borderLeft: '1px dashed var(--text-main)', paddingLeft: 20 }}>
            <div className="h-hand" style={{ fontSize: 68, lineHeight: 1 }}>{n}</div>
            <div className="lbl" style={{ marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* TEAM */}
      <section className="sp-sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">§ team</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>The actual humans.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
          {[
            'Founder · Strategy', 'Lead Engineer', 'Lead Designer', 'Voice / Conversational',
            'Content & SEO', 'Frontend Engineer', 'Ops & Delivery', '+ a friendly cat',
          ].map((role, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="wf-img" style={{ width: '100%', height: 220 }} />
              <div className="h-hand" style={{ fontSize: 22 }}>name {i + 1}</div>
              <span className="lbl">{role}</span>
              <div className="wf-line thin" style={{ width: '80%' }} />
              <div className="wf-line thin" style={{ width: '60%' }} />
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="glass sp" style={{ color: 'var(--bg-glass)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label" style={{ color: 'rgba(255,255,255,.5)', borderColor: 'rgba(255,255,255,.3)' }}>§ how we work</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05, color: 'var(--bg-glass)' }}>Five rules we don&apos;t break.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {[
            'No PMs between you and us.',
            'No fixed scope sold by people who don\'t build.',
            'No retainers without monthly proof.',
            'No AI slop. Real models, real prompts, reviewed.',
            'No quiet launches. We ship together.',
          ].map((v, i) => (
            <div key={v} style={{ padding: 18, border: '2px solid var(--bg-glass)' }}>
              <span className="h-hand" style={{ fontSize: 38, color: 'var(--hi)' }}>0{i + 1}</span>
              <div className="h-hand" style={{ fontSize: 18, color: 'var(--bg-glass)', marginTop: 10, lineHeight: 1.2 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICE */}
      <section className="sp-sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">§ where</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Bangsar, KL. (And online.)</h2>
        </div>
        <div className="g2">
          <div className="wf-img" style={{ width: '100%', height: 360 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="wf-img" style={{ width: '100%', height: 170 }} />
            <div className="wf-img" style={{ width: '100%', height: 170 }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass cta-banner" style={{ padding: '60px 48px', background: 'rgba(0, 240, 255, 0.1)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="h-hand" style={{ fontSize: 60, lineHeight: 1 }}>
          Hiring? <span style={{ color: 'var(--dim)' }}>No, but always reading.</span>
        </div>
        <p style={{ marginTop: 14, fontSize: 16, maxWidth: 600, lineHeight: 1.6 }}>
          Send a paragraph + a thing you&apos;ve made. We reply to everyone.
        </p>
        <Link href="mailto:jobs@emote.tech" className="wf-btn solid glass" style={{ marginTop: 20, display: 'inline-flex' }}>
          jobs@emote.tech
        </Link>
      </section>

      <Footer />
    </div>
  );
}
