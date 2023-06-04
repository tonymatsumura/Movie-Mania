import React from "react";
import "./SearchResultsList.css";

const SearchResultsList = ({ searchBarResults }) => {
  console.log(JSON.stringify(searchBarResults));
  return (
    <div className="results-list">
      {searchBarResults.map((result, id) => {
        return <div key={id}>{result.title}</div>;
      })}
    </div>
  );
};

export default SearchResultsList;
