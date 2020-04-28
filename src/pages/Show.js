import "../assets/movie.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import emptyPoster from "../assets/empty_poster.png";
import ProgressiveImage from "react-progressive-image-loading";

export const Show = () => {
  let { id } = useParams();

  const SHOW_QUERY = gql`
    query Show($id: Int!) {
      show(id: $id) {
        id
        name
        created_by {
          id
          name
        }
        poster_path
        backdrop_path
        first_air_date
        last_air_date
        number_of_seasons
        overview
        vote_average
        genres {
          id
          name
        }
        credits {
          cast {
            id
            name
            character
            profile_path
          }
        }
      }
    }
  `;

  function getMainCast() {
    let { cast } = data.show.credits;
    let mainActors = cast.slice(0, 6);

    return mainActors.map((castMember, index) => (
      <div className="w-24 mr-2" key={castMember.id}>
        <ProgressiveImage
          transitionTime={500}
          transitionFunction="ease"
          className="inline w-24 rounded shadow "
          src={
            castMember.profile_path == null
              ? emptyPoster
              : `https://image.tmdb.org/t/p/w400${castMember.profile_path}`
          }
          preview={
            castMember.profile_path == null
              ? emptyPoster
              : `https://image.tmdb.org/t/p/w92${castMember.profile_path}`
          }
          render={(src, style) => (
            <img
              className="inline w-24 rounded shadow"
              width={400}
              src={src}
              style={style}
            />
          )}
        />

        <div className="text-sm mt-1">{castMember.name} </div>
        <div className="text-sm -mt-1 text-gray-600">
          ({castMember.character})
        </div>
      </div>
    ));
  }

  const [getShow, { called, loading, data, error }] = useLazyQuery(SHOW_QUERY, {
    variables: { id: Number(id) },
  });

  // Only do the query when the getMovie function is ready
  useEffect(() => {
    getShow();
  }, [getShow]);

  // Only do this if data is ready
  useEffect(() => {
    if (loading === false && called) {
    }
  }, [loading]);

  if (!id) return `Please provide a tv show id!`;
  if (called && loading)
    return <h1 className="max-w-6xl mx-auto flex">Loading...</h1>;
  if (!called) return <h1 className="max-w-6xl mx-auto flex">Loading...</h1>;
  if (error) return `Error! ${error}`;

  return (
    <div className="flex">
      <div className="mr-16">
        <ProgressiveImage
          width={400}
          height={600}
          transitionTime={500}
          transitionFunction="ease"
          className="rounded"
          src={
            data.show.poster_path == null
              ? emptyPoster
              : `https://image.tmdb.org/t/p/w400${data.show.poster_path}`
          }
          preview={
            data.show.poster_path == null
              ? emptyPoster
              : `https://image.tmdb.org/t/p/w92${data.show.poster_path}`
          }
          render={(src, style) => (
            <img
              className="rounded shadow-2xl max-w-none"
              width={300}
              src={src}
              style={style}
            />
          )}
        />
      </div>
      <div className="flex-1">
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
          <li className="mb-6">
            <div className="text-gray-500 font-medium">CAST </div>
            <div className="flex flex-wrap">{getMainCast()}</div>
          </li>
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
    </div>
  );
};
