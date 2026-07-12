'use client';

import { useRef, useState } from 'react';

export default function TiltCard({
  children,
  className = '',
  style = {},
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) translateZ(0px)');

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(14px)`);
  }

  function handleLeave() {
    setTransform('rotateX(0deg) rotateY(0deg) translateZ(0px)');
  }

  return (
    <div style={{ perspective: '900px', height: '100%' }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
        style={{ transform, transformStyle: 'preserve-3d', transition: 'transform 0.25s cubic-bezier(0.17,0.55,0.55,1)', height: '100%', ...style }}
      >
        {children}
      </div>
    </div>
  );
}
