export type WallpaperType = "year" | "life" | "goal";

export interface Device {
  name: string;
  category: string;
  width: number;
  height: number;
  clockHeight: number;
}

export interface Country {
  code: string;
  name: string;
  timezone: string;
}

export interface AppState {
  selectedType: WallpaperType | null;
  country: string | null;
  timezone: string | null;
  bgColor: string;
  accentColor: string;
  width: number;
  height: number;
  clockHeight: number;
  dob: string | null;
  lifespan: number;
  goalName: string;
  goalDate: string | null;
  goalStart: string | null;
  selectedDevice: Device | null;
}

export const WORKER_URL = "/api";

export const COLOR_PRESETS = [
  { label: "Classic", bg: "#000000", accent: "#FFFFFF" },
  { label: "Gold", bg: "#0A0A0A", accent: "#FFD700" },
  { label: "Cyan", bg: "#0F0F0F", accent: "#00D4FF" },
  { label: "Red", bg: "#0A0A0A", accent: "#FF3B30" },
  { label: "Green", bg: "#0A0A0A", accent: "#30D158" },
  { label: "Purple", bg: "#0A0A0A", accent: "#BF5AF2" },
];
