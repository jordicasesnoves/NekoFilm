import React from "react";
import emptyPoster from "../assets/empty_poster.png";
import ProgressiveImage from "react-progressive-image-loading";

export const LazyPoster = ({ width, src, className, alt }) => {
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
        <img
          alt={alt}
          className={className}
          width={width}
          src={src}
          style={style}
        />
      )}
    />
  );
};
