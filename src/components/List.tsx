import type { ListItem } from "../types";
import "../styles/List.css";

interface ListItemComponentProps {
  item: ListItem;
  isOrdered?: boolean;
}

const ListItemComponent = ({
  item,
  isOrdered = false,
}: ListItemComponentProps) => {
  const itemClassName = isOrdered ? "li" : "liUl";

  if (typeof item === "string") {
    return (
      <li
        className="itemClassName"
        dangerouslySetInnerHTML={{ __html: item }}
      />
    );
  }

  if ("heading" in item) {
    return (
      <li className={itemClassName}>
        <div className="flexWrap">
          <span className="liHeading">{item.heading}</span>
          <span className="liSeparator">:</span>
          <div
            className="liContent"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </li>
    );
  }

  return null;
};

interface OrderedListProps {
  items: ListItem[];
}

export const OrderedListComponent = ({ items }: OrderedListProps) => (
  <ol className="ol">
    {items.map((item, index) => (
      <ListItemComponent key={index} item={item} isOrdered />
    ))}
  </ol>
);

interface UnorderedListProps {
  items: ListItem[];
}

export const UnorderedListComponent = ({ items }: UnorderedListProps) => (
  <ul className="ul">
    {items.map((item, index) => (
      <ListItemComponent key={index} item={item} />
    ))}
  </ul>
);
