import "../assets/movie.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieQuery } from "../graphql/MovieQuery";

import { useLazyQuery } from "@apollo/react-hooks";

import { LazyPoster } from "../components/LazyPoster";

import { CastList } from "../components/CastList";

import { ListItem } from "../components/ListItem";

export const MoviePage = () => {
  let { id } = useParams();

  function getDirectors() {
    let { crew } = data.movie.credits;
    let directors = [];

    crew.forEach((crewMember) => {
      if (crewMember.job === "Director") {
        directors.push(crewMember.name);
      }
    });
    return directors.join(", ");
  }

  const [getMovie, { called, loading, data, error }] = useLazyQuery(
    movieQuery,
    {
      variables: { id: Number(id) },
    }
  );

  // Only do the query when the getMovie function is ready
  useEffect(() => {
    getMovie();
  }, [getMovie]);

  // Only do this if data is ready
  useEffect(() => {
    if (loading === false && called) {
      getDirectors();
    }
  }, [loading, called]);

  if (!id) return `Please provide a movie id!`;
  if (called && loading)
    return <h1 className="max-w-6xl mx-auto flex">Loading...</h1>;
  if (!called) return <h1 className="max-w-6xl mx-auto flex">Loading...</h1>;
  if (error) return `Error! ${error}`;

  // MAIN RETURN
  return (
    <div className="flex ">
      <div className="mr-16">
        <LazyPoster
          width={300}
          className="rounded shadow-2xl max-w-none"
          src={data.movie.poster_path}
          alt={data.movie.title}
        />
      </div>
      <div>
        <div className="flex-row mb-1 items-center">
          <div className="inline mr-2 text-5xl font-medium align-middle">
            {data.movie.title}
          </div>
          <div className="inline text-xl text-gray-600 align-middle">
            ({data.movie.release_date.substring(0, 4)})
          </div>
        </div>

        <div className="flex-row mb-4">
          {data.movie.genres.map((genre) => (
            <div
              key={genre.id}
              className="text-sm shadow-md inline bg-gray-600 text-white px-4 py-1 rounded-full mr-2"
            >
              {genre.name}
            </div>
          ))}
        </div>
        <div className="mb-10">
          {getDirectors().length > 0 && (
            <span className="italic">Directed by {getDirectors()} </span>
          )}
        </div>

        <span className="text-gray-500 font-medium mr-2">OVERVIEW </span>
        <div className="mb-6 ">{data.movie.overview}</div>

        <ul className="mb-6 leading-relaxed ">
          {CastList.length > 0 && (
            <li className="mb-6">
              <div className="text-gray-500 font-medium">CAST </div>
              <div className="flex">
                <CastList cast={data.movie.credits.cast} />
              </div>
            </li>
          )}
          <li>
            <span className="text-gray-500 font-medium mr-2">RELEASED</span>
            <span>{data.movie.release_date} </span>
          </li>

          <ListItem item={data.movie.runtime}>
            <span className="text-gray-500 font-medium mr-2">DURATION </span>
            <span>{data.movie.runtime} min.</span>
          </ListItem>

          {getDirectors().length > 0 && (
            <li>
              <span className="text-gray-500 font-medium mr-2">DIRECTION </span>
              <span>{getDirectors()}</span>
            </li>
          )}
          {data.movie.production_countries.length > 0 && (
            <li>
              <span className="text-gray-500 font-medium mr-2">COUNTRIES </span>
              {data.movie.production_countries.map((country) => (
                <span key={country.iso_3166_1}>{country.name}</span>
              ))}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
