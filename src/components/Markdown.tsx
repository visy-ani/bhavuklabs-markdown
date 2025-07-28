import { SectionRenderer } from "./SectionRenderer";
import "../styles/Markdown.css";
import type { ContentBlock } from "../types";

interface MarkdownProps {
  data: ContentBlock[];
}

const Markdown = ({ data }: MarkdownProps) => {
  if (!data || data.length === 0) {
    return <div className="noContent">No content available</div>;
  }

  return (
    <div className="articleContent" data-docs="true">
      {data.map((section, index) => (
        <SectionRenderer
          key={section.key ?? `${section.type}-${index}`}
          section={section}
        />
      ))}
    </div>
  );
};

export default Markdown;
