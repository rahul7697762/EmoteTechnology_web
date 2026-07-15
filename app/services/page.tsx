import type { Metadata } from 'next';
import ServicesIndex from './ServicesIndex';

export const metadata: Metadata = {
  title: 'Services | Emote Technology',
  description:
    'Explore Emote Technology\'s services — web development, SEO, WhatsApp chatbots, AI voice agents, web chatbots, social media management, and paid ads.',
  openGraph: {
    title: 'Services | Emote Technology',
    description:
      'Explore Emote Technology\'s services — web development, SEO, WhatsApp chatbots, AI voice agents, web chatbots, social media management, and paid ads.',
    url: 'https://emotetechnology.in/services',
  },
  alternates: { canonical: 'https://emotetechnology.in/services' },
};

export default function ServicesPage() {
  return <ServicesIndex />;
}
