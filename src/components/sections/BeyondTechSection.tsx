"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionShell, Tag } from "./shared";
import { BEYOND_TECH } from "@/data/beyondtech";
import type { BeyondTechCard } from "@/types/portfolio";

/**
 * SECTION 05 — EXTRA-CURRICULARS & BEYOND TECH.
 * One uniform card grid: every entry uses the same template — index and
 * status at the top, title/subtitle/summary in the middle, and a tag row
 * pinned to the bottom. Cards with full write-ups (SustainLoop, Transcendent)
 * open an accessible detail modal with pillar grids and press links; the rest
 * read as role cards.
 */
export function BeyondTechSection() {
  const [activeCard, setActiveCard] = useState<BeyondTechCard | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActiveCard(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <SectionShell
      id="beyond"
      eyebrow="05 / Beyond Tech"
      title="Beyond the Build"
      intro={BEYOND_TECH.intro}
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {BEYOND_TECH.cards.map((card, index) => {
          const expandable = Boolean(card.details);

          const body = (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="font-serif text-2xl leading-none text-powder-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {card.badge ? (
                  <span className="order-first w-full rounded-full bg-steel-blue px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-on-accent uppercase shadow-tactile sm:order-none sm:w-auto sm:max-w-[72%] sm:text-right">
                    {card.badge}
                  </span>
                ) : expandable ? (
                  <span className="rounded-full border border-steel-blue/20 bg-steel-blue/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-steel-blue uppercase">
                    View details
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="mt-1 size-1.5 rounded-full bg-steel-blue/60"
                  />
                )}
              </div>

              <h3 className="mt-5 font-serif text-[23px] leading-[1.1] tracking-[-0.01em] text-primary text-balance">
                {card.title}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] font-medium tracking-[0.14em] text-steel-blue uppercase">
                {card.subtitle}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-secondary">
                {card.summary}
              </p>

              {card.tags.length > 0 ? (
                <ul
                  className="mt-auto flex flex-wrap gap-1.5 pt-5"
                  aria-label={`${card.title} tags`}
                >
                  {card.tags.map((tag) => (
                    <li key={tag}>
                      <Tag className="shadow-[var(--shadow-chip)]">{tag}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          );

          return (
            <li key={card.id} className="h-full">
              <article
                className={`group relative flex h-full flex-col rounded-2xl border border-slate-blue/18 bg-surface p-6 shadow-tactile transition-all duration-300 hover:-translate-y-1 hover:border-soft-blue/45 hover:shadow-lifted ${
                  expandable ? "cursor-pointer" : ""
                }`}
              >
                {body}

                {expandable ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setActiveCard(card);
                    }}
                    aria-haspopup="dialog"
                    aria-label={`View details: ${card.title}`}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
                  />
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {activeCard?.details ? (
          <DetailModal card={activeCard} onClose={close} />
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}

function DetailModal({
  card,
  onClose,
}: {
  card: BeyondTechCard;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-start justify-center overflow-y-auto bg-showcase/55 p-4 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="beyond-modal-title"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-blue/20 bg-surface shadow-lifted"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-blue/12 bg-tint/60 px-5 py-4 sm:px-6">
          <div>
            {card.badge ? (
              <span className="mb-2 inline-flex rounded-full bg-steel-blue px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-on-accent uppercase">
                {card.badge}
              </span>
            ) : null}
            <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-steel-blue uppercase">
              {card.subtitle}
            </p>
            <h3
              id="beyond-modal-title"
              className="mt-2 font-serif text-[25px] leading-[1.1] tracking-[-0.01em] text-primary text-balance sm:text-[29px]"
            >
              {card.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="btn btn-quiet shrink-0 rounded-full px-3 py-1.5 text-[12px]"
          >
            Close
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5 sm:px-6">
          <p className="text-[14px] leading-relaxed text-secondary">
            {card.summary}
          </p>

          {card.details?.progression ? (
            <div className="mt-5 rounded-xl border border-slate-blue/15 bg-tint/60 px-4 py-3">
              <p className="font-mono text-[10.5px] font-medium tracking-[0.16em] text-slate-blue uppercase">
                Progression
              </p>
              <p className="mt-1.5 text-[13.5px] font-semibold text-primary">
                {card.details.progression}
              </p>
            </div>
          ) : null}

          <div className="mt-6 space-y-5">
            {card.details?.sections.map((section) => (
              <section key={section.title}>
                <h4 className="font-mono text-[10.5px] font-medium tracking-[0.16em] text-steel-blue uppercase">
                  {section.title}
                </h4>
                {section.points.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[13.5px] leading-relaxed text-secondary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] size-1 shrink-0 rounded-full bg-steel-blue"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.pillars?.length ? (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {section.pillars.map((pillar, index) => (
                      <li
                        key={pillar.title}
                        className="rounded-xl border border-slate-blue/15 bg-tint/60 px-4 py-3"
                      >
                        <span className="font-serif text-lg leading-none text-powder-blue">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h5 className="mt-1.5 text-[13.5px] font-semibold text-primary">
                          {pillar.title}
                        </h5>
                        <p className="mt-1 text-[13px] leading-relaxed text-secondary">
                          {pillar.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {card.details?.media?.length ? (
            <div className="mt-6 border-t border-slate-blue/12 pt-5">
              <p className="font-mono text-[10.5px] font-medium tracking-[0.16em] text-steel-blue uppercase">
                {card.details.mediaLabel ?? "Media & press"}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {card.details.media.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-quiet inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-medium"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
