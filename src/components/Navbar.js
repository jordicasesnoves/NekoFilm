import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Context } from "../Context";

import { MediaSwitcher } from "./MediaSwitcher";

export const Navbar = () => {
  const { state, setState } = useContext(Context);

  const history = useHistory();
  const location = useLocation();

  const [value, setValue] = useState({
    movieValue: "",
    showValue: "",
  });

  function redirectToHomePage() {
    if (location.pathname !== "/") {
      history.push("/");
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (state.mediaType === 1) {
      //setKeywords({ ...keyword, movieKeyword: value.movieValue });
      setState({ ...state, movieKeyword: value.movieValue });
      redirectToHomePage();
    }
    if (state.mediaType === 2) {
      //setKeywords({ ...keyword, showKeyword: value.showValue });
      setState({ ...state, showKeyword: value.showValue });
      redirectToHomePage();
    }
  }
  function keyPress(e) {
    if (e.keyCode === 13) {
      if (e.target.value === "") {
        alert("Please type something!");
      } else {
        if (state.mediaType === 1) {
          // Use spread operator in order to prevent overwriting the other keyword
          setState({ ...state, movieKeyword: e.target.value });
          redirectToHomePage();
        } else {
          setState({ ...state, showKeyword: e.target.value });
          redirectToHomePage();
        }
      }
    }
  }

  function handleChange(e) {
    state.mediaType === 1
      ? setValue({ ...value, movieValue: e.target.value })
      : setValue({ ...value, showValue: e.target.value });
  }

  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="pb-8 text-gray-700 flex ">
        <MediaSwitcher />
        <div className="flex border h-10 mx-2 rounded shadow">
          <input
            className="appearance-none rounded-tl rounded-bl px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={
              state.mediaType === 1 ? "Search movies" : "Search TV shows"
            }
            type="text"
            value={state.mediaType === 1 ? value.movieValue : value.showValue}
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
    </div>
  );
};
