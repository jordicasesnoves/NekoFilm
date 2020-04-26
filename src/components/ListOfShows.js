import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ShowCard from "./ShowCard";

const TV_SHOW_LIST = gql`
  query Shows($name: String!) {
    shows(name: $name) {
      results {
        id
        name
        poster_path
        first_air_date
      }
    }
  }
`;

export default function ListOfShows({ keyword }) {
  // Only do the query when the component is mounted
  useEffect(() => {
    getShows();
  }, []);

  const [
    getShows,
    { called, loading, data, error, stopPolling },
  ] = useLazyQuery(TV_SHOW_LIST, {
    variables: { name: keyword },
  });

  if (keyword === "") {
    return "Please type something";
  }

  if (called && loading) return <h1>Loading...</h1>;
  if (!called) return <h1>Loading...</h1>;
  if (error) return `Error! ${error}`;

  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {data.shows.results.map(({ id, name, first_air_date, poster_path }) => (
          <ShowCard
            key={id}
            id={id}
            name={name}
            first_air_date={first_air_date}
            poster_path={poster_path}
          />
        ))}
      </div>
    </>
  );
}
