"use client";

import { useState, useCallback } from "react";
import type { AppState, WallpaperType } from "@/lib/types";
import { getDefaultDevice } from "@/data/devices";
import { autoDetectCountry } from "@/data/countries";

function getInitialState(): AppState {
  const device = getDefaultDevice();
  const detected = autoDetectCountry();

  return {
    selectedType: null,
    country: detected?.code ?? null,
    timezone: detected?.timezone ?? null,
    bgColor: "#000000",
    accentColor: "#FFFFFF",
    width: device.width,
    height: device.height,
    clockHeight: device.clockHeight,
    dob: null,
    lifespan: 80,
    goalName: "Goal",
    goalDate: null,
    goalStart: null,
    selectedDevice: device,
  };
}

export function useAppState() {
  const [state, setState] = useState<AppState>(getInitialState);

  const patch = useCallback((updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const selectType = useCallback((type: WallpaperType) => {
    setState((prev) => ({ ...prev, selectedType: type }));
    if (typeof window !== "undefined") {
      setTimeout(() => {
        document.getElementById("customize")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, []);

  return { state, patch, selectType };
}
