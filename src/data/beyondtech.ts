import type { BeyondTech } from "@/types/portfolio";

/**
 * BEYOND THE BUILD: cross-border hackathon work, editorial leadership, and
 * campus responsibilities. SustainLoop and Transcendent carry full detail
 * for their modals; the remaining cards are concise role summaries.
 */
export const BEYOND_TECH: BeyondTech = {
  intro:
    "Cross-border climate work, editorial leadership, and campus responsibilities outside the terminal.",
  cards: [
    {
      id: "sustainloop",
      badge: "Global winner · SIF Climate Hack",
      title: "SustainLoop — AI Circular Economy Platform",
      subtitle:
        "Singapore International Foundation (SIF) · Cross-Border Innovation",
      summary:
        "Selected as 1 of 3 winning teams globally (300+ participants across 27 countries) for building an AI-powered circular economy platform that helps SMEs and manufacturers turn surplus materials and idle equipment into revenue.",
      tags: [],
      footerCue: "Click to view full impact & press",
      details: {
        progression: "Top 3 winning teams · 10 shortlisted finalists",
        sections: [
          {
            title: "Event & recognition",
            points: [
              "Singapore International Foundation (SIF) Climate Hack 2024 · September 2024 – February 2025.",
              "Top 3 winning teams out of 10 shortlisted finalists, chosen from 300+ participants across 27 countries.",
              "Cross-border team spanning India, Malaysia, and the Philippines.",
            ],
          },
          {
            title: "Problem & solution overview",
            points: [
              "Designed for SMEs and large manufacturers across construction, manufacturing, and retail.",
              "Transforms surplus materials and industrial waste into economic value by connecting fragmented resource ecosystems.",
            ],
          },
          {
            title: "Four core platform pillars",
            points: [],
            pillars: [
              {
                title: "Surplus Material Trading",
                description:
                  "Connects businesses with organizations that can reuse or recover excess materials.",
              },
              {
                title: "Equipment Leasing",
                description:
                  "Improves utilization of underused industrial equipment through shared access.",
              },
              {
                title: "Upcycled Goods Promotion",
                description:
                  "Enables discovery and circulation of products made from recovered materials.",
              },
              {
                title: "AI Insights & ESG Tools",
                description:
                  "Supports resource optimization, lifecycle visibility, and automated sustainability reporting.",
              },
            ],
          },
          {
            title: "My role & strategic contributions",
            points: [
              "Articulated the unified value proposition linking waste reduction, procurement optimization, and intelligent resource lifecycle management.",
              "Defined product differentiation around cost efficiency (targeting up to 15% projected cost savings), material traceability, and new revenue streams from surplus inventory.",
              "Led pitch development and presented the business case on Pitch Day (22 February 2025), advancing to follow-up discussions with PETRONAS.",
            ],
          },
        ],
        media: [
          {
            label: "SIF Newsroom Feature",
            href: "https://ftp.sif.org.sg/Latest/Newsroom/Data/Newsroom/Youth-Innovators-Leverage-Cross-Border-Collaboration-to-Solve-Shared-Challenges-at-Climate-Hack-2024",
          },
          {
            label: "ANI News Coverage",
            href: "https://www.aninews.in/news/business/youth-innovators-leverage-cross-border-collaboration-to-solve-shared-challenges-at-climate-hack-202420250228113316/",
          },
        ],
      },
    },
    {
      id: "transcendent",
      title: "Editor-in-Chief, Transcendent",
      subtitle: "College Publication & Editorial Leadership",
      summary:
        "Progressed from Sub Editor to Deputy Editor-in-Chief and Editor-in-Chief, leading a 30-member team to publish 6 newsletters, oversee Substack articles, and organize 3 major campus events engaging 1,000+ students.",
      tags: ["Editorial", "Team leadership", "Events"],
      details: {
        progression: "Sub Editor → Deputy Editor-in-Chief → Editor-in-Chief",
        sections: [
          {
            title: "Editorial Leadership & Content Development",
            points: [
              "Led the publication of 6 newsletters — planning, writing, editing, and design.",
              "Authored and edited 2 articles on Paramount Press's Substack covering democracy, dissent, civic responsibility, music, and culture.",
              "Managed editorial workflows and publication standards.",
            ],
          },
          {
            title: "Team Management & Recruitment",
            points: [
              "Managed a 30-member team.",
              "Conducted interviews, selected and onboarded new members, and coordinated cross-functional groups.",
            ],
          },
          {
            title: "Events & Campus Engagement",
            points: [
              "Organized 3 major events annually drawing 1,000+ student participants.",
              "Included inter-club collaborations during the annual college fest.",
            ],
          },
          {
            title: "Budgeting & Vendor Coordination",
            points: [
              "Managed event budgets with college authorities.",
              "Handled external vendor liaison and procurement for club merchandise.",
            ],
          },
        ],
      },
    },
    {
      id: "cbit-osc",
      title: "Junior Developer",
      subtitle: "CBIT Open Source Community",
      summary:
        "Supported external affairs and workshop programming for the open-source community, including a Git and GitHub workshop for 300+ participants.",
      tags: ["Open source", "Workshops", "Community"],
    },
    {
      id: "placement-coordinator",
      title: "Placement Coordinator",
      subtitle: "Chaitanya Bharathi Institute of Technology (CBIT)",
      summary:
        "Coordinated between the placement cell, recruiting companies, and students to keep drives organized, schedules aligned, and candidates informed.",
      tags: ["Coordination", "Placements", "Communication"],
    },
    {
      id: "fest-committee",
      title: "Executive Board Member",
      subtitle: "Campus Cultural & Annual Fest Committee",
      summary:
        "Served on the core organizing body responsible for planning and executing the annual college cultural festival across programming, logistics, and student teams.",
      tags: ["Fest organizing", "Logistics", "Leadership"],
    },
    {
      id: "ncc",
      title: "NCC A-Certificate",
      subtitle: "National Cadet Corps",
      summary:
        "Awarded the NCC A-Certificate for completing cadet training, drills, and camp participation.",
      tags: ["Discipline", "Training"],
    },
  ],
};
