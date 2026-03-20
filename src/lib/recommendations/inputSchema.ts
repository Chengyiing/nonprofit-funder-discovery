import { z } from "zod";

const stateSchema = z
  .string()
  .trim()
  .min(2)
  .max(2)
  .transform((v) => v.toUpperCase());

export const toolInputSchema = z.object({
  keywords: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .describe("Issue area / keywords"),
  missionContext: z
    .string()
    .trim()
    .min(10)
    .max(2000)
    .describe("Short mission / context"),
  city: z.string().trim().min(2).max(80),
  state: stateSchema,
  desiredGrantAmount: z
    .number()
    .min(1000)
    .max(100000000)
    .describe("USD desired grant size"),
  annualOperatingBudget: z
    .number()
    .min(0)
    .max(1000000000)
    .optional(),
  advanced: z
    .object({
      topicSimilarityWeight: z.number().min(0).max(100),
      geographyWeight: z.number().min(0).max(100),
      grantSizeWeight: z.number().min(0).max(100),
    })
    .partial()
    .optional(),
});

export type ToolInput = z.infer<typeof toolInputSchema>;

