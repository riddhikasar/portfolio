export const colors = {
  light: {
    bg: "#ffffff",
    fg: "#000000",
    accent: "#1eb81b",
    activePill: "#9df39b",
    bit: "#1eb81b",
    border: "0.8px solid black",
    mutedBorder: "rgba(0,0,0,0.14)",
  },
  dark: {
    bg: "#000000",
    fg: "#ffffff",
    accent: "#ffea00",
    activePill: "#ffea00",
    bit: "#ffea00",
    border: "0.8px solid white",
    mutedBorder: "rgba(255,255,255,0.18)",
  },
} as const;

export type ThemeMode = keyof typeof colors;

export function getTheme(dark: boolean) {
  return dark ? colors.dark : colors.light;
}
