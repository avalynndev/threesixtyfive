"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Platform = "ios" | "android";

interface Step {
  number: number;
  title: string;
  content: React.ReactNode;
  highlight?: boolean;
}

const IOS_STEPS: Step[] = [
  {
    number: 1,
    title: "Copy URL",
    content: <p>Configure your wallpaper above and copy the generated URL.</p>,
  },
  {
    number: 2,
    title: "Create Automation",
    content: (
      <p>
        <strong>Shortcuts App</strong> → Automation Tab → New Automation
        <br />
        Time of Day: <Code>6:00 AM</Code> → Repeat <strong>Daily</strong>
        <br />
        Select <strong>Run Immediately</strong> → Create New Shortcut
      </p>
    ),
  },
  {
    number: 3,
    title: "Configure Shortcut",
    content: (
      <div className="space-y-3">
        <p>
          <strong>1. Get Contents of URL:</strong>
          <br />
          <Code>https://365tsf.vercel.app/api/generate?…</Code>
        </p>
        <p>
          <strong>2. Set Wallpaper Photo:</strong> Choose &quot;Lock
          Screen&quot; as target.
        </p>
      </div>
    ),
  },
  {
    number: 4,
    title: "Finalize",
    content: (
      <p>
        In &quot;Set Wallpaper Photo&quot;, tap arrow (→):
        <br />
        Disable <strong>Crop to Subject</strong>
        <br />
        Disable <strong>Show Preview</strong>
      </p>
    ),
    highlight: true,
  },
];

const ANDROID_STEPS: Step[] = [
  {
    number: 1,
    title: "Copy URL",
    content: <p>Configure your wallpaper above and copy the generated URL.</p>,
  },
  {
    number: 2,
    title: "Install MacroDroid",
    content: (
      <p>
        Download <strong>MacroDroid</strong> from the Play Store and open it.
      </p>
    ),
  },
  {
    number: 3,
    title: "Set a Trigger",
    content: (
      <div>
        <p>
          Tap <strong>Trigger</strong> → <strong>Date/Time</strong>
        </p>
        <ul className="mt-2 space-y-1.5">
          <li className="flex items-start gap-2 text-sm text-neutral-400">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-600" />
            Time: <Code>00:01:00</Code>
          </li>
          <li className="flex items-start gap-2 text-sm text-neutral-400">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-600" />
            Select all days (Mon–Sun)
          </li>
          <li className="flex items-start gap-2 text-sm text-neutral-400">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-600" />
            Turn <strong>Use Alarm</strong> OFF
          </li>
        </ul>
      </div>
    ),
  },
  {
    number: 4,
    title: "Configure Actions",
    content: (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SubCard badge="4.1" title="Download Wallpaper">
          <ul className="space-y-1.5">
            {[
              <>
                Tap <strong>Actions</strong> → <strong>+</strong>
              </>,
              <>
                Select <strong>Web Interaction</strong> →{" "}
                <strong>HTTP Request</strong>
              </>,
              <>
                Choose <strong>GET</strong> method
              </>,
              <>Paste your copied URL</>,
              <>
                Enable <em>Block next action until complete</em>
              </>,
              <>
                Enable <em>Save HTTP response to file</em>
              </>,
              <>
                Filename: <Code>wallpaper.png</Code>
              </>,
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-neutral-400"
              >
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-1.5 rounded-md border border-yellow-500/20 bg-yellow-500/8 px-3 py-2 text-xs font-medium text-yellow-400">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Remember this folder for the next step
          </div>
        </SubCard>

        <SubCard badge="4.2" title="Set Wallpaper">
          <ul className="space-y-1.5">
            {[
              <>
                Tap <strong>Actions</strong> → <strong>Device Settings</strong>{" "}
                → <strong>Set Wallpaper</strong>
              </>,
              <>
                Choose <strong>Image</strong> → Tap OK
              </>,
              <>
                Select <strong>Home Screen & Lock Screen</strong>
              </>,
              <>
                Choose <strong>Dynamic File Name</strong>
              </>,
              <>Select the same folder as before</>,
              <>
                Enter filename: <Code>wallpaper.png</Code>
              </>,
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-neutral-400"
              >
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SubCard>
      </div>
    ),
  },
  {
    number: 5,
    title: "Finalize & Test",
    content: (
      <p>
        Tap the three dots <strong>(⋮)</strong> in the top-right corner and
        select <strong>Test Macro</strong> to verify everything works.
      </p>
    ),
  },
];

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block max-w-full break-all rounded border border-foreground/10 bg-foreground/8 px-1.5 py-0.5 font-mono text-[0.8em] text-foreground">
      {children}
    </code>
  );
}

function SubCard({
  badge,
  title,
  children,
}: {
  badge: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-foreground/8 bg-foreground/3 p-4 transition-all hover:border-foreground/15 hover:bg-foreground/5">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="rounded-md border border-foreground/10 bg-foreground/10 px-2 py-0.5 font-mono text-xs font-semibold">
          {badge}
        </span>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function StepItem({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-foreground text-base font-semibold">
          {step.number}
        </div>
        {!isLast && <div className="mt-1 mb-1 w-px flex-1 bg-foreground/15" />}
      </div>

      <div className={cn("pb-8 flex-1", isLast && "pb-0")}>
        <h3 className="mb-2 font-semibold">{step.title}</h3>
        <div
          className={cn(
            "text-sm leading-relaxed text-foreground/80",
            step.highlight &&
              "rounded-lg border border-yellow-500/25 bg-yellow-500/8 p-3 text-yellow-300",
          )}
        >
          {step.content}
        </div>
      </div>
    </div>
  );
}

export function SetupSection() {
  const [platform, setPlatform] = useState<Platform>("ios");
  const steps = platform === "ios" ? IOS_STEPS : ANDROID_STEPS;

  return (
    <section id="setup" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Almost There
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Set it and forget it
          </h2>
        </div>

        <div className="mb-10 flex gap-1 rounded-xl border border-white/10 bg-neutral-950 p-1">
          {(["ios", "android"] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
                platform === p
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-400 hover:text-white",
              )}
            >
              {p === "ios" ? "iOS" : "Android"}
            </button>
          ))}
        </div>

        <div>
          {steps.map((step, i) => (
            <StepItem
              key={step.number}
              step={step}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
