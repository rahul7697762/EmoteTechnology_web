"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';

export function NavHeader() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  return (
    <div className="relative">
      <ul
        className="relative mx-auto flex w-fit rounded-full border border-[var(--border-glass)] bg-[rgba(255,255,255,0.05)] p-1 backdrop-blur-md"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        <Tab setPosition={setPosition} href="/">Home</Tab>
        <Tab setPosition={setPosition} href="/services">Services</Tab>
        <Tab setPosition={setPosition} href="/pricing">Pricing</Tab>
        <Tab setPosition={setPosition} href="/#work">Work</Tab>
        <Tab setPosition={setPosition} href="/about">About</Tab>
        <Tab setPosition={setPosition} href="/blog">Blog</Tab>

        <Cursor position={position} />
      </ul>
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
