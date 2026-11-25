import { ArrowUpRight, Heart, MapPin } from "@/components/ui/icons";
import { CopyButton } from "@/components/ui/CopyButton";
import { SOCIAL_LINKS } from "@/data/social";
import { OWNER_NAME } from "@/data/site";

const FOOTER_NAV = [
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#experience" },
  { label: "About", href: "#about" },
];

/**
 * SITE FOOTER
 * Three quiet columns — brand & location, navigation, connect — over a
 * copyright bar. Every colour is read from a semantic theme token, so the
 * whole block flips with the rest of the page. Navigation links are plain
 * anchors; the document already has `scroll-behavior: smooth`.
 */
export function SiteFooter() {
  const connect = [
    {
      label: "GitHub",
      href: SOCIAL_LINKS.github.href,
      external: true,
      copyValue: SOCIAL_LINKS.github.href,
      copyLabel: "GitHub URL",
    },
    {
      label: "LinkedIn",
      href: SOCIAL_LINKS.linkedin.href,
      external: true,
      copyValue: SOCIAL_LINKS.linkedin.href,
      copyLabel: "LinkedIn URL",
    },
    {
      label: "Email",
      href: SOCIAL_LINKS.email.href,
      external: false,
      copyValue: SOCIAL_LINKS.email.label,
      copyLabel: "email address",
    },
  ].filter(
    (
      link,
    ): link is {
      label: string;
      href: string;
      external: boolean;
      copyValue: string;
      copyLabel: string;
    } => Boolean(link.href && link.copyValue),
  );

  return (
    <footer
      className="border-t bg-canvas"
      style={{ borderTopColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-14 pb-8 sm:px-12 sm:pt-16 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Brand & location */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p
              className="text-[20px] font-semibold tracking-[-0.01em]"
              style={{ color: "var(--text-primary)" }}
            >
              {OWNER_NAME}
            </p>
            <p
              className="mt-2 max-w-xs text-[14.5px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Moving towards a better future.
            </p>
            <p
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.1em]"
              style={{ color: "var(--text-muted)" }}
            >
              <MapPin className="size-3.5 shrink-0" />
              Hyderabad, Telangana, India
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p
              className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex rounded-sm text-[14.5px] font-medium text-secondary transition-colors duration-200 outline-offset-4 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-steel-blue"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p
              className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {connect.map((item) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-1.5 rounded-sm text-[14.5px] font-medium text-secondary transition-colors duration-200 outline-offset-4 hover:text-steel-blue focus-visible:outline-2 focus-visible:outline-steel-blue"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3 translate-y-px text-slate-blue/70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-steel-blue" />
                  </a>
                  <CopyButton
                    value={item.copyValue}
                    label={item.copyLabel}
                    message={
                      item.label === "Email"
                        ? "Email address copied"
                        : `${item.label} URL copied`
                    }
                    variant="icon"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="mt-12 flex flex-col gap-2.5 border-t pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTopColor: "var(--border-subtle)" }}
        >
          <p
            className="font-mono text-[11.5px] tracking-[0.12em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            © 2026 {OWNER_NAME}
          </p>
          <p
            className="inline-flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.12em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Designed and built from scratch with Love
            <Heart className="size-3 text-slate-blue" />
          </p>
        </div>
      </div>
    </footer>
  );
}
