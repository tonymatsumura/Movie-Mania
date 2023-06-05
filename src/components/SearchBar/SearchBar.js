import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchBarResults, setSearchBarResults }) => {
  const [input, setInput] = useState("");
  const [searchBarOpacity, setSearchBarOpacity] = useState(0);

  const fetchData = async value => {
    const response = await fetch("https://sheetdb.io/api/v1/98d2ot9ejgwew");
    const jsonData = await response.json();

    console.log("jsonData: " + JSON.stringify(jsonData))
    const results = jsonData.filter(movie => {
      console.log("movie.title: " + JSON.stringify(movie.Title))
      return (
        value &&
        movie &&
        movie.Title &&
        movie.Title.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(results);
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
          return <div className="searchBarItem">{movie.Title}</div>
        })}
      </div>
    </>
  );
};

export default SearchBar;