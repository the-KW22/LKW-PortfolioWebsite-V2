"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export interface Project {
  id: string;
  category: string;
  title: string;
  images: string[];
  description: string;
  tags: string[];
  liveUrl: string;
  note: string | null;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    rotateY: direction > 0 ? 30 : -30,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x:       { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      rotateY: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 },
      opacity: { duration: 0.22, ease: "easeOut" },
      scale:   { type: "spring", stiffness: 300, damping: 30 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    rotateY: direction > 0 ? -30 : 30,
    opacity: 0,
    scale: 0.94,
    transition: {
      x:       { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      rotateY: { type: "spring", stiffness: 260, damping: 28, mass: 0.8 },
      opacity: { duration: 0.18, ease: "easeIn" },
      scale:   { duration: 0.22, ease: "easeIn" },
    },
  }),
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIdx, setActiveIdx]         = useState(0);
  const [direction, setDirection]         = useState<1 | -1>(1);
  const [imgIdx, setImgIdx]               = useState(0);
  const [imgTransition, setImgTransition] = useState(false);
  const [isChanging, setIsChanging]       = useState(false);
  const [lightboxOpen, setLightboxOpen]   = useState(false);
  const [lightboxIdx, setLightboxIdx]     = useState(0);
  const timerRef                          = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef                        = useRef<HTMLElement>(null);
  const carouselRef                       = useRef<HTMLDivElement>(null);

  const project = projects[activeIdx];

  // Body scroll lock while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  // Auto-advance inner image slider
  useEffect(() => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setImgTransition(true);
      setTimeout(() => {
        setImgIdx((prev) => (prev + 1) % project.images.length);
        setImgTransition(false);
      }, 320);
    }, 5000);
    return () => { if (timerRef.current !== null) clearInterval(timerRef.current); };
  }, [activeIdx, project.images.length]);

  const changeProject = useCallback(
    (dir: "next" | "prev") => {
      if (isChanging) return;
      setIsChanging(true);
      setDirection(dir === "next" ? 1 : -1);
      setActiveIdx((prev) =>
        dir === "next"
          ? (prev + 1) % projects.length
          : (prev - 1 + projects.length) % projects.length
      );
      setImgIdx(0);
    },
    [isChanging, projects.length]
  );

  const jumpToProject = useCallback(
    (targetIdx: number) => {
      if (isChanging || targetIdx === activeIdx) return;
      setIsChanging(true);
      setDirection(targetIdx > activeIdx ? 1 : -1);
      setActiveIdx(targetIdx);
      setImgIdx(0);
    },
    [isChanging, activeIdx]
  );

  const changeImg = (dir: "next" | "prev") => {
    if (imgTransition) return;
    if (timerRef.current !== null) clearInterval(timerRef.current);
    setImgTransition(true);
    setTimeout(() => {
      setImgIdx((prev) =>
        dir === "next"
          ? (prev + 1) % project.images.length
          : (prev - 1 + project.images.length) % project.images.length
      );
      setImgTransition(false);
    }, 320);
  };

  const goToImg = (i: number) => {
    if (i === imgIdx || imgTransition) return;
    if (timerRef.current !== null) clearInterval(timerRef.current);
    setImgTransition(true);
    setTimeout(() => {
      setImgIdx(i);
      setImgTransition(false);
    }, 320);
  };

  // Carousel keyboard nav — disabled when lightbox is open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") changeProject("prev");
      if (e.key === "ArrowRight") changeProject("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [changeProject, lightboxOpen]);

  // Lightbox keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setLightboxIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
      if (e.key === "ArrowRight")
        setLightboxIdx((prev) => (prev + 1) % project.images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, project.images.length]);

  const openLightbox = () => {
    setLightboxIdx(imgIdx);
    setLightboxOpen(true);
  };

  // Scroll-triggered entrance for the whole carousel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 48, scale: 0.97 });
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out", clearProps: "transform" });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Lightbox portal ──────────────────────────────────────────────────
  const lightbox = (
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-page/92 backdrop-blur-xl"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-none">
            {/* Project title + counter */}
            <div className="flex items-center gap-3">
              <span className="font-body textbase font-bold tracking-[0.12em] text-flame uppercase">
                {project.id}
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-divider" />
              <span className="font-body text-base font-bold uppercase tracking-[0.1em] text-muted-foreground">
                {project.title}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-3 right-5 z-10 pointer-events-auto w-9 h-9 rounded-full bg-elevated border border-divider text-muted-foreground flex items-center justify-center transition-all duration-150 hover:bg-flame hover:border-flame hover:text-white"
            aria-label="Close lightbox"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>


          {/* Image */}
          <motion.div
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative max-w-[88vw] max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIdx}
                src={project.images[lightboxIdx]}
                alt={`${project.title} screenshot ${lightboxIdx + 1}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="block max-w-[88vw] max-h-[80vh] w-auto h-auto object-contain rounded-2xl"
              />
            </AnimatePresence>
          </motion.div>

          {/* Combined pill control for lightbox */}
          {project.images.length > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background:     "rgba(10,10,10,0.65)",
                backdropFilter: "blur(10px)",
                border:         "1px solid rgba(255,255,255,0.1)",
                boxShadow:      "0 2px 12px rgba(0,0,0,0.4)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Previous image"
                onClick={() => setLightboxIdx((prev) => (prev - 1 + project.images.length) % project.images.length)}
                className="flex items-center justify-center rounded-full transition-colors duration-200"
                style={{ width: "22px", height: "22px", color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FE4D01")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <ChevronLeft size={14} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => setLightboxIdx(i)}
                    className="rounded-full transition-all duration-300 border-0 p-0 cursor-pointer"
                    style={{
                      width:      i === lightboxIdx ? "18px" : "6px",
                      height:     "6px",
                      background: i === lightboxIdx ? "#FE4D01" : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>

              <button
                aria-label="Next image"
                onClick={() => setLightboxIdx((prev) => (prev + 1) % project.images.length)}
                className="flex items-center justify-center rounded-full transition-colors duration-200"
                style={{ width: "22px", height: "22px", color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FE4D01")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      ref={sectionRef}
      id="project-carousel"
      className="min-h-screen bg-page flex items-center justify-center py-16 px-4 sm:px-6 lg:px-16"
    >
      {/* Lightbox portal — typeof window guard prevents SSR access to document.body */}
      {lightboxOpen && typeof window !== "undefined" && createPortal(lightbox, document.body)}

      {/* Carousel root */}
      <div ref={carouselRef} className="relative w-full max-w-[860px]">

        {/* Floating prev button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 z-10 -left-[58px] w-11 h-11 rounded-full bg-elevated border border-divider text-foreground flex items-center justify-center cursor-pointer outline-none transition-all duration-200 hover:bg-flame hover:border-flame hover:scale-[1.08] active:bg-deep-flame disabled:opacity-30 disabled:cursor-not-allowed max-sm:left-1 max-sm:top-auto max-sm:bottom-[-60px] max-sm:translate-y-0"
          onClick={() => changeProject("prev")}
          disabled={isChanging}
          aria-label="Previous project"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Floating next button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 z-10 -right-[58px] w-11 h-11 rounded-full bg-elevated border border-divider text-foreground flex items-center justify-center cursor-pointer outline-none transition-all duration-200 hover:bg-flame hover:border-flame hover:scale-[1.08] active:bg-deep-flame disabled:opacity-30 disabled:cursor-not-allowed max-sm:right-1 max-sm:top-auto max-sm:bottom-[-60px] max-sm:translate-y-0"
          onClick={() => changeProject("next")}
          disabled={isChanging}
          aria-label="Next project"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 3D card wrapper */}
        <div style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationComplete={(def) => {
                if ((def as string) === "center") setIsChanging(false);
              }}
            >

              <BorderGlow
                className="w-full"
                backgroundColor="#141414"
                borderRadius={16}
                colors={["#FE4D01", "#FF7A3D", "#C43A00"]}
                glowColor="18 99 50"
                glowIntensity={0.9}
              >

              {/* Upper card — image */}
              <div className="rounded-t-[16px] overflow-hidden">

                {/* Padded image wrapper */}
                <div className="p-4 pb-0">

                {/* Image area */}
                <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-page group cursor-zoom-in">
                  <img
                    className={`w-full h-full object-cover block transition-opacity duration-300 ${imgTransition ? "opacity-0" : "opacity-100"}`}
                    src={project.images[imgIdx]}
                    alt={`${project.title} screenshot ${imgIdx + 1}`}
                    onClick={openLightbox}
                  />

                  {/* Expand hint — shown on hover */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-page/70 border border-white/10 backdrop-blur-sm">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-foreground">
                        <path d="M1 4.5V1H4.5M7.5 1H11V4.5M11 7.5V11H7.5M4.5 11H1V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-body text-xs font-bold uppercase tracking-[0.1em] text-foreground/80">
                        View
                      </span>
                    </div>
                  </div>

                  {/* Combined pill control — prev / dots / next */}
                  {project.images.length > 1 && (
                    <div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{
                        background:     "rgba(10,10,10,0.65)",
                        backdropFilter: "blur(10px)",
                        border:         "1px solid rgba(255,255,255,0.1)",
                        boxShadow:      "0 2px 12px rgba(0,0,0,0.4)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        aria-label="Previous image"
                        onClick={() => changeImg("prev")}
                        className="flex items-center justify-center rounded-full transition-colors duration-200"
                        style={{ width: "22px", height: "22px", color: "rgba(255,255,255,0.7)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FE4D01")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                      >
                        <ChevronLeft size={14} strokeWidth={2.5} />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to image ${i + 1}`}
                            onClick={() => goToImg(i)}
                            className="rounded-full transition-all duration-300 border-0 p-0 cursor-pointer"
                            style={{
                              width:      i === imgIdx ? "18px" : "6px",
                              height:     "6px",
                              background: i === imgIdx ? "#FE4D01" : "rgba(255,255,255,0.45)",
                            }}
                          />
                        ))}
                      </div>

                      <button
                        aria-label="Next image"
                        onClick={() => changeImg("next")}
                        className="flex items-center justify-center rounded-full transition-colors duration-200"
                        style={{ width: "22px", height: "22px", color: "rgba(255,255,255,0.7)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FE4D01")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                      >
                        <ChevronRight size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>
                </div>{/* end padded image wrapper */}

                {/* Meta bar — ID + category only */}
                <div className="flex items-center gap-3 px-6 py-3 border-t border-divider">
                  <span className="text-sm font-bold tracking-[0.12em] text-flame font-body">
                    {project.id}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-divider shrink-0" />
                  <span className="text-sm font-bold tracking-[0.14em] uppercase text-muted-foreground font-body">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Lower card — details */}
              <div className="border-t border-divider p-6 min-h-[200px]">

                {/* Title */}
                <motion.h3
                  className="font-heading font-black uppercase text-foreground leading-tight mb-3"
                  style={{ fontSize: "clamp(1.35rem, 2.8vw, 1.9rem)" }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  className="text-base leading-[1.75] text-muted-foreground mb-[18px] font-body"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.18 }}
                >
                  {project.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-[7px] mb-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.26 }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="items-center justify-center text-xs font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md bg-elevated border border-divider text-muted-foreground font-body"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Bottom row */}
                <motion.div
                  className="flex items-center justify-between gap-4 flex-wrap"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.32 }}
                >

                  {project.note ? (
                    <div className="flex-1 min-w-0 flex items-center gap-2.5 bg-elevated border border-divider border-l-[3px] border-l-flame rounded-md px-3.5 py-2.5">
                      <span className="text-[11px] text-flame shrink-0 mt-px font-bold tracking-[0.06em] font-body">
                        NOTE
                      </span>
                      <span className="text-sm leading-[1.65] text-muted-foreground/60 font-body">
                        {project.note}
                      </span>
                    </div>
                  ) : (
                    <div className="flex-1" />
                  )}

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-flame text-white rounded-lg font-body text-[11px] font-bold tracking-[0.1em] uppercase no-underline whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-ember hover:-translate-y-px active:bg-deep-flame active:translate-y-0"
                  >
                    Live Demo
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </motion.div>

              </div>

              </BorderGlow>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 justify-center mt-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToProject(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-0.5 flex-1 rounded-sm cursor-pointer transition-colors duration-200 max-w-12 border-0 p-0 ${i === activeIdx ? "bg-flame" : "bg-divider hover:bg-muted-foreground/40"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
