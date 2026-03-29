import fs from "node:fs";
import path from "node:path";

type EmbeddingRecord = {
  ein: string;
  name: string;
  embedding: number[];
};

let cachedEmbeddings: EmbeddingRecord[] | null = null;

export function getFunderEmbeddings(): EmbeddingRecord[] {
  if (cachedEmbeddings) return cachedEmbeddings;
  const filePath = path.join(process.cwd(), "data", "embeddings.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  cachedEmbeddings = JSON.parse(raw) as EmbeddingRecord[];
  return cachedEmbeddings;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/** Returns a map of EIN → topic similarity score (0–1) */
export function computeTopicScores(queryEmbedding: number[]): Map<string, number> {
  const embeddings = getFunderEmbeddings();
  const scores = new Map<string, number>();

  for (const record of embeddings) {
    const sim = cosineSimilarity(queryEmbedding, record.embedding);
    // cosine similarity is -1 to 1; clamp to 0–1
    scores.set(record.ein, Math.max(0, sim));
  }

  return scores;
}
