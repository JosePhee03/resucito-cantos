import { palettes } from "./palettes";

export const colors = {
  background: palettes.white,
  backgroundSecondary: palettes.zinc50,
  surface: palettes.neutral50,
  foreground: palettes.zinc800,

  surfaceSecondary: palettes.zinc50,
  foregroundSecondary: palettes.zinc500,

  surfaceTertiary: palettes.zinc50,

  primary: palettes.rose600,
  secondary: palettes.rose100,

  text: palettes.zinc900,
  title: palettes.zinc800,
  textSecondary: palettes.zinc800,
  textTertiary: palettes.zinc500,

  border: palettes.zinc200,
  pressed: "rgba(31, 31, 31, .04)",

  precatechumenate: palettes.gray200,
  catechumenate: palettes.sky200,
  liturgy: palettes.amber200,
  election: palettes.lime200,
} as const;
