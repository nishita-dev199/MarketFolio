export type ServiceContent = {
  slug: string
  title: string
  summary: string
  stat: string
  heroTagline: string
  overview: string
  outcomes: string[]
  processSteps: { title: string; description: string }[]
  idealFor: string[]
}

export const SERVICES: ServiceContent[] = [
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    summary:
      "Precision-targeted Meta and Google Ads campaigns engineered to maximize reach and minimize CPA through algorithmic bidding and creative testing.",
    stat: "4.2× avg. ROAS",
    heroTagline: "Paid media that compounds — not campaigns that coast.",
    overview:
      "We build acquisition systems where creative, audience structure, and bidding reinforce each other. The goal is simple: predictable growth with guardrails — so spend scales when efficiency holds, and pauses when it doesn’t.",
    outcomes: [
      "Structured testing roadmap for creative, audiences, and landing experiences",
      "Budget pacing tied to efficiency thresholds — not vanity volume",
      "Clean conversion tracking and event quality reviews to protect signal",
      "Reporting you can act on: profit-focused, not dashboard theater",
    ],
    processSteps: [
      {
        title: "Baseline & constraints",
        description:
          "We map your economics, margins, and acceptable CPA/ROAS bands, then audit tracking and account structure before spend moves.",
      },
      {
        title: "Build the testing loop",
        description:
          "Creative batches, audience hypotheses, and bid strategies are sequenced so each test teaches the next — reducing random pivots.",
      },
      {
        title: "Scale with governance",
        description:
          "Winners graduate into stable scaling budgets; losers get documented learnings. Governance keeps performance from drifting quietly.",
      },
    ],
    idealFor: [
      "Brands ready to invest behind measurement, not guesses",
      "Teams that want paid media aligned to revenue — not just clicks",
      "Businesses hitting a scaling ceiling due to inconsistent creative or structure",
    ],
  },
  {
    slug: "funnel-based-approach",
    title: "Funnel-Based Approach",
    summary:
      "A strategic journey from Awareness to Lead to Conversion. We build automated ecosystems that nurture cold traffic into high-value customers.",
    stat: "28% higher conversion rate",
    heroTagline: "Turn scattered touchpoints into one coherent buyer journey.",
    overview:
      "Most growth problems aren’t channel problems — they’re sequencing problems. We design funnels where each stage earns the next: message match, offer clarity, and follow-through that doesn’t leak intent.",
    outcomes: [
      "Stage-by-stage messaging that matches intent (cold vs warm vs hot)",
      "Automation that supports sales timing — without feeling robotic",
      "Offer packaging designed to reduce hesitation at decision moments",
      "Funnel diagnostics: where drop-off happens and what to fix first",
    ],
    processSteps: [
      {
        title: "Map the real journey",
        description:
          "We interview the funnel as your customer experiences it — ads, pages, emails, sales steps — and identify friction, not opinions.",
      },
      {
        title: "Design the minimum viable path",
        description:
          "We tighten the shortest trustworthy path to conversion before adding complexity, so improvements are measurable.",
      },
      {
        title: "Instrument & iterate",
        description:
          "Each stage gets a success metric. We iterate where leverage is highest, not where it’s easiest to tweak.",
      },
    ],
    idealFor: [
      "Businesses with leads that don’t convert consistently",
      "Teams selling higher-consideration offers",
      "Companies adding channels without a unifying journey story",
    ],
  },
  {
    slug: "landing-page-optimization",
    title: "Landing Page Optimization",
    summary:
      "We design and split-test high-intent landing pages that reduce friction and compel action, ensuring every ad dollar works twice as hard.",
    stat: "35% reduction in bounce rate",
    heroTagline: "Pages engineered for clarity, speed, and decisive action.",
    overview:
      "A great ad with a weak page is a tax on attention. We optimize above-the-fold clarity, proof placement, objection handling, and mobile usability — then validate changes with disciplined testing.",
    outcomes: [
      "Message match between ad promise and page headline (reduced bounce)",
      "Structured experiments: hypotheses, variants, and decision rules",
      "Performance-focused UX: speed, scannability, and friction removal",
      "Copy architecture that supports skimmers and deep readers alike",
    ],
    processSteps: [
      {
        title: "Heuristic & analytics review",
        description:
          "We combine qualitative critique with scroll, click, and drop-off signals to prioritize what actually moves conversion.",
      },
      {
        title: "Variant design",
        description:
          "We ship meaningful differences — not button-color roulette — so tests produce learning even when they don’t win.",
      },
      {
        title: "Learn, consolidate, repeat",
        description:
          "Winning patterns become system standards; insights feed creative and funnel strategy upstream.",
      },
    ],
    idealFor: [
      "Brands spending on traffic but seeing weak on-page conversion",
      "Teams launching new offers and needing a strong first impression",
      "Sites with fast traffic growth and stagnant conversion rates",
    ],
  },
  {
    slug: "seo-organic-growth",
    title: "SEO & Organic Growth",
    summary:
      "Dominate search results with technical SEO and semantic content strategies that build long-term authority and drive zero-cost traffic.",
    stat: "5.5× organic traffic lift",
    heroTagline: "Organic growth built on technical discipline and semantic depth.",
    overview:
      "SEO rewards consistency: crawl clarity, helpful content, and topical authority. We focus on durable foundations — site health, internal linking, intent-aligned content — not shortcuts that age poorly.",
    outcomes: [
      "Technical audits with prioritized fixes tied to impact and effort",
      "Content plans mapped to search intent and business value",
      "Internal linking and entity structure that reinforces topical relevance",
      "Monitoring that catches regressions before rankings silently slip",
    ],
    processSteps: [
      {
        title: "Crawl & index clarity",
        description:
          "We ensure search engines can access, understand, and trust your site structure — the prerequisite for everything else.",
      },
      {
        title: "Intent-led content production",
        description:
          "We publish pages designed to win specific intents, with differentiation readers (and Google) can recognize.",
      },
      {
        title: "Compounding iterations",
        description:
          "SEO improves through updates: refreshes, expansions, and internal link upgrades that stack over quarters.",
      },
    ],
    idealFor: [
      "Brands investing in content but not seeing compounding traffic",
      "Sites with technical debt silently limiting visibility",
      "Teams competing in categories where trust and depth matter",
    ],
  },
  {
    slug: "retargeting-campaigns",
    title: "Retargeting Campaigns",
    summary:
      "Re-engage lost visitors with precision dynamic ads. We keep your brand top-of-mind across the digital ecosystem until they convert.",
    stat: "2.8× increase in LTV",
    heroTagline: "Bring high-intent visitors back — without burning budgets on noise.",
    overview:
      "Retargeting works when frequency, creative, and audience segmentation are intentional. We structure remarketing pools so you re-engage the right hesitations — not every passerby.",
    outcomes: [
      "Segmented audiences based on intent signals (not one big remarketing blob)",
      "Creative rotations that address objections and next-step clarity",
      "Frequency controls that protect brand experience and efficiency",
      "Measurement that isolates incremental value where possible",
    ],
    processSteps: [
      {
        title: "Define meaningful segments",
        description:
          "We separate true consideration signals from shallow visits so spend follows intent.",
      },
      {
        title: "Creative matched to hesitation",
        description:
          "Different segments get different proof, offers, and reminders — aligned to why they paused.",
      },
      {
        title: "Optimize for profitability",
        description:
          "We refine exclusions, caps, and bids so retargeting supports LTV — not endless cheap clicks.",
      },
    ],
    idealFor: [
      "Brands with strong traffic but leaky follow-through",
      "Ecommerce and lead gen with longer decision cycles",
      "Teams seeing expensive remarketing with unclear incremental lift",
    ],
  },
  {
    slug: "data-driven-decision-making",
    title: "Data-Driven Decision Making",
    summary:
      "Zero guesswork. We use advanced attribution modeling and closed-loop analytics to allocate your budget where it generates the most profit.",
    stat: "100% transparent reporting",
    heroTagline: "Decisions anchored to evidence — and narratives your team can trust.",
    overview:
      "Good marketing needs a shared source of truth. We tighten event definitions, conversion mapping, and reporting so leadership sees what’s working, what’s fragile, and what to do next — without drowning in charts.",
    outcomes: [
      "Event and parameter hygiene for reliable downstream reporting",
      "Dashboards oriented around decisions, not vanity metrics",
      "Clear definitions: leads, qualified leads, revenue proxies",
      "Review cadences that connect analytics to budget allocation",
    ],
    processSteps: [
      {
        title: "Measurement blueprint",
        description:
          "We align on what “conversion” means across channels and teams — then build tracking to match reality.",
      },
      {
        title: "QA & reconciliation",
        description:
          "We test events, validate funnels, and reduce double-counting and gaps that quietly distort decisions.",
      },
      {
        title: "Operational reporting",
        description:
          "Reporting becomes a weekly rhythm: what changed, why it matters, and the next experiment or reallocation.",
      },
    ],
    idealFor: [
      "Teams arguing about results because numbers don’t match",
      "Brands scaling spend without confidence in what’s incremental",
      "Organizations needing executive-ready clarity without technical jargon overload",
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

export function getAllServiceSlugs() {
  return SERVICES.map((s) => s.slug)
}
