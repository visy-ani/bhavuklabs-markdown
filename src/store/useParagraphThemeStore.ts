import { create } from "zustand";

export type ThemeMode = "light" | "dark";

interface ParagraphThemeState {
  theme: ThemeMode;
  customTheme: Record<string, string>;
  setTheme: (theme: ThemeMode) => void;
  setCustomTheme: (styles: Record<string, string>) => void;
  resetTheme: () => void;
}


export const useParagraphThemeStore = create<ParagraphThemeState>((set) => ({
    theme: "light",
    customTheme: {},
    setTheme: (theme: ThemeMode) => set({ theme }),
    setCustomTheme: (styles: Record<string, string>) => set({ customTheme: styles }),
    resetTheme: () => set({ theme: "light", customTheme: {} }),
}));
