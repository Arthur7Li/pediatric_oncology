import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const journeyCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journey" }),
  schema: z.object({
    title: z.string(),
    step: z.number(),
    author: z.string().default("Medical Review Team"),
    last_medically_reviewed_date: z.string(),
    authoritative_sources: z.array(z.string()).optional(),
    canadian_sources: z.array(z.string()).optional(),
    medical_disclaimer: z.boolean().default(true),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

const tumorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tumors" }),
  schema: z.object({
    title: z.string(),
    incidence: z.string(),
    author: z.string().default("Medical Review Team"),
    last_medically_reviewed_date: z.string(),
    authoritative_sources: z.array(z.string()).optional(),
    canadian_sources: z.array(z.string()).optional(),
    medical_disclaimer: z.boolean().default(true),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

const symptomsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/symptoms" }),
  schema: z.object({
    title: z.string(),
    severity: z.string(),
    author: z.string().default("Medical Review Team"),
    last_medically_reviewed_date: z.string(),
    authoritative_sources: z.array(z.string()).optional(),
    canadian_sources: z.array(z.string()).optional(),
    medical_disclaimer: z.boolean().default(true),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

export const collections = {
  journey: journeyCollection,
  tumors: tumorsCollection,
  symptoms: symptomsCollection,
};
