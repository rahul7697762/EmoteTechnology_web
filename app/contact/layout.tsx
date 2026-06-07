import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Emote Technology. Book a 20-minute call, email us, or reach out via WhatsApp. We reply within 24 hours.',
  openGraph: {
    title: 'Contact Emote Technology',
    description:
      'Tell us what you\'re stuck on. We\'ll come back with one idea, three options, zero pitch decks. Book a call or email info@emotetechnology.in.',
    url: 'https://emotetechnology.in/contact',
  },
  alternates: { canonical: 'https://emotetechnology.in/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
