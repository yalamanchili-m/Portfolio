"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AgenticTetris } from "@/components/contact/AgenticTetris";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionShell } from "./shared";
import { SOCIAL_LINKS } from "@/data/social";

const EMAIL_ADDRESS = SOCIAL_LINKS.email.label;
const LINKEDIN_DISPLAY = SOCIAL_LINKS.linkedin.href?.replace(
  /^https?:\/\/(www\.)?/,
  "") ?? null;

const EMAIL_SUBJECT = "Let's build something thoughtful";
const EMAIL_BODY =
  "Hi Manvitha,\n\nI came across your portfolio and would like to talk about\n\n";

/** Web compose links, so the click works even without a desktop mail client. */
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL_ADDRESS,
)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

const OUTLOOK_COMPOSE = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
  EMAIL_ADDRESS,
)}&subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

/**
 * SECTION 07 — CONTACT: an editorial close, with one large action centred in
 * the right half. The action opens a small chooser — email or LinkedIn —
 * and the agentic Tetris engine sits below, edge to edge. The résumé lives
 * on its own /resume page.
 */
export function ContactSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setDialogOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <SectionShell id="contact" eyebrow="06 / Contact" title="Contact">
      {/* Split close: copy on the left, the single action centred right */}
      <div className="grid w-full gap-7 border-t border-[var(--border-subtle)] pt-8 sm:pt-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="max-w-3xl space-y-4">
          <h3 className="font-serif text-4xl leading-[1.02] tracking-[-0.02em] text-primary text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-steel-blue italic">thoughtful.</span>
          </h3>
          <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-secondary sm:text-[16px]">
            I&apos;m open to agentic AI, product, and software engineering roles
            — and collaborations where careful engineering and clear
            storytelling both matter. Pick whichever channel suits you: a
            drafted email or a direct LinkedIn message.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setDialogOpen(true)}
            aria-haspopup="dialog"
            aria-label="Contact Manvitha — choose email or LinkedIn"
            className="btn btn-solid min-h-16 w-full max-w-sm px-10 py-4 text-[16px] sm:min-h-[72px] sm:px-12 sm:text-base"
          >
            Contact Me
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Below — the engine, full width of the section */}
      <AgenticTetris className="mt-10 w-full sm:mt-12" />

      <AnimatePresence>
        {dialogOpen ? <ContactDialog onClose={close} /> : null}
      </AnimatePresence>
    </SectionShell>
  );
}

/**
 * Small channel chooser. Shares the modal behaviours used by the Beyond Tech
 * detail view: Escape to dismiss, backdrop click to dismiss, focus trapped
 * inside the panel and the page locked while it is open.
 */
function ContactDialog({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-[65] flex items-end justify-center bg-showcase/55 p-4 backdrop-blur-sm sm:items-center"
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
        aria-labelledby="contact-dialog-title"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-blue/20 bg-surface shadow-lifted"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-blue/12 bg-tint/60 px-5 py-4">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-steel-blue uppercase">
              Contact
            </p>
            <h3
              id="contact-dialog-title"
              className="mt-1.5 font-serif text-[25px] leading-[1.1] tracking-[-0.01em] text-primary text-balance"
            >
              How would you like to connect?
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close contact options"
            className="btn btn-quiet shrink-0 rounded-full px-3 py-1.5 text-[12px]"
          >
            Close
          </button>
        </header>

        <div className="grid gap-3 p-5">
          {SOCIAL_LINKS.email.href ? (
            <div className="rounded-xl border border-slate-blue/18 bg-tint/40 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-steel-blue/10 font-mono text-[13px] font-bold text-steel-blue"
                >
                  @
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-primary">
                    Write an email
                  </span>
                  <span className="mt-0.5 flex min-w-0 items-center gap-2">
                    <span className="truncate text-[12.5px] text-secondary">
                      {EMAIL_ADDRESS}
                    </span>
                    <CopyButton
                      value={EMAIL_ADDRESS}
                      label="email address"
                      message="Email address copied"
                    />
                  </span>
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href={GMAIL_COMPOSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Write an email to ${EMAIL_ADDRESS} in Gmail`}
                  className="btn btn-quiet min-h-10 flex-1 rounded-lg px-3 py-2 text-[12.5px] font-semibold"
                >
                  Gmail
                  <ArrowUpRight className="size-3" />
                </a>
                <a
                  href={OUTLOOK_COMPOSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Write an email to ${EMAIL_ADDRESS} in Outlook`}
                  className="btn btn-quiet min-h-10 flex-1 rounded-lg px-3 py-2 text-[12.5px] font-semibold"
                >
                  Outlook
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          ) : null}

          {SOCIAL_LINKS.linkedin.href ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-blue/18 bg-tint/40 px-4 py-3.5 transition-colors duration-200 hover:border-soft-blue/45 hover:bg-tint">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-steel-blue/10 font-mono text-[13px] font-bold text-steel-blue"
              >
                in
              </span>
              <a
                href={SOCIAL_LINKS.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 flex-1 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
              >
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-primary">
                    Message on LinkedIn
                  </span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-secondary">
                    {LINKEDIN_DISPLAY}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-steel-blue transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <CopyButton
                value={SOCIAL_LINKS.linkedin.href}
                label="LinkedIn URL"
                message="LinkedIn profile link copied"
                variant="icon"
              />
            </div>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
