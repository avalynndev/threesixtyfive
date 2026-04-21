import { type NextRequest, NextResponse } from "next/server";
import { Resvg } from "@resvg/resvg-js";
import { wallpaperSchema } from "@/lib/validation";
import { getTimezone } from "@/lib/timezone";
import { generateYearCalendar } from "@/generators/year";
import { generateLifeCalendar } from "@/generators/life";
import { generateGoalCountdown } from "@/generators/goal";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, remaining, resetIn } = rateLimit(ip);

  const rateLimitHeaders = {
    "X-RateLimit-Limit": "20",
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(resetIn),
  };

  if (!allowed) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        message: `Rate limit exceeded. Try again in ${resetIn}s.`,
      },
      {
        status: 429,
        headers: { ...rateLimitHeaders, "Retry-After": String(resetIn) },
      },
    );
  }

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
          ...rateLimitHeaders,
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
        ...rateLimitHeaders,
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
        { status: 400, headers: rateLimitHeaders },
      );
    }
    console.error("[/api/generate]", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: rateLimitHeaders,
    });
  }
}
