"use client";

import { SectionShell, Tag } from "./shared";
import { EDUCATION } from "@/data/education";

/**
 * SECTION 01 — EDUCATION.
 * A compact academic banner: degree + institution on the left, and every
 * course — foundations and electives — as one scannable chip cloud on the
 * right. Deliberately short — no labs, no pending placeholders.
 */
const COURSEWORK = Array.from(
  new Set([...EDUCATION.coreFoundations, ...EDUCATION.electives]),
);

export function EducationSection() {
  return (
    <SectionShell
      id="education"
      eyebrow="01 / Education"
      title="Education"
      intro="The academic foundation underneath the work — core computer science, applied AI, and the systems electives that shaped how I build."
    >
      <article className="overflow-hidden rounded-2xl border border-slate-blue/18 bg-surface shadow-tactile">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.25fr]">
          <div className="p-6 sm:p-8">
            <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-steel-blue uppercase">
              Academic foundation
            </p>
            <h3 className="mt-4 font-serif text-[29px] leading-[1.06] tracking-[-0.015em] text-primary text-balance sm:text-[33px]">
              {EDUCATION.degree}
            </h3>

            <p className="mt-5 border-t border-slate-blue/12 pt-4 text-[14px] leading-relaxed font-semibold text-primary">
              {EDUCATION.institution}
            </p>
            <p className="mt-1 text-[12.5px] font-medium text-secondary/80">
              {EDUCATION.location}
            </p>
          </div>

          <div className="border-t border-slate-blue/15 bg-tint/70 p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <ul
              className="flex flex-wrap content-start gap-2"
              aria-label="Coursework"
            >
              {COURSEWORK.map((subject) => (
                <li key={subject}>
                  <Tag className="shadow-[var(--shadow-chip)]">{subject}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </SectionShell>
  );
}
