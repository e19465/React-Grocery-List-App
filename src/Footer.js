import React from "react";

const Footer = ({ items }) => {
  return (
    <footer className="footer">
      <h4>
        {" "}
        {items.length === 0
          ? "List Is  Empty"
          : items.length > 1
          ? `${items.length} List Items`
          : `${items.length} List Item`}
      </h4>
    </footer>
  );
};

export default Footer;
