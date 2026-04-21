"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WallpaperType } from "@/lib/types";
import { getDayOfYear } from "@/lib/utils";

function YearGridPreview() {
  const day = getDayOfYear();
  const cells = Array.from({ length: 45 }, (_, i) => i);
  const threshold = Math.floor(day / 8);

  return (
    <div className="grid grid-cols-[repeat(15,1fr)] gap-1 p-4">
      {cells.map((i) => (
        <div
          key={i}
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            i < threshold ? "bg-white" : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}

function LifeGridPreview() {
  return (
    <div className="grid grid-cols-[repeat(13,1fr)] gap-0.5 p-4">
      {Array.from({ length: 65 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < 25 ? "bg-white" : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}

function GoalCirclePreview() {
  const progress = 0.65;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">42</span>
          <span className="text-xs text-neutral-400">days</span>
        </div>
      </div>
    </div>
  );
}

interface TypeCardProps {
  type: WallpaperType;
  number: string;
  name: string;
  description: string;
  stats: { value: string | number; label: string }[];
  selected: boolean;
  onSelect: (type: WallpaperType) => void;
  delay?: number;
}

export function TypeCard({
  type,
  number,
  name,
  description,
  stats,
  selected,
  onSelect,
  delay = 0,
}: TypeCardProps) {
  return (
    <article
      onClick={() => onSelect(type)}
      className={cn(
        "card-shimmer cursor-pointer border-none overflow-hidden rounded-2xl border transition-all duration-300",
        "fade-in-up",
        selected ? " " : " hover:-translate-y-1 ",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex h-48 items-center justify-center  bg-neutral-950">
        {type === "year" && <YearGridPreview />}
        {type === "life" && <LifeGridPreview />}
        {type === "goal" && <GoalCirclePreview />}
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-foreground/80">
            {number}
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-foreground/80">
          {description}
        </p>

        <div className="mb-5 flex items-center gap-4 border-y border-foreground/10 py-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              {i > 0 && <div className="h-8 w-px bg-foreground/10" />}

              <div className="flex flex-col">
                <span className="font-mono text-xl font-semibold">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-foreground">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-150",
            selected
              ? " bg-background text-foreground"
              : " text-foreground hover:border-background hover:bg-background hover:text-foreground",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(type);
          }}
        >
          Select
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}
