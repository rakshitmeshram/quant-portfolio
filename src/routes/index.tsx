import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroViz from "@/assets/hero-viz.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AR_ — I turn markets into edge" },
      { name: "description", content: "Quant developer building systematic trading strategies, high-performance infrastructure, and data-driven research." },
    ],
  }),
  component: HomePage,
});

const featured = [
  { num: "01", title: "StatArb", desc: "Cross-asset statistical arbitrage framework." },
  { num: "02", title: "Options Lab", desc: "Options pricing, calibration and volatility models." },
  { num: "03", title: "Data Pipeline", desc: "High-throughput market data pipeline in Python." },
  { num: "04", title: "Risk Engine", desc: "Real-time risk analytics and portfolio monitoring." },
];

function HomePage() {
  return (
    <div className="dot-grid relative min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-6 md:px-14">
        <div />
        <div className="flex items-center gap-6">
          <span className="hidden text-sm text-muted-foreground md:inline">
            Based in London, UK
          </span>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            Let's Connect
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="grid items-center gap-12 px-6 pb-20 pt-10 md:px-14 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <div className="font-mono text-xs tracking-[0.2em] text-accent-blue">
            QUANT DEVELOPER / FINANCIAL ENGINEER
          </div>
          <h1 className="mt-6 text-6xl font-bold leading-[0.95] tracking-tight text-ink md:text-7xl lg:text-[88px]">
            I turn
            <br />
            <span className="font-serif italic font-normal text-accent-blue">
              markets
            </span>{" "}
            into
            <br />
            edge<span className="text-accent-blue">.</span>
          </h1>
          <div className="mt-6 h-px w-32 bg-foreground/30" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            I build systematic trading strategies, develop high-performance
            infrastructure and extract insights from data.
          </p>
          <Link
            to="/projects"
            className="group mt-10 inline-flex items-center gap-3 border-b border-accent-blue pb-2 text-sm font-semibold text-ink"
          >
            Explore my work
            <ArrowRight className="h-4 w-4 text-accent-blue transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Code/visualization card */}
        <div className="relative">
          {/* Coordinate label on the right edge */}
          <div className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-muted-foreground lg:block">
            51.5074° N, 0.1278° W
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)]">
            {/* Visualization background */}
            <img
              src={heroViz}
              alt="Particle wave visualization of market data"
              width={1280}
              height={896}
              className="absolute inset-0 h-full w-full object-cover opacity-95"
            />
            {/* Soft white wash on the left so code stays legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent" />

            <div className="relative p-7">
              <div className="font-mono text-lg text-accent-blue">{">_"}</div>
              <pre className="mt-4 max-w-[60%] overflow-hidden font-mono text-[13px] leading-relaxed text-foreground/80">
{`# Model: Mean Reversion Strategy

Universe = Top2000
Lookback  = 63
`}<span className="text-accent-blue">Signal</span>{`    = `}<span className="text-accent-blue">zscore</span>{`(returns)
`}<span className="text-accent-blue">Weights</span>{`   = `}<span className="text-accent-blue">rank_signal</span>{`(Signal)
`}<span className="text-accent-blue">PnL</span>{`       = `}<span className="text-accent-blue">backtest</span>{`(Weights)

# Sharpe
`}<span className="text-accent-blue text-base font-semibold">1.72</span>
              </pre>
              {/* Spacer to give the visualization room to breathe */}
              <div className="h-40" />
              <div className="font-mono text-lg text-accent-blue">{">_"}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-1 w-8 rounded-full bg-accent-blue" />
            <span className="h-1 w-8 rounded-full bg-border" />
            <span className="h-1 w-8 rounded-full bg-border" />
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="px-6 pb-24 md:px-14">
        <div className="mb-6 flex items-end justify-between">
          <div className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
            FEATURED PROJECTS
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent-blue"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.num}
              to="/projects"
              className="group rounded-xl border border-border/80 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-xs text-muted-foreground">{p.num}</div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent-blue" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
