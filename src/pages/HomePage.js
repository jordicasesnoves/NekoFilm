import React, { useContext } from "react";

import ListOfMovies from "../components/ListOfMovies";
import ListOfShows from "../components/ListOfShows";

import { Context } from "../Context";

export const HomePage = () => {
  const { state } = useContext(Context);

  return (
    <div
      style={{ minHeight: "calc(100vh - 4rem)" }}
      className="py-16 max-w-6xl mx-auto px-2 grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"
    >
      {state.mediaType === 1 && <ListOfMovies keyword={state.movieKeyword} />}
      {state.mediaType === 2 && <ListOfShows keyword={state.showKeyword} />}
    </div>
  );
};
