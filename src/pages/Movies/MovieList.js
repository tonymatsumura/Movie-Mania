import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesTableMovie from "./MoviesTableMovie";
import { json } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  const baseUrl = "https://localhost:44362/api/Movies";

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setMovies(response.data);
    });
  }, []);

  console.log(json.toString(movies));

  // RETURN
  return (
    <div>
      <MoviesTableMovie movies={movies} />
    </div>
  );
}
