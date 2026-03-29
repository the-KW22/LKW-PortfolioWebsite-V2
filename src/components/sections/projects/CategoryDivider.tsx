"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CategoryDividerProps {
    title: string;
    index: number;   // 1-based display number
    count: number;   // number of projects in this category
}

export default function CategoryDivider({ title, index, count }: CategoryDividerProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef    = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-reveal]", {
                y: 24,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
            });

            // Line draws in left-to-right
            gsap.from(lineRef.current, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const indexStr = String(index).padStart(2, "0");

    return (
        <div ref={sectionRef} className="relative py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">

            {/* Ghost watermark — flame-tinted */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
                style={{ paddingLeft: "1.5rem" }}
            >
                <span
                    className="font-heading font-black uppercase select-none"
                    style={{
                        fontSize:         "clamp(80px, 14vw, 180px)",
                        color:            "transparent",
                        WebkitTextStroke: "1px rgba(228,231,235,0.15)",
                        letterSpacing:    "-0.03em",
                        lineHeight:       1,
                    }}
                >
                    {title}
                </span>
            </div>

            {/* Main row */}
            <div className="relative flex items-center gap-5">

                {/* Index number — flame gradient */}
                <span
                    data-reveal
                    className="font-heading font-black leading-none shrink-0"
                    style={{
                        fontSize:                "clamp(2rem, 4vw, 3rem)",
                        background:              "linear-gradient(135deg, #FE4D01 0%, #FF7A3D 100%)",
                        WebkitBackgroundClip:    "text",
                        WebkitTextFillColor:     "transparent",
                    }}
                >
                    {indexStr}
                </span>

                {/* Category title */}
                <h2
                    data-reveal
                    className="font-heading font-black uppercase text-foreground shrink-0"
                    style={{
                        fontSize:      "clamp(1.4rem, 2.8vw, 2.2rem)",
                        letterSpacing: "0.05em",
                    }}
                >
                    {title}
                </h2>

                <div className="flex-1" />

                {/* Count pill */}
                    <span
                    data-reveal
                    className="font-body text-base text-muted-foreground uppercase tracking-widest shrink-0"
                >
                    {count} {count === 1 ? "Project" : "Projects"}
                </span>
            </div>

        </div>
    );
}
