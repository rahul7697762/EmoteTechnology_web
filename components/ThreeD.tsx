'use client';

/* ── Wire Cube ─────────────────────────────────────────────────────── */
export function WireCube({ size = 200 }: { size?: number }) {
  const half = size / 2;
  const face = (transform: string) => (
    <div
      className="wf-cube-face"
      style={{ width: size, height: size, transform, top: -half, left: -half }}
    />
  );
  return (
    <div className="wf3d" style={{ width: size, height: size }}>
      <div className="wf3d-stage">
        <div className="wf-cube" style={{ width: size, height: size }}>
          {face(`translateZ(${half}px)`)}
          {face(`rotateY(180deg) translateZ(${half}px)`)}
          {face(`rotateY(90deg) translateZ(${half}px)`)}
          {face(`rotateY(-90deg) translateZ(${half}px)`)}
          {face(`rotateX(90deg) translateZ(${half}px)`)}
          {face(`rotateX(-90deg) translateZ(${half}px)`)}
        </div>
      </div>
    </div>
  );
}

/* ── Wire Orb ──────────────────────────────────────────────────────── */
export function WireOrb({ size = 240, rings = 6 }: { size?: number; rings?: number }) {
  const ringEls: React.ReactNode[] = [];
  for (let i = 0; i < rings; i++) {
    const angle = (180 / rings) * i;
    ringEls.push(
      <div key={`r${i}`} style={{
        position: 'absolute', width: `${size}px`, height: `${size}px`, borderRadius: '50%',
        transform: `rotateY(${angle.toFixed(3)}deg)`, top: `${-size / 2}px`, left: `${-size / 2}px`}} />
    );
  }
  for (let i = -2; i <= 2; i++) {
    const ry = Math.sqrt(1 - (i * 0.35) ** 2);
    ringEls.push(
      <div key={`lat${i}`} style={{
        position: 'absolute', width: `${size}px`, height: `${(size * ry * 0.18).toFixed(3)}px`, borderRadius: '50%',
        top: `${(-size * ry * 0.09 + i * size * 0.18).toFixed(3)}px`, left: `${-size / 2}px`, opacity: 0.6}} />
    );
  }
  return (
    <div className="wf3d" style={{ width: size, height: size }}>
      <div className="wf3d-stage">
        <div className="wf-orb" style={{ position: 'relative', width: 0, height: 0 }}>
          {ringEls}
        </div>
      </div>
    </div>
  );
}

