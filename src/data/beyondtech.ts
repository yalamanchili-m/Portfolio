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
      tags: ["Climate tech", "Product strategy", "Pitch"],
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
        "I joined Transcendent as a Sub Editor and, over time, grew into the role of Editor-in-Chief. Along the way I led a 30-member team, published 6 newsletters, edited articles for a Substack publication, and organized 3 major campus events that drew 1,000+ students. I learned that a publication runs on trust, clear standards, and people who feel their voice matters.",
      tags: ["Editorial", "Team leadership", "Events"],
      details: {
        sections: [
          {
            title: "Editorial Leadership & Content",
            points: [
              "I led all 6 newsletters from the first plan to the final design — writing, editing, and shaping them to a consistent standard.",
              "I also authored and edited 2 articles for Paramount Press's Substack, on democracy, dissent, civic responsibility, music, and culture, because I believe students should think about the world around them, not just report on it.",
            ],
          },
          {
            title: "Building and Leading the Team",
            points: [
              "I managed a 30-member team.",
              "I interviewed candidates, chose and onboarded new members, and coordinated groups across functions so writers, editors, and designers worked as one team.",
            ],
          },
          {
            title: "Events & Campus Engagement",
            points: [
              "Each year I organized 3 major events that brought in 1,000+ student participants.",
              "That included collaborating with other clubs during the annual college fest, where good planning only counts if people show up and enjoy it.",
            ],
          },
          {
            title: "Budgets & Vendors",
            points: [
              "I handled event budgets with college authorities and managed external vendors and procurement for club merchandise.",
              "This taught me to plan around constraints and communicate clearly with people outside the team.",
            ],
          },
          {
            title: "Proof of Work",
            points: [
              "Paramount Press Substack: “Democracy, Debate, Dissent and Duty”.",
              "Transcendent newsletter, 2026 edition — full published issue.",
              "Transcendent newsletter, 2025 edition — full published issue.",
            ],
          },
        ],
        mediaLabel: "Proof of work",
        media: [
          {
            label: "Paramount Press essay",
            href: "https://paramountpress.substack.com/p/democracy-debate-dissent-and-duty",
          },
          {
            label: "Newsletter 2026",
            href: "https://drive.google.com/file/d/1kkBy9kPA4JA6hLf4E1JOqYabZxpCw1ax/view",
          },
          {
            label: "Newsletter 2025",
            href: "https://drive.google.com/file/d/1B3wy7hk2fp69IV-LjPlkGxA3LfUuB5UO/view",
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
