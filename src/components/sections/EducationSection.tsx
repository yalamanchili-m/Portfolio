"use client";

import { SectionShell, Tag } from "./shared";
import { EDUCATION } from "@/data/education";

/**
 * SECTION 01 — EDUCATION.
 * A compact academic banner: degree + institution on the left, and the
 * R22 core foundations and selected electives as scannable pill rows on
 * the right. Deliberately short — no labs, no pending placeholders.
 */
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
            <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-steel-blue uppercase">
              Academic foundation
            </p>
            <h3 className="mt-4 font-serif text-[28px] leading-[1.06] tracking-[-0.015em] text-primary text-balance sm:text-[32px]">
              {EDUCATION.degree}
            </h3>
            <p className="mt-2 font-mono text-[10px] font-medium tracking-[0.16em] text-steel-blue uppercase">
              {EDUCATION.regulation}
            </p>

            <p className="mt-5 border-t border-slate-blue/12 pt-4 text-[13px] leading-relaxed font-semibold text-primary">
              {EDUCATION.institution}
            </p>
            <p className="mt-1 text-[11.5px] font-medium text-secondary/80">
              {EDUCATION.location}
            </p>
          </div>

          <div className="space-y-6 border-t border-slate-blue/15 bg-tint/70 p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <div>
              <h4 className="font-mono text-[10px] font-medium tracking-[0.16em] text-slate-blue uppercase">
                Core foundations &amp; labs
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Core coursework">
                {EDUCATION.coreFoundations.map((subject) => (
                  <li key={subject}>
                    <Tag>{subject}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-blue/12 pt-5">
              <h4 className="font-mono text-[10px] font-medium tracking-[0.16em] text-slate-blue uppercase">
                Selected electives
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Selected electives">
                {EDUCATION.electives.map((subject) => (
                  <li key={subject}>
                    <Tag>{subject}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </SectionShell>
  );
}
