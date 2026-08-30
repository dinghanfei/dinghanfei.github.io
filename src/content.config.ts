import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    summary: z.string(),
    year: z.string(),
    order: z.number(),
    section: z.enum(["project", "research"]).default("project"),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()).default([]),
    accent: z.string().default("teal"),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    order: z.number(),
    format: z.enum(["Markdown", "PDF", "Notion"]),
    icon: z.string().default("NOTE"),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, notes };
