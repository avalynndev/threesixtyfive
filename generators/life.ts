import {
  createSVG,
  rect,
  circle,
  text,
  parseColor,
  colorWithAlpha,
} from "@/lib/svg";
import { getDateInTimezone, getWeeksBetween } from "@/lib/timezone";

interface LifeOptions {
  width: number;
  height: number;
  bgColor: string;
  accentColor: string;
  timezone: string;
  dob?: string;
  lifespan?: number;
  clockHeight?: number;
}

export function generateLifeCalendar(options: LifeOptions): string {
  const {
    width,
    height,
    bgColor,
    accentColor,
    timezone,
    dob,
    lifespan = 80,
    clockHeight = 0.22,
  } = options;

  const { year, month, day } = getDateInTimezone(timezone);
  const now = new Date(year, month - 1, day);

  const dobDate = dob
    ? (() => {
        const [y, m, d] = dob.split("-").map(Number);
        return new Date(y, m - 1, d);
      })()
    : new Date(year - 25, month - 1, day);

  const weeksLived = Math.max(0, getWeeksBetween(dobDate, now));
  const totalWeeks = lifespan * 52;

  const cols = 52;
  const rows = lifespan;

  const clockSpace = height * (clockHeight + 0.05);
  const statsReserved = height * 0.06;
  const padding = width * 0.15;
  const gap = Math.max(1.5, width * 0.003);

  const availableWidth = width - padding * 2;
  const availableHeight = height - clockSpace - height * 0.02 - statsReserved;

  const cellSize = Math.min(
    (availableWidth - gap * (cols - 1)) / cols,
    (availableHeight - gap * (rows - 1)) / rows,
  );
  const dotRadius = (cellSize / 2) * 0.85;

  const gridWidth = cellSize * cols + gap * (cols - 1);
  const gridHeight = cellSize * rows + gap * (rows - 1);
  const startX = (width - gridWidth) / 2;
  const startY = clockSpace + height * 0.02;

  let content = rect(0, 0, width, height, parseColor(bgColor));

  for (let i = 0; i < totalWeeks; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cellSize + gap) + cellSize / 2;
    const cy = startY + row * (cellSize + gap) + cellSize / 2;

    const isCurrentWeek = i === weeksLived;
    const isLived = i < weeksLived;

    const fillColor = isCurrentWeek
      ? parseColor(accentColor)
      : isLived
        ? colorWithAlpha(parseColor(accentColor), 0.75)
        : colorWithAlpha("#ffffff", 0.06);
    const radius = isCurrentWeek ? dotRadius * 1.15 : dotRadius;

    content += circle(cx, cy, radius, fillColor);
  }

  const weeksRemaining = totalWeeks - weeksLived;
  const progressPercent = Math.round((weeksLived / totalWeeks) * 100);
  const statsY = startY + gridHeight + statsReserved * 0.6;

  const statsContent =
    `<tspan fill="${parseColor(accentColor)}" font-family="Inter" font-weight="500">${weeksRemaining.toLocaleString()} weeks left</tspan>` +
    `<tspan fill="rgba(255,255,255,0.5)" font-family="'SF Mono','Menlo','Courier New',monospace" font-weight="400"> · ${progressPercent}% lived</tspan>`;

  content += text(width / 2, statsY, statsContent, {
    fontSize: width * 0.022,
    textAnchor: "middle",
    dominantBaseline: "middle",
    escape: false,
  });

  return createSVG(width, height, content);
}
