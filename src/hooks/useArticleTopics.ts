import { useMemo } from "react";
import type { ContentBlock } from "../types";
import { slugify } from "../utils";

interface Topic {
  id: string;
  content: string;
  level: number;
}

export function useArticleTopics(sections: ContentBlock[]): Topic[] {
  return useMemo(() => {
    const topics: Topic[] = [];
    sections.forEach((section) => {
      if (
        section.type === "h1" ||
        section.type === "h2" ||
        section.type === "h3"
      ) {
        topics.push({
          id: slugify(section.content),
          content: section.content,
          level: +section.type.slice(1),
        });
      }
    });
    return topics;
  }, [sections]);
}
