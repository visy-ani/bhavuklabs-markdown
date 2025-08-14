import React from "react";
import { camelCaseToKebab } from "../utils";
import "../styles/Paragraph.css";
import { useParagraphTheme } from "../hooks/useParagraphTheme";
import type { ThemeMode } from "../store/useParagraphThemeStore";

interface ParagraphProps {
  content: string;
  theme?: ThemeMode;
  customTheme?: Record<string, string>;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  content,
  theme,
  customTheme,
  className,
  id,
  style: externalStyle,
}) => {
  const storeTheme = useParagraphTheme();

  const appliedTheme = theme ?? storeTheme.theme;
  const appliedCustomTheme = customTheme ?? storeTheme.customTheme;

  const cssVars = Object.entries(appliedCustomTheme).reduce<
    Record<string, string>
  >((acc, [k, v]) => {
    const name = k.startsWith("--") ? k : `--${camelCaseToKebab(k)}`;
    acc[name] = v;
    return acc;
  }, {});

  const style: React.CSSProperties = { ...cssVars, ...externalStyle };

  return (
    <p
      className={`paragraph${className ? ` ${className}` : ""}`}
      data-theme={appliedTheme}
      style={style}
      id={id}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
