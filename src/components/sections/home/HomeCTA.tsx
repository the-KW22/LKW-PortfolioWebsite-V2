'use client'

import { CornerBracket, MorseLine } from "@/components/layout/DecorativeElement";
import StarBorder from "@/components/ui/StarBorder";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CTAs = [
    { label: "View Projects", path: "/projects" },
    { label: "About Me", path: "/about-me" },
    { label: "Get in Touch", path: "/contact-me" },
]

export default function HomeCTA() {
    const sectionRef   = useRef<HTMLElement>(null);
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLDivElement>(null);
    const descRef      = useRef<HTMLParagraphElement>(null);
    const ctaRefs      = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            descRef.current,
            ...ctaRefs.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current, { y: 24 });
        gsap.set(descRef.current,    { y: 16 });
        gsap.set(ctaRefs.current,    { y: 16, scale: 0.92 });

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                observer.disconnect();

                const tl = gsap.timeline();

                // 1. Label line + "Let's Connect" text slide in from left
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

                // 3. Description fades up
                tl.to(descRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.2");

                // 4. CTA buttons scale + fade, staggered
                tl.to(ctaRefs.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.4)",
                    stagger: 0.08,
                    clearProps: "transform",
                }, "-=0.15");
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="home-cta" className="py-16 md:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Heading block */}
                <div className="flex flex-col items-center text-center gap-5">
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-flame" />
                        <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-flame">
                            Let&apos;s Connect
                        </p>
                        <span className="w-5 h-px bg-flame" />
                    </div>
                    <div ref={headingRef} className="relative inline-block px-4 py-2">
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[0.5%]" />
                            <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[0.5%]" />
                            <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[0.5%]" />
                            <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[0.5%]" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                            Ready to build{" "}
                            <span className="ghosted-text">Something Great?</span>
                        </h2>
                        <MorseLine animated width={875} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                    </div>

                    <p ref={descRef} className="text-base text-muted-foreground leading-relaxed">
                        I&apos;m currently open to junior software engineering roles, freelance work, and collaborations. If you have an idea or opportunity — let&apos;s talk.
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 md:mt-8">
                    {CTAs.map((link, i) => (
                        <div key={link.label} ref={el => { if (el) ctaRefs.current[i] = el; }}>
                            <Link href={link.path}>
                                <StarBorder as="button" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                                    {link.label}
                                </StarBorder>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
