'use client'

import Link from "next/link"
import StarBorder from "@/components/ui/StarBorder"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const TAGS = [
    "OpenToWork",
    "JuniorEngineer",
    "FullStackDev",
    "ContinuousLearning",
    "TeamPlayer",
]

export default function OpportunitiesCTA() {
    const sectionRef   = useRef<HTMLElement>(null);
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLHeadingElement>(null);
    const descRef      = useRef<HTMLParagraphElement>(null);
    const tagsRef      = useRef<HTMLDivElement>(null);
    const dividerRef   = useRef<HTMLDivElement>(null);
    const ctaRefs      = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            descRef.current,
            tagsRef.current,
            dividerRef.current,
            ...ctaRefs.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current,  { y: 32 });
        gsap.set(descRef.current,     { y: 20 });
        gsap.set(tagsRef.current,     { y: 16 });
        gsap.set(dividerRef.current,  { scaleX: 0, transformOrigin: "center" });
        gsap.set(ctaRefs.current,     { y: 16, scale: 0.92 });

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                observer.disconnect();

                const tl = gsap.timeline();

                // 1. Label slides in from left
                tl.to([labelLineRef.current, labelTextRef.current], {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.05,
                    clearProps: "transform",
                });

                // 2. Large heading fades up
                tl.to(headingRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power4.out",
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

                // 4. Tags block fades up
                tl.to(tagsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.15");

                // 5. Divider expands from center
                tl.to(dividerRef.current, {
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.5,
                    ease: "power3.inOut",
                    clearProps: "transform",
                }, "-=0.1");

                // 6. CTA buttons stagger scale + fade
                tl.to(ctaRefs.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.4)",
                    stagger: 0.08,
                    clearProps: "transform",
                }, "-=0.2");
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="im-looking-for" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">

            {/* Top gradient border accent */}
            <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-flame/30 to-transparent" />

            {/* Radial glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-200 h-120 rounded-full bg-flame/5 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center gap-8 md:gap-10">

                {/* Section label */}
                <div className="flex items-center gap-3">
                    <span ref={labelLineRef} className="w-5 h-px bg-flame" />
                    <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-flame">Let&apos;s Talk</p>
                    <span className="w-5 h-px bg-flame" />
                </div>

                {/* Heading */}
                <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-tight">
                    Open to New{" "}
                    <span className="ghosted-text">Opportunities</span>
                </h2>

                {/* Description */}
                <p ref={descRef} className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                    Seeking a{" "}
                    <span className="text-foreground font-semibold">junior software engineer</span>{" "}
                    or{" "}
                    <span className="text-foreground font-semibold">junior full-stack developer</span>{" "}
                    role where I can contribute and grow through{" "}
                    <span className="text-flame font-semibold">real-world projects</span>.
                    Especially drawn to teams that value{" "}
                    <span className="text-flame font-semibold">clean development</span>,{" "}
                    <span className="text-flame font-semibold">collaboration</span>, and building{" "}
                    <span className="text-foreground font-semibold">meaningful digital products</span>.
                    My inbox is always open.
                </p>

                {/* Tags */}
                <div ref={tagsRef} className="flex flex-wrap justify-center gap-2">
                    {TAGS.map((tag, i) => (
                        <span
                            key={tag}
                            className={`text-sm font-medium px-3 py-1.5 rounded-full ${i === 0
                                    ? "text-flame bg-flame/10 border border-flame/20"
                                    : "text-muted-foreground bg-elevated/60 border border-divider hover:border-primary/20 hover:text-foreground transition-colors duration-200"
                                }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {[
                        <a key="email" href="mailto:kwenleow@gmail.com">
                            <StarBorder className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                                Send an Email
                            </StarBorder>
                        </a>,
                        <Link key="resume" href="/document/LeowKaiWen-Resume.pdf">
                            <StarBorder as="button" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                                Resume
                            </StarBorder>
                        </Link>,
                        <Link key="contact" href="/contact-me">
                            <StarBorder as="button" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                                Get in Touch
                            </StarBorder>
                        </Link>,
                    ].map((btn, i) => (
                        <div key={i} ref={el => { if (el) ctaRefs.current[i] = el; }}>
                            {btn}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
