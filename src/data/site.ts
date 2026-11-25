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
 * Three primary destinations only: the work, the experience, and the
 * life beyond it. Education and certifications stay reachable from the
 * command palette so the navbar never competes with the work itself.
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
    id: "beyond",
    label: "Beyond Work",
    index: "03",
    href: "#beyond",
    sections: ["beyond"],
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

/** Persistent resume shortcut pointing at the PDF in `public/resume/`. */
export const RESUME_SHORTCUT = {
  label: "Resume",
  windowTitle: "MANVITHA-YALAMANCHILI-RESUME.PDF",
  href: "/resume/manvitha-yalamanchili-resume.pdf" as string | null,
  placeholder: false as boolean,
};
