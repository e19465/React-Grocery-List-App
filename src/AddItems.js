import React from "react";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
const AddItems = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          className="add-form-input"
          type="text"
          ref={inputRef}
          required
          placeholder="Add item..."
          value={newItem}
          autoFocus
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          className="add-item-btn-container"
          type="submit"
          aria-label="Add new Item"
          title="Add new item"
          onClick={() => inputRef.current.focus()}
        >
          <FaPlus className="form-add-btn" />
        </button>
      </form>
    </div>
  );
};

export default AddItems;
