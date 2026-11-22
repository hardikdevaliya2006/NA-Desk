import { createContext, useContext, useLayoutEffect, useState } from "react";
import {
  COLOR_PRESETS,
  COLOR_STORAGE_KEY,
  DEFAULT_COLOR,
} from "./colors";

const ColorProviderContext = createContext({
  color: DEFAULT_COLOR,
  palette: COLOR_PRESETS[0],
  setColor: () => {},
});

export function ColorProvider({ children }) {
  const [color, setColorState] = useState(
    () => localStorage.getItem(COLOR_STORAGE_KEY) || DEFAULT_COLOR,
  );

  const palette =
    COLOR_PRESETS.find((preset) => preset.id === color) ?? COLOR_PRESETS[0];

  useLayoutEffect(() => {
    const root = document.documentElement;

    const variables = {
      "--brand-primary-light": palette.light.primary,
      "--brand-primary-foreground-light": palette.light.primaryForeground,
      "--brand-accent-light": palette.light.accent,
      "--brand-accent-foreground-light": palette.light.accentForeground,
      "--brand-primary-dark": palette.dark.primary,
      "--brand-primary-foreground-dark": palette.dark.primaryForeground,
      "--brand-accent-dark": palette.dark.accent,
      "--brand-accent-foreground-dark": palette.dark.accentForeground,
    };

    Object.entries(variables).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    root.dataset.color = palette.id;
  }, [palette]);

  const value = {
    color: palette.id,
    palette,
    setColor: (nextColor) => {
      localStorage.setItem(COLOR_STORAGE_KEY, nextColor);
      setColorState(nextColor);
    },
  };

  return (
    <ColorProviderContext.Provider value={value}>
      {children}
    </ColorProviderContext.Provider>
  );
}

export const useColor = () => {
  const context = useContext(ColorProviderContext);
  if (!context) {
    throw new Error("useColor must be used within ColorProvider");
  }
  return context;
};
