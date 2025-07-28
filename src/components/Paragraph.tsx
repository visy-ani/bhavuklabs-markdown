import "../styles/Paragraph.css";

interface ParagraphProps {
  content: string;
}

export const ParagraphComponent = ({ content }: ParagraphProps) => (
  <p className="p" dangerouslySetInnerHTML={{ __html: content }} />
);
