"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IntroAnimationProps {
    onComplete?: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const nameRefs     = useRef<HTMLSpanElement[]>([]);
    const titleRef     = useRef<HTMLSpanElement>(null);
    const counterRef  = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ onComplete: () => onComplete?.() });

            // 1. Count up 0 - 100 (loading feel)
            tl.to(counterRef.current, {
                innerText: 100,
                duration: 1.2,
                ease: "power2.inOut",
                snap: {innerText: 1},
                onUpdate(){
                    if(counterRef.current){
                        counterRef.current.textContent = String(Math.round(Number(counterRef.current.textContent))).padStart(3, "0");
                    }
                },
            });

            // 2. Fade counter out
            tl.to(counterRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power1.out",
            });

            // 3. Staggered line reveal - each span slides up from below
            tl.to(nameRefs.current, {
                y: 0,
                duration: 1.0,
                ease: "power4.out",
                stagger: 0.06,
            },
                "-=0.1"
            );

            // 4. Title slides up right after name finished
            tl.to(titleRef.current, {
                y: 0,
                duration: 0.8,
                ease: "power4.out",
            },
                "-=0.3"
            );

            // 5. Hold for a beat so user can read the name
            tl.to({}, { duration: 0.8 });

            // 6. Name fades out first
            tl.to(nameRefs.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                stagger: 0.03,
            });

            // 7. Title fades out 0.1s after name starts fading
            tl.to(
                titleRef.current,
                {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                },
                "-=0.35"   // overlaps so title starts ~0.1s after name begins
            );

            // 8. Fade the whole overlay out
            tl.to(overlayRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power1.inOut",
            });
        });

        return () => ctx.revert();
    }, []);

    const NAME = "LEOW KAI WEN";
    const TITLE = "Portfolio";
    const chars = NAME.split("");

    const setNameRef = (el: HTMLSpanElement | null, i: number) => {
        if(el) nameRefs.current[i] = el;
    };

    // "LEOW" = indices 0-3, space = 4, "KAI WEN" = indices 5-11
    const isGhosted = (i: number) => i >= 5;

    return (
        <div
            ref={overlayRef}
            style={{
                position:       "fixed",
                inset:          0,
                zIndex:         9999,
                background:     "#0A0A0A",
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "0.75rem",
            }}
        >
            {/* Counter — bottom right */}
            <span
                ref={counterRef}
                style={{
                    position:      "absolute",
                    bottom:        "2.5rem",
                    right:         "2.5rem",
                    color:         "#A3A3A3",
                    fontSize:      "11px",
                    fontFamily:    "var(--font-sans, monospace)",
                    letterSpacing: "0.15em",
                }}
            >
                000
            </span>

            {/* Name — each character individually masked */}
            <div
                style={{
                    display:        "flex",
                    flexWrap:       "wrap",
                    justifyContent: "center",
                    gap:            "0 0.04em",
                }}
            >
                {chars.map((char, i) => (
                    <span
                        key={i}
                        style={{ display: "inline-block", overflow: "hidden" }}
                    >
                        <span
                            ref={(el) => setNameRef(el, i)}
                            style={{
                                display:          "inline-block",
                                transform:        "translateY(110%)",
                                
                                fontSize:         "clamp(2.5rem, 7vw, 5.5rem)",
                                fontWeight:       900,
                                textTransform:    "uppercase",
                                letterSpacing:    char === " " ? "0.2em" : "-0.02em",
                                lineHeight:       1.1,
                                fontFamily:       "var(--font-heading)",
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    </span>
                ))}
            </div>

            {/* Title — single masked line */}
            <div style={{ overflow: "hidden" }}>
                <span
                    ref={titleRef}
                    style={{
                        display:       "block",
                        transform:     "translateY(110%)",
                        color:         "#A3A3A3",
                        fontSize:      "11px",
                        fontWeight:    400,
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        fontFamily:    "var(--font-sans, system-ui)",
                    }}
                >
                    {TITLE}
                </span>
            </div>
        </div>
    );
}