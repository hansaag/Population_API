import React, { useState } from "react";

function Searchbar({ submitSearch }) {
  const [tempSearchTerm, setTempSearchTerm] = useState("");

  const updateSearchWord = (e) => {
    e.preventDefault();
    setTempSearchTerm(e.target.value);
    if (e.target.value === "") submitSearchWord(e, false);
  };

  const submitSearchWord = (e, value) => {
    e.preventDefault();
    if (value) submitSearch(tempSearchTerm);
    else submitSearch(""); //in case user ctrl+backspaces the input
  };

  return (
    <form className="search-form">
      <input
        id="search-field"
        placeholder="Country"
        onChange={(e) => updateSearchWord(e)}
      />
      <button id="search-button" onClick={(e) => submitSearchWord(e, true)}>
        Search
      </button>
    </form>
  );
}

export default Searchbar;
