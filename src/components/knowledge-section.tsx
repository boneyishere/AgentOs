import {
  ArrowRight,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Code2,
} from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const SOURCES = [
  { label: "Websites", icon: Globe },
  { label: "PDFs", icon: FileText },
  { label: "Markdown / JSON", icon: Code2 },
  { label: "FAQs & Q&A", icon: HelpCircle },
  { label: "Company Documents", icon: Layers },
];

const PIPELINE = [
  "Document Processing",
  "Chunking",
  "Embeddings",
  "Vector Search",
  "Semantic Retrieval",
];

export function KnowledgeSection() {
  return (
    <section id="knowledge" className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Knowledge &amp; RAG</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-tight sm:text-4xl">
            Connect the knowledge your agents need
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">
            Import from websites, PDFs, docs, and FAQs. The same knowledge
            base powers both chat and voice agents.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap justify-center gap-3">
          {SOURCES.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm"
            >
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </div>
          ))}
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border bg-background p-6 shadow-sm"
        >
          {PIPELINE.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg bg-surface px-3 py-2 text-sm font-medium text-foreground">
                {step}
              </span>
              {i < PIPELINE.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-foreground-muted" />
              )}
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
