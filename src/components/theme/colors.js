const buildPalette = ({ id, name, hue, light, dark }) => ({
  id,
  name,
  swatch: light.primary,
  light: {
    ...light,
    accent: `oklch(0.94 0.035 ${hue})`,
    accentForeground: `oklch(0.45 0.13 ${hue})`,
  },
  dark: {
    ...dark,
    accent: `oklch(0.29 0.055 ${hue})`,
    accentForeground: `oklch(0.82 0.1 ${hue})`,
  },
});

export const COLOR_PRESETS = [
  buildPalette({
    id: "blue",
    name: "Blue",
    hue: 260,
    light: {
      primary: "oklch(0.5 0.17 260)",
      primaryForeground: "oklch(0.98 0.01 260)",
    },
    dark: {
      primary: "oklch(0.68 0.15 255)",
      primaryForeground: "oklch(0.16 0.02 260)",
    },
  }),
  buildPalette({
    id: "violet",
    name: "Violet",
    hue: 295,
    light: {
      primary: "oklch(0.5 0.19 295)",
      primaryForeground: "oklch(0.98 0.01 295)",
    },
    dark: {
      primary: "oklch(0.7 0.15 295)",
      primaryForeground: "oklch(0.16 0.02 295)",
    },
  }),
  buildPalette({
    id: "emerald",
    name: "Emerald",
    hue: 155,
    light: {
      primary: "oklch(0.52 0.13 155)",
      primaryForeground: "oklch(0.98 0.01 155)",
    },
    dark: {
      primary: "oklch(0.7 0.13 155)",
      primaryForeground: "oklch(0.16 0.02 155)",
    },
  }),
  buildPalette({
    id: "rose",
    name: "Rose",
    hue: 350,
    light: {
      primary: "oklch(0.53 0.19 350)",
      primaryForeground: "oklch(0.98 0.01 350)",
    },
    dark: {
      primary: "oklch(0.71 0.16 350)",
      primaryForeground: "oklch(0.16 0.02 350)",
    },
  }),
  buildPalette({
    id: "amber",
    name: "Amber",
    hue: 70,
    light: {
      primary: "oklch(0.67 0.16 70)",
      primaryForeground: "oklch(0.18 0.03 70)",
    },
    dark: {
      primary: "oklch(0.8 0.14 75)",
      primaryForeground: "oklch(0.18 0.03 70)",
    },
  }),
  buildPalette({
    id: "teal",
    name: "Teal",
    hue: 195,
    light: {
      primary: "oklch(0.52 0.11 195)",
      primaryForeground: "oklch(0.98 0.01 195)",
    },
    dark: {
      primary: "oklch(0.71 0.13 195)",
      primaryForeground: "oklch(0.16 0.02 195)",
    },
  }),
  buildPalette({
    id: "indigo",
    name: "Indigo",
    hue: 275,
    light: {
      primary: "oklch(0.48 0.18 275)",
      primaryForeground: "oklch(0.98 0.01 275)",
    },
    dark: {
      primary: "oklch(0.66 0.16 275)",
      primaryForeground: "oklch(0.16 0.02 275)",
    },
  }),
  buildPalette({
    id: "red",
    name: "Red",
    hue: 27,
    light: {
      primary: "oklch(0.53 0.2 27)",
      primaryForeground: "oklch(0.98 0.01 27)",
    },
    dark: {
      primary: "oklch(0.7 0.18 27)",
      primaryForeground: "oklch(0.16 0.02 27)",
    },
  }),
];

export const DEFAULT_COLOR = "blue";
export const COLOR_STORAGE_KEY = "vite-ui-color";
