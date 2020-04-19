import React from "react";
import emptyPoster from "../assets/empty_poster.png";

export default function Movie({ id, title, release_date, poster_path }) {
  return (
    <div className="bg-white cursor-pointer max-w-sm rounded overflow-hidden shadow-md hover:shadow transition duration-300 ease-in-out">
      <img
        className="w-full"
        src={poster_path == null ? emptyPoster : poster_path}
        alt={title}
      ></img>
      <div className="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">{release_date}</p>
      </div>
    </div>
  );
}
