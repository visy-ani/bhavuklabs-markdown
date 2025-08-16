import { useMemo } from "react";
import type {
  MarkdownNode,
  HeadingNode,
  ListNode,
  ListItemNode,
  CodeBlockNode,
  ParagraphNode,
} from "../types";

export function useMarkdownParser(markdown: string): MarkdownNode[] {
  return useMemo(() => {
    const normalizedMarkdown = markdown
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n");
    const lines = normalizedMarkdown.split("\n");
    const rootNodes: MarkdownNode[] = [];
    const stack: HeadingNode[] = [];

    function currentParent(): HeadingNode | null {
      return stack.length ? stack[stack.length - 1] : null;
    }

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        i++;
        continue;
      }

      const headingMatch = trimmedLine.match(/^(#{1,6})\s*(.+?)(?:\s*#+\s*)?$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const content = headingMatch[2].trim();
        const node: HeadingNode = {
          type: "heading",
          level,
          content,
          children: [],
        };

        while (stack.length && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          rootNodes.push(node);
        } else {
          stack[stack.length - 1].children.push(node);
        }
        stack.push(node);
        i++;
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line)) {
        const listNode: ListNode = { type: "list", ordered: false, items: [] };

        while (
          i < lines.length &&
          lines[i].trim() &&
          /^\s*[-*+]\s+/.test(lines[i])
        ) {
          const itemText = lines[i].replace(/^\s*[-*+]\s+/, "").trim();
          const itemNode: ListItemNode = {
            type: "listItem",
            children: [{ type: "paragraph", content: itemText }],
          };
          listNode.items.push(itemNode);
          i++;
        }

        const parent = currentParent();
        if (parent) {
          parent.children.push(listNode);
        } else {
          rootNodes.push(listNode);
        }
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        const listNode: ListNode = { type: "list", ordered: true, items: [] };

        while (
          i < lines.length &&
          lines[i].trim() &&
          /^\s*\d+\.\s+/.test(lines[i])
        ) {
          const itemText = lines[i].replace(/^\s*\d+\.\s+/, "").trim();
          const itemNode: ListItemNode = {
            type: "listItem",
            children: [{ type: "paragraph", content: itemText }],
          };
          listNode.items.push(itemNode);
          i++;
        }

        const parent = currentParent();
        if (parent) {
          parent.children.push(listNode);
        } else {
          rootNodes.push(listNode);
        }
        continue;
      }

      if (trimmedLine.startsWith("```")) {
        const language = trimmedLine.slice(3).trim() || "code";
        i++;
        const codeLines: string[] = [];

        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }

        if (i < lines.length) {
          i++;
        }

        const codeNode: CodeBlockNode = {
          type: "codeBlock",
          language,
          content: codeLines.join("\n"),
        };

        const parent = currentParent();
        if (parent) {
          parent.children.push(codeNode);
        } else {
          rootNodes.push(codeNode);
        }
        continue;
      }

      if (
        trimmedLine &&
        !trimmedLine.startsWith("#") &&
        !trimmedLine.match(/^\s*[-*+]\s+/) &&
        !trimmedLine.match(/^\s*\d+\.\s+/) &&
        !trimmedLine.startsWith("```")
      ) {
        const paragraphLines: string[] = [line];
        i++;

        while (i < lines.length) {
          const nextLine = lines[i];
          const nextTrimmed = nextLine.trim();

          if (!nextTrimmed) {
            break;
          }

          if (
            nextTrimmed.startsWith("#") ||
            nextTrimmed.match(/^\s*[-*+]\s+/) ||
            nextTrimmed.match(/^\s*\d+\.\s+/) ||
            nextTrimmed.startsWith("```")
          ) {
            break;
          }

          paragraphLines.push(nextLine);
          i++;
        }

        const content = paragraphLines
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        if (content) {
          const paraNode: ParagraphNode = { type: "paragraph", content };
          const parent = currentParent();
          if (parent) {
            parent.children.push(paraNode);
          } else {
            rootNodes.push(paraNode);
          }
        }
        continue;
      }

      i++;
    }

    return rootNodes;
  }, [markdown]);
}

export default useMarkdownParser;