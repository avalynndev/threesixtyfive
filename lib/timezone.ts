export const countryTimezones: Record<string, string> = {
  af: "Asia/Kabul",
  al: "Europe/Tirane",
  dz: "Africa/Algiers",
  ar: "America/Argentina/Buenos_Aires",
  au: "Australia/Sydney",
  at: "Europe/Vienna",
  bd: "Asia/Dhaka",
  be: "Europe/Brussels",
  br: "America/Sao_Paulo",
  ca: "America/Toronto",
  cl: "America/Santiago",
  cn: "Asia/Shanghai",
  co: "America/Bogota",
  hr: "Europe/Zagreb",
  cz: "Europe/Prague",
  dk: "Europe/Copenhagen",
  eg: "Africa/Cairo",
  fi: "Europe/Helsinki",
  fr: "Europe/Paris",
  de: "Europe/Berlin",
  gr: "Europe/Athens",
  hk: "Asia/Hong_Kong",
  hu: "Europe/Budapest",
  is: "Atlantic/Reykjavik",
  in: "Asia/Kolkata",
  id: "Asia/Jakarta",
  ir: "Asia/Tehran",
  iq: "Asia/Baghdad",
  ie: "Europe/Dublin",
  il: "Asia/Jerusalem",
  it: "Europe/Rome",
  jp: "Asia/Tokyo",
  ke: "Africa/Nairobi",
  kr: "Asia/Seoul",
  kw: "Asia/Kuwait",
  my: "Asia/Kuala_Lumpur",
  mx: "America/Mexico_City",
  ma: "Africa/Casablanca",
  nl: "Europe/Amsterdam",
  nz: "Pacific/Auckland",
  ng: "Africa/Lagos",
  no: "Europe/Oslo",
  pk: "Asia/Karachi",
  pe: "America/Lima",
  ph: "Asia/Manila",
  pl: "Europe/Warsaw",
  pt: "Europe/Lisbon",
  qa: "Asia/Qatar",
  ro: "Europe/Bucharest",
  ru: "Europe/Moscow",
  sa: "Asia/Riyadh",
  sg: "Asia/Singapore",
  za: "Africa/Johannesburg",
  es: "Europe/Madrid",
  se: "Europe/Stockholm",
  ch: "Europe/Zurich",
  tw: "Asia/Taipei",
  th: "Asia/Bangkok",
  tr: "Europe/Istanbul",
  ua: "Europe/Kyiv",
  ae: "Asia/Dubai",
  gb: "Europe/London",
  us: "America/New_York",
  vn: "Asia/Ho_Chi_Minh",
};

export function getTimezone(countryCode: string): string {
  return countryTimezones[countryCode.toLowerCase()] || "UTC";
}

export function getDateInTimezone(timezone: string): {
  year: number;
  month: number;
  day: number;
} {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  return {
    year: parseInt(parts.find((p) => p.type === "year")!.value),
    month: parseInt(parts.find((p) => p.type === "month")!.value),
    day: parseInt(parts.find((p) => p.type === "day")!.value),
  };
}

export function getDayOfYear(year: number, month: number, day: number): number {
  const date = new Date(year, month - 1, day);
  const start = new Date(year, 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86_400_000);
}

export function getWeekOfYear(
  year: number,
  month: number,
  day: number,
): number {
  const date = new Date(year, month - 1, day);
  const firstDay = new Date(year, 0, 1);
  const daysSinceStart = Math.floor(
    (date.getTime() - firstDay.getTime()) / 86_400_000,
  );
  return Math.ceil((daysSinceStart + firstDay.getDay() + 1) / 7);
}

export function getWeeksBetween(startDate: Date, endDate: Date): number {
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (7 * 86_400_000),
  );
}

export function getDaysBetween(startDate: Date, endDate: Date): number {
  return Math.ceil((endDate.getTime() - startDate.getTime()) / 86_400_000);
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}
