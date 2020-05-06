import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLazyQuery } from "@apollo/react-hooks";
import { LazyPoster } from "../components/LazyPoster";
import { tvshowQuery } from "../graphql/TvshowQuery";
import { CastList } from "../components/CastList";

export const TVShowPage = () => {
  let { id } = useParams();

  const [getShow, { called, loading, data, error }] = useLazyQuery(
    tvshowQuery,
    {
      variables: { id: Number(id) },
    }
  );

  // Only do the query when the getMovie function is ready
  useEffect(() => {
    getShow();
  }, [getShow]);

  // Only do this if data is ready
  useEffect(() => {
    if (loading === false && called) {
    }
  }, [loading]);

  if (!id) return `Please provide a movie id!`;
  if (called && loading) return <h1 className="text-3xl">Loading...</h1>;
  if (!called) return <h1 className="text-3xl">Loading...</h1>;
  if (error) return `Error! ${error}`;

  return (
    <>
      <div className="mr-16 animated fadeIn">
        <LazyPoster
          width={300}
          className="rounded shadow-2xl max-w-none"
          src={data.show.poster_path}
          alt={data.show.name}
        />
      </div>
      <div className="animated fadeIn">
        <div className="flex-row mb-1 items-center">
          <div className="inline mr-2 text-5xl font-medium align-middle">
            {data.show.name}
          </div>
          <div className="inline text-xl text-gray-600 align-middle">
            ({data.show.first_air_date.substring(0, 4)})
          </div>
        </div>

        <div className="flex-row mb-4">
          {data.show.genres.map((genre) => (
            <div
              key={genre.id}
              className="text-sm shadow-md inline bg-gray-600 text-white px-4 py-1 rounded-full mr-2"
            >
              {genre.name}
            </div>
          ))}
        </div>
        <div className="mb-10">
          {data.show.created_by.length > 0 && (
            <span className="italic">
              Created by{" "}
              {data.show.created_by.map((creator) => (
                <span>{creator.name} </span>
              ))}
            </span>
          )}
        </div>

        <span className="text-gray-500 font-medium mr-2">OVERVIEW </span>
        <div className="mb-6 ">{data.show.overview}</div>

        <ul className="mb-6 leading-relaxed ">
          {CastList.length > 0 && (
            <li className="mb-6">
              <div className="text-gray-500 font-medium">CAST </div>
              <div className="flex">
                <CastList cast={data.show.credits.cast} />
              </div>
            </li>
          )}
          <li>
            <span className="text-gray-500 font-medium mr-2">SEASONS </span>
            <span>{data.show.number_of_seasons} </span>
          </li>
          <li>
            <span className="text-gray-500 font-medium mr-2">CREATED BY </span>
            <span>
              {data.show.created_by.length > 0 && (
                <span className="italic">
                  {data.show.created_by.map((creator) => (
                    <span>{creator.name} </span>
                  ))}
                </span>
              )}
            </span>
          </li>
          <li>
            <span className="text-gray-500 font-medium mr-2">
              LAST AIR DATE{" "}
            </span>
            <span>{data.show.last_air_date} </span>
          </li>
          <li>
            <span className="text-gray-500 font-medium mr-2">
              FIRST AIR DATE{" "}
            </span>
            <span>{data.show.first_air_date} </span>
          </li>
        </ul>
      </div>
    </>
  );
};
