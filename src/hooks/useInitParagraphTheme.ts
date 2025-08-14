import { use, useEffect } from "react";
import { useParagraphThemeStore } from "../store/useParagraphThemeStore";
import type { ThemeMode } from "../store/useParagraphThemeStore";

interface InitParagraphThemeProps {
  theme?: ThemeMode;
  customTheme?: Record<string, string>;
}

const useInitParagraphTheme = ({
  theme = "light",
  customTheme = {},
}: InitParagraphThemeProps) => {
  const setTheme = useParagraphThemeStore((state) => state.setTheme);
  const setCustomTheme = useParagraphThemeStore(
    (state) => state.setCustomTheme
  );

  useEffect(() => {
    if (theme) setTheme(theme);
    if (customTheme) setCustomTheme(customTheme);
  }, [theme, customTheme, setTheme, setCustomTheme]);
};

export default useInitParagraphTheme;
