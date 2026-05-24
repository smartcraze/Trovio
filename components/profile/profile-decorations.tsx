/**
 * profile-decorations.tsx
 * Renders purely cosmetic, theme-specific background decorations.
 *
 * - anime-sakura  → floating SVG ✿ sakura petals (CSS keyframe drift)
 * - japan-minimal → subtle ink-stroke horizontal rule above avatar
 * - all others   → renders nothing (null)
 *
 * These are purely decorative and hidden from screen readers.
 */
"use client";

import React from "react";

interface ProfileDecorationsProps {
  themeId: string;
}

/** Sakura petal — a simple SVG path used as a floating element */
function SakuraPetal({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={style}
      aria-hidden="true"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-30"
      >
        <ellipse cx="9" cy="5" rx="4" ry="6" fill="#f9a8d4" transform="rotate(0 9 9)" />
        <ellipse cx="9" cy="5" rx="4" ry="6" fill="#f9a8d4" transform="rotate(72 9 9)" />
        <ellipse cx="9" cy="5" rx="4" ry="6" fill="#f472b6" transform="rotate(144 9 9)" />
        <ellipse cx="9" cy="5" rx="4" ry="6" fill="#f9a8d4" transform="rotate(216 9 9)" />
        <ellipse cx="9" cy="5" rx="4" ry="6" fill="#f472b6" transform="rotate(288 9 9)" />
        <circle cx="9" cy="9" r="2" fill="#fce7f3" />
      </svg>
    </div>
  );
}

/**
 * Sakura petals — 12 petals scattered at different positions,
 * animated with CSS custom-property-driven keyframes defined inline.
 * Each petal has a randomised delay and duration for natural scatter.
 */
function AnimeDecoration() {
  const petals = [
    { top: "8%",  left: "5%",  delay: "0s",    dur: "12s" },
    { top: "15%", left: "85%", delay: "1.5s",  dur: "10s" },
    { top: "30%", left: "92%", delay: "3s",    dur: "14s" },
    { top: "5%",  left: "50%", delay: "0.7s",  dur: "11s" },
    { top: "60%", left: "3%",  delay: "2s",    dur: "13s" },
    { top: "45%", left: "78%", delay: "4s",    dur: "9s"  },
    { top: "75%", left: "60%", delay: "1s",    dur: "15s" },
    { top: "20%", left: "30%", delay: "5s",    dur: "12s" },
    { top: "88%", left: "20%", delay: "2.5s",  dur: "11s" },
    { top: "55%", left: "45%", delay: "0.3s",  dur: "13s" },
    { top: "35%", left: "12%", delay: "3.5s",  dur: "10s" },
    { top: "70%", left: "90%", delay: "1.8s",  dur: "14s" },
  ];

  return (
    <>
      {/* Inline keyframes — avoids needing a global CSS file change */}
      <style>{`
        @keyframes sakura-drift {
          0%   { transform: translateY(0px)   rotate(0deg)   scale(1);   opacity: 0; }
          10%  { opacity: 0.35; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(80px)  rotate(180deg) scale(0.7); opacity: 0; }
        }
      `}</style>

      {petals.map((p, i) => (
        <SakuraPetal
          key={i}
          style={{
            top: p.top,
            left: p.left,
            animation: `sakura-drift ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </>
  );
}

/** Japan minimal: a delicate horizontal ink rule + kanji watermark */
function JapanDecoration() {
  return (
    <div
      className="absolute top-12 right-8 opacity-[0.04] pointer-events-none select-none"
      aria-hidden="true"
    >
      <span className="text-[120px] font-serif text-rose-200 leading-none tracking-tighter">
        桜
      </span>
    </div>
  );
}

export function ProfileDecorations({ themeId }: ProfileDecorationsProps) {
  if (themeId === "anime-sakura") return <AnimeDecoration />;
  if (themeId === "japan-minimal") return <JapanDecoration />;
  return null;
}

export default ProfileDecorations;
