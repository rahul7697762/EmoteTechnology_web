import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'sub'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'contact'; lines: string[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

type Props = {
  chip: string;
  title: string;
  highlight: string;
  effectiveDate: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

function slug(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === 'p') {
    return <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.75, color: 'var(--dim)' }}>{block.text}</p>;
  }

  if (block.type === 'sub') {
    return (
      <h3 style={{ margin: '22px 0 10px', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{block.text}</h3>
    );
  }

  if (block.type === 'contact') {
    return (
      <div className="glass" style={{ padding: 20, margin: '4px 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {block.lines.map((line, i) => (
          <span key={i} style={{ fontSize: 15, lineHeight: 1.6, color: i === 0 ? 'var(--hi)' : 'var(--dim)', fontWeight: i === 0 ? 600 : 400 }}>
            {line}
          </span>
        ))}
      </div>
    );
  }

  if (block.type === 'steps') {
    return (
      <ol style={{ margin: '0 0 16px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--dim)' }}>{item}</li>
        ))}
      </ol>
    );
  }

  return (
    <ul style={{ listStyle: 'none', margin: '0 0 16px', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {block.items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.7, color: 'var(--dim)' }}>
          <span className="hi" style={{ flexShrink: 0, lineHeight: 1.7 }}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalPage({ chip, title, highlight, effectiveDate, lastUpdated, intro, sections }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <section className="sp" style={{ textAlign: 'center', position: 'relative', paddingBottom: 0 }}>
        <div className="fade-up">
          <span className="wf-chip glass">{chip}</span>
          <h1 className="h-hand" style={{ fontSize: 'clamp(38px,5.5vw,66px)', lineHeight: 1.05, marginTop: 18 }}>
            {title} <span className="hi">{highlight}</span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginTop: 22, fontSize: 13, color: 'var(--dim2)' }}>
            <span>Effective Date: {effectiveDate}</span>
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      <section className="sp-sm" style={{ maxWidth: 860, margin: '0 auto', width: '100%' }}>
        {intro.map((line, i) => (
          <p key={i} style={{ margin: '0 0 16px', fontSize: 17, lineHeight: 1.75, color: 'var(--dim)' }}>{line}</p>
        ))}

        <div className="wf-line thin dim" style={{ width: '100%', margin: '32px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
          <span className="lbl" style={{ color: 'var(--hi)' }}>Contents</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 6 }}>
            {sections.map((section, i) => (
              <a
                key={section.heading}
                href={`#${slug(section.heading)}`}
                style={{ fontSize: 14, color: 'var(--dim)', textDecoration: 'none', lineHeight: 1.6 }}
              >
                {i + 1}. {section.heading}
              </a>
            ))}
          </div>
        </div>

        {sections.map((section, i) => (
          <div key={section.heading} id={slug(section.heading)} style={{ scrollMarginTop: 100, marginBottom: 40 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
              <span className="hi" style={{ fontSize: 15, marginRight: 10 }}>{String(i + 1).padStart(2, '0')}</span>
              {section.heading}
            </h2>
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </div>
        ))}

        <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0 32px' }} />

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14 }}>
          <Link href="/privacy-policy" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms-of-service" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Terms of Service</Link>
          <Link href="/data-deletion" style={{ color: 'var(--dim)', textDecoration: 'none' }}>Data Deletion Policy</Link>
          <Link href="/contact" style={{ color: 'var(--hi)', textDecoration: 'none' }}>Contact us →</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
