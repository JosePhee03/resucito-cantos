import { LyricToken } from "./lyric";

export function parseLyricLine(line: string) {
  const chordRegex =
    /([A-Z]\.)|(^(?:\s*(?:[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus\d*)?\d*\/?[A-G]?(?:#|b)?\d*)\s*)+$)|([^[\]]+)/g;
  const regex = /([A-Z]\.)|\[([^\]]+)\]|([^[\]]+)/g;
  const regexUppercase = /^[A-Z\s\.\,\!\¡\Á\É\Í\Ó\Ú\Ñ\#0-9]*$/g;
  const LyricLine: LyricToken[] = [];

  for (const match of line.matchAll(chordRegex)) {
    const [, label, chord, text] = match;

    if (label) {
      LyricLine.push({ type: "label", value: label });
    } else if (chord) {
      LyricLine.push({ type: "chord", value: chord });
    } else if (text) {
      if (regexUppercase.test(text)) {
        LyricLine.push({ type: "chorus", value: text });
      } else {
        LyricLine.push({ type: "text", value: text });
      }
    }
  }

  return LyricLine;
}
