import React from "react";

import { LazyPoster } from "../components/LazyPoster";
import { CastList } from "../components/CastList";
import { useMediaData } from "../hooks/useMediaData";
import { getCountryName } from "../utils/getCountryName";
import { useModal } from "../hooks/useModal";
import { Button } from "../components/Button";
import { TrailerModal } from "../components/TrailerModal";

export const TVShowPage = () => {
  // Custom hook for displaying the trailer modal
  const { isShowing, toggle } = useModal();

  const [id, trailer, direction, called, loading, data, error] = useMediaData(
    "show"
  );

  if (!id) return `Please provide a movie id!`;
  if (called && loading) return <h1 className="text-3xl">Loading...</h1>;
  if (!called) return <h1 className="text-3xl">Loading...</h1>;
  if (error) return `Error! ${error}`;

  return (
    <div className="flex">
      <div className="animated fadeIn sticky top-0 self-start pt-8 mr-16">
        <LazyPoster
          width={300}
          className="rounded shadow max-w-none mb-4"
          src={data.show.poster_path}
          alt={data.show.name}
        />
        {trailer.key && (
          <div style={{ width: "300px" }}>
            <Button
              fullWidth
              className="flex items-center justify-center text-center"
              color="red"
              target="_blank"
              onClick={toggle}
            >
              <svg
                className="w-5 inline mr-3"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z"
                />
              </svg>
              <span>Watch Trailer</span>
            </Button>
          </div>
        )}
        <TrailerModal
          isShowing={isShowing}
          hide={toggle}
          trailerURL={trailer.key}
        />
      </div>
      <div className="animated fadeIn flex-1 pt-8">
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
                <span key={creator.id}>{creator.name}</span>
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
          <li>
            <span className="text-gray-500 font-medium mr-2">CREATED BY </span>
            <span>
              {data.show.created_by.length > 0 && (
                <span className="italic">
                  {data.show.created_by.map((creator) => (
                    <span key={creator.id}>{creator.name} </span>
                  ))}
                </span>
              )}
            </span>
          </li>

          <li>
            <span className="text-gray-500 font-medium mr-2">
              ORIGIN COUNTRIES
            </span>
            <span>
              {data.show.origin_country.length > 0 && (
                <span>
                  {data.show.origin_country.map((country) => (
                    <span key={country}>{getCountryName(country)} </span>
                  ))}
                </span>
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
