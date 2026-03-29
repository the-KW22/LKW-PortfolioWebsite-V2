"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePageTransition } from "./PageTransitionProvider";

function GithubIcon({ size = 24, className }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

function LinkedinIcon({ size = 24, className }: { size?: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

const navLinks = [
    { label: "Home",     href: "/" },
    { label: "About Me", href: "/about-me" },
    { label: "Projects", href: "/projects" },
    { label: "Contact",  href: "/contact-me" },
];

const socialLinks = [
    { label: "GitHub",   href: process.env.NEXT_PUBLIC_GITHUB_URL ?? "#", icon: GithubIcon },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#", icon: LinkedinIcon },
    { label: "Email",    href: "mailto:kwenleow@gmail.com", icon: Mail },
];

export default function Footer() {
    const transitionTo = usePageTransition();

    return (
        <footer className="relative bg-surface border-t border-divider overflow-hidden">

            {/* Ghost watermark — decorative */}
            <div
                aria-hidden
                className="pointer-events-none select-none absolute bottom-0 right-0 translate-y-[20%] translate-x-[5%]"
            >
                <span className="block font-heading font-black uppercase leading-none text-[22vw] ghosted-text opacity-[0.04]">
                    KW22
                </span>
            </div>

            {/* Flame accent line at top */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-flame/40 to-transparent" />

            {/* ── Main grid ─────────────────────────────────────────── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16 pb-10 md:pb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">

                    {/* Col 1 — Brand */}
                    <div className="flex flex-col gap-5 md:gap-7">

                        {/* Logo */}
                        <button
                            onClick={() => transitionTo("/")}
                            className="flex items-center gap-2.5 w-fit group cursor-pointer"
                        >
                            <div className="relative w-7 h-7 shrink-0">
                                <Image
                                    src="/icons/kw22-logo-32x32.png"
                                    alt="KW22 Logo"
                                    fill
                                    sizes="28px"
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-heading font-bold text-sm tracking-[0.22em] uppercase text-foreground/60 group-hover:text-flame transition-colors duration-300">
                                KW22
                            </span>
                        </button>

                        {/* Tagline */}
                        <div className="flex flex-col gap-1.5">
                            <p className="text-[12px] uppercase tracking-[0.3em] text-muted-foreground/50">
                                Full Stack Developer
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-56">
                                Crafting clean, performant digital experiences from concept to deployment.
                            </p>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    aria-label={label}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-divider text-muted-foreground/40 hover:text-flame hover:border-flame/25 hover:bg-flame/5 transition-all duration-200"
                                >
                                    <Icon size={13} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Navigation */}
                    <div className="flex flex-col gap-6">
                        <p className="text-[12px] uppercase tracking-[0.3em] text-muted-foreground/50">
                            Navigation
                        </p>
                        <ul className="flex flex-col">
                            {navLinks.map(({ label, href }) => (
                                <li key={label} className="border-b border-divider last:border-b-0">
                                    <button
                                        onClick={() => transitionTo(href)}
                                        className="group w-full flex items-center justify-between cursor-pointer py-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        <span>{label}</span>
                                        <ArrowUpRight
                                            size={12}
                                            className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:text-flame transition-all duration-200"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Contact */}
                    <div className="flex flex-col gap-6">
                        <p className="text-[12px] uppercase tracking-[0.3em] text-muted-foreground/50">
                            Get in Touch
                        </p>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Open to freelance projects, collaborations, and full-time opportunities.
                        </p>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <p className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground/40">
                                Email
                            </p>
                            <Link
                                href="mailto:kwenleow@gmail.com"
                                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-flame transition-colors duration-200 w-fit"
                            >
                                kwenleow@gmail.com
                                <ArrowUpRight
                                    size={12}
                                    className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"
                                />
                            </Link>
                        </div>

                        
                    </div>

                </div>
            </div>

            {/* ── Bottom bar ─────────────────────────────────────────── */}
            <div className="relative z-10 border-t border-divider">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px] text-muted-foreground/35 tracking-wide">
                        © 2026 Leow Kai Wen. All rights reserved.
                    </p>
                    <p className="text-[12px] text-muted-foreground/35 tracking-wide">
                        Built with{" "}
                        <Link
                            href="https://nextjs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/55 hover:text-flame transition-colors duration-200"
                        >
                            Next.js
                        </Link>
                        {" · "}
                        <Link
                            href="https://tailwindcss.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/55 hover:text-flame transition-colors duration-200"
                        >
                            Tailwind CSS
                        </Link>
                    </p>
                </div>
            </div>

        </footer>
    );
}
