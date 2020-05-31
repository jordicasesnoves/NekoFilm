import React, { useContext } from "react";

import ListOfMovies from "../components/ListOfMovies";
import ListOfShows from "../components/ListOfShows";

import { Context } from "../Context";
import ListOfTrendingMovies from "../components/ListOfTrendingMovies";
import ListOfTrendingShows from "../components/ListOfTrendingShows";

export const HomePage = () => {
  const { state } = useContext(Context);

  const showTrending = (state) => {
    if (state.movieKeyword.length === 0 && state.showKeyword.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {showTrending(state) && (
        <h1 className="text-xl font-medium pt-16 max-w-6xl mx-auto px-2">
          🔥 Trending {state.mediaType === 1 ? "movies" : "tv shows"}
        </h1>
      )}

      <div
        style={{ minHeight: "calc(100vh - 4rem)" }}
        className="py-16 max-w-6xl mx-auto px-2 grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"
      >
        {showTrending(state) ? (
          <>
            {state.mediaType === 1 ? (
              <ListOfTrendingMovies />
            ) : (
              <ListOfTrendingShows />
            )}
          </>
        ) : (
          <>
            {state.mediaType === 1 && (
              <ListOfMovies keyword={state.movieKeyword} />
            )}
            {state.mediaType === 2 && (
              <ListOfShows keyword={state.showKeyword} />
            )}
          </>
        )}
      </div>
    </>
  );
};
