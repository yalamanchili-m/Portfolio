import type { HeroContent } from "@/types/portfolio";

export const OWNER_NAME = "Manvitha Yalamanchili";

/**
 * HERO COPY: an availability eyebrow, a value-proposition headline whose
 * final line lands on the accent word, then the bio.
 */
export const HERO: HeroContent = {
  availability: "Open to AI & Software Engineering roles",
  location: "Hyderabad, India",
  headline: ["I build agentic AI", "systems that plan,", "use tools, and ship."],
  headlineAccent: "ship.",
  summary:
    "I build LLM-powered workflows and full-stack software **people actually rely on** — spanning **browser automation, RAG pipelines, and data engineering**. Fascinated by the systems beneath the surface, I take ambiguous problems, break down their moving parts, and **own execution end to end**.",
};

export type NavItem = {
  id: string;
  label: string;
  /** Monospace index shown before the label. */
  index: string;
  /** Anchor the item scrolls to. */
  href: string;
  /** Section ids that should light this item up in the scroll-spy. */
  sections: string[];
};

/**
 * Three primary destinations only. "About" gathers the supporting
 * sections (education, certifications, beyond tech) behind one
 * scroll target so the navbar never competes with the work itself.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: "projects",
    label: "Projects",
    index: "01",
    href: "#projects",
    sections: ["projects"],
  },
  {
    id: "experience",
    label: "Experience",
    index: "02",
    href: "#experience",
    sections: ["experience"],
  },
  {
    id: "about",
    label: "About",
    index: "03",
    href: "#education",
    sections: ["education", "certifications", "beyond"],
  },
];

/** Lightweight skill index for the command palette's "Skills" group. */
export const SKILL_INDEX: { label: string; href: string; hint: string }[] = [
  { label: "Agentic AI", href: "#experience", hint: "Deloitte · LLM orchestration" },
  { label: "Browser automation", href: "#experience", hint: "Browser Use · Playwright" },
  { label: "RAG pipelines", href: "#project-recircle", hint: "ReCircle" },
  { label: "Python", href: "#experience", hint: "Engineering & analytics" },
  { label: "TypeScript / React", href: "#project-winwin", hint: "Full-stack builds" },
  { label: "SQL & BigQuery", href: "#experience", hint: "Data engineering" },
  { label: "Computer vision", href: "#project-nutrilens", hint: "NutriLens · UI research" },
  { label: "Cloud & Docker", href: "#experience", hint: "AWS · Docker Compose" },
];

/** Persistent resume shortcut. Replace the href once a real PDF is
 * supplied (drop it into `public/resume/`). */
export const RESUME_SHORTCUT = {
  label: "Resume",
  windowTitle: "RESUME.PDF",
  href: null as string | null,
  placeholder: true as boolean,
};
