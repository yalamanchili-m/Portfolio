import type { Certification } from "@/types/portfolio";

/** CERTIFICATIONS: verified credentials, newest issuer grouping first. */
export const CERTIFICATIONS: Certification[] = [
  {
    id: "ccar-p",
    name: "Claude Certified Architect – Professional (CCAR-P)",
    issuer: "Anthropic",
    skills: ["Agentic systems", "Architecture", "LLM workflows"],
  },
  {
    id: "ccao-f",
    name: "Claude Certified Associate – Foundations (CCAO-F)",
    issuer: "Anthropic",
    skills: ["Claude", "Prompt engineering", "AI foundations"],
  },
  {
    id: "oci-ai",
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    skills: ["Cloud infrastructure", "AI foundations"],
  },
  {
    id: "docker-foundations",
    name: "Docker Foundations Professional Certificate",
    issuer: "Docker, Inc.",
    note: "Issued June 2025",
    skills: ["Docker Products", "Containerization"],
  },
  {
    id: "google-it-automation",
    name: "IT Automation with Python",
    issuer: "Google",
    skills: ["Python", "Automation"],
  },
];
