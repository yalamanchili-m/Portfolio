import { SectionShell, Tag } from "./shared";
import { CERTIFICATIONS } from "@/data/certifications";

/**
 * SECTION 04 — CERTIFICATIONS.
 * A compact two-column credential grid: issuer stamp, credential name,
 * and the skills each certificate formally covers.
 */
export function CertificationsSection() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="04 / Certifications"
      title="Certifications"
      intro="Formal credentials across agentic AI architecture, cloud AI foundations, containerization, and automation."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {CERTIFICATIONS.map((certification, index) => (
          <li
            key={certification.id}
            id={`cert-${certification.id}`}
            className="h-full scroll-mt-28"
          >
            <article className="group flex h-full flex-col rounded-2xl border border-slate-blue/18 bg-surface p-6 shadow-tactile transition-all duration-300 hover:-translate-y-1 hover:border-soft-blue/45 hover:shadow-lifted">
              <div className="flex items-start justify-between gap-4">
                <span className="font-serif text-2xl leading-none text-powder-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-steel-blue/20 bg-steel-blue/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.1em] text-steel-blue uppercase">
                  {certification.issuer}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-[22px] leading-[1.16] tracking-[-0.01em] text-primary text-balance">
                {certification.name}
              </h3>

              {certification.note ? (
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-secondary/80 uppercase">
                  {certification.note}
                </p>
              ) : null}

              {certification.skills?.length ? (
                <ul
                  className="mt-auto flex flex-wrap gap-1.5 pt-5"
                  aria-label={`${certification.name} skills`}
                >
                  {certification.skills.map((skill) => (
                    <li key={skill}>
                      <Tag className="shadow-[var(--shadow-chip)]">{skill}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
