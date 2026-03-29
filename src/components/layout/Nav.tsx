"use client"

/*
    NavPage — self-contained full-screen nav overlay component.
    Dependencies: gsap, @gsap/react, next/link, lucide-react
*/

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { usePageTransition } from "./PageTransitionProvider";
import Dither from "@/components/ui/Dither";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Projects", href: "/projects",},
  { label: "Contact", href: "/contact-me" },
]

const socialLinks = [
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#" },
  { label: "Github", href: process.env.NEXT_PUBLIC_GITHUB_URL ?? "#" },
  { label: "Resume", href: "/document/LeowKaiWen-Resume.pdf" },
];

const EMAIL = "kwenleow@gmail.com";

const STYLES = `
  .np-container *,
  .np-container *::before,
  .np-container *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  .np-container a,
  .np-container p {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    font-family: var(--font-sans);
  }

  /* ── Top nav bar ─────────────────────────────────────── */

  .np-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 1.5em 1.5rem;
    z-index: 100;
    will-change: transform;
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .np-bar-inner {
    max-width: 80rem;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .np-bar a {
    color: #F5F5F5;
  }

  .np-open {
    cursor: pointer;
  }

  .np-hamburger {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .np-hamburger span {
    display: block;
    width: 28px;
    height: 1.5px;
    background: #F5F5F5;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  /* ── Full-screen overlay ──────────────────────────────── */

  .np-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #141414;
    z-index: 110;
    display: flex;
    flex-direction: column;
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
    overflow: hidden;
  }

  .np-dither-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .np-overlay-bar,
  .np-content {
    position: relative;
    z-index: 1;
  }

  /* ── Overlay top bar ──────────────────────────────────── */

  .np-overlay-bar {
    width: 100%;
    padding: 1.5em 1.5rem;
    flex-shrink: 0;
  }

  .np-overlay-bar-inner {
    max-width: 80rem;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .np-overlay-bar a {
    color: #F5F5F5;
  }

  .np-close {
    cursor: pointer;
  }

  .np-close p {
    color: #A3A3A3;
    transition: color 0.2s ease;
  }

  .np-close:hover p {
    color: #F5F5F5;
  }

  /* ── Three-column content ─────────────────────────────── */

  .np-content {
    flex: 1;
    display: flex;
    padding: 0 1.5rem 2em;
    overflow: hidden;
  }

  .np-content-inner {
    max-width: 80rem;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex: 1;
    gap: 2em;
    overflow: hidden;
  }

  /* Left col: brand ghost block */
  .np-brand {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.6em;
  }

  .np-brand-ghost {
    font-size: 100px;
    color: transparent;
    -webkit-text-stroke: 1.5px #F5F5F5;
    line-height: 80%;
    opacity: 0.1;
    font-family: var(--font-heading);
    letter-spacing: -0.03em;
    text-transform: uppercase;
  }

  .np-brand-tagline {
    font-size: 11px;
    font-weight: 500;
    color: #A3A3A3;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: var(--font-sans);
  }

  /* Center col: nav links + info */
  .np-copy {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .np-links {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .np-link-item {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  .np-link-item-holder {
    position: relative;
    display: flex;
    align-items: baseline;
    gap: 0.75em;
  }

  .np-link-index {
    font-size: 13px;
    font-weight: 500;
    color: #FE4D0155;
    opacity: 0.8;
    letter-spacing: 0.02em;
    min-width: 2em;
    padding-bottom: 0.2em;
    transition: opacity 0.2s ease, color 0.2s ease;
    font-family: var(--font-sans);
  }

  .np-link-item-holder a {
    color: #F5F5F5;
    font-size: 80px;
    font-weight: 400;
    letter-spacing: -0.03em;
    line-height: 85%;
    transition: opacity 0.2s ease;
    font-family: var(--font-heading);
    cursor: pointer;
  }

  .np-link-item-holder:hover > a {
    opacity: 0.35;
  }

  .np-link-item-holder:hover .np-link-index {
    opacity: 1;
    color: #FE4D01;
  }

  /* Chevron toggle */
  .np-chevron {
    display: inline-flex;
    align-items: center;
    align-self: center;
    padding: 0.2em;
    color: rgba(254, 77, 1, 0.45);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
    cursor: pointer;
    flex-shrink: 0;
  }

  .np-chevron.open {
    transform: rotate(180deg);
    color: #FE4D01;
  }

  .np-chevron:hover {
    color: #FE4D01;
  }

  /* Sublinks accordion */
  .np-sublinks {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease;
    padding-left: 3.2em;
    margin-top: 0;
  }

  .np-sublinks.open {
    max-height: 400px;
    opacity: 1;
    margin-top: 0.6em;
  }

  .np-sublink-group {
    margin-bottom: 0.75em;
  }

  .np-sublink-label {
    font-size: 15px;
    font-weight: 500;
    color: #A3A3A3;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--font-sans);
    margin-bottom: 0.4em;
    display: block;
  }

  .np-sublink-children {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    padding-left: 0.75em;
    border-left: 1px solid #FE4D0133;
  }

  .np-child-link {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: #A3A3A3 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em;
    font-family: var(--font-sans) !important;
    transition: color 0.2s ease !important;
    line-height: 1.4 !important;
  }

  .np-child-link:hover {
    color: #F5F5F5 !important;
  }

  /* Info row */
  .np-info {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }

  .np-social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3em 1em;
  }

  .np-contact-col {
    display: flex;
    flex-direction: column;
    gap: 0.35em;
  }

  .np-info-col a,
  .np-info-col p,
  .np-social-links a,
  .np-contact-col a,
  .np-contact-col p {
    color: #A3A3A3;
    transition: color 0.2s ease;
    font-family: var(--font-sans);
  }

  .np-social-links a:hover,
  .np-info-col a:hover,
  .np-contact-col a:hover {
    color: #F5F5F5;
  }

  .np-email {
    text-transform: none !important;
  }

  .np-social-links a span {
    color: #FE4D01;
  }

  /* Right col: availability */
  .np-availability {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 0.5em;
  }

  .np-availability-status {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .np-availability-status p {
    color: #F5F5F5;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    font-family: var(--font-sans);
  }

  .np-availability-role {
    font-size: 11px !important;
    font-weight: 400 !important;
    color: #A3A3A3 !important;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: var(--font-sans) !important;
  }

  /* ── Responsive ───────────────────────────────────────── */

  @media (min-width: 1024px) {
    .np-bar          { padding-left: 4rem; padding-right: 4rem; }
    .np-overlay-bar  { padding-left: 4rem; padding-right: 4rem; }
    .np-content      { padding-left: 4rem; padding-right: 4rem; }
  }

  @media (max-width: 900px) {
    .np-brand {
      display: none;
    }

    .np-content {
      padding-top: 1em;
    }

    .np-link-item-holder a {
      font-size: 52px;
    }

    .np-availability {
      display: none;
    }
  }
`;

