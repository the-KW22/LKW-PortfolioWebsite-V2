"use client"

import { Layers, Wrench, Target } from "lucide-react";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
    { icon: Layers, value: "6+",         label: "Vibe Coding Projects Built" },
    { icon: Wrench, value: "2",          label: "Categories"     },
    { icon: Target, value: "Full Stack", label: "Focus Area"     },
];

export default function ProjectHero() {
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLHeadingElement>(null);
    const desc1Ref     = useRef<HTMLParagraphElement>(null);
    const desc2Ref     = useRef<HTMLParagraphElement>(null);
    const cardRefs     = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            desc1Ref.current,
            desc2Ref.current,
            ...cardRefs.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current, { y: 28 });
        gsap.set(desc1Ref.current,   { y: 18 });
        gsap.set(desc2Ref.current,   { y: 14 });
        gsap.set(cardRefs.current,   { x: 32, scale: 0.97 });

        const tl = gsap.timeline({ delay: 0.3 });

        // 1. Label slides in from left
        tl.to([labelLineRef.current, labelTextRef.current], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
            clearProps: "transform",
        });

        // 2. Heading fades up
        tl.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power4.out",
            clearProps: "transform",
        }, "-=0.25");

        // 3. Primary description fades up
        tl.to(desc1Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "transform",
        }, "-=0.2");

        // 4. Secondary description fades up
        tl.to(desc2Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "transform",
        }, "-=0.2");

        // 5. Stat cards slide in from right, staggered
        tl.to(cardRefs.current, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",
        }, "-=0.3");

        return () => { tl.kill(); };
    }, []);

    return (
        <section id="project-hero" className="relative h-screen flex flex-col justify-center overflow-hidden pt-20">

            {/* FaultyTerminal background */}
            <div className="absolute inset-0 z-0">
                <FaultyTerminal
                    tint="#fe4d01"
                    brightness={0.2}
                    scanlineIntensity={0.5}
                    glitchAmount={1.2}
                    curvature={0}
                    mouseReact={false}
                    pageLoadAnimation={false}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-8 md:gap-12 lg:gap-20 items-center">

                    {/* Left — heading block */}
                    <div className="flex flex-col gap-5 md:gap-7">

                        {/* Section label */}
                        <div className="flex items-center gap-3">
                            <span ref={labelLineRef} className="block w-5 h-px bg-flame" />
                            <p ref={labelTextRef} className="text-base text-flame uppercase tracking-[0.3em] font-medium font-body">
                                My Work
                            </p>
                            <span className="block w-5 h-px bg-flame" />
                        </div>

                        {/* Heading */}
                        <h1 ref={headingRef} className="font-heading text-4xl sm:text-5xl lg:text-[5.5rem] font-black uppercase leading-none">
                            Things I&apos;ve{" "}
                            <span className="ghosted-text">Built</span>
                        </h1>

                        {/* Primary description */}
                        <p ref={desc1Ref} className="font-body text-justify text-muted-foreground text-base lg:text-lg leading-relaxed max-w-xl">
                            A collection of personal projects and web designs I&apos;ve built while
                            sharpening my skills across the full stack. Each project is a chance to
                            explore new ideas, solve real problems, and push my craft forward.
                        </p>

                        {/* Secondary description */}
                        <p ref={desc2Ref} className="font-body text-justify text-muted-foreground/50 text-base leading-relaxed max-w-xl">
                            From small utility apps in the Mini Series to full web design concepts —
                            everything here is built from scratch, driven by curiosity and a habit
                            of learning by doing.
                        </p>

                    </div>

                    {/* Right — stat cards */}
                    <div className="flex flex-col gap-3">
                        {STATS.map(({ icon: Icon, value, label }, i) => (
                            <div key={label} ref={el => { if (el) cardRefs.current[i] = el; }}>
                                <SpotlightCard
                                    className="rounded-2xl! p-5! bg-surface! border-divider! hover:border-flame/20! transition-colors duration-300"
                                    spotlightColor="rgba(254, 77, 1, 0.07)"
                                >
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="shrink-0 rounded-xl bg-flame/10 border border-flame/20 p-2.5">
                                            <Icon size={18} className="text-flame" />
                                        </div>
                                        <div className="flex items-baseline gap-2.5">
                                            <span className="font-heading text-2xl font-bold text-foreground leading-none">
                                                {value}
                                            </span>
                                            <span className="font-body text-xs text-muted-foreground uppercase tracking-[0.15em]">
                                                {label}
                                            </span>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom gradient divider */}
            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="h-px w-full"
                        style={{
                            background:
                                "linear-gradient(to right, transparent, rgba(254,77,1,0.4) 30%, rgba(254,77,1,0.4) 70%, transparent)",
                        }}
                    />
                </div>
            </div>

        </section>
    );
}
