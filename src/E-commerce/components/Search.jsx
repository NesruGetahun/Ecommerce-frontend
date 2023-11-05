import React, { useState, useRef, useEffect, useCallback } from "react";

import "./Search.scss";
function Search({ searchData, Type }) {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = useCallback(
    (data) => {
      if (data) searchData(data);
      else searchData(search);

      console.log("search: " + search);
    },
    [search, searchData]
  );

  useEffect(() => {
    if (search === "") handleSearch("All");
    else handleSearch();
  }, [search, handleSearch]);

  const searchRef = useRef(null);
  return (
    <div className="search">
      <div className={showSearch ? "search-field show" : "search-field"}>
        <input
          type="text"
          ref={searchRef}
          value={search}
          placeholder="search products..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {/* <button
          onClick={(e) => {
            handleSearch();
          }}
        >
          Search
        </button> */}
      </div>
      <div className="search-icon">
        {!showSearch ? (
          <p
            onClick={(e) => {
              setShowSearch((prev) => !prev);
              searchRef.current.focus();
            }}
          >
            🔎
          </p>
        ) : (
          <p
            onClick={(e) => {
              handleSearch("All");
              setSearch("");
              setShowSearch((prev) => !prev);
            }}
          >
            ❌
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
