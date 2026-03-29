'use client'

import { useState, useEffect, useRef } from "react"
import { Mail, MapPin, Clock, Check, ArrowRight, FileText } from "lucide-react"
import { GridScan } from "@/components/ui/GridScan"
import gsap from "gsap"

type FormStatus = 'idle' | 'sending' | 'sent'

function GithubIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}

const SOCIAL = [
    { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL ?? '#', Icon: GithubIcon },
    { label: 'Resume', href: '/document/LeowKaiWen-Resume.pdf', Icon: FileText },
    { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#", Icon: LinkedinIcon },
    { label: 'Email', href: 'mailto:kwenleow@gmail.com', Icon: Mail },
]

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<FormStatus>('idle')

    const labelLineRef = useRef<HTMLSpanElement>(null)
    const labelTextRef = useRef<HTMLParagraphElement>(null)
    const headingRef   = useRef<HTMLHeadingElement>(null)
    const descRef      = useRef<HTMLParagraphElement>(null)
    const infoPanelRef = useRef<HTMLDivElement>(null)
    const formRef      = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const els = [
            labelLineRef.current,
            labelTextRef.current,
            headingRef.current,
            descRef.current,
            infoPanelRef.current,
            formRef.current,
        ].filter(Boolean)

        gsap.set(els, { opacity: 0 })
        gsap.set([labelLineRef.current, labelTextRef.current], { x: -16 })
        gsap.set(headingRef.current,   { y: 24 })
        gsap.set(descRef.current,      { y: 16 })
        gsap.set(infoPanelRef.current, { x: -40 })
        gsap.set(formRef.current,      { x: 40 })

        const tl = gsap.timeline({ delay: 0.3 })

        // 1. Label slides in from left
        tl.to([labelLineRef.current, labelTextRef.current], {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
            clearProps: "transform",
        })

        // 2. Heading fades up
        tl.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            clearProps: "transform",
        }, "-=0.25")

        // 3. Description fades up
        tl.to(descRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "transform",
        }, "-=0.2")

        // 4. Info panel slides in from left + form from right — simultaneously
        tl.to(infoPanelRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform",
        }, "-=0.15")

        tl.to(formRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform",
        }, "<")

        return () => { tl.kill() }
    }, [])

    function handleSubmit(e: { preventDefault(): void }) {
        e.preventDefault()
        setStatus('sending')
        window.location.href =
            `mailto:kwenleow@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`
        setTimeout(() => setStatus('sent'), 800)
    }

    const inputClass =
        'w-full bg-elevated border border-divider rounded-xl px-4 py-3 text-sm text-foreground ' +
        'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-flame/40 ' +
        'focus:border-flame/40 transition-colors duration-200'

    return (
        <section id="contact" className="justify-center items-center relative pt-20 pb-16 md:pb-24 px-4 sm:px-6 overflow-hidden">

            {/* GridScan background */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <GridScan
                    className="w-full h-full"
                    linesColor="#2A1800"
                    lineThickness={1}
                    gridScale={0.1}
                    scanColor="#FE4D01"
                    scanOpacity={0.2}
                    scanGlow={0.2}
                    scanSoftness={1.5}
                    scanDirection="pingpong"
                    scanPhaseTaper={0.9}
                    scanDuration={3}
                    scanDelay={1}
                    enablePost={true}
                    bloomIntensity={0.5}
                    bloomThreshold={0.2}
                    bloomSmoothing={0.4}
                    chromaticAberration={0.001}
                    noiseIntensity={0.015}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10 md:gap-14">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex items-center gap-3">
                        <span ref={labelLineRef} className="w-5 h-px bg-flame" />
                        <p ref={labelTextRef} className="text-[16px] uppercase tracking-[0.3em] text-flame">Contact</p>
                        <span className="w-5 h-px bg-flame" />
                    </div>

                    <h1 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight">
                        Get in{' '}
                        <span className="ghosted-text">Touch.</span>
                    </h1>

                    <p ref={descRef} className="text-base text-muted-foreground leading-relaxed max-w-md">
                        Have an opportunity, project, or just want to say hello?
                        Fill out the form and I&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                {/* 2-col: info panel + form */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-start">

                    {/* ── Left: Info panel ── */}
                    <div ref={infoPanelRef} className="rounded-2xl h-full bg-surface border border-divider p-6 flex flex-col justify-between">

                        {/* Availability */}
                        <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                            </span>
                            <span className="text-xs font-medium text-success tracking-wide">Available for hire</span>
                        </div>

                        <div className="h-px bg-divider" />

                        {/* Meta info */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="shrink-0 rounded-lg bg-elevated border border-divider p-2">
                                    <MapPin size={14} />
                                </span>
                                Based in Kuala Lumpur, Malaysia
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="shrink-0 rounded-lg bg-elevated border border-divider p-2">
                                    <Clock size={14} />
                                </span>
                                Usually responds within 24H
                            </div>
                        </div>

                        <div className="h-px bg-divider" />

                        {/* Social / contact links */}
                        <div className="grid grid-cols-2 gap-3">
                            {SOCIAL.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? '_blank' : undefined}
                                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    <span className="shrink-0 rounded-lg bg-elevated border border-divider p-2 group-hover:border-primary/20 transition-colors duration-200">
                                        <Icon size={14} />
                                    </span>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="rounded-2xl bg-surface border border-divider p-6 flex flex-col gap-5"
                    >
                        {/* Notice banner */}
                        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                            <Mail size={14} className="shrink-0 text-amber-400" />
                            <p className="text-sm text-amber-300/90 leading-relaxed">
                                This form is currently not operational. Please reach me directly at{' '}
                                <a href="mailto:kwenleow@gmail.com" className="underline underline-offset-2 hover:text-amber-200 transition-colors">
                                    kwenleow@gmail.com
                                </a>
                            </p>
                        </div>

                        {/* Name + Email row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="grid grid-cols-1">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Job Opportunity / Say Hi"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Message
                            </label>
                            <textarea
                                required
                                rows={6}
                                placeholder="Tell me about your opportunity or project..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className="w-full flex items-center justify-center gap-2 bg-flame hover:bg-ember disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                        >
                            {status === 'sent' ? (
                                <>
                                    <Check size={15} />
                                    Message Sent!
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <ArrowRight size={15} />
                                </>
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </section>
    )
}
