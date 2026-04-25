type Props = {
  number: string;
  section: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  right?: React.ReactNode;
  centered?: boolean;
};

export function PageHeader({ number, section, title, description, right, centered }: Props) {
  return (
    <header
      className={`relative ${centered ? "text-center" : ""}`}
    >
      <div className={`flex items-start justify-between gap-6 ${centered ? "flex-col items-center" : ""}`}>
        <div className={centered ? "mx-auto" : ""}>
          <div className="font-mono text-xs tracking-[0.2em] text-accent-blue">
            {number} <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-accent-blue">{section}</span>
          </div>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-ink md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </header>
  );
}
