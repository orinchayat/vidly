import { map } from "lodash";
import React from "react";

const ListGroup = ({
  items,
  onItemSelect,
  valuePropert,
  textPropert,
  selectedItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valuePropert]}
          style={{ cursor: "pointer" }}
          onClick={() => {
            onItemSelect(item);
          }}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textPropert]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textPropert: "name",
  valuePropert: "_id",
};
export default ListGroup;
