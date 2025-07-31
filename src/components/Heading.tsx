import React from "react";
import { defaultSlugify, camelCaseToKebab } from "../utils";
import type { HeadingsProps } from "../types";

const getColorValue = (
  customStyles: Record<string, string>,
  customVar: string,
  themeVarBase: string,
  fallback: string,
  theme: "light" | "dark"
) => {
  if (customStyles && customStyles[customVar]) {
    return `var(${customVar})`;
  }
  const themeCssVar =
    theme === "light" ? `${themeVarBase}-light` : `${themeVarBase}-dark`;
  return `var(${themeCssVar}, ${fallback})`;
};

const defaultFontSizes: Record<number, string> = {
  1: "2.5rem",
  2: "2rem",
  3: "1.5rem",
  4: "1.2rem",
  5: "1rem",
  6: "0.86rem",
};

export const Headings: React.FC<HeadingsProps> = ({
  level = 1,
  content,
  theme = "light",
  customLink,
  customStyles = {},
  slug,
  ...rest
}) => {
  const Tag = `h${level}` as const;
  const headingSlug = slug ?? defaultSlugify(content);

  const cssVariables = Object.entries(customStyles).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    const varName = key.startsWith("--") ? key : `--${camelCaseToKebab(key)}`;
    acc[varName] = value;
    return acc;
  }, {});

  const baseStyle: React.CSSProperties = {
    color: getColorValue(
      customStyles,
      "--custom-heading-color",
      "--heading-color",
      theme === "light" ? "#000" : "#fff",
      theme
    ),
    fontWeight: "var(--heading-font-weight, 700)",
    marginTop: "var(--heading-margin-top, 1.4em)",
    marginBottom: "var(--heading-margin-bottom, 0.7em)",
    fontSize: `var(--heading-font-size, ${defaultFontSizes[level]})`,
    scrollMarginTop: "var(--heading-scroll-margin-top, 4em)",
    position: "relative",
    ...cssVariables,
  };

  const anchorStyle: React.CSSProperties = {
    marginLeft: "var(--anchor-margin-left, 0.5em)",
    color: getColorValue(
      customStyles,
      "--custom-anchor-color",
      "--anchor-color",
      theme === "light" ? "#555" : "#aaa",
      theme
    ),
    fontSize: "var(--anchor-font-size, 0.85em)",
    textDecoration: "none",
    verticalAlign: "middle",
    opacity: 0,
    transition: "opacity 0.2s, color 0.2s",
    visibility: "hidden",
  };

  const showAnchor = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const anchor = e.currentTarget.querySelector(
      "a.heading-anchor"
    ) as HTMLElement | null;
    if (anchor) {
      anchor.style.opacity = "1";
      anchor.style.visibility = "visible";
    }
  };

  const hideAnchor = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const anchor = e.currentTarget.querySelector(
      "a.heading-anchor"
    ) as HTMLElement | null;
    if (anchor) {
      anchor.style.opacity = "0";
      anchor.style.visibility = "hidden";
    }
  };

  return React.createElement(
    Tag,
    {
      id: headingSlug,
      style: baseStyle,
      onMouseEnter: showAnchor,
      onMouseLeave: hideAnchor,
      ...rest,
    },
    <>
      {content}
      {headingSlug &&
        (customLink ? (
          customLink({ slug: headingSlug, content })
        ) : (
          <a
            href={`#${headingSlug}`}
            aria-label={`Link to this heading`}
            className="heading-anchor"
            style={anchorStyle}
          >
            🔗
          </a>
        ))}
    </>
  );
};
