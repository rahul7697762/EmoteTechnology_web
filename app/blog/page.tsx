import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SerpCards } from '@/components/ThreeD';

const tags = ['All', 'SEO', 'Voice AI', 'Chatbots', 'WhatsApp', 'Engineering', 'Behind the work'];

const posts: [string, string, string, string][] = [
  ['How we rank local plumbers in 90 days', 'SEO', '5 min', "Mar '26"],
  ['Designing voice agents that don\'t sound like voice agents', 'Voice AI', '8 min', "Mar '26"],
  ['When NOT to build a chatbot', 'Chatbots', '4 min', "Feb '26"],
  ['WhatsApp WABA: the part nobody warns you about', 'WhatsApp', '6 min', "Feb '26"],
  ['Our internal LLM prompt template, annotated', 'Engineering', '7 min', "Jan '26"],
  ['What 127 projects taught us about scope', 'Behind the work', '5 min', "Jan '26"],
  ['Local SEO playbook for clinics, free', 'SEO', '12 min', "Dec '25"],
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      {/* HERO */}
      <section className="g-hero sp" style={{ alignItems: 'flex-end', paddingBottom: 36 }}>
        <div className="fade-up">
          <span className="wf-chip glass">journal</span>
          <h1 className="h-hand" style={{ fontSize: 'clamp(60px,9vw,100px)', lineHeight: 0.95, marginTop: 18 }}>
            Field notes<br />from the <span className="hi">build.</span>
          </h1>
          <p style={{ marginTop: 16, fontSize: 16, maxWidth: 520, color: 'var(--dim)', lineHeight: 1.6 }}>
            Half playbooks, half post-mortems. Written by the people who shipped the thing.
          </p>
        </div>
        <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          <SerpCards width={320} height={240} />
        </div>
      </section>

      {/* Tag filter */}
      <div className="glass blog-filter" style={{
        padding: '16px 48px',
        borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)',
        display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap'}}>
        <span className="lbl">filter</span>
        {tags.map((t, i) => (
          <span key={t} className="wf-chip glass" style={{
            background: i === 0 ? 'var(--text-main)' : 'transparent',
            color: i === 0 ? 'var(--bg-glass)' : 'var(--text-main)',
            cursor: 'pointer'}}>{t}</span>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <div className="wf-box dashed" style={{ width: 200, height: 32, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <span style={{ fontSize: 12, color: 'var(--dim)' }}>search posts…</span>
          </div>
        </div>
      </div>

      {/* Featured */}
      <div className="sp-sm">
        <div className="glass g2" style={{ gap: 0 }}>
          <div className="wf-img" style={{ width: '100%', height: 380, borderRight: '2px solid var(--text-main)' }} />
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="wf-chip glass">featured</span>
              <span className="wf-chip glass">{posts[0][1]}</span>
            </div>
            <div className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>{posts[0][0]}</div>
            <div className="wf-line thin" style={{ width: '90%' }} />
            <div className="wf-line thin" style={{ width: '75%' }} />
            <div className="wf-line thin" style={{ width: '60%' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
              <div className="wf-avatar" style={{ width: 32, height: 32 }} />
              <span className="lbl">by name · {posts[0][3]} · {posts[0][2]}</span>
            </div>
            <Link href="#" className="wf-btn glass" style={{ marginTop: 12, alignSelf: 'flex-start' }}>Read →</Link>
          </div>
        </div>
      </div>

      {/* Post grid */}
      <section className="sp-sm" style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
          {posts.slice(1).map(([t, tag, mins, date], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="wf-img" style={{ width: '100%', height: 180 }} />
              <span className="wf-chip glass">{tag}</span>
              <div className="h-hand" style={{ fontSize: 22, lineHeight: 1.2 }}>{t}</div>
              <div className="wf-line thin" style={{ width: '85%' }} />
              <div className="wf-line thin" style={{ width: '65%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>
                <span>{mins} read</span><span>{date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 48, flexWrap: 'wrap' }}>
          <span className="wf-btn glass">← prev</span>
          {[1, 2, 3, '…', 8].map((p, i) => (
            <span key={i} className="wf-chip glass" style={{
              background: p === 1 ? 'var(--text-main)' : 'transparent',
              color: p === 1 ? 'var(--bg-glass)' : 'var(--text-main)',
              minWidth: 32, justifyContent: 'center', cursor: 'pointer'}}>{p}</span>
          ))}
          <span className="wf-btn glass">next →</span>
        </div>
      </section>

      {/* Newsletter */}
      <div className="sp" style={{ color: 'var(--bg-glass)' }}>
        <div className="g2" style={{ alignItems: 'center' }}>
          <div>
            <span className="lbl" style={{ color: 'rgba(255,255,255,.5)' }}>newsletter</span>
            <div className="h-hand" style={{ fontSize: 48, marginTop: 12, color: 'var(--bg-glass)', lineHeight: 1 }}>
              One useful thing,<br />one Friday a month.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, height: 52, padding: '0 16px',
                border: '2px dashed var(--bg-glass)', background: 'transparent',
                color: 'var(--bg-glass)', fontFamily: 'Kalam, sans-serif', fontSize: 15, outline: 'none'}}
            />
            <button className="wf-btn hi glass" style={{ whiteSpace: 'nowrap', color: 'var(--text-main)' }}>Subscribe</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
