import React from "react";
import type { ListProps, ListItemNode } from "../types";
import { ParagraphComponent } from "./ParagraphComponent";
import "../styles/List.css";

const ListItemRenderer: React.FC<{
  item: ListItemNode;
  theme?: "light" | "dark";
  customTheme?: Record<string, string>;
}> = ({ item, theme, customTheme }) => {
  return (
    <li className="list-item">
      {item.children.map((child, index) => {
        if (child.type === "paragraph") {
          return (
            <ParagraphComponent
              key={index}
              content={child.content}
              theme={theme}
              customTheme={customTheme}
              className="list-item-content"
            />
          );
        }
        return null;
      })}
    </li>
  );
};

export const ListComponent: React.FC<ListProps> = ({
  ordered,
  items,
  theme = "light",
  customTheme = {},
  className,
}) => {
  const ListTag = ordered ? "ol" : "ul";
  const listClass = `markdown-list ${ordered ? "ordered" : "unordered"} ${
    className || ""
  }`.trim();

  return (
    <ListTag
      className={listClass}
      data-theme={theme}
      style={customTheme as React.CSSProperties}
    >
      {items.map((item, index) => (
        <ListItemRenderer
          key={index}
          item={item}
          theme={theme}
          customTheme={customTheme}
        />
      ))}
    </ListTag>
  );
};