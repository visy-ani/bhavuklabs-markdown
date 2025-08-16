import React from "react";
import { camelCaseToKebab, processInlineMarkdown } from "../utils";
import type { ParagraphProps } from "../types";
import "../styles/Paragraph.css";

export const ParagraphComponent: React.FC<ParagraphProps> = ({
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
  const processedContent = processInlineMarkdown(content);

  return (
    <p
      className={`paragraph${className ? ` ${className}` : ""}`}
      data-theme={theme}
      style={style}
      id={id}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};