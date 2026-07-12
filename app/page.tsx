import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { WireCube, WireOrb, SerpCards, ChatBubbles } from '@/components/ThreeD';
import { PhoneCall, PenTool, Code, Rocket, MapPin, TrendingUp, Target, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { getWebsiteProjects, getWebsiteTestimonials, getWebsiteTeam } from '@/lib/websiteContent';

const ServiceList = ['Web Development', 'Google Business Profile', 'SEO Setup', 'Google & Meta Ads', 'WhatsApp Campaigns'];
const ServiceBlurbs: Record<string, string> = {
  'Web Development': 'Custom 4-5 page sites. Mobile responsive, UI/UX optimized.',
  'Google Business Profile': 'Account setup, location pin, working hours, & service areas.',
  'SEO Setup': 'Local & restaurant keywords, GMB optimization, weekly posts.',
  'Google & Meta Ads': 'Search ads, FB & Insta campaigns targeted for maximum ROI.',
  'WhatsApp Campaigns': 'Inquiry campaigns & chatbots where your customers already live.'};
const ServiceIcons: Record<string, any> = {
  'Web Development': Code,
  'Google Business Profile': MapPin,
  'SEO Setup': TrendingUp,
  'Google & Meta Ads': Target,
  'WhatsApp Campaigns': MessageCircle};


function TestimonialCard({ rotate = 0, quote, author, role }: { rotate?: number; quote: string; author: string; role: string }) {
  return (
    <div className="glass" style={{ padding: 24,
      transform: `rotate(${rotate}deg)`,
      display: 'flex', flexDirection: 'column', gap: 16,
      minHeight: 220, width: 380, flexShrink: 0, whiteSpace: 'normal', position: 'relative'}}>
      <div style={{ fontSize: 32, lineHeight: 0.5, color: 'var(--hi)' }}>&ldquo;</div>
      <p style={{ fontSize: 15, color: 'var(--text-main)', lineHeight: 1.6, fontStyle: 'italic' }}>
        {quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
        <div className="wf-avatar glass" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--hi)', fontWeight: 'bold' }}>
          {author[0]}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{author}</div>
          <div style={{ fontSize: 12, color: 'var(--dim)' }}>{role}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="var(--hi)" color="var(--hi)" size={14} />)}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ tall = false }: { tall?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
      <div className="wf-img" style={{ width: '100%', height: tall ? 220 : 160 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <span className="wf-chip glass">Tutorial</span>
        <span className="wf-chip glass">SEO</span>
      </div>
      <div className="h-hand" style={{ fontSize: 22, lineHeight: 1.15 }}>
        How we rank local plumbers in 90 days
      </div>
      <div className="wf-line thin" style={{ width: '90%' }} />
      <div className="wf-line thin" style={{ width: '70%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--dim)' }}>
        <span>5 min read</span><span>Mar &apos;26</span>
      </div>
    </div>
  );
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Emote Technology',
  url: 'https://emotetechnology.in',
  logo: 'https://emotetechnology.in/logo.png',
  description:
    'We build the conversation layer of your business. Websites, SEO, WhatsApp chatbots, and AI voice agents.',
  foundingDate: '2019',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 7 },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'DSS-15, Trishala City Road',
    addressLocality: 'Zirakpur',
    addressRegion: 'Punjab',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@emotetechnology.in',
    contactType: 'customer support',
  },
  sameAs: ['https://emotetechnology.in'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Emote Technology',
  url: 'https://emotetechnology.in',
};

