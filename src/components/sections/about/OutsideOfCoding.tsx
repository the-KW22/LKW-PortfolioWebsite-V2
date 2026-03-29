'use client'

import { CornerBracket, MorseLine } from '@/components/layout/DecorativeElement'
import SpotlightCard from '@/components/ui/SpotlightCard'
import FloatingHobbyBg from '@/components/ui/FloatingHobbyBg'
import { Film, Headphones, Plane, Swords, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const HOBBIES: { icon: LucideIcon; label: string; tagline: string }[] = [
    { icon: Film, label: 'Movies', tagline: 'Stories on screen' },
    { icon: Headphones, label: 'Music', tagline: 'Always on repeat' },
    { icon: Plane, label: 'Travelling', tagline: 'New places, new views' },
    { icon: Swords, label: 'Badminton', tagline: 'Fast & competitive' },
    { icon: Target, label: 'Basketball', tagline: 'Team sport, full energy' },
]

export default function OutsideOfCoding() {
    const sectionRef   = useRef<HTMLElement>(null);
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLDivElement>(null);
    const descRef      = useRef<HTMLParagraphElement>(null);
    const tileRefs     = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            descRef.current,
            ...tileRefs.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current, { y: 24 });
        gsap.set(descRef.current,    { y: 16 });
        gsap.set(tileRefs.current,   { y: 36, scale: 0.95 });

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

                // 4. Hobby tiles stagger up
                tl.to(tileRefs.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: "back.out(1.2)",
                    stagger: 0.07,
                    clearProps: "transform",
                }, "-=0.15");
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="outside-of-coding" className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">

            {/* Radial glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
                <div className="w-240 h-120 rounded-full bg-flame/5 blur-[120px]" />
            </div>

            {/* Floating background icons */}
            <FloatingHobbyBg />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-10 md:gap-14">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-flame" />
                        <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-flame">
                            Outside of Coding
                        </p>
                        <span className="w-5 h-px bg-flame" />
                    </div>

                    <div ref={headingRef} className="relative inline-block px-4 py-2">
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[1%]" />
                            <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[0.5%]" />
                            <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[1%]" />
                            <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[0.5%]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                            Life Beyond the{' '}
                            <span className="ghosted-text">Screen</span>
                        </h2>
                        <MorseLine animated width={605} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                    </div>

                    <p ref={descRef} className="text-base text-muted-foreground leading-relaxed max-w-2xl text-center">
                        Outside of coding, I enjoy watching movies, listening to music, travelling, and staying
                        active through sports like badminton and basketball. These hobbies give me a good balance
                        between creativity, relaxation, and staying active in everyday life.
                    </p>
                </div>

                {/* Hobby tiles */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {HOBBIES.map(({ icon: Icon, label, tagline }, i) => (
                        <div key={label} ref={el => { if (el) tileRefs.current[i] = el; }}>
                            <SpotlightCard className="group rounded-2xl bg-surface border border-divider transition-colors duration-200 hover:border-primary/20 p-6 flex flex-col items-center text-center gap-4">
                                {/* Icon badge */}
                                <div className="shrink-0 rounded-xl bg-flame/10 border border-flame/20 p-3">
                                    <Icon
                                        size={24}
                                        className="text-flame transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Text */}
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-foreground text-sm">{label}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{tagline}</p>
                                </div>
                            </SpotlightCard>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
