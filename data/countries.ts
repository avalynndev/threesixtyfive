import type { Country } from "@/lib/types";

export const countries: Country[] = [
  { code: "US", name: "United States", timezone: "America/New_York" },
  { code: "GB", name: "United Kingdom", timezone: "Europe/London" },
  { code: "CA", name: "Canada", timezone: "America/Toronto" },
  { code: "AU", name: "Australia", timezone: "Australia/Sydney" },
  { code: "IN", name: "India", timezone: "Asia/Kolkata" },
  { code: "DE", name: "Germany", timezone: "Europe/Berlin" },
  { code: "FR", name: "France", timezone: "Europe/Paris" },
  { code: "JP", name: "Japan", timezone: "Asia/Tokyo" },
  { code: "CN", name: "China", timezone: "Asia/Shanghai" },
  { code: "BR", name: "Brazil", timezone: "America/Sao_Paulo" },
  { code: "MX", name: "Mexico", timezone: "America/Mexico_City" },
  { code: "KR", name: "South Korea", timezone: "Asia/Seoul" },
  { code: "IT", name: "Italy", timezone: "Europe/Rome" },
  { code: "ES", name: "Spain", timezone: "Europe/Madrid" },
  { code: "NL", name: "Netherlands", timezone: "Europe/Amsterdam" },
  { code: "SE", name: "Sweden", timezone: "Europe/Stockholm" },
  { code: "NO", name: "Norway", timezone: "Europe/Oslo" },
  { code: "DK", name: "Denmark", timezone: "Europe/Copenhagen" },
  { code: "CH", name: "Switzerland", timezone: "Europe/Zurich" },
  { code: "PL", name: "Poland", timezone: "Europe/Warsaw" },
  { code: "PT", name: "Portugal", timezone: "Europe/Lisbon" },
  { code: "NZ", name: "New Zealand", timezone: "Pacific/Auckland" },
  { code: "SG", name: "Singapore", timezone: "Asia/Singapore" },
  { code: "HK", name: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { code: "TW", name: "Taiwan", timezone: "Asia/Taipei" },
  { code: "TH", name: "Thailand", timezone: "Asia/Bangkok" },
  { code: "VN", name: "Vietnam", timezone: "Asia/Ho_Chi_Minh" },
  { code: "ID", name: "Indonesia", timezone: "Asia/Jakarta" },
  { code: "MY", name: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
  { code: "PH", name: "Philippines", timezone: "Asia/Manila" },
  { code: "PK", name: "Pakistan", timezone: "Asia/Karachi" },
  { code: "BD", name: "Bangladesh", timezone: "Asia/Dhaka" },
  { code: "RU", name: "Russia", timezone: "Europe/Moscow" },
  { code: "TR", name: "Turkey", timezone: "Europe/Istanbul" },
  { code: "SA", name: "Saudi Arabia", timezone: "Asia/Riyadh" },
  { code: "AE", name: "UAE", timezone: "Asia/Dubai" },
  { code: "ZA", name: "South Africa", timezone: "Africa/Johannesburg" },
  { code: "EG", name: "Egypt", timezone: "Africa/Cairo" },
  { code: "NG", name: "Nigeria", timezone: "Africa/Lagos" },
  { code: "AR", name: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
  { code: "CO", name: "Colombia", timezone: "America/Bogota" },
  { code: "CL", name: "Chile", timezone: "America/Santiago" },
  { code: "PE", name: "Peru", timezone: "America/Lima" },
  { code: "IL", name: "Israel", timezone: "Asia/Jerusalem" },
  { code: "GR", name: "Greece", timezone: "Europe/Athens" },
  { code: "CZ", name: "Czech Republic", timezone: "Europe/Prague" },
  { code: "AT", name: "Austria", timezone: "Europe/Vienna" },
  { code: "BE", name: "Belgium", timezone: "Europe/Brussels" },
  { code: "FI", name: "Finland", timezone: "Europe/Helsinki" },
  { code: "IE", name: "Ireland", timezone: "Europe/Dublin" },
];

export function getFlagEmoji(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function autoDetectCountry(): Country | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return countries.find((c) => c.timezone === tz) ?? null;
  } catch {
    return null;
  }
}
