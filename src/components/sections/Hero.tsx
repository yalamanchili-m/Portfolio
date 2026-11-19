"use client";

import { useEffect, useState } from "react";
import { HangingIdCard } from "@/components/hero/HangingIdCard";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";
import Link from "next/link";
import { HERO } from "@/data/site";

/**
 * SECTION 1 — HERO: a focus-driven hierarchy. The eyebrow is an
 * availability signal, the H1 is the value proposition (the name already
 * lives in the navbar), the bio carries inline accent highlights, and the
 * primary CTA goes straight to the work. The stack card anchors the
 * bottom of the left column where the old metadata line sat.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pt-0 pb-16 md:px-12 lg:min-h-[calc(100vh-72px)] lg:grid-cols-12 lg:px-16"
    >
      {/* Left column — status, headline, bio, CTAs, stack card */}
      <div className="order-1 pt-14 pb-4 lg:col-span-7 lg:py-14">
        <div className="max-w-2xl">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-soft-blue/40 bg-powder-blue/20 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-steel-blue uppercase">
            <span className="relative flex size-2 items-center justify-center">
              <span
                aria-hidden="true"
                className="soft-pulse absolute size-2 rounded-full bg-steel-blue/50"
              />
              <span
                aria-hidden="true"
                className="relative size-1.5 rounded-full bg-steel-blue"
              />
            </span>
            {HERO.availability}
            <span aria-hidden="true" className="text-soft-blue/60">
              ·
            </span>
            <span className="text-slate-blue">{HERO.location}</span>
          </p>

          <h1 className="mt-7 font-serif text-[42px] leading-[1.02] tracking-[-0.035em] text-primary text-balance sm:text-[58px] lg:text-[68px]">
            {HERO.headline.map((line, index) => {
              const isLast = index === HERO.headline.length - 1;
              if (!isLast) {
                return (
                  <span key={line} className="block">
                    {line}
                  </span>
                );
              }
              const before = line.slice(
                0,
                line.length - HERO.headlineAccent.length,
              );
              return (
                <span key={line} className="block">
                  {before}
                  <span className="text-steel-blue italic">
                    {HERO.headlineAccent}
                  </span>
                </span>
              );
            })}
          </h1>

          <p className="mt-6 max-w-[34rem] text-pretty text-[15px] leading-[1.75] text-secondary sm:text-[16px]">
            {renderEmphasis(HERO.summary)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#projects" className="btn btn-solid px-5 py-3 text-[13px]">
              See the work
              <ArrowDown className="size-3.5 text-on-accent/70" />
            </a>
            <Link
              href="/resume"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-steel-blue underline-offset-4 transition-colors hover:text-slate-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel-blue"
            >
              Résumé
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <StackCard />
        </div>
      </div>

      {/* Right column — custom ID badge hanging from the column's top edge */}
      <div className="order-2 relative w-full lg:col-span-5 lg:self-start">
        <HangingIdCard />
      </div>
    </section>
  );
}

/** Inline bio emphasis: accent-colored semibold, no background noise. */
function renderEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-steel-blue">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

const STACK_COMMAND = "stack --profile manvitha";
const STACK_ROWS = [
  "agentic-ai",
  "backend & data",
  "full-stack web",
  "cloud & devops",
];

/**
 * Light-mode "session / stack" widget. It boots like a terminal: the
 * command types itself, the profile rows report in one by one, then the
 * session holds briefly and replays. Reduced-motion users get the
 * finished readout immediately.
 */
function StackCard() {
  const [typedChars, setTypedChars] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [showReady, setShowReady] = useState(false);

  useEffect(() => {
    let timer: number;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setTimeout(() => {
        setTypedChars(STACK_COMMAND.length);
        setVisibleRows(STACK_ROWS.length);
        setShowReady(true);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    if (typedChars < STACK_COMMAND.length) {
      timer = window.setTimeout(() => setTypedChars((n) => n + 1), 45);
    } else if (visibleRows < STACK_ROWS.length) {
      timer = window.setTimeout(() => setVisibleRows((n) => n + 1), 300);
    } else if (!showReady) {
      timer = window.setTimeout(() => setShowReady(true), 320);
    } else {
      timer = window.setTimeout(() => {
        setTypedChars(0);
        setVisibleRows(0);
        setShowReady(false);
      }, 4600);
    }

    return () => window.clearTimeout(timer);
  }, [typedChars, visibleRows, showReady]);

  return (
    <div className="mt-10 w-full max-w-[26rem] overflow-hidden rounded-2xl border border-slate-blue/20 bg-surface/75 shadow-float backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-blue/12 bg-tint/60 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-steel-blue" />
          <span className="size-2 rounded-full bg-muted-blue" />
          <span className="size-2 rounded-full bg-powder-blue/50" />
        </div>
        <span className="font-mono text-[9px] font-medium tracking-[0.18em] text-slate-blue uppercase">
          System profile
        </span>
      </div>

      <div className="min-h-[9.75rem] px-4 py-3.5">
        <p className="font-mono text-[11px] text-secondary">
          <span className="mr-1.5 text-steel-blue">$</span>
          {STACK_COMMAND.slice(0, typedChars)}
          <span
            aria-hidden="true"
            className="caret ml-0.5 inline-block h-[11px] w-[5px] translate-y-[1px] bg-steel-blue align-baseline"
          />
        </p>

        <dl className="mt-2.5 min-h-[5.75rem] space-y-1.5">
          {STACK_ROWS.slice(0, visibleRows).map((row) => (
            <div
              key={row}
              className="row-in flex items-baseline gap-2 font-mono text-[11px]"
            >
              <dt className="shrink-0 text-secondary">{row}</dt>
              <span
                aria-hidden="true"
                className="mb-1 h-px flex-1 border-b border-dotted border-slate-blue/35"
              />
              <dd className="shrink-0 font-medium text-online">active</dd>
            </div>
          ))}
        </dl>

        {showReady ? (
          <p className="row-in mt-3 border-t border-slate-blue/12 pt-2.5 font-mono text-[11px] text-steel-blue">
            <span aria-hidden="true" className="mr-1.5">
              →
            </span>
            ready to build &amp; ship
          </p>
        ) : (
          <div className="mt-3 h-[2.1rem] border-t border-slate-blue/12" />
        )}
      </div>
    </div>
  );
}
