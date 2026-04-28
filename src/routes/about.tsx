import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import {
  LineChart,
  Code2,
  Database,
  Crosshair,
  ScanSearch,
  Cpu,
  BookOpen,
  Activity,
  Trophy,
  Plane,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About" },
      { name: "description", content: "Quantitative developer focused on systematic trading, data-driven research, and high-performance infrastructure." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: LineChart, value: "5+", label: "Years of Experience", desc: "Across research, development and trading systems." },
  { icon: Code2, value: "15+", label: "Projects Completed", desc: "From strategy research to production-grade systems." },
  { icon: Database, value: "TB+", label: "Data Processed", desc: "Building pipelines and models at scale." },
  { icon: Crosshair, value: "3", label: "Patents Filed", desc: "In the area of trading signals and risk management." },
];

const philosophy = [
  { icon: ScanSearch, title: "Models > Narratives", desc: "I let data speak. Models capture reality better than stories do." },
  { icon: Database, title: "Data > Opinions", desc: "High quality data and robust processing create durable edge." },
  { icon: Cpu, title: "Systems > Hacks", desc: "Reliable systems compound. Hacks break." },
];

const journey = [
  {
    period: "2022 – Present",
    role: "Quant Developer",
    org: "Global Macro Capital",
    desc: "Developing systematic strategies and ultra-low latency research infrastructure for global equities.",
    current: true,
  },
  {
    period: "2020 – 2022",
    role: "Quant Researcher",
    org: "AlphaQuest Advisors",
    desc: "Built cross-sectional and statistical arbitrage strategies and enhanced backtesting frameworks.",
  },
  {
    period: "2018 – 2020",
    role: "Software Engineer",
    org: "TechFin Solutions",
    desc: "Worked on data engineering pipelines and trading platform components.",
  },
];

const focus = ["Mid-Frequency Strategies", "Alpha Research", "Portfolio Construction", "Risk Modeling", "Market Microstructure"];
const beyond = [
  { icon: BookOpen, label: "Reading" },
  { icon: Activity, label: "Running" },
  { icon: Trophy, label: "Chess" },
  { icon: Plane, label: "Travel" },
];
const tools = ["Python", "C++", "NumPy", "Pandas", "KDB+", "PostgreSQL", "AWS", "Docker", "Git", "Linux"];

function AboutPage() {
  return (
    <div className="dot-grid min-h-screen px-6 py-14 md:px-14">
      <PageHeader number="02" section="ABOUT" title="About Me" />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_1.2fr_0.9fr]">
        {/* Intro */}
        <div>
          <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
            I build systems that extract{" "}
            <span className="font-serif italic font-normal text-accent-blue">signal</span>{" "}
            from noisy financial data<span className="text-accent-blue">.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            I'm a quantitative developer and engineer with a strong focus on
            systematic trading, data-driven research, and high-performance
            infrastructure.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          {stats.map((s) => (
            <div key={s.label} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-blue">{s.value}</div>
                <div className="mt-0.5 text-sm font-semibold text-ink">{s.label}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div>
          <h3 className="text-base font-semibold text-ink">My Philosophy</h3>
          <div className="mt-5 space-y-5">
            {philosophy.map((p) => (
              <div key={p.title} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                  <p.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-accent-blue">{p.title}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey + Education + Focus */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[1.05fr_1.2fr_0.9fr]">
        {/* Journey */}
        <div>
          <h3 className="text-base font-semibold text-ink">My Journey</h3>
          <div className="mt-6 space-y-7 border-l border-border pl-6">
            {journey.map((j) => (
              <div key={j.period} className="relative">
                <span
                  className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${
                    j.current ? "bg-accent-blue" : "bg-border"
                  }`}
                />
                <div className="flex items-center gap-2 text-sm font-semibold text-accent-blue">
                  {j.period}
                  {j.current && (
                    <span className="rounded-full bg-accent-blue-soft px-2 py-0.5 text-[10px] font-medium text-accent-blue">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-1 text-base font-semibold text-ink">{j.role}</div>
                <div className="text-sm text-muted-foreground">{j.org}</div>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                  {j.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-base font-semibold text-ink">Education</h3>
          <div className="mt-6 space-y-6">
            <div>
              <div className="text-base font-semibold text-ink">MSc in Financial Engineering</div>
              <div className="text-sm text-muted-foreground">Imperial College London</div>
              <div className="mt-1 text-xs text-muted-foreground">2017 – 2018</div>
            </div>
            <div className="border-t border-border pt-6">
              <div className="text-base font-semibold text-ink">BTech in Computer Science</div>
              <div className="text-sm text-muted-foreground">Indian Institute of Technology</div>
              <div className="mt-1 text-xs text-muted-foreground">2013 – 2017</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="text-2xl text-accent-blue">"</div>
              <p className="-mt-2 text-sm leading-relaxed text-ink">
                Markets are complex. Edge comes from clarity, discipline, and iteration.
              </p>
              <div className="mt-3 text-xs text-accent-blue">— My guiding principle</div>
            </div>
          </div>
        </div>

        {/* Focus + Beyond */}
        <div>
          <h3 className="text-base font-semibold text-ink">Current Focus</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {focus.map((f) => (
              <span
                key={f}
                className="rounded-full bg-accent-blue-soft px-3 py-1.5 text-xs font-medium text-accent-blue"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-base font-semibold text-ink">Beyond Markets</h3>
            <div className="mt-5 grid grid-cols-4 gap-4">
              {beyond.map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                  <b.icon className="h-6 w-6 text-foreground" strokeWidth={1.4} />
                  <span className="text-xs text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools strip */}
      <div className="mt-16 rounded-xl border border-border bg-surface px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="text-sm font-semibold text-ink">Tools & Technologies</div>
          {tools.map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="h-2 w-2 rounded-full bg-accent-blue/70" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
