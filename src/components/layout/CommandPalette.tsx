"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CERTIFICATIONS } from "@/data/certifications";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { NAV_ITEMS, SKILL_INDEX } from "@/data/site";

/**
 * Command palette (Ctrl/Cmd K). A single search field over grouped,
 * pre-indexed destinations: sections, projects, roles, certifications and
 * skills. Selection scrolls to the matching anchor; nothing is fetched.
 */
type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  group: string;
  href: string;
};

const GROUP_ORDER = [
  "Sections",
  "Projects",
  "Experience",
  "Certifications",
  "Skills",
];

function buildItems(): PaletteItem[] {
  return [
    ...NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      hint: "Top-level section",
      group: "Sections",
      href: item.href,
    })),
    {
      id: "section-education",
      label: "Education",
      hint: "CBIT · B.E. CSE (R22)",
      group: "Sections",
      href: "#education",
    },
    {
      id: "section-certifications",
      label: "Certifications",
      hint: "Anthropic · Oracle · Docker · Google",
      group: "Sections",
      href: "#certifications",
    },
    {
      id: "section-beyond",
      label: "Beyond the Build",
      hint: "Transcendent · campus leadership",
      group: "Sections",
      href: "#beyond",
    },
    {
      id: "section-contact",
      label: "Contact",
      hint: "Email · LinkedIn · GitHub · LeetCode",
      group: "Sections",
      href: "#contact",
    },
    ...PROJECTS.map((project) => ({
      id: `palette-project-${project.id}`,
      label: project.title,
      hint: project.stack.slice(0, 3).join(" · "),
      group: "Projects",
      href: `#project-${project.id}`,
    })),
    ...EXPERIENCE.map((entry) => ({
      id: `palette-role-${entry.id}`,
      label: `${entry.role} — ${entry.organization}`,
      hint: entry.period,
      group: "Experience",
      href: `#role-${entry.id}`,
    })),
    ...CERTIFICATIONS.map((certification) => ({
      id: `palette-cert-${certification.id}`,
      label: certification.name,
      hint: certification.issuer,
      group: "Certifications",
      href: `#cert-${certification.id}`,
    })),
    ...SKILL_INDEX.map((skill) => ({
      id: `palette-skill-${skill.label}`,
      label: skill.label,
      hint: skill.hint,
      group: "Skills",
      href: skill.href,
    })),
  ];
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? <PaletteDialog onClose={onClose} /> : null}
    </AnimatePresence>
  );
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => buildItems(), []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = needle
      ? items.filter((item) =>
          `${item.label} ${item.hint} ${item.group}`
            .toLowerCase()
            .includes(needle),
        )
      : items;
    return GROUP_ORDER.flatMap((group) =>
      matched.filter((item) => item.group === group),
    );
  }, [items, query]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, []);

  const jump = (item: PaletteItem) => {
    onClose();
    window.requestAnimationFrame(() => {
      document.querySelector(item.href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", item.href);
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        results.length ? (current + 1) % results.length : 0,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        results.length ? (current - 1 + results.length) % results.length : 0,
      );
      return;
    }

    if (event.key === "Enter") {
      const item = results[activeIndex];
      if (item) {
        event.preventDefault();
        jump(item);
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  const activeItem = results[activeIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-showcase/45 p-4 pt-[12vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search this portfolio"
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-blue/20 bg-surface shadow-lifted"
          >
            <div className="flex items-center gap-3 border-b border-slate-blue/12 px-4 py-3">
              <span
                aria-hidden="true"
                className="font-mono text-[11px] text-steel-blue"
              >
                /
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-results"
                aria-autocomplete="list"
                aria-activedescendant={
                  activeItem ? `palette-option-${activeItem.id}` : undefined
                }
                placeholder="Jump to a project, role, skill or certification…"
                className="w-full bg-transparent text-[14px] text-primary placeholder:text-secondary/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-md border border-slate-blue/20 px-2 py-1 font-mono text-[9.5px] tracking-[0.1em] text-secondary uppercase transition-colors hover:border-steel-blue/40 hover:text-steel-blue"
              >
                Esc
              </button>
            </div>

            <ul
              id="palette-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-[min(56vh,420px)] overflow-y-auto px-2 py-2"
            >
              {results.length === 0 ? (
                <li className="px-3 py-8 text-center text-[12.5px] text-secondary">
                  No matches for “{query}”.
                </li>
              ) : null}

              {results.map((item, index) => {
                const startsGroup =
                  index === 0 || results[index - 1].group !== item.group;
                const isActive = index === activeIndex;
                return (
                  <li key={item.id} role="presentation">
                    {startsGroup ? (
                      <p className="px-3 pt-3 pb-1 font-mono text-[9px] font-medium tracking-[0.18em] text-slate-blue/80 uppercase">
                        {item.group}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      id={`palette-option-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => jump(item)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                        isActive ? "bg-powder-blue/25" : "hover:bg-tint"
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-primary">
                          {item.label}
                        </span>
                        <span className="block truncate text-[11px] text-secondary/85">
                          {item.hint}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`font-mono text-[10px] ${
                          isActive ? "text-steel-blue" : "text-transparent"
                        }`}
                      >
                        ↵
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-slate-blue/12 bg-tint/50 px-4 py-2 font-mono text-[9.5px] tracking-[0.08em] text-secondary/80 uppercase">
              <span>↑↓ navigate · ↵ jump · esc close</span>
              <span>{results.length} results</span>
            </div>
      </motion.div>
    </motion.div>
  );
}
