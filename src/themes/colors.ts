import { palettes } from "./palettes";

export const colors = {
  background: palettes.neutral100,
  surface: palettes.white,
  foreground: palettes.neutral800,

  surfaceSecondary: palettes.neutral200,
  foregroundSecondary: palettes.neutral500,

  primary: palettes.rose600,
  secondary: palettes.rose100,

  text: palettes.neutral950,
  title: palettes.neutral800,
  textSecondary: palettes.neutral800,
  textTertiary: palettes.neutral500,

  border: palettes.neutral200,
  pressed: "#00000020",

  precatechumenate: palettes.gray200,
  catechumenate: palettes.sky200,
  liturgy: palettes.amber200,
  election: palettes.lime200,
} as const;
