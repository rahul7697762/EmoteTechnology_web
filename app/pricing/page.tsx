import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for SEO & Google Business Profile, custom website development, and Google & Meta Ads management. Plans that scale with your business.',
  openGraph: {
    title: 'Pricing — Emote Technology',
    description:
      'Transparent, outcome-based pricing for web development, local SEO, and paid ads. No retainers without proof.',
    url: 'https://emotetechnology.in/pricing',
  },
  alternates: { canonical: 'https://emotetechnology.in/pricing' },
};

export default function PricingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      
      <section className="sp" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="fade-up">
          <span className="wf-chip glass">transparent pricing</span>
          <h1 className="h-hand" style={{ fontSize: 'clamp(42px,6vw,72px)', lineHeight: 1, marginTop: 18 }}>
            Plans that scale with your <span className="hi">growth</span>
          </h1>
          <p style={{ maxWidth: 600, margin: '24px auto 0', color: 'var(--dim)', fontSize: 17, lineHeight: 1.6 }}>
            Comprehensive solutions for SEO, Web Development, and Digital Ads to boost your local & digital presence.
          </p>
        </div>
      </section>

      <section className="sp-sm" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          
          {/* SEO & GMB Optimization */}
          <div className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <img src="/seo_optimization.png" alt="SEO Optimization" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, marginBottom: 8 }} />
            <span className="lbl">SEO & Local Ranking</span>
            <div className="h-hand" style={{ fontSize: 36, lineHeight: 1.1 }}>Google Business Optimization</div>
            <p style={{ fontSize: 14, color: 'var(--dim)' }}>
              Complete profile optimization, regular posts, and review management.
            </p>
            <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Account setup & verification guidance</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Keyword-based business description</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Category & sub-category optimization</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Services/products listing setup</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Weekly posts (4–8 per month)</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Review management & reply templates</li>
            </ul>

            <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Top 10 Ranking</span> <span className="hi" style={{ fontWeight: 'bold' }}>15,000/-</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Top 5 Ranking</span> <span className="hi" style={{ fontWeight: 'bold' }}>25,000/-</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Top 3 Ranking</span> <span className="hi" style={{ fontWeight: 'bold' }}>30,000/-</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dim)', marginTop: 8 }}>
                <span>Monthly Maintenance</span> <span>5,000/- / mo</span>
              </div>
            </div>
            
            <Link href="/contact" className="wf-btn glass" style={{ marginTop: 'auto' }}>Get Started</Link>
          </div>

          {/* Web Development */}
          <div className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16, background: 'rgba(0, 240, 255, 0.05)' }}>
            <img src="/web_development.png" alt="Web Development" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, marginBottom: 8 }} />
            <span className="lbl">Digital Storefront</span>
            <div className="h-hand" style={{ fontSize: 36, lineHeight: 1.1 }}>Website Development</div>
            <p style={{ fontSize: 14, color: 'var(--dim)' }}>
              Custom-built 4–5 page sites that convert visitors into customers.
            </p>
            <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> 4–5 Page Website (Home, Menu, About, etc.)</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Mobile responsive & modern UI/UX</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> WhatsApp & Call integration</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Google Map integration</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> On-page SEO (titles, meta tags)</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Keyword research included</li>
            </ul>

            <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0' }} />
            <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--hi)' }}>Custom Pricing</div>
            <div style={{ fontSize: 12, color: 'var(--dim)' }}>Contact us for a detailed quote</div>
            
            <Link href="/contact" className="wf-btn solid glass" style={{ marginTop: 'auto' }}>Request Quote</Link>
          </div>

          {/* Ads & Lead Gen */}
          <div className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <img src="/digital_ads.png" alt="Digital Ads" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 16, marginBottom: 8 }} />
            <span className="lbl">Paid Acquisition</span>
            <div className="h-hand" style={{ fontSize: 36, lineHeight: 1.1 }}>Google & Meta Ads</div>
            <p style={{ fontSize: 14, color: 'var(--dim)' }}>
              Targeted campaigns across Google, Facebook, and Instagram for maximum ROI.
            </p>
            <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Google Search Ads & Meta Ads setup</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> WhatsApp inquiry campaigns</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Lead generation forms & retargeting</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Advanced audience targeting (Radius/City/B2B)</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Conversion tracking & daily optimization</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}><Check size={16} color="var(--hi)" style={{ flexShrink: 0, marginTop: 2 }} /> Budget planning & scaling</li>
            </ul>

            <div className="wf-line thin dim" style={{ width: '100%', margin: '8px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--hi)' }}>From Rs. 98 / day</div>
              <div style={{ fontSize: 12, color: 'var(--dim)' }}>+ GST (Ad spend not included)</div>
              <div style={{ fontSize: 12, color: 'var(--hi)' }}>Service charges complementary with another service!</div>
            </div>
            
            <Link href="/contact" className="wf-btn glass" style={{ marginTop: 'auto' }}>Start Campaign</Link>
          </div>

        </div>
      </section>

      <section className="sp-sm" style={{ maxWidth: 800, margin: '0 auto 64px' }}>
        <div className="glass" style={{ padding: 32 }}>
          <h3 className="h-hand" style={{ fontSize: 32, marginBottom: 16 }}>Terms & Conditions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 14, color: 'var(--dim)' }}>
            <div>
              <strong style={{ color: '#fff' }}>Payment Schedule:</strong>
              <br />50% after project start
              <br />50% after project completion
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Payment Modes:</strong>
              <br />UPI / Bank Transfer / Cash
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <strong style={{ color: '#fff' }}>Important Notes:</strong>
              <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                <li>Minimum time period for SEO is 3 months.</li>
                <li>Social media ad spend is not included, but we do not charge any service charge over it.</li>
                <li>Any additional features or revisions beyond the initial scope may incur extra charges.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
