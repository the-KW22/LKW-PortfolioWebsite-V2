"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── ACCENT COLOR HELPER ───────────────────────────────────────────────
const accent = (opacity: number) => `rgba(254, 77, 1, ${opacity})`;
// ═══════════════════════════════════════════════════════════════════════
// A5. CASCADING PLUS SIGNS — plus signs that appear one by one,
//     then fade away together
// ═══════════════════════════════════════════════════════════════════════
export function CascadingPlus({
    className = "",
    count = 5,
    duration = 6,
    delay = 0,
    opacity = 0.22,
}: {
    className?: string;
    count?: number;
    duration?: number;
    delay?: number;
    opacity?: number;
}) {
    const positions = [
        { x: 0, y: 0 },
        { x: 20, y: 14 },
        { x: 6, y: 30 },
        { x: 28, y: 38 },
        { x: 12, y: 52 },
    ];
    return (
        <>
            <style>{`
        @keyframes cascadeIn {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          20%, 75% { opacity: var(--max-o); transform: scale(1); }
        }
      `}</style>
            <div
                aria-hidden
                className={`pointer-events-none relative ${className}`}
                style={{ width: 42, height: 66 }}
            >
                {positions.slice(0, count).map((p, i) => (
                    <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="absolute"
                        style={{
                            left: p.x,
                            top: p.y,
                            ["--max-o" as string]: opacity,
                            animation: `cascadeIn ${duration}s ease-in-out ${delay + i * 0.4}s infinite`,
                            opacity: 0,
                        }}
                    >
                        <line x1="7" y1="2" x2="7" y2="12" stroke={accent(opacity)} strokeWidth="1.2" />
                        <line x1="2" y1="7" x2="12" y2="7" stroke={accent(opacity)} strokeWidth="1.2" />
                    </svg>
                ))}
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// A8. RIPPLE — concentric rings expanding outward and fading
// ═══════════════════════════════════════════════════════════════════════
export function Ripple({
    className = "",
    size = 80,
    rings = 3,
    duration = 5,
    delay = 0,
    opacity = 0.15,
}: {
    className?: string;
    size?: number;
    rings?: number;
    duration?: number;
    delay?: number;
    opacity?: number;
}) {
    return (
        <>
            <style>{`
        @keyframes rippleExpand {
          0% { transform: scale(0.2); opacity: ${opacity}; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
            <div
                aria-hidden
                className={`pointer-events-none relative ${className}`}
                style={{ width: size, height: size }}
            >
                {Array.from({ length: rings }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute inset-0 rounded-full"
                        style={{
                            border: `1px solid ${accent(opacity)}`,
                            animation: `rippleExpand ${duration}s ease-out ${delay + (i * duration) / rings}s infinite`,
                            opacity: 0,
                        }}
                    />
                ))}
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// A9. CONSTELLATION PULSE — connected dots where connections
//     light up sequentially then fade away
// ═══════════════════════════════════════════════════════════════════════
export function ConstellationPulse({
    className = "",
    size = 120,
    duration = 8,
    delay = 0,
    opacity = 0.18,
}: {
    className?: string;
    size?: number;
    duration?: number;
    delay?: number;
    opacity?: number;
}) {
    const stars = [
        { x: 20, y: 30 }, { x: 55, y: 10 }, { x: 90, y: 35 },
        { x: 75, y: 70 }, { x: 35, y: 80 }, { x: 100, y: 95 },
    ];
    const connections = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 5]];

    return (
        <>
            <style>{`
        @keyframes lineTrace {
          0%, 100% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: ${opacity}; }
          50% { stroke-dashoffset: 0; opacity: ${opacity}; }
          85% { opacity: ${opacity * 0.5}; }
        }
        @keyframes starGlow {
          0%, 100% { opacity: 0; r: 1; }
          20%, 80% { opacity: ${opacity + 0.15}; r: 2.5; }
        }
      `}</style>
            <svg
                width={size}
                height={size}
                viewBox="0 0 120 110"
                fill="none"
                className={`pointer-events-none select-none ${className}`}
                aria-hidden
            >
                {connections.map(([a, b], i) => (
                    <line
                        key={`l${i}`}
                        x1={stars[a].x} y1={stars[a].y}
                        x2={stars[b].x} y2={stars[b].y}
                        stroke={accent(opacity)}
                        strokeWidth="0.6"
                        strokeDasharray="200"
                        style={{
                            animation: `lineTrace ${duration}s ease-in-out ${delay + i * 0.5}s infinite`,
                            opacity: 0,
                        }}
                    />
                ))}
                {stars.map((s, i) => (
                    <circle
                        key={`s${i}`}
                        cx={s.x}
                        cy={s.y}
                        r="1"
                        fill={accent(opacity + 0.15)}
                        style={{
                            animation: `starGlow ${duration}s ease-in-out ${delay + i * 0.3}s infinite`,
                            opacity: 0,
                        }}
                    />
                ))}
            </svg>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// A10. FLOATING PARTICLES — particles drifting upward and fading
// ═══════════════════════════════════════════════════════════════════════
export function FloatingParticles({
    className = "",
    width = 120,
    height = 160,
    count = 12,
    duration = 10,
    delay = 0,
    opacity = 0.2,
}: {
    className?: string;
    width?: number;
    height?: number;
    count?: number;
    duration?: number;
    delay?: number;
    opacity?: number;
}) {
    const particles = Array.from({ length: count }).map((_, i) => ({
        x: (i * 37 + 11) % 100,
        size: 1.5 + ((i * 17 + 7) % 25) / 10,
        speed: 0.6 + ((i * 13 + 3) % 6) / 10,
        drift: ((i * 11 + 5) % 30) - 15,
        pDelay: ((i * 7 + 2) % (duration * 10)) / 10,
    }));

    return (
        <>
            <style>{`
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: var(--p-max-o); }
          75% { opacity: var(--p-max-o); }
          100% { transform: translateY(var(--p-travel)) translateX(var(--p-drift)); opacity: 0; }
        }
      `}</style>
            <div
                aria-hidden
                className={`pointer-events-none relative overflow-hidden ${className}`}
                style={{ width, height }}
            >
                {particles.map((p, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: p.size,
                            height: p.size,
                            background: accent(opacity),
                            left: `${p.x}%`,
                            bottom: 0,
                            ["--p-travel" as string]: `${-height * p.speed}px`,
                            ["--p-drift" as string]: `${p.drift}px`,
                            ["--p-max-o" as string]: opacity,
                            animation: `particleFloat ${duration * p.speed}s ease-out ${delay + p.pDelay}s infinite`,
                            opacity: 0,
                        }}
                    />
                ))}
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// A12. CODE RAIN — falling characters like matrix rain but subtle
// ═══════════════════════════════════════════════════════════════════════
export function CodeRain({
    className = "",
    width = 80,
    height = 140,
    columns = 5,
    duration = 8,
    delay = 0,
    opacity = 0.12,
}: {
    className?: string;
    width?: number;
    height?: number;
    columns?: number;
    duration?: number;
    delay?: number;
    opacity?: number;
}) {
    const chars = "01{}[]<>/;:=+".split("");
    const colWidth = width / columns;

    return (
        <>
            <style>{`
        @keyframes codeRainDrop {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: var(--cr-o); }
          85% { opacity: var(--cr-o); }
          100% { transform: translateY(var(--cr-h)); opacity: 0; }
        }
      `}</style>
            <div
                aria-hidden
                className={`pointer-events-none relative overflow-hidden ${className}`}
                style={{ width, height, fontFamily: "monospace", fontSize: 10 }}
            >
                {Array.from({ length: columns }).map((_, col) => {
                    const charCount = 6 + (col % 4);
                    const colDelay = delay + ((col * 7 + 3) % Math.round(duration * 5)) / 10;
                    const speed = 0.7 + ((col * 13 + 5) % 5) / 10;
                    return (
                        <div
                            key={col}
                            className="absolute top-0 flex flex-col items-center"
                            style={{
                                left: col * colWidth + colWidth / 2 - 4,
                                ["--cr-h" as string]: `${height}px`,
                                ["--cr-o" as string]: opacity,
                                animation: `codeRainDrop ${duration * speed}s linear ${colDelay}s infinite`,
                                opacity: 0,
                            }}
                        >
                            {Array.from({ length: charCount }).map((_, i) => (
                                <span
                                    key={i}
                                    style={{
                                        color: accent(opacity + (i === 0 ? 0.15 : 0)),
                                        lineHeight: "14px",
                                    }}
                                >
                                    {chars[(col * 7 + i * 3) % chars.length]}
                                </span>
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// A14. ROTATING TRIANGLES — two triangles rotating in opposite
//      directions with fade in/out
// ═══════════════════════════════════════════════════════════════════════
export function RotatingTriangles({
    className = "",
    size = 50,
    duration = 12,
    delay = 0,
    opacity = 0.14,
}: {
    className?: string;
    size?: number;
    duration?: number;
    delay?: number;
    opacity?: number;
}) {
    const id = `rottri-${delay}`;
    const half = size / 2;
    return (
        <>
            <style>{`
        @keyframes ${id}-cw {
          0%, 100% { transform: rotate(0deg); opacity: 0; }
          15%, 85% { opacity: ${opacity}; }
          50% { transform: rotate(180deg); }
        }
        @keyframes ${id}-ccw {
          0%, 100% { transform: rotate(0deg); opacity: 0; }
          15%, 85% { opacity: ${opacity * 0.7}; }
          50% { transform: rotate(-180deg); }
        }
      `}</style>
            <div
                aria-hidden
                className={`pointer-events-none relative ${className}`}
                style={{ width: size, height: size }}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    fill="none"
                    className="absolute inset-0"
                    style={{
                        transformOrigin: "center",
                        animation: `${id}-cw ${duration}s ease-in-out ${delay}s infinite`,
                        opacity: 0,
                    }}
                >
                    <polygon
                        points={`${half},${half * 0.3} ${half + half * 0.6},${half + half * 0.4} ${half - half * 0.6},${half + half * 0.4}`}
                        stroke={accent(opacity + 0.06)}
                        strokeWidth="0.8"
                        fill="none"
                    />
                </svg>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    fill="none"
                    className="absolute inset-0"
                    style={{
                        transformOrigin: "center",
                        animation: `${id}-ccw ${duration}s ease-in-out ${delay}s infinite`,
                        opacity: 0,
                    }}
                >
                    <polygon
                        points={`${half},${half + half * 0.4} ${half + half * 0.5},${half - half * 0.3} ${half - half * 0.5},${half - half * 0.3}`}
                        stroke={accent(opacity)}
                        strokeWidth="0.8"
                        fill="none"
                    />
                </svg>
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// DEMO: Overview of all animation elements
// ═══════════════════════════════════════════════════════════════════════
export function DecorativeAnimationOverview() {
    return (
        <div>
            {/* className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden */}
            {/* Row 1 — top band */}
            <div className="absolute top-[5%] left-[60%]">
                <CascadingPlus count={5} opacity={1} />
            </div>

            {/* Row 2 — middle band */}
            <div className="absolute top-[38%] left-[5%]">
                <Ripple size={80} rings={3} opacity={1} />
            </div>
            <div className="absolute top-[38%] left-[18%]">
                <ConstellationPulse size={120} opacity={1} />
            </div>
            <div className="absolute top-[38%] left-[36%]">
                <FloatingParticles width={120} height={160} count={12} opacity={1} />
            </div>
            <div className="absolute top-[38%] left-[64%]">
                <CodeRain width={80} height={140} columns={5} opacity={1} />
            </div>

            {/* Row 3 — bottom band */}
            <div className="absolute top-[72%] left-[5%]">
                <RotatingTriangles size={50} opacity={1} />
            </div>
        </div>
    );
}