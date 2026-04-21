"use client";

import { WallpaperPreview } from "@/components/wallpaper-preview";
import { ConfigPanel } from "@/components/config-panel";
import type { AppState } from "@/lib/types";

interface CustomizeSectionProps {
  state: AppState;
  onChange: (patch: Partial<AppState>) => void;
}

export function CustomizeSection({ state, onChange }: CustomizeSectionProps) {
  return (
    <section id="customize" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          <WallpaperPreview state={state} />

          <ConfigPanel state={state} onChange={onChange} />
        </div>
      </div>
    </section>
  );
}
