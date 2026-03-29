'use client'

import { CornerBracket, DotGrid, MorseLine } from "@/components/layout/DecorativeElement";
import LightRays from "@/components/ui/LightRays";
import StarBorder from "@/components/ui/StarBorder";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const projectCategories = [
    {
        index: "01",
        name: "Mini Series",
        description: "Small but complete full-stack web apps built to explore real-world tech stacks. Each project is independently deployable, data-driven, and purpose-built around a specific problem.",
        stats: [
            { value: "4", label: "Projects" },
            { value: "6+", label: "Technologies" },
        ],
        tech: ["Next.js", "TypeScript", "MongoDB", "Recharts", "NextAuth"],
        href: "/projects#mini-series",
        cta: "Explore Mini Series",
    },
    {
        index: "02",
        name: "Web Designs",
        description: "Design-first landing pages and UI concepts that focus on aesthetics, smooth scroll interactions, and a bold visual identity. Built to look great and feel polished.",
        stats: [
            { value: "2", label: "Projects" },
            { value: "UI", label: "Focused" },
        ],
        tech: ["Next.js", "Tailwind CSS", "Lenis", "Framer Motion", "shadcn/ui"],
        href: "/projects#web-design",
        cta: "Explore Web Designs",
    },
];

export default function FeaturedProjects() {
    const sectionRef    = useRef<HTMLElement>(null);
    const labelLineRef  = useRef<HTMLSpanElement>(null);
    const labelTextRef  = useRef<HTMLParagraphElement>(null);
    const headingRef    = useRef<HTMLDivElement>(null);
    const cardRefs      = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            ...cardRefs.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current, { y: 24 });
        gsap.set(cardRefs.current, { y: 48 });

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                observer.disconnect();

                const tl = gsap.timeline();

                // 1. Label accent line + text slide in from left
                tl.to([labelLineRef.current, labelTextRef.current], {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.05,
                    clearProps: "transform",
                });

                // 2. Section heading fades up
                tl.to(headingRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power3.out",
                    clearProps: "transform",
                }, "-=0.25");

                // 3. Cards stagger up
                tl.to(cardRefs.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.15,
                    clearProps: "transform",
                }, "-=0.2");
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="featured-projects" className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="mb-10 md:mb-14 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-primary" />
                        <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-primary">
                            Featured Works
                        </p>
                        <span className="w-5 h-px bg-primary" />
                    </div>
                    <div ref={headingRef} className="relative inline-block px-4 py-2">
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[0.5%]" />
                            <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[58.5%]"  />
                            <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[0.5%]" />
                            <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[58.5%]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                            Personal{" "}
                            <span className="ghosted-text">Projects</span>
                        </h2>
                        <MorseLine animated width={500} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                    </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {projectCategories.map((cat, i) => (
                        <div
                            key={cat.index}
                            ref={el => { if (el) cardRefs.current[i] = el; }}
                            className="relative overflow-hidden rounded-2xl bg-surface border border-divider hover:border-primary/20"
                        >
                            {/* LightRays — WebGL background */}
                            <div className="absolute inset-0">
                                <LightRays
                                    raysOrigin="top-center"
                                    raysColor="#ffffff"
                                    raysSpeed={0.5}
                                    lightSpread={1.5}
                                    rayLength={2.5}
                                    pulsating={false}
                                    fadeDistance={0.6}
                                    followMouse={true}
                                    mouseInfluence={0.1}
                                    noiseAmount={0.05}
                                />
                            </div>

                            {/* Card content */}
                            <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col gap-5 md:gap-6">

                                {/* Index + name */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify gap-3">
                                        <DotGrid
                                            cols={3}
                                            rows={3}
                                            gap={4}
                                            dotSize={1.5}
                                            opacity={0.8}
                                            className="-mt-[2.5px]"
                                        />
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
                                            {cat.index}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight text-foreground">
                                        {cat.name}
                                    </h3>
                                </div>

                                {/* Divider */}
                                <span className="h-px w-full bg-divider" />

                                {/* Description */}
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {cat.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center">
                                    {cat.stats.map((s) => (
                                        <div key={s.label} className="flex items-center">
                                            <div className="flex flex-col gap-0.5 px-5 first:pl-0">
                                                <span className="font-heading font-bold text-2xl text-foreground leading-none">
                                                    {s.value}
                                                </span>
                                                <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
                                                    {s.label}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-2">
                                    {cat.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs font-medium px-3 py-1.5 rounded-full text-muted-foreground bg-elevated/60 border border-divider"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div>
                                    <StarBorder
                                        as={Link}
                                        href={cat.href}
                                        className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground"
                                    >
                                        <span className="flex items-center gap-2">
                                            {cat.cta}
                                            <ArrowRight size={13} className="animate-bounce-x" />
                                        </span>
                                    </StarBorder>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
