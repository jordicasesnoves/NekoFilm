import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import MovieCard from "./MovieCard";
import { movieListTrendingQuery } from "../graphql/MovieListTrendingQuery";

export default function ListOfTrendingMovies({ keyword }) {
  const [getMovies, { called, loading, error, data }] = useLazyQuery(
    movieListTrendingQuery
  );
  // Once the component is mounted, do the graphql query
  useEffect(() => {
    getMovies();
  }, [getMovies]);

  // Empty State
  if (keyword === "") {
    return "Please type something";
  }

  if (called && loading) return <h1>Loading...</h1>;

  // If the graphql's query is not called, the component is still mounting
  if (!called) return <h1>Loading...</h1>;

  if (error) return `Error! ${error}`;
  return (
    <>
      {data.moviesTrending.results.map(
        ({ id, title, release_date, poster_path }) => (
          <Link key={id} to={`/movie/${id}`}>
            <MovieCard
              id={id}
              title={title}
              release_date={release_date}
              poster_path={poster_path}
            />
          </Link>
        )
      )}
    </>
  );
}
