import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ShowCard from "./ShowCard";
import { Link } from "react-router-dom";

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
  const [getShows, { called, loading, data, error }] = useLazyQuery(
    TV_SHOW_LIST,
    {
      variables: { name: keyword },
    }
  );

  // Only do the query when the component is mounted
  useEffect(() => {
    getShows();
  }, [getShows]);

  if (keyword === "") {
    return "Please type something";
  }

  if (called && loading) return <h1>Loading...</h1>;
  if (!called) return <h1>Loading...</h1>;
  if (error) return `Error! ${error}`;

  return (
    <>
      {data.shows.results.map(({ id, name, first_air_date, poster_path }) => (
        <Link key={id} to={`/show/${id}`}>
          <ShowCard
            key={id}
            id={id}
            name={name}
            first_air_date={first_air_date}
            poster_path={poster_path}
          />
        </Link>
      ))}
    </>
  );
}
