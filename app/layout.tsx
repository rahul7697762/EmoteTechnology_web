import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "emote. — Web, Chat & Voice Agency",
  description: "We build the conversation layer of your business. Websites, SEO, web & WhatsApp chatbots, voice agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&family=Architects+Daughter&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
      </body>
    </html>
  );
}
