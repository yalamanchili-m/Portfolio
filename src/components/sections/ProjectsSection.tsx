"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { SectionShell, Tag } from "./shared";
import { PROJECTS } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/social";
import type { Project } from "@/types/portfolio";

/**
 * SECTION 02 — PROJECTS.
 * Two tiers: the three flagship builds as full-width horizontal cards that
 * stack under the sticky nav as you scroll, then the remaining repositories
 * as a compact list.
 */
const FLAGSHIP_IDS = ["recircle", "veritas", "daywise"];

const FLAGSHIPS = FLAGSHIP_IDS.map(
  (id) => PROJECTS.find((project) => project.id === id),
).filter((project): project is Project => Boolean(project));

const REMAINING = PROJECTS.filter(
  (project) => !FLAGSHIP_IDS.includes(project.id),
);

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="02 / Projects"
      title="Projects"
      intro="Selected work from GitHub — AI systems, data platforms, and full-stack builds, each linked to its public repository."
    >
      <FlagshipStack />

      <div className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-blue/15 pb-3">
          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-slate-blue uppercase">
              More work
            </p>
            <p className="mt-1 text-[12.5px] text-secondary">
              Smaller builds, prototypes, and course projects.
            </p>
          </div>
          <a
            href={`${SOCIAL_LINKS.github.href ?? "https://github.com/yalamanchili-m"}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-blue/20 px-4 py-2 text-[11.5px] font-semibold text-slate-blue transition-colors hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
          >
            View All Projects
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>

        <ul className="divide-y divide-slate-blue/12">
          {REMAINING.map((project) => (
            <CompactProject key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

/** Sticky, scroll-collapsing stack of the three flagship cards. */
function FlagshipStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 0.2", "end 0.85"],
  });

  return (
    <div ref={stackRef} className="space-y-6">
      {FLAGSHIPS.map((project, index) => (
        <FlagshipCard
          key={project.id}
          project={project}
          index={index}
          total={FLAGSHIPS.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function FlagshipCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // As the next card climbs over this one, it recedes slightly and settles
  // into the stack.
  const scale = useTransform(
    progress,
    [(index + 0.4) / total, (index + 1) / total],
    [1, 0.96],
  );

  return (
    <div
      className="sticky"
      style={{ top: `${96 + index * 20}px`, zIndex: index + 1 }}
    >
      <motion.article
        style={{ scale }}
        id={`project-${project.id}`}
        className="relative scroll-mt-28 overflow-hidden rounded-3xl border border-slate-blue/18 bg-surface shadow-lifted"
      >
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — the argument */}
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-steel-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-steel-blue/40" />
              <span className="font-mono text-[9px] tracking-[0.18em] text-slate-blue uppercase">
                Flagship
              </span>
              {project.status === "in-progress" ? (
                <span className="rounded-full border border-online/25 bg-online/10 px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em] text-online uppercase">
                  In progress
                </span>
              ) : null}
            </div>

            <div>
              <h3 className="font-serif text-[30px] leading-[1.05] tracking-[-0.02em] text-primary text-balance sm:text-[38px]">
                {project.title}
              </h3>
              <p className="mt-2 max-w-xl text-pretty text-[13.5px] leading-relaxed font-medium text-secondary">
                {project.summary}
              </p>
            </div>

            <div className="grid gap-2 border-t border-slate-blue/12 pt-4 sm:grid-cols-2 sm:gap-4">
              <div>
                <p className="font-mono text-[9px] font-medium tracking-[0.14em] text-steel-blue uppercase">
                  Problem
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-secondary">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] font-medium tracking-[0.14em] text-steel-blue uppercase">
                  Build
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-secondary">
                  {project.solution}
                </p>
              </div>
            </div>

            <ul className="space-y-1.5" aria-label="Highlights">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-[11.5px] leading-relaxed text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[6px] size-1 shrink-0 rounded-full bg-steel-blue"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-blue/12 pt-4">
              <ul className="mr-auto flex flex-wrap gap-1.5" aria-label="Tech stack">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-quiet min-h-10 px-3.5 py-2 text-[11px]"
              >
                GitHub
                <ArrowUpRight className="size-3" />
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-quiet min-h-10 px-3.5 py-2 text-[11px]"
                >
                  Live Demo
                  <ArrowUpRight className="size-3" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Right — the visual */}
          <div className="flex items-stretch border-t border-slate-blue/12 bg-tint/45 p-5 sm:p-6 lg:border-t-0 lg:border-l">
            <div className="w-full self-center">
              <ProjectPreview
                kind={project.preview ?? "platform"}
                label={`${project.id} · preview`}
              />
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <li id={`project-${project.id}`} className="scroll-mt-28">
      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <h4 className="font-serif text-[19px] leading-tight tracking-[-0.01em] text-primary">
            {project.title}
          </h4>
          <p className="mt-1 text-[12px] leading-relaxed text-secondary">
            {project.summary}
          </p>
        </div>

        <ul
          className="flex flex-wrap gap-1.5 sm:max-w-[34%] sm:justify-end"
          aria-label="Tech stack"
        >
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="group inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-slate-blue/20 px-3.5 py-2 text-[11px] font-semibold text-slate-blue transition-colors hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
        >
          GitHub
          <ArrowUpRight className="size-3" />
        </a>
      </div>
    </li>
  );
}
