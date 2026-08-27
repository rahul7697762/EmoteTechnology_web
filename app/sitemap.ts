import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

const BASE_URL = 'https://emotetechnology.in';

const servicesSlugs = ['web', 'seo', 'whatsapp-chatbot', 'voice', 'web-chatbot', 'social-media', 'paid-ads'];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = blogPosts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const serviceUrls = servicesSlugs.map(slug => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/data-deletion`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...serviceUrls,
    ...blogUrls,
  ];
}
