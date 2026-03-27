import { NextResponse } from "next/server";
import { toolInputSchema } from "@/lib/recommendations/inputSchema";
import { getRecommendationsFromCsv } from "@/lib/recommendations/match";

export async function POST(req: Request) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = toolInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const response = await getRecommendationsFromCsv(parsed.data);
  return NextResponse.json(response, { status: 200 });
}

