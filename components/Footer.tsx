import Link from 'next/link';

const cols: [string, string[]][] = [
  ['Product',    ['Web', 'Chatbots', 'WhatsApp', 'Voice', 'SEO']],
  ['Company',    ['About', 'Team', 'Careers', 'Press']],
  ['Resources',  ['Blog', 'Case studies', 'Docs', 'Status']],
  ['Connect',    ['Contact', 'LinkedIn', 'Twitter', 'YouTube']],
];

export default function Footer() {
  return (
    <footer style={{ padding: '48px 48px 32px', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid var(--border-glass)', color: 'rgba(255,255,255,0.8)' }}
      className="footer-outer">
      <div className="g-footer">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="emote logo" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)' }} />
          </div>
          <p style={{ marginTop: 14, fontSize: 14, maxWidth: 280, opacity: .8, lineHeight: 1.6 }}>
            DSS-15, Trishala City road, Behind Gopal sweets, Zirakpur, Punjab, 140603.
            <br />
            Director: SHIVAM JAISWAL
          </p>
        </div>

        {cols.map(([heading, items]) => (
          <div key={heading} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="lbl" style={{ color: 'var(--hi)' }}>{heading}</span>
            {items.map(item => (
              <span key={item} style={{ fontSize: 14, opacity: .85 }}>{item}</span>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 36, paddingTop: 18,
        borderTop: '1px solid rgba(255,255,255,.2)',
        display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: .7}}>
        <span>© 2026 Dograh · Shivam Jaiswal</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
