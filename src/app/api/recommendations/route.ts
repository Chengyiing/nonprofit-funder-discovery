import { NextResponse } from "next/server";
import OpenAI from "openai";
import { toolInputSchema } from "@/lib/recommendations/inputSchema";
import { getRecommendationsFromCsv } from "@/lib/recommendations/match";
import { generateExplanation } from "@/lib/recommendations/generateExplanation";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

  const queryText = `${parsed.data.keywords} ${parsed.data.missionContext}`;
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: queryText.slice(0, 8000),
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  const response = await getRecommendationsFromCsv(parsed.data, queryEmbedding);

  if (!response.noGoodMatchesFound && response.results.length > 0) {
    const enhanced = await Promise.all(
      response.results.map(async (funder) => ({
        ...funder,
        whyRecommended: await generateExplanation(parsed.data, funder),
      }))
    );
    response.results = enhanced;
  }

  return NextResponse.json(response, { status: 200 });
}

