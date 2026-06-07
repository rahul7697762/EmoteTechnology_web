import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Field Notes from the Build',
  description:
    'Playbooks, post-mortems, and deep dives on web development, SEO, WhatsApp chatbots, and AI voice agents — written by the people who shipped the thing.',
  openGraph: {
    title: 'Emote Technology Blog',
    description:
      'Half playbooks, half post-mortems. Practical guides on web design, SEO, WhatsApp automation, and AI voice agents from the Emote Technology team.',
    url: 'https://emotetechnology.in/blog',
  },
  alternates: { canonical: 'https://emotetechnology.in/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
