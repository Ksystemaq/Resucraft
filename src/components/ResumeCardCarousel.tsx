import React, { useEffect } from 'react';

// ── Inject CSS keyframes once per page load ───────────────────────────────────
const KF_ID = 'rcc-keyframes-v2';
function injectKeyframes() {
  if (typeof document === 'undefined' || document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.innerHTML = `
    @keyframes rcc-rise {
      from { opacity: 0; transform: translateY(80px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes rcc-fc {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-11px); }
    }
    @keyframes rcc-fs {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-6px); }
    }
  `;
  document.head.appendChild(s);
}

// ── Shared avatar palette ─────────────────────────────────────────────────────
const P = {
  hair:  '#2e3c58',
  face:  '#c8aa88',
  body:  '#3d4f72',
  body2: '#5a7a9a',
  blush: 'rgba(210,130,120,0.42)',
  stroke:'#a07850',
};

// Female avatar (long hair)
const AvatarFemale = ({ sz }: { sz: number }) => (
  <svg width={sz} height={sz} viewBox="0 0 60 62" fill="none">
    {/* long hair bulk */}
    <ellipse cx="30" cy="20" rx="15.5" ry="17" fill={P.hair} />
    {/* face */}
    <ellipse cx="30" cy="25" rx="12" ry="12.5" fill={P.face} />
    {/* hair side strands */}
    <rect x="14" y="22" width="6.5" height="20" rx="3.2" fill={P.hair} />
    <rect x="39.5" y="22" width="6.5" height="20" rx="3.2" fill={P.hair} />
    {/* eyes */}
    <ellipse cx="25.5" cy="24.5" rx="1.9" ry="2.1" fill={P.hair} />
    <ellipse cx="34.5" cy="24.5" rx="1.9" ry="2.1" fill={P.hair} />
    {/* blush */}
    <ellipse cx="22.5" cy="28.5" rx="2.4" ry="1.5" fill={P.blush} />
    <ellipse cx="37.5" cy="28.5" rx="2.4" ry="1.5" fill={P.blush} />
    {/* smile */}
    <path d="M26 30.5 Q30 34 34 30.5" stroke={P.stroke} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    {/* body */}
    <path d="M12 62 Q14 48 30 48 Q46 48 48 62Z" fill={P.body} />
  </svg>
);

// Male with cap (center hero character)
const AvatarCap = ({ sz }: { sz: number }) => (
  <svg width={sz} height={sz} viewBox="0 0 60 62" fill="none">
    {/* cap crown */}
    <ellipse cx="30" cy="16" rx="15.5" ry="11" fill={P.hair} />
    {/* cap brim */}
    <rect x="10" y="19" width="40" height="5.5" rx="2.7" fill={P.hair} />
    {/* under-cap hair line */}
    <ellipse cx="30" cy="22" rx="12.5" ry="6.5" fill={P.hair} />
    {/* face */}
    <ellipse cx="30" cy="31.5" rx="12.5" ry="13" fill={P.face} />
    {/* ears */}
    <ellipse cx="17.5" cy="31.5" rx="2.6" ry="3.2" fill={P.face} />
    <ellipse cx="42.5" cy="31.5" rx="2.6" ry="3.2" fill={P.face} />
    {/* eyes */}
    <ellipse cx="25" cy="30" rx="1.9" ry="2.3" fill={P.hair} />
    <ellipse cx="35" cy="30" rx="1.9" ry="2.3" fill={P.hair} />
    {/* blush */}
    <ellipse cx="22" cy="34.5" rx="2.5" ry="1.5" fill={P.blush} />
    <ellipse cx="38" cy="34.5" rx="2.5" ry="1.5" fill={P.blush} />
    {/* smile */}
    <path d="M25.5 37 Q30 41 34.5 37" stroke={P.stroke} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    {/* body */}
    <path d="M12 62 Q14 49 30 49 Q46 49 48 62Z" fill={P.body} />
  </svg>
);

// Plain male avatar
const AvatarMale = ({ sz }: { sz: number }) => (
  <svg width={sz} height={sz} viewBox="0 0 60 62" fill="none">
    {/* hair */}
    <ellipse cx="30" cy="18" rx="14" ry="9.5" fill={P.hair} />
    {/* face */}
    <ellipse cx="30" cy="29" rx="12.5" ry="12.5" fill={P.face} />
    {/* ears */}
    <ellipse cx="17.5" cy="29" rx="2.6" ry="3.2" fill={P.face} />
    <ellipse cx="42.5" cy="29" rx="2.6" ry="3.2" fill={P.face} />
    {/* eyes */}
    <ellipse cx="25" cy="27.5" rx="1.9" ry="2.3" fill={P.hair} />
    <ellipse cx="35" cy="27.5" rx="1.9" ry="2.3" fill={P.hair} />
    {/* blush */}
    <ellipse cx="22" cy="32" rx="2.5" ry="1.5" fill={P.blush} />
    <ellipse cx="38" cy="32" rx="2.5" ry="1.5" fill={P.blush} />
    {/* smile */}
    <path d="M25.5 34.5 Q30 38 34.5 34.5" stroke={P.stroke} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    {/* body */}
    <path d="M12 62 Q14 48 30 48 Q46 48 48 62Z" fill={P.body2} />
  </svg>
);

// ── Bar-line renderer (simulates resume text) ─────────────────────────────────
const DARK  = '#2d3a56';
const MID   = '#8ea0b8';
const LIGHT = '#c8d4e0';

type BarSpec =
  | { type: 'bar';  color: string; width: string; height: number }
  | { type: 'pair'; items: { color: string; width: string }[]; height: number }
  | { type: 'gap';  px: number };

function Bars({ specs }: { specs: BarSpec[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {specs.map((s, i) => {
        if (s.type === 'gap')
          return <div key={i} style={{ height: s.px }} />;
        if (s.type === 'bar')
          return (
            <div
              key={i}
              style={{
                height: s.height,
                borderRadius: 99,
                backgroundColor: s.color,
                width: s.width,
              }}
            />
          );
        if (s.type === 'pair')
          return (
            <div key={i} style={{ display: 'flex', gap: 6 }}>
              {s.items.map((it, j) => (
                <div
                  key={j}
                  style={{
                    height: s.height,
                    borderRadius: 99,
                    backgroundColor: it.color,
                    width: it.width,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          );
        return null;
      })}
    </div>
  );
}

// ── Bar data for center card ───────────────────────────────────────────────────
const centerSpecs: BarSpec[] = [
  { type: 'bar',  color: MID,   width: '65%', height: 5  },
  { type: 'bar',  color: LIGHT, width: '42%', height: 4  },
  { type: 'gap',  px: 7 },
  { type: 'bar',  color: DARK,  width: '100%', height: 4 },
  { type: 'bar',  color: DARK,  width: '90%',  height: 4 },
  { type: 'bar',  color: DARK,  width: '76%',  height: 4 },
  { type: 'gap',  px: 8 },
  { type: 'pair', height: 4, items: [{ color: DARK, width: '46%' }, { color: DARK,  width: '44%' }] },
  { type: 'pair', height: 4, items: [{ color: DARK, width: '46%' }, { color: LIGHT, width: '36%' }] },
  { type: 'gap',  px: 8 },
  { type: 'bar',  color: MID,   width: '55%', height: 5  },
  { type: 'bar',  color: DARK,  width: '100%', height: 4 },
  { type: 'bar',  color: DARK,  width: '84%',  height: 4 },
  { type: 'gap',  px: 6 },
  { type: 'pair', height: 4, items: [{ color: DARK,  width: '46%' }, { color: DARK,  width: '44%' }] },
  { type: 'pair', height: 4, items: [{ color: LIGHT, width: '36%' }, { color: DARK,  width: '48%' }] },
];

// ── Bar data for side cards ────────────────────────────────────────────────────
const sideSpecs: BarSpec[] = [
  { type: 'bar',  color: MID,   width: '68%', height: 4  },
  { type: 'bar',  color: LIGHT, width: '48%', height: 3  },
  { type: 'gap',  px: 6 },
  { type: 'bar',  color: DARK,  width: '100%', height: 3 },
  { type: 'bar',  color: DARK,  width: '88%',  height: 3 },
  { type: 'bar',  color: DARK,  width: '74%',  height: 3 },
  { type: 'gap',  px: 7 },
  { type: 'pair', height: 3, items: [{ color: DARK, width: '44%' }, { color: DARK,  width: '44%' }] },
  { type: 'pair', height: 3, items: [{ color: DARK, width: '44%' }, { color: LIGHT, width: '36%' }] },
  { type: 'gap',  px: 7 },
  { type: 'bar',  color: DARK,  width: '100%', height: 3 },
  { type: 'bar',  color: DARK,  width: '80%',  height: 3 },
  { type: 'gap',  px: 6 },
  { type: 'pair', height: 3, items: [{ color: DARK,  width: '44%' }, { color: LIGHT, width: '36%' }] },
  { type: 'pair', height: 3, items: [{ color: DARK,  width: '44%' }, { color: DARK,  width: '44%' }] },
];

// ── Single resume card ────────────────────────────────────────────────────────
interface CardProps {
  avatar: React.ReactNode;
  avatarRingPx: number;
  widthPx: number;
  specs: BarSpec[];
  riseDelay: number;   // seconds
  floatAnim: string;   // 'rcc-fc' | 'rcc-fs'
  floatDuration: number;
  floatDelay: number;
  style?: React.CSSProperties;
}

function ResumeCard({
  avatar, avatarRingPx, widthPx, specs,
  riseDelay, floatAnim, floatDuration, floatDelay,
  style = {},
}: CardProps) {
  const half = avatarRingPx / 2;

  return (
    <div
      style={{
        animation: `rcc-rise 0.65s cubic-bezier(0.34,1.56,0.64,1) ${riseDelay}s both,
                    ${floatAnim} ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
        ...style,
      }}
    >
      {/* Card shell */}
      <div
        style={{
          width: widthPx,
          backgroundColor: '#ecf2f8',
          borderRadius: 18,
          paddingTop: half + 10,
          paddingBottom: 18,
          paddingLeft: 14,
          paddingRight: 14,
          position: 'relative',
          boxShadow: widthPx > 170
            ? '0 22px 54px rgba(45,58,86,0.18), 0 4px 16px rgba(45,58,86,0.10)'
            : '0 8px 26px rgba(45,58,86,0.13)',
        }}
      >
        {/* Avatar ring centered at card top */}
        <div
          style={{
            position: 'absolute',
            top: -half,
            left: '50%',
            transform: 'translateX(-50%)',
            width: avatarRingPx,
            height: avatarRingPx,
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 4px 16px rgba(45,58,86,0.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {avatar}
        </div>

        {/* Bar content */}
        <Bars specs={specs} />
      </div>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export const ResumeCardCarousel: React.FC = () => {
  useEffect(() => { injectKeyframes(); }, []);

  /* ---- measurements ---- */
  const cW  = 188;  // center card width
  const sW  = 148;  // side card width
  const cAv = 82;   // center avatar ring diameter
  const sAv = 60;   // side avatar ring diameter

  /* ---- container sizing ---- */
  // We need: sW + overlap(≈30) + cW + overlap(≈30) + sW = ~454 → 460px
  // Height: tallest item (center card with avatar) ≈ 320 + 41 avatar overflow = ~360
  const W = 460;
  const H = 380;

  return (
    <div
      style={{
        position: 'relative',
        width: W,
        height: H,
        maxWidth: '100%',
      }}
    >
      {/* ── LEFT card ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          zIndex: 5,
          transformOrigin: 'bottom center',
          transform: 'rotate(-2deg)',
        }}
      >
        <ResumeCard
          avatar={<AvatarFemale sz={sAv - 8} />}
          avatarRingPx={sAv}
          widthPx={sW}
          specs={sideSpecs}
          riseDelay={0.0}
          floatAnim="rcc-fs"
          floatDuration={3.9}
          floatDelay={0.7}
        />
      </div>

      {/* ── CENTER card ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <ResumeCard
          avatar={<AvatarCap sz={cAv - 10} />}
          avatarRingPx={cAv}
          widthPx={cW}
          specs={centerSpecs}
          riseDelay={0.18}
          floatAnim="rcc-fc"
          floatDuration={3.6}
          floatDelay={0.85}
        />
      </div>

      {/* ── RIGHT card ── */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          zIndex: 5,
          transformOrigin: 'bottom center',
          transform: 'rotate(2deg)',
        }}
      >
        <ResumeCard
          avatar={<AvatarMale sz={sAv - 8} />}
          avatarRingPx={sAv}
          widthPx={sW}
          specs={sideSpecs}
          riseDelay={0.08}
          floatAnim="rcc-fs"
          floatDuration={3.9}
          floatDelay={1.1}
        />
      </div>
    </div>
  );
};
