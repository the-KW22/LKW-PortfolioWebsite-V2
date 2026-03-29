"use client"

import { CornerBracket, MorseLine } from "@/components/layout/DecorativeElement";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ShapeGrid from "@/components/ui/ShapeGrid";
import { GraduationCap, Layers, TrendingUp, LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const infoCards: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: GraduationCap,
        title: "Education",
        description:
            "Fresh graduate with a foundation in software engineering and modern web development.",
    },
    {
        icon: Layers,
        title: "Specialization",
        description:
            "Focused on full-stack development with an interest in clean UI, APIs, and scalable solutions.",
    },
    {
        icon: TrendingUp,
        title: "Growth Mindset",
        description:
            "Continuous learning, and building projects that turn knowledge into real-world experience.",
    },
];

function InfoCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
    return (
        <SpotlightCard className="rounded-2xl! p-6! bg-surface border-divider! hover:border-primary/20! transition-colors duration-200">
            <div className="relative z-10 flex gap-4 items-start">

                {/* Icon badge */}
                <div className="shrink-0 rounded-xl bg-flame/10 border border-flame/20 p-2.5">
                    <Icon size={20} className="text-flame" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-foreground text-base">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>

            </div>
        </SpotlightCard>
    );
}

export default function AboutMeIntro() {
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLDivElement>(null);
    const descRef      = useRef<HTMLParagraphElement>(null);
    const cardRefs     = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            descRef.current,
            ...cardRefs.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current, { y: 24 });
        gsap.set(descRef.current,    { y: 16 });
        gsap.set(cardRefs.current,   { y: 40, scale: 0.97 });

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

        // 4. Cards stagger up
        tl.to(cardRefs.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform",
        }, "-=0.2");

        return () => { tl.kill(); };
    }, []);

    return (
        <section id="about-me-intro" className="relative px-4 sm:px-6 h-screen flex flex-col items-center justify-center">
            <div className="absolute inset-0">
                <ShapeGrid
                    direction="diagonal"
                    speed={0.5}
                    shape="hexagon"
                    hoverTrailAmount={3}
                    borderColor="rgba(255,255,255,0.1)"
                    hoverFillColor="rgba(255,255,255,0)"
                />
            </div>

            <div className="relative z-10 max-w-7xl w-full">

                {/* Top block — section header + description */}
                <div className="flex flex-col gap-4 md:gap-6 mb-10 md:mb-14 items-center justify-center">

                    {/* Section label */}
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-flame" />
                        <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-flame">
                            About Me
                        </p>
                        <span className="w-5 h-px bg-flame" />
                    </div>

                    {/* Heading */}
                    <div ref={headingRef} className="relative inline-block px-4 py-2">
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[1%]" />
                            <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[1%]" />
                            <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[1%]" />
                            <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[1%]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                            I Build Things{" "}
                            <span className="ghosted-text">That Work</span>
                        </h2>
                        <MorseLine animated width={640} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                    </div>

                    {/* Description */}
                    <p ref={descRef} className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center">
                        I&apos;m Kai Wen, a fresh graduate software engineer passionate about
                        full-stack development and creating modern web experiences. I enjoy
                        building clean, responsive, and scalable digital products that combine
                        thoughtful design with practical functionality.
                    </p>

                </div>

                {/* Cards — all 3 in one row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {infoCards.map((card, i) => (
                        <div key={card.title} ref={el => { if (el) cardRefs.current[i] = el; }}>
                            <InfoCard {...card} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
