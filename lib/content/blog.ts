export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  sections: BlogSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-attribution-breaks-and-how-to-fix-it",
    title: "Why Attribution Breaks — and the Practical Way to Fix It",
    excerpt:
      "When every platform claims credit, leadership loses confidence. Here’s how to rebuild a measurement stack your team can actually use.",
    category: "Analytics",
    date: "2026-04-12",
    readTime: "8 min read",
    sections: [
      {
        type: "paragraph",
        text: "Attribution arguments usually aren’t about math — they’re about mismatched definitions. Paid platforms optimize to their own conversion events, CRM teams track pipeline stages differently, and finance measures cash timing another way. When those worlds don’t connect, marketing looks like guesswork even when the work is competent.",
      },
      {
        type: "heading",
        text: "Start with the decision, not the dashboard",
      },
      {
        type: "paragraph",
        text: "Before you pick a model, clarify what decision the data must support: budget allocation, creative direction, offer changes, or hiring. A dashboard built for weekly budget decisions should not look like one built for quarterly brand planning.",
      },
      {
        type: "list",
        items: [
          "Define one primary success metric per initiative for a 90-day window.",
          "Separate reporting for diagnostic metrics (CTR, CPC) from decision metrics (CPA, ROAS, pipeline).",
          "Document known gaps (offline conversions, long sales cycles) instead of pretending they don’t exist.",
        ],
      },
      {
        type: "heading",
        text: "Make tracking boring — in a good way",
      },
      {
        type: "paragraph",
        text: "Reliable attribution requires boring fundamentals: consistent event names, tested parameters, and a QA checklist before campaigns scale. The fastest way to rebuild trust is to show stakeholders how a conversion is created end-to-end — from click to CRM — even if the story includes imperfections.",
      },
    ],
  },
  {
    slug: "seo-momentum-without-shortcuts",
    title: "SEO Momentum Without Shortcuts: A Framework for Durable Rankings",
    excerpt:
      "Sustainable SEO is a compounding system: technical clarity, helpful content, and topical authority — executed with patience and measurement.",
    category: "SEO",
    date: "2026-03-28",
    readTime: "7 min read",
    sections: [
      {
        type: "paragraph",
        text: "Short-term SEO tactics can spike impressions, but they rarely build a moat. The brands that win over years treat organic search like product work: ship, measure, refine — and protect site health like it’s infrastructure.",
      },
      {
        type: "heading",
        text: "Technical foundations are leverage",
      },
      {
        type: "paragraph",
        text: "If crawlers can’t consistently access and interpret your pages, content investment underperforms by default. Prioritize fixes by impact and effort: indexation issues and canonical conflicts often beat micro-optimizations that look busy but move nothing.",
      },
      {
        type: "heading",
        text: "Write for intent, not just keywords",
      },
      {
        type: "list",
        items: [
          "Map each page to a single primary intent and one primary action.",
          "Differentiate with proof, examples, and specificity — not generic definitions.",
          "Refresh winners quarterly; prune or merge pages that cannibalize each other.",
        ],
      },
      {
        type: "paragraph",
        text: "When SEO is treated as a system, results arrive in stair-steps: quiet weeks, then sudden lifts as authority and relevance align. The goal is to make those lifts repeatable — not lucky.",
      },
    ],
  },
  {
    slug: "meta-ads-creative-testing-playbook",
    title: "A Creative Testing Playbook for Meta Ads (That Doesn’t Waste Budget)",
    excerpt:
      "Creative is the new targeting. Here’s a disciplined testing structure that produces learning even when individual ads don’t win.",
    category: "Paid Media",
    date: "2026-03-09",
    readTime: "9 min read",
    sections: [
      {
        type: "paragraph",
        text: "Most Meta performance issues trace back to creative fatigue, weak message-market fit, or tests that change too many variables at once. A playbook helps teams move fast without mistaking motion for progress.",
      },
      {
        type: "heading",
        text: "Batch creative around hypotheses",
      },
      {
        type: "paragraph",
        text: "Each batch should answer one question: a new angle, a new proof point, a new offer framing, or a new hook format. If a batch tries to answer everything, outcomes become uninterpretable — and teams default to taste-based opinions.",
      },
      {
        type: "list",
        items: [
          "Use a naming convention that encodes hypothesis + variant + date.",
          "Set minimum learning budgets and minimum runtime rules before launch.",
          "Promote winners, document why losers failed, and recycle insights into landing pages.",
        ],
      },
      {
        type: "heading",
        text: "Pair ads with post-click continuity",
      },
      {
        type: "paragraph",
        text: "The fastest way to make great ads look mediocre is a landing page that doesn’t continue the promise. Message match isn’t cosmetic — it’s conversion infrastructure.",
      },
    ],
  },
  {
    slug: "landing-pages-that-close-the-gap",
    title: "Landing Pages That Close the Gap Between Click and Conversion",
    excerpt:
      "High-performing pages aren’t prettier — they’re clearer. These principles consistently move bounce rate and conversion in the right direction.",
    category: "CRO",
    date: "2026-02-21",
    readTime: "6 min read",
    sections: [
      {
        type: "paragraph",
        text: "Visitors don’t fail to convert because they dislike your brand colors. They fail because they can’t answer three questions in seconds: what this is, why it matters, and what to do next.",
      },
      {
        type: "heading",
        text: "Above-the-fold clarity beats cleverness",
      },
      {
        type: "paragraph",
        text: "Your headline should complete the ad’s promise, not introduce a new story. Supporting copy should reduce perceived risk: specificity, proof, and a reason to believe now rather than later.",
      },
      {
        type: "heading",
        text: "Design for mobile scanning",
      },
      {
        type: "list",
        items: [
          "One primary CTA; secondary actions only if they truly help decisions.",
          "Proof near claims — not buried at the bottom.",
          "Reduce input friction; ask only what you need to start a conversation.",
        ],
      },
      {
        type: "paragraph",
        text: "When you test, test meaningful alternatives: offer structure, proof placement, and headline promises. Those teach you about buyers — not just about layout preferences.",
      },
    ],
  },
]

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getAllPostSlugs() {
  return BLOG_POSTS.map((p) => p.slug)
}
