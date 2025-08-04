export const LANGUAGE_MAP: { [key: string]: string } = {
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  python: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  sql: "SQL",
  bash: "Terminal",
  sh: "Terminal",
  json: "JSON",
  xml: "XML",
  yaml: "YAML",
  yml: "YAML",
};

export const getLanguageLabel = (language: string): string => {
  return LANGUAGE_MAP[language.toLowerCase()] || language || "Code";
};

export const processInlineMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
};

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export const camelCaseToKebab = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export const extractCourseId = (): string | null => {
  const location = window.location; // fallback if no react hook usage
  const pathSegments = location.pathname.split("/");

  const articleIndex = pathSegments.findIndex(
    (segment) => segment === "article"
  );
  if (articleIndex !== -1 && articleIndex + 1 < pathSegments.length) {
    return pathSegments[articleIndex + 1];
  }
  return null;
};
