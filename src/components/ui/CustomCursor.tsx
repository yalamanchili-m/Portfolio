"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a Steel Blue ring with a solid center dot that grows into
 * a Powder Blue halo over interactive elements. Sits above every layer
 * (including modals) and is purely decorative.
 *
 * - Skipped entirely on touch/coarse pointers, so mobile keeps native input.
 * - Styles are scoped under `.custom-cursor-active` on <html>, which is only
 *   added once the cursor is actually mounted — a JS failure never leaves
 *   the page without a pointer.
 * - Text fields keep the native I-beam for precise editing.
 */
const INTERACTIVE =
  'a, button, input[type="submit"], input[type="button"], [role="button"], .btn, .button, .cta, summary, label[for]';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const root = document.documentElement;
    const cursor = cursorRef.current;
    if (!cursor) return;

    root.classList.add("custom-cursor-active");

    // Position is written straight to the DOM: a React re-render on every
    // pointer sample is wasted work.
    const move = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add("is-visible");
    };

    const hideOnExit = (event: MouseEvent) => {
      if (!event.relatedTarget) cursor.classList.remove("is-visible");
    };

    const over = (event: MouseEvent) => {
      const target = event.target as Element | null;
      cursor.classList.toggle(
        "is-hovered",
        Boolean(target?.closest(INTERACTIVE)),
      );
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", hideOnExit);

    return () => {
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", hideOnExit);
    };
  }, []);

  return (
    <div ref={cursorRef} aria-hidden="true" className="custom-cursor">
      <span className="custom-cursor-dot" />
    </div>
  );
}
