import {
  createSVG,
  rect,
  text,
  arc,
  parseColor,
  colorWithAlpha,
} from "@/lib/svg";
import { getDateInTimezone, getDaysBetween } from "@/lib/timezone";

interface GoalOptions {
  width: number;
  height: number;
  bgColor: string;
  accentColor: string;
  timezone: string;
  goalDate?: string;
  goalStart?: string;
  goalName?: string;
  clockHeight?: number;
}

export function generateGoalCountdown(options: GoalOptions): string {
  const {
    width,
    height,
    bgColor,
    accentColor,
    timezone,
    goalDate,
    goalStart,
    goalName = "Goal",
    clockHeight = 0.18,
  } = options;

  const { year, month, day } = getDateInTimezone(timezone);
  const now = new Date(year, month - 1, day);

  const targetDate = goalDate
    ? (() => {
        const [y, m, d] = goalDate.split("-").map(Number);
        return new Date(y, m - 1, d);
      })()
    : new Date(now.getTime() + 30 * 86_400_000);

  const startDate = goalStart
    ? (() => {
        const [y, m, d] = goalStart.split("-").map(Number);
        return new Date(y, m - 1, d);
      })()
    : (() => {
        const def = new Date(targetDate.getTime() - 30 * 86_400_000);
        return def < now ? def : now;
      })();

  const daysRemaining = Math.max(0, getDaysBetween(now, targetDate));
  const totalDays = Math.max(1, getDaysBetween(startDate, targetDate));
  const progress = Math.max(0, Math.min(1, daysRemaining / totalDays));

  const clockSpace = height * (clockHeight + 0.05);
  const centerX = width / 2;
  const centerY = clockSpace + (height - clockSpace) * 0.4;
  const radius = width * 0.28;
  const strokeWidth = width * 0.035;

  let content = rect(0, 0, width, height, parseColor(bgColor));

  content += `<circle cx="${centerX}" cy="${centerY}" r="${radius}" stroke="${colorWithAlpha("#ffffff", 0.1)}" stroke-width="${strokeWidth}" fill="none" />`;

  if (progress > 0) {
    content += arc(
      centerX,
      centerY,
      radius,
      0,
      progress * 360,
      parseColor(accentColor),
      strokeWidth,
    );
  }

  content += text(centerX, centerY - height * 0.015, String(daysRemaining), {
    fill: parseColor(accentColor),
    fontSize: width * 0.2,
    fontWeight: "700",
    textAnchor: "middle",
    dominantBaseline: "middle",
  });

  content += text(
    centerX,
    centerY + height * 0.08,
    daysRemaining === 1 ? "day left" : "days left",
    {
      fill: colorWithAlpha("#ffffff", 0.5),
      fontSize: width * 0.04,
      fontWeight: "400",
      textAnchor: "middle",
      dominantBaseline: "middle",
    },
  );

  content += text(centerX, height * 0.75, decodeURIComponent(goalName), {
    fill: "#ffffff",
    fontSize: width * 0.05,
    fontWeight: "600",
    textAnchor: "middle",
    dominantBaseline: "middle",
  });

  const dateStr = targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  content += text(centerX, height * 0.77, dateStr, {
    fill: colorWithAlpha("#ffffff", 0.4),
    fontSize: width * 0.028,
    fontWeight: "400",
    textAnchor: "middle",
    dominantBaseline: "middle",
  });

  return createSVG(width, height, content);
}
