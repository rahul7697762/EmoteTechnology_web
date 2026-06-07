import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'A small studio based in KL and Zirakpur that ships websites, SEO, WhatsApp chatbots, and AI voice agents. Meet the team behind 127+ projects in 12 countries.',
  openGraph: {
    title: 'About Emote Technology',
    description:
      'Meet the humans behind Emote Technology — a compact, high-output studio building websites, SEO, and AI automation for global brands since 2019.',
    url: 'https://emotetechnology.in/about',
  },
  alternates: { canonical: 'https://emotetechnology.in/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
