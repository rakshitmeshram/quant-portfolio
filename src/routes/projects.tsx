import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — AR_" },
      { name: "description", content: "Selected systematic trading, research, and infrastructure projects." },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    num: "01",
    title: "Statistical Arbitrage Engine",
    desc: "Cross-sectional mean reversion exploiting short-term liquidity imbalances.",
    tags: ["Equities", "StatArb", "Mid-Frequency", "Python"],
    metrics: [{ k: "Sharpe", v: "1.72" }, { k: "Max DD", v: "-6.4%" }, { k: "Turnover", v: "280%" }],
  },
  {
    num: "02",
    title: "Options Lab",
    desc: "Options pricing, calibration, and volatility surface modeling toolkit.",
    tags: ["Options", "Volatility", "C++", "Python"],
    metrics: [{ k: "Models", v: "12" }, { k: "Latency", v: "<2ms" }, { k: "Coverage", v: "98%" }],
  },
  {
    num: "03",
    title: "Market Data Pipeline",
    desc: "High-throughput pipeline for tick-level market data ingestion and storage.",
    tags: ["Data Eng", "KDB+", "Python", "AWS"],
    metrics: [{ k: "Throughput", v: "2M/s" }, { k: "Uptime", v: "99.99%" }, { k: "Storage", v: "40TB" }],
  },
  {
    num: "04",
    title: "Real-Time Risk Engine",
    desc: "Portfolio risk analytics with intraday VaR, exposure limits, and stress tests.",
    tags: ["Risk", "VaR", "C++", "Postgres"],
    metrics: [{ k: "Coverage", v: "100%" }, { k: "Refresh", v: "1s" }, { k: "Books", v: "24" }],
  },
  {
    num: "05",
    title: "Multi-Factor Momentum",
    desc: "Long-short equities momentum strategy with regime-aware factor weighting.",
    tags: ["Equities", "Momentum", "Factor"],
    metrics: [{ k: "Sharpe", v: "1.34" }, { k: "Beta", v: "0.08" }, { k: "Hit", v: "55%" }],
  },
  {
    num: "06",
    title: "Execution Simulator",
    desc: "Event-driven simulator with market impact, slippage, and queue modeling.",
    tags: ["Execution", "Simulation", "C++"],
    metrics: [{ k: "Speed", v: "10x" }, { k: "Models", v: "6" }, { k: "Tests", v: "320" }],
  },
];

function ProjectsPage() {
  return (
    <div className="dot-grid min-h-screen px-6 py-14 md:px-14">
      <PageHeader
        number="03"
        section="PROJECTS"
        title="Selected Work"
        description="Systematic strategies, research tooling, and infrastructure I've built across markets."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.num}
            to="/projects"
            className="group flex flex-col rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">
                {p.num}
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent-blue" />
            </div>
            <h3 className="mt-8 text-xl font-bold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-accent-blue-soft px-2.5 py-1 text-[11px] font-medium text-accent-blue"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {p.metrics.map((m) => (
                <div key={m.k}>
                  <div className="text-xs text-muted-foreground">{m.k}</div>
                  <div className="mt-0.5 text-sm font-bold text-accent-blue">{m.v}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
