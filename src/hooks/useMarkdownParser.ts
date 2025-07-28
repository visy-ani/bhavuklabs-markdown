import { useMemo } from "react";
import type { ContentBlock, ConvertedArticle, ListItem } from "../types";
import { getLanguageLabel, processInlineMarkdown } from "../utils";

const parseMarkdownToSections = (
  text: string
): ConvertedArticle["sections"] => {
  const lines = text.split("\n").filter((line: string) => line.trim());
  const sections: ConvertedArticle["sections"] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    // Handle H1 headings (#)
    if (line.startsWith("# ")) {
      sections.push({
        type: "h1",
        content: line.replace("# ", ""),
        items: [],
        filename: "",
        code: "",
      });
      i++;
    }
    // Handle H2 headings (##)
    else if (line.startsWith("## ")) {
      sections.push({
        type: "h2",
        content: line.replace("## ", ""),
        items: [],
        filename: "",
        code: "",
      });
      i++;
    }
    // Handle H3 headings (###)
    else if (line.startsWith("### ")) {
      sections.push({
        type: "h3",
        content: line.replace("### ", ""),
        items: [],
        filename: "",
        code: "",
      });
      i++;
    }
    // Handle code blocks
    else if (line.startsWith("```")) {
      const language = line.replace("```", "") || "code";
      let codeContent = "";
      i++;

      while (i < lines.length && !lines[i].startsWith("```")) {
        codeContent += (codeContent ? "\n" : "") + lines[i];
        i++;
      }

      sections.push({
        type: "codeBlock",
        content: "",
        items: [],
        filename: getLanguageLabel(language),
        code: codeContent,
      });
      i++; // Skip closing ```
    }
    // Handle numbered lists (ordered lists)
    else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];

      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s/, "");
        items.push(processInlineMarkdown(itemText));
        i++;
      }

      sections.push({
        type: "ol",
        content: "",
        items,
        filename: "",
        code: "",
      });
    }
    // Handle bullet points (unordered lists)
    else if (line.startsWith("- ")) {
      const items: ListItem[] = [];

      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        const itemText = lines[i].trim().replace("- ", "");
        let content = itemText;
        i++;

        // Check for continuation lines (indented or just regular paragraphs)
        while (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !lines[i].startsWith("- ") &&
          !lines[i].startsWith("#") &&
          !lines[i].startsWith("```") &&
          !/^\d+\.\s/.test(lines[i].trim())
        ) {
          content += " " + lines[i].trim();
          i++;
        }

        // Check if the item has bold text at the beginning (like **Heading**: Content)
        const headingMatch = content.match(/^\*\*(.+?)\*\*:\s*(.+)$/);

        if (headingMatch) {
          items.push({
            heading: headingMatch[1].trim(),
            content: processInlineMarkdown(headingMatch[2].trim()),
          });
        } else {
          items.push(processInlineMarkdown(content));
        }
      }

      sections.push({
        type: "ul",
        content: "",
        items,
        filename: "",
        code: "",
      });
    }
    // Handle regular paragraphs
    else if (line && !line.startsWith("#") && !line.startsWith("```")) {
      let paragraphContent = line;
      i++;

      // Collect multi-line paragraphs
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].startsWith("#") &&
        !lines[i].startsWith("```") &&
        !lines[i].startsWith("- ") &&
        !/^\d+\.\s/.test(lines[i].trim())
      ) {
        paragraphContent += " " + lines[i].trim();
        i++;
      }

      sections.push({
        type: "p",
        content: processInlineMarkdown(paragraphContent),
        items: [],
        filename: "",
        code: "",
      });
    } else {
      i++;
    }
  }

  return sections;
};

export default function useMarkdownParser(markdown: string): ContentBlock[] {
  return useMemo(() => parseMarkdownToSections(markdown), [markdown]);
}
