"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StatusPill, Tag } from "./shared";
import { EXPERIENCE } from "@/data/experience";
import type { ExperienceEntry } from "@/types/portfolio";

/**
 * SECTION 03 — WORK HISTORY: an interactive horizontal timeline.
 * A muted-blue track with Steel Blue and Powder Blue milestone nodes
 * spans the laptop screen; below it, one compact card per role.
 *
 * Expansion is synchronized: opening any card opens every card so the
 * full history reads as one spread, and closing any card collapses them
 * together.
 *
 * Each card also rides a slow "wind" drift — a looping sway that lifts,
 * leans, and settles again. Cards are staggered in duration and delay so
 * the three never move in lockstep, and the drift eases back to rest while
 * the pointer is over a card so its text stays put for reading. Skipped
 * entirely when the visitor prefers reduced motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Drift keyframes, in screen pixels and degrees. */
const WIND = {
  x: [0, 4, 0, -5, 0],
  y: [0, -7, 1, 5, 0],
  rotate: [0, 0.45, 0, -0.5, 0],
};

const REST = { x: 0, y: 0, rotate: 0 };

export function HorizontalExperienceTimeline() {
  const [allExpanded, setAllExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const toggle = () => setAllExpanded((current) => !current);

  return (
    <section
      id="experience"
      aria-label="Work History"
      className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 lg:px-16"
    >
      <header className="mb-10 space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-steel-blue/50" aria-hidden="true" />
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-steel-blue uppercase">
            03 / Experience
          </p>
        </div>
        <h2 className="max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-0.015em] text-primary text-balance sm:text-5xl">
          Work History
        </h2>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-secondary sm:text-base">
          Newest first along the timeline. Click any card to expand every role
          together and read the full history; click again to collapse it.
        </p>
      </header>

      {/* Horizontal timeline track — desktop only; mobile cards carry
          their own date badges. */}
      <div className="relative mt-12 hidden md:block">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[30px] border-t-2 border-muted-blue/40"
        />
        <ol className="relative grid grid-cols-3">
          {EXPERIENCE.map((entry, index) => (
            <TimelineNode key={entry.id} entry={entry} active={index === 0} />
          ))}
        </ol>
      </div>

      {/* Compact expandable cards, aligned under the timeline nodes. */}
      <ol className="grid grid-cols-1 items-start gap-6 md:mt-5 md:grid-cols-3">
        {EXPERIENCE.map((entry, index) => (
          <ExperienceCard
            key={entry.id}
            entry={entry}
            index={index}
            wind={!prefersReducedMotion}
            expanded={allExpanded}
            onToggle={toggle}
          />
        ))}
      </ol>
    </section>
  );
}

function TimelineNode({
  entry,
  active,
}: {
  entry: ExperienceEntry;
  active: boolean;
}) {
  return (
    <li className="flex flex-col items-center">
      <p className="flex h-4 items-end font-mono text-[10px] tracking-[0.14em] text-secondary">
        {entry.shortPeriod}
      </p>
      <span className="mt-2 flex flex-col items-center">
        <span
          aria-hidden="true"
          className={`relative block size-3.5 rounded-full border-2 transition-colors duration-300 ${
            active
              ? "border-steel-blue bg-steel-blue shadow-[0_0_0_4px_rgba(125,173,214,0.3)]"
              : "border-powder-blue bg-surface"
          }`}
        >
          {active ? (
            <span
              aria-hidden="true"
              className="soft-pulse absolute -top-1 -left-1 size-3.5 rounded-full bg-powder-blue/50"
            />
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="h-5 w-px bg-gradient-to-b from-muted-blue/40 to-transparent"
        />
      </span>
    </li>
  );
}

function ExperienceCard({
  entry,
  index,
  wind,
  expanded,
  onToggle,
}: {
  entry: ExperienceEntry;
  index: number;
  wind: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const drifting = wind && !hovered;

  return (
    <motion.li layout id={`role-${entry.id}`} className="min-w-0 scroll-mt-28">
      <motion.div
        animate={drifting ? WIND : REST}
        transition={
          drifting
            ? {
                duration: 11 + index * 1.7,
                delay: index * 0.9,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }
            : { duration: 0.45, ease: EASE }
        }
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="h-full"
      >
        <motion.article
          layout
          className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-surface shadow-tactile transition-colors duration-300 ${
            expanded
              ? "border-soft-blue shadow-lifted"
              : "border-slate-blue/18 hover:border-soft-blue/45"
          }`}
        >
          {/* Compact summary — the whole header is the toggle. */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`experience-details-${entry.id}`}
            className="flex w-full cursor-pointer flex-col items-start gap-3 p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-steel-blue"
          >
            <div className="flex w-full items-center justify-between gap-3">
              <StatusPill label={entry.period} tone={expanded ? "burgundy" : "navy"} />
              <span
                aria-hidden="true"
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-[13px] leading-none transition-colors duration-200 ${
                  expanded
                    ? "border-steel-blue bg-steel-blue text-on-accent"
                    : "border-slate-blue/20 bg-tint text-slate-blue"
                }`}
              >
                {expanded ? "−" : "+"}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-[21px] leading-[1.08] tracking-[-0.01em] text-primary">
                {entry.organization}
              </h3>
              <p className="text-[12.5px] font-semibold text-steel-blue">
                {entry.role}
              </p>
              {entry.location ? (
                <p className="text-[11px] font-medium text-secondary/80">
                  {entry.location}
                </p>
              ) : null}
            </div>

            <span
              className={`mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                expanded ? "text-steel-blue" : "text-secondary"
              }`}
            >
              {expanded ? "Collapse all roles −" : "Expand all roles +"}
            </span>
          </button>

          {/* Expanded role details */}
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key={`experience-details-${entry.id}`}
                id={`experience-details-${entry.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.34, ease: EASE }}
                className="overflow-hidden border-t border-slate-blue/12"
              >
                <div className="space-y-4 px-6 pt-4 pb-6">
                  <p className="text-[12.5px] leading-relaxed text-secondary">
                    {entry.summary}
                  </p>

                  <div>
                    <p className="font-mono text-[9.5px] font-medium tracking-[0.16em] text-slate-blue uppercase">
                      Responsibilities &amp; impact
                    </p>
                    <ul className="mt-2 space-y-2.5">
                      {entry.highlights.map((highlight) => {
                        const [label, ...rest] = highlight.split(":");
                        const body = rest.join(":").trim();
                        return (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-[12px] leading-relaxed text-secondary"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[7px] size-1 shrink-0 rounded-full bg-steel-blue"
                            />
                            <span>
                              <span className="font-semibold text-primary">
                                {label}:
                              </span>{" "}
                              {body}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <ul className="flex flex-wrap gap-1.5" aria-label="Skills applied">
                    {entry.skills.map((skill) => (
                      <li key={skill}>
                        <Tag>{skill}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.article>
      </motion.div>
    </motion.li>
  );
}
