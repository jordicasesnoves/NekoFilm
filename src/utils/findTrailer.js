export const findTrailer = (media) => {
  let trailer = {};
  if (Object.entries(media).length > 0) {
    let { videos } = media;
    if (videos.results.length > 0) {
      const trailers = videos.results.filter(
        (video) => video.type === "Trailer"
      );
      if (trailers.length > 0) {
        trailer = trailers[0];
      }
    }
  }
  return trailer;
};
