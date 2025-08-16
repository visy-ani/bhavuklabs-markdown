export { default as MarkdownRenderer } from "./components/MarkdownRenderer";
export { MarkdownRenderer as Markdown } from "./components/MarkdownRenderer";
export { default as useMarkdownParser } from "./hooks/useMarkdownParser";
export { HeadingComponent as Heading } from "./components/HeadingComponent";
export { ParagraphComponent as Paragraph } from "./components/ParagraphComponent";
export { ListComponent as List } from "./components/ListComponent";
export { CodeBlockComponent as CodeBlock } from "./components/CodeBlockComponent";

// Hooks
export * from "./hooks";

// Utils
export * from "./utils";

// Types
export type {
  MarkdownNode,
  HeadingNode,
  ParagraphNode,
  ListNode,
  ListItemNode,
  CodeBlockNode,
  MarkdownRendererProps,
  HeadingProps,
  ParagraphProps,
  ListProps,
  CodeBlockProps,
} from "./types";

// Legacy exports for backward compatibility
export type {
  ArticleData,
  ContentBlock,
  ConvertedArticle,
  ListItem,
  ListItemWithHeading,
  ContentBlockBase,
} from "./types";

// Legacy components
export { default as Markdown as LegacyMarkdown } from "./components/Markdown";
export { Headings } from "./components/Heading";
export { OrderedList, UnorderedList } from "./components/List";
