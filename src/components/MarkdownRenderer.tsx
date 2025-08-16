import React from "react";
import type { MarkdownNode, MarkdownRendererProps } from "../types";
import { HeadingComponent } from "./HeadingComponent";
import { ParagraphComponent } from "./ParagraphComponent";
import { ListComponent } from "./ListComponent";
import { CodeBlockComponent } from "./CodeBlockComponent";
import "../styles/MarkdownRenderer.css";

const NodeRenderer: React.FC<{
  node: MarkdownNode;
  theme?: "light" | "dark";
  customTheme?: Record<string, string>;
  onAskAI?: (payload: { filename?: string; code: string }) => void;
}> = ({ node, theme = "light", customTheme, onAskAI }) => {
  switch (node.type) {
    case "heading":
      return (
        <div className="heading-section">
          <HeadingComponent
            level={node.level as 1 | 2 | 3 | 4 | 5 | 6}
            content={node.content}
            theme={theme}
            customStyles={customTheme}
          />
          {node.children.length > 0 && (
            <div className="heading-children">
              {node.children.map((child, index) => (
                <NodeRenderer
                  key={index}
                  node={child}
                  theme={theme}
                  customTheme={customTheme}
                  onAskAI={onAskAI}
                />
              ))}
            </div>
          )}
        </div>
      );

    case "paragraph":
      return (
        <ParagraphComponent
          content={node.content}
          theme={theme}
          customTheme={customTheme}
        />
      );

    case "list":
      return (
        <ListComponent
          ordered={node.ordered}
          items={node.items}
          theme={theme}
          customTheme={customTheme}
        />
      );

    case "codeBlock":
      return (
        <CodeBlockComponent
          filename={node.language}
          code={node.content}
          language={node.language as any}
          theme={theme}
          showLineNumbers
          showAskAIButton={!!onAskAI}
          customTheme={customTheme}
          onAskAI={onAskAI}
        />
      );

    default:
      return null;
  }
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  nodes,
  theme = "light",
  customTheme,
  onAskAI,
}) => {
  if (!nodes || nodes.length === 0) {
    return <div className="no-content">No content available</div>;
  }

  return (
    <div className="markdown-renderer" data-theme={theme}>
      {nodes.map((node, index) => (
        <NodeRenderer
          key={index}
          node={node}
          theme={theme}
          customTheme={customTheme}
          onAskAI={onAskAI}
        />
      ))}
    </div>
  );
};

export default MarkdownRenderer;