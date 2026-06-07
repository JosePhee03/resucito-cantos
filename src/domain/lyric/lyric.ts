export type LyricSection = { type: "section"; children: LyricLine[] };

export type LyricLine = { type: "line"; children: LyricToken[] };

export type LyricToken =
  | { type: "label"; value: string }
  | { type: "chord"; value: string }
  | { type: "chorus"; value: string }
  | { type: "text"; value: string };
