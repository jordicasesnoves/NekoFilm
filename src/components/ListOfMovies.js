import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import MovieCard from "./MovieCard";

const MOVIE_LIST = gql`
  query Movies($title: String!) {
    movies(title: $title) {
      results {
        id
        title
        poster_path
        release_date
      }
    }
  }
`;

export default function ListOfMovies({ keyword }) {
  // Once the component is mounted, do the graphql query
  useEffect(() => {
    getMovies();
  }, []);

  const [getMovies, { called, loading, error, data }] = useLazyQuery(
    MOVIE_LIST,
    {
      variables: { title: keyword },
    }
  );

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
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {data.movies.results.map(({ id, title, release_date, poster_path }) => (
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
}
