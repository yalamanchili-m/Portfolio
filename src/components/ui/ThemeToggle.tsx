"use client";

import { Moon, Sun } from "@/components/ui/icons";

const STORAGE_KEY = "theme";

/**
 * Light/dark switch for the top-right of the navigation. The icon pair is
 * swapped by CSS on `html[data-theme]` (see globals.css), so the button
 * renders the same markup on the server and needs no client state.
 */
export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled — the in-memory theme still applies.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className="inline-flex size-9 items-center justify-center rounded-full border border-slate-blue/20 text-slate-blue transition-colors hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue"
    >
      <Sun className="theme-icon-light size-4" />
      <Moon className="theme-icon-dark size-4" />
    </button>
  );
}
