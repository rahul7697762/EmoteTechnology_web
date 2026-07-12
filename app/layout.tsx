import type { Metadata, Viewport } from "next";
import "./globals.css";
import Chatbot from "@/components/ui/web-chatbot";

const BASE_URL = "https://emotetechnology.in";

export const viewport: Viewport = {
  themeColor: "#0A101D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Emote Technology — Web, Chat & Voice Agency",
    template: "%s | Emote Technology",
  },
  description:
    "We build the conversation layer of your business. Custom websites, local SEO, WhatsApp chatbots, AI voice agents, and Google & Meta Ads — all from one team in KL.",
  keywords: [
    "web development agency India",
    "SEO agency India",
    "WhatsApp chatbot agency",
    "AI voice agent",
    "Google Business Profile optimization",
    "digital marketing agency KL",
    "website development Zirakpur",
    "website development dehradun",
    "AI voice agent development company",
    "AI voice agent development company Bangalore",
    "AI voice agent development company Mohali",
    "Google Ad Agency Bangalore",
    "Google Ad Agency Mohali",
    "Google Ad Agency Dehradun"

  ],
  authors: [{ name: "Emote Technology", url: BASE_URL }],
  creator: "Emote Technology",
  publisher: "Emote Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Emote Technology",
    title: "Emote Technology — Web, Chat & Voice Agency",
    description:
      "Custom websites, SEO, WhatsApp chatbots, and AI voice agents built by one team that ships.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Emote Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emote Technology — Web, Chat & Voice Agency",
    description:
      "Custom websites, SEO, WhatsApp chatbots, and AI voice agents built by one team that ships.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&family=Architects+Daughter&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {/* SVG roughen filter for sketchy mode */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="rough" x="-2%" y="-2%" width="104%" height="104%">
              <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves={2} seed={3} />
              <feDisplacementMap in="SourceGraphic" scale={2.2} />
            </filter>
          </defs>
        </svg>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
