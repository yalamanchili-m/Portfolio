/**
 * PORTFOLIO CONTENT TYPES.
 * Content is supplied by the owner: projects mirror the public GitHub
 * profile, education follows the CBIT B.E. CSE (R22) regulation, and
 * experience/editorial details come from the owner's own write-ups.
 */

export type OwnerLink = { label: string; href: string | null };

export type ProjectStatus = "completed" | "in-progress" | "prototype";

/** A repository/project shown in the Projects section. */
export type Project = {
  id: string;
  title: string;
  /** Short positioning line under the title. */
  summary: string;
  problem: string;
  solution: string;
  /** Concise build highlights (2–4 bullets). */
  highlights: string[];
  stack: string[];
  githubUrl: string;
  liveUrl: string | null;
  status?: ProjectStatus;
  /** Theme-aware preview illustration used on flagship cards. */
  preview?: "platform" | "transformer" | "planner";
};

export type Education = {
  degree: string;
  regulation: string;
  institution: string;
  location: string;
  coreFoundations: string[];
  electives: string[];
};

export type BeyondCardPillar = {
  title: string;
  description: string;
};

export type BeyondCardSection = {
  title: string;
  points: string[];
  /** Optional numbered pillar grid rendered inside the section. */
  pillars?: BeyondCardPillar[];
};

export type BeyondCardLink = { label: string; href: string };

export type BeyondCardDetails = {
  progression?: string;
  sections: BeyondCardSection[];
  /** External press/coverage links rendered as buttons in the modal. */
  media?: BeyondCardLink[];
  /** Heading above `media`; defaults to "Media & press". */
  mediaLabel?: string;
};

export type BeyondTechCard = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  /** Accent pill shown at the top of the card instead of "View details". */
  badge?: string;
  /** Present when the card opens a detail modal. */
  details?: BeyondCardDetails;
};

export type BeyondTech = {
  intro: string;
  cards: BeyondTechCard[];
};

export type HeroContent = {
  /** Status line in the eyebrow pill. */
  availability: string;
  location: string;
  /** Display headline, one entry per line; the last line carries the accent. */
  headline: string[];
  /** The trailing word of the headline rendered in the accent color. */
  headlineAccent: string;
  /** Bio copy; `**...**` spans render as accent-colored emphasis. */
  summary: string;
};

export type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  location: string | null;
  period: string;
  /** Compact range for the timeline node under the track. */
  shortPeriod: string;
  summary: string;
  highlights: string[];
  /** Short skill tags rendered under the details. */
  skills: string[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  note?: string;
  skills?: string[];
};

export type SocialLinks = {
  email: OwnerLink;
  github: OwnerLink;
  linkedin: OwnerLink;
  leetcode: OwnerLink;
  others: OwnerLink[];
  verified: boolean;
};
