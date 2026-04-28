import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Lightbulb } from "lucide-react";
import { getAdjacentResearchPost, getResearchPost } from "@/data/portfolioContent";

export const Route = createFileRoute("/research_/$slug")({
  head: ({ params }) => {
    const post = getResearchPost(params.slug);
    return {
      meta: [
        { title: `${post?.title ?? "Research"} — AR_` },
        { name: "description", content: post?.desc ?? "Research note." },
        { property: "og:title", content: `${post?.title ?? "Research"} — AR_` },
        { property: "og:description", content: post?.desc ?? "Research note." },
      ],
    };
  },
  component: ResearchDetailPage,
});

const line = "0,90 26,84 52,92 78,65 104,58 130,44 156,50 182,30 208,38 234,22 260,28 286,12";

function ResearchDetailPage() {
  const { slug } = Route.useParams();
  const post = getResearchPost(slug);

  if (!post) {
    return (
      <main className="dot-grid min-h-screen px-6 py-14 md:px-14">
        <Link to="/research" className="text-sm font-medium text-accent-blue">‹ Back to research</Link>
        <h1 className="mt-8 text-5xl font-bold text-ink">Research not found</h1>
      </main>
    );
  }

  const { previous, next } = getAdjacentResearchPost(post.slug);

  return (
    <main className="dot-grid min-h-screen px-6 py-10 md:px-14 md:py-14">
      <article className="mx-auto max-w-5xl">
        <Link to="/research" className="text-sm font-medium text-accent-blue">‹ Back to all research</Link>

        <header className="mt-6 grid gap-8 lg:grid-cols-[1fr_260px] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.read}</span>
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-ink md:text-6xl">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{post.desc}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-accent-blue-soft px-4 py-2 text-xs font-medium text-accent-blue">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 shadow-xl shadow-foreground/5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Signal Sketch</div>
            <svg viewBox="0 0 286 110" className="mt-5 h-32 w-full text-accent-blue" role="img" aria-label="Research chart sketch">
              <defs>
                <linearGradient id="research-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`M ${line} L 286,110 L 0,110 Z`} fill="url(#research-fill)" />
              <polyline points={line} fill="none" className="stroke-foreground" strokeWidth="2" />
              <circle cx="286" cy="12" r="4" fill="currentColor" />
            </svg>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-foreground/5">
          <div className="grid lg:grid-cols-[220px_1fr]">
            <div className="border-b border-border bg-surface-elevated p-6 lg:border-b-0 lg:border-r">
              <div className="font-mono text-sm text-accent-blue">01</div>
              <h2 className="mt-2 text-sm font-bold tracking-wide text-ink">THESIS</h2>
            </div>
            <div className="p-7 md:p-9">
              <p className="text-2xl leading-relaxed text-ink">{post.thesis}</p>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-8">
          {post.sections.map((section, index) => (
            <section key={section.heading} className="grid gap-5 border-t border-border pt-8 md:grid-cols-[90px_1fr]">
              <span className="font-mono text-sm text-accent-blue">{String(index + 2).padStart(2, "0")}</span>
              <div>
                <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
                <p className="mt-3 max-w-3xl text-lg leading-relaxed text-foreground/80">{section.body}</p>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-xl bg-primary p-7 text-primary-foreground">
          <div className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue"><Lightbulb className="h-5 w-5" /></span>
            <div>
              <h2 className="text-sm font-bold tracking-wide">KEY TAKEAWAYS</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {post.takeaways.map((takeaway) => (
                  <div key={takeaway} className="flex items-start gap-2 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <nav className="mt-12 flex items-center justify-between border-t border-border py-8">
          <Link to="/research/$slug" params={{ slug: previous.slug }} className="group flex items-center gap-4">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span><span className="block text-xs font-semibold text-ink">Previous Note</span><span className="text-muted-foreground">{previous.title}</span></span>
          </Link>
          <Link to="/research/$slug" params={{ slug: next.slug }} className="group flex items-center gap-4 text-right">
            <span><span className="block text-xs font-semibold text-ink">Next Note</span><span className="text-muted-foreground">{next.title}</span></span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </article>
    </main>
  );
}
