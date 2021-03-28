import React from 'react';
import './SearchBar.css';

const SearchBar = ({keyword, setKeyword}) => {
  return (
    <input
      className="search-bar"
      key="random1"
      value={keyword}
      placeholder={"Search"}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar