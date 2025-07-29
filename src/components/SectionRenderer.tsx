import type { ContentBlock } from "../types";
import { H1Component, H2Component, H3Component } from "./Heading";
import { ParagraphComponent } from "./Paragraph";
import { UnorderedListComponent, OrderedListComponent } from "./List";
import { CodeBlockComponent } from "./CodeBlock";

interface SectionRendererProps {
  section: ContentBlock;
}

export const SectionRenderer = ({ section }: SectionRendererProps) => {
  switch (section.type) {
    case "h1":
      return <H1Component content={section.content} />;
    case "h2":
      return <H2Component content={section.content} />;
    case "h3":
      return <H3Component content={section.content} />;
    case "p":
      return <ParagraphComponent content={section.content} />;
    case "ul":
      return <UnorderedListComponent items={section.items ?? []} />;
    case "ol":
      return <OrderedListComponent items={section.items ?? []} />;
    case "codeBlock":
      return (
        <CodeBlockComponent
          filename={section.filename ?? ""}
          code={section.code ?? ""}
          theme="dark"
          showLineNumbers
          showAskAIButton
          askAITooltipText="Custom AI question"
          customTheme={{
            "--cb-bg": "#222831",
            "--cb-header-bg": "#393e46",
            "--cb-border": "#00adb5",
            "--cb-filename": "#00adb5",
            "--cb-copy": "#eeeeee",
            "--cb-pre-color": "#eeeeee",
            "--cb-line-number": "#00adb5",
          }}
          onAskAI={(payload) => {
            console.log("Ask AI clicked for:", payload);
          }}
        />
      );
    default:
      return null;
  }
};
