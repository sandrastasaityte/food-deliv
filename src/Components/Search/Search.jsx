import React, { useState, useRef, useEffect } from "react";
import "./Search.css";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <>
      <i className="fas fa-search" onClick={openSearch}></i>

      <div id="search-form" className={isOpen ? "active" : ""}>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            id="search-box"
            ref={inputRef}
            placeholder="Search here..."
          />
          <label htmlFor="search-box" className="fas fa-search"></label>
          <i className="fas fa-times" id="close" onClick={closeSearch}></i>
        </form>
      </div>
    </>
  );
};

export default Search;
