import React from "react";
import emptyPoster from "../assets/empty_poster.png";

export default function Movie({ id, title, release_date, poster_path }) {
  return (
    <div style={{ marginBottom: "64px" }}>
      <img
        src={poster_path == null ? emptyPoster : poster_path}
        alt={title}
      ></img>
      <p>
        {title}
        <br />
        {release_date}
      </p>
    </div>
  );
}
