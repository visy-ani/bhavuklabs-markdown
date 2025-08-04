import React from "react";
import "../styles/List.css";
import type { ListItem, ListTheme, ListItemComponentProps } from "../types";

export interface ListProps {
  items: ListItem[];
  ordered?: boolean;
  theme?: "light" | "dark";
  customTheme?: ListTheme;
  className?: string;
  itemClassName?: string;
  headingClassName?: string;
  contentClassName?: string;
  separatorClassName?: string;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({
  item,
  isOrdered,
  itemClassName,
  headingClassName,
  contentClassName,
  separatorClassName,
}) => {
  const itemClass = `${isOrdered ? "li-ordered" : "li-unordered"} ${
    itemClassName || ""
  }`.trim();

  if (typeof item === "string") {
    return (
      <li className={itemClass} dangerouslySetInnerHTML={{ __html: item }} />
    );
  }

  if (typeof item === "object" && item.heading) {
    return (
      <li className={itemClass}>
        <div className="flex-wrap">
          <span className={`li-heading ${headingClassName || ""}`.trim()}>
            {item.heading}
          </span>
          <span className={`li-separator ${separatorClassName || ""}`.trim()}>
            :
          </span>
          <div
            className={`li-content ${contentClassName || ""}`.trim()}
            dangerouslySetInnerHTML={{ __html: item.content || "" }}
          />
        </div>
      </li>
    );
  }

  return null;
};

// Main List component
export const List: React.FC<ListProps> = ({
  items,
  ordered = false,
  theme = "dark",
  customTheme,
  className,
  itemClassName,
  headingClassName,
  contentClassName,
  separatorClassName,
}) => {
  const listClass = `${ordered ? "list-ol" : "list-ul"} ${
    className || ""
  }`.trim();
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag
      className={listClass}
      data-theme={theme}
      style={customTheme as React.CSSProperties}
    >
      {items.map((item, index) => (
        <ListItemComponent
          key={index}
          item={item}
          isOrdered={ordered}
          itemClassName={itemClassName}
          headingClassName={headingClassName}
          contentClassName={contentClassName}
          separatorClassName={separatorClassName}
        />
      ))}
    </ListTag>
  );
};

// Convenience components for backward compatibility
export const OrderedList: React.FC<Omit<ListProps, "ordered">> = (props) => (
  <List {...props} ordered />
);

export const UnorderedList: React.FC<Omit<ListProps, "ordered">> = (props) => (
  <List {...props} ordered={false} />
);

// Export default as List
export default List;
