"use client";

import React from "react";

// ─── ACCENT COLOR HELPER ───────────────────────────────────────────────
// Uses your accent color system. Replace with your CSS variable or theme value.
const accent = (opacity: number) => `rgba(254, 77, 1, ${opacity})`;
const accentSolid = "rgb(254, 77, 1)";

// ═══════════════════════════════════════════════════════════════════════
// 1. FLOATING CROSSHAIR — a subtle targeting reticle
// ═══════════════════════════════════════════════════════════════════════
export function CrosshairMark({
    className = "",
    size = 28,
    opacity = 0.18,
}: {
    className?: string;
    size?: number;
    opacity?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 28 28"
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            {/* Horizontal line */}
            <line x1="0" y1="14" x2="28" y2="14" stroke={accent(opacity)} strokeWidth="1" />
            {/* Vertical line */}
            <line x1="14" y1="0" x2="14" y2="28" stroke={accent(opacity)} strokeWidth="1" />
            {/* Center dot */}
            <circle cx="14" cy="14" r="2" fill={accent(opacity + 0.1)} />
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 2. ORBITAL RINGS — concentric circles like those in Image 1
// ═══════════════════════════════════════════════════════════════════════
export function OrbitalRings({
    className = "",
    size = 80,
    opacity = 0.12,
}: {
    className?: string;
    size?: number;
    opacity?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <circle cx="40" cy="40" r="36" stroke={accent(opacity)} strokeWidth="1" />
            <circle cx="40" cy="40" r="24" stroke={accent(opacity + 0.06)} strokeWidth="1" />
            <circle cx="40" cy="40" r="12" stroke={accent(opacity + 0.12)} strokeWidth="1" />
            <circle cx="40" cy="40" r="2.5" fill={accent(opacity + 0.2)} />
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 3. PLUS SCATTER — small plus signs like in Image 1's decorative "+"
// ═══════════════════════════════════════════════════════════════════════
export function PlusSign({
    className = "",
    size = 14,
    opacity = 0.25,
    strokeWidth = 1.5,
}: {
    className?: string;
    size?: number;
    opacity?: number;
    strokeWidth?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <line x1="7" y1="1" x2="7" y2="13" stroke={accent(opacity)} strokeWidth={strokeWidth} />
            <line x1="1" y1="7" x2="13" y2="7" stroke={accent(opacity)} strokeWidth={strokeWidth} />
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 4. DOT GRID — a cluster of dots forming a grid pattern
// ═══════════════════════════════════════════════════════════════════════
export function DotGrid({
    className = "",
    cols = 5,
    rows = 5,
    gap = 10,
    dotSize = 2,
    opacity = 0.15,
}: {
    className?: string;
    cols?: number;
    rows?: number;
    gap?: number;
    dotSize?: number;
    opacity?: number;
}) {
    const w = (cols - 1) * gap + dotSize * 2;
    const h = (rows - 1) * gap + dotSize * 2;

    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => (
                    <circle
                        key={`${r}-${c}`}
                        cx={dotSize + c * gap}
                        cy={dotSize + r * gap}
                        r={dotSize}
                        fill={accent(opacity)}
                    />
                ))
            )}
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 5. DIAMOND SHAPE — rotated square, hollow
// ═══════════════════════════════════════════════════════════════════════
export function DiamondShape({
    className = "",
    size = 24,
    opacity = 0.18,
}: {
    className?: string;
    size?: number;
    opacity?: number;
}) {
    const half = size / 2;
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <rect
                x={half}
                y="1"
                width={half - 1}
                height={half - 1}
                transform={`rotate(45 ${half} ${half})`}
                stroke={accent(opacity)}
                strokeWidth="1"
                fill="none"
            />
        </svg>
    );
}

export function GlowingArc({
  className = "",
  width = 600,
  height = 300,
  opacity = 0.08,
  animated = false,
  duration = 8,
  delay = 0,
  maxOpacity = 0.12,
}: {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
  animated?: boolean;
  duration?: number;
  delay?: number;
  maxOpacity?: number;
}) {
  const gradId = `arcGrad-${width}-${delay}`;
  const id = `garc-${width}-${delay}`;
 
  if (!animated) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentSolid} stopOpacity="0" />
            <stop offset="50%" stopColor={accentSolid} stopOpacity={String(opacity)} />
            <stop offset="100%" stopColor={accentSolid} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M 0 ${height} Q ${width / 2} ${-height * 0.3} ${width} ${height}`}
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    );
  }
 
  return (
    <>
      <style>{`
        @keyframes ${id}-trace {
          0% { stroke-dashoffset: 1200; opacity: 0; }
          10% { opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ${id}-glow {
          0%, 100% { opacity: 0; }
          30%, 70% { opacity: 0.6; }
        }
      `}</style>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentSolid} stopOpacity="0" />
            <stop offset="50%" stopColor={accentSolid} stopOpacity={String(maxOpacity)} />
            <stop offset="100%" stopColor={accentSolid} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Faint glow layer underneath */}
        <path
          d={`M 0 ${height} Q ${width / 2} ${-height * 0.3} ${width} ${height}`}
          stroke={accent(maxOpacity * 0.3)}
          strokeWidth="6"
          fill="none"
          style={{
            animation: `${id}-glow ${duration}s ease-in-out ${delay + 1}s infinite`,
            opacity: 0,
          }}
        />
        {/* Main traced arc */}
        <path
          d={`M 0 ${height} Q ${width / 2} ${-height * 0.3} ${width} ${height}`}
          stroke={`url(#${gradId})`}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="1200"
          style={{
            animation: `${id}-trace ${duration}s ease-in-out ${delay}s infinite`,
            opacity: 0,
          }}
        />
      </svg>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 7. DASHED CIRCLE — outlined circle with dashed stroke
// ═══════════════════════════════════════════════════════════════════════
export function DashedCircle({
    className = "",
    size = 50,
    opacity = 0.14,
}: {
    className?: string;
    size?: number;
    opacity?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - 2}
                stroke={accent(opacity)}
                strokeWidth="1"
                strokeDasharray="4 4"
            />
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 8. CORNER BRACKETS — your existing design, componentized
// ═══════════════════════════════════════════════════════════════════════
export function CornerBracket({
    className = "",
    position = "top-left",
    armLength = 28,
    opacity = 0.22,
}: {
    className?: string;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    armLength?: number;
    opacity?: number;
}) {
    const isBottom = position.includes("bottom");
    const isRight = position.includes("right");

    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute flex flex-col ${isRight ? "items-end" : ""} ${className}`}
        >
            {!isBottom && (
                <>
                    <span className="block h-px" style={{ width: armLength, background: accent(opacity) }} />
                    <span className="block w-px" style={{ height: armLength, background: accent(opacity) }} />
                </>
            )}
            {isBottom && (
                <>
                    <span className="block w-px" style={{ height: armLength, background: accent(opacity) }} />
                    <span className="block h-px" style={{ width: armLength, background: accent(opacity) }} />
                </>
            )}
        </div>
    );
}


// ═══════════════════════════════════════════════════════════════════════
// 10. PARALLAX FLOATING DOTS — scattered single dots
// ═══════════════════════════════════════════════════════════════════════
export function FloatingDot({
    className = "",
    size = 4,
    opacity = 0.3,
    filled = true,
}: {
    className?: string;
    size?: number;
    opacity?: number;
    filled?: boolean;
}) {
    return (
        <span
            aria-hidden
            className={`pointer-events-none block rounded-full ${className}`}
            style={{
                width: size,
                height: size,
                background: filled ? accent(opacity) : "transparent",
                border: filled ? "none" : `1px solid ${accent(opacity)}`,
            }}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 11. GLITCH LINES — horizontal scan lines
//     ANIMATED: lines flicker, shift horizontally, and fade in/out
// ═══════════════════════════════════════════════════════════════════════
export function GlitchLines({
  className = "",
  count = 3,
  opacity = 0.1,
  animated = false,
  duration = 6,
  delay = 0,
  maxOpacity = 0.2,
}: {
  className?: string;
  count?: number;
  opacity?: number;
  animated?: boolean;
  duration?: number;
  delay?: number;
  maxOpacity?: number;
}) {
  const id = `glitch-${delay}`;
  const widths = [35, 22, 42, 28, 38];
 
  if (!animated) {
    return (
      <div aria-hidden className={`pointer-events-none flex flex-col gap-[3px] ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="block h-px"
            style={{
              width: widths[i % widths.length],
              background: accent(opacity + i * 0.04),
            }}
          />
        ))}
      </div>
    );
  }
 
  return (
    <>
      <style>{`
        @keyframes ${id}-fade {
          0%, 100% { opacity: 0; }
          12%, 88% { opacity: 1; }
        }
        @keyframes ${id}-line {
          0%, 100% { transform: translateX(0) scaleX(0.3); opacity: 0; }
          8% { transform: translateX(0) scaleX(1); opacity: ${maxOpacity}; }
          15% { transform: translateX(6px) scaleX(0.7); opacity: ${maxOpacity * 0.6}; }
          20% { transform: translateX(-3px) scaleX(1.2); opacity: ${maxOpacity}; }
          25%, 70% { transform: translateX(0) scaleX(1); opacity: ${maxOpacity}; }
          75% { transform: translateX(8px) scaleX(0.5); opacity: ${maxOpacity * 0.4}; }
          80% { transform: translateX(-2px) scaleX(1.1); opacity: ${maxOpacity}; }
          90% { transform: translateX(0) scaleX(0.3); opacity: 0; }
        }
      `}</style>
      <div
        aria-hidden
        className={`pointer-events-none flex flex-col gap-[3px] ${className}`}
        style={{
          animation: `${id}-fade ${duration}s ease-in-out ${delay}s infinite`,
          opacity: 0,
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="block h-px"
            style={{
              width: widths[i % widths.length],
              background: accent(maxOpacity + i * 0.04),
              animation: `${id}-line ${duration * 0.6 + i * 0.3}s ease-in-out ${delay + i * 0.2}s infinite`,
              transformOrigin: "left",
              opacity: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 13. RADIAL BURST — thin radiating lines from a center point
//     ANIMATED: rays shoot outward, whole shape slowly rotates and fades
// ═══════════════════════════════════════════════════════════════════════
export function RadialBurst({
  className = "",
  size = 60,
  rays = 8,
  opacity = 0.12,
  animated = false,
  duration = 8,
  delay = 0,
  maxOpacity = 0.16,
}: {
  className?: string;
  size?: number;
  rays?: number;
  opacity?: number;
  animated?: boolean;
  duration?: number;
  delay?: number;
  maxOpacity?: number;
}) {
  const half = size / 2;
  const innerR = 6;
  const outerR = half - 2;
  const id = `rburst-${size}-${delay}`;
 
  if (!animated) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        {Array.from({ length: rays }).map((_, i) => {
          const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={half + Math.cos(angle) * innerR}
              y1={half + Math.sin(angle) * innerR}
              x2={half + Math.cos(angle) * outerR}
              y2={half + Math.sin(angle) * outerR}
              stroke={accent(opacity)}
              strokeWidth="1"
            />
          );
        })}
        <circle cx={half} cy={half} r="2" fill={accent(opacity + 0.15)} />
      </svg>
    );
  }
 
  return (
    <>
      <style>{`
        @keyframes ${id}-fade {
          0%, 100% { opacity: 0; }
          15%, 85% { opacity: 1; }
        }
        @keyframes ${id}-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(${360 / rays}deg); }
        }
        @keyframes ${id}-ray {
          0%, 100% { stroke-dashoffset: ${outerR}; opacity: 0; }
          15% { opacity: ${maxOpacity}; }
          50% { stroke-dashoffset: 0; opacity: ${maxOpacity}; }
          85% { opacity: ${maxOpacity * 0.5}; }
        }
        @keyframes ${id}-dot {
          0%, 100% { r: 1; opacity: 0; }
          20%, 80% { r: 2.5; opacity: ${maxOpacity + 0.2}; }
        }
      `}</style>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
        style={{
          animation: `${id}-fade ${duration}s ease-in-out ${delay}s infinite, ${id}-rotate ${duration * 2}s linear ${delay}s infinite`,
          opacity: 0,
          transformOrigin: "center",
        }}
      >
        {Array.from({ length: rays }).map((_, i) => {
          const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={half + Math.cos(angle) * innerR}
              y1={half + Math.sin(angle) * innerR}
              x2={half + Math.cos(angle) * outerR}
              y2={half + Math.sin(angle) * outerR}
              stroke={accent(maxOpacity)}
              strokeWidth="1"
              strokeDasharray={outerR}
              style={{
                animation: `${id}-ray ${duration}s ease-in-out ${delay + i * 0.15}s infinite`,
                opacity: 0,
              }}
            />
          );
        })}
        <circle
          cx={half}
          cy={half}
          r="1"
          fill={accent(maxOpacity + 0.2)}
          style={{
            animation: `${id}-dot ${duration}s ease-in-out ${delay}s infinite`,
            opacity: 0,
          }}
        />
      </svg>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 14. PILL / ROUNDED RECTANGLE — like Image 1's rounded rect shapes
// ═══════════════════════════════════════════════════════════════════════
export function PillShape({
    className = "",
    width = 60,
    height = 28,
    opacity = 0.14,
}: {
    className?: string;
    width?: number;
    height?: number;
    opacity?: number;
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <rect
                x="1"
                y="1"
                width={width - 2}
                height={height - 2}
                rx={height / 2}
                stroke={accent(opacity)}
                strokeWidth="1"
                fill="none"
            />
        </svg>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 15. ANIMATED PULSE RING — a slowly pulsing ring (CSS animation)
// ═══════════════════════════════════════════════════════════════════════
export function PulseRing({
    className = "",
    size = 40,
    opacity = 0.15,
    color,
}: {
    className?: string;
    size?: number;
    opacity?: number;
    color?: string;
}) {
    const borderColor = color ?? accent(opacity);
    return (
        <>
            <style>{`
        @keyframes decorPulse {
          0%, 100% { transform: scale(1); opacity: ${opacity}; }
          50% { transform: scale(1.15); opacity: ${opacity * 0.5}; }
        }
      `}</style>
            <span
                aria-hidden
                className={`pointer-events-none block rounded-full ${className}`}
                style={{
                    width: size,
                    height: size,
                    border: `1px solid ${borderColor}`,
                    animation: "decorPulse 4s ease-in-out infinite",
                }}
            />
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// 17. SINE WAVE — a smooth oscillating line
// ═══════════════════════════════════════════════════════════════════════
export function SineWave({
    className = "",
    width = 140,
    height = 30,
    opacity = 0.14,
}: {
    className?: string;
    width?: number;
    height?: number;
    opacity?: number;
}) {
    const mid = height / 2;
    const amp = mid - 2;
    let d = `M 0 ${mid}`;
    for (let x = 0; x <= 140; x += 2) {
        const y = mid + Math.sin((x / 140) * Math.PI * 4) * amp;
        d += ` L ${x} ${y}`;
    }
    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 140 ${height}`}
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <path d={d} stroke={accent(opacity)} strokeWidth="1" fill="none" />
        </svg>
    );
}

export function CircuitTrace({
  className = "",
  width = 100,
  height = 60,
  opacity = 0.16,
  animated = false,
  duration = 7,
  delay = 0,
  maxOpacity = 0.2,
}: {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
  animated?: boolean;
  duration?: number;
  delay?: number;
  maxOpacity?: number;
}) {
  const id = `circuit-${delay}`;
 
  if (!animated) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 60"
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        <path
          d="M5 30 H20 V10 H45 V30 H60 V50 H80 V30 H95"
          stroke={accent(opacity)}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="10" r="2.5" fill={accent(opacity + 0.12)} />
        <circle cx="45" cy="30" r="2.5" fill={accent(opacity + 0.12)} />
        <circle cx="60" cy="50" r="2.5" fill={accent(opacity + 0.12)} />
        <circle cx="80" cy="30" r="2.5" fill={accent(opacity + 0.12)} />
        <rect x="2" y="28" width="6" height="4" rx="1" fill={accent(opacity + 0.06)} />
        <rect x="92" y="28" width="6" height="4" rx="1" fill={accent(opacity + 0.06)} />
      </svg>
    );
  }
 
  return (
    <>
      <style>{`
        @keyframes ${id}-trace {
          0% { stroke-dashoffset: 300; opacity: 0; }
          8% { opacity: ${maxOpacity}; }
          60% { stroke-dashoffset: 0; opacity: ${maxOpacity}; }
          85% { stroke-dashoffset: 0; opacity: ${maxOpacity * 0.4}; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes ${id}-node {
          0%, 100% { r: 0; opacity: 0; }
          20% { r: 3.5; opacity: ${maxOpacity + 0.2}; }
          40%, 75% { r: 2.5; opacity: ${maxOpacity + 0.15}; }
          90% { r: 1; opacity: 0; }
        }
        @keyframes ${id}-terminal {
          0%, 100% { opacity: 0; transform: scaleX(0.3); }
          20%, 80% { opacity: ${maxOpacity + 0.1}; transform: scaleX(1); }
        }
      `}</style>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 60"
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        {/* Background static path */}
        <path
          d="M5 30 H20 V10 H45 V30 H60 V50 H80 V30 H95"
          stroke={accent(maxOpacity * 0.3)}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Animated traced path */}
        <path
          d="M5 30 H20 V10 H45 V30 H60 V50 H80 V30 H95"
          stroke={accent(maxOpacity)}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="300"
          style={{
            animation: `${id}-trace ${duration}s ease-in-out ${delay}s infinite`,
            opacity: 0,
          }}
        />
        {/* Nodes light up sequentially */}
        <circle cx="20" cy="10" r="0" fill={accent(maxOpacity + 0.2)}
          style={{ animation: `${id}-node ${duration}s ease-in-out ${delay + duration * 0.12}s infinite`, opacity: 0 }} />
        <circle cx="45" cy="30" r="0" fill={accent(maxOpacity + 0.2)}
          style={{ animation: `${id}-node ${duration}s ease-in-out ${delay + duration * 0.22}s infinite`, opacity: 0 }} />
        <circle cx="60" cy="50" r="0" fill={accent(maxOpacity + 0.2)}
          style={{ animation: `${id}-node ${duration}s ease-in-out ${delay + duration * 0.32}s infinite`, opacity: 0 }} />
        <circle cx="80" cy="30" r="0" fill={accent(maxOpacity + 0.2)}
          style={{ animation: `${id}-node ${duration}s ease-in-out ${delay + duration * 0.42}s infinite`, opacity: 0 }} />
        {/* Terminal blocks */}
        <rect x="2" y="28" width="6" height="4" rx="1" fill={accent(maxOpacity + 0.06)}
          style={{ animation: `${id}-terminal ${duration}s ease-in-out ${delay}s infinite`, transformOrigin: "5px 30px", opacity: 0 }} />
        <rect x="92" y="28" width="6" height="4" rx="1" fill={accent(maxOpacity + 0.06)}
          style={{ animation: `${id}-terminal ${duration}s ease-in-out ${delay + duration * 0.5}s infinite`, transformOrigin: "95px 30px", opacity: 0 }} />
      </svg>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 19. HASH MARK — a stylized # symbol
// ═══════════════════════════════════════════════════════════════════════
export function HashMark({
    className = "",
    size = 24,
    opacity = 0.18,
}: {
    className?: string;
    size?: number;
    opacity?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={`pointer-events-none select-none ${className}`}
            aria-hidden
        >
            <line x1="8" y1="2" x2="6" y2="22" stroke={accent(opacity)} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="18" y1="2" x2="16" y2="22" stroke={accent(opacity)} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="2" y1="8" x2="22" y2="8" stroke={accent(opacity)} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="2" y1="16" x2="22" y2="16" stroke={accent(opacity)} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
}


// 31. MORSE DOTS — dot-dash pattern like morse code
//     ANIMATED: elements appear sequentially like a transmission, then fade
export function MorseLine({
  className = "",
  width = 100,
  opacity = 0.16,
  animated = false,
  duration = 6,
  delay = 0,
  maxOpacity = 0.22,
}: {
  className?: string;
  width?: number;
  opacity?: number;
  animated?: boolean;
  duration?: number;
  delay?: number;
  maxOpacity?: number;
}) {
  const id = `morse-${delay}`;
  // Scale all positions proportionally to the requested width
  const s = width / 100;
  const dashLen = 13 * s; // each dash spans 13 units in base-100 space

  // Base pattern in 0–100 space, scaled to actual width
  // Tighter 5-unit gaps so more elements fit across any width
  const elements = [
    { type: "dot",  cx: 2 * s },
    { type: "dash", x1: 7 * s,  x2: 20 * s },
    { type: "dot",  cx: 25 * s },
    { type: "dot",  cx: 30 * s },
    { type: "dash", x1: 35 * s, x2: 48 * s },
    { type: "dash", x1: 53 * s, x2: 66 * s },
    { type: "dot",  cx: 71 * s },
    { type: "dot",  cx: 76 * s },
    { type: "dash", x1: 81 * s, x2: 94 * s },
    { type: "dot",  cx: 99 * s },
  ];

  if (!animated) {
    return (
      <svg
        width={width}
        height="6"
        viewBox={`0 0 ${width} 6`}
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        {elements.map((el, i) =>
          el.type === "dot" ? (
            <circle key={i} cx={el.cx} cy="3" r="2" fill={accent(opacity)} />
          ) : (
            <line key={i} x1={el.x1} y1="3" x2={el.x2} y2="3" stroke={accent(opacity)} strokeWidth="2" strokeLinecap="round" />
          )
        )}
      </svg>
    );
  }

  const stagger = duration * 0.06;

  return (
    <>
      <style>{`
        @keyframes ${id}-dot {
          0%, 100% { r: 0; opacity: 0; }
          12% { r: 2.5; opacity: ${maxOpacity + 0.1}; }
          18% { r: 2; opacity: ${maxOpacity}; }
          75% { r: 2; opacity: ${maxOpacity}; }
          90% { r: 0; opacity: 0; }
        }
        @keyframes ${id}-dash {
          0%, 100% { stroke-dashoffset: ${dashLen}; opacity: 0; }
          12% { stroke-dashoffset: 0; opacity: ${maxOpacity}; }
          75% { stroke-dashoffset: 0; opacity: ${maxOpacity}; }
          90% { stroke-dashoffset: ${dashLen}; opacity: 0; }
        }
      `}</style>
      <svg
        width={width}
        height="6"
        viewBox={`0 0 ${width} 6`}
        fill="none"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden
      >
        {elements.map((el, i) =>
          el.type === "dot" ? (
            <circle
              key={i}
              cx={el.cx}
              cy="3"
              r="0"
              fill={accent(maxOpacity)}
              style={{
                animation: `${id}-dot ${duration}s ease-in-out ${delay + i * stagger}s infinite`,
                opacity: 0,
              }}
            />
          ) : (
            <line
              key={i}
              x1={el.x1}
              y1="3"
              x2={el.x2}
              y2="3"
              stroke={accent(maxOpacity)}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={dashLen}
              style={{
                animation: `${id}-dash ${duration}s ease-in-out ${delay + i * stagger}s infinite`,
                opacity: 0,
              }}
            />
          )
        )}
      </svg>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 21. BINARY COLUMN — vertical stream of 0s and 1s
// ═══════════════════════════════════════════════════════════════════════
export function BinaryColumn({
    className = "",
    rows = 8,
    opacity = 0.1,
}: {
    className?: string;
    rows?: number;
    opacity?: number;
}) {
    const chars = "10110010".split("");
    return (
        <div
            aria-hidden
            className={`pointer-events-none select-none flex flex-col items-center leading-none ${className}`}
            style={{ fontFamily: "monospace", fontSize: 11, gap: 2 }}
        >
            {chars.slice(0, rows).map((c, i) => (
                <span key={i} style={{ color: accent(opacity + (c === "1" ? 0.12 : 0)) }}>{c}</span>
            ))}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// DEMO: Full page background composition showing how to use them
// ═══════════════════════════════════════════════════════════════════════
export function DecorativeBackground() {
    return (
        <div>
            {/* className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden */}
            {/* Noise grain */}
            {/* <NoiseOverlay opacity={0.03} /> */}

            {/* Top area decorations */}
            <div className="absolute top-[10%] left-[5%]">
                {/* <CrosshairMark size={32} opacity={0.15} /> */}
                {/* <CrosshairMark size={32} opacity={1} /> */}
            </div>
            <div className="absolute top-[8%] right-[12%]">
                {/* <PlusSign size={16} opacity={0.3} /> */}
                <PlusSign size={16} opacity={1} />
            </div>
            <div className="absolute top-[15%] right-[8%]">
                {/* <OrbitalRings size={70} opacity={0.08} /> */}
                {/* <OrbitalRings size={70} opacity={1} /> */}
            </div>

            {/* Mid area */}
            <div className="absolute top-[35%] left-[3%]">
                {/* <DotGrid cols={4} rows={4} gap={8} dotSize={1.5} opacity={0.12} /> */}
                <DotGrid cols={4} rows={4} gap={8} dotSize={1.5} opacity={1} />
            </div>
            <div className="absolute top-[40%] right-[5%]">
                {/* <DashedCircle size={50} opacity={0.1} /> */}
                {/* <DashedCircle size={50} opacity={1} /> */}
            </div>
            <div className="absolute top-[50%] left-[8%]">
                {/* <PillShape width={55} height={24} opacity={0.12} /> */}
                <PillShape width={55} height={24} opacity={1} />
            </div>
            <div className="absolute top-[55%] right-[15%]">
                {/* <RadialBurst size={50} rays={6} opacity={0.1} /> */}
                <RadialBurst animated={true} size={60} duration={8} delay={2} maxOpacity={1} />
            </div>

            {/* Bottom area */}
            <div className="absolute bottom-[25%] right-[6%]">
                {/* <GlitchLines count={4} opacity={0.12} /> */}
                <GlitchLines animated={true} count={4} opacity={1} maxOpacity={1} />
            </div>
            <div className="absolute bottom-[15%] left-[50%]">
                {/* <PulseRing size={35} opacity={0.12} /> */}
                <PulseRing size={35} opacity={1} />
            </div>
            <div className="absolute bottom-[10%] right-[20%]">
                {/* <FloatingDot size={5} opacity={0.3} /> */}
                <FloatingDot size={10} opacity={1} />
            </div>
            <div className="absolute bottom-[12%] right-[22%]">
                {/* <FloatingDot size={3} opacity={0.2} filled={false} /> */}
                <FloatingDot size={10} opacity={1} filled={false} />
            </div>

            {/* Large arc spanning width */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2">
                {/* <GlowingArc width={800} height={200} opacity={0.06} /> */}
                <GlowingArc animated={true} width={800} height={200} opacity={1} maxOpacity={1} />
            </div>

            {/* Extended elements */}
            <div className="absolute top-[20%] right-[4%]">
                {/* <CircuitTrace width={100} height={60} opacity={0.16} /> */}
                <CircuitTrace animated={true} width={100} height={60} opacity={1} maxOpacity={1} />
            </div>
            <div className="absolute top-[65%] left-[35%]">
                {/* <HashMark size={24} opacity={0.18} /> */}
                {/* <HashMark size={24} opacity={1} /> */}
            </div>
            <div className="absolute bottom-[22%] left-[5%]">
                {/* <MorseLine width={100} opacity={0.16} /> */}
                <MorseLine animated={true} width={100} opacity={1} maxOpacity={1} />
            </div>
            <div className="absolute bottom-[8%] right-[25%]">
                {/* <BinaryColumn rows={8} opacity={0.1} /> */}
                {/* <BinaryColumn rows={8} opacity={1} /> */}
            </div>

            <div className="absolute top-[12%] left-[40%]">
                {/* <SineWave width={140} height={30} opacity={0.14} /> */}
                {/* <SineWave width={140} height={30} opacity={1} /> */}
            </div>
        </div>
    );
}

