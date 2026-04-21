"use client";

import { useEffect, useRef } from "react";
import type { AppState } from "@/lib/types";
import {
  drawYearWallpaper,
  drawLifeWallpaper,
  drawGoalWallpaper,
} from "@/lib/utils";

interface WallpaperPreviewProps {
  state: AppState;
}

export function WallpaperPreview({ state }: WallpaperPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.selectedType) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 0.8;
    canvas.width = state.width * scale;
    canvas.height = state.height * scale;

    switch (state.selectedType) {
      case "year":
        drawYearWallpaper(
          ctx,
          canvas.width,
          canvas.height,
          state.bgColor,
          state.accentColor,
          state.clockHeight,
        );
        break;
      case "life":
        drawLifeWallpaper(
          ctx,
          canvas.width,
          canvas.height,
          state.bgColor,
          state.accentColor,
          state.clockHeight,
          state.dob,
          state.lifespan,
        );
        break;
      case "goal":
        drawGoalWallpaper(
          ctx,
          canvas.width,
          canvas.height,
          state.bgColor,
          state.accentColor,
          state.clockHeight,
          state.goalDate,
          state.goalStart,
          state.goalName,
          state.timezone,
        );
        break;
    }
  }, [state]);

  return (
    <div className="lg:sticky top-28 flex flex-col items-center">
      <div
        className="relative rounded-[40px] p-2.5"
        style={{
          width: 260,
          height: 530,
          background: "#1a1a1a",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.1), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute left-1/2 top-2.5 z-10 -translate-x-1/2 rounded-b-2xl bg-black"
          style={{ width: 100, height: 28 }}
        />
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[32px] bg-black">
          {state.selectedType ? (
            <canvas
              ref={canvasRef}
              className="h-full w-full object-contain"
              style={{ borderRadius: 24 }}
            />
          ) : (
            <p className="text-center text-xs text-neutral-600">
              Select a wallpaper type
            </p>
          )}
        </div>
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/30"
          style={{ width: 100, height: 4 }}
        />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-widest text-neutral-600">
        Live Preview
      </p>
    </div>
  );
}
