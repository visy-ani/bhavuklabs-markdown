import "../styles/Heading.css";
import { slugify } from "../utils";

interface HeadingProps {
  content: string;
}

export const H1Component = ({ content }: HeadingProps) => (
  <h1 id={slugify(content)} className="h1">
    {content}
  </h1>
);

export const H2Component = ({ content }: HeadingProps) => (
  <h2 id={slugify(content)} className="h2">
    {content}
  </h2>
);

export const H3Component = ({ content }: HeadingProps) => (
  <h3 id={slugify(content)} className="h3">
    {content}
  </h3>
);
