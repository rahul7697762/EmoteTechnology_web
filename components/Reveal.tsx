'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1) rotateX(0)' : 'translateY(40px) scale(0.95) rotateX(-10deg)',
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
}
