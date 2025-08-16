export * from "./markdown";
export * from "./components";

// Legacy types for backward compatibility
export interface ArticleData {
  subTopicName: string;
  finalRenderableText: string;
  finalContext?: string;
  finalSummary?: string;
  contributingCitationUrls?: string[];
}

export interface ListItemWithHeading {
  heading: string;
  content: string;
}

export type ListItem = string | ListItemWithHeading;

export interface ContentBlockBase {
  type: string;
  key?: string;
}

export interface HeadingBlock extends ContentBlockBase {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  content: string;
}

export interface ParagraphBlock extends ContentBlockBase {
  type: "p";
  content: string;
}

export interface ListBlock extends ContentBlockBase {
  type: "ul" | "ol";
  items: ListItem[];
}

export interface CodeBlock extends ContentBlockBase {
  type: "codeBlock";
  filename?: string;
  code: string;
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | CodeBlock;

export interface ConvertedArticle {
  sections: Array<{
    type: "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "codeBlock";
    content: string;
    items: ListItem[];
    filename: string;
    code: string;
  }>;
}

// Re-export component props with new names for clarity
export type { HeadingProps as HeadingsProps } from "./components";
export interface ListTheme {
  "--list-text-color"?: string;
  "--list-heading-color"?: string;
  "--list-separator-color"?: string;
  "--list-margin-top"?: string;
  "--list-margin-bottom"?: string;
  "--list-padding-left"?: string;
  "--list-item-margin"?: string;
  "--list-line-height"?: string;
  "--list-heading-font-weight"?: string;
  "--list-separator-margin"?: string;
}

export interface ListItemComponentProps {
  item: ListItem;
  isOrdered: boolean;
  itemClassName?: string;
  headingClassName?: string;
  contentClassName?: string;
  separatorClassName?: string;
}