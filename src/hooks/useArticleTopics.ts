import { useMemo } from "react";
import type { MarkdownNode, HeadingNode } from "../types";
import { slugify } from "../utils";

interface Topic {
  id: string;
  content: string;
  level: number;
}

function extractHeadings(nodes: MarkdownNode[]): Topic[] {
  const topics: Topic[] = [];

  function traverse(node: MarkdownNode) {
    if (node.type === "heading") {
      const headingNode = node as HeadingNode;
      if (headingNode.level <= 3) {
        topics.push({
          id: slugify(headingNode.content),
          content: headingNode.content,
          level: headingNode.level,
        });
      }
      headingNode.children.forEach(traverse);
    }
  }

  nodes.forEach(traverse);
  return topics;
}

export function useArticleTopics(nodes: MarkdownNode[]): Topic[] {
  return useMemo(() => extractHeadings(nodes), [nodes]);
}
