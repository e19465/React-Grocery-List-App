import React from "react";

const SearchItem = ({ search, setSearch }) => {
  return (
    <div className="search-item-container">
      <form className="search-form">
        <input
          className="search-form-input"
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchItem;
