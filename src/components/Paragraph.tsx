import React from "react";
import { camelCaseToKebab } from "../utils";
import "../styles/Paragraph.css";

type ThemeMode = "light" | "dark";

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
  theme = "light",
  customTheme = {},
  className,
  id,
  style: externalStyle,
}) => {
  const cssVars = Object.entries(customTheme).reduce<Record<string, string>>(
    (acc, [k, v]) => {
      const name = k.startsWith("--") ? k : `--${camelCaseToKebab(k)}`;
      acc[name] = v;
      return acc;
    },
    {}
  );

  const style: React.CSSProperties = { ...cssVars, ...externalStyle };

  return (
    <p
      className={`paragraph${className ? ` ${className}` : ""}`}
      data-theme={theme}
      style={style}
      id={id}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
