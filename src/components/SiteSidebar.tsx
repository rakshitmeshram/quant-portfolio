import { Link, useLocation } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { num: "01", label: "HOME", to: "/" },
  { num: "02", label: "ABOUT", to: "/about" },
  { num: "03", label: "PROJECTS", to: "/projects" },
  { num: "04", label: "RESEARCH", to: "/research" },
  { num: "05", label: "CONTACT", to: "/contact" },
] as const;

export function SiteSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[140px] flex-col justify-between border-r border-border/60 bg-background/80 px-8 py-8 backdrop-blur-sm lg:flex">
      <div>
        <Link to="/" className="flex items-center gap-0.5 text-2xl font-bold tracking-tight">
          <span>AR</span>
          <span className="text-accent-blue animate-pulse">_</span>
        </Link>
      </div>

      <nav className="flex flex-col gap-8">
        {navItems.map((item) => {
          const isActive =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group block"
            >
              <div
                className={`text-[11px] font-mono tracking-wider transition-colors ${
                  isActive ? "text-accent-blue" : "text-muted-foreground"
                }`}
              >
                {item.num}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`text-xs font-semibold tracking-[0.15em] transition-colors ${
                    isActive
                      ? "text-accent-blue"
                      : "text-foreground/70 group-hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-5 text-muted-foreground">
        <a href="https://github.com" aria-label="GitHub" className="hover:text-foreground transition-colors">
          <Github className="h-5 w-5" />
        </a>
        <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-foreground transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="mailto:hello@example.com" aria-label="Email" className="hover:text-foreground transition-colors">
          <Mail className="h-5 w-5" />
        </a>
        <ThemeToggle className="mt-1" />
      </div>
    </aside>
  );
}

export function MobileTopBar() {
  const { pathname } = useLocation();
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/90 px-5 py-4 backdrop-blur lg:hidden">
      <Link to="/" className="flex items-center gap-0.5 text-xl font-bold">
        <span>AR</span>
        <span className="text-accent-blue">_</span>
      </Link>
      <nav className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.15em]">
        {navItems.map((item) => {
          const isActive =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={isActive ? "text-accent-blue" : "text-muted-foreground"}
            >
              {item.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </div>
  );
}
