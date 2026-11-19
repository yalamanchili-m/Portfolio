import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function ArrowUpRight({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4.5 11.5 11.5 4.5" />
      <path d="M5.75 4.5h5.75v5.75" />
    </svg>
  );
}

export function ArrowDown({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M8 3v10" />
      <path d="m3.75 8.75 4.25 4.25 4.25-4.25" />
    </svg>
  );
}

export function Search({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.25 10.25 3 3" />
    </svg>
  );
}

export function Sun({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9" />
    </svg>
  );
}

export function Moon({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M13.4 9.6A5.6 5.6 0 0 1 6.4 2.6a5.6 5.6 0 1 0 7 7Z" />
    </svg>
  );
}

export function MapPin({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M8 14.25s4.5-4.1 4.5-7.5a4.5 4.5 0 1 0-9 0c0 3.4 4.5 7.5 4.5 7.5Z" />
      <circle cx="8" cy="6.6" r="1.6" />
    </svg>
  );
}

export function Heart({ className = "size-3.5", ...props }: IconProps) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M8 13.25S2.75 10.2 2.75 6.4a2.75 2.75 0 0 1 5.25-1 2.75 2.75 0 0 1 5.25 1c0 3.8-5.25 6.85-5.25 6.85Z" />
    </svg>
  );
}