/* ── Voice Wave ────────────────────────────────────────────────────── */
export function VoiceWave({ width = 280, height = 120, bars = 28 }: { width?: number; height?: number; bars?: number }) {
  return (
    <div className="wf3d" style={{ width, height: height + 20 }}>
      <div className="wf3d-stage" style={{
        alignItems: 'flex-end', paddingBottom: 8,
        transform: 'rotateY(-15deg) rotateX(10deg)'}}>
        <div style={{ display: 'flex', alignItems: 'flex-end', transformStyle: 'preserve-3d' }}>
          {Array.from({ length: bars }).map((_, i) => {
            const depth = Math.sin((i / bars) * Math.PI) * 40 - 10;
            return (
              <div
                key={i}
                className="wf-vbar"
                style={{
                  height: `${height}px`,
                  marginRight: `${((width - bars * 6) / (bars - 1)).toFixed(3)}px`,
                  animationDelay: `${((i % 8) * 0.08).toFixed(2)}s`,
                  transform: `translateZ(${depth.toFixed(3)}px) scaleY(0.4)`}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Chat Bubbles ──────────────────────────────────────────────────── */
export function ChatBubbles({ width = 360, height = 280 }: { width?: number; height?: number }) {
  type BubbleProps = {
    side: 'me' | 'them'; w: number; h: number;
    top: number; left: number; depth: number; anim: 'a' | 'b' | 'c';
  };
  const Bubble = ({ side, w, h, top, left, depth, anim }: BubbleProps) => (
    <div
      className={`wf-bub-${anim}`}
      style={{
        position: 'absolute', top, left, width: w, height: h, borderRadius: 18,
        background: side === 'me' ? 'var(--text-main)' : 'var(--bg-glass)',
        borderBottomRightRadius: side === 'me' ? 4 : 14,
        borderBottomLeftRadius: side === 'them' ? 4 : 14,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px 14px',
        transform: `translateZ(${depth}px)`, gap: 6}}
    >
      <div className="wf-line thin" style={{ width: '90%', background: side === 'me' ? 'var(--bg-glass)' : 'var(--text-main)' }} />
      <div className="wf-line thin" style={{ width: '60%', background: side === 'me' ? 'var(--bg-glass)' : 'var(--text-main)' }} />
    </div>
  );
  return (
    <div className="wf3d" style={{ width, height }}>
      <div className="wf3d-stage" style={{ transform: 'rotateY(-18deg) rotateX(8deg)' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          <Bubble side="them" w={160} h={56} top={20} left={20} depth={-30} anim="c" />
          <Bubble side="me"   w={180} h={62} top={100} left={width - 200} depth={20} anim="b" />
          <Bubble side="them" w={200} h={64} top={190} left={40} depth={60} anim="a" />
        </div>
      </div>
    </div>
  );
}

/* ── Phone Stack ───────────────────────────────────────────────────── */
export function PhoneStack({ width = 320, height = 380 }: { width?: number; height?: number }) {
  const Phone = ({ z, x, label }: { z: number; x: number; label: string }) => (
    <div style={{
      position: 'absolute', width: 140, height: 280, top: 40, left: width / 2 - 70 + x, borderRadius: 22,
      transform: `translateZ(${z}px) translateX(${x * 0.6}px)`,
      padding: 12, display: 'flex', flexDirection: 'column', gap: 8}}>
      <div style={{ width: 40, height: 5, borderRadius: 4, alignSelf: 'center' }} />
      <div className="wf-box dashed" style={{ width: '100%', height: 80 }} />
      <div className="wf-line thin" style={{ width: '80%' }} />
      <div className="wf-line thin" style={{ width: '60%' }} />
      <div className="wf-box fill-ink" style={{ width: '100%', height: 36 }} />
      <span style={{ fontSize: 9, color: 'var(--dim)', fontFamily: 'JetBrains Mono, monospace', textAlign: 'center' }}>{label}</span>
    </div>
  );
  return (
    <div className="wf3d" style={{ width, height }}>
      <div className="wf3d-stage">
        <div className="wf-phone-stack" style={{ position: 'relative', width, height }}>
          <Phone z={-40} x={-90} label="03" />
          <Phone z={10}  x={-30} label="02" />
          <Phone z={60}  x={30}  label="01 · active" />
        </div>
      </div>
    </div>
  );
}

/* ── SERP Cards ────────────────────────────────────────────────────── */
export function SerpCards({ width = 360, height = 280 }: { width?: number; height?: number }) {
  const Card = ({ top, left, w, anim, rank }: { top: number; left: number; w: number; anim: 'a' | 'b' | 'c'; rank: number }) => (
    <div
      className={`wf-card-${anim}`}
      style={{
        position: 'absolute', top, left, width: w, padding: 12, borderRadius: 8,
        display: 'flex', gap: 10, alignItems: 'flex-start'}}
    >
      <div className="wf-box fill-hi" style={{
        width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 13}}>#{rank}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="wf-line thin" style={{ width: '85%' }} />
        <div className="wf-line thin dim" style={{ width: '60%' }} />
      </div>
    </div>
  );
  return (
    <div className="wf3d" style={{ width, height }}>
      <div className="wf3d-stage" style={{ transform: 'rotateY(-14deg) rotateX(10deg)' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          <Card top={20}  left={30} w={260} anim="a" rank={1} />
          <Card top={110} left={60} w={240} anim="b" rank={2} />
          <Card top={190} left={20} w={250} anim="c" rank={3} />
        </div>
      </div>
    </div>
  );
}
