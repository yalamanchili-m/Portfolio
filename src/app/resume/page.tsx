import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { RESUME_SHORTCUT } from "@/data/site";
import { SOCIAL_LINKS } from "@/data/social";

export const metadata: Metadata = {
  title: "Résumé — Manvitha Yalamanchili",
  description:
    "Résumé of Manvitha Yalamanchili — agentic AI, product, and software engineering.",
};

/**
 * DEDICATED RÉSUMÉ PAGE (/resume)
 * A quiet viewer: back to the portfolio on the left, open/download on the
 * right, and the PDF itself filling the rest of the screen. Until the file
 * is uploaded, the viewer shows a clean pending state instead of a broken
 * frame.
 */
export default function ResumePage() {
  const pdfHref = RESUME_SHORTCUT.href;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-blue/15 bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md py-2 text-[12.5px] font-semibold text-secondary transition-colors hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel-blue"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {pdfHref ? (
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline min-h-10 px-4 py-2 text-[12px]"
              >
                Open in New Tab
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : (
              <DisabledAction label="Open in New Tab" icon={<ArrowUpRight className="size-3.5" />} />
            )}

            {pdfHref ? (
              <a
                href={pdfHref}
                download
                className="btn btn-solid min-h-10 px-4 py-2 text-[12px]"
              >
                Download PDF
                <ArrowDown className="size-3.5" />
              </a>
            ) : (
              <DisabledAction label="Download PDF" icon={<ArrowDown className="size-3.5" />} />
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col gap-4 px-5 py-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-steel-blue uppercase">
              Document
            </p>
            <h1 className="mt-1 font-serif text-3xl tracking-[-0.015em] text-primary sm:text-4xl">
              Résumé
            </h1>
          </div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-secondary/70 uppercase">
            {pdfHref ? RESUME_SHORTCUT.windowTitle : "PDF · pending upload"}
          </p>
        </div>

        {pdfHref ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-blue/18 bg-surface shadow-tactile">
            <iframe
              src={pdfHref}
              title="Manvitha Yalamanchili — Résumé"
              className="h-[calc(100dvh-13rem)] min-h-[70vh] w-full flex-1 border-0 bg-canvas"
            />
          </div>
        ) : (
          <PendingViewer />
        )}
      </main>

      <footer className="border-t border-slate-blue/15">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-[10px] font-medium tracking-[0.14em] text-secondary/70 uppercase sm:px-8">
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
      className="btn min-h-10 cursor-not-allowed border border-dashed border-slate-blue/30 px-4 py-2 text-[12px] text-secondary/60"
    >
      {label}
      {icon}
    </button>
  );
}

function PendingViewer() {
  const email = SOCIAL_LINKS.email;
  return (
    <div className="flex min-h-[65vh] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-blue/30 bg-surface/60 px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-xl border border-slate-blue/20 bg-tint font-mono text-[10px] font-bold text-steel-blue"
      >
        PDF
      </span>
      <h2 className="mt-5 font-serif text-2xl tracking-[-0.01em] text-primary sm:text-3xl">
        The résumé PDF is being uploaded.
      </h2>
      <p className="mt-2 max-w-md text-pretty text-[13.5px] leading-relaxed text-secondary">
        This viewer fills itself in as soon as the file lands here. In the
        meantime, the fastest route is a direct email — I&apos;ll send the
        current version straight back.
      </p>
      {email.href ? (
        <a
          href={email.href}
          className="btn btn-solid mt-6 min-h-11 px-5 py-2.5 text-[12.5px]"
        >
          Email {email.label}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
      <Link
        href="/#contact"
        className="mt-4 text-[11.5px] font-semibold text-steel-blue underline-offset-4 hover:underline"
      >
        Back to contact
      </Link>
    </div>
  );
}
