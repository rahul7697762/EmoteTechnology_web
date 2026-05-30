"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ChevronDown, Globe, Search, MessageSquare, Phone, Bot } from "lucide-react";

const servicesList = [
  { title: "Web Development", desc: "High-end cinematic websites", icon: Globe, href: "/services/web" },
  { title: "SEO", desc: "Data-driven search ranking", icon: Search, href: "/services/seo" },
  { title: "WhatsApp Bots", desc: "Automated support & sales", icon: MessageSquare, href: "/services/whatsapp-chatbot" },
  { title: "Voice Agents", desc: "AI-powered phone reception", icon: Phone, href: "/services/voice" },
  { title: "Web Chatbots", desc: "Intelligent site assistants", icon: Bot, href: "/services/web-chatbot" },
];

export function NavHeader() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <ul
        className="relative mx-auto flex w-fit rounded-full border border-[var(--border-glass)] bg-[rgba(255,255,255,0.05)] p-1 backdrop-blur-md"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        <Tab setPosition={setPosition} href="/">Home</Tab>
        
        {/* Services Tab with Dropdown Trigger */}
        <li
          onMouseEnter={(e) => {
            const { width } = e.currentTarget.getBoundingClientRect();
            setPosition({ width, opacity: 1, left: e.currentTarget.offsetLeft });
          }}
          className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-medium text-white mix-blend-difference md:px-5 md:py-2 md:text-sm"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <div className="flex items-center gap-1 w-full h-full">
            Services
            <ChevronDown className={`w-3 h-3 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
          </div>
        </li>

        <Tab setPosition={setPosition} href="/pricing">Pricing</Tab>
        <Tab setPosition={setPosition} href="/#work">Work</Tab>
        <Tab setPosition={setPosition} href="/about">About</Tab>
        <Tab setPosition={setPosition} href="/blog">Blog</Tab>

        <Cursor position={position} />
      </ul>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-[600px] rounded-3xl border border-white/10 bg-[#0A101D]/95 backdrop-blur-xl shadow-2xl p-6 z-50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servicesList.map((service, idx) => (
                <Link 
                  key={idx} 
                  href={service.href}
                  onClick={() => setIsServicesOpen(false)}
                  className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <div className="mt-1 p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <service.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">{service.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{service.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center px-4">
              <span className="text-sm text-neutral-400">Not sure what you need?</span>
              <Link 
                href="/contact" 
                onClick={() => setIsServicesOpen(false)}
                className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                Book a consultation <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-medium text-white mix-blend-difference md:px-5 md:py-2 md:text-sm"
    >
      <Link href={href} className="block w-full h-full text-inherit no-underline">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-white md:h-9"
    />
  );
};

export default NavHeader;
