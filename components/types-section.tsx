"use client";

import { TypeCard } from "@/components/type-card";
import type { WallpaperType } from "@/lib/types";
import { getYearStats } from "@/lib/utils";

interface TypesSectionProps {
  selectedType: WallpaperType | null;
  onSelect: (type: WallpaperType) => void;
}

export function TypesSection({ selectedType, onSelect }: TypesSectionProps) {
  const { day, week, percent } = getYearStats();

  const cards = [
    {
      type: "year" as WallpaperType,
      number: "01",
      name: "Year Progress",
      description:
        "Every day of the year as a dot. Watch your year fill up, one square at a time.",
      stats: [
        { value: day, label: "Day" },
        { value: week, label: "Week" },
        { value: `${percent}%`, label: "Complete" },
      ],
      delay: 100,
    },
    {
      type: "life" as WallpaperType,
      number: "02",
      name: "Life Calendar",
      description:
        "Every week of your life as a dot. A powerful reminder to make each week count.",
      stats: [
        { value: "4,160", label: "Total Weeks" },
        { value: "80", label: "Years" },
      ],
      delay: 200,
    },
    {
      type: "goal" as WallpaperType,
      number: "03",
      name: "Goal Countdown",
      description:
        "Count down to what matters. Big launch, vacation, or life milestone.",
      stats: [
        { value: "∞", label: "Goals" },
        { value: "Daily", label: "Updates" },
      ],
      delay: 300,
    },
  ];

  return (
    <section id="types" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Choose Your Style
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Three ways to see your time
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <TypeCard
              key={card.type}
              type={card.type}
              number={card.number}
              name={card.name}
              description={card.description}
              stats={card.stats}
              selected={selectedType === card.type}
              onSelect={onSelect}
              delay={card.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
