import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  MessagesSquare,
  Activity,
  ListChecks,
  Building2,
  Stethoscope,
  Truck,
} from "lucide-react";
import type { CoverColor } from "@/components/resource-cover";

export type ResourceImage = {
  color: CoverColor;
  icon: LucideIcon;
};

export type ArticleResource = {
  slug: string;
  category: "Article";
  title: string;
  excerpt: string;
  date: string;
  image: ResourceImage;
  body: string[];
};

export type CaseStudyResource = {
  slug: string;
  category: "Case Study";
  title: string;
  excerpt: string;
  date: string;
  image: ResourceImage;
  problem: string;
  implementation: string;
  outcome: string;
};

export type Resource = ArticleResource | CaseStudyResource;

export const RESOURCES: Resource[] = [
  {
    slug: "designing-handoff",
    category: "Article",
    title: "How to design an AI agent that knows when to hand off",
    excerpt:
      "Handoff isn't a failure state — it's a design decision. Here's how to build escalation rules that keep customers confident, not stuck.",
    date: "2026-01-14",
    image: { color: "indigo", icon: ArrowRightLeft },
    body: [
      "The best AI agents aren't the ones that never escalate — they're the ones that escalate at exactly the right moment. Treating every handoff as a failure pushes teams toward agents that stall, hedge, or loop rather than admit they've hit a limit.",
      "Start by mapping the handoff triggers explicitly: unresolved intent after two clarifying questions, explicit customer request for a human, anything touching billing disputes or legal language, and any action the agent isn't authorized to take on its own.",
      "When a handoff happens, the agent should pass along a summary of the conversation so far — not just a transcript, but the intent, what's already been tried, and what the customer actually needs. That's what makes a handoff feel like a relay, not a restart.",
      "Measure it like a feature, not an exception: track handoff rate by intent category, and use it to find where your knowledge base or instructions need work — a rising handoff rate on one topic is a signal, not noise.",
    ],
  },
  {
    slug: "voice-vs-chat",
    category: "Article",
    title: "Voice vs. chat: choosing the right channel first",
    excerpt:
      "Most businesses default to chat because it's easier to ship. That's not always where your customers actually want to talk to you.",
    date: "2025-11-03",
    image: { color: "violet", icon: MessagesSquare },
    body: [
      "Chat is easier to launch, easier to review, and easier to iterate on — which is exactly why most teams start there, whether or not it's where their customers actually want to be.",
      "Voice tends to win when the interaction is time-sensitive (a missed appointment, a service outage) or when typing is inconvenient (a customer driving, a tradesperson on a job site). Chat tends to win for anything that benefits from a paper trail, or when a customer is multitasking and doesn't want a live conversation.",
      "The strongest setups don't force a choice — the same knowledge, memory, and instructions power both, so a conversation that starts as a missed call can continue as a text, and a chat that gets complicated can become a call, without starting over.",
      "If you can only launch one channel first, look at where your support volume already concentrates today. That's usually a better signal than which channel is faster to build.",
    ],
  },
  {
    slug: "conversation-intelligence",
    category: "Article",
    title: "What conversation intelligence actually measures",
    excerpt:
      "Transcripts are data. Conversation intelligence is what turns that data into decisions your team can act on.",
    date: "2025-09-22",
    image: { color: "pink", icon: Activity },
    body: [
      "Every AI conversation produces a transcript by default — but a transcript alone doesn't tell you anything a person hasn't already read. Conversation intelligence is the layer that turns that raw text into structured signal.",
      "At minimum, that means intent classification (what was this conversation actually about), sentiment (how did the customer feel by the end, not just the start), and lead scoring for anything sales-adjacent (qualified, potential, unqualified).",
      "The useful version of this isn't a dashboard nobody opens — it's signal routed to the team that can act on it: a spike in negative sentiment on a specific topic reaching support leadership, a qualified lead reaching sales within minutes, not days.",
      "Treat it as an ongoing feedback loop for the agent itself, too. If conversation intelligence keeps surfacing the same unresolved question, that's a knowledge base gap, not just a support ticket.",
    ],
  },
  {
    slug: "deployment-checklist",
    category: "Article",
    title: "A checklist before deploying your first AI agent",
    excerpt:
      "Most first deployments fail on scope, not technology. A short list of questions to answer before you go live.",
    date: "2025-08-05",
    image: { color: "mint", icon: ListChecks },
    body: [
      "Before writing a single instruction, define the agent's scope in one sentence: what it handles, and — just as important — what it explicitly hands off. Vague scope is the single most common cause of a rocky first deployment.",
      "Load the knowledge base with the documents your team actually references today, not an idealized version of them. If your team keeps a separate spreadsheet of exceptions to the official policy, the agent needs that too.",
      "Write escalation rules before launch, not after the first bad conversation. Decide upfront what happens with angry customers, ambiguous requests, and anything touching money or legal commitments.",
      "Start with a narrow, real use case — one call type, one chat flow — rather than trying to cover every conversation on day one. Expand scope after you've seen real transcripts, not before.",
    ],
  },
  {
    slug: "northwind-retail",
    category: "Case Study",
    title: "Northwind Retail",
    excerpt: "Fewer missed customer inquiries, faster response time.",
    date: "2025-10-12",
    image: { color: "indigo", icon: Building2 },
    problem: "After-hours calls went to voicemail and were rarely returned.",
    implementation:
      "A Codely voice agent answers around the clock, checks store hours and inventory FAQs, and books callbacks.",
    outcome: "Fewer missed customer inquiries, faster response time.",
  },
  {
    slug: "bellcastle-clinics",
    category: "Case Study",
    title: "Bellcastle Clinics",
    excerpt: "Lower front-desk call volume, no double-bookings.",
    date: "2025-07-29",
    image: { color: "violet", icon: Stethoscope },
    problem: "Front desk overwhelmed by reschedule requests.",
    implementation:
      "Codely handles rescheduling end-to-end via voice and chat, synced to the practice calendar.",
    outcome: "Lower front-desk call volume, no double-bookings.",
  },
  {
    slug: "ferrow-logistics",
    category: "Case Study",
    title: "Ferrow Logistics",
    excerpt: "Sales team spends time only on qualified conversations.",
    date: "2025-05-16",
    image: { color: "pink", icon: Truck },
    problem:
      "Inbound sales calls weren't consistently qualified before reaching reps.",
    implementation:
      "A Codely voice agent asks qualification questions and pushes structured lead data to the CRM.",
    outcome: "Sales team spends time only on qualified conversations.",
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
