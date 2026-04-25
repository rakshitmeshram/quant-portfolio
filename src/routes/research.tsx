import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import {
  Mail,
  ArrowRight,
  Grid3x3,
  Workflow,
  Brain,
  Network,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Insights — AR_" },
      { name: "description", content: "Notes on markets, models, and systems. Research driven by curiosity, validated by data." },
    ],
  }),
  component: ResearchPage,
});

const posts = [
  {
    title: "Why Most Backtests Lie",
    date: "May 12, 2024",
    read: "6 min read",
    desc: "Common backtesting pitfalls that inflate performance and how to build more realistic evaluations.",
    tags: ["Backtesting", "Methodology", "Risk"],
    chart: "line",
  },
  {
    title: "Factor Crowding is Underrated",
    date: "Apr 28, 2024",
    read: "8 min read",
    desc: "Measuring crowding in equity factors and its impact on future returns.",
    tags: ["Factors", "Crowding", "Equities"],
    chart: "scatter",
  },
  {
    title: "Latency is a Strategy",
    date: "Apr 10, 2024",
    read: "7 min read",
    desc: "How microstructure dynamics and latency advantages create sustainable edges.",
    tags: ["Microstructure", "Execution", "HFT"],
    chart: "bars",
  },
  {
    title: "Regime Detection with Hidden Markov Models",
    date: "Mar 22, 2024",
    read: "9 min read",
    desc: "Using HMMs to identify market regimes and adapt strategy exposure.",
    tags: ["Machine Learning", "Regime", "Python"],
    chart: "heat",
  },
  {
    title: "Transaction Costs Change Everything",
    date: "Mar 05, 2024",
    read: "5 min read",
    desc: "The compounding impact of costs and how to model them correctly.",
    tags: ["Transaction Costs", "Slippage", "Risk"],
    chart: "line",
  },
];

const categories = [
  { icon: Grid3x3, label: "All", count: 12, active: true },
  { icon: TrendingUp, label: "Market Microstructure", count: 4 },
  { icon: Workflow, label: "Quant Research", count: 3 },
  { icon: Network, label: "System Design", count: 2 },
  { icon: Brain, label: "Machine Learning", count: 2 },
  { icon: ShieldCheck, label: "Risk & Portfolio", count: 1 },
];

function MiniChart({ kind }: { kind: string }) {
  if (kind === "line") {
    return (
      <svg viewBox="0 0 200 100" className="h-full w-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.24 265)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.55 0.24 265)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,80 L20,75 L40,70 L60,72 L80,55 L100,60 L120,40 L140,45 L160,30 L180,25 L200,15 L200,100 L0,100 Z" fill="url(#g1)" />
        <polyline points="0,80 20,75 40,70 60,72 80,55 100,60 120,40 140,45 160,30 180,25 200,15" fill="none" stroke="oklch(0.18 0.01 250)" strokeWidth="1.5" />
        <circle cx="200" cy="15" r="2.5" fill="oklch(0.55 0.24 265)" />
      </svg>
    );
  }
  if (kind === "scatter") {
    const pts = Array.from({ length: 28 }, (_, i) => ({
      x: 10 + i * 6.5 + Math.random() * 3,
      y: 80 - i * 1.8 + (Math.random() - 0.5) * 25,
    }));
    return (
      <svg viewBox="0 0 200 100" className="h-full w-full">
        <line x1="0" y1="80" x2="200" y2="20" stroke="oklch(0.55 0.24 265)" strokeWidth="1" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.8" fill="oklch(0.18 0.01 250)" opacity="0.6" />
        ))}
      </svg>
    );
  }
  if (kind === "bars") {
    const bars = [20, 35, 50, 65, 80, 95, 70, 55, 78, 62, 48, 40, 30, 22, 18, 14, 10];
    return (
      <svg viewBox="0 0 200 100" className="h-full w-full">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 11 + 4}
            y={100 - h * 0.85}
            width="8"
            height={h * 0.85}
            fill="oklch(0.55 0.24 265)"
            opacity={0.4 + (h / 200)}
          />
        ))}
      </svg>
    );
  }
  // heat
  const cells = Array.from({ length: 8 * 5 });
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {cells.map((_, i) => {
        const r = Math.floor(i / 8);
        const c = i % 8;
        const v = Math.random();
        return (
          <rect
            key={i}
            x={c * 24 + 4}
            y={r * 18 + 4}
            width="22"
            height="16"
            fill="oklch(0.55 0.24 265)"
            opacity={0.15 + v * 0.7}
          />
        );
      })}
    </svg>
  );
}

function ResearchPage() {
  return (
    <div className="dot-grid min-h-screen px-6 py-14 md:px-14">
      <PageHeader
        number="04"
        section="RESEARCH"
        title="Research & Insights"
        description={
          <>
            Notes on markets, models, and systems.
            <br />
            Research driven by curiosity, validated by data.
          </>
        }
        right={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Mail className="h-4 w-4" />
            Subscribe
          </button>
        }
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Posts */}
        <div className="space-y-4">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group grid grid-cols-[180px_1fr_auto] items-center gap-6 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent-blue/40 hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-accent-blue-soft/40 p-2">
                <MiniChart kind={p.chart} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink group-hover:text-accent-blue">
                  {p.title}
                </h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-accent-blue-soft px-2.5 py-0.5 text-[11px] font-medium text-accent-blue"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex h-full flex-col items-end justify-between border-l border-border pl-6 text-right">
                <div>
                  <div className="text-sm text-foreground">{p.date}</div>
                  <div className="text-xs text-muted-foreground">{p.read}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-accent-blue transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-ink">Categories</h3>
            <div className="mt-4 space-y-1">
              {categories.map((c) => (
                <button
                  key={c.label}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                    c.active ? "bg-accent-blue-soft/60" : "hover:bg-muted"
                  }`}
                >
                  <span className={`flex items-center gap-2.5 ${c.active ? "text-accent-blue font-medium" : "text-foreground"}`}>
                    <c.icon className="h-4 w-4" />
                    {c.label}
                  </span>
                  <span className={`text-xs ${c.active ? "text-accent-blue" : "text-muted-foreground"}`}>
                    {c.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-accent-blue-soft/60 p-5">
            <div className="text-sm font-semibold text-accent-blue">Research Philosophy</div>
            <div className="mt-3 text-2xl font-serif text-accent-blue">"</div>
            <p className="-mt-2 text-sm leading-relaxed text-ink">
              The market is complex. Our edge comes from clear models, robust systems, and disciplined execution.
            </p>
            <div className="mt-3 text-xs text-accent-blue">— Build. Test. Iterate.</div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-ink">Stay Updated</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              New insights on markets, models, and systems. No spam, only signal.
            </p>
            <form className="mt-4 flex overflow-hidden rounded-lg border border-border bg-surface">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-primary px-3 text-primary-foreground"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
