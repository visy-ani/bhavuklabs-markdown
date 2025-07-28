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
        />
      );
    default:
      return null;
  }
};
