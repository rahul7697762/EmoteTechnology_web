import React from 'react';
import { blogPosts, getPostBySlug } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://emotetechnology.in';

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Emote Technology Blog`,
    description: post.seoDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: 'article',
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seoDescription,
      images: [post.image],
    },
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Emote Technology', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Emote Technology',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050914] text-white relative overflow-hidden font-sans pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#050914] to-[#050914]" />
      
      <Nav />

      <main className="flex-grow container mx-auto px-6 py-12 lg:py-20 relative z-10 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest border border-blue-500/30">
              {post.tag}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8 drop-shadow-lg">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-neutral-400 font-medium">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.mins} read</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-2">By Emote Technology</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-neutral-300 leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 italic">
            {post.excerpt}
          </p>

          {post.content.map((section: any, idx: number) => {
            if (section.type === 'h2') {
              return <h2 key={idx} className="text-3xl font-bold mt-16 mb-6 text-white">{section.content}</h2>;
            }
            if (section.type === 'h3') {
              return <h3 key={idx} className="text-2xl font-semibold mt-10 mb-4 text-blue-100">{section.content}</h3>;
            }
            if (section.type === 'p') {
              return <p key={idx} className="text-neutral-400 leading-relaxed mb-6 text-lg">{section.content}</p>;
            }
            if (section.type === 'blockquote') {
              return (
                <blockquote key={idx} className="border-l-4 border-blue-500 pl-6 my-8 py-2 text-xl italic text-neutral-300 bg-white/[0.02] rounded-r-lg">
                  {section.content}
                </blockquote>
              );
            }
            if (section.type === 'ul') {
              return (
                <ul key={idx} className="list-disc list-outside pl-6 mb-8 text-neutral-400 leading-relaxed text-lg space-y-3">
                  {section.items.map((item: string, i: number) => (
                    <li key={i}><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </article>

        {/* CTA Section */}
        <div className="mt-24 p-10 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to transform your brand?</h3>
            <p className="text-neutral-400">Let\'s discuss your project and see how Emote Technology can help.</p>
          </div>
          <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-400 transition-colors shadow-lg">
            Start a Project <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
