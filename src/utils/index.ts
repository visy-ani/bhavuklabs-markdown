export * from "./markdown";
export * from "./language";

export const extractCourseId = (): string | null => {
  const location = window.location;
  const pathSegments = location.pathname.split("/");

  const articleIndex = pathSegments.findIndex(
    (segment) => segment === "article"
  );
  if (articleIndex !== -1 && articleIndex + 1 < pathSegments.length) {
    return pathSegments[articleIndex + 1];
  }
  return null;
};