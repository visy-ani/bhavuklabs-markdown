import type { Language } from "prism-react-renderer";
import type { ReactNode } from "react";

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

export interface CSSObject {
  [key: string]: string;
}

// Component Types
export interface CodeBlockProps {
  filename: string;
  code: string;
  language?: Language;
  theme?: "light" | "dark";
  showLineNumbers?: boolean;
  showAskAIButton?: boolean;
  askAIIcon?: ReactNode;
  askAITooltipText?: string;
  customTheme?: CSSObject;
  onAskAI?: (payload: { filename: string; code: string }) => void;
}

export interface HeadingsProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  theme?: "light" | "dark";
  customLink?: (opts: { slug: string; content: string }) => React.ReactNode;
  customStyles?: Record<string, string>;
  slug?: string;
}

// List component
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

// new parser types
export type MarkdownNode =
  | HeadingNode
  | ParagraphNode
  | ListNode
  | ListItemNode
  | CodeBlockNode;

export interface HeadingNode {
  type: "heading";
  level: number;
  content: string;
  children: MarkdownNode[];
}

export interface ParagraphNode {
  type: "paragraph";
  content: string;
}

export interface ListNode {
  type: "list";
  ordered: boolean;
  items: ListItemNode[];
}

export interface ListItemNode {
  type: "listItem";
  children: MarkdownNode[];
}

export interface CodeBlockNode {
  type: "codeBlock";
  language: string;
  content: string;
}
