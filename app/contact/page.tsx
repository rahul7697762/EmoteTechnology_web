'use client';
import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ChatBubbles } from '@/components/ThreeD';

const channels: [string, string, string][] = [
  ['Email', 'hello@emote.tech', '↗'],
  ['WhatsApp', '+60 1x xxxx xxxx', '◇'],
  ['Call our voice agent', 'Try it now ↗', '◉'],
  ['Calendly', '20-min intro call', '◐'],
];

const services = ['Web', 'SEO', 'Web bot', 'WhatsApp', 'Voice', 'Other'];

export default function ContactPage() {
  const [selected, setSelected] = useState<string[]>(['WhatsApp']);

  const toggle = (s: string) =>
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <section className="g2 sp" style={{ alignItems: 'flex-start', gap: 60 }}>
        {/* Left */}
        <div className="fade-up">
          <span className="wf-chip glass">say hi</span>
          <h1 className="h-hand" style={{ fontSize: 'clamp(52px,8vw,96px)', lineHeight: 0.95, marginTop: 18 }}>
            Tell us what<br />you&apos;re <span className="hi">stuck on.</span>
          </h1>
          <p style={{ marginTop: 24, fontSize: 17, maxWidth: 480, lineHeight: 1.6 }}>
            One sentence is enough. We&apos;ll come back with one idea, three options, zero pitch decks.
          </p>

          {/* Channels */}
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {channels.map(([k, v, icon]) => (
              <div key={k} className="glass" style={{ padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="wf-box fill-hi glass" style={{
                    width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}>{icon}</div>
                  <div>
                    <span className="lbl">{k}</span>
                    <div className="h-hand" style={{ fontSize: 22 }}>{v}</div>
                  </div>
                </div>
                <span style={{ fontSize: 22 }}>→</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <span className="lbl">Office · Bangsar, KL</span>
            <div className="h-hand" style={{ fontSize: 20, marginTop: 6 }}>Mon–Fri · 10–6 MYT</div>
          </div>
        </div>

        {/* Right — 3D + form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            <ChatBubbles width={360} height={240} />
          </div>

          <div className="glass" style={{ padding: 28}}>
            <span className="wf-section-label glass">/ enquiry form</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 16 }}>
              {[['Name', 'Aida Roslan'], ['Email', 'aida@brand.co'], ['Company', 'Brand Co.']].map(([l, p]) => (
                <div key={l}>
                  <span className="lbl">{l}</span>
                  <input
                    type="text"
                    placeholder={p}
                    style={{
                      display: 'block', width: '100%', marginTop: 6,
                      padding: '10px 14px',
                      borderRadius: 0, background: 'transparent',
                      fontFamily: 'Kalam, sans-serif', fontSize: 15, color: 'var(--text-main)',
                      outline: 'none'}}
                  />
                </div>
              ))}

              <div>
                <span className="lbl">I&apos;m interested in…</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {services.map(s => (
                    <button
                      key={s}
                      onClick={() => toggle(s)}
                      className="wf-chip glass"
                      style={{
                        background: selected.includes(s) ? 'var(--hi)' : 'transparent',
                        cursor: 'pointer', border: '1.5px solid var(--text-main)'}}
                    >{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <span className="lbl">What&apos;s the problem?</span>
                <textarea
                  placeholder='"We miss 30% of calls after 6pm and it&apos;s costing us…"'
                  rows={4}
                  style={{
                    display: 'block', width: '100%', marginTop: 6,
                    padding: 14,
                    background: 'transparent', resize: 'vertical',
                    fontFamily: 'Kalam, sans-serif', fontSize: 14, color: 'var(--text-main)',
                    outline: 'none'}}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <span className="lbl">Reply in ≤ 24h</span>
                <button className="wf-btn solid glass" style={{ padding: '12px 22px' }}>Send →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="sp-sm" style={{ paddingTop: 0 }}>
        <div className="wf-img" style={{ width: '100%', height: 300 }}>
          <span className="lbl" style={{ position: 'absolute', bottom: 8, left: 12 }}>map · Bangsar, KL</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
