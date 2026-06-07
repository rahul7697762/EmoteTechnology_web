import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { servicesData } from '@/lib/servicesData';
import ServiceContent from './ServiceContent';

export async function generateStaticParams() {
  return Object.keys(servicesData).map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = servicesData[slug];
  if (!data) return { title: 'Service Not Found' };

  return {
    title: `${data.subtitle} — ${data.title}`,
    description: data.seoDescription,
    keywords: data.keywords,
    openGraph: {
      title: `${data.title} | Emote Technology`,
      description: data.seoDescription,
      url: `https://emotetechnology.in/services/${slug}`,
    },
    alternates: { canonical: `https://emotetechnology.in/services/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = servicesData[slug];
  if (!data) notFound();

  return <ServiceContent data={data} />;
}
