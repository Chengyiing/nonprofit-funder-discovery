/**
 * One-time script: reads funder_profile_final.csv, generates OpenAI embeddings
 * for each funder's text_corpus, and writes the result to data/embeddings.json.
 *
 * Run with:
 *   npx ts-node --esm scripts/generate-embeddings.ts
 * or:
 *   npx tsx scripts/generate-embeddings.ts
 */

import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import OpenAI from "openai";

const EMBEDDING_MODEL = "text-embedding-3-small";
const BATCH_SIZE = 100; // OpenAI allows up to 2048 inputs per request

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type CsvProfileRow = {
  funder_ein?: string;
  funder_name?: string;
  text_corpus?: string;
};

type EmbeddingRecord = {
  ein: string;
  name: string;
  embedding: number[];
};

async function embedBatch(texts: string[]): Promise<number[][]> {
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return response.data.map((d) => d.embedding);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    console.error("ERROR: OPENAI_API_KEY not set in .env.local");
    process.exit(1);
  }

  const profilePath = path.join(process.cwd(), "data", "raw", "funder_profile_final.csv");
  const outputPath = path.join(process.cwd(), "data", "embeddings.json");

  console.log("Reading CSV...");
  const csv = fs.readFileSync(profilePath, "utf-8");
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as CsvProfileRow[];

  const valid = rows.filter((r) => r.funder_ein?.trim() && r.funder_name?.trim());
  console.log(`Found ${valid.length} valid funders`);

  const results: EmbeddingRecord[] = [];
  let processed = 0;

  for (let i = 0; i < valid.length; i += BATCH_SIZE) {
    const batch = valid.slice(i, i + BATCH_SIZE);
    const texts = batch.map((r) =>
      (r.text_corpus ?? `${r.funder_name}`).slice(0, 8000)
    );

    console.log(`Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(valid.length / BATCH_SIZE)} (${i + 1}–${Math.min(i + BATCH_SIZE, valid.length)})...`);

    const embeddings = await embedBatch(texts);

    for (let j = 0; j < batch.length; j++) {
      results.push({
        ein: batch[j].funder_ein!.trim(),
        name: batch[j].funder_name!.trim(),
        embedding: embeddings[j],
      });
    }

    processed += batch.length;
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nDone! Saved ${results.length} embeddings to data/embeddings.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
