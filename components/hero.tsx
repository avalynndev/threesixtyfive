"use client";

import { getYearStats } from "@/lib/utils";

const GRID_DELAYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const GRID_FILLED = new Set([3, 4, 6, 9, 11]);

export function Hero() {
  const { day, percent, daysLeft } = getYearStats();

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <p
          className="fade-in-up mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
          style={{ animationDelay: "0ms" }}
        >
          Dynamic Wallpapers
        </p>

        <h1
          className="fade-in-up mb-6 text-6xl font-bold leading-none tracking-tight md:text-8xl"
          style={{ animationDelay: "100ms" }}
        >
          <span className="block text-foreground">Your year.</span>
          <span
            className="block bg-clip-text text-transparent 
             bg-gradient-to-br 
             from-neutral-900 to-neutral-500 
             dark:from-white"
          >
            Visualized.
          </span>
        </h1>

        <p className="fade-in-up fade-in-up-2 mx-auto mb-10 max-w-md text-lg text-neutral-400">
          365 dots. One fills each day. Watch your year pass — one square at a
          time.
        </p>

        <div className="fade-in-up fade-in-up-3 mx-auto mb-10 flex w-fit items-center gap-6 rounded-full border border-foreground/10 bg-foreground/5 px-6 py-3 font-mono text-sm backdrop-blur-sm">
          <span className="text-foreground/80">
            Day <span className="font-semibold">{day}</span>
          </span>
          <span className="h-3 w-px bg-foreground/20" />
          <span className="text-foreground/80">
            <span className="font-semibold">{percent}%</span> done
          </span>
          <span className="h-3 w-px bg-foreground/20" />
          <span className="text-foreground/80">
            <span className="font-semibold">{daysLeft}</span> left
          </span>
        </div>

        <a
          href="#types"
          className="fade-in-up fade-in-up-4 inline-flex items-center gap-2 rounded-2xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)]"
        >
          Get Started
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 opacity-15">
        <div className="grid grid-cols-4 gap-2">
          {GRID_DELAYS.map((delay) => {
            const isFilled = GRID_FILLED.has(delay);
            return (
              <div
                key={delay}
                className={`h-10 w-10 rounded-sm border border-foreground ${
                  isFilled
                    ? "grid-cell-filled bg-foreground"
                    : "grid-cell-empty bg-transparent"
                } anim-delay-${delay}`}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
}
