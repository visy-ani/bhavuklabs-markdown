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