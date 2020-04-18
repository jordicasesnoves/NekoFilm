import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import getMovies from "../services/getMovies";

export default function ListOfMovies({ keyword }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (keyword.length > 0) {
      getMovies({ keyword: keyword }).then((movies) => {
        setMovies(movies);
      });
    }
  }, [keyword]);

  if (typeof movies == "object") {
    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          }}
        >
          {movies.map(({ id, title, release_date, poster_path }) => (
            <Movie
              key={id}
              id={id}
              title={title}
              release_date={release_date}
              poster_path={poster_path}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>No results found for '{keyword}'</h1>
        <h2>Try to search again.</h2>
      </>
    );
  }
}
