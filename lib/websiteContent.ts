/**
 * Fetches website content from Firestore (server-side).
 * Falls back to static data when the collection is empty or unavailable.
 */
import { db } from './firebase-admin';

// ─── Fallback Data ─────────────────────────────────────────────────────────

export const FALLBACK_PROJECTS = [
  {
    id: 'fallback-1',
    title: 'Dhareeni.in',
    url: 'https://dhareeni.in',
    img: '',
    desc: 'An elegant e-commerce platform built for a premium clothing and lifestyle brand. Designed with a custom aesthetic, seamless product filtering, and a fully optimized checkout flow to drive conversions.',
  },
  {
    id: 'fallback-2',
    title: 'E-Hotel Store',
    url: 'http://ehotelstore.com',
    img: 'https://emotetechnology.in/wp-content/uploads/2026/01/cropped-Energetic_Wordmark_Hotel_Store_Logo_1_-removebg-preview-300x135-1.webp',
    desc: 'The eHotel Store is a modern, conversion-focused eCommerce platform crafted by Emote Technology for the hospitality industry. Designed for performance and aesthetics, the website enables hotels to seamlessly browse, select, and purchase premium hotel supplies with ease.',
  },
  {
    id: 'fallback-3',
    title: 'Realstar Fire Components',
    url: 'https://realstarfirecomponents.com/',
    img: 'https://emotetechnology.in/wp-content/uploads/2026/01/cropped-real_star_logo-removebg-preview-100x100-1.webp',
    desc: 'At Realstar Fire Components, we specialize in delivering high-quality, reliable, and certified fire safety solutions designed to protect lives, property, and infrastructure.',
  },
  {
    id: 'fallback-4',
    title: 'World Travel Planners',
    url: 'https://worldtravelplanner.in/',
    img: 'https://emotetechnology.in/wp-content/uploads/2026/01/image-removebg-preview.png',
    desc: 'At World Travel Planners, we turn travel dreams into perfectly planned journeys. From serene getaways to adventurous explorations, we curate personalized travel experiences that are seamless, memorable, and stress-free.',
  },
  {
    id: 'fallback-5',
    title: 'Minimech',
    url: 'https://minimech.ae/',
    img: 'https://emotetechnology.in/wp-content/uploads/2026/01/cropped-Minimech-logo-300x82-removebg-preview.png',
    desc: 'Minimech General Trading LLC is a trusted supplier of certified fire and life safety equipment with over a decade of industry expertise. We deliver high-quality, reliable fire protection solutions across the Gulf and Africa.',
  },
  {
    id: 'fallback-6',
    title: 'Maths Spark',
    url: 'http://themathspark.co.uk',
    img: 'https://emotetechnology.in/wp-content/uploads/2026/01/ChatGPT-Image-Jan-12-2026-04_57_47-PM-1.png',
    desc: 'Maths Spark makes mathematics simple, engaging, and confidence-building for students of all levels. We focus on building strong conceptual clarity through well-structured lessons and smart problem-solving techniques.',
  },
  {
    id: 'fallback-7',
    title: 'Viva Hotels',
    url: 'https://www.hotelsviva.com/en',
    img: 'https://emotetechnology.in/wp-content/uploads/2026/01/vivalogo.png',
    desc: 'Viva Hotels offers a perfect blend of comfort, elegance, and personalized hospitality. Designed for both business and leisure travelers, our hotels provide thoughtfully crafted rooms, modern amenities, and warm service.',
  },
];

export const FALLBACK_TESTIMONIALS = [
  {
    id: 'fallback-t1',
    quote: "Emote Technology completely transformed our online presence. The new eHotel Store website is lightning fast, visually stunning, and has drastically improved our conversion rates.",
    author: "Sanjay M.",
    role: "Director, E-Hotel Store",
  },
  {
    id: 'fallback-t2',
    quote: "Their team delivered a highly professional and secure website that perfectly represents our certified fire safety solutions. We've seen a massive uptick in B2B inquiries across the Gulf.",
    author: "Ahmad K.",
    role: "Operations Head, Minimech",
  },
  {
    id: 'fallback-t3',
    quote: "The platform they built for Maths Spark is exactly what we needed. It is beautifully designed, reliable, and incredibly easy for students and parents to navigate.",
    author: "David W.",
    role: "Founder, Maths Spark",
  },
];

export const FALLBACK_TEAM = [
  { id: 'fallback-m1', name: 'Shivam', role: 'Director', img: '' },
  { id: 'fallback-m2', name: 'Kusam', role: 'SEO & Social Media Expert', img: '' },
  { id: 'fallback-m3', name: 'Rahul', role: 'Web Developer', img: '' },
];

// ─── Fetch helpers ─────────────────────────────────────────────────────────

export async function getWebsiteProjects() {
  try {
    const snap = await db
      .collection('website_projects')
      .orderBy('order', 'asc')
      .get();
    if (snap.empty) return FALLBACK_PROJECTS;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as typeof FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getWebsiteTestimonials() {
  try {
    const snap = await db
      .collection('website_testimonials')
      .orderBy('order', 'asc')
      .get();
    if (snap.empty) return FALLBACK_TESTIMONIALS;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as typeof FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getWebsiteTeam() {
  try {
    const snap = await db
      .collection('website_team')
      .orderBy('order', 'asc')
      .get();
    if (snap.empty) return FALLBACK_TEAM;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as typeof FALLBACK_TEAM;
  } catch {
    return FALLBACK_TEAM;
  }
}
