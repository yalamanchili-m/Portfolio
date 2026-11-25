"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { ArrowUpRight, Search } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ITEMS, OWNER_NAME } from "@/data/site";

/**
 * Sticky frosted navigation, stripped to three destinations. The brand is
 * the only place the name appears; Projects, Experience and Beyond Work
 * carry monospace indices. Also mounts on /resume, where the section links
 * point back to the home page and the résumé pill becomes "Portfolio". The command palette trigger expands to fill the middle
 * of the bar (collapsing to an icon button before there is room for it),
 * and the right rail holds the ghost résumé link and the single solid
 * "Get in touch" pill.
 */
export function NavBar({
  variant = "home",
}: {
  variant?: "home" | "resume";
}) {
  const onHome = variant === "home";
  const sectionHref = (href: string) => (onHome ? href : `/${href}`);
  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    href: sectionHref(item.href),
  }));

  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const sectionToNav = new Map<string, string>();
    NAV_ITEMS.forEach((item) =>
      item.sections.forEach((section) => sectionToNav.set(section, item.id)),
    );

    const sections = Array.from(sectionToNav.keys())
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(sectionToNav.get(visible.target.id) ?? null);
      },
      { rootMargin: "-28% 0px -58% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Ctrl K / ⌘K opens the palette from anywhere on the page.
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-blue/15 bg-canvas/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only rounded-md bg-steel-blue px-3 py-2 text-sm text-on-accent focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center gap-4 px-6 md:px-12 lg:px-16"
      >
        <a
          href={onHome ? "#top" : "/"}
          className="flex min-w-0 shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel-blue"
          aria-label={`${OWNER_NAME} — back to top`}
        >
          <span className="font-serif text-[17px] leading-none tracking-tight text-primary sm:text-[22px] md:text-[24px]">
            {OWNER_NAME}
          </span>
        </a>

        <ul className="hidden shrink-0 items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.id} className="shrink-0">
              <NavLink item={item} active={activeId === item.id} />
            </li>
          ))}
        </ul>

        {/* Command palette trigger — expands into the empty middle of the bar */}
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          className="mx-auto hidden min-w-[240px] max-w-[460px] flex-1 items-center gap-2 rounded-full border border-slate-blue/20 bg-surface/70 px-3.5 py-2 text-[12.5px] font-medium text-secondary transition-colors hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue xl:flex"
        >
          <Search className="size-3.5 shrink-0" />
          <span className="truncate text-left text-slate-blue/85">
            Search projects, skills, or experience…
          </span>
          <kbd className="ml-auto shrink-0 rounded border border-slate-blue/20 bg-tint px-1.5 py-0.5 font-mono text-[10px] tracking-[0.06em] text-slate-blue/80">
            Ctrl K
          </kbd>
        </button>

        {/* Compact trigger below the search bar breakpoint */}
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          aria-label="Search projects, skills, or experience"
          className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-slate-blue/20 bg-surface/70 text-secondary transition-colors hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue sm:inline-flex xl:hidden"
        >
          <Search className="size-4" />
        </button>

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">

          {onHome ? (
            <Link
              href="/resume"
              aria-label="View résumé"
              className="group hidden items-center gap-1 rounded-md px-2 py-2 text-[13.5px] font-semibold text-slate-blue transition-colors hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue md:inline-flex"
            >
              Résumé
              <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <Link
              href="/"
              aria-label="Back to the portfolio"
              className="group hidden items-center gap-1 rounded-md px-2 py-2 text-[13.5px] font-semibold text-slate-blue transition-colors hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue md:inline-flex"
            >
              Portfolio
              <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}

          {/* .btn owns `display`, so the breakpoint lives on a wrapper. */}
          <div className="hidden shrink-0 md:block">
            <a
              href={sectionHref("#contact")}
              className="btn btn-solid rounded-full px-4 py-2 text-[13px] sm:text-[13.5px]"
            >
              Get in touch
            </a>
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-blue/20 px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-slate-blue uppercase transition-colors hover:border-steel-blue/45 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-blue lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
            <span
              aria-hidden="true"
              className={`relative block h-2 w-3 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              <span className="absolute inset-x-0 top-0.5 h-px bg-current" />
              <span className="absolute inset-x-0 bottom-0.5 h-px bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-blue/15 bg-canvas/95 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto w-full max-w-[1440px] px-6 py-2 sm:px-12">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-slate-blue/15">
                <NavLink
                  item={item}
                  active={activeId === item.id}
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3"
                />
              </li>
            ))}
            <li className="flex flex-wrap items-center gap-3 py-3">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setPaletteOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-blue/20 px-3 py-2 text-[12.5px] font-medium text-secondary"
              >
                <Search className="size-3.5" />
                Search
              </button>
              <Link
                href={onHome ? "/resume" : "/"}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-steel-blue"
              >
                {onHome ? "Résumé" : "Portfolio"}
                <ArrowUpRight className="size-3" />
              </Link>
              <a
                href={sectionHref("#contact")}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-steel-blue md:hidden"
              >
                Get in touch
                <ArrowUpRight className="size-3" />
              </a>
            </li>
          </ul>
        </div>
      ) : null}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        linkPrefix={onHome ? "" : "/"}
      />
    </header>
  );
}

function NavLink({
  item,
  active,
  onClick,
  className = "",
}: {
  item: { id: string; label: string; index: string; href: string };
  active: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      aria-current={active ? "location" : undefined}
      className={`group inline-flex items-baseline gap-2 font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel-blue ${
        active ? "text-steel-blue" : "text-secondary hover:text-steel-blue"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`font-mono text-[10.5px] tracking-[0.08em] transition-colors ${
          active ? "text-steel-blue" : "text-slate-blue/50"
        }`}
      >
        {item.index}
      </span>
      <span className="text-[14.5px]">{item.label}</span>
    </a>
  );
}
