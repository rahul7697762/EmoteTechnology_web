import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';
import Reveal from '@/components/Reveal';
import { PhoneCall, PenTool, Code, Rocket, MapPin, TrendingUp, Target, MessageCircle, Star, ArrowRight } from 'lucide-react';

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

export default function HomePage() {
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

      {/* HERO */}
      <CinematicHero 
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
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,1) 100%), url(/services_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' 
      }}>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">01 · services</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>One team. Five surfaces.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {ServiceList.map((s, i) => (
            <div key={s} className="glass" style={{ padding: 20,
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240,
              background: i === 0 ? 'rgba(0,240,255,0.1)' : ''}}>
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
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="glass sp" style={{ 
        color: 'var(--text-main)',
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,0.6) 50%, rgba(10,10,12,1) 100%), url(/process_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
      }}>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.3)' }}>02 · process</span>
          <h2 className="h-hand fade-up" style={{ fontSize: 44, lineHeight: 1.05 }}>From kickoff to live in 4 weeks.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { title: 'Discovery call', desc: 'We align on your goals, requirements, and timeline to build the right foundation.', icon: PhoneCall },
            { title: 'Sketch & spec', desc: 'Wireframing, UX/UI design, and system architecture mapping.', icon: PenTool },
            { title: 'Build & integrate', desc: 'Development, third-party integrations, and rigorous testing.', icon: Code },
            { title: 'Launch & iterate', desc: 'Deployment, monitoring, and continuous optimization based on user data.', icon: Rocket }
          ].map((step, i) => (
            <div key={step.title} className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 12, animationDelay: `${i * 0.15}s` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="h-hand wf-pulse" style={{ fontSize: 56, color: 'var(--hi)', animationDelay: `${i * 0.4}s` }}>{`0${i + 1}`}</span>
                <span className="lbl" style={{ color: 'rgba(255,255,255,.7)' }}>week {i + 1}</span>
                <step.icon size={28} strokeWidth={1.5} style={{ marginLeft: 'auto', color: 'var(--hi)', opacity: 0.8 }} />
              </div>
              <div className="h-hand" style={{ fontSize: 24, color: 'var(--text-main)' }}>{step.title}</div>
              <p style={{ fontSize: 14, color: 'var(--dim)', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* PORTFOLIO / OUR WORK */}
      <section id="work" className="sp" style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,1) 100%), url(/portfolio_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' 
      }}>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">03 · our work</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Featured Projects.</h2>
          <p style={{ maxWidth: 540, color: 'var(--dim)', fontSize: 16 }}>A selection of brands we've helped scale online.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {[
            {
              title: 'Dhareeni.in',
              url: 'https://dhareeni.in',
              img: '', // Placeholder
              desc: 'An elegant e-commerce platform built for a premium clothing and lifestyle brand. Designed with a custom aesthetic, seamless product filtering, and a fully optimized checkout flow to drive conversions.',
            },
            {
              title: 'E-Hotel Store',
              url: 'http://ehotelstore.com',
              img: 'https://emotetechnology.in/wp-content/uploads/2026/01/cropped-Energetic_Wordmark_Hotel_Store_Logo_1_-removebg-preview-300x135-1.webp',
              desc: 'The eHotel Store is a modern, conversion-focused eCommerce platform crafted by Emote Technology for the hospitality industry. Designed for performance and aesthetics, the website enables hotels to seamlessly browse, select, and purchase premium hotel supplies with ease.',
            },
            {
              title: 'Realstar Fire Components',
              url: 'https://realstarfirecomponents.com/',
              img: 'https://emotetechnology.in/wp-content/uploads/2026/01/cropped-real_star_logo-removebg-preview-100x100-1.webp',
              desc: 'At Realstar Fire Components, we specialize in delivering high-quality, reliable, and certified fire safety solutions designed to protect lives, property, and infrastructure. Our products are engineered with precision, tested for performance, and built to meet the highest safety standards.',
            },
            {
              title: 'World Travel Planners',
              url: 'https://worldtravelplanner.in/',
              img: 'https://emotetechnology.in/wp-content/uploads/2026/01/image-removebg-preview.png',
              desc: 'At World Travel Planners, we turn travel dreams into perfectly planned journeys. From serene getaways to adventurous explorations, we curate personalized travel experiences that are seamless, memorable, and stress-free we handle every detail—so you can focus on enjoying the journey.',
            },
            {
              title: 'Minimech',
              url: 'https://minimech.ae/',
              img: 'https://emotetechnology.in/wp-content/uploads/2026/01/cropped-Minimech-logo-300x82-removebg-preview.png',
              desc: 'Minimech General Trading LLC is a trusted supplier of certified fire and life safety equipment with over a decade of industry expertise. We deliver high-quality, reliable fire protection solutions across the Gulf and Africa, helping businesses stay safe, compliant, and prepared.',
            },
            {
              title: 'Maths Spark',
              url: 'http://themathspark.co.uk',
              img: 'https://emotetechnology.in/wp-content/uploads/2026/01/ChatGPT-Image-Jan-12-2026-04_57_47-PM-1.png',
              desc: 'Maths Spark makes mathematics simple, engaging, and confidence-building for students of all levels. We focus on building strong conceptual clarity through well-structured lessons, step-by-step explanations, and smart problem-solving techniques that make learning maths easier and more enjoyable.',
            },
            {
              title: 'Viva Hotels',
              url: 'https://www.hotelsviva.com/en',
              img: 'https://emotetechnology.in/wp-content/uploads/2026/01/vivalogo.png',
              desc: 'Viva Hotels offers a perfect blend of comfort, elegance, and personalized hospitality. Designed for both business and leisure travelers, our hotels provide thoughtfully crafted rooms, modern amenities, and warm service to ensure a relaxing and memorable stay.',
            }
          ].map((item, i) => (
            <div key={item.title} className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="sp-sm" style={{ 
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,1) 100%), url(/testimonials_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' 
      }}>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, padding: '0 48px' }}>
          <span className="wf-section-label glass">05 · words</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>What clients say.</h2>
        </div>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', padding: '24px 0' }}>
          <div className="wf-marq-inner" style={{ animationDuration: '30s' }}>
            {[
              {
                quote: "Emote Technology completely transformed our online presence. The new eHotel Store website is lightning fast, visually stunning, and has drastically improved our conversion rates.",
                author: "Sanjay M.",
                role: "Director, E-Hotel Store"
              },
              {
                quote: "Their team delivered a highly professional and secure website that perfectly represents our certified fire safety solutions. We've seen a massive uptick in B2B inquiries across the Gulf.",
                author: "Ahmad K.",
                role: "Operations Head, Minimech"
              },
              {
                quote: "The platform they built for Maths Spark is exactly what we needed. It is beautifully designed, reliable, and incredibly easy for students and parents to navigate.",
                author: "David W.",
                role: "Founder, Maths Spark"
              },
              {
                quote: "Emote Technology completely transformed our online presence. The new eHotel Store website is lightning fast, visually stunning, and has drastically improved our conversion rates.",
                author: "Sanjay M.",
                role: "Director, E-Hotel Store"
              },
              {
                quote: "Their team delivered a highly professional and secure website that perfectly represents our certified fire safety solutions. We've seen a massive uptick in B2B inquiries across the Gulf.",
                author: "Ahmad K.",
                role: "Operations Head, Minimech"
              },
              {
                quote: "The platform they built for Maths Spark is exactly what we needed. It is beautifully designed, reliable, and incredibly easy for students and parents to navigate.",
                author: "David W.",
                role: "Founder, Maths Spark"
              }
            ].map((t, i) => (
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
      <section className="sp-sm" style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,1) 100%), url(/team_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' 
      }}>
        <Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          <span className="wf-section-label glass">06 · team</span>
          <h2 className="h-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>The humans behind it.</h2>
        </div>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { name: 'Shivam', role: 'Director' },
            { name: 'Kusam', role: 'SEO & Social Media Expert' },
            { name: 'Rahul', role: 'Web Developer' }
          ].map((person) => (
            <div key={person.name} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', minWidth: 120 }}>
              <div className="wf-avatar glass" style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 'bold', color: 'var(--hi)' }}>
                {person.name[0]}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div className="h-hand" style={{ fontSize: 22, color: 'var(--text-main)' }}>{person.name}</div>
                <div style={{ fontSize: 13, color: 'var(--dim)', textAlign: 'center', maxWidth: 140 }}>{person.role}</div>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* BLOG */}
      <section className="sp-sm" style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,1) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,1) 100%), url(/blog_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' 
      }}>
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
        padding: '80px 48px', 
        backgroundImage: 'linear-gradient(to bottom, rgba(10,10,12,0.6) 0%, rgba(10,10,12,1) 100%), url(/cta_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        borderTop: '1px solid var(--border-glass)' 
      }}>
        <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
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
