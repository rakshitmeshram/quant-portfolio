import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/data/portfolioContent";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects" },
      { name: "description", content: "Selected systematic trading, research, and infrastructure projects." },
    ],
  }),
  component: ProjectsPage,
});

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
            to="/projects/$slug"
            params={{ slug: p.slug }}
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
