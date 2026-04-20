import type { AppState } from "@/lib/types";
import { WORKER_URL } from "@/lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function getWeekOfYear(date: Date = new Date()): number {
  return Math.ceil(getDayOfYear(date) / 7);
}

export function getTotalDaysInYear(
  year: number = new Date().getFullYear(),
): number {
  return isLeapYear(year) ? 366 : 365;
}

export function getYearStats() {
  const now = new Date();
  const day = getDayOfYear(now);
  const week = getWeekOfYear(now);
  const total = getTotalDaysInYear(now.getFullYear());
  const percent = Math.round((day / total) * 100);
  const daysLeft = total - day;
  return { day, week, total, percent, daysLeft };
}

export function getWeeksLived(dob: string | null): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const now = new Date();
  return Math.floor((now.getTime() - birth.getTime()) / (7 * 86_400_000));
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function drawYearWallpaper(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bgColor: string,
  accentColor: string,
  clockHeight: number,
) {
  const cols = 15;
  const total = getTotalDaysInYear();
  const rows = Math.ceil(total / cols);
  const day = getDayOfYear();

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  const clockSpace = h * (clockHeight + 0.05);
  const padding = w * 0.2;
  const gap = Math.max(2, w * 0.008);
  const availW = w - padding * 2;
  const cellSize = (availW - gap * (cols - 1)) / cols;
  const dotR = (cellSize / 2) * 0.85;

  const gridW = cellSize * cols + gap * (cols - 1);
  const startX = (w - gridW) / 2;
  const startY = clockSpace + h * 0.02;

  for (let i = 0; i < total; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cellSize + gap) + cellSize / 2;
    const cy = startY + row * (cellSize + gap) + cellSize / 2;

    const isCompleted = i < day;
    const isToday = i === day - 1;

    ctx.beginPath();
    if (isToday) {
      ctx.fillStyle = accentColor;
      ctx.arc(cx, cy, dotR * 1.2, 0, Math.PI * 2);
    } else if (isCompleted) {
      ctx.fillStyle = hexToRgba(accentColor, 0.75);
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  const { daysLeft, percent } = getYearStats();
  const gridH = cellSize * rows + gap * (rows - 1);
  const statsY = startY + gridH + h * 0.03;

  const text1 = `${daysLeft} days left`;
  const text2 = `  ·  ${percent}% complete`;
  const f1 = `500 ${w * 0.032}px Inter, sans-serif`;
  const f2 = `500 ${w * 0.026}px "SF Mono", monospace`;

  ctx.font = f1;
  const w1 = ctx.measureText(text1).width;
  ctx.font = f2;
  const w2 = ctx.measureText(text2).width;
  const x0 = (w - w1 - w2) / 2;

  ctx.fillStyle = accentColor;
  ctx.font = f1;
  ctx.textAlign = "left";
  ctx.fillText(text1, x0, statsY);

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = f2;
  ctx.fillText(text2, x0 + w1, statsY);
}

export function drawLifeWallpaper(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bgColor: string,
  accentColor: string,
  clockHeight: number,
  dob: string | null,
  lifespan: number,
) {
  const cols = 52;
  const rows = lifespan;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  const clockSpace = h * clockHeight;
  const padding = w * 0.04;
  const availW = w - padding * 2;
  const availH = h - clockSpace - h * 0.1;
  const gap = Math.max(1.5, w * 0.003);
  const cellSize = Math.min(
    (availW - gap * (cols - 1)) / cols,
    (availH - gap * (rows - 1)) / rows,
  );
  const radius = cellSize / 2 - 0.5;
  const weeksLived = getWeeksLived(dob);
  const totalWeeks = rows * cols;

  const gridW = cellSize * cols + gap * (cols - 1);
  const gridH = cellSize * rows + gap * (rows - 1);
  const startX = (w - gridW) / 2;
  const startY = clockSpace;

  for (let i = 0; i < totalWeeks; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cellSize + gap) + cellSize / 2;
    const cy = startY + row * (cellSize + gap) + cellSize / 2;

    ctx.beginPath();
    if (i === weeksLived) {
      ctx.fillStyle = accentColor;
    } else if (i < weeksLived) {
      ctx.fillStyle = hexToRgba(accentColor, 0.75);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.06)";
    }
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const weeksLeft = totalWeeks - weeksLived;
  const percent = Math.round((weeksLived / totalWeeks) * 100);
  const statsY = startY + gridH + h * 0.035;

  const text1 = `${weeksLeft} weeks left`;
  const text2 = `  ·  ${percent}% lived`;
  const f1 = `500 ${w * 0.026}px Inter, sans-serif`;
  const f2 = `500 ${w * 0.022}px "SF Mono", monospace`;

  ctx.font = f1;
  const tw1 = ctx.measureText(text1).width;
  ctx.font = f2;
  const tw2 = ctx.measureText(text2).width;
  const x0 = (w - tw1 - tw2) / 2;

  ctx.fillStyle = accentColor;
  ctx.font = f1;
  ctx.textAlign = "left";
  ctx.fillText(text1, x0, statsY);
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = f2;
  ctx.fillText(text2, x0 + tw1, statsY);
}

