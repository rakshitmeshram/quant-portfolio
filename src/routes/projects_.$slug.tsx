import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BarChart3, CircleDot, Database, Gauge, GitBranch, Lightbulb, Shield, SlidersHorizontal, Zap } from "lucide-react";
import { getAdjacentProject, getProject } from "@/data/portfolioContent";

export const Route = createFileRoute("/projects_/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    return {
      meta: [
        { title: `${project?.title ?? "Project"} — AR_` },
        { name: "description", content: project?.desc ?? "Project case study." },
        { property: "og:title", content: `${project?.title ?? "Project"} — AR_` },
        { property: "og:description", content: project?.desc ?? "Project case study." },
      ],
    };
  },
  component: ProjectDetailPage,
});

const flowIcons = [Database, BarChart3, SlidersHorizontal, Gauge, Zap, Shield];
const sparkline = "8,64 34,58 60,66 86,44 112,38 138,28 164,34 190,18 216,24 242,12 268,20 294,10";
const equityLine = "0,118 24,112 48,125 72,92 96,82 120,64 144,70 168,52 192,58 216,42 240,48 264,28 288,32 312,18 336,24 360,10";

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <main className="dot-grid min-h-screen px-6 py-14 md:px-14">
        <Link to="/projects" className="text-sm font-medium text-accent-blue">‹ Back to all projects</Link>
        <h1 className="mt-8 text-5xl font-bold text-ink">Project not found</h1>
      </main>
    );
  }

  const { previous, next } = getAdjacentProject(project.slug);

  return (
    <main className="dot-grid min-h-screen px-6 py-10 md:px-14 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Link to="/projects" className="text-sm font-medium text-accent-blue">‹ Back to all projects</Link>

        <header className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-ink md:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.desc}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-blue-soft px-4 py-2 text-xs font-medium text-accent-blue">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-xl shadow-foreground/5">
            {project.metrics.map((metric, index) => (
              <div key={metric.k} className={`flex items-center justify-between ${index > 0 ? "border-t border-border pt-5" : ""} ${index < project.metrics.length - 1 ? "pb-5" : ""}`}>
                <span className="text-sm text-muted-foreground">{metric.k}</span>
                <span className="font-mono text-2xl text-accent-blue">{metric.v}</span>
              </div>
            ))}
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-foreground/5">
          <div className="grid lg:grid-cols-[0.72fr_1fr]">
            <div className="border-b border-border bg-surface-elevated p-6 lg:border-b-0 lg:border-r">
              <div className="space-y-1 font-mono text-xs leading-6">
                {project.code.map((line, index) => (
                  <div key={`${line}-${index}`} className="grid grid-cols-[32px_1fr] gap-3">
                    <span className="text-muted-foreground/70">{String(index + 1).padStart(2, "0")}</span>
                    <span className={line.startsWith("#") ? "text-muted-foreground" : line.includes("=") ? "text-accent-blue" : "text-foreground"}>{line || " "}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-ink">Cumulative PnL (Out-of-Sample)</h2>
                <div className="flex gap-4 font-mono text-xs text-muted-foreground">
                  <span>1M</span><span>6M</span><span>1Y</span><span>3Y</span><span className="text-accent-blue">All</span>
                </div>
              </div>
              <svg viewBox="0 0 360 160" className="mt-8 h-64 w-full text-accent-blue" role="img" aria-label="Cumulative PnL chart">
                <defs>
                  <linearGradient id="project-equity-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[30, 60, 90, 120].map((y) => <line key={y} x1="0" y1={y} x2="360" y2={y} className="stroke-border" strokeWidth="1" />)}
                {[48, 96, 144, 192, 240, 288, 336].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="145" className="stroke-border" strokeWidth="1" />)}
                <path d={`M ${equityLine} L 360,145 L 0,145 Z`} fill="url(#project-equity-fill)" />
                <polyline points={equityLine} fill="none" className="stroke-foreground" strokeWidth="1.8" />
                <circle cx="360" cy="10" r="4" fill="currentColor" />
              </svg>
            </div>
          </div>
        </section>

        <DetailSection number="01" title="THESIS">
          <p className="max-w-xl text-lg leading-relaxed text-foreground/80">{project.thesis}</p>
        </DetailSection>

        <DetailSection number="02" title="MODEL DESIGN">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-center">
            <div className="space-y-8">
              <BulletGroup icon={CircleDot} title="Signals" items={project.signals} />
              <BulletGroup icon={SlidersHorizontal} title="Filters" items={project.filters} />
              <BulletGroup icon={Gauge} title="Portfolio Construction" items={project.construction} />
            </div>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-lg shadow-foreground/5">
              <h3 className="text-sm font-semibold text-ink">Feature Pipeline</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-4">
                {["Raw Data", "Feature Eng.", "Signal Gen.", "Portfolio"].map((step, index) => (
                  <div key={step} className="relative rounded-lg border border-border bg-surface-elevated p-4 text-center">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-accent-blue/40 text-accent-blue">
                      {index + 1}
                    </div>
                    <div className="mt-3 text-xs font-semibold text-ink">{step}</div>
                    <div className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{index === 0 ? "Prices, Volume" : index === 1 ? "Returns, Volatility" : index === 2 ? "Z-score Ranking" : "Weights"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-dashed border-accent-blue/50 pt-3 text-center text-xs text-accent-blue">Feedback Loop</div>
            </div>
          </div>
        </DetailSection>

        <DetailSection number="03" title="SYSTEM ARCHITECTURE">
          <div className="grid gap-4 rounded-xl border border-border bg-surface p-5 md:grid-cols-3">
            {project.architecture.map((node, index) => {
              const Icon = flowIcons[index % flowIcons.length];
              return (
                <div key={node.title} className="rounded-lg border border-accent-blue/30 bg-accent-blue-soft/20 p-4">
                  <Icon className="h-5 w-5 text-accent-blue" />
                  <h3 className="mt-3 text-sm font-semibold text-ink">{node.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{node.desc}</p>
                </div>
              );
            })}
          </div>
        </DetailSection>

        <DetailSection number="04" title="RESULTS">
          <div className="grid gap-3 md:grid-cols-4">
            {project.metrics.concat([{ k: "Hit Ratio", v: "53.1%" }]).slice(0, 4).map((metric) => (
              <div key={metric.k} className="rounded-xl border border-border bg-surface p-5">
                <div className="text-xs text-muted-foreground">{metric.k}</div>
                <div className="mt-2 text-3xl text-ink">{metric.v}</div>
                <svg viewBox="0 0 300 80" className="mt-4 h-12 w-full text-accent-blue" aria-hidden="true">
                  <polyline points={sparkline} fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection number="05" title="KEY INSIGHT">
          <div className="rounded-xl bg-primary p-7 text-primary-foreground">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue"><Lightbulb className="h-5 w-5" /></span>
              <p className="max-w-3xl text-lg leading-relaxed">{project.insight}</p>
            </div>
          </div>
        </DetailSection>

        <DetailSection number="06" title="STACK">
          <div className="flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-foreground">
                <GitBranch className="h-4 w-4 text-accent-blue" />
                {item}
              </span>
            ))}
          </div>
        </DetailSection>

        <nav className="mt-12 flex items-center justify-between border-t border-border py-8">
          <Link to="/projects/$slug" params={{ slug: previous.slug }} className="group flex items-center gap-4">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span><span className="block text-xs font-semibold text-ink">Previous Project</span><span className="text-muted-foreground">{previous.title}</span></span>
          </Link>
          <Link to="/projects/$slug" params={{ slug: next.slug }} className="group flex items-center gap-4 text-right">
            <span><span className="block text-xs font-semibold text-ink">Next Project</span><span className="text-muted-foreground">{next.title}</span></span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </main>
  );
}

function DetailSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="mb-6 flex items-baseline gap-10">
        <span className="font-mono text-sm text-accent-blue">{number}</span>
        <h2 className="text-sm font-bold tracking-wide text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function BulletGroup({ icon: Icon, title, items }: { icon: typeof CircleDot; title: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-blue/30 bg-accent-blue-soft text-accent-blue">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {items.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      </div>
    </div>
  );
}
