import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { movieQuery } from "../graphql/MovieQuery";
import { findDirection } from "../utils/findDirection";
import { findTrailer } from "../utils/findTrailer";
import { tvshowQuery } from "../graphql/TvshowQuery";

export const useMediaData = (mediaType) => {
  // Modeled data from the query
  const [trailer, setTrailer] = useState({});
  const [direction, setDirection] = useState("");

  let { id } = useParams();

  const [getMedia, { called, loading, data, error }] = useLazyQuery(
    mediaType === "movie" ? movieQuery : tvshowQuery,
    {
      variables: { id: Number(id) },
    }
  );

  // Only do the query when the getMovie function is ready
  useEffect(() => {
    getMedia();
  }, [getMedia]);

  // Only do this if data is ready
  useEffect(() => {
    if (loading === false && called) {
      // Making the direction and the trailer's data usable

      // setDirection function is only for Movies
      if (mediaType === "movie") {
        setDirection(findDirection(data.movie));
      }

      setTrailer(findTrailer(data[mediaType]));
    }
  }, [loading, called]);

  return [id, trailer, direction, called, loading, data, error];
};
