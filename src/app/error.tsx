'use client'

import { useEffect, useRef } from "react"
import gsap from "gsap"
import StarBorder from "@/components/ui/StarBorder"
import { GridScan } from "@/components/ui/GridScan"
import Link from "next/link"

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    const labelRef   = useRef<HTMLParagraphElement>(null)
    const headingRef = useRef<HTMLHeadingElement>(null)
    const descRef    = useRef<HTMLParagraphElement>(null)
    const ctaRef     = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.error(error)
    }, [error])

    useEffect(() => {
        const els = [labelRef.current, headingRef.current, descRef.current, ctaRef.current].filter(Boolean)
        gsap.set(els, { opacity: 0 })
        gsap.set(labelRef.current,   { x: -16 })
        gsap.set(headingRef.current, { y: 20 })
        gsap.set(descRef.current,    { y: 16 })
        gsap.set(ctaRef.current,     { y: 14, scale: 0.95 })

        const tl = gsap.timeline({ delay: 0.2 })

        tl.to(labelRef.current, {
            opacity: 1, x: 0,
            duration: 0.5, ease: "power3.out", clearProps: "transform",
        })
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
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <GridScan
                    className="w-full h-full"
                    linesColor="#2A1800"
                    lineThickness={1}
                    gridScale={0.1}
                    scanColor="#FE4D01"
                    scanOpacity={0.15}
                    scanGlow={0.15}
                    scanSoftness={1.5}
                    scanDirection="pingpong"
                    scanPhaseTaper={0.9}
                    scanDuration={4}
                    scanDelay={1}
                    enablePost={false}
                    bloomIntensity={0}
                    bloomThreshold={0}
                    bloomSmoothing={0}
                    chromaticAberration={0}
                    noiseIntensity={0.01}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-md">

                {/* Label */}
                <div className="flex items-center gap-3">
                    <span className="w-5 h-px bg-flame" />
                    <p ref={labelRef} className="text-[12px] uppercase tracking-[0.3em] text-flame">
                        Unexpected Error
                    </p>
                    <span className="w-5 h-px bg-flame" />
                </div>

                {/* Heading */}
                <h1 ref={headingRef} className="text-4xl lg:text-5xl font-black uppercase leading-tight">
                    Something Went{" "}
                    <span className="ghosted-text">Wrong.</span>
                </h1>

                {/* Description */}
                <p ref={descRef} className="text-sm text-muted-foreground leading-relaxed">
                    An unexpected error occurred. You can try again or go back to the home page.
                    {error.digest && (
                        <span className="block mt-2 text-xs text-muted-foreground/50 font-mono">
                            ID: {error.digest}
                        </span>
                    )}
                </p>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-2">
                    <button onClick={unstable_retry}>
                        <StarBorder as="div" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                            Try Again
                        </StarBorder>
                    </button>
                    <Link href="/">
                        <StarBorder as="div" className="cursor-pointer [&>div:last-child]:from-elevated [&>div:last-child]:to-surface [&>div:last-child]:border-divider [&>div:last-child]:text-foreground">
                            Go Home
                        </StarBorder>
                    </Link>
                </div>

            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-flame/30 to-transparent" />
        </div>
    )
}
