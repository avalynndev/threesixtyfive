import { type NextRequest, NextResponse } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import { wallpaperSchema } from "@/lib/validation";
import { getTimezone } from "@/lib/timezone";
import { generateYearCalendar } from "@/generators/year";
import { generateLifeCalendar } from "@/generators/life";
import { generateGoalCountdown } from "@/generators/goal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const validated = wallpaperSchema.parse(params);

    const timezone = getTimezone(validated.country);

    const options = {
      width: validated.width,
      height: validated.height,
      bgColor: validated.bg,
      accentColor: validated.accent,
      timezone,
      clockHeight: validated.clockHeight,
      dob: validated.dob,
      lifespan: validated.lifespan,
      goalDate: validated.goal,
      goalStart: validated.goalStart,
      goalName: validated.goalName,
    };

    let svg: string;
    switch (validated.type) {
      case "life":
        svg = generateLifeCalendar(options);
        break;
      case "goal":
        svg = generateGoalCountdown(options);
        break;
      default:
        svg = generateYearCalendar(options);
    }

    if (validated.format === "svg") {
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const resvg = new Resvg(svg, {
      fitTo: { mode: "original" },
      font: { loadSystemFonts: true, defaultFontFamily: "Inter" },
    });

    const png = resvg.render().asPng();

    return new NextResponse(png.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err: unknown) {
    if (err && typeof err === "object" && "issues" in err) {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: (err as { issues: unknown }).issues,
        },
        { status: 400 },
      );
    }
    console.error("[/api/generate]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
