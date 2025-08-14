import type { ContentBlock } from "../types";
import { Headings } from "./Heading";
import { OrderedList, UnorderedList } from "./List";
import { CodeBlockComponent } from "./CodeBlock";
import { Paragraph } from "./Paragraph";

interface SectionRendererProps {
  section: ContentBlock;
}

export const SectionRenderer = ({ section }: SectionRendererProps) => {
  switch (section.type) {
    case "h1":
      return <Headings level={1} theme="dark" content={section.content} />;
    case "h2":
      return <Headings level={2} theme="dark" content={section.content} />;
    case "h3":
      return <Headings level={3} theme="dark" content={section.content} />;
    case "h4":
      return <Headings level={4} theme="dark" content={section.content} />;
    case "h5":
      return <Headings level={5} theme="dark" content={section.content} />;
    case "h6":
      return <Headings level={6} theme="dark" content={section.content} />;
    case "p":
      return <Paragraph content={section.content} />;
    case "ul":
      return (
        <UnorderedList
          items={section.items ?? []}
          theme={"dark"}
          customTheme={{
            "--list-text-color": "#f7fafc",
            "--list-heading-color": "#63b3ed",
            "--list-separator-color": "#718096",
            "--list-margin-top": "1.5em",
            "--list-margin-bottom": "1.5em",
            "--list-padding-left": "2rem",
            "--list-item-margin": "0.75em",
            "--list-line-height": "1.7",
            "--list-heading-font-weight": "600",
            "--list-separator-margin": "0 0.75em",
          }}
          className={"custom-ul-list"}
          itemClassName={"custom-ul-item"}
          headingClassName={"custom-ul-heading"}
          contentClassName={"custom-ul-content"}
          separatorClassName={"custom-ul-separator"}
        />
      );

    case "ol":
      return (
        <OrderedList
          items={section.items ?? []}
          theme={"dark"}
          customTheme={{
            "--list-text-color": "#fffff",
            "--list-heading-color": "#3182ce",
            "--list-separator-color": "#4a5568",
            "--list-margin-top": "1.25em",
            "--list-margin-bottom": "1.25em",
            "--list-padding-left": "1.875em",
            "--list-item-margin": "0.625em",
            "--list-line-height": "1.6",
            "--list-heading-font-weight": "700",
            "--list-separator-margin": "0 0.5em",
          }}
          className={"custom-ol-list"}
          itemClassName={"custom-ol-item"}
          headingClassName={"custom-ol-heading"}
          contentClassName={"custom-ol-content"}
          separatorClassName={"custom-ol-separator"}
        />
      );

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
