import React, { useEffect, useRef, useState } from 'react';

// ── Fake resume card data ──────────────────────────────────────────────────────
const cards = [
  {
    id: 1,
    initials: 'AK',
    name: 'Aisha Khan',
    role: 'Product Designer',
    color: '#7c6fe0', // avatar ring color
    bg: '#c7f4e8',   // card bg tint
    lines: [100, 85, 92, 70, 60],
    tags: ['Figma', 'UX Research', 'Prototyping'],
  },
  {
    id: 2,
    initials: 'MR',
    name: 'Marcus Reed',
    role: 'Software Engineer',
    color: '#6366f1',
    bg: '#c7f4e8',
    lines: [100, 90, 80, 95, 65],
    tags: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: 3,
    initials: 'SL',
    name: 'Sofia Lin',
    role: 'Data Scientist',
    color: '#a855f7',
    bg: '#c7f4e8',
    lines: [100, 75, 88, 60, 50],
    tags: ['Python', 'ML', 'SQL'],
  },
];

// ── Individual mini resume card ────────────────────────────────────────────────
interface CardProps {
  card: (typeof cards)[number];
  position: 'left' | 'center' | 'right';
}

const MiniResumeCard: React.FC<CardProps> = ({ card, position }) => {
  const isCenter = position === 'center';

  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transformOrigin: 'center bottom',
    ...(position === 'left' && {
      left: '-18%',
      top: '8%',
      transform: 'scale(0.72) rotateY(14deg) rotateZ(-3deg)',
      zIndex: 1,
      opacity: 0.65,
      filter: 'brightness(0.9)',
    }),
    ...(position === 'center' && {
      left: '50%',
      top: '0%',
      transform: 'translateX(-50%) scale(1) rotateY(0deg) rotateZ(0deg)',
      zIndex: 10,
      opacity: 1,
      filter: 'brightness(1)',
    }),
    ...(position === 'right' && {
      right: '-18%',
      top: '8%',
      transform: 'scale(0.72) rotateY(-14deg) rotateZ(3deg)',
      zIndex: 1,
      opacity: 0.65,
      filter: 'brightness(0.9)',
    }),
  };

  return (
    <div style={positionStyles}>
      {/* Card shell */}
      <div
        style={{
          width: isCenter ? 190 : 160,
          backgroundColor: '#f0fdf8',
          borderRadius: 20,
          boxShadow: isCenter
            ? '0 24px 60px rgba(99,102,241,0.22), 0 4px 16px rgba(0,0,0,0.10)'
            : '0 8px 24px rgba(0,0,0,0.12)',
          border: '1.5px solid rgba(255,255,255,0.9)',
          overflow: 'hidden',
          padding: '0 0 16px 0',
        }}
      >
        {/* Avatar area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 10,
            background: 'linear-gradient(180deg, #e8fdf5 0%, #f0fdf8 100%)',
          }}
        >
          <div
            style={{
              width: isCenter ? 54 : 44,
              height: isCenter ? 54 : 44,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${card.color}55, ${card.color}cc)`,
              border: `3px solid ${card.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isCenter ? 18 : 14,
              fontWeight: 800,
              color: '#fff',
              boxShadow: `0 4px 14px ${card.color}50`,
              letterSpacing: 1,
            }}
          >
            {card.initials}
          </div>
          <span
            style={{
              marginTop: 8,
              fontSize: isCenter ? 12 : 10,
              fontWeight: 700,
              color: '#1e293b',
            }}
          >
            {card.name}
          </span>
          <span
            style={{
              fontSize: isCenter ? 9 : 8,
              color: '#6366f1',
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            {card.role}
          </span>
        </div>

        {/* Content lines */}
        <div style={{ padding: '10px 16px 4px' }}>
          {card.lines.map((w, i) => (
            <div
              key={i}
              style={{
                height: 5,
                borderRadius: 99,
                marginBottom: 5,
                background:
                  i % 3 === 1
                    ? `linear-gradient(90deg, ${card.color}80, ${card.color}30)`
                    : '#d4d8f0',
                width: `${w}%`,
                opacity: 0.75 + i * 0.04,
              }}
            />
          ))}
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            padding: '6px 12px 0',
          }}
        >
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: `${card.color}22`,
                color: card.color,
                borderRadius: 99,
                fontSize: 7,
                fontWeight: 700,
                padding: '2px 7px',
                letterSpacing: 0.3,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Carousel ──────────────────────────────────────────────────────────────
export const ResumeCardCarousel: React.FC = () => {
  const [centerIdx, setCenterIdx] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRotation = () => {
    intervalRef.current = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % cards.length);
    }, 2800);
  };

  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Derive left / right indices from centerIdx
  const leftIdx = (centerIdx - 1 + cards.length) % cards.length;
  const rightIdx = (centerIdx + 1) % cards.length;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 300,
        perspective: 900,
      }}
      onMouseEnter={() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }}
      onMouseLeave={startRotation}
    >
      <MiniResumeCard card={cards[leftIdx]} position="left" />
      <MiniResumeCard card={cards[centerIdx]} position="center" />
      <MiniResumeCard card={cards[rightIdx]} position="right" />

      {/* Dots indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
        }}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to card ${i + 1}`}
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setCenterIdx(i);
              startRotation();
            }}
            style={{
              width: i === centerIdx ? 20 : 7,
              height: 7,
              borderRadius: 99,
              border: 'none',
              cursor: 'pointer',
              background:
                i === centerIdx
                  ? 'linear-gradient(90deg, #6366f1, #a855f7)'
                  : '#c7d2fe',
              transition: 'all 0.4s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};
