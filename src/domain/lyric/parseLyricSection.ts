import { LyricLine, LyricSection } from "./lyric";
import { parseLyricLine } from "./parseLyricLine";

export function parseLyricSections(lyric: string) {
  const sections = lyric.split("\n\n");
  const lyricSections: LyricSection[] = [];

  for (const section of sections) {
    const lines = section.split("\n");
    const lineParser: LyricLine[] = lines.map((l) => ({
      type: "line",
      children: parseLyricLine(l),
    }));
    lyricSections.push({ type: "section", children: lineParser });
  }

  return lyricSections;
}
