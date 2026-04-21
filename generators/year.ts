import {
  createSVG,
  rect,
  circle,
  text,
  parseColor,
  colorWithAlpha,
} from "@/lib/svg";
import { getDateInTimezone, getDayOfYear, getDaysInYear } from "@/lib/timezone";

interface YearOptions {
  width: number;
  height: number;
  bgColor: string;
  accentColor: string;
  timezone: string;
  clockHeight?: number;
}

export function generateYearCalendar(options: YearOptions): string {
  const {
    width,
    height,
    bgColor,
    accentColor,
    timezone,
    clockHeight = 0.22,
  } = options;

  const { year, month, day } = getDateInTimezone(timezone);
  const dayOfYear = getDayOfYear(year, month, day);
  const totalDays = getDaysInYear(year);

  const cols = 15;
  const rows = Math.ceil(totalDays / cols);

  const clockSpace = height * (clockHeight + 0.05);
  const statsReserved = height * 0.07;
  const padding = width * 0.2;
  const gap = Math.max(3, width * 0.008);

  const availableWidth = width - padding * 2;
  const availableHeight = height - clockSpace - height * 0.02 - statsReserved;

  const cellByWidth = (availableWidth - gap * (cols - 1)) / cols;
  const cellByHeight = (availableHeight - gap * (rows - 1)) / rows;
  const cellSize = Math.min(cellByWidth, cellByHeight);
  const dotRadius = (cellSize / 2) * 0.85;

  const gridWidth = cellSize * cols + gap * (cols - 1);
  const gridHeight = cellSize * rows + gap * (rows - 1);
  const startX = (width - gridWidth) / 2;
  const startY = clockSpace + height * 0.02;

  let content = rect(0, 0, width, height, parseColor(bgColor));

  for (let i = 0; i < totalDays; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cellSize + gap) + cellSize / 2;
    const cy = startY + row * (cellSize + gap) + cellSize / 2;

    const isToday = i === dayOfYear - 1;
    const isCompleted = i < dayOfYear;

    const fillColor = isToday
      ? parseColor(accentColor)
      : isCompleted
        ? colorWithAlpha(parseColor(accentColor), 0.75)
        : colorWithAlpha("#ffffff", 0.12);
    const radius = isToday ? dotRadius * 1.12 : dotRadius;

    content += circle(cx, cy, radius, fillColor);
  }

  const daysRemaining = totalDays - dayOfYear;
  const progressPercent = Math.round((dayOfYear / totalDays) * 100);
  const statsY = startY + gridHeight + statsReserved * 0.6;

  const statsContent =
    `<tspan fill="${parseColor(accentColor)}" font-family="Inter" font-weight="500">${daysRemaining} days left</tspan>` +
    `<tspan fill="rgba(255,255,255,0.5)" font-family="'SF Mono','Menlo','Courier New',monospace" font-weight="400"> · ${progressPercent}% complete</tspan>`;

  content += text(width / 2, statsY, statsContent, {
    fontSize: width * 0.032,
    textAnchor: "middle",
    dominantBaseline: "middle",
    escape: false,
  });

  return createSVG(width, height, content);
}
