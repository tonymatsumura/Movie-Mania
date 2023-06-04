import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchBarResults, setSearchBarResults }) => {
  const [input, setInput] = useState("");
  const [searchBarOpacity, setSearchBarOpacity] = useState(0);

  const fetchData = async value => {
    const response = await fetch("https://localhost:44362/api/Movies");
    const jsonData = await response.json();

    const results = jsonData.filter(movie => {
      return (
        value &&
        movie &&
        movie.title &&
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    //console.log(results);
    setSearchBarResults(results);

    (results.length > 0) ? setSearchBarOpacity(0.9) : setSearchBarOpacity(0);
  };

  const handleChange = value => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          type="text"
          placeholder="Título do filme..."
          value={input}
          onChange={e => handleChange(e.target.value)}
        />
      </div>
      <div className="searchBar--results" style={{ opacity: searchBarOpacity }}>
        {searchBarResults.map(movie => {
          return <div className="searchBarItem">{movie.title}</div>
        })}
      </div>
    </>
  );
};

export default SearchBar;