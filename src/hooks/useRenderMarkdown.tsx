import React from "react";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import type { MarkdownNode } from "../types";

export function useRenderMarkdown(
  nodes: MarkdownNode[],
  theme?: "light" | "dark",
  customTheme?: Record<string, string>,
  onAskAI?: (payload: { filename?: string; code: string }) => void
) {
  return React.useMemo(() => {
    return (
      <MarkdownRenderer
        nodes={nodes}
        theme={theme}
        customTheme={customTheme}
        onAskAI={onAskAI}
      />
    );
  }, [nodes, theme, customTheme, onAskAI]);
}
