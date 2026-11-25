"use client";

import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

/**
 * Renders the résumé PDF page-by-page onto the page itself with PDF.js —
 * no <iframe>, no <embed>, no native browser viewer chrome (dark toolbar,
 * page/zoom controls). Each page becomes a white document surface inside the
 * portfolio layout, centred at a comfortable reading width, with the document
 * aspect ratio preserved at every viewport size.
 *
 * Pages are drawn to canvases sized in device pixels (capped at 2×) so text
 * stays crisp, and re-drawn on resize when the available width changes.
 */

type Status = "loading" | "ready" | "error";

const MAX_DOCUMENT_WIDTH = 880;

export function ResumeDocument({ href }: { href: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [failure, setFailure] = useState("");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let doc: PDFDocumentProxy | null = null;
    let task: PDFDocumentLoadingTask | null = null;
    let observer: ResizeObserver | null = null;
    let resizeTimer: number | undefined;
    let generation = 0;

    const draw = async () => {
      if (!doc) return;
      const run = ++generation;

      // A4-ish reading width on desktop, fluid below it. DPR capped at 2
      // keeps a one-page résumé under a few megapixels of canvas.
      const width = Math.min(mount.clientWidth || MAX_DOCUMENT_WIDTH, MAX_DOCUMENT_WIDTH);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const fragment = document.createDocumentFragment();

      for (let number = 1; number <= doc.numPages; number += 1) {
        const page = await doc.getPage(number);
        if (disposed || run !== generation) {
          page.cleanup();
          return;
        }

        const natural = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({
          scale: (width / natural.width) * dpr,
        });

        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.className = "block h-auto w-full";
        canvas.setAttribute("role", "img");
        canvas.setAttribute("aria-label", `Résumé page ${number} of ${doc.numPages}`);

        const surface = document.createElement("div");
        surface.className =
          "mx-auto w-full overflow-hidden rounded-lg bg-white shadow-lifted ring-1 ring-black/10";
        surface.appendChild(canvas);
        fragment.appendChild(surface);

        await page.render({ canvas, viewport }).promise;
        page.cleanup();
      }

      if (disposed || run !== generation) return;
      mount.replaceChildren(fragment);
      setStatus("ready");
    };

    const start = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      task = pdfjs.getDocument({ url: href });
      doc = await task.promise;
      if (disposed) return;

      await draw();
      if (disposed) return;

      // Only width changes matter, and re-rendering is comparatively costly,
      // so coalesce resizes instead of redrawing on every frame.
      observer = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          void draw();
        }, 180);
      });
      observer.observe(mount);
    };

    start().catch((error: unknown) => {
      if (disposed) return;
      setFailure(
        error instanceof Error ? error.message : "The document could not be loaded.",
      );
      setStatus("error");
    });

    return () => {
      disposed = true;
      generation += 1;
      window.clearTimeout(resizeTimer);
      observer?.disconnect();
      void task?.destroy();
      mount.replaceChildren();
    };
  }, [href]);

  return (
    <div className="mx-auto w-full max-w-[880px]">
      {status === "loading" ? <DocumentSkeleton /> : null}

      {status === "error" ? (
        <div className="rounded-xl border border-dashed border-slate-blue/30 bg-surface/60 px-6 py-14 text-center">
          <p className="font-mono text-[11px] tracking-[0.2em] text-steel-blue uppercase">
            Preview unavailable
          </p>
          <p className="mx-auto mt-3 max-w-md text-pretty text-[14.5px] leading-relaxed text-secondary">
            The résumé could not be rendered in the page. The file itself is
            fine — open it directly or download a copy below.
          </p>
          {failure ? (
            <p className="mx-auto mt-2 max-w-md truncate font-mono text-[11px] text-secondary/60">
              {failure}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline min-h-10 px-4 py-2 text-[13px]"
            >
              Open in New Tab
            </a>
            <a href={href} download className="btn btn-solid min-h-10 px-4 py-2 text-[13px]">
              Download PDF
            </a>
          </div>
        </div>
      ) : null}

      <div
        ref={mountRef}
        aria-busy={status === "loading"}
        className="flex flex-col gap-5"
      />
    </div>
  );
}

function DocumentSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true">
      <div className="w-full animate-pulse rounded-lg bg-white/95 shadow-lifted ring-1 ring-black/5">
        <div className="flex aspect-[1/1.414] flex-col gap-3 p-8 sm:p-12">
          <div className="h-3 w-1/3 rounded bg-slate-blue/15" />
          <div className="h-2 w-1/4 rounded bg-slate-blue/10" />
          <div className="mt-6 h-2 w-full rounded bg-slate-blue/10" />
          <div className="h-2 w-11/12 rounded bg-slate-blue/10" />
          <div className="h-2 w-4/5 rounded bg-slate-blue/10" />
          <div className="mt-4 h-2 w-full rounded bg-slate-blue/10" />
          <div className="h-2 w-3/4 rounded bg-slate-blue/10" />
        </div>
      </div>
    </div>
  );
}
