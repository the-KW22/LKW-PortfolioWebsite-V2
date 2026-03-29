"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface MotionAccordionItem {
  question: string;
  answer: string;
}

export interface MotionAccordionProps {
  items: MotionAccordionItem[];
  /** @default 10 */
  gap?: number;
  className?: string;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  itemId,
  panelId,
}: {
  item: MotionAccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  itemId: string;
  panelId: string;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = React.useState(0);

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContentH(el.scrollHeight));
    ro.observe(el);
    setContentH(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      layout
      className={cn(
        "overflow-hidden rounded-2xl bg-surface border transition-colors duration-200",
        isOpen ? "border-primary/20" : "border-divider",
      )}
      transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
      animate={{ scale: isOpen ? 1 : 0.995 }}
      initial={false}
      style={{ originX: 0.5, originY: 0 }}
    >
      <button
        id={itemId}
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full cursor-pointer select-none items-center justify-between gap-4 px-7 py-5 text-left"
      >
        <span className="text-base font-semibold leading-snug text-foreground">
          {item.question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
          className={cn("shrink-0 transition-colors duration-200", isOpen ? "text-primary" : "text-muted-foreground")}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden
          >
            <path
              d="M6.5 0v13M0 6.5h13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* Divider — only visible when open */}
      {isOpen && <span className="block h-px w-full bg-divider" />}

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={itemId}
        animate={{
          height: isOpen ? contentH : 0,
          opacity: isOpen ? 1 : 0,
        }}
        initial={false}
        transition={{
          height: { type: "spring", stiffness: 340, damping: 34, mass: 0.9 },
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          ref={contentRef}
          animate={{ y: isOpen ? 0 : -8 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 30,
            mass: 0.8,
          }}
          className="px-7 pb-7 pt-5"
        >
          <p className="text-base leading-7 text-muted-foreground">
            {item.answer}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function MotionAccordion({
  items,
  gap = 10,
  className,
}: MotionAccordionProps) {
  const rawId = React.useId();
  const baseId = `accordion-${rawId.replace(/:/g, "")}`;

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className={cn("w-full", className)}>
      <div
        className="flex flex-col"
        style={{ gap }}
      >
        {items.map((item, i) => (
          <AccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
            itemId={`${baseId}-trigger-${i}`}
            panelId={`${baseId}-panel-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
