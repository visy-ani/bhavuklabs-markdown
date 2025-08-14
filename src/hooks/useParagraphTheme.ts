import { useParagraphThemeStore } from "../store/useParagraphThemeStore";

export const useParagraphTheme = () => {
  const { theme, customTheme, setTheme, setCustomTheme, resetTheme } =
    useParagraphThemeStore();

  return {
    theme,
    customTheme,
    setTheme,
    setCustomTheme,
    resetTheme,
  };
};
