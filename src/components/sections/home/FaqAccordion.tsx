'use client'

import { CornerBracket, MorseLine } from "@/components/layout/DecorativeElement";
import { MotionAccordion } from "@/components/ui/motion-accordion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const faqItems = [
    {
        question: "Who am I?",
        answer:
            "I'm Leow Kai Wen, a fresh graduate software engineer student that specializing in full-stack development.",
    },
    {
        question: "What technologies do I work with?",
        answer:
            "I mainly work with modern web technologies such as Next.js, React, TypeScript, Tailwind CSS, and JavaScript. I also explore backend development, APIs, and database integration to build complete full-stack solutions.",
    },
    {
        question: "What kind of projects do I enjoy building?",
        answer:
            "I enjoy building responsive web applications, interactive user interfaces, and modern digital experiences that focus on usability, performance, and clean design. I especially like projects where I can combine frontend creativity with practical full-stack functionality.",
    },
    {
        question: "Am I open to work or collaboration?",
        answer:
            "Yes — I'm currently open to junior software engineering opportunities, freelance work, and collaborations. I'm always excited to contribute, learn, and grow through meaningful projects.",
    },
    {
        question: "How to contact me?",
        answer:
            "The best way to reach me is through the email or contact form on this website. I'm always happy to connect regarding opportunities, collaborations, or just to talk about tech and development.",
    },
];

export default function FaqAccordion() {
    const sectionRef   = useRef<HTMLElement>(null);
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLDivElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            accordionRef.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current,   { y: 24 });
        gsap.set(accordionRef.current, { y: 32 });

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                observer.disconnect();

                const tl = gsap.timeline();

                // 1. Label line + "FAQ" text slide in from left
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

                // 3. Accordion block fades up
                tl.to(accordionRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.2");
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="faq-accordion" className="py-16 md:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="mb-10 md:mb-14 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-primary" />
                        <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-primary">
                            FAQ
                        </p>
                        <span className="w-5 h-px bg-primary" />
                    </div>
                    <div ref={headingRef} className="relative inline-block px-4 py-2">
                        <div className="hidden lg:block absolute inset-0 pointer-events-none">
                            <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[0.5%]" />
                            <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[63%]" />
                            <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[0.5%]" />
                            <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[63%]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                            Quick{" "}
                            <span className="ghosted-text">Questions</span>
                        </h2>
                        <MorseLine animated width={440} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                    </div>
                </div>

                <div ref={accordionRef}>
                    <MotionAccordion items={faqItems} />
                </div>
            </div>
        </section>
    )
}
