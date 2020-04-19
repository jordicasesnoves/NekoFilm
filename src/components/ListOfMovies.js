import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import getMovies from "../services/getMovies";

function useMoviesData(keyword) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (keyword.length > 0) {
      getMovies({ keyword: keyword }).then((movies) => {
        setMovies(movies);
        setLoading(false);
      });
    }
  }, [keyword]);

  return { movies, loading };
}

export default function ListOfMovies({ keyword }) {
  const { movies, loading } = useMoviesData(keyword);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    if (typeof movies == "object") {
      return (
        <>
          <div className="grid  grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {movies.map(({ id, title, release_date, poster_path }) => (
              <MovieCard
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
}
