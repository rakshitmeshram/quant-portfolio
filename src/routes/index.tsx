import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroWave from "@/assets/hero-wave.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rakshit Meshram" },
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

        {/* Hero carousel */}
        <HeroCarousel />
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

/* ----------------------------- Hero Carousel ----------------------------- */

const SLIDES = ["code", "equity", "metrics"] as const;

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-muted-foreground lg:block">
        51.5074° N, 0.1278° W
      </div>

      <div className="relative aspect-[4/3.2] overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide === "code" && <CodeCard />}
            {slide === "equity" && <EquityCard />}
            {slide === "metrics" && <MetricsCard />}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-10 bg-accent-blue" : "w-8 bg-border hover:bg-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="relative h-full w-full">
      <img
        src={heroWave}
        alt="Wave visualization of market signal"
        width={1280}
        height={896}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-7">
        <div>
          <div className="font-mono text-lg text-accent-blue">{">_"}</div>
          <pre className="mt-4 max-w-[60%] overflow-hidden font-mono text-[13px] leading-relaxed text-foreground/80">
{`# Model: Mean Reversion

Universe = Top2000
Lookback  = 63
`}<span className="text-accent-blue">Signal</span>{`    = `}<span className="text-accent-blue">zscore</span>{`(returns)
`}<span className="text-accent-blue">Weights</span>{`   = `}<span className="text-accent-blue">rank_signal</span>{`(Signal)
`}<span className="text-accent-blue">PnL</span>{`       = `}<span className="text-accent-blue">backtest</span>{`(Weights)

# Sharpe
`}<span className="text-accent-blue text-base font-semibold">1.72</span>
          </pre>
        </div>
        <div className="font-mono text-lg text-accent-blue">{">_"}</div>
      </div>
    </div>
  );
}

function EquityCard() {
  const points = Array.from({ length: 60 }, (_, i) => {
    const x = i / 59;
    const trend = 0.85 - x * 0.62;
    const noise = Math.sin(i * 0.7) * 0.04 + Math.sin(i * 0.23) * 0.06;
    const dd = i > 30 && i < 38 ? 0.08 : 0;
    return { x: x * 100, y: (trend + noise + dd) * 100 };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const area = `${path} L 100 100 L 0 100 Z`;

  return (
    <div className="relative flex h-full flex-col p-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
            EQUITY CURVE / 5Y
          </div>
          <div className="mt-2 font-serif text-3xl italic text-ink">+248.6%</div>
        </div>
        <div className="text-right font-mono text-[11px] text-muted-foreground">
          <div>SHARPE <span className="text-accent-blue">2.14</span></div>
          <div>MAX DD <span className="text-ink">-9.2%</span></div>
          <div>WIN <span className="text-ink">58%</span></div>
        </div>
      </div>

      <div className="relative mt-6 flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="eq-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.45 0.18 265)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="oklch(0.45 0.18 265)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.15" className="text-border" />
          ))}
          <path d={area} fill="url(#eq-fill)" />
          <path d={path} fill="none" stroke="oklch(0.45 0.18 265)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="absolute -bottom-1 left-0 right-0 flex justify-between font-mono text-[9px] text-muted-foreground">
          <span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span>
        </div>
      </div>
    </div>
  );
}

function MetricsCard() {
  const cells = Array.from({ length: 64 }, (_, i) =>
    (Math.sin(i * 0.7) + Math.cos(i * 0.31) + Math.sin(i * 1.3)) / 3
  );

  return (
    <div className="relative flex h-full flex-col p-7">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
            FACTOR SIGNAL / LIVE
          </div>
          <div className="mt-2 font-serif text-3xl italic text-ink">cross-sectional α</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-blue" />
          STREAMING
        </div>
      </div>

      <div className="mt-6 grid grid-cols-8 gap-1">
        {cells.map((v, i) => {
          const intensity = Math.max(0, Math.min(1, (v + 1) / 2));
          const isPos = v >= 0;
          return (
            <div
              key={i}
              className="aspect-square rounded-[3px]"
              style={{
                background: isPos
                  ? `oklch(0.45 0.18 265 / ${0.15 + intensity * 0.75})`
                  : `oklch(0.7 0.04 80 / ${0.1 + (1 - intensity) * 0.5})`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-3 pt-6 font-mono text-[11px]">
        <div>
          <div className="text-muted-foreground">IC</div>
          <div className="mt-1 text-base text-ink">0.087</div>
        </div>
        <div>
          <div className="text-muted-foreground">TURNOVER</div>
          <div className="mt-1 text-base text-ink">12.4%</div>
        </div>
        <div>
          <div className="text-muted-foreground">UNIVERSE</div>
          <div className="mt-1 text-base text-accent-blue">2,000</div>
        </div>
      </div>
    </div>
  );
}
