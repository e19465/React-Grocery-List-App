import React from "react";
import { FaTrashAlt } from "react-icons/fa";
const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="list-li">
      <div className="input-checkbox-container">
        <input
          className="check-box"
          name="checks"
          type="checkbox"
          checked={item.checked}
          onChange={() => handleCheck(item.id)}
        />
        <label
          style={item.checked ? { textDecoration: "line-through" } : null}
          className="label"
          htmlFor="checks"
          onDoubleClick={() => handleCheck(item.id)}
        >
          {item.name}
        </label>
      </div>
      <FaTrashAlt
        role="button"
        className="delete-btn"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.item}`}
        title="Delete Item"
      />
    </li>
  );
};

export default LineItem;
