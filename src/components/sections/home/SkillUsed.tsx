'use client'

import { CornerBracket, MorseLine } from "@/components/layout/DecorativeElement";
import SkillsMarquee from "@/components/layout/SkillMarquee";
import StarBorder from "@/components/ui/StarBorder";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SkillUsed() {
    const sectionRef   = useRef<HTMLElement>(null);
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLDivElement>(null);
    const descRowRef   = useRef<HTMLDivElement>(null);
    const marqueeRef   = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            descRowRef.current,
            marqueeRef.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current, { y: 24 });
        gsap.set(descRowRef.current, { y: 20 });
        gsap.set(marqueeRef.current, { y: 30 });

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                observer.disconnect();

                const tl = gsap.timeline();

                // 1. Label line + "My Toolkit" text slide in from left
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
                    duration: 0.55,
                    ease: "power3.out",
                    clearProps: "transform",
                }, "-=0.25");

                // 3. Description + CTA row fades up
                tl.to(descRowRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.2");

                // 4. Marquee fades up
                tl.to(marqueeRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.15");
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="skill-used" className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="mb-10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-primary" />
                        <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-primary">
                            My Toolkit
                        </p>
                        <span className="w-5 h-px bg-primary" />
                    </div>
                    <div ref={headingRef} className="relative inline-block px-4 py-2">
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[0.5%]" />
                            <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[43%]" />
                            <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[0.5%]" />
                            <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[43%]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                            Built with{" "}
                            <span className="ghosted-text">The Right Tools</span>
                        </h2>
                        <MorseLine animated width={690} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                    </div>
                </div>

                {/* Description + CTA row */}
                <div ref={descRowRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
                    <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                        From frontend to backend, I use a carefully chosen stack of modern
                        technologies to build fast, scalable, and polished web experiences.
                    </p>
                    <StarBorder
                        as={Link}
                        href="/about-me#skills"
                        className="cursor-pointer shrink-0 [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Explore My Skills
                            <ArrowRight size={13} className="animate-bounce-x" />
                        </span>
                    </StarBorder>
                </div>

                {/* 3-column skills marquee */}
                <div ref={marqueeRef}>
                    <SkillsMarquee />
                </div>
            </div>
        </section>
    );
}
