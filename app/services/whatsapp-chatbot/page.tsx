'use client';
import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhoneStack, VoiceWave } from '@/components/ThreeD';

const intents = ['Booking', 'Order tracking', 'Lead qualification', 'FAQ + handoff', 'Payment in-thread'];
const convo: ['me' | 'them', string][] = [
  ['them', "Hi! I'd like to book a cleaning."],
  ['me',   'Hi 👋 — sure! What city / branch?'],
  ['them', 'KL — Bangsar branch.'],
  ['me',   'Got it. Next available slots:'],
  ['me',   '◇ Thu 5:30pm · Dr Lim\n◇ Fri 10:00am · Dr Ng\n◇ Sat 2:00pm · Dr Tan'],
  ['them', 'Thursday please.'],
  ['me',   'Booked ✓ Sending confirmation now.'],
];

export default function WhatsappChatbotPage() {
  const [activeIntent, setActiveIntent] = useState(0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ padding: '18px 48px', fontSize: 13, color: 'var(--dim)', borderBottom: '1px dashed var(--text-main)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>services</Link>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>chat</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: 'var(--text-main)' }}>WhatsApp Chatbot</span>
      </div>

      {/* HERO */}
      <section className="g-hero sp">
        <div className="fade-up">
          <span className="wf-chip glass">service · 03 of 05</span>
          <h1 className="h-hand" style={{ fontSize: 'clamp(52px,8vw,88px)', lineHeight: 0.95, marginTop: 18 }}>
            <span className="hi">WhatsApp</span><br />Chatbot
          </h1>
          <p style={{ marginTop: 20, fontSize: 17, maxWidth: 520, lineHeight: 1.6 }}>
            Meet your customers where they already are. We build verified, on-brand WhatsApp bots that book, qualify and route — in any language your business speaks.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/contact" className="wf-btn solid glass">Get a build estimate</Link>
            <span className="wf-btn glass">See a live bot →</span>
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {[['10d', 'avg launch'], ['89%', 'auto-handled'], ['24/7', 'always up']].map(([n, l]) => (
              <div key={l}>
                <div className="h-hand" style={{ fontSize: 40 }}>{n}</div>
                <div className="lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneStack width={360} height={420} />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="sp">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">01 · scope</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>What ships in the build.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
          {[
            ['Verified WABA setup', 'Green-tick, business profile, templates approved.'],
            ['Conversation flows', 'Up to 8 intents, with handoff to a human.'],
            ['CRM integration', 'HubSpot, Pipedrive, or your custom backend.'],
            ['Payments + bookings', 'In-thread payments and calendar slots.'],
            ['Analytics dashboard', 'Daily flow performance & drop-off heatmap.'],
            ['Multilingual', 'EN, BM, ZH, TA out of the box.'],
          ].map(([h, b]) => (
            <div key={h} className="glass" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="wf-box fill-hi glass" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✓</div>
              <div className="h-hand" style={{ fontSize: 22 }}>{h}</div>
              <div style={{ fontSize: 14, color: 'var(--dim)' }}>{b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONVERSATION PREVIEW */}
      <section className="sp-sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">02 · preview</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Sample conversation.</h2>
          <p style={{ color: 'var(--dim)', fontSize: 16 }}>Select an intent to see a different flow.</p>
        </div>
        <div className="g2" style={{ alignItems: 'flex-start', gap: 40 }}>
          <div className="glass" style={{ padding: 28,
            display: 'flex', flexDirection: 'column', gap: 12, minHeight: 460}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, borderBottom: '1px solid var(--text-main)' }}>
              <div className="wf-avatar" style={{ width: 36, height: 36 }} />
              <div>
                <div className="h-hand" style={{ fontSize: 18 }}>Acme Dental</div>
                <span className="lbl">online · WABA verified</span>
              </div>
            </div>
            {convo.map(([side, text], i) => (
              <div key={i} style={{
                alignSelf: side === 'me' ? 'flex-end' : 'flex-start', maxWidth: '78%',
                padding: '10px 14px',
                background: side === 'me' ? 'var(--text-main)' : 'var(--bg-glass)',
                color: side === 'me' ? 'var(--bg-glass)' : 'var(--text-main)',
                borderRadius: 14,
                borderBottomRightRadius: side === 'me' ? 4 : 14,
                borderBottomLeftRadius: side === 'them' ? 4 : 14,
                fontSize: 13, whiteSpace: 'pre-line'}}>{text}</div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="wf-section-label glass">try a different intent</span>
            {intents.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveIntent(i)}
                className="glass"
                style={{ padding: '14px 18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: activeIntent === i ? 'var(--hi)' : 'transparent',
                  cursor: 'pointer', fontFamily: 'Kalam, sans-serif', fontSize: 15,
                  textAlign: 'left'}}
              >
                <span>{s}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="glass sp" style={{ color: 'var(--bg-glass)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label" style={{ color: 'rgba(255,255,255,.5)', borderColor: 'rgba(255,255,255,.3)' }}>03 · timeline</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05, color: 'var(--bg-glass)' }}>From kickoff to live in 10 days.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
          {[
            ['day 1', 'Kickoff', 'Brief, intents, voice & guardrails.'],
            ['day 2-3', 'Flow design', 'Sketch + approve every path.'],
            ['day 4-6', 'Build', 'Backend, templates, integrations.'],
            ['day 7-8', 'WABA approval', 'Templates + green-tick submitted.'],
            ['day 9-10', 'Launch', 'Soft-launch with 10% of traffic.'],
          ].map(([d, t, b]) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, border: '1px solid var(--border-glass)' }}>
              <span className="lbl" style={{ color: 'var(--hi)' }}>{d}</span>
              <div className="h-hand" style={{ fontSize: 22, color: 'var(--bg-glass)' }}>{t}</div>
              <div style={{ fontSize: 13, opacity: .8 }}>{b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="sp">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">04 · pricing</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Two starting points.</h2>
        </div>
        <div className="g2" style={{ gap: 24 }}>
          {[
            ['Launch', 'RM 18k', 'one-time', 'Up to 4 intents · 30-day iteration · WABA setup'],
            ['Operate', 'RM 4.8k', '/ month', 'Ongoing flows · analytics · monthly improvements'],
          ].map(([name, price, unit, body], i) => (
            <div key={name} className="glass" style={{ padding: 28,
              background: i === 0 ? 'var(--bg-glass)' : 'var(--hi)',
              display: 'flex', flexDirection: 'column', gap: 16}}>
              <span className="lbl">plan · 0{i + 1}</span>
              <div className="h-hand" style={{ fontSize: 40 }}>{name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="h-hand" style={{ fontSize: 64 }}>{price}</span>
                <span className="lbl">{unit}</span>
              </div>
              <div style={{ fontSize: 15 }}>{body}</div>
              <Link href="/contact" className="wf-btn solid glass" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                Choose {name.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">05 · faq</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>The actual questions.</h2>
        </div>
        <div>
          {[
            ['Do we need a Meta business account already?', 'No — we handle the full WABA setup and verification as part of the Launch package.'],
            ['What languages do you support?', 'English, Bahasa Malaysia, Chinese (Simplified), and Tamil out of the box. Others on request.'],
            ['Can it pass to a human agent?', 'Yes. Handoff rules are configurable per intent — you set the threshold.'],
            ['Do we own the bot after launch?', 'Fully. Code, flows, and WABA account are transferred to you at go-live.'],
            ['How are messages priced?', 'Meta charges per conversation. We don\'t add a markup — you pay Meta directly.'],
          ].map(([q, a], i) => (
            <details key={q}>
              <summary className="glass" style={{
                borderTop: i === 0 ? '2px solid var(--text-main)' : 'none',
                borderBottom: '1px solid var(--border-glass)', padding: '18px 0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className="h-hand" style={{ fontSize: 22 }}>{q}</div>
                <span style={{ fontSize: 24, userSelect: 'none' }}>+</span>
              </summary>
              <div style={{ padding: '16px 0 24px', fontSize: 16, color: 'var(--dim)', lineHeight: 1.6 }}>{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass cta-banner" style={{ padding: '60px 48px', background: 'rgba(0, 240, 255, 0.1)', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
          <div className="h-hand" style={{ fontSize: 'clamp(32px,4vw,56px)', lineHeight: 1, maxWidth: 600 }}>
            Want one of these for your business?
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" className="wf-btn solid glass">Book a build call</Link>
            <span className="wf-btn glass">Download spec PDF</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
