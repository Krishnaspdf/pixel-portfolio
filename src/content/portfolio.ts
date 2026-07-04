/*
 * Portfolio content — the ONLY place résumé data lives (ARCHITECTURE.md
 * Content System). Overlays (M6) render from this file; UI never hardcodes
 * copy. Placeholder text is acceptable until the final content pass in M11.
 */

export interface PortfolioProject {
  readonly id: string;
  /** Quest-style title (Projects render as "Completed Quests"). */
  readonly title: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly url?: string;
}

export interface PortfolioSkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface PortfolioContact {
  readonly email: string;
}

/** External links — rendered on the Ending Screen ONLY (canonical decision). */
export interface PortfolioExternalLinks {
  readonly resume: string;
  readonly github: string;
  readonly linkedin: string;
}

export interface PortfolioEnding {
  readonly thankYouMessage: string;
  readonly links: PortfolioExternalLinks;
}

export interface PortfolioContent {
  readonly name: string;
  readonly headline: string;
  /** Paragraphs for the Adventurer's Journal (About overlay). */
  readonly bio: readonly string[];
  /** Equipment Inventory (Tech Stack overlay). */
  readonly skills: readonly PortfolioSkillGroup[];
  /** Completed Quests (Projects overlay). */
  readonly projects: readonly PortfolioProject[];
  /** Guild Hall (Contact overlay) — contact info only, no external links. */
  readonly contact: PortfolioContact;
  readonly ending: PortfolioEnding;
}

export const PORTFOLIO: PortfolioContent = {
  name: "Krishna Dubey",
  headline: "Frontend Engineer & World Builder",
  bio: [
    "Placeholder: a short introduction for the Adventurer's Journal — who Krishna is and what drives the journey.",
    "Placeholder: the developer story — how the adventure into frontend engineering began.",
    "Placeholder: what Krishna is exploring next.",
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "HTML", "CSS"] },
    { category: "Frameworks", items: ["React", "Vite"] },
    { category: "Animation", items: ["GSAP", "ScrollTrigger"] },
    { category: "Tools", items: ["Git", "GitLab", "Vercel"] },
  ],
  projects: [
    {
      id: "pixelmon-journey",
      title: "PixelMon Journey",
      description:
        "Placeholder: this interactive side-scrolling portfolio itself — a miniature game engine in the browser.",
      tech: ["React", "TypeScript", "GSAP", "CSS"],
    },
    {
      id: "placeholder-quest-2",
      title: "Placeholder Quest II",
      description: "Placeholder: second project summary written as a completed quest.",
      tech: ["TypeScript"],
    },
    {
      id: "placeholder-quest-3",
      title: "Placeholder Quest III",
      description: "Placeholder: third project summary written as a completed quest.",
      tech: ["JavaScript"],
    },
  ],
  contact: {
    email: "placeholder@example.com",
  },
  ending: {
    thankYouMessage: "Thank you for exploring Krishna's world.",
    links: {
      // Placeholder URLs — final content pass happens in M11.
      resume: "#",
      github: "#",
      linkedin: "#",
    },
  },
};
