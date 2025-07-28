import React from "react";
import { SectionRenderer } from "../components/SectionRenderer";
import type { ContentBlock } from "../types";

export function useRenderMarkdown(sections: ContentBlock[]) {
  return React.useMemo(() => {
    return sections.map((section, index) => (
      <SectionRenderer
        key={section.key ?? `${section.type}-${index}`}
        section={section}
      />
    ));
  }, [sections]);
}
