import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Calendar,
  ArrowRight,
  Copy,
  Check,
  TrendingUp,
  Users,
  Code2,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact" },
      { name: "description", content: "Open to quant roles, research collaborations, and high-performance system design." },
    ],
  }),
  component: ContactPage,
});

const looking = [
  { icon: TrendingUp, title: "Quant Roles", desc: "Systematic trading, alpha research, and quantitative strategy development." },
  { icon: Users, title: "Collaboration", desc: "Research partnerships, open-source infrastructure, and knowledge exchange." },
  { icon: Code2, title: "Engineering", desc: "High-performance systems, low-latency pipelines, and scalable architectures." },
];

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "yourname@domain.com";

  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="dot-grid relative flex min-h-screen flex-col px-6 py-14 md:px-14">
      <div className="text-center">
        <div className="font-mono text-xs tracking-[0.2em]">
          <span className="text-accent-blue">05</span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-accent-blue">CONTACT</span>
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
          If you're building serious trading systems, let's talk
          <span className="text-accent-blue">.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
          Open to quant roles, research collaborations,
          <br />
          and high-performance system design.
        </p>
      </div>

      {/* Contact card */}
      <div className="mx-auto mt-12 w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)]">
        <label className="block text-xs text-muted-foreground">Email</label>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="text-lg font-medium text-ink">{email}</div>
          <button
            onClick={copy}
            className="rounded-lg p-2 text-accent-blue hover:bg-accent-blue-soft"
            aria-label="Copy email"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>

        <div className="mt-6 space-y-1">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
            { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group flex items-center justify-between rounded-lg border-t border-border py-4 text-sm font-medium"
            >
              <span className="flex items-center gap-3">
                <s.icon className="h-5 w-5 text-foreground" />
                {s.label}
              </span>
              <ArrowRight className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Calendar className="h-4 w-4" />
          Schedule a Call
        </button>
      </div>

      {/* What I'm looking for */}
      <div className="mx-auto mt-16 w-full max-w-5xl">
        <h2 className="text-center text-xl font-bold text-ink">What I'm Looking For</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {looking.map((l) => (
            <div key={l.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-blue-soft text-accent-blue">
                  <l.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-ink">{l.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mx-auto mt-20 w-full max-w-5xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 — Built with precision.
      </footer>
    </div>
  );
}
