"use client";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-blue/15 bg-tint px-3 py-1.5 text-[11px] font-medium text-slate-blue">
      {children}
    </span>
  );
}

export function StatusPill({
  label,
  tone = "navy",
}: {
  label: string;
  tone?: "navy" | "burgundy" | "outline" | "dark-outline" | "emerald";
}) {
  const tones = {
    navy: "border border-steel-blue/20 bg-steel-blue/10 text-steel-blue",
    burgundy: "border border-steel-blue bg-steel-blue text-on-accent",
    outline:
      "border border-dashed border-slate-blue/35 bg-slate-blue/[0.04] text-slate-blue/80",
    "dark-outline":
      "border border-dashed border-white/25 bg-white/[0.04] text-white/60",
    emerald: "border border-online/25 bg-online/10 text-online",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

/**
 * Consistent editorial section shell: anchor id, small steel-blue marker
 * with a mono index, serif display heading, and an optional standfirst.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className={`relative mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 lg:px-16 ${className}`}
    >
      <header className="mb-10 space-y-4 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-steel-blue/50" aria-hidden="true" />
          <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-steel-blue uppercase">
            {eyebrow}
          </p>
        </div>
        <h2 className="max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-0.015em] text-primary text-balance sm:text-5xl">
          {title}
        </h2>
        {intro ? (
          <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-secondary sm:text-base">
            {intro}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
