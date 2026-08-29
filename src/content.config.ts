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

const provincesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/provinces" }),
  schema: z.object({
    province_key: z.string(),
    title: z.string(),
    hospitals: z.array(
      z.object({
        name: z.string(),
        desc: z.string(),
        linkText: z.string(),
        linkUrl: z.string(),
      }),
    ),
    financial: z.array(
      z.object({
        name: z.string(),
        desc: z.string(),
        url: z.string().optional().or(z.literal("")),
      }),
    ),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

const charitiesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/charities" }),
  schema: z.object({
    name: z.string(),
    url: z.string(),
    scope: z.enum(["national", "provincial", "indigenous", "international"]),
    province: z.string().optional(),
    services: z.array(z.string()),
    last_verified_date: z.string(),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

const glossaryCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
  schema: z.object({
    category: z.enum([
      "diagnosis-testing",
      "treatment",
      "blood-lab",
      "side-effects",
      "cancer-types",
      "healthcare-team",
      "canadian-system",
    ]),
    terms: z.array(
      z.object({
        term: z.string(),
        definition: z.string(),
      }),
    ),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

const faqCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    category: z.enum([
      "diagnosis",
      "treatment",
      "side-effects",
      "financial",
      "emotional",
      "misconceptions",
    ]),
    category_icon: z.string(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
        needs_medical_review: z.boolean().default(false),
      }),
    ),
    lang: z.enum(["en", "fr", "zh"]),
  }),
});

export const collections = {
  journey: journeyCollection,
  tumors: tumorsCollection,
  symptoms: symptomsCollection,
  provinces: provincesCollection,
  charities: charitiesCollection,
  glossary: glossaryCollection,
  faq: faqCollection,
};
