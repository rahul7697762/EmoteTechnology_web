import Link from 'next/link';

type FooterItem = { name: string; href?: string };

const cols: { heading: string; items: FooterItem[] }[] = [
  { heading: 'Product', items: [{ name: 'Web', href: '/services/web' }, { name: 'Chatbots', href: '/services/web-chatbot' }, { name: 'WhatsApp', href: '/services/whatsapp-chatbot' }, { name: 'Voice', href: '/services/voice' }, { name: 'SEO', href: '/services/seo' }, { name: 'Social Media', href: '/services/social-media' }, { name: 'Paid Ads', href: '/services/paid-ads' }] },
  { heading: 'Company', items: [{ name: 'About', href: '/about' }, { name: 'Team', href: '/about' }, { name: 'Careers', href: '/about' }] },
  { heading: 'Connect', items: [{ name: 'Contact', href: '/contact' }, { name: 'LinkedIn', href: 'https://www.linkedin.com/company/emote-technology' }] },
];

export default function Footer() {
  return (
    <footer style={{ padding: '48px 48px 32px', background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)', color: 'var(--dim)' }}
      className="footer-outer">
      <div className="g-footer">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="emote logo" style={{ height: 36, width: 'auto', filter: 'var(--logo-filter)' }} />
          </div>
          <p style={{ marginTop: 14, fontSize: 14, maxWidth: 280, opacity: .8, lineHeight: 1.6 }}>
            DSS-15, Trishala City road, Behind Gopal sweets, Zirakpur, Punjab, 140603.
            <br />
            Director: SHIVAM JAISWAL
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="lbl" style={{ color: 'var(--hi)' }}>{col.heading}</span>
            {col.items.map(item => (
              item.href ? (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  style={{ fontSize: 14, opacity: .85, textDecoration: 'none', color: 'inherit' }}
                >
                  {item.name}
                </Link>
              ) : (
                <span key={item.name} style={{ fontSize: 14, opacity: .85 }}>{item.name}</span>
              )
            ))}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 36, paddingTop: 18,
        borderTop: '1px solid var(--border-glass)',
        display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: .7}}>
        <span>© {new Date().getFullYear()} Copyright reserved by Emote Technology</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