export default function Nav() {
  const container = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const transitionTo = usePageTransition();

  // ── Scroll hide / reveal ─────────────────────────────────
  useEffect(() => {
    let lastY = window.scrollY;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;

      if (y > lastY && y > 80 && !hidden) {
        // Scrolling down — slide bar out
        gsap.to(barRef.current, { y: "-120%", duration: 0.4, ease: "power2.out" });
        hidden = true;
      } else if (y < lastY && hidden) {
        // Scrolling up — reveal bar
        gsap.to(barRef.current, { y: "0%", duration: 0.4, ease: "power2.out" });
        hidden = false;
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Menu open / close ────────────────────────────────────
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setExpandedIndex(null);
  };

  const toggleSublinks = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  useGSAP(() => {
    gsap.set(".np-link-item-holder", { y: 75 });

    tl.current = gsap.timeline({ paused: true })
      .to(".np-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(".np-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
      }, "-=0.75");
  }, { scope: container });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="np-container" ref={container}>
      <style>{STYLES}</style>

      {/* Top Nav Bar */}
      <div className="np-bar" ref={barRef}>
        <div className="np-bar-inner">
          <div className="np-logo">
            <button onClick={() => transitionTo("/")} className="flex items-center gap-2">
              <div className="flex items-center text-foreground/75 cursor-pointer hover:text-flame transition-colors duration-300">
                <div className="relative w-8 h-8 shrink-0">
                  <Image src="/icons/kw22-logo-32x32.png" alt="KW22 Logo" width={30} height={30} />
                </div>
                <span className="text-md font-bold tracking-[0.22em] uppercase">
                  KW22
                </span>
              </div>
            </button>
          </div>
          <div className="np-open" onClick={toggleMenu}>
            <div className="np-hamburger">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Overlay */}
      <div className="np-overlay" style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}>

        {/* Dither background */}
        <div className="np-dither-bg">
          <Dither
            waveSpeed={0.05}
            waveFrequency={1.5}
            waveAmplitude={0.3}
            waveColor={[0.2, 0.2, 0.2]}
            colorNum={4}
            pixelSize={2}
            enableMouseInteraction={true}
          />
        </div>

        {/* Overlay Top Bar */}
        <div className="np-overlay-bar">
          <div className="np-overlay-bar-inner">
            <div className="np-logo">
              <button onClick={() => transitionTo("/")} className="flex items-center gap-2">
                <div className="flex items-center text-foreground/75 hover:text-flame transition-colors duration-300">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image src="/icons/kw22-logo-32x32.png" alt="KW22 Logo" width={30} height={30} />
                  </div>
                  <span className="text-md font-bold tracking-[0.22em] uppercase">
                    KW22
                  </span>
                </div>
              </button>
            </div>
            <div className="np-close" onClick={toggleMenu}>
              <p>&#x2715;</p>
            </div>
          </div>
        </div>

        {/* Three Column Content */}
        <div className="np-content">
          <div className="np-content-inner">

            {/* Left col: brand ghost */}
            <div className="np-brand">
              <p className="np-brand-ghost">KW22</p>
              <p className="np-brand-tagline">Portfolio — 2026</p>
            </div>

            {/* Center col: nav links + info */}
            <div className="np-copy">
              <div className="np-links">
                {navLinks.map((link, index) => (
                  <div key={index} className="np-link-item">
                    <div className="np-link-item-holder">
                      <span className="np-link-index">0{index + 1}</span>
                      {/* Main link — always navigates */}
                      <Link href={link.href} className="np-link" onClick={toggleMenu}>
                        {link.label}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="np-info">
                <div className="np-contact-col">
                  <p className="np-email">{EMAIL}</p>
                </div>
                <div className="np-social-links">
                  {socialLinks.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label} <span>&#8599;</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col: availability status */}
            <div className="np-availability">
              <div className="np-availability-status max-w-75 text-end">
                <p>Open for full-time opportunities and freelance projects</p>
              </div>
              <p className="np-availability-role">Full Stack Developer</p>
            </div>

          </div>{/* /np-content-inner */}
        </div>
      </div>

    </div>
  )
}
