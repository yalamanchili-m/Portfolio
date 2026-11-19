"use client";

import { AgenticTetris } from "@/components/contact/AgenticTetris";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionShell } from "./shared";
import { SOCIAL_LINKS } from "@/data/social";

const EMAIL_ADDRESS = SOCIAL_LINKS.email.label;

/**
 * A mailto draft with the address, subject and opening line pre-filled, so
 * the click lands in the visitor's mail client ready to send.
 */
const CONTACT_MAILTO = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
  "Let's build something thoughtful",
)}&body=${encodeURIComponent(
  "Hi Manvitha,\n\nI came across your portfolio and would like to talk about\n\n",
)}`;

/**
 * SECTION 07 — CONTACT: an editorial close with one direct action spans the
 * full width of the section, and the agentic Tetris engine sits below it,
 * edge to edge. The résumé lives on its own /resume page.
 */
export function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="06 / Contact" title="Contact">
      {/* Full-width close + the single action */}
      <div className="flex w-full flex-col gap-7 border-t border-[var(--border-subtle)] pt-8 sm:pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-3xl space-y-4">
          <h3 className="font-serif text-4xl leading-[1.02] tracking-[-0.02em] text-primary text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-steel-blue italic">thoughtful.</span>
          </h3>
          <p className="max-w-2xl text-pretty text-[14px] leading-relaxed text-secondary sm:text-[15px]">
            I&apos;m open to agentic AI, product, and software engineering roles
            — and collaborations where careful engineering and clear
            storytelling both matter. One click opens a drafted email, ready to
            send.
          </p>
        </div>

        <a
          href={CONTACT_MAILTO}
          aria-label={`Contact Manvitha by email at ${EMAIL_ADDRESS}`}
          className="btn btn-solid min-h-12 w-full px-6 py-3 text-[13px] lg:w-auto lg:shrink-0"
        >
          Contact Me
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {/* Below — the engine, full width of the section */}
      <AgenticTetris className="mt-10 w-full sm:mt-12" />
    </SectionShell>
  );
}
