import OpenAI from "openai";
import type { FunderRecommendation, ToolInput } from "./types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildPrompt(input: ToolInput, funder: FunderRecommendation): string {
  const grantRange = `$${funder.typicalGrantSizeUsd.min.toLocaleString()}–$${funder.typicalGrantSizeUsd.max.toLocaleString()}`;
  const topStates = funder.geography.topStates.join(", ");
  const categories = funder.purposeCategories.join(", ");
  const sampleGrants = funder.samplePastGrants
    .map((g) => `  - ${g.year}: $${g.amountUsd.toLocaleString()} to ${g.recipientName ?? "unknown"} (${g.purposeCategory})`)
    .join("\n");

  return `You are helping a nonprofit find funders. Write a 2-3 sentence explanation of why this funder is a good match for the applicant. Be specific, natural, and encouraging. Do not use bullet points.

APPLICANT:
- Keywords: ${input.keywords}
- Mission: ${input.missionContext}
- Location: ${input.city}, ${input.state}
- Desired grant: $${input.desiredGrantAmount.toLocaleString()}

FUNDER: ${funder.name}
- Purpose categories: ${categories}
- Top grant states: ${topStates}
- Typical grant range: ${grantRange}
- Sample past grants:
${sampleGrants}

Write only the explanation, no preamble.`;
}

export async function generateExplanation(
  input: ToolInput,
  funder: FunderRecommendation
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: buildPrompt(input, funder) }],
      max_tokens: 150,
      temperature: 0.4,
    });
    return response.choices[0]?.message?.content?.trim() ?? funder.whyRecommended;
  } catch {
    // fall back to template-based explanation if LLM call fails
    return funder.whyRecommended;
  }
}
