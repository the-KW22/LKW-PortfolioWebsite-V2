"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLenis } from "lenis/react";
import BorderGlow from "@/components/ui/BorderGlow";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  category?: string;
  media: MediaItem[];
  description?: string;
  fullPageScreenshot?: string;
  tags?: string[];
  liveUrl?: string;
  note?: string;
}

interface MediaCarouselProps {
  items: CarouselItem[];
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 55 : -55,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 290, damping: 30, mass: 0.85 },
      opacity: { duration: 0.2, ease: "easeOut" },
      scale: { type: "spring", stiffness: 290, damping: 30 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { duration: 0.16, ease: "easeIn" },
      opacity: { duration: 0.14, ease: "easeIn" },
      scale: { duration: 0.16 },
    },
  }),
};

const ASPECT_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
} as const;

// ─── MediaSlide ───────────────────────────────────────────────────────────────

function MediaSlide({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video") {
      videoRef.current?.play().catch(() => { });
    }
  }, [item.src, item.type]);

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <img
      src={item.src}
      alt=""
      draggable={false}
      className="absolute inset-0 w-full h-full object-cover select-none"
    />
  );
}

// ─── DetailModal ──────────────────────────────────────────────────────────────

function DetailModal({ item, onClose }: { item: CarouselItem; onClose: () => void }) {
  const [mediaIdx, setMediaIdx] = useState(0);
  const lenis = useLenis();

  // Stop Lenis (page scroll) while modal is open, resume on close
  useEffect(() => {
    lenis?.stop();
    return () => { lenis?.start(); };
  }, [lenis]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (item.media.length > 1) {
        if (e.key === "ArrowLeft") setMediaIdx(p => (p - 1 + item.media.length) % item.media.length);
        if (e.key === "ArrowRight") setMediaIdx(p => (p + 1) % item.media.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [item.media.length, onClose]);

  return (
    <motion.div
      key="detail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(10,10,10,0.88)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative w-full max-w-[660px] max-h-[90vh] overflow-y-auto rounded-2xl border border-divider flame-scrollbar"
        style={{ background: "#141414" }}
        data-lenis-prevent
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-elevated border border-divider text-muted-foreground flex items-center justify-center transition-all duration-150 hover:bg-flame hover:border-flame hover:text-white cursor-pointer"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {/* Media viewer */}
        {/* <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-page">
          <AnimatePresence mode="wait">
            <motion.div
              key={mediaIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <MediaSlide item={item.media[mediaIdx]} />
            </motion.div>
          </AnimatePresence>

          {item.media.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(10,10,10,0.65)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <button
                aria-label="Previous screenshot"
                onClick={() => setMediaIdx(p => (p - 1 + item.media.length) % item.media.length)}
                className="flex items-center justify-center w-5 h-5 transition-colors duration-150 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FE4D01")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <ChevronLeft size={13} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-1.5">
                {item.media.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Screenshot ${i + 1}`}
                    onClick={() => setMediaIdx(i)}
                    className="rounded-full border-0 p-0 cursor-pointer transition-all duration-300"
                    style={{
                      width: i === mediaIdx ? "16px" : "5px",
                      height: "5px",
                      background: i === mediaIdx ? "#FE4D01" : "rgba(255,255,255,0.45)",
                    }}
                  />
                ))}
              </div>

              <button
                aria-label="Next screenshot"
                onClick={() => setMediaIdx(p => (p + 1) % item.media.length)}
                className="flex items-center justify-center w-5 h-5 transition-colors duration-150 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FE4D01")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                <ChevronRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div> */}

        {/* Content */}
        <div className="p-6">
          {/* ID + Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-body text-xs font-bold tracking-[0.15em] uppercase text-flame">
              {item.id}
            </span>
            {item.category && (
              <>
                <span className="w-[3px] h-[3px] rounded-full bg-divider" />
                <span className="font-body text-xs font-bold tracking-[0.14em] uppercase text-muted-foreground">
                  {item.category}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h2
            className="font-heading font-black uppercase text-foreground leading-tight mb-4"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
          >
            {item.title}
          </h2>

          {/* Description */}
          {item.description && (
            <p className="font-body text-[15px] leading-[1.8] text-muted-foreground mb-5">
              {item.description}
            </p>
          )}



          {/* Tech Stack */}
          {item.tags && item.tags.length > 0 && (
            <div className="mb-5">
              <span className="font-body text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/50 block mb-2.5">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-body text-xs font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md bg-elevated border border-divider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full-page screenshot */}
          {item.fullPageScreenshot && (
            <div className="mb-5">
              <span className="font-body text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/50 block mb-2.5">
                Full Page Preview
              </span>
              <div className="overflow-hidden rounded-xl border border-divider">
                <img
                  src={item.fullPageScreenshot}
                  alt={`${item.title} full page screenshot`}
                  draggable={false}
                  className="w-full h-auto block select-none"
                />
              </div>
            </div>
          )}

          {/* Note */}
          {item.note && (
            <div className="flex items-center gap-2.5 bg-elevated border border-divider border-l-[3px] border-l-flame rounded-md px-3.5 py-2.5 mb-5">
              <span className="font-body text-[11px] text-flame font-bold tracking-[0.06em] shrink-0 mt-px">
                NOTE
              </span>
              <span className="font-body text-sm leading-[1.65] text-muted-foreground/70">
                {item.note}
              </span>
            </div>
          )}

          {/* Live Preview */}
          <div className="flex justify-center pt-1">
            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-flame text-white rounded-lg font-body text-[11px] font-bold tracking-[0.1em] uppercase no-underline transition-all duration-200 hover:bg-ember hover:-translate-y-px active:bg-deep-flame active:translate-y-0"
              >
                Live Preview
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : (
              <span className="font-body text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground/40">
                No live preview available
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MediaCarousel ────────────────────────────────────────────────────────────

export default function MediaCarousel({
  items,
  className = "",
  aspectRatio = "video",
}: MediaCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mediaIdx, setMediaIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const item = items[activeIdx];

  useEffect(() => { setMounted(true); }, []);

  // Auto-cycle images
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const images = item.media.filter(m => m.type === "image");
    if (images.length < 2) return;
    timerRef.current = setInterval(() => {
      setMediaIdx(prev => (prev + 1) % item.media.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeIdx, item.media]);

  useEffect(() => { setMediaIdx(0); }, [activeIdx]);

  const navigate = useCallback((dir: "prev" | "next") => {
    if (isTransitioning || detailOpen) return;
    setIsTransitioning(true);
    setDirection(dir === "next" ? 1 : -1);
    setActiveIdx(prev =>
      dir === "next"
        ? (prev + 1) % items.length
        : (prev - 1 + items.length) % items.length
    );
  }, [isTransitioning, detailOpen, items.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (detailOpen) return;
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate, detailOpen]);

  return (
    <>
      <div className={`relative w-full ${className}`} style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationComplete={(def) => {
              if ((def as string) === "center") setIsTransitioning(false);
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
              {/* Media area */}
              <div className={`relative w-full ${ASPECT_CLASS[aspectRatio]} overflow-hidden rounded-t-[16px]`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeIdx}-${mediaIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <MediaSlide item={item.media[mediaIdx]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Title + Details row */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-divider">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[11px] font-bold tracking-[0.15em] uppercase text-flame leading-none">
                      {item.id}
                    </span>
                    {item.category && (
                      <>
                        <span className="w-[3px] h-[3px] rounded-full bg-divider shrink-0" />
                        <span className="font-body text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground leading-none">
                          {item.category}
                        </span>
                      </>
                    )}
                  </div>
                  <h3
                    className="font-heading font-black uppercase text-foreground leading-tight"
                    style={{ fontSize: "clamp(1rem, 2.4vw, 1.5rem)" }}
                  >
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={() => setDetailOpen(true)}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-body text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-200 hover:scale-[1.04] active:scale-100 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "#F5F5F5",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#FE4D01";
                    e.currentTarget.style.borderColor = "#FE4D01";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  }}
                >
                  Details
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </BorderGlow>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail modal portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {detailOpen && (
            <DetailModal
              key="detail-modal"
              item={item}
              onClose={() => setDetailOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
