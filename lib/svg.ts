export function createSVG(
  width: number,
  height: number,
  content: string,
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap');
    </style>
  </defs>
  ${content}
</svg>`;
}

export function rect(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  rx = 0,
): string {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" rx="${rx}" />`;
}

export function circle(
  cx: number,
  cy: number,
  r: number,
  fill: string,
): string {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" />`;
}

interface TextOptions {
  fill?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAnchor?: string;
  dominantBaseline?: string;
  escape?: boolean;
}

export function text(
  x: number,
  y: number,
  content: string,
  options: TextOptions = {},
): string {
  const {
    fill = "#ffffff",
    fontSize = 16,
    fontWeight = "400",
    fontFamily = "Inter, sans-serif",
    textAnchor = "start",
    dominantBaseline = "auto",
    escape = true,
  } = options;
  const inner = escape ? escapeXml(content) : content;
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${fontSize}" font-weight="${fontWeight}" font-family="${fontFamily}" text-anchor="${textAnchor}" dominant-baseline="${dominantBaseline}">${inner}</text>`;
}

export function arc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  stroke: string,
  strokeWidth: number,
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return `<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" stroke-linecap="round" />`;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function parseColor(hex: string): string {
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return "#111114";
  return "#" + hex;
}

export function colorWithAlpha(hex: string, alpha: number): string {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
