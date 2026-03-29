'use client'

import ShinyText from "@/components/ui/ShinyText";
import Silk from "@/components/ui/Silk";
import StarBorder from "@/components/ui/StarBorder";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CTAs = [
    { label: "View Projects", path: "/projects" },
    { label: "About Me", path: "/about-me" },
    { label: "Get in Touch", path: "/contact-me" },
]

interface HeroSectionProps {
    ready?: boolean;
}

export default function HeroSection({ ready = false }: HeroSectionProps) {
    const greetingRef    = useRef<HTMLParagraphElement>(null);
    const nameWrapperRef = useRef<HTMLDivElement>(null);
    const lineLeftRef    = useRef<HTMLSpanElement>(null);
    const lineRightRef   = useRef<HTMLSpanElement>(null);
    const roleTextRef    = useRef<HTMLSpanElement>(null);
    const bioRef         = useRef<HTMLParagraphElement>(null);
    const ctaRefs        = useRef<HTMLDivElement[]>([]);
    const scrollRef      = useRef<HTMLDivElement>(null);

    // Set initial hidden state on mount (elements invisible while intro overlay is up)
    useEffect(() => {
        const els = [
            greetingRef.current,
            nameWrapperRef.current,
            lineLeftRef.current,
            lineRightRef.current,
            roleTextRef.current,
            bioRef.current,
            ...ctaRefs.current,
            scrollRef.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0, transformOrigin: "center" });
        gsap.set(greetingRef.current,    { y: 20 });
        gsap.set(nameWrapperRef.current, { y: 25 });
        gsap.set(bioRef.current,         { y: 15 });
        gsap.set(ctaRefs.current,        { scale: 0.88 });
    }, []);

    // Fire entrance timeline when intro completes
    useEffect(() => {
        if (!ready) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.15 });

            // 1. Greeting
            tl.to(greetingRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
                clearProps: "transform",
            });

            // 2. Name
            tl.to(nameWrapperRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power4.out",
                clearProps: "transform",
            }, "-=0.25");

            // 3. Divider lines expand + role text fade — simultaneously
            tl.to([lineLeftRef.current, lineRightRef.current], {
                scaleX: 1,
                duration: 0.5,
                ease: "power3.inOut",
                clearProps: "transform",
            }, "-=0.2");

            tl.to(roleTextRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
            }, "<"); // same time as lines

            // 4. Bio
            tl.to(bioRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                clearProps: "transform",
            }, "-=0.15");

            // 5. CTA buttons staggered
            tl.to(ctaRefs.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.4)",
                stagger: 0.08,
                clearProps: "transform",
            }, "-=0.15");

            // 6. Scroll indicator
            tl.to(scrollRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
            }, "-=0.1");
        });

        return () => ctx.revert();
    }, [ready]);

    return (
        <section id="hero" className="relative w-full h-screen pt-20 overflow-hidden">

            {/* Silk background */}
            <div className="absolute inset-0">
                <Silk color="#1E1E1E" speed={5} scale={1} noiseIntensity={1.5} rotation={0} />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl mx-auto h-full gap-4 md:gap-6 px-4 sm:px-6 text-center">

                {/* Greeting */}
                <p ref={greetingRef} className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Hi, I&apos;m
                </p>

                {/* Name */}
                <div ref={nameWrapperRef}>
                    <ShinyText
                        text="LEOW KAI WEN"
                        color="#A3A3A3"
                        shineColor="#FFFFFF"
                        speed={2}
                        delay={3}
                        className="font-heading text-4xl md:text-6xl lg:text-[8rem] font-black uppercase leading-none tracking-tight -mt-2"
                    />
                </div>

                {/* Role divider */}
                <div className="flex items-center gap-4 w-full max-w-xs">
                    <span ref={lineLeftRef}  className="flex-1 h-px bg-divider" />
                    <span ref={roleTextRef}  className="text-xs uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
                        Full Stack Developer
                    </span>
                    <span ref={lineRightRef} className="flex-1 h-px bg-divider" />
                </div>

                {/* Bio */}
                <p ref={bioRef} className="max-w-lg text-base leading-relaxed text-muted-foreground">
                    A fresh graduate Software Engineering student that passionate about crafting{' '}
                    <span className="text-foreground font-medium">web applications</span>{' '}
                    and scalable digital solutions.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
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

            {/* Scroll indicator */}
            <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
                <span className="w-px h-6 bg-linear-to-b from-muted-foreground to-transparent" />
                <ArrowDown size={12} className="text-primary-foreground text-text-disabled animate-bounce" />
            </div>

        </section>
    )
}
