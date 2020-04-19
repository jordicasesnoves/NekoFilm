import React, { useEffect, useRef, useState } from "react";
import emptyPoster from "../assets/empty_poster.png";

export default function Movie({ id, title, release_date, poster_path }) {
  const element = useRef(null);
  const [show, setShow] = useState(false);

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
      className="bg-white cursor-pointer max-w-sm rounded overflow-hidden shadow-md hover:shadow transition duration-300 ease-in-out"
      style={{ minHeight: "500px" }}
    >
      {show && (
        <>
          <img
            className="animated fadeIn w-full"
            src={poster_path == null ? emptyPoster : poster_path}
            alt={title}
          ></img>
          <div className="animated fadeIn px-6 py-4">
            <div className="font-medium text-xl mb-2">{title}</div>
            <p className="text-gray-700 font-light">{release_date}</p>
          </div>
        </>
      )}
    </div>
  );
}
