import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";
import { TvshowListTrendingQuery } from "../graphql/TvshowListTrendingQuery";
import ShowCard from "./ShowCard";

export default function ListOfTrendingShows({ keyword }) {
  const [getShows, { called, loading, error, data }] = useLazyQuery(
    TvshowListTrendingQuery
  );
  // Once the component is mounted, do the graphql query
  useEffect(() => {
    getShows();
  }, [getShows]);

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
      {data.showsTrending.results.map(
        ({ id, name, first_air_date, poster_path }) => (
          <Link key={id} to={`/show/${id}`}>
            <ShowCard
              key={id}
              id={id}
              name={name}
              first_air_date={first_air_date}
              poster_path={poster_path}
            />
          </Link>
        )
      )}
    </>
  );
}
