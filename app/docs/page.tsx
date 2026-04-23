import Link from "next/link";

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-white/10 bg-white/6 px-1.5 py-0.5 font-mono text-[0.82em] text-white">
      {children}
    </code>
  );
}

function Tag({ children, color }: { children: string; color: string }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 font-mono text-xs font-semibold uppercase"
      style={{ background: color + "22", color }}
    >
      {children}
    </span>
  );
}

interface ParamRowProps {
  name: string;
  type: string;
  required?: boolean;
  defaultVal?: string;
  children: React.ReactNode;
}

function ParamRow({
  name,
  type,
  required,
  defaultVal,
  children,
}: ParamRowProps) {
  return (
    <tr className="border-b border-white/6 last:border-0">
      <td className="py-3 pr-4 align-top">
        <div className="flex items-center gap-2">
          <code className="font-mono text-sm text-white">{name}</code>
          {required && (
            <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">
              required
            </span>
          )}
        </div>
      </td>
      <td className="py-3 pr-4 align-top">
        <code className="font-mono text-xs text-neutral-400">{type}</code>
      </td>
      <td className="py-3 pr-4 align-top">
        {defaultVal && (
          <code className="font-mono text-xs text-neutral-500">
            {defaultVal}
          </code>
        )}
      </td>
      <td className="py-3 align-top text-sm leading-relaxed text-neutral-400">
        {children}
      </td>
    </tr>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/8 pt-12">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({
  lang = "bash",
  children,
}: {
  lang?: string;
  children: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
      <div className="flex items-center border-b border-white/8 px-4 py-2.5">
        <span className="font-mono text-xs text-neutral-500">{lang}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-neutral-300">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

const BASE = "https://365tsf.vercel.app/api/generate";

export default function DocsPage() {
  return (
    <>
      <div className="mb-16">
        <div className="mb-4 flex items-center gap-3">
          <Tag color="#30D158">GET</Tag>
          <code className="font-mono text-lg text-white">/api/generate</code>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Wallpaper Generator API
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-neutral-400">
          A single HTTP endpoint that generates a phone wallpaper image (PNG or
          SVG) showing your year progress, life calendar, or goal countdown —
          updated to the current day in any timezone.
        </p>
      </div>

      <nav className="mb-16 rounded-xl border border-white/10 bg-neutral-950 p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          On this page
        </p>
        <ul className="space-y-2 text-sm">
          {[
            ["#quickstart", "Quick Start"],
            ["#parameters", "Parameters"],
            ["#type-year", "Year Progress"],
            ["#type-life", "Life Calendar"],
            ["#type-goal", "Goal Countdown"],
            ["#examples", "Examples"],
            ["#errors", "Errors & Rate Limits"],
            ["#response", "Response Headers"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-16">
        <Section id="quickstart" title="Quick Start">
          <p className="mb-6 text-neutral-400">
            Make a <Code>GET</Code> request with query parameters. The response
            is a raw image — you can use it directly in <Code>{"<img>"}</Code>{" "}
            tags, iOS Shortcuts, or Android MacroDroid.
          </p>
          <CodeBlock lang="bash">{`curl "${BASE}?country=us&type=year&bg=000000&accent=FFFFFF&width=1206&height=2622" \\
  --output wallpaper.png`}</CodeBlock>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Format", value: "PNG (default) or SVG" },
              { label: "Rate limit", value: "20 req / 60s per IP" },
              { label: "Cache", value: "24h Cache-Control" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/8 bg-neutral-950 p-4"
              >
                <p className="mb-1 text-xs text-neutral-500">{item.label}</p>
                <p className="text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="parameters" title="Parameters">
          <p className="mb-6 text-sm text-neutral-400">
            All parameters are passed as query strings. Only{" "}
            <Code>country</Code> is strictly required; everything else falls
            back to a sensible default.
          </p>

          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Core
          </div>
          <div className="mb-8 overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/8 text-left text-xs text-neutral-500">
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="px-4">
                <ParamRow name="country" type="string" required defaultVal="us">
                  ISO 3166-1 alpha-2 country code (lowercase). Used to derive
                  the timezone so the correct day is highlighted. E.g.{" "}
                  <Code>us</Code>, <Code>gb</Code>, <Code>in</Code>,{" "}
                  <Code>jp</Code>.
                </ParamRow>
                <ParamRow name="type" type="enum" defaultVal="year">
                  Wallpaper style. One of <Code>year</Code>, <Code>life</Code>,
                  or <Code>goal</Code>.
                </ParamRow>
                <ParamRow name="bg" type="hex" defaultVal="000000">
                  Background color as a 6-digit hex string without the{" "}
                  <Code>#</Code>. E.g. <Code>0a0a0a</Code>.
                </ParamRow>
                <ParamRow name="accent" type="hex" defaultVal="FFFFFF">
                  Accent / dot color as a 6-digit hex string. E.g.{" "}
                  <Code>FFD700</Code>.
                </ParamRow>
                <ParamRow name="width" type="integer" defaultVal="1170">
                  Canvas width in pixels. Min 300, max 8000.
                </ParamRow>
                <ParamRow name="height" type="integer" defaultVal="2532">
                  Canvas height in pixels. Min 300, max 8000.
                </ParamRow>
                <ParamRow name="clockHeight" type="float" defaultVal="0.18">
                  Fraction of canvas height reserved for the lock screen clock
                  (0–0.5). iPhone 16 Pro uses <Code>0.18</Code>; adjust per
                  device.
                </ParamRow>
                <ParamRow name="format" type="enum" defaultVal="png">
                  Output format. <Code>png</Code> (default) or <Code>svg</Code>.
                </ParamRow>
              </tbody>
            </table>
          </div>

          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Life Calendar (<Code>type=life</Code>)
          </div>
          <div className="mb-8 overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/8 text-left text-xs text-neutral-500">
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <ParamRow name="dob" type="YYYY-MM-DD">
                  Date of birth. If omitted, defaults to 25 years before today.
                </ParamRow>
                <ParamRow name="lifespan" type="integer" defaultVal="80">
                  Expected lifespan in years (1–120). Determines total grid
                  rows.
                </ParamRow>
              </tbody>
            </table>
          </div>

          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Goal Countdown (<Code>type=goal</Code>)
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/8 text-left text-xs text-neutral-500">
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <ParamRow name="goal" type="YYYY-MM-DD" required>
                  Target date to count down to.
                </ParamRow>
                <ParamRow name="goalStart" type="YYYY-MM-DD">
                  When you started tracking. Used to calculate arc progress.
                  Must be ≤ <Code>goal</Code>. Defaults to 30 days before the
                  target.
                </ParamRow>
                <ParamRow name="goalName" type="string" defaultVal="Goal">
                  Label shown on the wallpaper (max 100 chars). URL-encode
                  special characters.
                </ParamRow>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="type-year" title="Year Progress">
          <p className="mb-4 text-neutral-400">
            365 or 366 dots arranged in a 15-column grid. Completed days are
            filled, today&apos;s dot is slightly larger, and remaining days are
            dimmed. A stats line below the grid shows days left and percentage
            complete.
          </p>
          <div className="mb-4 flex flex-wrap gap-1">
            {["country", "bg", "accent", "width", "height", "clockHeight"].map(
              (p) => (
                <Code key={p}>{p}</Code>
              ),
            )}
          </div>
          <CodeBlock lang="bash">{`curl "${BASE}?country=us&type=year&bg=000000&accent=FFFFFF&width=1206&height=2622"`}</CodeBlock>
        </Section>

        <Section id="type-life" title="Life Calendar">
          <p className="mb-4 text-neutral-400">
            52 columns × lifespan rows — one dot per week of your life. Weeks
            lived are filled, the current week is highlighted, and future weeks
            are faint. Stats show weeks remaining and percentage lived.
          </p>
          <div className="mb-4 flex flex-wrap gap-1">
            {[
              "country",
              "bg",
              "accent",
              "width",
              "height",
              "clockHeight",
              "dob",
              "lifespan",
            ].map((p) => (
              <Code key={p}>{p}</Code>
            ))}
          </div>
          <CodeBlock lang="bash">{`curl "${BASE}?country=us&type=life&bg=000000&accent=FFFFFF&width=1206&height=2622&dob=1995-06-15&lifespan=80"`}</CodeBlock>
        </Section>

        <Section id="type-goal" title="Goal Countdown">
          <p className="mb-4 text-neutral-400">
            A circular arc that shrinks as days pass toward the target date. The
            center shows days remaining. The arc represents the proportion of
            time left from start to goal.
          </p>
          <div className="mb-4 flex flex-wrap gap-1">
            {[
              "country",
              "bg",
              "accent",
              "width",
              "height",
              "clockHeight",
              "goal",
              "goalStart",
              "goalName",
            ].map((p) => (
              <Code key={p}>{p}</Code>
            ))}
          </div>
          <CodeBlock lang="bash">{`curl "${BASE}?country=us&type=goal&bg=000000&accent=FFFFFF&width=1206&height=2622&goal=2025-12-31&goalName=Launch"`}</CodeBlock>
        </Section>

        <Section id="examples" title="Examples">
          <div className="space-y-8">
            <div>
              <p className="mb-3 font-medium">
                Year progress — iPhone 17 Pro, gold accent
              </p>
              <CodeBlock lang="bash">{`curl "${BASE}?country=us&type=year&bg=0a0a0a&accent=FFD700&width=1206&height=2622&clockHeight=0.18"`}</CodeBlock>
            </div>

            <div>
              <p className="mb-3 font-medium">
                Life calendar — born 1995, 85 year lifespan
              </p>
              <CodeBlock lang="bash">{`curl "${BASE}?country=gb&type=life&bg=000000&accent=00D4FF&width=1206&height=2622&dob=1995-06-15&lifespan=85"`}</CodeBlock>
            </div>

            <div>
              <p className="mb-3 font-medium">
                Goal countdown — product launch
              </p>
              <CodeBlock lang="bash">{`curl "${BASE}?country=us&type=goal&bg=0a0a0a&accent=FF3B30&width=1206&height=2622&goal=2025-12-31&goalStart=2025-01-01&goalName=Product%20Launch"`}</CodeBlock>
            </div>

            <div>
              <p className="mb-3 font-medium">Fetch in JavaScript</p>
              <CodeBlock lang="javascript">{`const params = new URLSearchParams({
  country: "us",
  type: "year",
  bg: "000000",
  accent: "FFFFFF",
  width: "1206",
  height: "2622",
});

const res = await fetch(\`/api/generate?\${params}\`);
const blob = await res.blob();
const url = URL.createObjectURL(blob);

document.querySelector("img").src = url;`}</CodeBlock>
            </div>

            <div>
              <p className="mb-3 font-medium">
                iOS Shortcut — "Get Contents of URL" action
              </p>
              <CodeBlock lang="text">{`URL:
${BASE}?country=us&type=year&bg=000000&accent=FFFFFF&width=1206&height=2622&clockHeight=0.18

Then: Set Wallpaper Photo → Lock Screen
      ↳ Disable "Crop to Subject"
      ↳ Disable "Show Preview"`}</CodeBlock>
            </div>
          </div>
        </Section>

        <Section id="errors" title="Errors & Rate Limits">
          <p className="mb-6 text-neutral-400">
            The endpoint is rate limited to{" "}
            <strong className="text-white">20 requests per 60 seconds</strong>{" "}
            per IP address. Every response includes rate limit headers so you
            can track usage.
          </p>

          <div className="mb-8 space-y-3">
            {[
              {
                status: "200",
                color: "#30D158",
                desc: "Success — image data returned.",
              },
              {
                status: "400",
                color: "#FF9F0A",
                desc: "Validation error — a parameter is missing, out of range, or malformatted. Response body is JSON with an issues array.",
              },
              {
                status: "429",
                color: "#FF3B30",
                desc: "Too Many Requests — rate limit exceeded. Check Retry-After header.",
              },
              {
                status: "500",
                color: "#636366",
                desc: "Internal Server Error — image generation failed.",
              },
            ].map((row) => (
              <div
                key={row.status}
                className="flex items-start gap-4 rounded-lg border border-white/8 bg-neutral-950 px-4 py-3"
              >
                <span
                  className="mt-0.5 flex-shrink-0 rounded px-2 py-0.5 font-mono text-xs font-semibold"
                  style={{ background: row.color + "22", color: row.color }}
                >
                  {row.status}
                </span>
                <p className="text-sm text-neutral-400">{row.desc}</p>
              </div>
            ))}
          </div>

          <p className="mb-3 text-sm font-medium text-white">
            400 Validation error body
          </p>
          <CodeBlock lang="json">{`{
  "error": "Validation Error",
  "issues": [
    {
      "code": "invalid_type",
      "path": ["width"],
      "message": "Expected number, received nan"
    }
  ]
}`}</CodeBlock>

          <p className="mb-3 mt-8 text-sm font-medium text-white">
            429 Rate limit body
          </p>
          <CodeBlock lang="json">{`{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 42s."
}`}</CodeBlock>
        </Section>

        <Section id="response" title="Response Headers">
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-white/8 text-left text-xs text-neutral-500">
                  <th className="px-4 py-3 font-medium">Header</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Content-Type",
                    "image/png or image/svg+xml depending on format param",
                  ],
                  [
                    "Cache-Control",
                    "public, max-age=86400 — safe to cache for 24 hours",
                  ],
                  [
                    "X-RateLimit-Limit",
                    "Maximum requests allowed per window (20)",
                  ],
                  [
                    "X-RateLimit-Remaining",
                    "Requests remaining in the current window",
                  ],
                  ["X-RateLimit-Reset", "Seconds until the window resets"],
                  [
                    "Retry-After",
                    "Seconds to wait before retrying (only on 429)",
                  ],
                ].map(([header, desc]) => (
                  <tr
                    key={header}
                    className="border-b border-white/6 last:border-0"
                  >
                    <td className="px-4 py-3 align-top">
                      <code className="font-mono text-sm text-white">
                        {header}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-400">
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      <div className="mt-20 border-t border-white/8 pt-10 text-center">
        <p className="text-sm text-neutral-600">
          Built by{" "}
          <Link
            href="/"
            className="text-neutral-400 transition-colors hover:text-white"
          >
            avalynndev
          </Link>
        </p>
      </div>
    </>
  );
}
