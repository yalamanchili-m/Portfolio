import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ManvithaYalamanchili Portfolio",
  description:
    "Portfolio of Manvitha Yalamanchili: agentic AI systems, product execution, software engineering, and data systems — with work in sustainability tech, analytics, and editorial leadership.",
  authors: [{ name: "Manvitha Yalamanchili" }],
  keywords: [
    "Manvitha Yalamanchili",
    "agentic AI",
    "product management",
    "software engineer",
    "computer science",
    "data systems",
    "portfolio",
  ],
  openGraph: {
    title: "ManvithaYalamanchili Portfolio",
    description:
      "Agentic AI systems, product execution, software engineering, and data systems — with work in sustainability tech, analytics, and editorial leadership.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F8FB" },
    { media: "(prefers-color-scheme: dark)", color: "#111B26" },
  ],
  colorScheme: "light dark",
};

// Applies the saved theme before first paint so a dark visit never flashes
// the light canvas. Mirrored by the toggle in ThemeToggle. With no saved
// preference the site follows the OS and keeps following it live; once the
// visitor picks a theme, that override wins and is persisted.
const themeInitScript = `(function(){try{var S="theme",q=window.matchMedia("(prefers-color-scheme: dark)"),stored=localStorage.getItem(S),r=document.documentElement;var saved=stored==="dark"||stored==="light"?stored:null;var apply=function(dark){var t=dark?"dark":"light";r.dataset.theme=t;r.style.colorScheme=t;};apply(saved?saved==="dark":q.matches);q.addEventListener?q.addEventListener("change",function(e){if(!localStorage.getItem(S))apply(e.matches);}):q.addListener(function(e){if(!localStorage.getItem(S))apply(e.matches);});}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${instrumentSerif.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} min-h-full bg-canvas font-sans text-primary antialiased`}
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
