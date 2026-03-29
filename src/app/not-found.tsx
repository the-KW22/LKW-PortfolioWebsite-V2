'use client'

import Link from "next/link"
import StarBorder from "@/components/ui/StarBorder"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import FaultyTerminal from "@/components/ui/FaultyTerminal"

export default function NotFound() {
    const codeRef    = useRef<HTMLSpanElement>(null)
    const labelRef   = useRef<HTMLParagraphElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const descRef    = useRef<HTMLParagraphElement>(null)
    const ctaRef     = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const els = [codeRef.current, labelRef.current, headingRef.current, descRef.current, ctaRef.current].filter(Boolean)

        gsap.set(els, { opacity: 0 })
        gsap.set(codeRef.current,    { y: 30, scale: 0.95 })
        gsap.set(labelRef.current,   { x: -16 })
        gsap.set(headingRef.current, { y: 20 })
        gsap.set(descRef.current,    { y: 16 })
        gsap.set(ctaRef.current,     { y: 14, scale: 0.95 })

        const tl = gsap.timeline({ delay: 0.2 })

        tl.to(codeRef.current, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, ease: "power4.out", clearProps: "transform",
        })
        tl.to(labelRef.current, {
            opacity: 1, x: 0,
            duration: 0.5, ease: "power3.out", clearProps: "transform",
        }, "-=0.35")
        tl.to(headingRef.current, {
            opacity: 1, y: 0,
            duration: 0.5, ease: "power3.out", clearProps: "transform",
        }, "-=0.25")
        tl.to(descRef.current, {
            opacity: 1, y: 0,
            duration: 0.45, ease: "power2.out", clearProps: "transform",
        }, "-=0.2")
        tl.to(ctaRef.current, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.4, ease: "back.out(1.4)", clearProps: "transform",
        }, "-=0.15")

        return () => { tl.kill() }
    }, [])

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <FaultyTerminal
                    tint="#fe4d01"
                    brightness={0.15}
                    scanlineIntensity={0.4}
                    glitchAmount={0.8}
                    curvature={0}
                    mouseReact={false}
                    pageLoadAnimation={false}
                    dpr={1}
                />
            </div>

            {/* Ghost watermark */}
            <span
                ref={codeRef}
                aria-hidden="true"
                className="pointer-events-none absolute select-none font-heading font-black"
                style={{
                    fontSize:         "clamp(140px, 28vw, 320px)",
                    color:            "transparent",
                    WebkitTextStroke: "1px rgba(254,77,1,0.12)",
                    letterSpacing:    "-0.05em",
                    lineHeight:       1,
                    zIndex:           1,
                }}
            >
                404
            </span>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-md">

                {/* Label */}
                <div className="flex items-center gap-3">
                    <span className="w-5 h-px bg-flame" />
                    <p ref={labelRef} className="text-[10px] uppercase tracking-[0.3em] text-flame">
                        Error 404
                    </p>
                    <span className="w-5 h-px bg-flame" />
                </div>

                {/* Heading */}
                <h1 ref={headingRef} className="text-4xl lg:text-5xl font-black uppercase leading-tight">
                    Page{" "}
                    <span className="ghosted-text">Not Found</span>
                </h1>

                {/* Description */}
                <p ref={descRef} className="text-sm text-muted-foreground leading-relaxed">
                    Looks like this page doesn&apos;t exist. It may have been moved,
                    deleted, or you may have mistyped the URL.
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-2">
                    <Link href="/">
                        <StarBorder as="button" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                            Go Home
                        </StarBorder>
                    </Link>
                    <Link href="/projects">
                        <StarBorder as="button" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                            View Projects
                        </StarBorder>
                    </Link>
                </div>

            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-flame/30 to-transparent" />
        </div>
    )
}
