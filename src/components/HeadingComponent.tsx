import React from "react";
import { slugify, camelCaseToKebab } from "../utils";
import type { HeadingProps } from "../types";
import "../styles/Heading.css";

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

export const HeadingComponent: React.FC<HeadingProps> = ({
  level = 1,
  content,
  theme = "light",
  customLink,
  customStyles = {},
  slug,
  ...rest
}) => {
  const Tag = `h${level}` as const;
  const headingSlug = slug ?? slugify(content);

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

  return React.createElement(
    Tag,
    {
      id: headingSlug,
      style: baseStyle,
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
            aria-label="Link to this heading"
            className="heading-anchor"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </a>
        ))}
    </>
  );
};