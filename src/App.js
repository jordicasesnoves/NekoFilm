import React, { useState } from "react";

import ListOfMovies from "./components/ListOfMovies";
import ListOfShows from "./components/ListOfShows";

export default function App() {
  const [keyword, setKeywords] = useState({
    movieKeyword: "",
    showKeyword: "",
  });
  const [value, setValue] = useState({
    movieValue: "",
    showValue: "",
  });

  const [mediaType, setMediaType] = useState(1);

  const mediaTypeList = [
    {
      id: 1,
      name: "🎬 Movies",
    },
    {
      id: 2,
      name: "📺 TV Shows",
    },
  ];

  function handleClick(e) {
    e.preventDefault();
    if (mediaType == 1) {
      setKeywords({ ...keyword, movieKeyword: value.movieValue });
    }
    if (mediaType == 2) {
      setKeywords({ ...keyword, showKeyword: value.showValue });
    }
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      if (e.target.value === "") {
        alert("Please type something!");
      } else {
        if (mediaType === 1) {
          // Use spread operator in order to prevent overwriting the other keyword
          setKeywords({ ...keyword, movieKeyword: e.target.value });
        } else {
          setKeywords({ ...keyword, showKeyword: e.target.value });
        }
      }
    }
  }

  function changeMediaType(e) {
    setMediaType(Number(e.target.value));
  }

  function handleChange(e) {
    mediaType == 1
      ? setValue({ ...value, movieValue: e.target.value })
      : setValue({ ...value, showValue: e.target.value });
  }

  return (
    <div className="px-16 py-8 bg-gray-100 ">
      <div className="pb-8 text-gray-700 flex">
        <select
          className="inline-flex bg-white h-10 px-4 shadow border rounded"
          value={mediaType}
          onChange={(e) => changeMediaType(e)}
        >
          {mediaTypeList.map((media) => (
            <option key={media.id} value={media.id}>
              {media.name}
            </option>
          ))}
        </select>
        <div className="flex border h-10 mx-2 rounded shadow">
          <input
            className="appearance-none rounded-tl rounded-bl px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={mediaType === 1 ? "Search movies" : "Search TV shows"}
            type="text"
            value={mediaType == 1 ? value.movieValue : value.showValue}
            onKeyDown={keyPress}
            onChange={handleChange}
          />
          <button
            onClick={handleClick}
            className="bg-indigo-500 px-4 shadow rounded-tr rounded-br text-white "
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
              />
            </svg>
          </button>
        </div>
      </div>
      {mediaType === 1 && <ListOfMovies keyword={keyword.movieKeyword} />}
      {mediaType === 2 && <ListOfShows keyword={keyword.showKeyword} />}
    </div>
  );
}
