import React from "react";
import emptyPoster from "../assets/empty_poster.png";
import ProgressiveImage from "react-progressive-image-loading";
import "../assets/poster.css";

export const LazyPoster = ({ width, src, className, alt, location }) => {
  return (
    <ProgressiveImage
      transitionTime={500}
      transitionFunction="ease"
      className={className}
      alt={alt}
      src={src == null ? emptyPoster : `https://image.tmdb.org/t/p/w400${src}`}
      preview={
        src == null ? emptyPoster : `https://image.tmdb.org/t/p/w92${src}`
      }
      render={(src, style) => (
        <div className={location == "grid" ? "container" : ""}>
          <img
            alt={alt}
            className={className + (location == "grid" ? "image" : "")}
            width={width}
            src={src}
            style={style}
          />
          {location == "grid" && (
            <div className="overlay">
              <div className="p-6 text-xl absolute text-white bottom-0 left-0 ">
                {alt}
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};
