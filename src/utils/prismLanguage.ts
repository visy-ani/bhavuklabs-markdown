export const supportedLanguages = new Set([
  "javascript",
  "typescript",
  "python",
  "tsx",
  "jsx",
  "java",
  "c",
  "cpp",
  "bash",
  "json",
]);

export async function loadPrismLanguage(language: string) {
  if (!supportedLanguages.has(language)) {
    return;
  }

  try {
    const mappedLang =
      language === "tsx" || language === "jsx" ? "javascript" : language;

    await import(`prismjs/components/prism-${mappedLang}.js`);
  } catch {
    console.warn(`PrismJS language "${language}" could not be loaded.`);
  }
}
