import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";
import { RESUME_SHORTCUT } from "@/data/site";
import { SOCIAL_LINKS } from "@/data/social";

export const metadata: Metadata = {
  title: "Résumé — Manvitha Yalamanchili",
  description:
    "Résumé of Manvitha Yalamanchili — agentic AI, product, and software engineering.",
};

/**
 * DEDICATED RÉSUMÉ PAGE (/resume)
 * Shares the portfolio's navigation bar (where the résumé pill becomes
 * "Portfolio") and keeps the document itself front and centre: the PDF's
 * real pages are painted onto the page with PDF.js, so the white document
 * sits directly on the site background with no native browser viewer or
 * dark toolbar around it. Open/download stay available above the document.
 */
export default function ResumePage() {
  const pdfHref = RESUME_SHORTCUT.href;

  return (
    <div className="flex min-h-dvh flex-col">
      <NavBar variant="resume" />

      <main
        id="main"
        className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col gap-5 px-5 py-7 sm:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-steel-blue uppercase">
              Document
            </p>
            <h1 className="mt-1 font-serif text-3xl tracking-[-0.015em] text-primary sm:text-4xl">
              Résumé
            </h1>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="font-mono text-[10.5px] tracking-[0.14em] text-secondary/70 uppercase">
              {pdfHref ? RESUME_SHORTCUT.windowTitle : "PDF · pending upload"}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {pdfHref ? (
                <a
                  href={pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline min-h-10 px-4 py-2 text-[13px]"
                >
                  Open in New Tab
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : (
                <DisabledAction
                  label="Open in New Tab"
                  icon={<ArrowUpRight className="size-3.5" />}
                />
              )}

              {pdfHref ? (
                <a
                  href={pdfHref}
                  download
                  className="btn btn-solid min-h-10 px-4 py-2 text-[13px]"
                >
                  Download PDF
                  <ArrowDown className="size-3.5" />
                </a>
              ) : (
                <DisabledAction
                  label="Download PDF"
                  icon={<ArrowDown className="size-3.5" />}
                />
              )}
            </div>
          </div>
        </div>

        {pdfHref ? <ResumeDocument href={pdfHref} /> : <PendingViewer />}
      </main>

      <footer className="border-t border-slate-blue/15">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-[10.5px] font-medium tracking-[0.14em] text-secondary/70 uppercase sm:px-8">
          <span>Manvitha Yalamanchili</span>
          <span>Agentic AI · Product · Software Engineering</span>
        </div>
      </footer>
    </div>
  );
}

function DisabledAction({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="The résumé PDF is still being uploaded"
      className="btn min-h-10 cursor-not-allowed border border-dashed border-slate-blue/30 px-4 py-2 text-[13px] text-secondary/60"
    >
      {label}
      {icon}
    </button>
  );
}

function PendingViewer() {
  const email = SOCIAL_LINKS.email;
  return (
    <div className="flex min-h-[65vh] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-blue/30 bg-surface/60 px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-xl border border-slate-blue/20 bg-tint font-mono text-[11px] font-bold text-steel-blue"
      >
        PDF
      </span>
      <h2 className="mt-5 font-serif text-2xl tracking-[-0.01em] text-primary sm:text-3xl">
        The résumé PDF is being uploaded.
      </h2>
      <p className="mt-2 max-w-md text-pretty text-[14.5px] leading-relaxed text-secondary">
        This viewer fills itself in as soon as the file lands here. In the
        meantime, the fastest route is a direct email — I&apos;ll send the
        current version straight back.
      </p>
      {email.href ? (
        <a
          href={email.href}
          className="btn btn-solid mt-6 min-h-11 px-5 py-2.5 text-[13.5px]"
        >
          Email {email.label}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
      <Link
        href="/#contact"
        className="mt-4 text-[12.5px] font-semibold text-steel-blue underline-offset-4 hover:underline"
      >
        Back to contact
      </Link>
    </div>
  );
}