export function drawGoalWallpaper(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bgColor: string,
  accentColor: string,
  clockHeight: number,
  goalDate: string | null,
  goalStart: string | null,
  goalName: string,
  timezone: string | null,
) {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  const clockSpace = h * clockHeight;
  const cx = w / 2;
  const cy = clockSpace + (h - clockSpace) * 0.4;
  const r = w * 0.25;

  let daysRemaining = 0;
  let progress = 0;

  if (goalDate) {
    const goal = new Date(goalDate);
    const now = timezone
      ? new Date(new Date().toLocaleString("en-US", { timeZone: timezone }))
      : new Date();
    now.setHours(0, 0, 0, 0);
    goal.setHours(0, 0, 0, 0);
    daysRemaining = Math.max(
      0,
      Math.ceil((goal.getTime() - now.getTime()) / 86_400_000),
    );

    let startDate: Date;
    if (goalStart) {
      startDate = new Date(goalStart);
      startDate.setHours(0, 0, 0, 0);
    } else {
      const def = new Date(goal.getTime() - 30 * 86_400_000);
      startDate = def < now ? def : now;
    }
    const totalDays = Math.max(
      1,
      Math.ceil((goal.getTime() - startDate.getTime()) / 86_400_000),
    );
    progress = Math.min(0.9999, Math.max(0, daysRemaining / totalDays));
  }

  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  if (progress > 0) {
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.stroke();
  }

  ctx.fillStyle = accentColor;
  ctx.font = `bold ${w * 0.14}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(daysRemaining), cx, cy - 4);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = `${w * 0.03}px Inter, sans-serif`;
  ctx.fillText(
    daysRemaining === 1 ? "day left" : "days left",
    cx,
    cy + h * 0.08,
  );

  if (goalName) {
    ctx.fillStyle = accentColor;
    ctx.font = `600 ${w * 0.035}px Inter, sans-serif`;
    ctx.fillText(goalName, cx, h * 0.75);
  }
}

export function buildWallpaperURL(state: AppState): string | null {
  if (!state.selectedType || !state.country) return null;

  const params = new URLSearchParams({
    country: state.country.toLowerCase(),
    type: state.selectedType,
    bg: state.bgColor.replace("#", ""),
    accent: state.accentColor.replace("#", ""),
    width: String(state.width),
    height: String(state.height),
    clockHeight: String(state.clockHeight),
  });

  if (state.selectedType === "life") {
    if (state.dob) params.set("dob", state.dob);
    params.set("lifespan", String(state.lifespan));
  }

  if (state.selectedType === "goal") {
    if (state.goalStart) params.set("goalStart", state.goalStart);
    if (state.goalDate) params.set("goal", state.goalDate);
    if (state.goalName)
      params.set("goalName", encodeURIComponent(state.goalName));
  }

  return `${WORKER_URL}/api/generate?${params.toString()}`;
}
