export interface ServiceData {
  title: string;
  subtitle: string;
  desc: string;
  metrics: [string, string][];
  scope: [string, string][];
  seoDescription: string;
  keywords: string;
}

export const servicesData: Record<string, ServiceData> = {
  web: {
    title: 'Cinematic Web',
    subtitle: 'Web Development',
    desc: 'We build high-end, immersive websites that refuse to be ignored. Custom 3D interactions, GSAP animations, and pixel-perfect layouts designed to convert.',
    metrics: [['14d', 'Avg. Launch'], ['100%', 'Custom Code'], ['Sub-1s', 'Load Time']],
    scope: [
      ['Design System', 'Custom typography, colors, and interactive tokens.'],
      ['3D & Motion', 'GSAP ScrollTriggers and Framer Motion integration.'],
      ['SEO Ready', 'Technical SEO and semantic HTML built-in.'],
      ['Headless CMS', 'Sanity or Contentful for easy content editing.'],
    ],
    seoDescription:
      'Emote Technology builds cinematic, custom websites with 3D animations and GSAP for brands in India and worldwide. Sub-1s load times, pixel-perfect design.',
    keywords:
      'custom web development agency India, cinematic website design, GSAP animation website, premium web development KL, Next.js agency India',
  },
  seo: {
    title: 'Data-Driven Search',
    subtitle: 'SEO Architecture',
    desc: 'Stop guessing. We engineer your platform\'s technical architecture and content hierarchy to dominate search results and capture high-intent traffic.',
    metrics: [['3x', 'Traffic Growth'], ['Top 3', 'Ranking Focus'], ['0', 'Blackhat Tactics']],
    scope: [
      ['Technical Audit', 'Deep-dive into core web vitals and crawlability.'],
      ['Keyword Matrix', 'High-intent semantic clustering.'],
      ['Content Engine', 'Programmatic SEO and structured data implementation.'],
      ['Authority Building', 'White-hat link acquisition strategies.'],
    ],
    seoDescription:
      'Emote Technology provides data-driven SEO services — technical audits, keyword strategy, and structured data — to rank businesses on page 1 globally.',
    keywords:
      'SEO agency India, technical SEO audit, local SEO India, Google ranking agency, programmatic SEO, GMB optimization agency',
  },
  'whatsapp-chatbot': {
    title: 'WhatsApp Chatbots',
    subtitle: 'Automated Support',
    desc: 'Meet your customers where they already are. We build verified, on-brand WhatsApp bots that book, qualify and route — in any language.',
    metrics: [['10d', 'Avg. Launch'], ['89%', 'Auto-handled'], ['24/7', 'Always Up']],
    scope: [
      ['Verified WABA setup', 'Green-tick, business profile, templates approved.'],
      ['Conversation flows', 'Up to 8 intents, with handoff to a human.'],
      ['CRM integration', 'HubSpot, Pipedrive, or your custom backend.'],
      ['Payments + bookings', 'In-thread payments and calendar slots.'],
    ],
    seoDescription:
      'Build a verified WhatsApp chatbot for your business with Emote Technology. WABA setup, AI automation, CRM integration, and 24/7 customer support.',
    keywords:
      'WhatsApp chatbot agency India, WABA setup, WhatsApp business automation, WhatsApp AI bot, customer support automation India',
  },
  voice: {
    title: 'AI Voice Agents',
    subtitle: 'Intelligent Reception',
    desc: 'Never miss a lead. Our AI voice agents answer calls, qualify leads, and book appointments 24/7 with human-like latency and emotion.',
    metrics: [['<800ms', 'Latency'], ['24/7', 'Availability'], ['100%', 'Call Answer Rate']],
    scope: [
      ['Custom Voice Clone', 'Brand-aligned voice personas and accents.'],
      ['Dynamic Routing', 'Live call transfers based on intent severity.'],
      ['Real-time Calendar', 'Direct integration with Calendly or Google Calendar.'],
      ['Post-call SMS', 'Automated follow-up texts with summary links.'],
    ],
    seoDescription:
      'Deploy an AI voice agent that answers calls 24/7, qualifies leads, and books appointments. Sub-800ms latency, human-like responses by Emote Technology.',
    keywords:
      'AI voice agent India, automated receptionist, AI phone answering service, voice AI agent for business, call automation India',
  },
  'social-media': {
    title: 'Social Media Management',
    subtitle: 'Brand Presence',
    desc: 'Stay top of mind without lifting a finger. We plan, design, and publish scroll-stopping content across Instagram, Facebook, and LinkedIn — and engage your audience daily.',
    metrics: [['30+', 'Posts / Month'], ['24h', 'Reply Time'], ['3x', 'Engagement Lift']],
    scope: [
      ['Content Calendar', 'Monthly strategy, themes, and posting schedule.'],
      ['Creative Design', 'On-brand reels, carousels, and static posts.'],
      ['Community Management', 'Comments, DMs, and reviews handled daily.'],
      ['Growth Reports', 'Monthly analytics on reach, followers, and engagement.'],
    ],
    seoDescription:
      'Emote Technology manages your social media end-to-end — content strategy, creative design, daily engagement, and growth reporting across Instagram, Facebook, and LinkedIn.',
    keywords:
      'social media management agency India, Instagram management, social media marketing Zirakpur, content creation agency, SMM services India',
  },
  'paid-ads': {
    title: 'Paid Ads That Convert',
    subtitle: 'Performance Marketing',
    desc: 'Stop burning budget on boosted posts. We run full-funnel Google and Meta ad campaigns engineered for one thing: measurable return on every rupee spent.',
    metrics: [['4x', 'Avg. ROAS'], ['48h', 'Launch Time'], ['100%', 'Transparent Spend']],
    scope: [
      ['Campaign Strategy', 'Audience research, offer positioning, and funnel mapping.'],
      ['Google & Meta Ads', 'Search, display, Instagram, and Facebook campaigns.'],
      ['Creative Testing', 'A/B tested ad copy, creatives, and landing pages.'],
      ['Weekly Optimization', 'Bid tuning, budget shifts, and performance reports.'],
    ],
    seoDescription:
      'Emote Technology runs high-ROAS Google and Meta ad campaigns — strategy, creatives, A/B testing, and weekly optimization with fully transparent spend.',
    keywords:
      'paid ads agency India, Google Ads management, Meta ads agency, performance marketing Zirakpur, PPC agency India, Facebook ads management',
  },
  'web-chatbot': {
    title: 'Web Chatbots',
    subtitle: 'Site Assistants',
    desc: 'Turn your website into a 24/7 sales rep. We build context-aware AI chatbots that understand your documentation and guide users to conversion.',
    metrics: [['95%', 'Resolution Rate'], ['0s', 'Wait Time'], ['Multi', 'Language Support']],
    scope: [
      ['Knowledge Base Sync', 'Trained on your PDFs, URLs, and Zendesk.'],
      ['Lead Capture', 'In-chat forms and meeting schedulers.'],
      ['Human Handoff', 'Seamless transition to live support agents.'],
      ['Custom UI', 'Beautiful, brand-matched chat widget styling.'],
    ],
    seoDescription:
      'Emote Technology builds AI web chatbots trained on your content — for 24/7 lead capture, support, and multilingual assistance on your website.',
    keywords:
      'AI chatbot for website India, custom chat widget, RAG chatbot agency, website AI assistant, lead capture chatbot India',
  },
};
