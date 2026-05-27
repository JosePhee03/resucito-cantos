import { z } from "zod";

export const stageSchema = z.enum([
  "catechumenate",
  "election",
  "liturgy",
  "precatechumenate",
]);

export const categorySchema = z.enum([
  "communion",
  "easter",
  "entrance",
  "pentecost",
  "lent",
  "lutes_and_vespers",
  "exit",
  "christmas",
  "childrens_song",
  "peace_and_offerings",
  "fraction_of_bread",
  "signing_to_the_virgin",
  "advent",
]);

export const songSchema = z.object({
  id: z.string(),
  page: z.number(),
  title: z.string(),
  subtitle: z.string(),
  capo: z.number(),
  stage: stageSchema,
  categories: z.array(categorySchema),
  lyric: z.string(),
  chords: z.array(z.string()),
  tone: z.string(),
});

export const songsSchema = z.array(songSchema);
