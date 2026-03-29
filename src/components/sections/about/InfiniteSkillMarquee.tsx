"use client"

import { useMemo, useEffect, useRef } from "react";
import {
    siReact, siNextdotjs, siTypescript, siJavascript, siHtml5, siCss,
    siTailwindcss, siGreensock, siFramer, siVite, siFigma,
    siNodedotjs, siPhp, siPython, siOpenjdk, siCplusplus,
    siMongodb, siMysql, siFirebase,
    siGit, siGithub, siVscodium, siPostman, siDocker, siVercel, siNetlify, siLinux, siNpm,
} from "simple-icons";
import { CornerBracket, GlowingArc, MorseLine, PulseRing } from "@/components/layout/DecorativeElement";
import CurvedLoop from "@/components/ui/CurvedLoop";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Ripple } from "@/components/layout/DecorativeAnimation";
import gsap from "gsap";

// Custom paths for skills without a simple-icon
const REST_API_PATH = "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"; // horizontal lines = API routes
const SPLINE_PATH = "M21 7c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.86 1.27 3.43 3 3.87V13c0 2.21-1.79 4-4 4s-4-1.79-4-4v-.13C9.27 12.43 10 11.3 10 10c0-2.21-1.79-4-4-4S2 7.79 2 10s1.79 4 4 4c.35 0 .68-.05 1-.13V17c0 3.31 2.69 6 6 6s6-2.69 6-6v-2.13c1.73-.44 3-2.01 3-3.87z";

const SEP = "  ✦  ";

const FRONTEND_TEXT = ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion", "Vite", "Figma"].join(SEP);
const BACKEND_TEXT = ["Node.js", "PHP", "Python", "Java", "C++", "REST APIs", "MongoDB", "MySQL", "Firebase"].join(SEP);
const TOOLS_TEXT = ["Git", "GitHub", "VS Code", "Postman", "Docker", "Vercel", "Netlify", "Linux", "npm / pnpm", "Spline"].join(SEP);

// All icons in cloud order: frontend → backend → tools
const CLOUD_ICONS = [
    { path: siReact.path },
    { path: siNextdotjs.path },
    { path: siTypescript.path },
    { path: siJavascript.path },
    { path: siHtml5.path },
    { path: siCss.path },
    { path: siTailwindcss.path },
    { path: siGreensock.path },
    { path: siFramer.path },
    { path: siVite.path },
    { path: siFigma.path },
    { path: siNodedotjs.path },
    { path: siPhp.path },
    { path: siPython.path },
    { path: siOpenjdk.path },
    { path: siCplusplus.path },
    { path: REST_API_PATH },
    { path: siMongodb.path },
    { path: siMysql.path },
    { path: siFirebase.path },
    { path: siGit.path },
    { path: siGithub.path },
    { path: siVscodium.path },
    { path: siPostman.path },
    { path: siDocker.path },
    { path: siVercel.path },
    { path: siNetlify.path },
    { path: siLinux.path },
    { path: siNpm.path },
    { path: SPLINE_PATH },
];

export default function InfiniteSkillsMarquee() {
    const sectionRef   = useRef<HTMLElement>(null);
    const labelLineRef = useRef<HTMLSpanElement>(null);
    const labelTextRef = useRef<HTMLParagraphElement>(null);
    const headingRef   = useRef<HTMLDivElement>(null);
    const cloudRef     = useRef<HTMLDivElement>(null);
    const marqueesRef  = useRef<HTMLDivElement>(null);

    const icons = useMemo(() =>
        CLOUD_ICONS.map((icon, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={100}
                height={100}
            >
                <path d={icon.path} fill="rgba(255,255,255,0.85)" />
            </svg>
        )),
        []);

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            cloudRef.current,
            marqueesRef.current,
        ].filter(Boolean);

        gsap.set(els, { opacity: 0 });
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 });
        gsap.set(headingRef.current,  { y: 24 });
        gsap.set(cloudRef.current,    { y: 30, scale: 0.97 });
        gsap.set(marqueesRef.current, { y: 24 });

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

                // 3. Icon cloud fades in with subtle scale
                tl.to(cloudRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.2");

                // 4. Marquee loops fade up
                tl.to(marqueesRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power2.out",
                    clearProps: "transform",
                }, "-=0.3");
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="relative min-h-screen py-16 md:py-24 overflow-hidden">

            {/* Section header */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <span ref={labelLineRef} className="w-5 h-px bg-flame" />
                    <p ref={labelTextRef} className="text-base uppercase tracking-[0.3em] text-flame">My Skills</p>
                    <span className="w-5 h-px bg-flame" />
                </div>
                <div ref={headingRef} className="relative inline-block px-4 py-2">
                    <div className="hidden lg:block absolute inset-0 pointer-events-none">
                        <CornerBracket position="top-left" armLength={16} opacity={0.5} className="top-[0.5%] left-[1.5%]" />
                        <CornerBracket position="top-right" armLength={16} opacity={0.5} className="top-[0.5%] right-[1.5%]" />
                        <CornerBracket position="bottom-left" armLength={16} opacity={0.5} className="bottom-[0.5%] left-[1.5%]" />
                        <CornerBracket position="bottom-right" armLength={16} opacity={0.5} className="bottom-[0.5%] right-[1.5%]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                        Skills I{" "}
                        <span className="ghosted-text">Work With</span>
                    </h2>
                    <MorseLine animated width={480} opacity={0.12} maxOpacity={0.7} delay={1} duration={7} className="hidden lg:block"/>
                </div>
            </div>

            {/* Interactive 3D icon cloud */}
            <div ref={cloudRef} className="relative flex justify-center mb-32">
                <IconCloud icons={icons} />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Ripple size={500} opacity={1}  />
                </div>
            </div>

            {/* 3 curved marquee loops */}
            <div ref={marqueesRef} className="flex-col -mt-30 hidden lg:block">
                <div className="flex justify-center rotate-180 mb-8">
                    <GlowingArc width={3000} height={100} opacity={1} />
                </div>

                <div className="-mt-14">
                    <CurvedLoop
                        marqueeText={FRONTEND_TEXT + SEP}
                        speed={1.2}
                        curveAmount={100}
                        direction="left"
                        interactive={false}
                        fontSize="1.5rem"
                        className="text-foreground/25 font-bold uppercase"
                    />
                </div>
                <div className="-mt-12">
                    <CurvedLoop
                        marqueeText={BACKEND_TEXT + SEP}
                        speed={1.5}
                        curveAmount={100}
                        direction="right"
                        interactive={false}
                        fontSize="1.5rem"
                        className="text-foreground/25 font-bold uppercase"
                    />
                </div>
                <div className="-mt-12">
                    <CurvedLoop
                        marqueeText={TOOLS_TEXT + SEP}
                        speed={1.2}
                        curveAmount={100}
                        direction="left"
                        interactive={false}
                        fontSize="1.5rem"
                        className="text-foreground/25 font-bold uppercase"
                    />
                </div>
                <div className="flex justify-center rotate-180 -mt-[100px]">
                    <GlowingArc width={3000} height={100} opacity={1} />
                </div>
            </div>

        </section>
    );
}
