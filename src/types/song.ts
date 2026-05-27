import { categorySchema, songSchema, stageSchema } from "@/schemas/song.schema";
import z from "zod";

export type Song = z.infer<typeof songSchema>;

export type Stage = z.infer<typeof stageSchema>;

export type Category = z.infer<typeof categorySchema>;

export type Chord =
  | "Am"
  | "A7"
  | "Dm9"
  | "Fmaj7"
  | "E"
  | "F"
  | "Dm"
  | "Gm"
  | "Bb7"
  | "E7"
  | "G"
  | "Bb"
  | "A"
  | "Bm"
  | "Em"
  | "F#"
  | "F#m"
  | "C#"
  | "C7"
  | "D"
  | "C"
  | "B"
  | "G7"
  | "Em6"
  | "B7"
  | "D7"
  | "G#"
  | "C#m"
  | "C#7"
  | "A#"
  | "F7"
  | "Am6"
  | "Cm"
  | "Dm5";
