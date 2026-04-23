import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "Generate dynamic wallpaper images via a single HTTP GET endpoint. Full parameter reference, examples, and rate limit docs.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-white/8 bg-black lg:flex">
        <div className="flex h-14 items-center border-b border-white/8 px-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-70"
          >
            <GridIcon />
            ThreeSixtyFive
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
            API
          </p>
          <ul className="space-y-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.tag && (
                    <span
                      className="flex-shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                      style={{ background: "#30D15822", color: "#30D158" }}
                    >
                      GET
                    </span>
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mb-3 mt-8 px-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
            Wallpaper Types
          </p>
          <ul className="space-y-0.5">
            {TYPES_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-700" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/8 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-neutral-500 transition-colors hover:text-white"
          >
            ← Back to app
          </Link>
        </div>
      </div>

      <div className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-white/8 bg-black/90 px-4 backdrop-blur-xl lg:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-white"
        >
          <GridIcon />
          ThreeSixtyFive
        </Link>
        <span className="text-xs text-neutral-500">API Reference</span>
      </div>

      <div className="lg:pl-56">
        <main className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
          {children}
        </main>
      </div>
    </div>
  );
}

const NAV = [
  { href: "#quickstart", label: "Quick Start", tag: true },
  { href: "#parameters", label: "Parameters", tag: false },
  { href: "#examples", label: "Examples", tag: false },
  { href: "#errors", label: "Errors & Rate Limits", tag: false },
  { href: "#response", label: "Response Headers", tag: false },
];

const TYPES_NAV = [
  { href: "#type-year", label: "Year Progress" },
  { href: "#type-life", label: "Life Calendar" },
  { href: "#type-goal", label: "Goal Countdown" },
];

function GridIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" />
      <rect
        x="9"
        y="2"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="16"
        y="2"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="2"
        y="9"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
      <rect
        x="16"
        y="9"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="2"
        y="16"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="9"
        y="16"
        width="6"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect x="16" y="16" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}
