/**
 * Decorative, theme-aware preview for a flagship project. Built from the
 * site's own tokens (surface / tint / slate-blue borders / steel-blue
 * accent) so it flips cleanly with the light and dark themes.
 */
type PreviewKind = "platform" | "transformer" | "planner";

const BARS = [38, 62, 48, 78, 56, 88, 70, 94];

export function ProjectPreview({
  kind,
  label,
}: {
  kind: PreviewKind;
  label: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl border border-slate-blue/15 bg-surface/70 shadow-tactile"
    >
      <div className="flex items-center justify-between border-b border-slate-blue/12 bg-tint/60 px-3 py-2">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-steel-blue/40" />
          <span className="size-1.5 rounded-full bg-steel-blue/60" />
          <span className="size-1.5 rounded-full bg-steel-blue/80" />
        </span>
        <span className="font-mono text-[8.5px] tracking-[0.16em] text-slate-blue uppercase">
          {label}
        </span>
      </div>

      <div className="w-full p-4">
        {kind === "platform" ? <PlatformPreview /> : null}
        {kind === "transformer" ? <TransformerPreview /> : null}
        {kind === "planner" ? <PlannerPreview /> : null}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(84, 120, 178, 0.14), transparent 70%)",
        }}
      />
    </div>
  );
}

function PlatformPreview() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "streams", value: "128" },
          { label: "matches", value: "342" },
          { label: "co₂e", value: "−18%" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-slate-blue/12 bg-canvas/70 px-2 py-1.5"
          >
            <p className="font-mono text-[7.5px] tracking-[0.14em] text-slate-blue uppercase">
              {kpi.label}
            </p>
            <p className="font-mono text-[11px] font-semibold text-primary">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-blue/12 bg-canvas/70 p-2.5">
        <div className="flex items-end justify-between gap-1.5" dir="ltr">
          {BARS.map((height, index) => (
            <span
              key={index}
              className="w-full rounded-sm bg-steel-blue"
              style={{ height: `${height * 0.45}px`, opacity: 0.35 + index * 0.07 }}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[7.5px] tracking-[0.12em] text-slate-blue uppercase">
          material flow · last 8 quarters
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {["surplus", "→", "symbiosis", "→", "reuse"].map((chip, index) => (
          <span
            key={`${chip}-${index}`}
            className={`rounded-full border px-2 py-0.5 font-mono text-[7.5px] tracking-[0.1em] uppercase ${
              chip === "→"
                ? "border-0 text-slate-blue"
                : "border-steel-blue/30 bg-steel-blue/10 text-steel-blue"
            }`}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function TransformerPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-blue/12 bg-canvas/70 p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[7.5px] tracking-[0.14em] text-slate-blue uppercase">
            article input
          </span>
          <span className="rounded-full border border-online/35 bg-online/10 px-1.5 py-0.5 font-mono text-[7px] tracking-[0.12em] text-online uppercase">
            credible
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[92, 100, 84, 66].map((width, index) => (
            <span
              key={index}
              className="block h-1.5 rounded-full bg-slate-blue/25"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-blue/12 bg-canvas/70 p-2.5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[7.5px] tracking-[0.14em] text-slate-blue uppercase">
            confidence
          </span>
          <span className="font-mono text-[10px] font-semibold text-primary">
            0.94
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-blue/20">
          <span className="block h-full w-[94%] rounded-full bg-steel-blue" />
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-steel-blue/30 bg-steel-blue/[0.06] p-2.5">
        <p className="font-mono text-[7.5px] tracking-[0.14em] text-steel-blue uppercase">
          BART summary
        </p>
        <div className="mt-1.5 space-y-1">
          {[96, 88, 60].map((width, index) => (
            <span
              key={index}
              className="block h-1 rounded-full bg-steel-blue/35"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlannerPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-blue/12 bg-canvas/70 p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[7.5px] tracking-[0.14em] text-slate-blue uppercase">
            30-day plan
          </span>
          <span className="font-mono text-[7.5px] text-slate-blue">2,140 kcal</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, index) => {
            const filled = index % 3 !== 1;
            return (
              <span
                key={index}
                className={`h-5 rounded-[3px] border ${
                  filled
                    ? "border-steel-blue/30 bg-steel-blue/25"
                    : "border-slate-blue/15 bg-transparent"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-slate-blue/12 bg-canvas/70 p-2.5">
        <p className="font-mono text-[7.5px] tracking-[0.14em] text-slate-blue uppercase">
          aisle 04 · produce
        </p>
        <ul className="mt-1.5 space-y-1">
          {[
            ["Spinach", "300 g"],
            ["Chickpeas", "2 cans"],
            ["Lemons", "4"],
          ].map(([item, qty]) => (
            <li
              key={item}
              className="flex items-center justify-between font-mono text-[8px] text-secondary"
            >
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-[2px] border border-steel-blue/50 bg-steel-blue/20" />
                {item}
              </span>
              <span className="text-slate-blue">{qty}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