export default async function HomePage() {
  const [projects, testimonials, team] = await Promise.all([
    getWebsiteProjects(),
    getWebsiteTestimonials(),
    getWebsiteTeam(),
  ]);
  return (
    <div style={{ minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Nav />

      {/* HERO — always dark, independent of the site's light/dark toggle */}
      <CinematicHero
        className="bg-[#0b0f19]"
        brandName="Emote Tech"
        tagline1="We build the conversation"
        tagline2="layer of your business."
        cardHeading="Websites, SEO, web & WhatsApp chatbots"
        cardDescription="Done by one team, shipping every week. We're based in SEA."
        metricValue={127}
        metricLabel="Projects Shipped"
        ctaHeading="Got 20 minutes?"
        ctaDescription="Tell us where you're stuck. We'll come back with one idea, three options, zero pitch decks."
      />

      {/* SERVICES */}
      <section className="sp" style={{
        position: 'relative', overflow: 'hidden'
      }}>
        <div className="decor-3d" style={{ top: 10, right: 24 }}>
          <WireCube size={170} />
        </div>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, position: 'relative', zIndex: 1 }}>
          <span className="wf-section-label glass">01 · services</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>One team. Five surfaces.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, position: 'relative', zIndex: 1 }}>
          {ServiceList.map((s, i) => (
            <TiltCard
              key={s}
              className={`glass${i === 0 ? ' bento-first' : ''}`}
              style={{ padding: 20,
                display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240,
                background: i === 0 ? 'rgba(0,240,255,0.1)' : ''}}
            >
              <div className="h-hand" style={{ fontSize: 28, color: 'var(--hi)' }}>
                {(() => {
                  const Icon = ServiceIcons[s];
                  return <Icon size={28} strokeWidth={1.5} />;
                })()}
              </div>
              <div className="h-hand" style={{ fontSize: 22, lineHeight: 1.1 }}>{s}</div>
              <div style={{ fontSize: 13, color: 'var(--text-main)' }}>{ServiceBlurbs[s]}</div>
              <Link href="/pricing" style={{ marginTop: 'auto', fontSize: 13, textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 4 }}>
                Learn more <ArrowRight size={14} />
              </Link>
            </TiltCard>
          ))}
        </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="glass sp" style={{
        position: 'relative', overflow: 'hidden', color: 'var(--text-main)'
      }}>
        <div className="decor-3d" style={{ top: -20, right: -10 }}>
          <WireOrb size={220} />
        </div>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, position: 'relative', zIndex: 1 }}>
          <span className="wf-section-label" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.3)' }}>02 · process</span>
          <h2 className="h-hand fade-up" style={{ fontSize: 44, lineHeight: 1.05 }}>From kickoff to live in 4 weeks.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, position: 'relative', zIndex: 1 }}>
          {[
            { title: 'Discovery call', desc: 'We align on your goals, requirements, and timeline to build the right foundation.', icon: PhoneCall },
            { title: 'Sketch & spec', desc: 'Wireframing, UX/UI design, and system architecture mapping.', icon: PenTool },
            { title: 'Build & integrate', desc: 'Development, third-party integrations, and rigorous testing.', icon: Code },
            { title: 'Launch & iterate', desc: 'Deployment, monitoring, and continuous optimization based on user data.', icon: Rocket }
          ].map((step, i) => (
            <TiltCard key={step.title} max={6} className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 12, animationDelay: `${i * 0.15}s`, padding: 8, borderRadius: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="h-hand wf-pulse" style={{ fontSize: 56, color: 'var(--hi)', animationDelay: `${i * 0.4}s` }}>{`0${i + 1}`}</span>
                <span className="lbl" style={{ color: 'rgba(255,255,255,.7)' }}>week {i + 1}</span>
                <step.icon size={28} strokeWidth={1.5} style={{ marginLeft: 'auto', color: 'var(--hi)', opacity: 0.8 }} />
              </div>
              <div className="h-hand" style={{ fontSize: 24, color: 'var(--text-main)' }}>{step.title}</div>
              <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.5 }}>{step.desc}</p>
            </TiltCard>
          ))}
        </div>
        </Reveal>
      </section>

      {/* PORTFOLIO / OUR WORK */}
      <section id="work" className="sp" style={{
        position: 'relative', overflow: 'hidden'
      }}>
        <div className="decor-3d" style={{ top: 0, right: 10 }}>
          <SerpCards width={300} height={240} />
        </div>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, position: 'relative', zIndex: 1 }}>
          <span className="wf-section-label glass">03 · our work</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Featured Projects.</h2>
          <p style={{ maxWidth: 540, color: 'var(--dim)', fontSize: 16 }}>A selection of brands we've helped scale online.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, position: 'relative', zIndex: 1 }}>
          {projects.map((item) => (
            <TiltCard key={item.title} className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {item.img ? (
                <Link href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 8 }}>
                  <img src={item.img} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </Link>
              ) : (
                <Link href={item.url} target="_blank" rel="noopener noreferrer" className="wf-img" style={{ width: '100%', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', textDecoration: 'none' }}>
                  <span className="lbl" style={{ opacity: 0.5 }}>{item.title} Logo</span>
                </Link>
              )}
              <Link href={item.url} target="_blank" rel="noopener noreferrer" className="h-hand" style={{ fontSize: 28, lineHeight: 1.15, color: 'var(--hi)', textDecoration: 'none' }}>
                {item.title}
              </Link>
              <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
            </TiltCard>
          ))}
        </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="sp-sm" style={{
        position: 'relative', overflow: 'hidden'
      }}>
        <div className="decor-3d" style={{ top: 0, left: 24 }}>
          <ChatBubbles width={280} height={220} />
        </div>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, padding: '0 48px', position: 'relative', zIndex: 1 }}>
          <span className="wf-section-label glass">05 · words</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>What clients say.</h2>
        </div>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', padding: '24px 0', position: 'relative', zIndex: 1 }}>
          <div className="wf-marq-inner" style={{ animationDuration: '30s' }}>
            {/* Double the array so the marquee loops seamlessly */}
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard 
                key={i}
                rotate={i % 2 === 0 ? -1.2 : 1.4} 
                quote={t.quote}
                author={t.author}
                role={t.role}
              />
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="sp-sm">
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">06 · team</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>The humans behind it.</h2>
        </div>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', overflowX: 'auto', paddingBottom: 8 }}>
          {team.map((person) => (
            <TiltCard key={person.id} max={12} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', minWidth: 120 }}>
              {person.img ? (
                <img src={person.img} alt={person.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div className="wf-avatar glass" style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 'bold', color: 'var(--hi)' }}>
                  {person.name[0]}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div className="h-hand" style={{ fontSize: 22, color: 'var(--text-main)' }}>{person.name}</div>
                <div style={{ fontSize: 13, color: 'var(--dim)', textAlign: 'center', maxWidth: 140 }}>{person.role}</div>
              </div>
            </TiltCard>
          ))}
        </div>
        </Reveal>
      </section>

      {/* BLOG */}
      <section className="sp-sm">
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">07 · journal</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Field notes from the build.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
          <BlogCard /><BlogCard /><BlogCard />
        </div>
        </Reveal>
      </section>

      {/* CTA BANNER */}
      <section className="glass cta-banner" style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 48px',
        borderTop: '1px solid var(--border-glass)'
      }}>
        <div className="decor-3d" style={{ bottom: -60, right: -30, opacity: 0.22 }}>
          <WireOrb size={280} />
        </div>
        <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div>
            <div className="h-hand" style={{ fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1 }}>Got 20 minutes?</div>
            <p style={{ marginTop: 12, fontSize: 16, maxWidth: 480, lineHeight: 1.6 }}>
              Tell us where you&apos;re stuck. We&apos;ll come back with one idea, three options, zero pitch decks.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/contact" className="wf-btn solid glass">Book the call</Link>
            <Link href="mailto:info@emotetechnology.in" className="wf-btn glass">Email us</Link>
          </div>
        </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
