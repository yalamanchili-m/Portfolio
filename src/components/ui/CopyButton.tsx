"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "@/components/ui/icons";

const COPY_TOAST_EVENT = "portfolio:copy";

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the selection-based fallback.
  }

  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  } catch {
    return false;
  }
}

function announce(message: string) {
  window.dispatchEvent(new CustomEvent<string>(COPY_TOAST_EVENT, { detail: message }));
}

/**
 * Small copy affordance shared by the footer and the contact dialog. It keeps
 * a short-lived "copied" state on the button and raises the global toast so
 * the confirmation is visible wherever the visitor clicked.
 */
export function CopyButton({
  value,
  label,
  message,
  variant = "pill",
  className = "",
}: {
  value: string;
  /** Describes what is being copied, e.g. "email address". */
  label: string;
  /** Toast text; defaults to "Email address copied". */
  message?: string;
  variant?: "pill" | "icon";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const copiedMessage =
    message ?? `${label.charAt(0).toUpperCase()}${label.slice(1)} copied`;

  const handleCopy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    announce(copiedMessage);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const Icon = copied ? Check : Copy;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? copiedMessage : `Copy ${label}`}
        aria-label={copied ? copiedMessage : `Copy ${label}`}
        className={`inline-flex shrink-0 items-center justify-center rounded-md border border-slate-blue/20 bg-surface p-1 text-slate-blue transition-colors duration-150 hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue ${className}`}
      >
        <Icon className="size-3" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedMessage : `Copy ${label}`}
      className={`inline-flex shrink-0 items-center gap-1 rounded-md border border-slate-blue/20 bg-surface px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] text-slate-blue uppercase transition-colors duration-150 hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue ${className}`}
    >
      <Icon className="size-3" />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/**
 * One global toast, mounted in the root layout. It listens for copy events so
 * every copy action in the site confirms in the same place.
 */
export function CopyToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    const handleCopy = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail) return;
      setMessage(detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), 2200);
    };

    window.addEventListener(COPY_TOAST_EVENT, handleCopy);
    return () => {
      window.removeEventListener(COPY_TOAST_EVENT, handleCopy);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2">
      <AnimatePresence>
        {message ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 rounded-full border border-slate-blue/20 bg-surface px-4 py-2.5 text-[12.5px] font-semibold text-primary shadow-lifted"
          >
            <Check className="size-3.5 text-steel-blue" />
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
