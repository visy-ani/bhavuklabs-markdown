import type { Language } from "prism-react-renderer";
import type { ReactNode } from "react";

export interface CSSObject {
  [key: string]: string;
}

// Component Props
export interface CodeBlockProps {
  filename?: string;
  code: string;
  language?: Language;
  theme?: "light" | "dark";
  showLineNumbers?: boolean;
  showAskAIButton?: boolean;
  askAIIcon?: ReactNode;
  askAITooltipText?: string;
  customTheme?: CSSObject;
  onAskAI?: (payload: { filename?: string; code: string }) => void;
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  theme?: "light" | "dark";
  customLink?: (opts: { slug: string; content: string }) => React.ReactNode;
  customStyles?: Record<string, string>;
  slug?: string;
}

export interface ParagraphProps {
  content: string;
  theme?: "light" | "dark";
  customTheme?: Record<string, string>;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export interface ListProps {
  ordered: boolean;
  items: ListItemNode[];
  theme?: "light" | "dark";
  customTheme?: Record<string, string>;
  className?: string;
}

export interface MarkdownRendererProps {
  nodes: MarkdownNode[];
  theme?: "light" | "dark";
  customTheme?: Record<string, string>;
  onAskAI?: (payload: { filename?: string; code: string }) => void;
}