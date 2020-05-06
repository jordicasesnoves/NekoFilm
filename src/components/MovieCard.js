import React, { useEffect, useRef, useState } from "react";
import { LazyPoster } from "./LazyPoster";

function useLocalStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null && item !== "undefined"
        ? JSON.parse(item)
        : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const setLocalStorage = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setLocalStorage];
}

export default function Movie({ id, title, release_date, poster_path }) {
  const element = useRef(null);
  const [show, setShow] = useState(false);
  const key = `like-${id}`;
  const [liked, setLiked] = useLocalStorage(key, false);

  // Using IntersectionObserver API for creating a 'lazy-load' when scrolling down
  useEffect(() => {
    // Only load IntersectionObserver's Polyfill if it's not supported on current browser
    Promise.resolve(
      typeof window.IntersectionObserver != "undefined"
        ? window.IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      const observer = new window.IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      });
      observer.observe(element.current);
    });
  }, [element]);

  return (
    <div
      ref={element}
      className="relative bg-white max-w-sm rounded overflow-hidden shadow-md hover:shadow transition duration-300 ease-in-out"
      style={{ minHeight: "500px" }}
    >
      {show && (
        <>
          <button
            onClick={() => setLiked(!liked)}
            className="absolute z-10 right-0 focus:outline-none"
          >
            <svg
              className="w-6 h-6 m-2 animated fadeIn"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={liked ? "red" : "white"}
              style={{ filter: "drop-shadow( 0 1px 2px black )" }}
            >
              {/* If the movie is liked, render filled icon. If not, outlined one */}
              {liked ? (
                <>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </>
              ) : (
                <>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                </>
              )}
            </svg>
          </button>

          <LazyPoster
            src={poster_path}
            className="relative animated fadeIn w-full"
            alt={title}
          />

          <div className="animated fadeIn px-6 py-4">
            <div className="font-medium text-xl mb-2">{title}</div>
            <p className="text-gray-700 font-light">{release_date}</p>
          </div>
        </>
      )}
    </div>
  );
}
